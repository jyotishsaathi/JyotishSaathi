/**
 * Jyotish Saathi API
 *
 * Login (two methods – choose in source/config.js → loginMethod):
 *   "whatsapp" (default, FREE): after typing their number, the user sends a short code to your WhatsApp number. Meta does not charge
 *              for user-initiated chats, and the welcome reply we send back is also free.
 *     POST /api/login/start   { lang }                           -> { ok, code, waNumber, text }
 *     POST /api/login/status  { code }                           -> { ok, verified, token, phone }
 *     GET/POST /api/whatsapp/webhook                             <- Meta sends incoming messages here
 *   "otp" (~₹0.12 per code): user types number -> gets a 6-digit WhatsApp code -> types it -> then their name. We send a 6-digit code with an Authentication template.
 *     POST /api/otp/send      { phone, lang }                     -> { ok, resendIn }
 *     POST /api/otp/verify    { phone, code, lang }               -> { ok, token, name }  (name is '' for a new user)
 *   POST /api/profile         { token, name, consent, lang }      -> { ok }   (asked after the number is verified)
 *
 * Account & premium:
 *   POST /api/me            { token }                           -> { ok, phone, premium, premiumUntil, palmUsed, palmFree }
 *   POST /api/consent       { token, consent }                  -> { ok }
 *   POST /api/admin/premium { key, phone, days }                -> grant Premium by hand (testing, offers)
 *   GET  /api/admin/users.csv?key=ADMIN_KEY                     -> contacts list
 *   POST /api/admin/delete-user { key, phone }                  -> delete an account (Play account-deletion requests)
 *
 * AI palm reading:
 *   POST /api/compat        { data, lang, token } -> { ok, result, left }   free AI marriage match, COMPAT_PER_DAY (3) a day
 *   POST /api/ask           { kundli, history, question, lang, token } -> Premium AI Jyotishi (ASK_PER_DAY a day)
 *   POST /api/report        { kundli, lang, token }                     -> Premium AI Life Report (REPORTS_PER_MONTH)
 *   POST /api/tts           { text, lang }  -> audio/mpeg   natural Indian voice (Google WaveNet en-IN / hi-IN), cached, TTS_PER_IP_DAY a day
 *   POST /api/palm          { left, right (base64 JPEG), kundli, lang, token } -> { ok, result } | premium_required
 *
 *   GET  /api/health
 *
 * Payments, Parivaar plan, gifts, WhatsApp daily rashifal and usage stats: see commerce.js
 */
import { DurableObject } from 'cloudflare:workers';
import palmPrompt from '../../source/palm-prompt.js';
import compatPrompt from '../../source/compat-prompt.js';
import premiumPrompts from '../../source/premium-prompts.js';
import { StoreCommerce, commerceRoutes, waKeyword, dailyWhatsApp } from './commerce.js';

const OTP_TTL_MS = 10 * 60 * 1000, RESEND_SEC = 30, MAX_SENDS_PER_HOUR = 5, MAX_IP_SENDS_PER_HOUR = 30, MAX_ATTEMPTS = 5;
const LOGIN_TTL_MS = 20 * 60 * 1000;
const PALM_CACHE_DAYS = 7;

export class Store extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS users (phone TEXT PRIMARY KEY, name TEXT, lang TEXT, consent INTEGER DEFAULT 0,
        verified_at TEXT, created_at TEXT, updated_at TEXT, welcomed INTEGER DEFAULT 0, logins INTEGER DEFAULT 0,
        premium_until INTEGER DEFAULT 0, palm_count INTEGER DEFAULT 0);
      CREATE TABLE IF NOT EXISTS otps (phone TEXT PRIMARY KEY, hash TEXT, expires INTEGER, attempts INTEGER DEFAULT 0,
        last_sent INTEGER DEFAULT 0, hour_start INTEGER DEFAULT 0, hour_count INTEGER DEFAULT 0);
      CREATE TABLE IF NOT EXISTS ip_limits (ip TEXT PRIMARY KEY, hour_start INTEGER, hour_count INTEGER);
      CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, phone TEXT, created_at TEXT);
      CREATE TABLE IF NOT EXISTS palm_limits (k TEXT PRIMARY KEY, day TEXT, n INTEGER);
      CREATE TABLE IF NOT EXISTS pending_logins (code TEXT PRIMARY KEY, name TEXT, lang TEXT, consent INTEGER, created INTEGER,
        phone TEXT, token TEXT);
      CREATE TABLE IF NOT EXISTS palm_cache (h TEXT PRIMARY KEY, result TEXT, at INTEGER);
    `);
    // upgrade older databases
    for (const col of ['premium_until INTEGER DEFAULT 0', 'palm_count INTEGER DEFAULT 0']) {
      try { this.sql.exec(`ALTER TABLE users ADD COLUMN ${col}`); } catch (e) { /* already there */ }
    }
    this.initCommerce();
  }
  one(q, ...a) { const r = this.sql.exec(q, ...a).toArray(); return r[0] || null; }
  ipAllowed(ip, now, max) {
    const lim = this.one('SELECT * FROM ip_limits WHERE ip = ?', ip);
    if (lim && now - lim.hour_start < 3600e3 && lim.hour_count >= max) return false;
    if (!lim || now - lim.hour_start >= 3600e3) this.sql.exec('INSERT OR REPLACE INTO ip_limits (ip, hour_start, hour_count) VALUES (?, ?, 1)', ip, now);
    else this.sql.exec('UPDATE ip_limits SET hour_count = hour_count + 1 WHERE ip = ?', ip);
    return true;
  }

  /* ----- OTP method ----- */
  saveOtp(phone, ip, hash, now) {
    const o = this.one('SELECT * FROM otps WHERE phone = ?', phone);
    if (o && now - o.last_sent < RESEND_SEC * 1000) return { ok: false, error: 'rate_limited', retryIn: Math.ceil((RESEND_SEC * 1000 - (now - o.last_sent)) / 1000) };
    let hourStart = o ? o.hour_start : now, hourCount = o ? o.hour_count : 0;
    if (now - hourStart >= 3600e3) { hourStart = now; hourCount = 0; }
    if (hourCount >= MAX_SENDS_PER_HOUR) return { ok: false, error: 'rate_limited' };
    if (!this.ipAllowed(ip, now, MAX_IP_SENDS_PER_HOUR)) return { ok: false, error: 'rate_limited' };
    this.sql.exec(`INSERT INTO otps (phone, hash, expires, attempts, last_sent, hour_start, hour_count) VALUES (?, ?, ?, 0, ?, ?, ?)
      ON CONFLICT(phone) DO UPDATE SET hash = excluded.hash, expires = excluded.expires, attempts = 0, last_sent = excluded.last_sent,
      hour_start = excluded.hour_start, hour_count = excluded.hour_count`, phone, hash, now + OTP_TTL_MS, now, hourStart, hourCount + 1);
    return { ok: true };
  }
  cancelOtp(phone) { this.sql.exec('UPDATE otps SET last_sent = 0, hour_count = MAX(hour_count - 1, 0) WHERE phone = ?', phone); }
  checkOtp(phone, hash, now) {
    const o = this.one('SELECT * FROM otps WHERE phone = ?', phone);
    if (!o || !o.hash || now > o.expires) return { ok: false, error: 'bad_code' };
    if (o.attempts >= MAX_ATTEMPTS) return { ok: false, error: 'too_many' };
    if (o.hash !== hash) { this.sql.exec('UPDATE otps SET attempts = attempts + 1 WHERE phone = ?', phone); return { ok: false, error: o.attempts + 1 >= MAX_ATTEMPTS ? 'too_many' : 'bad_code' }; }
    this.sql.exec("UPDATE otps SET hash = '', expires = 0 WHERE phone = ?", phone);
    return { ok: true };
  }

  /* ----- WhatsApp "send us a code" method ----- */
  startLogin(ip, name, lang, consent, now) {
    if (!this.ipAllowed('login:' + ip, now, 20)) return { ok: false, error: 'rate_limited' };
    this.sql.exec('DELETE FROM pending_logins WHERE created < ?', now - 24 * 3600e3);
    let code;
    for (let i = 0; i < 5; i++) {
      code = 'JS' + String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
      if (!this.one('SELECT code FROM pending_logins WHERE code = ?', code)) break;
    }
    this.sql.exec('INSERT OR REPLACE INTO pending_logins (code, name, lang, consent, created) VALUES (?, ?, ?, ?, ?)', code, name, lang, consent ? 1 : 0, now);
    return { ok: true, code };
  }
  /** Called by the webhook when someone messages us. Returns the login it completed, if any. */
  completeLogin(code, phone, now) {
    const p = this.one('SELECT * FROM pending_logins WHERE code = ?', code);
    if (!p || p.token || now - p.created > LOGIN_TTL_MS) return null;
    const u = this.upsertUser({ phone, name: p.name, lang: p.lang, consent: !!p.consent });
    const token = this.createSession(phone);
    this.sql.exec('UPDATE pending_logins SET phone = ?, token = ? WHERE code = ?', phone, token, code);
    return { name: p.name, lang: p.lang, isNew: u.isNew };
  }
  loginStatus(code) {
    const p = this.one('SELECT * FROM pending_logins WHERE code = ?', code);
    if (!p) return { ok: false, error: 'bad_code' };
    if (!p.token) return { ok: true, verified: false };
    const u = this.one('SELECT name FROM users WHERE phone = ?', p.phone) || {};
    return { ok: true, verified: true, token: p.token, phone: '+' + p.phone, name: u.name || '' };
  }

  /* ----- users ----- */
  upsertUser(u) {
    const now = new Date().toISOString(), prev = this.one('SELECT * FROM users WHERE phone = ?', u.phone);
    this.sql.exec(`INSERT INTO users (phone, name, lang, consent, verified_at, created_at, updated_at, welcomed, logins) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1)
      ON CONFLICT(phone) DO UPDATE SET name = COALESCE(NULLIF(excluded.name, ''), name), lang = excluded.lang, consent = CASE WHEN excluded.consent = 1 THEN 1 ELSE consent END, verified_at = excluded.verified_at,
      updated_at = excluded.updated_at, logins = logins + 1`, u.phone, u.name, u.lang, u.consent ? 1 : 0, now, now, now);
    return { isNew: !prev, welcomed: prev ? !!prev.welcomed : false, name: (prev && prev.name) || u.name || '' };
  }
  markWelcomed(phone) { this.sql.exec('UPDATE users SET welcomed = 1 WHERE phone = ?', phone); }
  createSession(phone) {
    const token = [...crypto.getRandomValues(new Uint8Array(24))].map(b => b.toString(16).padStart(2, '0')).join('');
    this.sql.exec('INSERT INTO sessions (token, phone, created_at) VALUES (?, ?, ?)', token, phone, new Date().toISOString());
    return token;
  }
  phoneForToken(token) { const r = token ? this.one('SELECT phone FROM sessions WHERE token = ?', token) : null; return r ? r.phone : null; }
  me(token, free) {
    const phone = this.phoneForToken(token); if (!phone) return { ok: false, error: 'bad_token' };
    const u = this.one('SELECT * FROM users WHERE phone = ?', phone) || {};
    const ent = this.entitlements(phone);
    return { ok: true, phone: '+' + phone, ...ent, palmUsed: u.palm_count || 0, palmFree: Math.max(0, free - (u.palm_count || 0)) };
  }
  setProfile(token, name, consent, lang) {
    const phone = this.phoneForToken(token); if (!phone) return { ok: false, error: 'bad_token' };
    const u = this.one('SELECT welcomed FROM users WHERE phone = ?', phone) || {};
    this.sql.exec('UPDATE users SET name = ?, consent = ?, lang = ?, updated_at = ? WHERE phone = ?', name, consent ? 1 : 0, lang, new Date().toISOString(), phone);
    return { ok: true, phone, welcomed: !!u.welcomed };
  }
  setConsent(token, consent) {
    const phone = this.phoneForToken(token); if (!phone) return { ok: false, error: 'bad_token' };
    this.sql.exec('UPDATE users SET consent = ?, updated_at = ? WHERE phone = ?', consent ? 1 : 0, new Date().toISOString(), phone);
    return { ok: true };
  }
  grantPremium(phone, days) {
    const u = this.one('SELECT premium_until FROM users WHERE phone = ?', phone); if (!u) return { ok: false, error: 'no_user' };
    const until = Math.max(Date.now(), u.premium_until || 0) + days * 86400e3;
    this.sql.exec('UPDATE users SET premium_until = ? WHERE phone = ?', until, phone);
    return { ok: true, premiumUntil: new Date(until).toISOString() };
  }

  /* ----- palm ----- */
  palmAccess(phone, ip, free, perUser, perIp) {
    const day = new Date().toISOString().slice(0, 10);
    const over = (k, max) => { const r = this.one('SELECT * FROM palm_limits WHERE k = ?', k); return r && r.day === day && r.n >= max; };
    if (phone) {
      const u = this.one('SELECT palm_count FROM users WHERE phone = ?', phone) || {};
      const prem = this.premOf(phone).prem;
      if (!prem && (u.palm_count || 0) >= free) return { ok: false, error: 'premium_required' };
      if (over('ph:' + phone, perUser)) return { ok: false, error: 'rate_limited' };
      if (over('ip:' + ip, perIp)) return { ok: false, error: 'rate_limited' };
      const mo = this.one('SELECT * FROM palm_limits WHERE k = ?', 'best:' + phone);
      const monthKey = day.slice(0, 7), bestUsed = mo && mo.day === monthKey ? mo.n : 0;
      return { ok: true, premium: prem, bestUsed };
    }
    if (over('ip:' + ip, perIp)) return { ok: false, error: 'rate_limited' };
    return { ok: true, premium: false, bestUsed: 0 };
  }
  bestModelUsed(phone) {
    const monthKey = new Date().toISOString().slice(0, 7);
    this.sql.exec(`INSERT INTO palm_limits (k, day, n) VALUES (?, ?, 1) ON CONFLICT(k) DO UPDATE SET n = CASE WHEN day = excluded.day THEN n + 1 ELSE 1 END, day = excluded.day`, 'best:' + phone, monthKey);
  }
  palmUsed(phone, ip) {
    const day = new Date().toISOString().slice(0, 10);
    const bump = k => this.sql.exec(`INSERT INTO palm_limits (k, day, n) VALUES (?, ?, 1) ON CONFLICT(k) DO UPDATE SET n = CASE WHEN day = excluded.day THEN n + 1 ELSE 1 END, day = excluded.day`, k, day);
    bump('ip:' + ip);
    if (phone) { bump('ph:' + phone); this.sql.exec('UPDATE users SET palm_count = palm_count + 1 WHERE phone = ?', phone); }
  }
  /* ----- free AI marriage compatibility: a few per day per person / per network ----- */
  compatAccess(phone, ip, perUser, perIp) {
    const day = new Date().toISOString().slice(0, 10);
    const used = k => { const r = this.one('SELECT * FROM palm_limits WHERE k = ?', k); return r && r.day === day ? r.n : 0; };
    if (phone && used('cph:' + phone) >= perUser) return { ok: false, error: 'daily_limit' };
    if (used('cip:' + ip) >= (phone ? perIp : perUser)) return { ok: false, error: 'daily_limit' };
    return { ok: true, left: perUser - (phone ? used('cph:' + phone) : used('cip:' + ip)) };
  }
  compatUsed(phone, ip) {
    const day = new Date().toISOString().slice(0, 10);
    const bump = k => this.sql.exec(`INSERT INTO palm_limits (k, day, n) VALUES (?, ?, 1) ON CONFLICT(k) DO UPDATE SET n = CASE WHEN day = excluded.day THEN n + 1 ELSE 1 END, day = excluded.day`, k, day);
    bump('cip:' + ip); if (phone) bump('cph:' + phone);
  }
  /* ----- Premium AI quotas ----- */
  isPremium(phone) { return this.premOf(phone).prem; }
  quotaLeft(k, period, max) {
    const key = period === 'month' ? new Date().toISOString().slice(0, 7) : new Date().toISOString().slice(0, 10);
    const r = this.one('SELECT * FROM palm_limits WHERE k = ?', k); return max - (r && r.day === key ? r.n : 0);
  }
  quotaUse(k, period) {
    const key = period === 'month' ? new Date().toISOString().slice(0, 7) : new Date().toISOString().slice(0, 10);
    this.sql.exec(`INSERT INTO palm_limits (k, day, n) VALUES (?, ?, 1) ON CONFLICT(k) DO UPDATE SET n = CASE WHEN day = excluded.day THEN n + 1 ELSE 1 END, day = excluded.day`, k, key);
  }
  palmCacheGet(h) { const r = this.one('SELECT * FROM palm_cache WHERE h = ? AND at > ?', h, Date.now() - PALM_CACHE_DAYS * 86400e3); return r ? JSON.parse(r.result) : null; }
  palmCachePut(h, result) { this.sql.exec('DELETE FROM palm_cache WHERE at < ?', Date.now() - PALM_CACHE_DAYS * 86400e3); this.sql.exec('INSERT OR REPLACE INTO palm_cache (h, result, at) VALUES (?, ?, ?)', h, JSON.stringify(result), Date.now()); }

  /** Delete an account (keeps purchase records, which tax law requires) */
  deleteUser(phone) {
    for (const q of ['DELETE FROM users WHERE phone = ?', 'DELETE FROM sessions WHERE phone = ?', 'DELETE FROM otps WHERE phone = ?',
      'DELETE FROM items WHERE phone = ?', 'DELETE FROM family_links WHERE member = ? OR owner = ?', 'DELETE FROM wa_queue WHERE phone = ?',
      'DELETE FROM pending_logins WHERE phone = ?']) {
      try { this.sql.exec(q, ...(q.includes(' OR ') ? [phone, phone] : [phone])); } catch (e) { /* table may not exist yet */ }
    }
    return { ok: true, deleted: phone };
  }
  users() { return this.sql.exec('SELECT phone, name, lang, consent, created_at, verified_at, logins, welcomed, premium_until, palm_count FROM users ORDER BY created_at DESC').toArray(); }
}
Object.assign(Store.prototype, StoreCommerce);

/* ---------------- helpers ---------------- */
const cors = env => ({ 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'content-type,authorization' });
const json = (env, data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', ...cors(env) } });
const has = v => !!v && v !== 'none';
const waReady = env => has(env.WA_TOKEN) && has(env.WA_PHONE_ID);
function normPhone(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.length === 10 && /^[6-9]/.test(d)) d = '91' + d;
  if (d.startsWith('0')) return null;
  if (d.startsWith('91') && !/^91[6-9]\d{9}$/.test(d)) return null;
  return d.length >= 8 && d.length <= 15 ? d : null;
}
async function sha256(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
async function hmacHex(secret, data) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, data);
  return [...new Uint8Array(sig)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function makeCode() { return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0'); }

async function waSend(env, body) {
  const url = `${env.GRAPH_BASE || 'https://graph.facebook.com'}/${env.GRAPH_VERSION || 'v23.0'}/${env.WA_PHONE_ID}/messages`;
  try {
    const r = await fetch(url, { method: 'POST', headers: { authorization: `Bearer ${env.WA_TOKEN}`, 'content-type': 'application/json' }, body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', ...body }) });
    if (!r.ok) console.log('WhatsApp error', r.status, (await r.text()).slice(0, 400));
    return r.ok;
  } catch (e) { console.log('WhatsApp request failed', String(e)); return false; }
}
const sendTemplate = (env, to, name, code, components) => waSend(env, { to, type: 'template', template: { name, language: { code }, components } });
const sendText = (env, to, text) => waSend(env, { to, type: 'text', text: { body: text, preview_url: true } });
async function sendOtpMessage(env, to, code, lang) {
  const comps = [{ type: 'body', parameters: [{ type: 'text', text: code }] }, { type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: code }] }];
  const first = lang === 'hi' ? env.LANG_HI : env.LANG_EN;
  if (await sendTemplate(env, to, env.OTP_TEMPLATE, first, comps)) return true;
  return first !== env.LANG_EN ? sendTemplate(env, to, env.OTP_TEMPLATE, env.LANG_EN, comps) : false;
}
function welcomeText(env, name, lang) {
  const n = (name || '').split(' ')[0] || (lang === 'hi' ? 'जी' : 'ji');
  return lang === 'hi'
    ? `नमस्ते ${n} 🙏\nज्योतिष साथी में आपका स्वागत है! आपका नंबर सत्यापित हो गया है। अब ऐप में वापस जाएँ — आपकी कुंडली तैयार है। ✨${env.APP_LINK ? `\n\n${env.APP_LINK}` : ''}`
    : `Namaste ${n} 🙏\nWelcome to Jyotish Saathi! Your number is verified. Go back to the app – your Kundli is ready. ✨${env.APP_LINK ? `\n\n${env.APP_LINK}` : ''}`;
}
const csvCell = v => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };

/* ---------------- routes ---------------- */
export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url), path = url.pathname;
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(env) });
    const store = env.STORE.get(env.STORE.idFromName('main'));
    const dev = env.DEV_MODE === 'true', now = Date.now(), ip = req.headers.get('cf-connecting-ip') || 'local';
    const FREE = Number(env.FREE_PALM_READINGS ?? 3);
    try {
      if (path === '/api/health') return json(env, { ok: true, whatsapp: waReady(env), whatsappLogin: waReady(env) && has(env.WA_BUSINESS_NUMBER), otpLogin: waReady(env) && has(env.OTP_TEMPLATE), indianVoice: has(env.GOOGLE_TTS_KEY), razorpay: has(env.RAZORPAY_KEY_ID), playBilling: has(env.PLAY_SA_JSON), dailyWhatsApp: has(env.DAILY_TEMPLATE), palmAI: has(env.ANTHROPIC_API_KEY), palmModel: env.PALM_MODEL });

      /* ---- WhatsApp login (free) ---- */
      if (path === '/api/login/start' && req.method === 'POST') {
        if (!(waReady(env) && has(env.WA_BUSINESS_NUMBER)) && !dev) return json(env, { ok: false, error: 'not_configured' });
        const b = await req.json().catch(() => ({}));
        const lang = b.lang === 'hi' ? 'hi' : 'en', name = String(b.name || '').trim().slice(0, 80);
        const r = await store.startLogin(ip, name, lang, !!b.consent, now);
        if (!r.ok) return json(env, r, 429);
        const text = lang === 'hi' ? `नमस्ते! मेरा ज्योतिष साथी लॉगिन कोड: ${r.code}` : `Namaste! My Jyotish Saathi login code: ${r.code}`;
        return json(env, { ok: true, code: r.code, waNumber: String(env.WA_BUSINESS_NUMBER || '').replace(/\D/g, ''), text });
      }
      if (path === '/api/login/status' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        return json(env, await store.loginStatus(String(b.code || '').toUpperCase()));
      }
      if (path === '/api/whatsapp/webhook' && req.method === 'GET') {
        const ok = url.searchParams.get('hub.mode') === 'subscribe' && has(env.WA_VERIFY_TOKEN) && url.searchParams.get('hub.verify_token') === env.WA_VERIFY_TOKEN;
        return ok ? new Response(url.searchParams.get('hub.challenge') || '') : new Response('Forbidden', { status: 403 });
      }
      if (path === '/api/whatsapp/webhook' && req.method === 'POST') {
        const raw = await req.arrayBuffer();
        if (has(env.WA_APP_SECRET)) {
          const sig = (req.headers.get('x-hub-signature-256') || '').replace('sha256=', '');
          if (sig !== await hmacHex(env.WA_APP_SECRET, raw)) return new Response('Bad signature', { status: 401 });
        }
        let data = {}; try { data = JSON.parse(new TextDecoder().decode(raw)); } catch (e) { }
        for (const entry of data.entry || []) for (const ch of entry.changes || []) for (const m of (ch.value && ch.value.messages) || []) {
          const from = normPhone(m.from), text = (m.text && m.text.body) || (m.button && m.button.text) || '';
          const code = (text.toUpperCase().match(/JS\s?(\d{6})/) || [])[1];
          if (from && !code) { ctx.waitUntil(waKeyword(text, from, { store, env, sendText, waReady })); continue; }
          if (!from || !code) continue;
          const done = await store.completeLogin('JS' + code, from, now);
          if (done && waReady(env)) {   // reply inside the customer-service window: free
            ctx.waitUntil(sendText(env, from, welcomeText(env, done.name, done.lang)).then(ok => ok && store.markWelcomed(from)));
          }
        }
        return new Response('OK');   // always 200 quickly, as Meta expects
      }

      /* ---- OTP login (paid template) ---- */
      if (path === '/api/otp/send' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        const phone = normPhone(b.phone);
        if (!phone) return json(env, { ok: false, error: 'bad_phone' }, 400);
        const configured = waReady(env) && has(env.OTP_TEMPLATE);
        if (!configured && !dev) return json(env, { ok: false, error: 'not_configured' });
        const code = makeCode(), hash = await sha256(`${phone}:${code}:${env.OTP_SECRET || 'dev'}`);
        const saved = await store.saveOtp(phone, ip, hash, now);
        if (!saved.ok) return json(env, saved, 429);
        if (configured && !(await sendOtpMessage(env, phone, code, b.lang))) { await store.cancelOtp(phone); return json(env, { ok: false, error: 'send_failed' }, 502); }
        return json(env, { ok: true, resendIn: RESEND_SEC, ...(dev ? { devCode: code } : {}) });
      }
      if (path === '/api/otp/verify' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        const phone = normPhone(b.phone), code = String(b.code || '').replace(/\D/g, '');
        if (!phone || code.length !== 6) return json(env, { ok: false, error: 'bad_code' }, 400);
        const r = await store.checkOtp(phone, await sha256(`${phone}:${code}:${env.OTP_SECRET || 'dev'}`), now);
        if (!r.ok) return json(env, r, 401);
        const lang = b.lang === 'hi' ? 'hi' : 'en';
        const u = await store.upsertUser({ phone, name: String(b.name || '').trim().slice(0, 80), lang, consent: !!b.consent });
        const token = await store.createSession(phone);
        return json(env, { ok: true, token, isNew: u.isNew, name: u.name });
      }

      /* ---- account ---- */
      if (path === '/api/me' && req.method === 'POST') { const b = await req.json().catch(() => ({})); return json(env, await store.me(String(b.token || ''), FREE)); }
      if (path === '/api/profile' && req.method === 'POST') {   // name + consent, asked after the number is verified
        const b = await req.json().catch(() => ({}));
        const name = String(b.name || '').trim().slice(0, 80), lang = b.lang === 'hi' ? 'hi' : 'en';
        if (!name) return json(env, { ok: false, error: 'bad_name' }, 400);
        const r = await store.setProfile(String(b.token || ''), name, !!b.consent, lang);
        if (r.ok && b.consent && !r.welcomed && waReady(env) && has(env.WELCOME_TEMPLATE)) {   // paid marketing template – off by default
          const comps = [{ type: 'body', parameters: [{ type: 'text', text: name.slice(0, 60) }] }];
          ctx.waitUntil(sendTemplate(env, r.phone, env.WELCOME_TEMPLATE, lang === 'hi' ? env.LANG_HI : env.LANG_EN, comps).then(ok => ok && store.markWelcomed(r.phone)));
        }
        return json(env, { ok: r.ok, error: r.error });
      }
      if (path === '/api/consent' && req.method === 'POST') { const b = await req.json().catch(() => ({})); return json(env, await store.setConsent(String(b.token || ''), !!b.consent)); }

      /* ---- free AI marriage compatibility (low-cost model) ---- */
      if (path === '/api/compat' && req.method === 'POST') {
        if (!has(env.ANTHROPIC_API_KEY)) return json(env, { ok: false, error: 'not_configured' });
        const b = await req.json().catch(() => ({}));
        if (!b.data || typeof b.data !== 'object' || JSON.stringify(b.data).length > 20000) return json(env, { ok: false, error: 'bad_request' }, 400);
        const lang = b.lang === 'hi' ? 'hi' : 'en';
        const phone = await store.phoneForToken(String(b.token || ''));
        const h = await sha256('compat|' + lang + '|' + JSON.stringify(b.data));
        const cached = await store.palmCacheGet(h);
        if (cached) return json(env, { ok: true, result: cached, cached: true });
        const perDay = Number(env.COMPAT_PER_DAY || 3);
        const acc = await store.compatAccess(phone, ip, perDay, Number(env.COMPAT_PER_IP_DAY || 10));
        if (!acc.ok) return json(env, acc, 429);
        const cmk = 'compm:' + (phone || ip); if ((await store.quotaLeft(cmk, 'month', Number(env.COMPAT_PER_MONTH || 10))) <= 0) return json(env, { ok: false, error: 'daily_limit' }, 429);
        let r;
        try { r = await fetch((env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com') + '/v1/messages', { method: 'POST', headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify({ model: env.COMPAT_MODEL || env.PALM_MODEL || 'claude-haiku-5-5', max_tokens: 2500, messages: [{ role: 'user', content: compatPrompt.buildCompatPrompt(b.data, lang) }] }) }); }
        catch (e) { return json(env, { ok: false, error: 'ai_failed' }, 502); }
        const out = await r.json().catch(() => ({}));
        if (!r.ok) return json(env, { ok: false, error: r.status === 429 ? 'rate_limited' : 'ai_failed' }, 502);
        const text = (out.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
        let result = null; try { result = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)); } catch (e) { }
        if (!result || !result.summary) return json(env, { ok: false, error: 'ai_failed' }, 502);
        await store.compatUsed(phone, ip); await store.palmCachePut(h, result); await store.quotaUse(cmk, 'month');
        if (out.usage) console.log('compat tokens', JSON.stringify(out.usage));
        return json(env, { ok: true, result, left: Math.max(0, acc.left - 1) });
      }

      /* ---- Natural Indian voice (Google Cloud Text-to-Speech, WaveNet) ---- */
      if (path === '/api/tts' && req.method === 'POST') {
        if (!has(env.GOOGLE_TTS_KEY)) return json(env, { ok: false, error: 'not_configured' }, 501);
        const b = await req.json().catch(() => ({}));
        const text = String(b.text || '').slice(0, 1500).trim(), hi = b.lang === 'hi';
        if (!text) return json(env, { ok: false, error: 'bad_request' }, 400);
        const male = b.gender === 'm';
        const voice = hi ? (male ? env.TTS_VOICE_HI_M || 'hi-IN-Wavenet-B' : env.TTS_VOICE_HI || 'hi-IN-Wavenet-A') : (male ? env.TTS_VOICE_EN_M || 'en-IN-Wavenet-B' : env.TTS_VOICE_EN || 'en-IN-Wavenet-A');
        const rate = Math.min(1.1, Math.max(0.7, Number(b.rate) || 0.92));
        const key = await sha256(voice + '|' + rate + '|' + text);
        const cacheReq = new Request('https://tts-cache.jyotishsaathi/' + key), cache = caches.default;
        let hit = await cache.match(cacheReq);
        if (hit) { const h = new Headers(hit.headers); Object.entries(cors(env)).forEach(([k, v]) => h.set(k, v)); return new Response(hit.body, { headers: h }); }
        if ((await store.quotaLeft('tts:' + ip, 'day', Number(env.TTS_PER_IP_DAY || 80))) <= 0) return json(env, { ok: false, error: 'daily_limit' }, 429);
        let r;
        try { r = await fetch((env.TTS_BASE_URL || 'https://texttospeech.googleapis.com') + '/v1/text:synthesize?key=' + env.GOOGLE_TTS_KEY, { method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ input: { text }, voice: { languageCode: hi ? 'hi-IN' : 'en-IN', name: voice }, audioConfig: { audioEncoding: 'MP3', speakingRate: rate, pitch: 0 } }) }); }
        catch (e) { return json(env, { ok: false, error: 'tts_failed' }, 502); }
        const out = await r.json().catch(() => ({}));
        if (!r.ok || !out.audioContent) { console.log('TTS error', r.status, JSON.stringify(out).slice(0, 300)); return json(env, { ok: false, error: 'tts_failed' }, 502); }
        await store.quotaUse('tts:' + ip, 'day');
        const bin = Uint8Array.from(atob(out.audioContent), c => c.charCodeAt(0));
        const res = new Response(bin, { headers: { 'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=31536000' } });
        ctx.waitUntil(cache.put(cacheReq, res.clone()));
        const h = new Headers(res.headers); Object.entries(cors(env)).forEach(([k, v]) => h.set(k, v));
        return new Response(res.body, { headers: h });
      }

      /* ---- Premium: AI Jyotishi and AI Life Report ---- */
      if ((path === '/api/ask' || path === '/api/report') && req.method === 'POST') {
        if (!has(env.ANTHROPIC_API_KEY)) return json(env, { ok: false, error: 'not_configured' });
        const b = await req.json().catch(() => ({}));
        const phone = await store.phoneForToken(String(b.token || ''));
        if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
        if (!(await store.isPremium(phone))) return json(env, { ok: false, error: 'premium_required' }, 402);
        const ask = path === '/api/ask', lang = b.lang === 'hi' ? 'hi' : 'en', kundli = typeof b.kundli === 'object' && b.kundli ? b.kundli : {};
        if (JSON.stringify(kundli).length > 12000) return json(env, { ok: false, error: 'bad_request' }, 400);
        const qk = (ask ? 'ask:' : 'rep:') + phone, period = ask ? 'day' : 'month', max = Number(ask ? (env.ASK_PER_DAY || 10) : (env.REPORTS_PER_MONTH || 3));
        if ((await store.quotaLeft(qk, period, max)) <= 0) return json(env, { ok: false, error: 'daily_limit' }, 429);
        if (ask && (await store.quotaLeft('askm:' + phone, 'month', Number(env.ASK_PER_MONTH || 100))) <= 0) return json(env, { ok: false, error: 'daily_limit' }, 429);
        const prompt = ask ? premiumPrompts.buildAskPrompt(kundli, Array.isArray(b.history) ? b.history.slice(-6).map(x => String(x).slice(0, 400)) : [], String(b.question || '').slice(0, 400), lang)
          : premiumPrompts.buildReportPrompt(kundli, lang);
        if (ask && !String(b.question || '').trim()) return json(env, { ok: false, error: 'bad_request' }, 400);
        const model = ask ? (env.ASK_MODEL || 'claude-haiku-5-5') : (env.REPORT_MODEL || env.PALM_MODEL_PREMIUM || 'claude-sonnet-5-5');
        let r;
        try { r = await fetch((env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com') + '/v1/messages', { method: 'POST', headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify({ model, max_tokens: ask ? 1200 : 8000, messages: [{ role: 'user', content: prompt }] }) }); }
        catch (e) { return json(env, { ok: false, error: 'ai_failed' }, 502); }
        const out = await r.json().catch(() => ({}));
        if (!r.ok) return json(env, { ok: false, error: r.status === 429 ? 'rate_limited' : 'ai_failed' }, 502);
        const text = (out.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
        let result = null; try { result = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)); } catch (e) { }
        if (!result || (ask ? !result.answer : !result.chapters)) return json(env, { ok: false, error: 'ai_failed' }, 502);
        await store.quotaUse(qk, period);
        if (ask) await store.quotaUse('askm:' + phone, 'month');
        if (out.usage) console.log(ask ? 'ask' : 'report', 'tokens', model, JSON.stringify(out.usage));
        return json(env, { ok: true, result });
      }

      /* ---- AI palm reading ---- */
      if (path === '/api/palm' && req.method === 'POST') {
        if (!has(env.ANTHROPIC_API_KEY)) return json(env, { ok: false, error: 'not_configured' });
        const b = await req.json().catch(() => ({}));
        const img = x => typeof x === 'string' && x.length > 1000 && x.length < 3_000_000 && /^[A-Za-z0-9+/=]+$/.test(x.slice(0, 200));
        if (!img(b.left) || !img(b.right)) return json(env, { ok: false, error: 'bad_images' }, 400);
        // (images up to ~1200px are sent so fine lines stay visible)
        const phone = await store.phoneForToken(String(b.token || ''));
        if (env.PALM_REQUIRE_LOGIN === 'true' && !phone) return json(env, { ok: false, error: 'login_required' }, 401);
        const lang = b.lang === 'hi' ? 'hi' : 'en';
        const h = await sha256(b.left.slice(0, 200000) + '|' + b.right.slice(0, 200000) + '|' + lang + '|' + (b.dominant || 'right') + '|' + JSON.stringify(b.kundli || {}).slice(0, 2000));
        const cached = await store.palmCacheGet(h);
        if (cached) return json(env, { ok: true, result: cached, cached: true });   // same photos again: no AI cost
        const acc = await store.palmAccess(phone, ip, FREE, Number(env.PALM_PER_USER_DAY || 5), Number(env.PALM_PER_IP_DAY || 8));
        if (!acc.ok) return json(env, acc, acc.error === 'premium_required' ? 402 : 429);
        if (acc.premium && phone && (await store.quotaLeft('palmm:' + phone, 'month', Number(env.PALM_PER_MONTH || 15))) <= 0) return json(env, { ok: false, error: 'rate_limited' }, 429);
        const prompt = palmPrompt.buildPalmPrompt(typeof b.kundli === 'object' && b.kundli ? b.kundli : {}, lang, b.dominant === 'left' ? 'left' : 'right');
        // Premium members get the most accurate model for a few readings each month; everyone else gets the low-cost model
        const useBest = acc.premium && has(env.PALM_MODEL_PREMIUM) && acc.bestUsed < Number(env.PREMIUM_BEST_PER_MONTH ?? 0);
        const model = useBest ? env.PALM_MODEL_PREMIUM : (env.PALM_MODEL || 'claude-haiku-5-5');
        const body = {
          model, max_tokens: Number(env.PALM_MAX_TOKENS || 4000),
          messages: [{ role: 'user', content: [
            { type: 'text', text: 'Image 1 – LEFT hand:' }, { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: b.left } },
            { type: 'text', text: 'Image 2 – RIGHT hand:' }, { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: b.right } },
            { type: 'text', text: prompt }] }]
        };
        let r;
        try { r = await fetch((env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com') + '/v1/messages', { method: 'POST', headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify(body) }); }
        catch (e) { console.log('AI request failed', String(e)); return json(env, { ok: false, error: 'ai_failed' }, 502); }
        const out = await r.json().catch(() => ({}));
        if (!r.ok) { console.log('AI error', r.status, JSON.stringify(out).slice(0, 500)); return json(env, { ok: false, error: r.status === 429 ? 'rate_limited' : 'ai_failed' }, 502); }
        const text = (out.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
        let result = null; try { result = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)); } catch (e) { }
        if (!result || !result.valid) { console.log('AI bad JSON', text.slice(0, 300)); return json(env, { ok: false, error: 'ai_failed' }, 502); }
        if (result.valid.left !== false && result.valid.right !== false) {   // only count + cache real readings, not "please retake"
          await store.palmUsed(phone, ip); await store.palmCachePut(h, result);
          if (acc.premium && phone) await store.quotaUse('palmm:' + phone, 'month');
          if (useBest && phone) await store.bestModelUsed(phone);
        }
        if (out.usage) console.log('palm tokens', model, JSON.stringify(out.usage));
        return json(env, { ok: true, result, model });
      }

      /* ---- payments, plans, gifts, family, WhatsApp daily, stats ---- */
      if (/^\/api\/(pay|play|gift|family|wa|ev|err|admin\/stats)/.test(path)) {
        const r = await commerceRoutes(path, req, env, ctx, { store, json, has, normPhone, hmacHex, sha256, now, ip, sendTemplate, sendText, waReady });
        if (r) return r;
      }

      /* ---- admin ---- */
      const adminKey = url.searchParams.get('key') || (req.headers.get('authorization') || '').replace(/^Bearer /, '');
      const isAdmin = has(env.ADMIN_KEY) && adminKey === env.ADMIN_KEY;
      if (path === '/api/admin/premium' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        if (!(has(env.ADMIN_KEY) && (b.key === env.ADMIN_KEY || isAdmin))) return new Response('Unauthorised', { status: 401 });
        const phone = normPhone(b.phone); if (!phone) return json(env, { ok: false, error: 'bad_phone' }, 400);
        return json(env, await store.grantPremium(phone, Math.min(3660, Math.max(1, Number(b.days) || 30))));
      }
      if (path === '/api/admin/delete-user' && req.method === 'POST') {
        const b = await req.json().catch(() => ({}));
        if (!(has(env.ADMIN_KEY) && (b.key === env.ADMIN_KEY || isAdmin))) return new Response('Unauthorised', { status: 401 });
        const phone = normPhone(b.phone); if (!phone) return json(env, { ok: false, error: 'bad_phone' }, 400);
        return json(env, await store.deleteUser(phone));
      }
      if (path === '/api/admin/users.csv') {
        if (!isAdmin) return new Response('Unauthorised', { status: 401 });
        const rows = await store.users();
        const head = ['phone', 'name', 'language', 'whatsapp_updates_consent', 'joined', 'last_verified', 'logins', 'welcome_sent', 'premium_until', 'palm_readings'];
        const csv = [head.join(',')].concat(rows.map(r => ['+' + r.phone, r.name, r.lang, r.consent ? 'yes' : 'no', r.created_at, r.verified_at, r.logins, r.welcomed ? 'yes' : 'no', r.premium_until ? new Date(r.premium_until).toISOString().slice(0, 10) : '', r.palm_count].map(csvCell).join(','))).join('\n');
        return new Response('﻿' + csv, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="jyotish-saathi-users.csv"' } });
      }
      return json(env, { ok: false, error: 'not_found' }, 404);
    } catch (e) {
      console.log('error', e && e.stack);
      return json(env, { ok: false, error: 'server_error' }, 500);
    }
  },
  /** 7:00 am IST every day (cron in wrangler.toml): Premium members' WhatsApp rashifal */
  async scheduled(event, env, ctx) {
    const store = env.STORE.get(env.STORE.idFromName('main'));
    ctx.waitUntil(dailyWhatsApp(env, { store, sendTemplate, waReady, has }));
  }
};
