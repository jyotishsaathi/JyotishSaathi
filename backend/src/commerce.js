/**
 * Payments, plans, gifts, Parivaar (family) plan, WhatsApp daily rashifal queue and simple usage stats.
 *
 *   POST /api/pay/order      { token, product, key }        -> Razorpay order for the web app { ok, orderId, keyId, amount }
 *   POST /api/pay/verify     { token, orderId, paymentId, signature } -> { ok, granted }
 *   POST /api/pay/webhook    <- Razorpay "payment.captured" (backup in case the app closed before verify)
 *   POST /api/play/verify    { token, product, purchaseToken, key } -> Google Play purchase check -> { ok, granted }
 *   POST /api/gift/redeem    { token, code }                 -> { ok, premiumUntil }
 *   POST /api/family/add     { token, phone }                -> Parivaar plan owner adds a member (max FAMILY_MAX)
 *   POST /api/family/remove  { token, phone }
 *   POST /api/wa/daily       { token, on, lang, name, items:[{day,text}] } -> stores the next days' rashifal; daily WhatsApp is Premium
 *   POST /api/ev             { ev: {name: count} }           -> anonymous usage counts
 *   POST /api/err            { msg, src, line, ver }         -> crash reports
 *   GET  /api/admin/stats?key=ADMIN_KEY
 */

// Prices in paise. The app shows the same prices from source/config.js; the server decides what is charged.
export function catalog(env) {
  const p = (k, d) => Number(env[k] || d);
  return {
    prem_m: { amount: p('PRICE_PREM_M', 9900), kind: 'premium', days: 31, play: 'premium_monthly' },
    prem_y: { amount: p('PRICE_PREM_Y', 49900), kind: 'premium', days: 366, play: 'premium_yearly' },
    fam_m: { amount: p('PRICE_FAM_M', 14900), kind: 'premium', family: true, days: 31, play: 'parivaar_monthly' },
    fam_y: { amount: p('PRICE_FAM_Y', 79900), kind: 'premium', family: true, days: 366, play: 'parivaar_yearly' },
    report_year: { amount: p('PRICE_REPORT', 9900), kind: 'item', play: 'report_year' },
    muhurat: { amount: p('PRICE_MUHURAT', 5100), kind: 'item', days: 60, play: 'muhurat_pack' },
    naam: { amount: p('PRICE_NAAM', 4900), kind: 'item', play: 'naamkaran_full' },
    gift_m: { amount: p('PRICE_PREM_M', 9900), kind: 'gift', days: 31, play: 'gift_month' },
    gift_y: { amount: p('PRICE_PREM_Y', 49900), kind: 'gift', days: 366, play: 'gift_year' },
  };
}
const ITEM_KEY = /^[a-z0-9_-]{1,40}$/i;
const istDay = (ms = Date.now()) => new Date(ms + 5.5 * 3600e3).toISOString().slice(0, 10);

/* -------- Durable Object part (mixed into Store) -------- */
export const StoreCommerce = {
  initCommerce() {
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS purchases (id TEXT PRIMARY KEY, phone TEXT, product TEXT, k TEXT, amount INTEGER, provider TEXT, created INTEGER);
      CREATE TABLE IF NOT EXISTS items (phone TEXT, item TEXT, k TEXT, until INTEGER, PRIMARY KEY (phone, item, k));
      CREATE TABLE IF NOT EXISTS family_links (member TEXT PRIMARY KEY, owner TEXT, added INTEGER);
      CREATE TABLE IF NOT EXISTS gifts (code TEXT PRIMARY KEY, days INTEGER, buyer TEXT, redeemed_by TEXT, created INTEGER, redeemed_at INTEGER);
      CREATE TABLE IF NOT EXISTS wa_queue (phone TEXT, day TEXT, text TEXT, PRIMARY KEY (phone, day));
      CREATE TABLE IF NOT EXISTS ev_counts (day TEXT, name TEXT, n INTEGER, PRIMARY KEY (day, name));
      CREATE TABLE IF NOT EXISTS errors (id INTEGER PRIMARY KEY AUTOINCREMENT, at INTEGER, msg TEXT);
    `);
    for (const col of ["plan TEXT DEFAULT ''", 'wa_daily INTEGER DEFAULT 0', "wa_name TEXT DEFAULT ''"]) {
      try { this.sql.exec(`ALTER TABLE users ADD COLUMN ${col}`); } catch (e) { /* exists */ }
    }
  },
  ownPremium(phone) { const u = phone ? this.one('SELECT premium_until, plan FROM users WHERE phone = ?', phone) : null; return u && (u.premium_until || 0) > Date.now() ? u : null; },
  /** Premium through own plan or through a family member's Parivaar plan */
  premOf(phone) {
    if (!phone) return { prem: false, until: 0 };
    const own = this.ownPremium(phone); if (own) return { prem: true, until: own.premium_until, plan: own.plan || 'single' };
    const l = this.one('SELECT owner FROM family_links WHERE member = ?', phone);
    if (l) { const o = this.ownPremium(l.owner); if (o && o.plan === 'family') return { prem: true, until: o.premium_until, plan: 'member', owner: l.owner }; }
    return { prem: false, until: 0 };
  },
  entitlements(phone) {
    const p = this.premOf(phone);
    const items = this.sql.exec('SELECT item, k, until FROM items WHERE phone = ? AND (until = 0 OR until > ?)', phone, Date.now()).toArray();
    const fam = p.plan === 'family' ? this.sql.exec('SELECT member FROM family_links WHERE owner = ?', phone).toArray().map(r => '+' + r.member) : [];
    const u = this.one('SELECT wa_daily FROM users WHERE phone = ?', phone) || {};
    return { premium: p.prem, premiumUntil: p.until, plan: p.plan || '', familyOwner: p.owner ? '+' + p.owner : '', family: fam, items, waDaily: !!u.wa_daily };
  },
  /** Idempotent: the same payment id never grants twice. */
  grant(id, phone, product, k, amount, provider, prod) {
    if (this.one('SELECT id FROM purchases WHERE id = ?', id)) return { ok: true, dup: true };
    const u = this.one('SELECT premium_until FROM users WHERE phone = ?', phone); if (!u) return { ok: false, error: 'no_user' };
    this.sql.exec('INSERT INTO purchases (id, phone, product, k, amount, provider, created) VALUES (?, ?, ?, ?, ?, ?, ?)', id, phone, product, k || '', amount, provider, Date.now());
    const out = { ok: true };
    if (prod.kind === 'premium') {
      const until = prod.untilMs || Math.max(Date.now(), u.premium_until || 0) + prod.days * 86400e3;
      this.sql.exec('UPDATE users SET premium_until = ?, plan = ? WHERE phone = ?', until, prod.family ? 'family' : 'single', phone);
      out.premiumUntil = until;
    } else if (prod.kind === 'item') {
      const until = prod.days ? Date.now() + prod.days * 86400e3 : 0;
      this.sql.exec('INSERT OR REPLACE INTO items (phone, item, k, until) VALUES (?, ?, ?, ?)', phone, product, k || '*', until);
    } else if (prod.kind === 'gift') {
      let code; for (let i = 0; i < 6; i++) { code = 'GIFT' + [...crypto.getRandomValues(new Uint8Array(4))].map(b => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b % 32]).join(''); if (!this.one('SELECT code FROM gifts WHERE code = ?', code)) break; }
      this.sql.exec('INSERT INTO gifts (code, days, buyer, created) VALUES (?, ?, ?, ?)', code, prod.days, phone, Date.now());
      out.giftCode = code;
    }
    return out;
  },
  giftOf(id) { const p = this.one('SELECT id FROM purchases WHERE id = ?', id); if (!p) return null; const g = this.one('SELECT code FROM gifts WHERE buyer = (SELECT phone FROM purchases WHERE id = ?) ORDER BY created DESC LIMIT 1', id); return g ? g.code : null; },
  redeemGift(phone, code) {
    const g = this.one('SELECT * FROM gifts WHERE code = ?', code);
    if (!g) return { ok: false, error: 'bad_code' };
    if (g.redeemed_by) return { ok: false, error: g.redeemed_by === phone ? 'already_yours' : 'used' };
    const u = this.one('SELECT premium_until FROM users WHERE phone = ?', phone); if (!u) return { ok: false, error: 'no_user' };
    const until = Math.max(Date.now(), u.premium_until || 0) + g.days * 86400e3;
    this.sql.exec('UPDATE users SET premium_until = ?, plan = CASE WHEN plan = \'family\' THEN plan ELSE \'single\' END WHERE phone = ?', until, phone);
    this.sql.exec('UPDATE gifts SET redeemed_by = ?, redeemed_at = ? WHERE code = ?', phone, Date.now(), code);
    return { ok: true, premiumUntil: until, from: '+' + g.buyer.slice(0, -4).replace(/\d/g, '•') + g.buyer.slice(-4) };
  },
  familyAdd(owner, member, max) {
    const o = this.ownPremium(owner); if (!o || o.plan !== 'family') return { ok: false, error: 'family_plan_required' };
    if (member === owner) return { ok: false, error: 'bad_phone' };
    const n = this.one('SELECT COUNT(*) AS n FROM family_links WHERE owner = ?', owner).n;
    const ex = this.one('SELECT owner FROM family_links WHERE member = ?', member);
    if (ex && ex.owner !== owner) return { ok: false, error: 'in_other_family' };
    if (!ex && n >= max) return { ok: false, error: 'family_full' };
    this.sql.exec('INSERT OR REPLACE INTO family_links (member, owner, added) VALUES (?, ?, ?)', member, owner, Date.now());
    return { ok: true };
  },
  familyRemove(owner, member) { this.sql.exec('DELETE FROM family_links WHERE member = ? AND owner = ?', member, owner); return { ok: true }; },
  /* WhatsApp daily rashifal */
  waSave(phone, on, lang, name, items, canPush) {
    const today = istDay();
    this.sql.exec('DELETE FROM wa_queue WHERE phone = ? OR day < ?', phone, today);
    for (const it of items) this.sql.exec('INSERT OR REPLACE INTO wa_queue (phone, day, text) VALUES (?, ?, ?)', phone, it.day, it.text);
    if (on !== undefined) this.sql.exec('UPDATE users SET wa_daily = ?, wa_name = ?, lang = COALESCE(?, lang) WHERE phone = ?', on && canPush ? 1 : 0, name || '', lang, phone);
    return { ok: true, waDaily: !!(on && canPush), days: items.length };
  },
  waToday(phone) { const r = this.one('SELECT text FROM wa_queue WHERE phone = ? AND day = ?', phone, istDay()); return r ? r.text : null; },
  waDueList() {
    const day = istDay();
    return this.sql.exec(`SELECT u.phone, u.lang, u.wa_name, q.text FROM users u JOIN wa_queue q ON q.phone = u.phone AND q.day = ? WHERE u.wa_daily = 1`, day).toArray()
      .filter(r => this.premOf(r.phone).prem);
  },
  /* usage stats */
  evAdd(ev) {
    const day = istDay();
    for (const [name, n] of Object.entries(ev).slice(0, 30)) {
      if (!/^[a-z0-9_.:-]{1,40}$/i.test(name)) continue;
      this.sql.exec('INSERT INTO ev_counts (day, name, n) VALUES (?, ?, ?) ON CONFLICT(day, name) DO UPDATE SET n = n + excluded.n', day, name, Math.min(100, Math.max(1, Number(n) || 1)));
    }
    return { ok: true };
  },
  errAdd(msg) { this.sql.exec('INSERT INTO errors (at, msg) VALUES (?, ?)', Date.now(), String(msg).slice(0, 600)); this.sql.exec('DELETE FROM errors WHERE id < (SELECT MAX(id) - 500 FROM errors)'); return { ok: true }; },
  stats() {
    const since = istDay(Date.now() - 30 * 86400e3);
    return {
      ok: true,
      events: this.sql.exec('SELECT day, name, n FROM ev_counts WHERE day >= ? ORDER BY day DESC, n DESC', since).toArray(),
      errors: this.sql.exec('SELECT at, msg FROM errors ORDER BY id DESC LIMIT 50').toArray(),
      sales: this.sql.exec('SELECT product, COUNT(*) AS n, SUM(amount) AS paise FROM purchases WHERE created > ? GROUP BY product', Date.now() - 30 * 86400e3).toArray(),
      users: this.one('SELECT COUNT(*) AS n FROM users').n,
      premium: this.one('SELECT COUNT(*) AS n FROM users WHERE premium_until > ?', Date.now()).n,
    };
  }
};

/* -------- Google Play: service-account access token (RS256 JWT) -------- */
let playTok = { t: '', exp: 0 };
async function playAccessToken(env) {
  if (playTok.t && playTok.exp > Date.now() + 60e3) return playTok.t;
  const sa = JSON.parse(env.PLAY_SA_JSON);
  const b64u = s => btoa(s).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  const now = Math.floor(Date.now() / 1000);
  const head = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64u(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const der = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(head + '.' + claim)));
  const jwt = head + '.' + claim + '.' + b64u(String.fromCharCode(...sig));
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt });
  const o = await r.json(); if (!o.access_token) throw new Error('play auth failed');
  playTok = { t: o.access_token, exp: Date.now() + (o.expires_in || 3000) * 1000 };
  return playTok.t;
}

/* -------- routes -------- */
export async function commerceRoutes(path, req, env, ctx, h) {
  const { store, json, has, normPhone, hmacHex, now, ip, sendTemplate, sendText, waReady } = h;
  const body = async () => req.json().catch(() => ({}));
  const C = catalog(env), dev = env.DEV_MODE === 'true';
  const rzpReady = has(env.RAZORPAY_KEY_ID) && has(env.RAZORPAY_KEY_SECRET);
  const rzpAuth = () => 'Basic ' + btoa(env.RAZORPAY_KEY_ID + ':' + env.RAZORPAY_KEY_SECRET);
  const who = async b => store.phoneForToken(String(b.token || ''));
  const cleanKey = k => (k && ITEM_KEY.test(String(k)) ? String(k) : '*');

  if (path === '/api/pay/config') return json(env, { ok: true, razorpay: rzpReady, keyId: rzpReady ? env.RAZORPAY_KEY_ID : '', play: has(env.PLAY_SA_JSON) || dev, prices: Object.fromEntries(Object.entries(C).map(([k, v]) => [k, v.amount / 100])) });

  if (path === '/api/pay/order' && req.method === 'POST') {
    const b = await body(), phone = await who(b);
    if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
    const prod = C[b.product]; if (!prod) return json(env, { ok: false, error: 'bad_product' }, 400);
    if (!rzpReady) {
      if (!dev) return json(env, { ok: false, error: 'not_configured' });
      return json(env, { ok: true, dev: true, orderId: 'order_dev_' + Date.now(), keyId: 'rzp_test_dev', amount: prod.amount });
    }
    const r = await fetch('https://api.razorpay.com/v1/orders', { method: 'POST', headers: { authorization: rzpAuth(), 'content-type': 'application/json' },
      body: JSON.stringify({ amount: prod.amount, currency: 'INR', receipt: ('js' + Date.now()).slice(0, 40), notes: { phone, product: b.product, k: cleanKey(b.key) } }) });
    const o = await r.json().catch(() => ({}));
    if (!r.ok || !o.id) { console.log('razorpay order error', r.status, JSON.stringify(o).slice(0, 300)); return json(env, { ok: false, error: 'pay_failed' }, 502); }
    return json(env, { ok: true, orderId: o.id, keyId: env.RAZORPAY_KEY_ID, amount: prod.amount });
  }
  if (path === '/api/pay/verify' && req.method === 'POST') {
    const b = await body(), phone = await who(b);
    if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
    const orderId = String(b.orderId || ''), payId = String(b.paymentId || '');
    let product, k, amount;
    if (dev && !rzpReady && orderId.startsWith('order_dev_')) { product = b.product; k = cleanKey(b.key); amount = (C[product] || {}).amount; }
    else {
      if (!rzpReady) return json(env, { ok: false, error: 'not_configured' });
      const want = await hmacHex(env.RAZORPAY_KEY_SECRET, new TextEncoder().encode(orderId + '|' + payId));
      if (want !== String(b.signature || '')) return json(env, { ok: false, error: 'bad_signature' }, 400);
      const r = await fetch('https://api.razorpay.com/v1/orders/' + encodeURIComponent(orderId), { headers: { authorization: rzpAuth() } });
      const o = await r.json().catch(() => ({}));
      if (!r.ok || o.status !== 'paid' && o.amount_paid !== o.amount) {
        // payment may still be capturing; the webhook will grant it
        if (!(o.notes && o.notes.phone)) return json(env, { ok: false, error: 'pay_failed' }, 502);
      }
      if ((o.notes || {}).phone !== phone) return json(env, { ok: false, error: 'wrong_user' }, 403);
      product = o.notes.product; k = o.notes.k; amount = o.amount;
    }
    const prod = C[product]; if (!prod) return json(env, { ok: false, error: 'bad_product' }, 400);
    const g = await store.grant('rzp:' + (payId || orderId), phone, product, k, amount, 'razorpay', prod);
    if (g.dup && prod.kind === 'gift') g.giftCode = await store.giftOf('rzp:' + (payId || orderId));
    return json(env, { ...g, ent: await store.entitlements(phone) });
  }
  if (path === '/api/pay/webhook' && req.method === 'POST') {
    const raw = await req.arrayBuffer();
    if (!has(env.RAZORPAY_WEBHOOK_SECRET)) return new Response('not configured', { status: 501 });
    if ((req.headers.get('x-razorpay-signature') || '') !== await hmacHex(env.RAZORPAY_WEBHOOK_SECRET, raw)) return new Response('bad signature', { status: 401 });
    let d = {}; try { d = JSON.parse(new TextDecoder().decode(raw)); } catch (e) { }
    const p = d.payload && d.payload.payment && d.payload.payment.entity;
    if ((d.event === 'payment.captured' || d.event === 'order.paid') && p && p.notes && p.notes.phone && C[p.notes.product])
      await store.grant('rzp:' + p.id, p.notes.phone, p.notes.product, p.notes.k, p.amount, 'razorpay', C[p.notes.product]);
    return new Response('OK');
  }
  if (path === '/api/play/verify' && req.method === 'POST') {
    const b = await body(), phone = await who(b);
    if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
    const prodKey = Object.keys(C).find(k => C[k].play === b.product || k === b.product), prod = C[prodKey];
    const ptok = String(b.purchaseToken || '');
    if (!prod || ptok.length < 10) return json(env, { ok: false, error: 'bad_request' }, 400);
    const k = cleanKey(b.key); let grantProd = prod;
    if (has(env.PLAY_SA_JSON)) {
      const pkg = env.PLAY_PACKAGE || 'com.jyotishsaathi.app';
      const at = await playAccessToken(env), base = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${pkg}/purchases`;
      if (prod.kind === 'premium') {
        const r = await fetch(`${base}/subscriptionsv2/tokens/${encodeURIComponent(ptok)}`, { headers: { authorization: 'Bearer ' + at } });
        const o = await r.json().catch(() => ({}));
        const li = (o.lineItems || [])[0];
        if (!r.ok || !li || !['SUBSCRIPTION_STATE_ACTIVE', 'SUBSCRIPTION_STATE_IN_GRACE_PERIOD'].includes(o.subscriptionState)) return json(env, { ok: false, error: 'not_active' }, 402);
        grantProd = { ...prod, untilMs: Date.parse(li.expiryTime) };
        if (o.acknowledgementState !== 'ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED') ctx.waitUntil(fetch(`${base}/subscriptions/${prod.play}/tokens/${encodeURIComponent(ptok)}:acknowledge`, { method: 'POST', headers: { authorization: 'Bearer ' + at, 'content-type': 'application/json' }, body: '{}' }));
      } else {
        const r = await fetch(`${base}/products/${prod.play}/tokens/${encodeURIComponent(ptok)}`, { headers: { authorization: 'Bearer ' + at } });
        const o = await r.json().catch(() => ({}));
        if (!r.ok || o.purchaseState !== 0) return json(env, { ok: false, error: 'not_paid' }, 402);
        if (o.acknowledgementState !== 1) ctx.waitUntil(fetch(`${base}/products/${prod.play}/tokens/${encodeURIComponent(ptok)}:acknowledge`, { method: 'POST', headers: { authorization: 'Bearer ' + at, 'content-type': 'application/json' }, body: '{}' }));
      }
    } else if (!dev) return json(env, { ok: false, error: 'not_configured' });
    // subscriptions renew with the same token: key the purchase by token + expiry so each renewal is recorded once
    const id = 'play:' + (await h.sha256(ptok)).slice(0, 40) + (grantProd.untilMs ? ':' + grantProd.untilMs : '');
    if (grantProd.untilMs && prod.kind === 'premium') await store.grant(id, phone, prodKey, k, prod.amount, 'play', grantProd);
    const g = grantProd.untilMs ? { ok: true } : await store.grant(id, phone, prodKey, k, prod.amount, 'play', grantProd);
    if (g.dup && prod.kind === 'gift') g.giftCode = await store.giftOf(id);
    return json(env, { ...g, ent: await store.entitlements(phone) });
  }
  if (path === '/api/gift/redeem' && req.method === 'POST') {
    const b = await body(), phone = await who(b);
    if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
    const code = String(b.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!(await store.ipAllowed('gift:' + ip, now, 20))) return json(env, { ok: false, error: 'rate_limited' }, 429);
    const r = await store.redeemGift(phone, code);
    return json(env, r.ok ? { ...r, ent: await store.entitlements(phone) } : r, r.ok ? 200 : 400);
  }
  if ((path === '/api/family/add' || path === '/api/family/remove') && req.method === 'POST') {
    const b = await body(), phone = await who(b);
    if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
    const m = normPhone(b.phone); if (!m) return json(env, { ok: false, error: 'bad_phone' }, 400);
    const r = path.endsWith('add') ? await store.familyAdd(phone, m, Number(env.FAMILY_MAX || 5)) : await store.familyRemove(phone, m);
    return json(env, r.ok ? { ...r, ent: await store.entitlements(phone) } : r, r.ok ? 200 : 400);
  }
  if (path === '/api/wa/daily' && req.method === 'POST') {
    const b = await body(), phone = await who(b);
    if (!phone) return json(env, { ok: false, error: 'login_required' }, 401);
    const items = (Array.isArray(b.items) ? b.items : []).slice(0, 16)
      .filter(x => x && /^\d{4}-\d{2}-\d{2}$/.test(x.day) && typeof x.text === 'string')
      .map(x => ({ day: x.day, text: x.text.replace(/[\r\n\t]+/g, ' · ').replace(/ {4,}/g, ' ').slice(0, 900) }));
    const prem = (await store.premOf(phone)).prem;
    if (b.on && !prem) return json(env, { ok: false, error: 'premium_required' }, 402);
    const lang = b.lang === 'hi' ? 'hi' : b.lang === 'en' ? 'en' : null;
    return json(env, await store.waSave(phone, b.on === undefined ? undefined : !!b.on, lang, String(b.name || '').slice(0, 40), items, prem));
  }
  if (path === '/api/ev' && req.method === 'POST') {
    const b = await body();
    if (!b.ev || typeof b.ev !== 'object') return json(env, { ok: false }, 400);
    if (!(await store.ipAllowed('ev:' + ip, now, 120))) return json(env, { ok: true });
    return json(env, await store.evAdd(b.ev));
  }
  if (path === '/api/err' && req.method === 'POST') {
    const b = await body();
    if (!(await store.ipAllowed('err:' + ip, now, 30))) return json(env, { ok: true });
    return json(env, await store.errAdd([b.ver, b.src, b.line, b.msg].map(x => String(x || '').slice(0, 300)).join(' | ')));
  }
  if (path === '/api/admin/stats') {
    const key = new URL(req.url).searchParams.get('key') || (req.headers.get('authorization') || '').replace(/^Bearer /, '');
    if (!(has(env.ADMIN_KEY) && key === env.ADMIN_KEY)) return new Response('Unauthorised', { status: 401 });
    return json(env, await store.stats());
  }
  return null;
}

/* -------- WhatsApp: free "rashifal" keyword reply and the 7 am daily message -------- */
export async function waKeyword(text, from, h) {
  const { store, env, sendText, waReady } = h;
  if (!/rashifal|राशिफल|horoscope|aaj/i.test(text) || !waReady(env)) return false;
  const t = await store.waToday(from);
  await sendText(env, from, t ? t : 'Namaste 🙏 Aaj ka rashifal paane ke liye ek baar Jyotish Saathi app kholiye, phir yahan "Rashifal" likhiye.' + (env.APP_LINK ? '\n' + env.APP_LINK : ''));
  return true;
}
export async function dailyWhatsApp(env, h) {
  const { store, sendTemplate, waReady, has } = h;
  if (!waReady(env) || !has(env.DAILY_TEMPLATE)) return 0;
  const due = await store.waDueList(); let n = 0;
  for (const u of due) {
    const comps = [{ type: 'body', parameters: [{ type: 'text', text: (u.wa_name || 'ji').slice(0, 40) }, { type: 'text', text: u.text.slice(0, 900) }] }];
    if (await sendTemplate(env, u.phone, env.DAILY_TEMPLATE, u.lang === 'hi' ? env.LANG_HI : env.LANG_EN, comps)) n++;
  }
  console.log('daily whatsapp sent', n, 'of', due.length);
  return n;
}
