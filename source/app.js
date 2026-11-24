/* Jyotish Saathi - UI */
(function () {
  const E = AstroEngine;
  const KEY = 'jyotish_saathi_v1';
  let mem = null;
  const store = {
    load() { try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; } catch (e) { return mem; } },
    save(o) { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { } }
  };
  let ANIM = true;
  const S = Object.assign({ lang: null, scale: 1, profiles: [], activeId: null, homeCity: null, notify: false, premium: false, user: null }, store.load() || {});
  const V = { tab: 'home', sub: null, dayOffset: 0, chartMode: 'lagna', editId: null, palmStep: -1, palmAns: [], palmImg: null, pDate: null, matchRes: null, showAllDasha: false, speaking: false, onboard: !S.profiles.length };
  const persist = () => store.save({ lang: S.lang, scale: S.scale, profiles: S.profiles, activeId: S.activeId, homeCity: S.homeCity, notify: S.notify, premium: S.premium, user: S.user, palmUsed: S.palmUsed || 0, palmReadings: S.palmReadings || {}, serverPremium: !!S.serverPremium, palmFreeLeft: S.palmFreeLeft, favM: S.favM || [], compatUse: S.compatUse || null, compatCache: S.compatCache || {}, vastuMap: S.vastuMap || {}, aiChats: S.aiChats || {}, reports: S.reports || {}, voiceRate: S.voiceRate || 'normal', templePlace: S.templePlace || '', items: S.items || [], plan: S.plan || '', family: S.family || [], familyOwner: S.familyOwner || '', waDaily: !!S.waDaily, jaap: S.jaap || null, tdates: S.tdates || [], remind: S.remind || {}, vchk: S.vchk || {}, voiceGender: S.voiceGender || 'f', lastDaily: S.lastDaily || '' });
  try { if (location.hash === '#premium-demo') S.premium = true; } catch (e) { }

  const L = () => S.lang && S.lang !== 'en' ? 1 : 0;   // Hindi text is also used for Marathi and Gujarati content
  const RGW = a => (S.lang === 'mr' || S.lang === 'gu') && a && GX.rg[S.lang][a[0]];
  const t = k => { const a = T[k] || [k, k]; return RGW(a) || a[L()]; };
  const pick = arr => RGW(arr) || arr[L()];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = s => document.querySelector(s);
  const pad = n => String(n).padStart(2, '0');

  function fmtTime(jd, tz) {
    const x = E.jdToLocal(jd, tz); let h = x.h, m = x.min;
    const h12 = ((h + 11) % 12) + 1;
    if (L()) { const part = h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 20 ? 'शाम' : 'रात'; return `${part} ${h12}:${pad(m)}`; }
    return `${h12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
  }
  const fmtDate = (y, m, d, withWd) => {
    const wd = E.weekday(y, m, d);
    return (withWd ? pick(C.wd[wd]) + ', ' : '') + `${d} ${pick(C.months[m - 1])} ${y}`;
  };
  const fmtMonthYear = jd => { const x = E.jdToLocal(jd, 5.5); return `${pick(C.months[x.m - 1]).slice(0, L() ? 10 : 3)} ${x.y}`; };
  const fmtClock = (h, m) => { const h12 = ((h + 11) % 12) + 1; return L() ? `${h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 20 ? 'शाम' : 'रात'} ${h12}:${pad(m)}` : `${h12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`; };
  const fmtTz = z => { const h = Math.floor(z), m = Math.round((z - h) * 60); return `GMT+${h}:${pad(m)}`; };
  const fmtDeg = d => `${Math.floor(d)}°${pad(Math.floor((d % 1) * 60))}'`;
  const pName = n => pick(C.planet[n]);
  const stars = (n, cls = '') => `<span class="stars ${cls}" aria-label="${n}/5">${'<i>★</i>'.repeat(n)}${'<i class="o">★</i>'.repeat(5 - n)}</span>`;
  const active = () => S.profiles.find(p => p.id === S.activeId) || S.profiles[0];
  const todayYMD = (off = 0) => { const n = new Date(Date.now() + off * 86400000); return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() }; };
  const chartCache = {};
  function chartOf(p) {
    const k = [p.y, p.m, p.d, p.h, p.min, p.lat, p.lon, p.tz, !!p.timeUnknown, p.tzAuto].join('|');
    if (!chartCache[k]) chartCache[k] = E.chart(p);
    return chartCache[k];
  }
  const place = () => {
    if (S.homeCity != null && C.cities[S.homeCity]) { const c = C.cities[S.homeCity]; return { name: pick([c[0], c[1]]), lat: c[2], lon: c[3], tz: 5.5 }; }
    const p = active(); return p ? { name: p.place, lat: p.lat, lon: p.lon, tz: p.tz } : { name: 'Delhi', lat: 28.61, lon: 77.21, tz: 5.5 };
  };

  /* ---------- Icons ---------- */
  const ICON = {
    today: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.2 5.2l1.8 1.8M17 17l1.8 1.8M5.2 18.8 7 17M17 7l1.8-1.8"/></svg>',
    kundli: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 3l18 18M21 3 3 21M12 3l9 9-9 9-9-9z"/></svg>',
    palm: '<svg viewBox="0 0 24 24"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5a1.5 1.5 0 0 1 3 0v8M17 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6.5 6.5 0 0 1-5.4-2.9L4 15.2a1.6 1.6 0 0 1 2.6-1.8L8 15"/></svg>',
    panchang: '<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><circle cx="12" cy="15" r="2.2"/></svg>',
    family: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.1 5 2.4 5 5.8"/></svg>',
    match: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M9 11h6M12 8v6"/></svg>',
    more: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><circle cx="16.75" cy="16.75" r="3.3"/></svg>',
    bhakti: '<svg viewBox="0 0 24 24"><path d="M12 2.5l1.5 3h-3z"/><path d="M7 9.5h10l-1.5-4h-7zM5 20.5h14M6.5 20.5v-8h11v8M10 20.5v-4.5a2 2 0 0 1 4 0v4.5M4.5 12.5h15l-2.5-3h-10z"/></svg>',
    speaker: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1-.5-2.4-1.9-2.9-2.9l1-1-1-2z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cross: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    crown: '<svg viewBox="0 0 24 24"><path d="M3.5 8l4.5 4 4-6.5 4 6.5 4.5-4-2 10.5h-13z"/></svg>'
  };
  function medallion(id) {
    const rays = Array.from({ length: 12 }, (_, i) => { const a = (i * 30 - 90) * Math.PI / 180, b = a + 0.13, c = a - 0.13;
      return `<path d="M${32 + Math.cos(c) * 15.5} ${32 + Math.sin(c) * 15.5}L${32 + Math.cos(a) * 24.5} ${32 + Math.sin(a) * 24.5}L${32 + Math.cos(b) * 15.5} ${32 + Math.sin(b) * 15.5}Z" fill="url(#${id}r)"/>`; }).join('');
    return `<defs>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF0B3"/><stop offset=".35" stop-color="#E8B544"/><stop offset=".65" stop-color="#A86F12"/><stop offset="1" stop-color="#F5CF68"/></linearGradient>
      <radialGradient id="${id}e" cx=".42" cy=".36" r=".75"><stop offset="0" stop-color="#B5303F"/><stop offset=".7" stop-color="#7B1E2B"/><stop offset="1" stop-color="#4A0E18"/></radialGradient>
      <radialGradient id="${id}s" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="#FFF8D6"/><stop offset=".45" stop-color="#FFC94D"/><stop offset="1" stop-color="#E06A12"/></radialGradient>
      <linearGradient id="${id}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE38A"/><stop offset="1" stop-color="#D99A2B"/></linearGradient>
      <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <circle cx="32" cy="33.2" r="30" fill="#3A0A12" opacity=".35"/>
    <circle cx="32" cy="32" r="30" fill="url(#${id}g)"/><circle cx="32" cy="32" r="26.6" fill="#8E5A0E"/><circle cx="32" cy="32" r="26" fill="url(#${id}e)"/>
    ${rays}<circle cx="32" cy="32" r="12.6" fill="#9C5A0C"/><circle cx="32" cy="32" r="12" fill="url(#${id}s)"/>
    <path d="M36.2 26.4a6.8 6.8 0 1 0 0 11.2 8.4 8.4 0 1 1 0-11.2z" fill="#7B1E2B" opacity=".92"/>
    <ellipse cx="27" cy="17" rx="17" ry="9" fill="url(#${id}h)"/>`;
  }
  const LOGO = `<svg class="logo" viewBox="0 0 64 64" aria-hidden="true">${medallion('lg')}</svg>`;

  /* ---------- Daily prediction ---------- */
  function prediction(p, off) {
    const ch = chartOf(p), dt = todayYMD(off);
    const dy = E.daily({ moonSign: ch.moonSign, moonNak: ch.moonNak, key: p.id }, dt.y, dt.m, dt.d, p.tz || 5.5);
    const seed = dy.seed;
    // ---- many factors, like an astrologer would weigh them ----
    const jdNoon = E.jdFromLocal(dt.y, dt.m, dt.d, 12, 0, 5.5), tr = E.sidereal(jdNoon);
    const fromMoon = lon => ((Math.floor(lon / 30) - ch.moonSign + 12) % 12) + 1;
    const jh = fromMoon(tr.Jupiter), sh = fromMoon(tr.Saturn);
    const why = [];
    const add = (v, key, n) => why.push({ v, key, n });
    if ([2, 5, 7, 9, 11].includes(jh)) add(0.4, 'guruGood', jh); else if ([3, 6, 8, 12].includes(jh)) add(-0.2, 'guruWeak', jh);
    if ([12, 1, 2].includes(sh)) add(-0.4, 'sadeSati', sh); else if ([4, 8].includes(sh)) add(-0.3, 'dhaiya', sh); else if ([3, 6, 11].includes(sh)) add(0.3, 'shaniGood', sh);
    const md = ch.dasha.find(x => x.start <= jdNoon && x.end > jdNoon) || ch.dasha[0], ad = md.sub.find(x => x.start <= jdNoon && x.end > jdNoon) || md.sub[0];
    const adS = planetStrength(ch.planets.find(x => x.name === ad.lord));
    if (adS >= 1) add(0.3, 'dashaGood', ad.lord); else if (adS <= -1) add(-0.3, 'dashaWeak', ad.lord);
    const tt = E.dayPanchang(dt.y, dt.m, dt.d, 22.0, 78.0, 5.5).tithi;
    if (tt === 29) add(-0.3, 'amavasya'); else if (tt === 14) add(0.2, 'purnima'); else if (tt === 10 || tt === 25) add(0.2, 'ekadashi'); else if ([3, 8, 13, 18, 23, 28].includes(tt)) add(-0.2, 'rikta');
    const wdRel = E.rel(E.SIGN_LORD[ch.moonSign], C.wdLord[dy.wd]);
    const base = C.houseBase[dy.house - 1] + C.taraMod[dy.tara] + (wdRel === 'f' ? 0.15 : wdRel === 'e' ? -0.15 : 0);
    let score = Math.max(1, Math.min(5, Math.round(base + why.reduce((a, b) => a + b.v, 0))));
    if (dy.house === 8) score = Math.min(score, 2);   // Chandrashtama always calls for care
    const natal = (() => { const R = lifeReading(ch, jdNoon); return ['career', 'money', 'health', 'family'].map(k => R.areas.find(a => a.k === k).stars); })();
    const areas = C.areaMod[dy.house - 1].map((mod, i) => {
      const noise = (((seed >>> (i * 3)) & 7) - 3.5) / 14;
      return Math.max(1, Math.min(5, Math.round(score + mod + (natal[i] - 3) * 0.35 + noise)));
    });
    why.sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
    const moonLord = E.SIGN_LORD[ch.moonSign], wdLord = C.wdLord[dy.wd];
    const luckyP = E.rel(moonLord, wdLord) !== 'e' ? wdLord : moonLord;
    const enemies = E.FRIENDS[moonLord].e.filter(x => C.colour[x][0] !== C.colour[luckyP][0]);
    const avoidP = enemies.length ? enemies[seed % enemies.length] : 'Rahu';
    const droot = n => { while (n > 9) n = String(n).split('').reduce((a, b) => a + +b, 0); return n || 9; };
    const luckyNum = droot(droot(p.d) + C.wdNum[dy.wd] + (seed % 3));
    const badTara = C.taraMod[dy.tara] < 0;
    const dos = [C.houseDo[dy.house - 1], C.wdDo[dy.wd], C.genDo[seed % C.genDo.length]];
    const donts = [C.houseDont[dy.house - 1], C.wdDont[dy.wd], badTara ? C.badTaraDont : C.genDont[(seed >>> 4) % C.genDont.length]];
    const pl = place();
    const pc = E.dayPanchang(dt.y, dt.m, dt.d, pl.lat, pl.lon, pl.tz);
    return { why: why.slice(0, 3), dt, dy, score, areas, lucky: C.colour[luckyP], avoid: C.colour[avoidP], luckyNum, luckyDir: C.luckyDir[C.wdLord.indexOf(wdLord)], avoidDir: C.avoidDir[dy.wd], dos, donts, pc, pl, ch, mantra: C.mantra[dy.wd] };
  }

  function predictionText(p, r) {
    const lines = [
      `${t('namaste')} ${p.name}`,
      `${fmtDate(r.dt.y, r.dt.m, r.dt.d, true)} · ${t('rashi')}: ${pick(C.rashiShort[r.ch.moonSign])}`,
      `${pick(C.dayLabel[r.score])} (${r.score}/5)`,
      pick(C.houseMsg[r.dy.house - 1]),
      `${t('luckyColour')}: ${pick(r.lucky)} · ${t('luckyNumber')}: ${r.luckyNum}`,
      `${t('doToday')}: ${r.dos.map(pick).join('; ')}`,
      `${t('dontToday')}: ${r.donts.map(pick).join('; ')}`,
      `${t('rahuKaal')}: ${fmtTime(r.pc.rahu.start, r.pl.tz)} - ${fmtTime(r.pc.rahu.end, r.pl.tz)}`
    ];
    return lines.join('\n');
  }

  /* ---------- Screens ---------- */
  function screenToday() {
    const p = active(); const r = prediction(p, V.dayOffset);
    const swatch = c => `<span class="swatch" style="background:${c[2]}"></span>`;
    const shareTxt = predictionText(p, r) + `\n\n— ${t('appName')}`;
    return `
    <div class="seg"><button data-a="day" data-v="0" class="${V.dayOffset === 0 ? 'on' : ''}">${t('todayFor')}</button><button data-a="day" data-v="1" class="${V.dayOffset === 1 ? 'on' : ''}">${t('tomorrow')}</button></div>
    <section class="card hero">
      <div class="hero-top"><div><div class="muted">${fmtDate(r.dt.y, r.dt.m, r.dt.d, true)}</div><h2>${t('namaste')}, ${esc(p.name.split(' ')[0])} 🙏</h2></div>
      <div class="badge">${t('rashi')}<b>${pick(C.rashiShort[r.ch.moonSign])}</b></div></div>
      <div class="score s${r.score}">${stars(r.score, 'big')}<div class="score-l">${pick(C.dayLabel[r.score])}</div></div>
      <p class="lead">${pick(C.houseMsg[r.dy.house - 1])}</p>
      <p class="tara"><b>${t('tara')}: ${pick(C.taraName[r.dy.tara])}</b> · ${pick(C.taraText[r.dy.tara])}</p>
      ${basisLine(r)}
      ${r.why.length ? `<ul class="why">${r.why.map(w => `<li class="${w.v > 0 ? 'up' : 'down'}">${w.v > 0 ? '▲' : '▼'} ${pick(C.why[w.key]).replace('{n}', w.key.startsWith('dasha') ? pName(w.n) : w.n)}</li>`).join('')}</ul>` : ''}
      <button class="btn primary block suno" data-a="speak">${ICON.speaker}<span>${V.speaking === 'day' ? t('stop') : V.dayOffset ? t('listen') : g('sunoBig')}</span></button>
      <div class="row2">
        <a class="btn wa" href="https://wa.me/?text=${encodeURIComponent(shareTxt)}" target="_blank" rel="noopener">${ICON.wa}<span>${t('shareWA')}</span></a>
        <button class="btn ghost" data-a="shareCard" data-v="day">🖼️<span>${g('shareCard')}</span></button>
      </div>
      <button class="btn link block mic" data-a="voiceAsk">🎙️ ${g('askVoice')}</button>
    </section>
    ${V.dayOffset === 0 ? nextFestCard() : ''}
    ${V.dayOffset === 0 ? quickTiles() : ''}
    ${V.dayOffset === 0 ? templeCard() : ''}
    <section class="grid4">
      <div class="tile"><div class="tl">${t('luckyColour')}</div><div class="tv">${swatch(r.lucky)}${pick(r.lucky)}</div></div>
      <div class="tile"><div class="tl">${t('luckyNumber')}</div><div class="tv num">${r.luckyNum}</div></div>
      <div class="tile"><div class="tl">${t('luckyDir')}</div><div class="tv">🧭 ${pick(r.luckyDir)}</div></div>
      <div class="tile warn"><div class="tl">${t('avoidColour')}</div><div class="tv">${swatch(r.avoid)}${pick(r.avoid)}</div></div>
    </section>
    <section class="card"><h3>${t('doToday')}</h3><ul class="list good">${r.dos.map(x => `<li>${ICON.check}<span>${pick(x)}</span></li>`).join('')}</ul></section>
    <section class="card"><h3>${t('dontToday')}</h3><ul class="list bad">${r.donts.map(x => `<li>${ICON.cross}<span>${pick(x)}</span></li>`).join('')}
      <li>${ICON.cross}<span>${t('avoidTravel')} <b>${pick(r.avoidDir)}</b></span></li></ul></section>
    <section class="card"><h3>${t('lifeAreas')}</h3>${C.areas.map((a, i) => `<div class="area"><span>${pick(a)}</span>${stars(r.areas[i])}</div>`).join('')}</section>
    <section class="card"><h3>${t('timings')}</h3>
      <div class="time bad"><span>${t('rahuKaal')}</span><b>${fmtTime(r.pc.rahu.start, r.pl.tz)} – ${fmtTime(r.pc.rahu.end, r.pl.tz)}</b></div>
      ${r.dy.wd !== 3 ? `<div class="time good"><span>${t('abhijit')}</span><b>${fmtTime(r.pc.abhijit.start, r.pl.tz)} – ${fmtTime(r.pc.abhijit.end, r.pl.tz)}</b></div>` : ''}
      <div class="time"><span>${t('sunrise')} / ${t('sunset')}</span><b>${fmtTime(r.pc.sunrise, r.pl.tz)} / ${fmtTime(r.pc.sunset, r.pl.tz)}</b></div>
      <div class="muted small">${esc(r.pl.name)}</div>
    </section>
    <section class="card mantra"><h3>${t('mantraDay')}</h3><div class="mtext">${r.mantra[0]}</div><div class="muted">${r.mantra[1]} · ${t('chant11')}</div></section>
    ${premiumCard()}`;
  }

  function chartSVG(ch, mode) {
    const d9 = mode === 'd9', psign = pl => d9 ? pl.d9 : pl.sign;
    const asc = mode === 'lagna' ? ch.lagnaSign : d9 ? (ch.timeUnknown ? ch.planets[1].d9 : ch.lagnaD9) : ch.moonSign;
    const centers = [[200, 100], [100, 42], [42, 100], [100, 200], [42, 300], [100, 358], [200, 300], [300, 358], [358, 300], [300, 200], [358, 100], [300, 42]];
    const signPos = [[200, 178], [100, 86], [86, 100], [178, 200], [86, 300], [100, 314], [200, 222], [300, 314], [314, 300], [222, 200], [314, 100], [300, 86]];
    const byH = Array.from({ length: 12 }, () => []);
    if ((mode === 'lagna' || d9) && !ch.timeUnknown) byH[0].push(`<tspan class="asc">${L() ? 'ल' : 'Asc'}</tspan>`);
    ch.planets.forEach(pl => {
      const h = ((psign(pl) - asc + 12) % 12);
      byH[h].push(pick(C.pAbbr[pl.name]) + (pl.retro && pl.name !== 'Rahu' && pl.name !== 'Ketu' ? (L() ? '(व)' : '(R)') : ''));
    });
    let txt = '';
    byH.forEach((items, h) => {
      const kite = [0, 3, 6, 9].includes(h); const per = kite ? 3 : 2;
      const rows = []; for (let i = 0; i < items.length; i += per) rows.push(items.slice(i, i + per).join(' '));
      const [cx, cy] = centers[h]; const lh = 19; const y0 = cy - (rows.length - 1) * lh / 2 + (kite ? -8 : 0);
      rows.forEach((row, i) => txt += `<text x="${cx}" y="${y0 + i * lh}" class="pl">${row}</text>`);
      const [sx, sy] = signPos[h];
      txt += `<text x="${sx}" y="${sy}" class="sn">${((asc + h) % 12) + 1}</text>`;
    });
    return `<svg class="chart draw" viewBox="-4 -4 408 408" role="img" aria-label="${t('birthChart')}">
      <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFDF8"/><stop offset="1" stop-color="#FCEBD2"/></linearGradient></defs><rect x="0" y="0" width="400" height="400" rx="6" class="cbg"/>
      <path d="M0 0L400 400M400 0L0 400M200 0L400 200L200 400L0 200Z" class="cl"/>${txt}</svg>`;
  }

  /* ---------- Life reading from the birth chart ---------- */
  function planetStrength(x) {
    if (!x) return 0;
    const DIG = { ex: 2, own: 1.5, friend: 0.5, neutral: 0, enemy: -0.5, deb: -2 }, DIG9 = { ex: 1, own: 0.75, friend: 0.25, neutral: 0, enemy: -0.25, deb: -1 };
    if (!x.dignity) return [6, 8, 12].includes(x.house) ? -0.5 : 0;
    let v = DIG[x.dignity] + (DIG9[x.d9dignity] || 0) + (x.vargottama ? 0.75 : 0) - (x.combust ? 1.5 : 0);
    if ([1, 4, 5, 7, 9, 10].includes(x.house)) v += 0.5; else if ([6, 8, 12].includes(x.house)) v -= 1;
    return v;
  }
  const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
  const BENEFIC = ['Jupiter', 'Venus', 'Mercury', 'Moon'];
  function dignity(pl) {
    if (!(pl.name in EXALT)) return null;
    if (pl.sign === EXALT[pl.name]) return 'ex';
    if (pl.sign === (EXALT[pl.name] + 6) % 12) return 'deb';
    if (E.SIGN_LORD[pl.sign] === pl.name) return 'own';
    return null;
  }
  function lifeReading(ch, now) {
    const BENEFIC = ['Jupiter', 'Venus', 'Mercury', 'Moon'];
    const P = n => ch.planets.find(x => x.name === n);
    const lordOf = h => E.SIGN_LORD[(ch.lagnaSign + h - 1) % 12];
    // planet strength: sign dignity, Navamsa (D9), vargottama, combustion, house placement
    const DIG = { ex: 2, own: 1.5, friend: 0.5, neutral: 0, enemy: -0.5, deb: -2 }, DIG9 = { ex: 1, own: 0.75, friend: 0.25, neutral: 0, enemy: -0.25, deb: -1 };
    const strength = x => {
      if (!x.dignity) return [1, 4, 5, 7, 9, 10].includes(x.house) ? 0 : [6, 8, 12].includes(x.house) ? -0.5 : 0; // Rahu / Ketu
      let v = DIG[x.dignity] + (DIG9[x.d9dignity] || 0) + (x.vargottama ? 0.75 : 0) - (x.combust ? 1.5 : 0);
      if ([1, 4, 5, 7, 9, 10].includes(x.house)) v += 0.5; else if ([6, 8, 12].includes(x.house)) v -= 1;
      return v;
    };
    const UPA = [3, 6, 10, 11];
    const houseScore = h => {
      let s = 3; const L = P(lordOf(h));
      s += Math.max(-1.5, Math.min(1.5, strength(L) * 0.5));
      ch.planets.filter(x => x.house === h).forEach(x => {
        if (BENEFIC.includes(x.name)) s += (x.dignity === 'deb' || x.combust) ? 0 : 0.5; else s += UPA.includes(h) ? 0.5 : -0.5;
      });
      ch.planets.filter(x => x.house !== h && x.aspects.includes(h)).forEach(x => {   // drishti (aspects) on the house
        if (x.name === 'Jupiter') s += 0.6; else if (x.name === 'Venus' || x.name === 'Mercury') s += 0.3;
        else if (['Saturn', 'Mars', 'Rahu'].includes(x.name)) s += UPA.includes(h) ? 0.2 : -0.4;
      });
      return s;
    };
    const periodFor = lords => {
      for (const md of ch.dasha) for (const ad of md.sub) {
        if (ad.end <= now || ad.start > now + 25 * 365.25) continue;
        if (lords.includes(ad.lord) || (lords.includes(md.lord) && ad.lord === md.lord)) return { start: Math.max(ad.start, now), end: ad.end, lord: ad.lord, md: md.lord, now: ad.start <= now };
      }
      return null;
    };
    const areas = C.life.areas.map(a => {
      let s = a.h.reduce((x, h) => x + houseScore(h), 0) / a.h.length;
      const karaka = a.kar ? P(a.kar) : P(lordOf(1));
      s += Math.max(-1, Math.min(1, strength(karaka) * 0.3));
      if (a.k === 'love') { const l7 = P(lordOf(7)), v = P('Venus'); s += ((DIG9[l7.d9dignity] || 0) + (DIG9[v.d9dignity] || 0)) * 0.4; }   // marriage: Navamsa
      if (a.k === 'career') { const l10 = P(lordOf(10)); s += (DIG9[l10.d9dignity] || 0) * 0.4; }
      const stars = Math.max(1, Math.min(5, Math.round(s)));
      const lvl = stars >= 4 ? 's' : stars >= 3 ? 'a' : 'w';
      const mainHouse = a.h[a.h.length - 1], lord = lordOf(mainHouse);
      const occ = ch.planets.filter(x => a.h.includes(x.house)).map(x => {
        const dg = dignity(x);
        const kind = dg === 'deb' ? 'slow' : BENEFIC.includes(x.name) ? 'good' : [3, 6, 10, 11].includes(x.house) ? 'push' : 'slow';
        return pick(C.life.inHouse[kind]).replace('{p}', pName(x.name) + (dg ? ` (${pick(C.life.dignity[dg])})` : ''));
      });
      const lords = [...new Set(a.h.map(lordOf).concat(a.kar ? [a.kar] : []))];
      return { ...a, stars, lvl, lord, occ, period: periodFor(lords) };
    });
    // yogas
    const yogas = [];
    const sun = P('Sun'), moon = P('Moon'), mars = P('Mars'), merc = P('Mercury'), jup = P('Jupiter');
    if ([0, 3, 6, 9].includes((jup.sign - moon.sign + 12) % 12)) yogas.push('gaja');
    if (sun.sign === merc.sign) yogas.push('budh');
    if (moon.sign === mars.sign) yogas.push('chandramangal');
    const sameSign = (a, b) => a !== b && P(a).sign === P(b).sign;
    const kL = [4, 7, 10].map(lordOf), tL = [1, 5, 9].map(lordOf);
    if (kL.some(k => tL.some(x => sameSign(k, x))) || [5, 9].map(lordOf).some(l => [1, 4, 7, 10].includes(P(l).house) && P(l).sign === P(lordOf(1)).sign)) yogas.push('raj');
    const l2 = lordOf(2), l11 = lordOf(11);
    if (sameSign(l2, l11) || P(l2).house === 11 || P(l11).house === 2) yogas.push('dhana');
    ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'].forEach(n => { const x = P(n), d = dignity(x); if ((d === 'ex' || d === 'own') && [1, 4, 7, 10].includes(x.house)) yogas.push(n); });
    // weakest planet for remedy
    const weak = ch.planets.filter(x => dignity(x) === 'deb').map(x => x.name)
      .concat([lordOf(1), lordOf(10), lordOf(7)].filter(n => [6, 8, 12].includes(P(n).house)))
      .concat(ch.planets.filter(x => x.house === 8 && x.name !== 'Ketu').map(x => x.name));
    const remedies = [...new Set(weak)].slice(0, 3);
    if (!remedies.length) remedies.push(lordOf(1));
    return { areas, yogas, remedies, lagnaLord: lordOf(1) };
  }

  function lifeHTML(ch, now) {
    const R = lifeReading(ch, now), lagnaEl = ch.lagnaSign % 4;
    const cards = R.areas.map(a => {
      let extra = '';
      if (a.k === 'health') extra = `<p>${pick(C.life.element[lagnaEl])}</p>`;
      else if (C.life.lordText[a.k]) { const lt = C.life.lordText[a.k]; extra = `<div class="fact"><span>${pick(lt.lbl)}</span><b>${pick(lt[a.lord])}</b></div>`; }
      const per = a.period ? `<div class="period">🗓️ <span>${pick(C.life.bestPeriod)}: <b>${fmtMonthYear(a.period.start)} – ${fmtMonthYear(a.period.end)}</b><br><small>${pick(C.life.dashaOf).replace('{p}', pName(a.period.md) + ' / ' + pName(a.period.lord))}${a.period.now ? ' · ' + pick(C.life.runningNow) : ''}</small></span></div>` : '';
      return `<section class="card life"><div class="lh"><span class="li">${a.icon}</span><h3>${pick(a.t)}</h3>${stars(a.stars)}</div>
        <p>${pick(C.life.level[a.k][a.lvl])}</p>${extra}${per}${areaDetail(ch, a, now)}</section>`;
    }).join('');
    const ll = R.lagnaLord, col = C.colour[ll];
    const lucky = `<section class="card"><h3>🍀 ${pick(C.life.luckyTitle)}</h3>
      <div class="lgrid">
        <div><div class="tl">${pick(C.life.gem)}</div><b>💎 ${pick(C.life.gems[ll])}</b></div>
        <div><div class="tl">${pick(C.life.day)}</div><b>${pick(C.wd[C.wdLord.indexOf(ll)])}</b></div>
        <div><div class="tl">${pick(C.life.colour)}</div><b><span class="swatch sm" style="background:${col[2]}"></span>${pick(col)}</b></div>
        <div><div class="tl">${pick(C.life.number)}</div><b>${C.life.num[ll]}</b></div>
        <div class="full"><div class="tl">${pick(C.life.deity)}</div><b>🙏 ${pick(C.life.deities[ll])}</b></div>
      </div><p class="muted small">${pick(C.life.gemNote)}</p></section>`;
    const yog = `<section class="card"><h3>✨ ${pick(C.life.yogaTitle)}</h3>${R.yogas.length ? R.yogas.map(y => { const Y = C.life.yogas[y]; return `<div class="yoga"><b>${Y[L()]}</b><p>${Y[2 + L()]}</p></div>`; }).join('') : `<p>${pick(C.life.noYoga)}</p>`}</section>`;
    const rem = `<section class="card"><h3>🪔 ${pick(C.life.remedyTitle)}</h3>${R.remedies.map(n => `<div class="yoga"><b>${pick(C.life.remedyFor).replace('{p}', pName(n))}</b><p>${pick(C.life.remedies[n])}</p></div>`).join('')}</section>`;
    return `<h2 class="ptitle sec">${pick(C.life.lifeTitle)}</h2><p class="muted small secsub">${pick(C.life.lifeSub)}</p>${cards}${lucky}${yog}${rem}`;
  }

  function screenKundli() {
    if (V.sub === 'match') return screenMatch();
    const p = active(), ch = chartOf(p);
    const moon = ch.planets[1];
    const now = E.jdFromLocal(...Object.values(todayYMD()), 12, 0, 5.5);
    const md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0];
    const ad = md.sub.find(x => x.start <= now && x.end > now) || md.sub[0];
    const isM = ch.manglik.fromLagna || ch.manglik.fromMoon;
    if (ch.timeUnknown && V.chartMode === 'lagna') V.chartMode = 'moon';
    return `${profilePicker()}
    <section class="card">
      <div class="kgrid">
        <div><div class="tl">${t('lagna')}</div><div class="kv">${ch.timeUnknown ? '—' : pick(C.rashiShort[ch.lagnaSign])}</div></div>
        <div><div class="tl">${t('rashi')}</div><div class="kv">${pick(C.rashiShort[ch.moonSign])}</div></div>
        <div><div class="tl">${t('nakshatra')}</div><div class="kv">${pick(C.nak[moon.nak])} <small>${t('pada')} ${moon.pada}</small></div></div>
      </div>
      <div class="muted small">${t('born')}: ${fmtDate(p.y, p.m, p.d)} · ${p.timeUnknown ? '—' : fmtClock(p.h, p.min)} · ${esc(p.place)}</div>
      ${ch.timeUnknown ? `<div class="note">ℹ️ ${pick(C.acc.timeUnknown)}</div>` : ''}
      <div class="trust-row">${trustBadge()}<button class="btn link sm" data-a="calc">🔢 ${g('calc')}</button><button class="btn link sm" data-a="tab" data-v="method">📄 ${pick(MT.compare)}</button></div>
      ${ch.lagnaEdge ? `<div class="note">⚠️ ${pick(C.acc.lagnaEdge)}</div>` : ''}
      ${Math.abs(ch.tzUsed - 5.5) > 0.01 && Math.abs(ch.tzUsed - 5.75) > 0.01 ? `<div class="note">🕰️ ${pick(C.acc.oldTz).replace('{tz}', fmtTz(ch.tzUsed))}</div>` : ''}
    </section>
    <section class="card"><div class="seg sm"><button data-a="cmode" data-v="lagna" class="${V.chartMode === 'lagna' ? 'on' : ''}">${t('lagnaChart')}</button><button data-a="cmode" data-v="moon" class="${V.chartMode === 'moon' ? 'on' : ''}">${t('moonChart')}</button><button data-a="cmode" data-v="d9" class="${V.chartMode === 'd9' ? 'on' : ''}">${pick(C.acc.d9)}</button></div>
      ${chart3D(ch, V.chartMode)}<div class="muted small center">${t('retro')}</div></section>
    ${planetTable(ch)}
    ${lifeHTML(ch, now)}
    ${premiumKundliSection(p, ch)}
    <button class="btn primary block" data-a="openMatch">💞 ${t('matchBtn')}</button>
    <section class="card"><h3>${t('nature')}</h3><p>${pick(C.lagnaText[ch.lagnaSign])}</p><h3>${t('mind')}</h3><p>${pick(C.moonText[ch.moonSign])}</p></section>
    <section class="card"><h3>${t('dasha')}</h3>
      <div class="dasha-now"><div><div class="tl">${t('curMaha')}</div><div class="kv">${pName(md.lord)}</div><div class="muted small">${t('till')} ${fmtMonthYear(md.end)}</div></div>
      <div><div class="tl">${t('curAntar')}</div><div class="kv">${pName(ad.lord)}</div><div class="muted small">${t('till')} ${fmtMonthYear(ad.end)}</div></div></div>
      <p>${pick(C.dashaMeaning[md.lord])}</p>
      <button class="btn ghost block" data-a="toggleDasha">${t('allDasha')} ${V.showAllDasha ? '▲' : '▼'}</button>
      ${V.showAllDasha ? `<table class="tbl"><tbody>${ch.dasha.slice(0, 10).map(x => `<tr class="${x === md ? 'cur' : ''}"><td>${pName(x.lord)}</td><td>${fmtMonthYear(Math.max(x.start, ch.jd))}</td><td>${fmtMonthYear(x.end)}</td></tr>`).join('')}</tbody></table>` : ''}
    </section>
    <section class="card"><h3>${t('manglik')}</h3>
      <div class="pill ${isM && !ch.manglik.cancelled ? 'bad' : 'good'}">${isM ? (ch.manglik.cancelled ? pick(C.acc.mCancelled) : t('isManglik')) : t('notManglik')}</div>
      ${isM && ch.manglik.cancelled ? `<p class="small">${pick(ch.manglik.jupOnMars ? C.acc.mCancelJup : C.acc.mCancelSign)}</p>` : ''}
      <div class="area"><span>${t('mFromLagna')}</span><b>${ch.manglik.fromLagna ? t('yes') : t('no')}</b></div>
      <div class="area"><span>${t('mFromMoon')}</span><b>${ch.manglik.fromMoon ? t('yes') : t('no')}</b></div>
      <p class="muted small">${t('manglikNote')}</p></section>
`;
  }

  function screenMatch() {
    const boys = S.profiles.filter(p => p.gender === 'm'), girls = S.profiles.filter(p => p.gender === 'f');
    let body;
    if (!boys.length || !girls.length) body = `<section class="card"><p>${t('needTwo')}</p><button class="btn primary block" data-a="addMember">${t('addMember')}</button></section>`;
    else {
      const opt = (arr, sel) => arr.map(p => `<option value="${p.id}" ${p.id === sel ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
      const ap = active(), bSel = V.matchBoy || (ap.gender === 'm' ? ap.id : boys[0].id), gSel = V.matchGirl || (ap.gender === 'f' ? ap.id : girls[0].id);
      body = `<section class="card"><label class="fl">${t('boy')}<select id="mBoy">${opt(boys, bSel)}</select></label>
        <label class="fl">${t('girl')}<select id="mGirl">${opt(girls, gSel)}</select></label>
        <button class="btn primary block" data-a="runMatch">${t('checkMatch')}</button></section>`;
      if (V.matchRes) {
        const r = V.matchRes, tot = r.total;
        const v = tot < 18 ? 'v1' : tot < 25 ? 'v2' : tot < 33 ? 'v3' : 'v4';
        const cls = tot < 18 ? 'bad' : tot < 25 ? 'mid' : 'good';
        const C0 = 2 * Math.PI * 52, off = C0 * (1 - tot / 36);
        body += `<section class="card center"><div class="ring ${cls}"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="rt"/><circle cx="60" cy="60" r="52" class="rp" style="stroke-dasharray:${C0};stroke-dashoffset:${off};--c0:${C0}"/></svg><b data-count="${tot}">0</b><span>${t('outOf36')}</span></div>
          <div class="kv">${t('gunas')}</div><p class="lead">${t(v)}</p>
          <p class="muted small">📜 ${pick(['Ashtakoot milan: 8 kootas, 36 gun, as in the classical texts', 'अष्टकूट मिलान: 8 कूट, 36 गुण, शास्त्रीय ग्रंथों के अनुसार'])}</p>
          <button class="btn ghost sm" data-a="shareCard" data-v="milan">🖼️ ${g('shareCard')}</button>
          ${r.rows.find(x => x.k === 'nadi').s === 0 ? `<div class="pill ${r.nadiCancel ? 'good' : 'bad'}">${t('nadiDosh')}${r.nadiCancel ? ' · ' + pick(C.acc.cancelled) : ''}</div>` : ''}
          ${r.rows.find(x => x.k === 'bhakoot').s === 0 ? `<div class="pill ${r.bhakootCancel ? 'good' : 'bad'}">${t('bhakootDosh')}${r.bhakootCancel ? ' · ' + pick(C.acc.cancelled) : ''}</div>` : ''}
          ${r.nadiCancel || r.bhakootCancel ? `<p class="muted small">${pick(C.acc.doshCancelNote)}</p>` : ''}</section>
          <section class="card"><table class="tbl"><thead><tr><th>Koota</th><th></th><th>${t('score')}</th></tr></thead><tbody>
          ${r.rows.map(x => { const k = C.koota[x.k]; return `<tr><td><b>${k[L()]}</b></td><td class="muted small">${k[2 + L()]}</td><td><b>${x.s}</b>/${x.max}</td></tr>`; }).join('')}
          </tbody></table></section>
          <section class="card"><h3>${t('manglik')}</h3>
          ${[r.boy, r.girl].map(p => { const c = chartOf(p), m = c.manglik.fromLagna || c.manglik.fromMoon, cx = m && c.manglik.cancelled; return `<div class="area"><span>${esc(p.name)}</span><b class="${m && !cx ? 'tbad' : 'tgood'}">${m ? (cx ? pick(C.acc.mCancelled) : t('isManglik')) : t('notManglik')}</b></div>`; }).join('')}
          ${r.manglikBoth ? `<p class="small">✅ ${pick(C.acc.mBoth)}</p>` : r.manglikOne ? `<p class="small">⚠️ ${pick(C.acc.mOne)}</p>` : ''}
          </section>
          ${compatHTML()}`;
      }
    }
    return `${V.tab === 'kundli' ? `<button class="btn link" data-a="closeMatch">${ICON.left}${t('back')}</button>` : ''}<h2 class="ptitle">💞 ${t('match')}</h2>${body}`;
  }

  const PALM_SVG = sel => {
    const ln = (id, d) => `<path d="${d}" class="pline ${sel === id ? 'hl' : ''}"/>`;
    return `<svg class="palm" viewBox="-36 0 236 260" aria-hidden="true">
      <g class="hand"><rect x="44" y="22" width="26" height="100" rx="13"/><rect x="73" y="8" width="27" height="110" rx="13.5"/><rect x="103" y="18" width="26" height="100" rx="13"/><rect x="131" y="44" width="23" height="80" rx="11.5"/>
      <rect x="-14" y="150" width="30" height="76" rx="15" transform="rotate(-38 12 175)"/><path d="M40 110 h116 a8 8 0 0 1 4 6 l-6 92 a42 42 0 0 1 -42 42 h-22 a46 46 0 0 1 -46 -46 l-6 -84 a10 10 0 0 1 2 -10z"/></g>
      ${ln('heart', 'M154 138 C130 128 104 126 80 136')}${ln('head', 'M50 160 C80 156 116 162 148 180')}
      ${ln('life', 'M54 146 C82 168 88 204 82 240')}${ln('fate', 'M104 246 C103 220 101 190 100 148')}
      ${sel === 'shape' ? '<rect x="38" y="108" width="122" height="142" rx="30" class="pshape"/>' : ''}</svg>`;
  };

  function screenPalmQuick() {
    if (V.palmStep < 0) return `<h2 class="ptitle">✋ ${t('palmTitle')}</h2>
      <section class="card center">${V.palmImg ? `<img class="palmimg" src="${V.palmImg}" alt="">` : PALM_SVG('')}
      <p class="lead">${t('palmIntro')}</p>
      <button class="btn link" data-a="palmAI">${ICON.left}${pick(C.pa.title)}</button>
      <button class="btn primary block" data-a="palmStart">${t('startPalm')}</button>
      <p class="muted small">${t('aiPalm')}</p></section>`;
    if (V.palmStep >= C.palm.length) return `<h2 class="ptitle">✋ ${t('palmResult')}</h2>
      ${V.palmImg ? `<section class="card center"><img class="palmimg" src="${V.palmImg}" alt=""></section>` : ''}
      ${C.palm.map((q, i) => `<section class="card"><h3>${pick(q.q)}</h3><div class="muted small">${pick(q.opts[V.palmAns[i]][0])}</div><p>${pick(q.opts[V.palmAns[i]][1])}</p></section>`).join('')}
      <button class="btn primary block" data-a="palmAgain">${t('again')}</button>`;
    const q = C.palm[V.palmStep];
    return `<div class="steps">${C.palm.map((_, i) => `<span class="${i <= V.palmStep ? 'on' : ''}"></span>`).join('')}</div>
      <div class="muted center">${t('step')} ${V.palmStep + 1} ${t('of')} ${C.palm.length}</div>
      <section class="card center"><h2>${pick(q.q)}</h2><p class="muted">${pick(q.hint)}</p>
      ${V.palmImg ? `<div class="palmpair"><img class="palmimg sm" src="${V.palmImg}" alt="">${PALM_SVG(q.line)}</div>` : PALM_SVG(q.line)}</section>
      <div class="opts">${q.opts.map((o, i) => `<button class="opt" data-a="palmAns" data-v="${i}">${pick(o[0])}</button>`).join('')}</div>
      ${V.palmStep > 0 ? `<button class="btn link" data-a="palmBack">${ICON.left}${t('back')}</button>` : ''}`;
  }

  function screenPanchang() {
    const pl = place(); const base = V.pDate || todayYMD();
    const pc = E.dayPanchang(base.y, base.m, base.d, pl.lat, pl.lon, pl.tz);
    const tz = pl.tz, tIdx = pc.tithi, shukla = tIdx < 15, BACK = backMore();
    const tName = tIdx === 14 ? C.tithi[14] : tIdx === 29 ? C.tithi[15] : C.tithi[tIdx % 15];
    const sp = E.specialDays(base.y, base.m, base.d, pl.lat, pl.lon, pl.tz, 45).slice(0, 8);
    const row = (k, v, sub) => `<div class="prow"><span>${k}</span><b>${v}${sub ? `<small>${sub}</small>` : ''}</b></div>`;
    const cityOpts = C.cities.map((c, i) => `<option value="${i}" ${S.homeCity === i ? 'selected' : ''}>${pick([c[0], c[1]])}</option>`).join('');
    return `${BACK}<h2 class="ptitle">📅 ${t('panchang')}</h2>
      <label class="fl">${t('city')}<select id="homeCity"><option value="">${esc(active().place)}</option>${cityOpts}</select></label>
      <div class="datenav"><button class="icbtn" data-a="pday" data-v="-1" aria-label="${t('prev')}">${ICON.left}</button>
        <div class="center"><b>${fmtDate(base.y, base.m, base.d, true)}</b>${V.pDate ? `<br><button class="btn link sm" data-a="pday" data-v="0">${t('todayBtn')}</button>` : ''}</div>
        <button class="icbtn" data-a="pday" data-v="1" aria-label="${t('next')}">${ICON.right}</button></div>
      <section class="card">
        ${row(t('tithi'), pick(tName), `${t('till')} ${fmtTime(pc.tithiEnd, tz)}`)}
        ${row(t('paksha'), shukla ? t('shukla') : t('krishna'))}
        ${row(t('nakshatra'), pick(C.nak[pc.nak]), `${t('till')} ${fmtTime(pc.nakEnd, tz)}`)}
        ${row(t('yoga'), pick(C.yoga[pc.yoga]), `${t('till')} ${fmtTime(pc.yogaEnd, tz)}`)}
        ${row(t('karana'), pick(C.karana[pc.karana]))}
        ${row(t('vaar'), pick(C.wd[pc.wd]))}
        ${row(t('moonSign'), pick(C.rashiShort[pc.moonSign]))}
      </section>
      <section class="card"><h3>${t('timings')}</h3>
        <div class="time"><span>☀️ ${t('sunrise')}</span><b>${fmtTime(pc.sunrise, tz)}</b></div>
        <div class="time"><span>🌇 ${t('sunset')}</span><b>${fmtTime(pc.sunset, tz)}</b></div>
        ${pc.wd !== 3 ? `<div class="time good"><span>${t('abhijit')}</span><b>${fmtTime(pc.abhijit.start, tz)} – ${fmtTime(pc.abhijit.end, tz)}</b></div>` : ''}
        <div class="time bad"><span>${t('rahuKaal')}</span><b>${fmtTime(pc.rahu.start, tz)} – ${fmtTime(pc.rahu.end, tz)}</b></div>
        <div class="time bad"><span>${t('yama')}</span><b>${fmtTime(pc.yama.start, tz)} – ${fmtTime(pc.yama.end, tz)}</b></div>
        <div class="time bad"><span>${t('gulika')}</span><b>${fmtTime(pc.gulika.start, tz)} – ${fmtTime(pc.gulika.end, tz)}</b></div>
      </section>
      <section class="card"><h3>${t('upcoming')}</h3>${sp.map(s => `<div class="sday"><div class="sdate"><b>${s.d}</b><span>${pick(C.months[s.m - 1]).slice(0, L() ? 10 : 3)}</span></div><div><b>${pick(C.special[s.type])}</b><div class="muted small">${pick(C.wd[s.wd])}</div></div></div>`).join('')}</section>`;
  }

  function screenFamily() {
    if (V.sub === 'form') return screenForm();
    const sizes = [[1, 'A'], [1.15, 'A+'], [1.3, 'A++']];
    return `${backMore()}<h2 class="ptitle">👨‍👩‍👧 ${t('family')}</h2>
      ${S.profiles.map(p => { const ch = chartOf(p), on = p.id === active().id; return `<section class="card member ${on ? 'on' : ''}">
        <div class="av">${esc(p.name.trim()[0] || '?').toUpperCase()}</div>
        <div class="mi"><b>${esc(p.name)}</b><div class="muted small">${pick(C.relations[p.rel || 0])} · ${t('rashi')}: ${pick(C.rashiShort[ch.moonSign])}</div>
        <div class="row3">${on ? `<span class="pill good sm">✓ ${t('active')}</span>` : `<button class="btn sm primary" data-a="setActive" data-v="${p.id}">${t('show')}</button>`}
        <button class="btn sm ghost" data-a="edit" data-v="${p.id}">${t('edit')}</button>${S.profiles.length > 1 ? `<button class="btn sm ghost danger" data-a="del" data-v="${p.id}">${t('del')}</button>` : ''}</div></div></section>`; }).join('')}
      <button class="btn primary block" data-a="addMember">＋ ${t('addMember')}${familyFull() ? ' 🔒' : ''}</button>
      ${isPremium() ? '' : `<p class="muted small center fam-count">${pick(C.fam.count).replace('{c}', Math.min(S.profiles.length, famLimit())).replace('{n}', famLimit())}</p>`}
      ${accountCard()}
      ${premiumCard()}
      <section class="card"><h3>${t('settings')}</h3>
        <div class="tl">${t('language')}</div><div class="seg lang4"><button data-a="lang" data-v="hi" class="${S.lang === 'hi' ? 'on' : ''}">हिंदी</button><button data-a="lang" data-v="en" class="${S.lang === 'en' ? 'on' : ''}">English</button><button data-a="lang" data-v="mr" class="${S.lang === 'mr' ? 'on' : ''}">मराठी</button><button data-a="lang" data-v="gu" class="${S.lang === 'gu' ? 'on' : ''}">ગુજરાતી</button></div>
        ${S.lang === 'mr' || S.lang === 'gu' ? `<p class="muted small">${g('langBeta')}</p>` : ''}
        <div class="tl">${t('textSize')}</div><div class="seg">${sizes.map(([v, l]) => `<button data-a="scale" data-v="${v}" class="${S.scale === v ? 'on' : ''}" style="font-size:${v}em">${l}</button>`).join('')}</div>
      </section>
      <section class="card"><h3>🔊 ${pick(Y.voice.title)}</h3><p class="muted small">${pick(Y.voice.sub)}</p>
        <div class="fl">${pick(Y.voice.speed)}<div class="seg sm"><button data-a="vRate" data-v="normal" class="${S.voiceRate !== 'slow' ? 'on' : ''}">${pick(Y.voice.normal)}</button><button data-a="vRate" data-v="slow" class="${S.voiceRate === 'slow' ? 'on' : ''}">${pick(Y.voice.slow)}</button></div></div>
        <div class="fl">${g('voiceG')}<div class="seg sm"><button data-a="voiceG" data-v="f" class="${S.voiceGender !== 'm' ? 'on' : ''}">👩 ${g('female')}</button><button data-a="voiceG" data-v="m" class="${S.voiceGender === 'm' ? 'on' : ''}">👨 ${g('male')}</button></div></div>
        <button class="btn ghost block" data-a="vTest">${ICON.speaker}<span>${pick(Y.voice.test)}</span></button>
        <p class="muted small">🎙️ ${pick(cloudVoiceOn() ? ['Saathi\'s own natural voice reads everything.', 'साथी की अपनी प्राकृतिक आवाज़ सब कुछ पढ़ती है।'] : ['In Hindi, the daily rashifal, kathas and this test use Saathi\'s own voice (male or female). Mantras and Jyotish Sahayak answers use your phone\'s voice, which may not change with this setting.', 'हिंदी में रोज़ का राशिफल, कथाएँ और यह जाँच साथी की अपनी आवाज़ (पुरुष या महिला) में हैं। मंत्र और ज्योतिष सहायक के जवाब फ़ोन की आवाज़ में होते हैं, जो इस सेटिंग से शायद न बदले।'])}</p>
        ${hasHindiVoice() ? '' : `<p class="note small">ℹ️ ${pick(Y.voice.noHindi)}</p>`}</section>
      <section class="card"><h3 data-a="demoTap">${t('about')}</h3><p class="small">${t('aboutText')}</p><p class="muted small">${t('storageNote')}</p></section>`;
  }

  function premiumCard() {
    return `<section class="card premium"><div class="ph">${ICON.crown}<div><b>${t('premium')}</b><div class="small">${pick(P_.sub)}</div></div></div>
      <ul>${T.premiumList.map(x => `<li>${pick(x)}</li>`).join('')}</ul>
      <button class="btn gold block" data-a="openPremium">👑 ${S.premium ? pick(C.prem.active) : pick(C.prem.unlock)}</button></section>`;
  }

  function profilePicker() { return ''; }

  function screenForm() {
    const p = S.profiles.find(x => x.id === V.editId) || { name: S.profiles.length ? '' : ((S.user && S.user.name) || ''), gender: 'm', rel: V.formPreset ? V.formPreset.rel : S.profiles.length ? 1 : 0, y: '', m: '', d: '', h: 12, min: 0, cityIdx: '', timeUnknown: false };
    const dateVal = p.y ? `${p.y}-${pad(p.m)}-${pad(p.d)}` : '';
    const other = p.cityIdx === -1;
    if (V.formPlaceFor !== (V.editId || 'new')) { V.formPlaceFor = V.editId || 'new'; V.formPlace = (p.lat != null && !other && p.y) ? { label: p.place, lat: p.lat, lon: p.lon, tz: p.tz } : null; V.manualPlace = other; }
    return `${S.profiles.length ? `<button class="btn link" data-a="closeForm">${ICON.left}${t('back')}</button>` : ''}
      <h2 class="ptitle">${t('formTitle')}</h2>
      <form id="pform" class="card form" novalidate>
        <label class="fl">${t('name')}<input id="fName" value="${esc(p.name)}" autocomplete="name"></label>
        <div class="fl">${t('gender')}<div class="seg" id="fGender"><button type="button" data-a="gender" data-v="m" class="${p.gender === 'm' ? 'on' : ''}">👨 ${t('male')}</button><button type="button" data-a="gender" data-v="f" class="${p.gender === 'f' ? 'on' : ''}">👩 ${t('female')}</button></div></div>
        <label class="fl">${t('relation')}<select id="fRel">${C.relations.map((r, i) => `<option value="${i}" ${+p.rel === i ? 'selected' : ''}>${pick(r)}</option>`).join('')}</select></label>
        <label class="fl">${t('dob')}<input type="date" id="fDob" value="${dateVal}" max="2100-12-31" min="1900-01-01"></label>
        <label class="fl">${t('tob')}<input type="time" id="fTob" value="${pad(p.h)}:${pad(p.min)}" ${p.timeUnknown ? 'disabled' : ''}></label>
        <label class="cb"><input type="checkbox" id="fNoTime" ${p.timeUnknown ? 'checked' : ''}> ${t('noTime')}</label>
        <div class="muted small" id="noTimeNote" ${p.timeUnknown ? '' : 'hidden'}>${t('noTimeNote')}</div>
        <div class="fl" ${V.manualPlace ? 'hidden' : ''}>${t('pob')}<input id="fPlaceQ" autocomplete="off" placeholder="${pick(C.acc.placeSearch)}" value="${V.formPlace ? esc(V.formPlace.label) : ''}">
          <div id="placeList" class="plist placelist" hidden></div>
          ${V.formPlace ? `<div class="placesel">✓ ${esc(V.formPlace.label)} <small>(${V.formPlace.lat.toFixed(2)}°, ${V.formPlace.lon.toFixed(2)}°)</small></div>` : ''}
          <button type="button" class="btn link" data-a="placeManual">${pick(C.acc.placeManual)}</button></div>
        <div id="otherBox" ${V.manualPlace ? '' : 'hidden'}>
          <label class="fl">${t('placeName')}<input id="fPlace" value="${other ? esc(p.place) : ''}"></label>
          <div class="row2"><label class="fl">${t('lat')}<input id="fLat" inputmode="decimal" value="${other ? p.lat : ''}"></label><label class="fl">${t('lon')}<input id="fLon" inputmode="decimal" value="${other ? p.lon : ''}"></label></div>
          <label class="fl">${t('tz')}<input id="fTz" inputmode="decimal" value="${other ? p.tz : '5.5'}"></label>
        </div>
        <div class="err" id="fErr" hidden>${t('required')}</div>
        <button class="btn primary block" type="submit">${t('save')}</button>
      </form>`;
  }

  function screenWelcome() {
    return `<div class="welcome">${LOGO}<h1>ज्योतिष साथी<br><span>Jyotish Saathi</span></h1>
      <p class="lead">सितारों से आपका रोज़ का मार्गदर्शन<br><span class="muted">Your daily guide from the stars</span></p>
      <div class="tl center">अपनी भाषा चुनें · Choose your language</div>
      <div class="langbig"><button data-a="pickLang" data-v="hi">हिंदी</button><button data-a="pickLang" data-v="en">English</button></div><div class="langsm"><button data-a="pickLang" data-v="mr">मराठी</button><button data-a="pickLang" data-v="gu">ગુજરાતી</button></div></div>`;
  }

  /* ======================= PREMIUM ======================= */
  const P_ = C.prem;
  const isPremium = () => !!(S.premium || S.serverPremium);
  const jdNow = () => { const d = todayYMD(); return E.jdFromLocal(d.y, d.m, d.d, 12, 0, 5.5); };
  const lockBadge = () => `<span class="lockb">🔒 ${pick(P_.locked)}</span>`;

  function sadeSati(ch) {
    const now = jdNow(), segs = [];
    for (let jd = now - 12 * 365.25; jd < now + 35 * 365.25; jd += 15) {
      const s = Math.floor(E.sidereal(jd).Saturn / 30), h = ((s - ch.moonSign + 12) % 12) + 1;
      const type = [12, 1, 2].includes(h) ? 'sade' : [4, 8].includes(h) ? 'dhaiya' : null;
      const last = segs[segs.length - 1];
      if (last && last.type === type) last.end = jd + 15;
      else segs.push({ type, start: jd, end: jd + 15 });
    }
    const real = segs.filter(x => x.type);
    const merged = [];
    real.forEach(x => { const l = merged[merged.length - 1]; if (l && l.type === x.type && x.start - l.end < 320) l.end = x.end; else merged.push({ ...x }); });
    const cur = merged.find(x => x.start <= now && x.end > now) || null;
    return { cur, nextSade: merged.find(x => x.type === 'sade' && x.start > now), nextDhaiya: merged.find(x => x.type === 'dhaiya' && x.start > now) };
  }

  function yearAhead(ch) {
    const now = jdNow(), out = { Jupiter: [], Saturn: [] };
    for (let m = 0; m < 12; m++) {
      const jd = now + m * 30.44, sp = E.sidereal(jd);
      ['Jupiter', 'Saturn'].forEach(n => {
        const h = ((Math.floor(sp[n] / 30) - ch.moonSign + 12) % 12) + 1, arr = out[n], l = arr[arr.length - 1];
        if (l && l.h === h) l.end = jd + 30.44; else arr.push({ h, start: jd, end: jd + 30.44 });
      });
    }
    const good = { Jupiter: [2, 5, 7, 9, 11], Saturn: [3, 6, 11] };
    const txt = (n, s) => pick(good[n].includes(s.h) ? P_.transGood : P_.transSlow).replace('{p}', n === 'Jupiter' ? pick(P_.guru) : pick(P_.shani)).replace('{n}', pick(P_.ord[s.h - 1])).replace('{t}', pick(P_.themes[s.h - 1]));
    return ['Jupiter', 'Saturn'].map(n => ({ n, rows: out[n].map(s => ({ ...s, good: good[n].includes(s.h), text: txt(n, s) })) }));
  }

  function spiritual(ch) {
    const R = lifeReading(ch, jdNow());
    const seven = ch.planets.filter(x => !['Rahu', 'Ketu'].includes(x.name));
    const atma = seven.reduce((a, b) => (b.deg > a.deg ? b : a)).name;
    const now = jdNow(), md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0];
    const weak = R.remedies[0];
    return { atma, deity: ch.moonNak, lagnaLord: R.lagnaLord, md: md.lord, weak, el: ch.lagnaSign % 4 };
  }

  function premiumKundliHTML(p, ch) {
    const sp = spiritual(ch), ss = sadeSati(ch), ya = yearAhead(ch);
    const period = x => `${fmtMonthYear(x.start)} – ${fmtMonthYear(x.end)}`;
    const spirit = `<section class="card prem-card"><h3>🕉️ ${pick(P_.spiritTitle)}</h3>
      <div class="yoga"><b>${pick(P_.atma)}: ${pName(sp.atma)}</b><p>${pick(P_.atmaText[sp.atma])}</p></div>
      <div class="yoga"><b>${pick(P_.nakDeity)}: ${pick(P_.deity[sp.deity])}</b><p>${pick(P_.deityTip)}</p></div>
      <div class="yoga"><b>${pick(P_.beejLagna)} (${pName(sp.lagnaLord)})</b><p class="beej">${P_.beej[sp.lagnaLord]}</p></div>
      <div class="yoga"><b>${pick(P_.beejDasha)} (${pName(sp.md)})</b><p class="beej">${P_.beej[sp.md]}</p><p class="muted small">${pick(P_.chant108)}</p></div>
      <div class="yoga"><b>${pick(P_.fastDay)}</b><p>${pick(C.wd[C.wdLord.indexOf(sp.lagnaLord)])}</p></div>
      <div class="yoga"><b>${pick(P_.daan)}</b><p>${pick(P_.daanItems[sp.weak])}</p></div>
      <div class="yoga"><b>${pick(P_.meditate)}</b><p>${pick(P_.meditation[sp.el])}</p></div></section>`;
    const status = ss.cur ? (ss.cur.type === 'sade' ? P_.sadeNow : P_.dhaiyaNow) : P_.sadeFree;
    const sade = `<section class="card prem-card"><h3>🪐 ${pick(P_.sadeTitle)}</h3>
      <div class="pill ${ss.cur ? 'bad' : 'good'}">${pick(status)}</div>
      ${ss.cur ? `<div class="area"><span>${pick(P_.sadeCur)}</span><b>${period(ss.cur)}</b></div>` : ''}
      ${ss.nextSade ? `<div class="area"><span>${pick(P_.sadeNext)}</span><b>${period(ss.nextSade)}</b></div>` : ''}
      ${ss.nextDhaiya ? `<div class="area"><span>${pick(P_.dhaiyaNext)}</span><b>${period(ss.nextDhaiya)}</b></div>` : ''}
      <p class="muted small">${pick(P_.sadeTip)}</p></section>`;
    const year = `<section class="card prem-card"><h3>📆 ${pick(P_.yearTitle)}</h3>${ya.map(g => g.rows.map(r => `<div class="trow ${r.good ? 'g' : 's'}"><div class="tdate">${fmtMonthYear(r.start)}<br>– ${fmtMonthYear(r.end)}</div><div>${r.text}</div></div>`).join('')).join('')}</section>`;
    return { spirit, sade, year };
  }

  function premiumKundliSection(p, ch) {
    const dlBtn = `<button class="btn gold block" data-a="${isPremium() ? 'pdf' : 'paywall'}">📄 ${pick(P_.dl)} ${isPremium() ? '' : '🔒'}</button>`;
    if (isPremium()) { const h = premiumKundliHTML(p, ch); return `<h2 class="ptitle sec" id="premSec">👑 ${pick(P_.premiumSection)}</h2>${dlBtn}${h.spirit}${h.sade}${h.year}`; }
    const teaser = (icon, title, lines) => `<section class="card prem-card locked" data-a="paywall"><h3>${icon} ${pick(title)} ${lockBadge()}</h3><div class="blur">${lines}</div><div class="unlock">🔒 ${pick(P_.unlock)}</div></section>`;
    return `<h2 class="ptitle sec" id="premSec">👑 ${pick(P_.premiumSection)}</h2>${dlBtn}
      ${teaser('🕉️', P_.spiritTitle, `<p>${pick(P_.atma)}: ●●●●●</p><p>${pick(P_.nakDeity)}: ●●●●●●●</p><p class="beej">ॐ ●●● ●●● ●●● सः ●●●● नमः</p>`)}
      ${teaser('🪐', P_.sadeTitle, `<p>●●●●● ●●●● ●●●●●●</p><p>●●● 20●● – ●●● 20●●</p>`)}
      ${teaser('📆', P_.yearTitle, `<p>●●●● ●● ●●●● ●●● ●●●●● ●● ●●●●</p><p>●●●●● ●● ●●●● ●●●●●</p>`)}`;
  }

  function screenPremium() {
    const it = x => `<button class="pf pfgo" data-a="premGo" data-v="${x[0]}"><span class="pi">${x[0]}</span><div><b>${pick(x[1])}</b><div class="muted small">${pick(x[2])}</div></div><i class="go">›</i></button>`;
    return `<button class="btn link" data-a="tab" data-v="more">${ICON.left}${t('back')}</button>
      <section class="card prem-hero center"><div class="crown3d">👑</div><h2>${pick(P_.title)}</h2><p>${pick(P_.sub)}</p>
        ${isPremium() ? `<div class="pill good">✓ ${pick(P_.active)} · ${pick(P_.demoBadge)}</div>` : ''}</section>
      <section class="card"><h3>${pick(P_.nowTitle)}</h3>${P_.now.map(it).join('')}</section>
      ${P_.ai.length ? `<section class="card"><h3>✨ ${pick(P_.aiTitle)}</h3><p class="muted small">${pick(P_.aiSub)}</p>${P_.ai.map(x => it(x).replace('</b>', `</b> <span class="soonb">${pick(P_.soon)}</span>`)).join('')}</section>` : ''}
      ${CFG.apiBase === 'demo' || CFG.showPremiumTest ? `<section class="card test-card"><h3>🧪 ${pick(X.prem.testTitle)}</h3><button class="btn ${S.premium ? 'ghost' : 'gold'} block" data-a="premTest">${pick(S.premium ? X.prem.testOff : X.prem.testOn)}</button></section>` : ''}
      <section class="card"><h3>🎁 ${pick(P_.freeTitle)}</h3>${P_.free.map(x => it(x).replace('</b>', `</b> <span class="freeb">${pick(C.bh.free)}</span>`)).join('')}</section>
      ${isPremium() && S.plan !== 'single' && S.plan !== '' ? '' : isPremium() ? '' : planCards()}
      ${premiumExtras()}
      ${serverOn() && S.user && S.user.token ? `<button class="btn link block" data-a="restore">${g('restore')}</button>` : ''}`;
  }
  function plansHTML() { return plansHTML2(); }
  function plansHTMLold() {
    const m = CFG.priceMonthly || 99, y = CFG.priceYearly || 499, save = Math.round((1 - y / (m * 12)) * 100);
    const card = (k, name, price, per, day, badge) => `<button class="plan ${V.plan === k ? 'sel' : ''}" data-a="plan" data-v="${k}" aria-pressed="${V.plan === k}">${badge ? `<i>${badge}</i>` : ''}<span class="rad"></span><b>${pick(name)}</b><div class="price">₹${price}<small>${pick(per)}</small></div><small class="pday">${pick(Y.plan.perDay).replace('{d}', day)}</small></button>`;
    return `<h3 class="center">${pick(Y.plan.pick)}</h3><div class="plans">${card('m', P_.monthly, m, P_.perMonth, (m / 30).toFixed(1))}${card('y', P_.yearly, y, P_.perYear, (y / 365).toFixed(1), pick(P_.save).replace('{p}', save))}</div>`;
  }
  function planGo() {
    document.querySelectorAll('.sheet-bg').forEach(x => x.remove());
    buy(PLAN_PROD[V.plan] || 'prem_y');
  }
  function planCards() {
    return `<section class="card">${plansHTML()}
      <button class="btn gold block" data-a="planGo">👑 ${pick(Y.plan.cont).replace('{p}', planName(V.plan))}</button><p class="muted small center">${pick(P_.payNote)}</p></section>`;
  }
  function paywall() {
    const d = document.createElement('div'); d.className = 'sheet-bg';
    d.innerHTML = `<div class="sheet"><div class="grab"></div><div class="center"><div class="crown3d sm">👑</div><h2>${pick(P_.title)}</h2><p class="muted">${pick(P_.sub)}</p></div>
      ${P_.now.map(x => `<div class="pf"><span class="pi">${x[0]}</span><div><b>${pick(x[1])}</b></div></div>`).join('')}
      <div id="pwPlans">${plansHTML()}</div>
      <button class="btn gold block" data-a="planGo" id="pwGo">👑 ${pick(Y.plan.cont).replace('{p}', planName(V.plan))}</button>
      <p class="muted small center">${pick(P_.payNote)}</p>
      <button class="btn link block" data-x="close">${t('cancel')}</button></div>`;
    d.onclick = e => {
      const x = e.target.closest('[data-x]');
      if (e.target === d || (x && x.dataset.x === 'close')) { d.classList.add('out'); setTimeout(() => d.remove(), 250); }
      if (x && x.dataset.x === 'notify') { S.notify = true; persist(); toast(t('notified')); d.classList.add('out'); setTimeout(() => d.remove(), 250); render(); }
    };
    document.body.appendChild(d);
  }
  let demoTaps = 0, demoT;
  function demoTap() {
    demoTaps++; clearTimeout(demoT); demoT = setTimeout(() => demoTaps = 0, 2500);
    if (demoTaps >= 7) { demoTaps = 0; S.premium = !S.premium; persist(); render(); toast(pick(S.premium ? P_.demoOn : P_.demoOff)); }
  }

  /* ---------- Kundli PDF ---------- */
  function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  async function ensureLibs() {
    if (!window.html2canvas) await loadScript('libs/html2canvas.min.js');
    if (!(window.jspdf && window.jspdf.jsPDF)) await loadScript('libs/jspdf.umd.min.js');
  }
  async function makePDF() {
    const p = active(), ch = chartOf(p);
    toast(pick(P_.making));
    try {
      await ensureLibs();
      const R = lifeReading(ch, jdNow()), h = premiumKundliHTML(p, ch);
      const now = jdNow(), md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0];
      const box = document.createElement('div'); box.className = 'pdf';
      const bt = p.timeUnknown ? '—' : fmtTime(E.jdFromLocal(p.y, p.m, p.d, p.h, p.min, p.tz), p.tz);
      box.innerHTML = `
        <div class="pdf-cover">${LOGO}<div><div class="pdf-app">${t('appName')}</div><h1>${t('birthChart')}</h1><div class="pdf-name">${esc(p.name)}</div></div></div>
        <div class="pdf-block"><table class="tbl pdf-info"><tr><td>${t('dob')}</td><td><b>${fmtDate(p.y, p.m, p.d, true)}</b></td><td>${t('tob')}</td><td><b>${bt}</b></td></tr>
          <tr><td>${t('pob')}</td><td><b>${esc(p.place)}</b></td><td>${t('lagna')}</td><td><b>${pick(C.rashiShort[ch.lagnaSign])}</b></td></tr>
          <tr><td>${t('rashi')}</td><td><b>${pick(C.rashiShort[ch.moonSign])}</b></td><td>${t('nakshatra')}</td><td><b>${pick(C.nak[ch.moonNak])} (${t('pada')} ${ch.planets[1].pada})</b></td></tr>
          <tr><td>${t('curMaha')}</td><td><b>${pName(md.lord)}</b></td><td>${t('manglik')}</td><td><b>${(ch.manglik.fromLagna || ch.manglik.fromMoon) ? t('isManglik') : t('notManglik')}</b></td></tr></table></div>
        <div class="pdf-block pdf-charts"><div><h3>${t('lagnaChart')}</h3>${chartSVG(ch, 'lagna').replace('chart draw', 'chart')}</div><div><h3>${t('moonChart')}</h3>${chartSVG(ch, 'moon').replace('chart draw', 'chart')}</div><div><h3>${pick(C.acc.d9)}</h3>${chartSVG(ch, 'd9').replace('chart draw', 'chart')}</div></div>
        <div class="pdf-block"><h2>${t('planets')}</h2><table class="tbl"><thead><tr><th>${t('planet')}</th><th>${t('rashi')}</th><th>${t('degree')}</th><th>${t('nakshatra')}</th><th>${t('house')}</th></tr></thead><tbody>
          ${ch.planets.map(pl => `<tr><td><b>${pName(pl.name)}</b>${pl.retro && pl.name !== 'Rahu' && pl.name !== 'Ketu' ? ' (R)' : ''}</td><td>${pick(C.rashiShort[pl.sign])}</td><td>${fmtDeg(pl.deg)}</td><td>${pick(C.nak[pl.nak])}-${pl.pada}</td><td>${pl.house}</td></tr>`).join('')}</tbody></table></div>
        <div class="pdf-block"><h2>${t('nature')}</h2><p>${pick(C.lagnaText[ch.lagnaSign])}</p><h2>${t('mind')}</h2><p>${pick(C.moonText[ch.moonSign])}</p></div>
        <div class="pdf-block"><h2>${pick(C.life.lifeTitle)}</h2></div>
        ${R.areas.map(a => `<div class="pdf-block pdf-area"><h3>${a.icon} ${pick(a.t)} <span class="stars">${'★'.repeat(a.stars)}<span style="color:#ddd">${'★'.repeat(5 - a.stars)}</span></span></h3><p>${pick(C.life.level[a.k][a.lvl])}</p>
          ${a.k === 'health' ? `<p>${pick(C.life.element[ch.lagnaSign % 4])}</p>` : C.life.lordText[a.k] ? `<p><b>${pick(C.life.lordText[a.k].lbl)}:</b> ${pick(C.life.lordText[a.k][a.lord])}</p>` : ''}
          ${a.period ? `<p><b>${pick(C.life.bestPeriod)}:</b> ${fmtMonthYear(a.period.start)} – ${fmtMonthYear(a.period.end)}</p>` : ''}</div>`).join('')}
        <div class="pdf-block"><h2>${t('dasha')}</h2><table class="tbl"><tbody>${ch.dasha.slice(0, 9).map(x => `<tr><td><b>${pName(x.lord)}</b></td><td>${fmtMonthYear(Math.max(x.start, ch.jd))}</td><td>${fmtMonthYear(x.end)}</td></tr>`).join('')}</tbody></table></div>
        <div class="pdf-block">${h.spirit.replace(/<\/?section[^>]*>/g, '')}</div>
        <div class="pdf-block">${h.sade.replace(/<\/?section[^>]*>/g, '')}</div>
        <div class="pdf-block">${h.year.replace(/<\/?section[^>]*>/g, '')}</div>
        <div class="pdf-block">${lifeHTML(ch, jdNow()).split('<section class="card">').slice(1).filter(x => /🍀|🪔|✨/.test(x)).map(x => '<div>' + x.replace('</section>', '') + '</div>').join('')}</div>
        ${palmPdfHTML(p)}
        ${reportPdfHTML(p)}
        <div class="pdf-block pdf-foot">${t('disclaimer')} · ${t('aboutText')}</div>`;
      document.body.appendChild(box);
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      // paginate: push blocks that would be cut onto the next page
      const PW = 794, PH = 1123, MARGIN = 48;
      [...box.querySelectorAll('.pdf-block')].forEach(b => {
        const top = b.offsetTop, hgt = b.offsetHeight, pos = top % PH;
        if (pos + hgt > PH - MARGIN && hgt < PH - 2 * MARGIN) { const sp = document.createElement('div'); sp.style.height = (PH - pos + MARGIN) + 'px'; b.parentNode.insertBefore(sp, b); }
      });
      box.style.minHeight = Math.ceil(box.scrollHeight / PH) * PH + 'px';
      const canvas = await html2canvas(box, { scale: 2, backgroundColor: '#FFFDF8', useCORS: true, logging: false, windowWidth: PW });
      box.remove();
      const { jsPDF } = window.jspdf; const pdf = new jsPDF({ unit: 'px', format: [PW, PH], hotfixes: ['px_scaling'] });
      const pages = Math.ceil(canvas.height / (PH * 2));
      for (let i = 0; i < pages; i++) {
        const c = document.createElement('canvas'); c.width = PW * 2; c.height = PH * 2;
        const g = c.getContext('2d'); g.fillStyle = '#FFFDF8'; g.fillRect(0, 0, c.width, c.height);
        g.drawImage(canvas, 0, i * PH * 2, PW * 2, PH * 2, 0, 0, PW * 2, PH * 2);
        g.fillStyle = '#A8865F'; g.font = '20px Mukta, sans-serif'; g.textAlign = 'center'; g.fillText(`${t('appName')} · ${i + 1} / ${pages}`, PW, PH * 2 - 28);
        if (i) pdf.addPage([PW, PH]);
        pdf.addImage(c.toDataURL('image/jpeg', 0.88), 'JPEG', 0, 0, PW, PH);
      }
      const fname = `Kundli-${p.name.replace(/[^\wऀ-ॿ]+/g, '-')}.pdf`;
      const Cap = window.Capacitor && window.Capacitor.Plugins;
      if (Cap && Cap.Filesystem && Cap.Share) {
        const b64 = pdf.output('datauristring').split(',')[1];
        const w = await Cap.Filesystem.writeFile({ path: fname, data: b64, directory: 'CACHE' });
        await Cap.Share.share({ title: fname, files: [w.uri], dialogTitle: pick(P_.dl) });
      } else {
        const dl = window.claude && window.claude.use ? await window.claude.use('downloads').catch(() => null) : null;
        if (dl) { try { await dl.save({ filename: fname, data: pdf.output('blob') }); } catch (e) { if (e && e.code === 'declined') return; throw e; } }
        else pdf.save(fname);
      }
      toast('✓ ' + pick(P_.dlDone));
    } catch (e) { console.error(e); document.querySelectorAll('.pdf').forEach(x => x.remove()); toast(pick(P_.dlFail)); }
  }

  /* ---------- Palm camera ---------- */
  const isNative = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const canLive = () => { try { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.isSecureContext && window.self === window.top); } catch (e) { return false; } };
  function camButtons() {
    if (isNative()) return `<div class="row2 cambtns"><button class="btn primary" data-a="takePhoto">📷 ${pick(C.prem.camTake)}</button><button class="btn ghost" data-a="pickGallery">🖼️ ${pick(C.prem.camGallery)}</button></div>`;
    // On the web, the file inputs themselves are tapped, so phones always open the camera / gallery directly
    return `<div class="row2 cambtns"><label class="btn primary filebtn">📷 ${pick(C.prem.camTake)}<input type="file" accept="image/*" capture="environment" id="palmCapture"></label><label class="btn ghost filebtn">🖼️ ${pick(C.prem.camGallery)}<input type="file" accept="image/*" id="palmFile"></label></div>
      ${canLive() && !matchMedia('(pointer:coarse)').matches ? `<button class="btn link block" data-a="liveCam">🎥 ${pick(C.prem.liveCam)}</button>` : ''}`;
  }
  async function liveCam() {
    try { const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false }); openLiveCam(stream); }
    catch (e) { toast(pick(P_.camDenied)); }
  }
  async function takePhoto() {
    const Cam = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Camera;
    if (Cam && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      try { const ph = await Cam.getPhoto({ quality: 80, resultType: 'dataUrl', source: 'CAMERA', width: 1200, correctOrientation: true }); V.palmImg = ph.dataUrl; render(); }
      catch (e) { if (!/cancel/i.test(String(e && e.message))) toast(pick(P_.camDenied)); }
      return;
    }
    liveCam();
  }
  async function pickGallery() {
    const Cam = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Camera;
    if (Cam && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      try { const ph = await Cam.getPhoto({ quality: 80, resultType: 'dataUrl', source: 'PHOTOS', width: 1200, correctOrientation: true }); V.palmImg = ph.dataUrl; render(); } catch (e) { }
      return;
    }
    const f = document.getElementById('palmFile'); if (f) f.click();
  }
  function openLiveCam(stream) {
    const d = document.createElement('div'); d.className = 'cam';
    d.innerHTML = `<video autoplay playsinline muted></video>
      <svg class="cam-guide" viewBox="-36 0 236 260">${PALM_SVG('').replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
      <div class="cam-hint">${pick(P_.camHint)}</div>
      <div class="cam-bar"><button class="btn ghost" data-x="close">${t('cancel')}</button><button class="shutter" data-x="snap" aria-label="${pick(P_.camCapture)}"></button><span style="width:96px"></span></div>`;
    const v = d.querySelector('video'); v.srcObject = stream;
    const stop = () => { stream.getTracks().forEach(tr => tr.stop()); d.remove(); };
    d.onclick = e => {
      const x = e.target.closest('[data-x]'); if (!x) return;
      if (x.dataset.x === 'snap') {
        const c = document.createElement('canvas'), w = v.videoWidth || 720, h = v.videoHeight || 1280, k = Math.min(1, 1200 / Math.max(w, h));
        c.width = w * k; c.height = h * k; c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
        V.palmImg = c.toDataURL('image/jpeg', 0.85); d.classList.add('flash'); setTimeout(() => { stop(); render(); }, 180);
      } else stop();
    };
    document.body.appendChild(d);
  }

  /* ======================= CHATBOT ======================= */
  const CH = C.chat;
  const chatState = { open: false, msgs: [], forId: null };
  function chatAnswer(q) {
    const p = active(), ch = chartOf(p), now = jdNow(), s = q.toLowerCase();
    const R = lifeReading(ch, now), area = k => R.areas.find(a => a.k === k);
    const has = re => re.test(s);
    const per = a => a.period ? `${fmtMonthYear(a.period.start)} – ${fmtMonthYear(a.period.end)}` : pick(CH.noPeriod);
    const areaAns = k => {
      const a = area(k); let out = `${a.icon} <b>${pick(a.t)}</b>: ${'★'.repeat(a.stars)}${'☆'.repeat(5 - a.stars)}<br>${pick(C.life.level[k][a.lvl])}`;
      if (k === 'health') out += '<br>' + pick(C.life.element[ch.lagnaSign % 4]);
      else if (C.life.lordText[k]) out += `<br><b>${pick(C.life.lordText[k].lbl)}:</b> ${pick(C.life.lordText[k][a.lord])}`;
      out += `<br>🗓️ <b>${pick(C.life.bestPeriod)}:</b> ${per(a)}`;
      if (k === 'love') { const m = ch.manglik.fromLagna || ch.manglik.fromMoon; out += `<br>${t('manglik')}: <b>${m ? t('isManglik') : t('notManglik')}</b>`; }
      return out;
    };
    const day = off => { const r = prediction(p, off); return `${fmtDate(r.dt.y, r.dt.m, r.dt.d, true)}<br><b>${pick(C.dayLabel[r.score])}</b> ${'★'.repeat(r.score)}${'☆'.repeat(5 - r.score)}<br>${pick(C.houseMsg[r.dy.house - 1])}<br>🎨 ${t('luckyColour')}: <b>${pick(r.lucky)}</b> · 🔢 ${t('luckyNumber')}: <b>${r.luckyNum}</b><br>⏰ ${t('rahuKaal')}: <b>${fmtTime(r.pc.rahu.start, r.pl.tz)} – ${fmtTime(r.pc.rahu.end, r.pl.tz)}</b>`; };
    const AREAS = [['career', /career|job|naukri|nokri|business|vyapar|vyapaar|work|office|promotion|करियर|नौकरी|व्यापार|व्यवसाय|काम|प्रमोशन/],
      ['money', /money|paisa|paise|dhan|wealth|financ|income|loan|rich|save|पैसा|पैसे|धन|आय|आमदनी|कर्ज़|कर्ज|बचत/],
      ['love', /marriage|marri|marry|shaadi|shadi|vivah|love|partner|husband|wife|pati|patni|rishta|relationship|विवाह|शादी|प्रेम|पति|पत्नी|रिश्ता|जीवनसाथी/],
      ['health', /health|sehat|swasthya|bimar|disease|\bill\b|illness|स्वास्थ्य|सेहत|बीमार|रोग/],
      ['family', /family|parivar|ghar|home|house|property|mother|\bmaa\b|mata|vehicle|car|परिवार|घर|मकान|संपत्ति|माता|माँ|जायदाद|वाहन/],
      ['children', /child|baccha|bachch|santan|education|study|padhai|exam|संतान|बच्च|पढ़ाई|शिक्षा|परीक्षा/]];
    const areaHit = AREAS.find(([, re]) => has(re));
    if (has(/^(hi|hello|hey|namaste|namaskar|pranam|ram ram|jai shri)|नमस्ते|नमस्कार|प्रणाम|राम राम/)) return { html: pick(CH.hello).replace('{n}', esc(p.name.split(' ')[0])) };
    if (has(/thank|thanks|dhanyavad|shukriya|धन्यवाद|शुक्रिया/)) return { html: pick(CH.thanks) };
    if (has(/rahu ?kaal|rahu ?kal|राहु ?काल|muhurat|muhurt|shubh samay|good time|मुहूर्त|शुभ समय|abhijit/)) {
      const r = prediction(p, 0); return { html: `⏰ ${t('rahuKaal')}: <b>${fmtTime(r.pc.rahu.start, r.pl.tz)} – ${fmtTime(r.pc.rahu.end, r.pl.tz)}</b>${r.dy.wd !== 3 ? `<br>✨ ${t('abhijit')}: <b>${fmtTime(r.pc.abhijit.start, r.pl.tz)} – ${fmtTime(r.pc.abhijit.end, r.pl.tz)}</b>` : ''}<br>☀️ ${t('sunrise')}: ${fmtTime(r.pc.sunrise, r.pl.tz)} · ${t('sunset')}: ${fmtTime(r.pc.sunset, r.pl.tz)}` };
    }
    if (has(/sade ?sati|sadesati|saade|dhaiya|dhaiyya|shani|saturn|साढ़े|साढे|ढैय्या|शनि/)) {
      const ss = sadeSati(ch), st = ss.cur ? (ss.cur.type === 'sade' ? P_.sadeNow : P_.dhaiyaNow) : P_.sadeFree;
      return { html: `🪐 <b>${pick(st)}</b>${isPremium() ? (ss.cur ? `<br>${fmtMonthYear(ss.cur.start)} – ${fmtMonthYear(ss.cur.end)}` : (ss.nextSade ? `<br>${pick(P_.sadeNext)}: ${fmtMonthYear(ss.nextSade.start)} – ${fmtMonthYear(ss.nextSade.end)}` : '')) : `<br>👑 ${pick(P_.sadeTitle)}: ${pick(P_.locked)}`}<br>${pick(P_.sadeTip)}`, chips: isPremium() ? null : [['👑 ' + pick(P_.unlock), '__paywall']] };
    }
    if (has(/ekadashi|purnima|poornima|amavas|pradosh|sankashti|vrat|fast|upvas|एकादशी|पूर्णिमा|अमावस्या|प्रदोष|व्रत|उपवास|संकष्टी/)) {
      const pl = place(), d = todayYMD(), sp = E.specialDays(d.y, d.m, d.d, pl.lat, pl.lon, pl.tz, 60);
      const want = has(/ekadashi|एकादशी/) ? 'ekadashi' : has(/purnima|poornima|पूर्णिमा/) ? 'purnima' : has(/amavas|अमावस्या/) ? 'amavasya' : has(/pradosh|प्रदोष/) ? 'pradosh' : has(/sankashti|संकष्टी/) ? 'sankashti' : null;
      const list = (want ? sp.filter(x => x.type === want) : sp).slice(0, want ? 2 : 5);
      return { html: '📅 ' + list.map(x => `<b>${pick(C.special[x.type])}</b>: ${fmtDate(x.y, x.m, x.d, true)}`).join('<br>') };
    }
    if (has(/panchang|tithi|nakshatra today|aaj ki tithi|पंचांग|तिथि/)) {
      const pl = place(), d = todayYMD(), pc = E.dayPanchang(d.y, d.m, d.d, pl.lat, pl.lon, pl.tz);
      const tn = pc.tithi === 14 ? C.tithi[14] : pc.tithi === 29 ? C.tithi[15] : C.tithi[pc.tithi % 15];
      return { html: `📅 ${t('tithi')}: <b>${pick(tn)}</b> (${pc.tithi < 15 ? t('shukla') : t('krishna')})<br>${t('nakshatra')}: <b>${pick(C.nak[pc.nak])}</b><br>${t('yoga')}: <b>${pick(C.yoga[pc.yoga])}</b> · ${t('karana')}: <b>${pick(C.karana[pc.karana])}</b>` };
    }
    if (has(/gem|ratna|stone|ratn|रत्न|पत्थर|नग/)) { const ll = R.lagnaLord; return { html: `💎 ${pick(C.life.gem)}: <b>${pick(C.life.gems[ll])}</b> (${pName(ll)})<br>${pick(C.life.gemNote)}` }; }
    if (has(/colou?r|rang|रंग/)) { const r = prediction(p, 0); return { html: `🎨 ${t('luckyColour')} (${t('todayFor')}): <b>${pick(r.lucky)}</b><br>🚫 ${t('avoidColour')}: <b>${pick(r.avoid)}</b><br>🍀 ${pick(C.life.colour)} (${t('birthChart')}): <b>${pick(C.colour[R.lagnaLord])}</b>` }; }
    if (has(/number|ank|अंक|numerology/)) { const r = prediction(p, 0); return { html: `🔢 ${t('luckyNumber')} (${t('todayFor')}): <b>${r.luckyNum}</b><br>🍀 ${pick(C.life.number)}: <b>${C.life.num[R.lagnaLord]}</b>` }; }
    if (has(/dasha|dasa|mahadasha|antardasha|दशा|महादशा|अंतर्दशा/)) {
      const md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0], ad = md.sub.find(x => x.start <= now && x.end > now) || md.sub[0];
      return { html: `🔭 ${t('curMaha')}: <b>${pName(md.lord)}</b> (${t('till')} ${fmtMonthYear(md.end)})<br>${pick(C.dashaMeaning[md.lord])}<br>${t('curAntar')}: <b>${pName(ad.lord)}</b> (${t('till')} ${fmtMonthYear(ad.end)})<br>${pick(C.dashaMeaning[ad.lord])}` };
    }
    if (has(/manglik|mangal dosh|kuja|मांगलिक|मंगल दोष/)) { const m = ch.manglik; return { html: `🔴 ${t('manglik')}: <b>${(m.fromLagna || m.fromMoon) ? t('isManglik') : t('notManglik')}</b><br>${t('mFromLagna')}: ${m.fromLagna ? t('yes') : t('no')} · ${t('mFromMoon')}: ${m.fromMoon ? t('yes') : t('no')}<br>${t('manglikNote')}` }; }
    if (has(/remed|upay|upaay|solution|totka|उपाय|टोटका|समाधान/)) return { html: '🪔 ' + R.remedies.map(n => `<b>${pick(C.life.remedyFor).replace('{p}', pName(n))}</b>: ${pick(C.life.remedies[n])}`).join('<br>') };
    if (has(/yoga|yog\b|raj yog|योग/)) return { html: R.yogas.length ? '✨ ' + R.yogas.map(y => `<b>${C.life.yogas[y][L()]}</b>: ${C.life.yogas[y][2 + L()]}`).join('<br>') : pick(C.life.noYoga) };
    if (has(/temple|mandir|gurdwara|gurudwara|derasar|मंदिर|गुरुद्वारा|देरासर/)) return { html: `🛕 ${pick(C.bh.todaySub)}<br><a href="${mapsSearch('Hindu temple')}" target="_blank" rel="noopener">🗺️ ${pick(C.bh.seeMap)}</a> · <a href="${mapsRoute('Hindu temple')}" target="_blank" rel="noopener">🧭 ${pick(C.bh.route)}</a><br>${pick(C.bh.more)}: <b>${pick(C.bh.tab)}</b> tab` };
    if (has(/chalisa|aarti|arti|prayer|चालीसा|आरती|प्रार्थना/)) return { html: `🕉️ ${pick(C.bh.mantras)}: ${BHAKTI.mantras.length} ${pick(C.bh.count)} → <b>${pick(C.bh.tab)}</b> tab` };
    if (has(/mantra|jaap|jap\b|मंत्र|जाप/)) { const r = prediction(p, 0); return { html: `🕉️ ${t('mantraDay')}: <b>${r.mantra[0]}</b> (${r.mantra[1]})<br>${t('chant11')}${isPremium() ? `<br>${pick(P_.beejLagna)}: <b>${P_.beej[R.lagnaLord]}</b>` : ''}` }; }
    if (has(/deity|devta|god|bhagwan|ishta|isht|देवता|भगवान|इष्ट/)) return { html: `🙏 ${pick(C.life.deity)}: <b>${pick(C.life.deities[R.lagnaLord])}</b>` };
    if (has(/match|milan|kundli milan|guna|gun\b|मिलान|गुण/)) return { html: pick(CH.openKundli) + ' 💞', chips: [[pick(CH.openKundli), '__match']] };
    if (has(/palm|hast|rekha|haath|hand|हस्त|रेखा|हाथ/)) return { html: pick(CH.openPalm) + ' ✋', chips: [[pick(CH.openPalm), '__palm']] };
    if (has(/lagna|ascendant|rashi|sign|nakshatra|zodiac|लग्न|राशि|नक्षत्र/)) return { html: `🪐 ${t('lagna')}: <b>${pick(C.rashi[ch.lagnaSign])}</b><br>🌙 ${t('rashi')}: <b>${pick(C.rashi[ch.moonSign])}</b><br>⭐ ${t('nakshatra')}: <b>${pick(C.nak[ch.moonNak])}</b> (${t('pada')} ${ch.planets[1].pada})<br>${pick(C.lagnaText[ch.lagnaSign])}` };
    const decision = has(/should i|can i |is it good|is this a good|kya mujhe|kya main|kya mai|chahiye|karu|karun|kharid|buy|invest|start|shuru|क्या मुझे|क्या मैं|चाहिए|करूँ|करूं|ख़रीद|खरीद|शुरू|निवेश/);
    if (decision) {
      const a = area(areaHit ? areaHit[0] : 'career'), r = prediction(p, 0);
      return { html: pick(CH.decision).replace('{a}', pick(a.t)).replace('{s}', a.stars).replace('{p}', per(a)) + `<br><br>${t('todayFor')}: <b>${pick(C.dayLabel[r.score])}</b> · ⏰ ${t('rahuKaal')}: ${fmtTime(r.pc.rahu.start, r.pl.tz)} – ${fmtTime(r.pc.rahu.end, r.pl.tz)}<br><br>${pick(CH.aiSoon)}` };
    }
    if (areaHit) return { html: areaAns(areaHit[0]) };
    if (has(/tomorrow|\bkal\b|कल/)) return { html: day(1) };
    if (has(/today|aaj|\baj\b|\bdin\b|day|rashifal|horoscope|prediction|bhavishya|आज|राशिफल|दिन|भविष्य/)) return { html: day(0) };
    return { html: pick(CH.fallback) + '<br><br>' + pick(CH.aiSoon) };
  }

  function chatRender() {
    let root = document.getElementById('chat');
    if (!S.lang || !S.profiles.length || needLogin()) { if (root) root.remove(); return; }
    if (!root) { root = document.createElement('div'); root.id = 'chat'; document.body.appendChild(root); }
    const p = active();
    if (chatState.forId !== p.id) { chatState.forId = p.id; chatState.msgs = [{ me: false, html: pick(CH.hello).replace('{n}', esc(p.name.split(' ')[0])) }]; }
    if (!chatState.open) { root.innerHTML = `<button class="fab" data-c="open" aria-label="${pick(CH.title)}"><span class="fab-orb">🕉️</span><span class="fab-l">${pick(CH.title)}</span></button>`; return; }
    root.innerHTML = `<div class="chatwin"><div class="chat-h"><span class="fab-orb sm">🕉️</span><div><b>${pick(CH.title)}</b><div class="small">${pick(CH.sub)} · ${esc(p.name.split(' ')[0])}</div></div><button class="icbtn" data-c="close" aria-label="close">${ICON.cross}</button></div>
      <div class="chat-body" id="chatBody">${chatState.msgs.map(m => `<div class="msg ${m.me ? 'me' : 'bot'}">${m.html}${m.chips ? `<div class="mchips">${m.chips.map(c => `<button data-c="chip" data-q="${esc(c[1])}">${esc(c[0])}</button>`).join('')}</div>` : ''}</div>`).join('')}${chatState.typing ? '<div class="msg bot typing"><i></i><i></i><i></i></div>' : ''}</div>
      <div class="chips-row">${CH.chips.map(c => `<button data-c="chip" data-q="${esc(pick(c))}">${esc(pick(c))}</button>`).join('')}</div>
      <form class="chat-in" id="chatForm"><input id="chatQ" placeholder="${pick(CH.placeholder)}" autocomplete="off"><button class="send" aria-label="send">${ICON.right}</button></form></div>`;
    const body = document.getElementById('chatBody'); body.scrollTop = body.scrollHeight;
  }
  function chatAsk(q) {
    q = q.trim(); if (!q || chatState.typing) return;
    if (q === '__paywall') return paywall();
    if (q === '__match') { chatState.open = false; V.tab = 'match'; V.sub = null; ANIM = true; render(); return; }
    if (q === '__palm') { chatState.open = false; V.tab = 'palm'; V.palmStep = -1; ANIM = true; render(); return; }
    chatState.msgs.push({ me: true, html: esc(q) }); chatState.typing = true; chatRender();
    setTimeout(() => {
      let a; try { a = chatAnswer(q); } catch (e) { console.error(e); a = { html: pick(CH.fallback) }; }
      chatState.typing = false; chatState.msgs.push({ me: false, html: a.html, chips: a.chips }); chatRender();
    }, 650 + Math.random() * 500);
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-c]'); if (!el) return;
    const c = el.dataset.c;
    if (c === 'open') { chatState.open = true; chatRender(); setTimeout(() => { const i = document.getElementById('chatQ'); if (i && matchMedia('(pointer:fine)').matches) i.focus(); }, 50); }
    else if (c === 'close') { chatState.open = false; chatRender(); }
    else if (c === 'chip') chatAsk(el.dataset.q);
  });
  document.addEventListener('submit', e => { if (e.target.id === 'chatForm') { e.preventDefault(); const i = document.getElementById('chatQ'); const q = i.value; i.value = ''; chatAsk(q); } });



  /* ======================= AI PALM READING (both hands) ======================= */
  const PA = C.pa;
  const PV = { left: null, right: null, phase: 'capture', err: '', bad: {}, q: {}, dom: 'right', scanI: 0, scanT: null };
  const palmStore = () => (S.palmReadings = S.palmReadings || {});
  function shrinkImage(dataUrl, max = 1100) {
    return new Promise(res => {
      const im = new Image();
      im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.82)); };
      im.onerror = () => res(dataUrl); im.src = dataUrl;
    });
  }
  async function setHand(hand, dataUrl) { PV[hand] = await shrinkImage(dataUrl, 1400); PV.bad[hand] = false; PV.err = ''; PV.q[hand] = await photoQuality(PV[hand]); render(); }
  // quick on-phone photo check: too dark, too bright or blurry photos give poor readings
  function photoQuality(dataUrl) {
    return new Promise(res => {
      const im = new Image();
      im.onload = () => {
        const w = 256, h = Math.round(256 * im.height / im.width), c = document.createElement('canvas'); c.width = w; c.height = h;
        const g = c.getContext('2d'); g.drawImage(im, 0, 0, w, h); const d = g.getImageData(0, 0, w, h).data, gray = new Float32Array(w * h);
        let sum = 0; for (let i = 0; i < w * h; i++) { const v = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]; gray[i] = v; sum += v; }
        const mean = sum / (w * h); let lap = 0, lap2 = 0, n = 0;
        for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = y * w + x, v = 4 * gray[i] - gray[i - 1] - gray[i + 1] - gray[i - w] - gray[i + w]; lap += v; lap2 += v * v; n++; }
        const variance = lap2 / n - (lap / n) ** 2;
        res({ dark: mean < 60, bright: mean > 232, blurry: variance < 20, mean: Math.round(mean), sharp: Math.round(variance) });
      };
      im.onerror = () => res({}); im.src = dataUrl;
    });
  }
  async function nativeHand(hand, source) {
    try { const ph = await window.Capacitor.Plugins.Camera.getPhoto({ quality: 85, resultType: 'dataUrl', source, width: 1400, correctOrientation: true }); setHand(hand, ph.dataUrl); }
    catch (e) { if (!/cancel/i.test(String(e && e.message))) toast(pick(P_.camDenied)); }
  }
  function handCard(hand) {
    const img = PV[hand], bad = PV.bad[hand];
    const btns = isNative()
      ? `<button class="btn sm primary" data-a="handCam" data-v="${hand}">📷 ${pick(PA.take)}</button><button class="btn sm ghost" data-a="handGal" data-v="${hand}">🖼️ ${pick(PA.gallery)}</button>`
      : `<label class="btn sm primary filebtn">📷 ${pick(PA.take)}<input type="file" accept="image/*" capture="environment" data-hand="${hand}"></label><label class="btn sm ghost filebtn">🖼️ ${pick(PA.gallery)}<input type="file" accept="image/*" data-hand="${hand}"></label>`;
    return `<div class="handcard ${img ? 'has' : ''} ${bad ? 'bad' : ''}">
      <div class="hc-top"><b>${hand === 'left' ? '🤚' : '✋'} ${pick(PA[hand])}</b><span class="muted small">${pick(PA[hand + 'Means'])}</span></div>
      <div class="hc-img">${img ? `<img src="${img}" alt="">${bad ? `<div class="hc-flag">⚠️ ${pick(PA.badPhoto)}</div>` : qualWarn(hand) ? `<div class="hc-flag warn">⚠️ ${qualWarn(hand)}</div>` : `<div class="hc-ok">✓ ${pick(PA.ready)}</div>`}` : `<div class="hc-ph ${hand}">${PALM_SVG('')}</div>`}</div>
      <div class="hc-btns">${btns}</div></div>`;
  }
  const freeLeft = () => S.palmFreeLeft != null ? S.palmFreeLeft : Math.max(0, (CFG.freePalmReadings ?? 3) - (S.palmUsed || 0));
  const qualWarn = hand => { const q = PV.q[hand] || {}; return q.dark ? pick(PA.qDark) : q.bright ? pick(PA.qBright) : q.blurry ? pick(PA.qBlur) : ''; };
  const palmAllowed = () => isPremium() || (freeLeft() > 0 && !palmStore()[active().id]);
  function screenPalm() {
    if (PV.phase === 'quick') return screenPalmQuick();
    const p = active(), saved = palmStore()[p.id];
    if (PV.phase === 'scan') return `<h2 class="ptitle">✋ ${pick(PA.title)}</h2>
      <section class="card scanbox"><div class="scanpair">${['left', 'right'].map(h => `<div class="scanimg"><img src="${PV[h]}" alt=""><div class="scanline"></div><div class="scangrid"></div></div>`).join('')}</div>
      <div class="scanmsg" id="scanMsg">${pick(PA.scanning[PV.scanI % PA.scanning.length])}</div><div class="scanbar"><i></i></div><p class="muted small center">${pick(PA.wait)}</p></section>`;
    if (PV.phase === 'result' && saved) return palmResultHTML(p, saved);
    return `<h2 class="ptitle">✋ ${pick(PA.title)}</h2><p class="muted secsub">${pick(PA.sub)}</p>
      ${saved ? `<button class="btn ghost block" data-a="palmShowSaved">📜 ${pick(PA.readOn)} ${new Date(saved.at).toLocaleDateString(L() ? 'hi-IN' : 'en-IN')}</button>` : ''}
      <div class="fl domrow">${pick(PA.domQ)}<div class="seg sm"><button data-a="palmDom" data-v="right" class="${PV.dom === 'right' ? 'on' : ''}">✍️ ${pick(PA.right)}</button><button data-a="palmDom" data-v="left" class="${PV.dom === 'left' ? 'on' : ''}">✍️ ${pick(PA.left)}</button></div></div>
      <details class="more palmtips"><summary>💡 ${g('palmTips')}</summary><ul class="list">${GT.palmTipList.map(x => `<li>✔️ <span>${pick(x)}</span></li>`).join('')}</ul></details>
      <div class="handgrid">${handCard('left')}${handCard('right')}</div>
      ${PV.err ? `<div class="err">${pick(PA[PV.err] || PA.errFail)}</div>` : ''}
      <button class="btn gold block bigcta" data-a="palmAnalyse" ${PV.left && PV.right ? '' : 'disabled'}>🔮 ${pick(PA.analyse)}${palmAllowed() ? '' : ' 🔒'}</button>
      ${PV.left && PV.right ? '' : `<p class="muted small center">${pick(PA.needBoth)}</p>`}
      ${isPremium() ? '' : palmAllowed() ? `<p class="muted small center">🎁 ${pick(PA.freeLeft).replace('{n}', freeLeft())} · ${pick(Y.palm.rule)}</p>` : `<p class="note center">🔒 ${pick(Y.palm.usedFor).replace('{n}', esc(p.name.split(' ')[0]))}</p>`}
      <section class="card"><h3>💡 ${pick(PA.tipsTitle)}</h3><ul class="tips">${PA.tips.map(x => `<li>${pick(x)}</li>`).join('')}</ul></section>
      <button class="btn link block" data-a="palmQuick">✋ ${pick(PA.quick)}</button>`;
  }
  function kundliSummary(p, ch) {
    const now = jdNow(), R = lifeReading(ch, now), md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0], ad = md.sub.find(x => x.start <= now && x.end > now) || md.sub[0];
    const ss = sadeSati(ch), d = todayYMD();
    const en = arr => arr[0];
    return {
      name: p.name, gender: p.gender === 'f' ? 'female' : 'male', age: d.y - p.y - ((d.m < p.m || (d.m === p.m && d.d < p.d)) ? 1 : 0), today: `${d.y}-${pad(d.m)}-${pad(d.d)}`,
      lagna: en(C.rashi[ch.lagnaSign]), moonSign: en(C.rashi[ch.moonSign]), nakshatra: en(C.nak[ch.moonNak]),
      planets: ch.planets.map(x => `${x.name} in ${en(C.rashiShort[x.sign])} (house ${x.house}${x.retro && !['Rahu', 'Ketu'].includes(x.name) ? ', retrograde' : ''})`),
      currentDasha: `${md.lord} Mahadasha until ${fmtMonthYearEn(md.end)}, ${ad.lord} Antardasha until ${fmtMonthYearEn(ad.end)}`,
      nextDashas: ch.dasha.filter(x => x.end > now).slice(1, 3).map(x => `${x.lord} Mahadasha ${fmtMonthYearEn(x.start)}–${fmtMonthYearEn(x.end)}`),
      areas: Object.fromEntries(R.areas.map(a => [a.k, { stars: a.stars, note: en(C.life.level[a.k][a.lvl]), bestPeriod: a.period ? `${fmtMonthYearEn(a.period.start)}–${fmtMonthYearEn(a.period.end)}` : null }])),
      yogas: R.yogas.map(y => C.life.yogas[y][0]), manglik: !!(ch.manglik.fromLagna || ch.manglik.fromMoon),
      sadeSati: ss.cur ? `${ss.cur.type === 'sade' ? 'Sade Sati' : 'Shani Dhaiya'} running ${fmtMonthYearEn(ss.cur.start)}–${fmtMonthYearEn(ss.cur.end)}` : 'not running'
    };
  }
  const fmtMonthYearEn = jd => { const x = E.jdToLocal(jd, 5.5); return `${C.months[x.m - 1][0].slice(0, 3)} ${x.y}`; };
  const dataUrlToBlob = u => { const [h, b] = u.split(','), bin = atob(b), arr = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); return new Blob([arr], { type: (h.match(/:(.*?);/) || [])[1] || 'image/jpeg' }); };
  function startScan() { clearInterval(PV.scanT); PV.scanT = setInterval(() => { PV.scanI++; const m = $('#scanMsg'); if (m) { m.classList.remove('in'); void m.offsetWidth; m.textContent = pick(PA.scanning[PV.scanI % PA.scanning.length]); m.classList.add('in'); } }, 2200); }
  async function palmAnalyse() {
    if (!(PV.left && PV.right)) return;
    if (!palmAllowed()) return paywall();
    const p = active(), ch = chartOf(p), kd = kundliSummary(p, ch);
    PV.phase = 'scan'; PV.err = ''; PV.scanI = 0; ANIM = true; render(); window.scrollTo(0, 0); startScan();
    let res = null, err = '';
    try {
      if (CFG.apiBase && CFG.apiBase !== 'demo') {
        const r = await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/palm', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ left: (await shrinkImage(PV.left, 1200)).split(',')[1], right: (await shrinkImage(PV.right, 1200)).split(',')[1], kundli: kd, lang: S.lang, dominant: PV.dom, token: S.user && S.user.token }) });
        const j = await r.json(); if (j.ok) res = j.result; else if (j.error === 'premium_required') { S.palmFreeLeft = 0; persist(); err = 'premium'; } else err = j.error === 'not_configured' ? 'errNoAI' : j.error === 'rate_limited' ? 'errBusy' : j.error === 'login_required' ? 'errLogin' : 'errFail';
      } else {
        const sample = window.claude && window.claude.use ? await window.claude.use('sample') : null;
        if (!sample) err = 'errNoAI';
        else res = await sample.json(buildPalmPrompt(kd, S.lang, PV.dom), { images: [dataUrlToBlob(PV.left), dataUrlToBlob(PV.right)], modelTier: 'complex', cache: false });
      }
    } catch (e) { console.error(e); err = e && e.code === 'rate_limited' ? 'errBusy' : 'errFail'; }
    clearInterval(PV.scanT);
    if (!err && (!res || typeof res !== 'object' || !res.valid)) err = 'errFail';
    if (!err && (res.valid.left === false || res.valid.right === false)) {
      PV.bad = { left: res.valid.left === false, right: res.valid.right === false }; PV.phase = 'capture'; PV.err = '';
      render(); if (res.valid.issue) toast(res.valid.issue); return;
    }
    if (err === 'premium') { PV.phase = 'capture'; render(); paywall(); return; }
    if (err) { PV.phase = 'capture'; PV.err = err; render(); return; }
    palmStore()[p.id] = { at: Date.now(), r: res, thumbs: { left: await shrinkImage(PV.left, 260), right: await shrinkImage(PV.right, 260) } };
    S.palmUsed = (S.palmUsed || 0) + 1; if (S.palmFreeLeft != null && !isPremium()) S.palmFreeLeft = Math.max(0, S.palmFreeLeft - 1); persist();
    PV.phase = 'result'; ANIM = true; render(); window.scrollTo(0, 0);
  }
  const st5 = n => { n = Math.max(1, Math.min(5, Math.round(+n || 3))); return `<span class="stars">${'<i>★</i>'.repeat(n)}${'<i class="o">★</i>'.repeat(5 - n)}</span>`; };
  function palmResultHTML(p, saved) {
    const r = saved.r, ch = chartOf(p), R = lifeReading(ch, jdNow());
    const shape = r.handShape || {}, sn = PA.shapeNames[shape.type];
    const lines = (r.lines || []).map(l => `<section class="card pline-card"><div class="lh"><span class="li">${PA.lineIcons[l.key] || '✨'}</span><h3>${esc(l.name || '')}</h3>${st5(l.stars)}</div>${l.confidence ? `<span class="conf ${esc(l.confidence)}">${pick(PA.conf[l.confidence] || PA.conf.medium)}</span>` : ''}
      <div class="lr"><div><span>${pick(PA.onLeft)}</span>${esc(l.left || '—')}</div><div><span>${pick(PA.onRight)}</span>${esc(l.right || '—')}</div></div><p>${esc(l.meaning || '')}</p></section>`).join('');
    const areas = C.life.areas.map(a => { const x = (r.areas || {})[a.k]; if (!x) return ''; const ka = R.areas.find(z => z.k === a.k);
      return `<section class="card life"><div class="lh"><span class="li">${a.icon}</span><h3>${pick(a.t)}</h3></div>
        <div class="dual"><div><small>${pick(PA.kStars)}</small>${st5(ka.stars)}</div><div><small>${pick(PA.pStars)}</small>${st5(x.palmStars)}</div></div>
        <p class="muted">${esc(x.palm || '')}</p><p>${esc(x.combined || '')}</p></section>`; }).join('');
    return `<div class="palmhead"><div class="thumbs">${['left', 'right'].map(h => `<figure><img src="${saved.thumbs[h]}" alt=""><figcaption>${pick(PA[h])}</figcaption></figure>`).join('')}</div>
        <h2 class="ptitle">✋ ${pick(PA.title)}</h2><div class="muted small">${esc(p.name)} · ${new Date(saved.at).toLocaleDateString(L() ? 'hi-IN' : 'en-IN')}</div></div>
      <section class="card hero"><h3>🔮 ${pick(PA.summary)}</h3><p class="lead">${esc(r.summary || '')}</p>
        <div class="row2"><a class="btn wa" href="https://wa.me/?text=${encodeURIComponent(`✋ ${pick(PA.title)} – ${p.name}\n\n${r.summary || ''}\n\n— ${t('appName')}`)}" target="_blank" rel="noopener">${ICON.wa}<span>${pick(PA.share)}</span></a>
        <button class="btn ghost" data-a="${isPremium() ? 'pdf' : 'paywall'}">📄 PDF${isPremium() ? '' : ' 🔒'}</button></div></section>
      ${sn ? `<section class="card"><h3>🖐️ ${pick(PA.shape)}: ${pick(sn)}</h3><p>${esc(shape.reading || '')}</p></section>` : ''}
      <h2 class="ptitle sec">${pick(PA.linesTitle)}</h2>${lines}
      ${(r.mounts || []).length ? `<section class="card"><h3>⛰️ ${pick(PA.mounts)}</h3>${r.mounts.map(m => `<div class="yoga"><b>${esc(m.name)}</b><p class="muted small">${esc(m.observation || '')}</p><p>${esc(m.meaning || '')}</p></div>`).join('')}</section>` : ''}
      ${(r.marks || []).length ? `<section class="card"><h3>✴️ ${pick(PA.marks)}</h3><ul class="tips">${r.marks.map(m => `<li>${esc(m)}</li>`).join('')}</ul></section>` : ''}
      <h2 class="ptitle sec">${pick(PA.combinedTitle)}</h2>${areas}
      ${r.agreement ? `<section class="card"><h3>🤝 ${pick(PA.agreement)}</h3><p>${esc(r.agreement)}</p></section>` : ''}
      ${(r.phases || []).length ? `<section class="card"><h3>🗓️ ${pick(PA.phases)}</h3>${r.phases.map(x => `<div class="trow g"><div class="tdate">${esc(x.period)}</div><div>${esc(x.text)}</div></div>`).join('')}</section>` : ''}
      ${(r.advice || []).length ? `<section class="card"><h3>💡 ${pick(PA.advice)}</h3><ul class="list good">${r.advice.map(x => `<li>${ICON.check}<span>${esc(x)}</span></li>`).join('')}</ul></section>` : ''}
      ${(r.remedies || []).length ? `<section class="card"><h3>🪔 ${pick(PA.remedies)}</h3><ul class="tips">${r.remedies.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>` : ''}
      <p class="muted small center">${pick(PA.disclaimer)}</p>
      <button class="btn primary block" data-a="palmNew">✋ ${pick(PA.newReading)}</button>`;
  }
  function palmPdfHTML(p) {
    const saved = palmStore()[p.id]; if (!saved) return '';
    const r = saved.r, sn = (r.handShape && PA.shapeNames[r.handShape.type]);
    return `<div class="pdf-block"><h2>✋ ${pick(PA.title)}</h2><div class="pdf-thumbs">${['left', 'right'].map(h => `<figure><img src="${saved.thumbs[h]}"><figcaption>${pick(PA[h])}</figcaption></figure>`).join('')}</div><p>${esc(r.summary || '')}</p>${sn ? `<p><b>${pick(PA.shape)}: ${pick(sn)}</b> – ${esc(r.handShape.reading || '')}</p>` : ''}</div>
      ${(r.lines || []).map(l => `<div class="pdf-block pdf-area"><h3>${PA.lineIcons[l.key] || '✨'} ${esc(l.name)}</h3><p><b>${pick(PA.onLeft)}:</b> ${esc(l.left || '')}<br><b>${pick(PA.onRight)}:</b> ${esc(l.right || '')}</p><p>${esc(l.meaning || '')}</p></div>`).join('')}
      <div class="pdf-block"><h2>${pick(PA.combinedTitle)}</h2></div>
      ${C.life.areas.map(a => { const x = (r.areas || {})[a.k]; return x ? `<div class="pdf-block pdf-area"><h3>${a.icon} ${pick(a.t)}</h3><p>${esc(x.combined || '')}</p></div>` : ''; }).join('')}
      ${(r.phases || []).length ? `<div class="pdf-block"><h3>🗓️ ${pick(PA.phases)}</h3>${r.phases.map(x => `<p><b>${esc(x.period)}:</b> ${esc(x.text)}</p>`).join('')}</div>` : ''}`;
  }

  /* ======================= LOGIN (WhatsApp number + OTP) ======================= */
  const LG = C.login;
  const CFG = (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG : { apiBase: '', whatsappNumber: '', requireLogin: false });
  const LV = { step: 'phone', name: '', cc: '91', num: '', consent: false, err: '', busy: false, until: 0, timer: null, mode: !CFG.apiBase ? 'simple' : (CFG.loginMethod === 'otp' ? 'otp' : 'wa'), wa: null, poll: null };
  const needLogin = () => CFG.requireLogin && !S.user;
  const fullPhone = () => LV.cc + LV.num.replace(/\D/g, '');
  const validPhone = () => { const d = LV.num.replace(/\D/g, ''); return LV.cc === '91' ? /^[6-9]\d{9}$/.test(d) : /^\d{6,13}$/.test(d); };
  async function api(path, body) {
    if (CFG.apiBase === 'demo') { await new Promise(r => setTimeout(r, 700)); if (path.endsWith('verify')) return body.code === '123456' ? { ok: true, token: 'demo' } : { ok: false, error: 'bad_code' }; if (!/^\d{8,15}$/.test(body.phone || '')) return { ok: false, error: 'bad_phone' }; return { ok: true, resendIn: 30 }; }
    const r = await fetch(CFG.apiBase.replace(/\/$/, '') + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    return r.json();
  }
  function screenLogin() {
    const ccs = [['91', '🇮🇳 +91'], ['977', '🇳🇵 +977'], ['971', '🇦🇪 +971'], ['1', '🇺🇸 +1'], ['44', '🇬🇧 +44'], ['65', '🇸🇬 +65'], ['61', '🇦🇺 +61'], ['974', '🇶🇦 +974'], ['966', '🇸🇦 +966']];
    const err = LV.err ? `<div class="err">${pick(LG[LV.err] || LG.netErr)}</div>` : '';
    if (LV.step === 'otp') {
      const left = Math.max(0, Math.ceil((LV.until - Date.now()) / 1000));
      return `<div class="login">${LOGO}<h2>${pick(LG.otpTitle)}</h2><p class="muted">${pick(LG.otpSent)}<br><b>+${LV.cc} ${esc(LV.num)}</b></p>
        <form id="otpForm" class="card form" novalidate>
          <input id="otp" class="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]*" placeholder="••••••" aria-label="OTP">
          ${CFG.apiBase === 'demo' ? `<p class="muted small center">${pick(LG.demoCode)}</p>` : ''}${err}
          <p class="muted small center">${pick(LG.otpHelp)}</p>
          <button class="btn primary block" type="submit" ${LV.busy ? 'disabled' : ''}>${LV.busy ? pick(LG.verifying) : pick(LG.verify)}</button>
          <div class="row2"><button type="button" class="btn link" data-a="lgChange">${ICON.left}${pick(LG.change)}</button>
          <button type="button" class="btn link" data-a="lgResend" ${left ? 'disabled' : ''} id="resendBtn">${left ? pick(LG.resendIn).replace('{s}', left) : pick(LG.resend)}</button></div>
        </form></div>`;
    }
    if (LV.step === 'wa' && LV.wa) {
      const href = CFG.apiBase === 'demo' ? '#' : `https://wa.me/${LV.wa.waNumber}?text=${encodeURIComponent(LV.wa.text)}`;
      return `<div class="login">${LOGO}<h2>${pick(LG.waTitle)}</h2><p class="muted">${pick(LG.waFrom)} <b>+${LV.cc} ${esc(LV.num)}</b></p>
        <section class="card form wa-card">
          <ol class="wa-steps">${LG.waSteps.map(x => `<li>${pick(x)}</li>`).join('')}</ol>
          <div class="wa-code"><small>${pick(LG.waCode)}</small><b>${esc(LV.wa.code)}</b></div>
          <a class="btn wa block bigcta" href="${href}" target="_blank" rel="noopener" data-a="lgWaOpen">${ICON.wa}<span>${pick(LG.waOpen)}</span></a>
          ${CFG.apiBase === 'demo' ? `<p class="muted small center">${pick(LG.waDemo)}</p>` : ''}
          <div class="wa-wait"><span class="dots"><i></i><i></i><i></i></span> ${pick(LG.waWaiting)}</div>
          ${LV.err ? `<div class="err">${pick(LG[LV.err] || LG.netErr)}</div>` : ''}
          <button type="button" class="btn link block" data-a="lgChange">${ICON.left}${pick(LG.waAgain)}</button>
        </section></div>`;
    }
    if (LV.step === 'hi') {
      const msg = pick(LG.hiMsg).replace('{n}', LV.name);
      return `<div class="login">${LOGO}<h2>${pick(LG.hiTitle)}</h2><p class="lead">${pick(LG.hiText)}</p>
        <a class="btn wa block" href="https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" data-a="lgHiSent">${ICON.wa}<span>${pick(LG.hiBtn)}</span></a>
        <button class="btn ghost block" data-a="lgDone">${pick(LG.next)} →</button></div>`;
    }
    if (LV.step === 'name') {
      return `<div class="login">${LOGO}<h2>${pick(LG.nameTitle)}</h2><p class="muted">${pick(LV.pending && LV.pending.verified ? LG.nameSub : LG.nameSubSimple)}</p>
      <form id="nameForm" class="card form" novalidate>
        <label class="fl">${pick(LG.name)}<input id="lgName" value="${esc(LV.name)}" autocomplete="name" placeholder="${pick(LG.namePh)}" maxlength="60"></label>
        <label class="cb consent"><input type="checkbox" id="lgConsent" ${LV.consent ? 'checked' : ''}> <span>${pick(LG.consent)}</span></label>
        ${err}
        <button class="btn primary block" type="submit" ${LV.busy ? 'disabled' : ''}>${pick(LG.start)} →</button>
      </form></div>`;
    }
    const wa = LV.mode === 'wa';
    return `<div class="login">${LOGO}<h2>${pick(LG.title)}</h2><p class="muted">${pick(wa ? LG.waSub : LV.mode === 'otp' ? LG.sub : LG.subSimple)}</p>
      <form id="loginForm" class="card form" novalidate>
        ${`<div class="fl">${pick(LG.phone)}<div class="phrow"><select id="lgCc" aria-label="Country code">${ccs.map(c => `<option value="${c[0]}" ${c[0] === LV.cc ? 'selected' : ''}>${c[1]}</option>`).join('')}</select>
          <input id="lgNum" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="15" placeholder="${pick(LG.phonePh)}" value="${esc(LV.num)}"></div></div>`}
        ${err}
        <button class="btn ${LV.mode !== 'simple' ? 'wa' : 'primary'} block" type="submit" ${LV.busy ? 'disabled' : ''}>${LV.mode !== 'simple' ? ICON.wa : ''}<span>${LV.busy ? pick(LG.sending) : wa ? pick(LG.waBtn) : LV.mode === 'otp' ? pick(LG.sendOtp) : pick(LG.next)}</span></button>
        <p class="muted small center">🔒 ${pick(LG.privacy)}</p>
        ${CFG.requireLogin ? '' : `<button type="button" class="btn link block" data-a="lgSkip">${pick(LG.skip)}</button>`}
      </form></div>`;
  }
  function readLoginForm() { if ($('#lgCc')) LV.cc = $('#lgCc').value; if ($('#lgNum')) { LV.num = $('#lgNum').value.replace(/\D/g, ''); if (LV.cc === '91' && LV.num.length === 12 && LV.num.startsWith('91')) LV.num = LV.num.slice(2); if (LV.num.length === 11 && LV.num.startsWith('0')) LV.num = LV.num.slice(1); } }
  function startTimer(sec) {
    LV.until = Date.now() + sec * 1000; clearInterval(LV.timer);
    LV.timer = setInterval(() => { const b = $('#resendBtn'); const left = Math.max(0, Math.ceil((LV.until - Date.now()) / 1000)); if (!b) return clearInterval(LV.timer); b.disabled = !!left; b.textContent = left ? pick(LG.resendIn).replace('{s}', left) : pick(LG.resend); if (!left) clearInterval(LV.timer); }, 1000);
  }
  function finishLogin(verified, token, phone, name) {   // number done: now ask the name (skipped for a returning user whose name we know)
    clearInterval(LV.poll);
    LV.pending = { verified, token: token || null, phone: phone || ('+' + fullPhone()) };
    if (name) { LV.name = name; return completeLogin(); }
    LV.step = 'name'; LV.err = ''; ANIM = true; render(); window.scrollTo(0, 0); setTimeout(() => { const i = $('#lgName'); if (i) i.focus(); }, 80);
  }
  async function completeLogin() {
    const p = LV.pending || {};
    S.user = { name: LV.name, phone: p.phone, verified: !!p.verified, token: p.token, consent: LV.consent, at: Date.now() };
    persist();
    if (p.token && CFG.apiBase && CFG.apiBase !== 'demo') { try { fetch(CFG.apiBase.replace(/\/$/, '') + '/api/profile', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: p.token, name: LV.name, consent: LV.consent, lang: S.lang }) }).then(() => syncMe()).catch(() => { }); } catch (e) { } }
    if (!p.verified && CFG.whatsappNumber && LV.step !== 'hi') { LV.step = 'hi'; ANIM = true; render(); return; }
    LV.step = 'phone'; LV.pending = null; ANIM = true; render(); window.scrollTo(0, 0);
  }
  async function sendOtp() {
    LV.err = ''; LV.busy = true; render();
    try {
      const r = await api('/api/otp/send', { phone: fullPhone(), lang: S.lang });
      LV.busy = false;
      if (r.ok) { LV.step = 'otp'; LV.until = Date.now() + (r.resendIn || 30) * 1000; render(); startTimer(r.resendIn || 30); setTimeout(() => { const i = $('#otp'); if (i) i.focus(); }, 60); }
      else if (r.error === 'not_configured') { LV.mode = 'simple'; LV.step = 'phone'; render(); }
      else { LV.err = r.error === 'rate_limited' ? 'tooMany' : r.error === 'bad_phone' ? 'badPhone' : r.error === 'send_failed' ? 'sendFail' : 'netErr'; render(); }
    } catch (e) { LV.busy = false; LV.err = 'netErr'; render(); }
  }
  async function verifyOtp(code) {
    LV.err = ''; LV.busy = true; render();
    try {
      const r = await api('/api/otp/verify', { phone: fullPhone(), code, lang: S.lang });
      LV.busy = false;
      if (r.ok) { toast('✓ ' + pick(LG.verified)); finishLogin(true, r.token, null, r.name); }
      else { LV.err = r.error === 'too_many' ? 'tooMany' : 'badCode'; render(); }
    } catch (e) { LV.busy = false; LV.err = 'netErr'; render(); }
  }
  document.addEventListener('submit', e => {
    if (e.target.id === 'loginForm') {
      e.preventDefault(); readLoginForm(); LV.err = '';
      if (!validPhone()) { LV.err = 'badPhone'; return render(); }
      if (LV.mode === 'wa') return waStart();
      if (LV.mode === 'otp') sendOtp(); else finishLogin(false);
    }
    if (e.target.id === 'nameForm') {
      e.preventDefault(); LV.name = ($('#lgName').value || '').trim().replace(/\s+/g, ' '); LV.consent = $('#lgConsent').checked;
      if (LV.name.length < 2) { LV.err = 'badName'; return render(); }
      completeLogin();
    }
    if (e.target.id === 'otpForm') { e.preventDefault(); const c = ($('#otp').value || '').replace(/\D/g, ''); if (c.length !== 6) { LV.err = 'badCode'; return render(); } verifyOtp(c); }
  });
  document.addEventListener('input', e => { if (e.target.id === 'otp') { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6); if (e.target.value.length === 6 && !LV.busy) verifyOtp(e.target.value); } });
  async function waStart() {
    LV.err = ''; LV.busy = true; render();
    try {
      let r;
      if (CFG.apiBase === 'demo') { await new Promise(x => setTimeout(x, 500)); r = { ok: true, code: 'JS' + String(Math.floor(Math.random() * 1e6)).padStart(6, '0'), waNumber: '', text: '' }; }
      else r = await (await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/login/start', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ lang: S.lang, phone: fullPhone() }) })).json();
      LV.busy = false;
      if (r.ok) { LV.wa = r; LV.step = 'wa'; render(); clearInterval(LV.poll); LV.poll = setInterval(waPoll, 3000); }
      else if (r.error === 'not_configured') { LV.mode = 'simple'; render(); }
      else { LV.err = r.error === 'rate_limited' ? 'tooMany' : 'netErr'; render(); }
    } catch (e) { LV.busy = false; LV.err = 'netErr'; render(); }
  }
  async function waPoll() {
    if (LV.step !== 'wa' || !LV.wa) return clearInterval(LV.poll);
    if (CFG.apiBase === 'demo') { if (LV.wa.opened && Date.now() - LV.wa.opened > 3000) { toast('✓ ' + pick(LG.verified)); finishLogin(true, 'demo', '+' + fullPhone()); } return; }
    try {
      const r = await (await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/login/status', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code: LV.wa.code }) })).json();
      if (r.ok && r.verified) { toast('✓ ' + pick(LG.verified)); finishLogin(true, r.token, r.phone, r.name); }
    } catch (e) { }
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && LV.step === 'wa') waPoll(); });
  async function syncMe() {
    if (!(CFG.apiBase && CFG.apiBase !== 'demo' && S.user && S.user.token)) return;
    try {
      const r = await (await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/me', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: S.user.token }) })).json();
      if (r.ok) { S.serverPremium = !!r.premium; S.palmFreeLeft = r.palmFree; applyEnt(r); persist(); render(); }
    } catch (e) { }
  }
  function accountCard() {
    if (!S.user) return '';
    return `<section class="card"><h3>📱 ${pick(LG.account)}</h3>
      <div class="area"><span>${esc(S.user.name)}</span><b>${esc(S.user.phone)}</b></div>
      <div class="area"><span>${S.user.verified ? '✅ ' + pick(LG.verified) : pick(LG.notVerified)}</span><span></span></div>
      <div class="area"><span>${pick(LG.waUpdates)}</span><div class="seg sm mini"><button data-a="consent" data-v="1" class="${S.user.consent ? 'on' : ''}">${pick(LG.on)}</button><button data-a="consent" data-v="0" class="${!S.user.consent ? 'on' : ''}">${pick(LG.off)}</button></div></div>
      <button class="btn link" data-a="logout">${pick(LG.logout)}</button></section>`;
  }
  async function setConsent(v) {
    S.user.consent = v; persist(); render();
    if (CFG.apiBase && CFG.apiBase !== 'demo' && S.user.token) { try { await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/consent', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: S.user.token, consent: v }) }); } catch (e) { } }
  }


  /* ---------- 3D cosmic background for welcome + login ---------- */
  const COSMOS = (() => {
    const R = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'], G = '♈♉♊♋♌♍♎♏♐♑♒♓';
    let w = '<svg viewBox="-300 -300 600 600"><circle r="282" fill="rgba(123,30,43,.35)" stroke="#F3C46B" stroke-opacity=".75" stroke-width="2"/><circle r="214" fill="none" stroke="#F3C46B" stroke-opacity=".45"/><circle r="120" fill="none" stroke="#F3C46B" stroke-opacity=".25" stroke-dasharray="3 7"/>';
    R.forEach((r, i) => {
      const a = (i * 30 - 90) * Math.PI / 180, a2 = ((i + .5) * 30 - 90) * Math.PI / 180;
      w += `<line x1="${(Math.cos(a) * 214).toFixed(1)}" y1="${(Math.sin(a) * 214).toFixed(1)}" x2="${(Math.cos(a) * 282).toFixed(1)}" y2="${(Math.sin(a) * 282).toFixed(1)}" stroke="#F3C46B" stroke-opacity=".5"/>`;
      w += `<g transform="translate(${(Math.cos(a2) * 248).toFixed(1)} ${(Math.sin(a2) * 248).toFixed(1)}) rotate(${(i + .5) * 30})"><text y="-3" text-anchor="middle" fill="#FCE3B5" font-size="18" font-family="Tiro Devanagari Hindi,serif">${r}</text><text y="19" text-anchor="middle" fill="#F3C46B" font-size="16">${G[i]}&#xFE0E;</text></g>`;
    });
    w += '</svg>';
    const orb = (d, s, t, bg, g, delay) => `<div class="orbit" style="--d:${d}px"><i style="--s:${s}px;--t:${t}s;--bg:${bg};--g:${g};animation-delay:-${delay}s"></i></div>`;
    return `<div class="cosmos" aria-hidden="true"><div class="stars s1"></div><div class="stars s2"></div><div class="core"><div class="wheel-wrap"><div class="wheel-3d">${w}</div></div>
      ${orb(300, 16, 12, 'radial-gradient(circle at 35% 30%,#F4F2FA,#A9A7B6 60%,#45434F)', 'rgba(255,255,255,.3)', 3)}
      ${orb(400, 22, 19, 'radial-gradient(circle at 35% 30%,#FFB49A,#D9442B 55%,#5E120A)', 'rgba(217,68,43,.5)', 8)}
      ${orb(500, 30, 28, 'radial-gradient(circle at 35% 30%,#FFF1C2,#E8B45C 50%,#8A5A18)', 'rgba(243,196,107,.5)', 15)}
      <div class="sunorb"></div></div></div>`;
  })();

  /* ======================= BHAKTI: nearby temples + mantra directory ======================= */
  const BH = C.bh;
  V.bh = { mode: 'temples', g: 'hindu', cat: 'all', q: '', open: null, size: 1 };
  V.loc = null; V.locState = 'idle';   // location kept in memory only, never saved
  const favs = () => (S.favM = S.favM || []);
  function getLocation(force) {
    if (V.locState === 'busy' || (V.locState !== 'idle' && !force)) return;
    V.locState = 'busy'; const done = (ok, c) => { V.locState = ok ? 'on' : 'off'; if (ok) V.loc = { lat: +c.latitude.toFixed(4), lon: +c.longitude.toFixed(4) }; if (['today', 'bhakti'].includes(V.tab)) render(); };
    const G = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Geolocation;
    if (G && isNative()) { G.getCurrentPosition({ enableHighAccuracy: false, timeout: 10000 }).then(p => done(true, p.coords)).catch(() => done(false)); return; }
    try { if (!navigator.geolocation) return done(false); navigator.geolocation.getCurrentPosition(p => done(true, p.coords), () => done(false), { timeout: 10000, maximumAge: 600000 }); } catch (e) { done(false); }
  }
  const otherPlace = () => V.tMode === 'other' && S.templePlace ? S.templePlace : '';
  const mapsSearch = q => otherPlace() ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ' near ' + otherPlace())}` : V.loc ? `https://www.google.com/maps/search/${encodeURIComponent(q)}/@${V.loc.lat},${V.loc.lon},14z` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ' near me')}`;
  const mapsRoute = (q, near = true) => near && otherPlace() ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q + ' near ' + otherPlace())}&travelmode=driving`
    : `https://www.google.com/maps/dir/?api=1${V.loc ? `&origin=${V.loc.lat},${V.loc.lon}` : ''}&destination=${encodeURIComponent(q + (near && !V.loc ? ' near me' : ''))}&travelmode=driving`;
  V.tMode = V.tMode || (S.templePlace ? 'other' : 'near');
  function tLocBox() {
    const TL = Y.tl, other = V.tMode === 'other';
    return `<div class="tloc"><div class="seg sm"><button data-a="tMode" data-v="near" class="${!other ? 'on' : ''}">${pick(TL.near)}</button><button data-a="tMode" data-v="other" class="${other ? 'on' : ''}">${pick(TL.other)}</button></div>
      ${other ? (S.templePlace && !V.tEdit ? `<div class="tplace">📍 ${pick(TL.showing).replace('{p}', `<b>${esc(S.templePlace)}</b>`)} <button class="btn link sm" data-a="tEdit">${pick(TL.change)}</button></div>`
        : `<div class="tsearch"><input id="tPlace" type="search" placeholder="${pick(TL.ph)}" value="${esc(V.tDraft || S.templePlace || '')}" autocomplete="off"><div id="tSug" class="plist placelist" hidden></div><button class="btn primary block" data-a="tSet">🛕 ${pick(TL.set)}</button></div>`)
      : locLine()}</div>`;
  }
  const ext = (href, cls, inner) => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${inner}</a>`;
  const locLine = () => `<div class="locline ${V.locState}">${V.locState === 'busy' ? pick(BH.locWait) : V.locState === 'on' ? pick(BH.locOn) : `${pick(BH.locOff)} <button class="btn link sm" data-a="bhLoc">${pick(BH.locAsk)}</button>`}</div>`;

  function templeCard() {   // shown on the Today screen when the app opens
    const quick = ['shiv', 'hanuman', 'devi', 'gurdwara', 'jain'].map(id => BHAKTI.temples.find(x => x.id === id));
    return `<section class="card temple-card"><div class="tc-head"><span class="tc-ic">${TEMPLE_ICONS('all-hindu')}</span><div><h3>${pick(BH.todayCard)}</h3><p class="muted small">${pick(BH.todaySub)}</p></div></div>
      <div class="chips grid2">${quick.map(x => ext(mapsSearch(x.q), 'chip tchip', `${TEMPLE_ICONS(x.id)} ${pick(x.t)}`)).join('')}<button class="chip more" data-a="tab" data-v="bhakti">${pick(BH.more)} ›</button></div>
      <div class="row2">${ext(mapsSearch('Hindu temple'), 'btn ghost', `🗺️ ${pick(BH.seeMap)}`)}${ext(mapsRoute('Hindu temple'), 'btn primary', `🧭 ${pick(BH.route)}`)}</div>${tLocBox()}</section>`;
  }

  function screenBhakti() {
    if (V.bh.open) return mantraReader(BHAKTI.mantras.find(m => m.id === V.bh.open));
    const seg = `<div class="seg"><button data-a="bhMode" data-v="temples" class="${V.bh.mode === 'temples' ? 'on' : ''}">🛕 ${pick(BH.temples)}</button><button data-a="bhMode" data-v="mantras" class="${V.bh.mode === 'mantras' ? 'on' : ''}">🕉️ ${pick(BH.mantras)}</button></div>`;
    return `<h2 class="ptitle">🙏 ${pick(BH.title)}</h2>${seg}${V.bh.mode === 'temples' ? templesView() : mantrasView()}`;
  }
  function templesView() {
    const g = V.bh.g, list = BHAKTI.temples.filter(x => x.g === g);
    return `${tLocBox()}<div class="seg sm3">${Object.entries(BHAKTI.groups).map(([k, n]) => `<button data-a="bhGroup" data-v="${k}" class="${g === k ? 'on' : ''}">${pick(n)}</button>`).join('')}</div>
      <p class="muted small">${pick(BH.pick)}</p>
      <section class="card tlist">${list.map(x => `<div class="trow-t"><span class="tc-ic sm">${TEMPLE_ICONS(x.id)}</span><b>${pick(x.t)}</b>
        ${ext(mapsSearch(x.q), 'ticon', `<span>🗺️</span><small>${pick(Y.tl.map)}</small>`)}${ext(mapsRoute(x.q), 'ticon go', `<span>🧭</span><small>${pick(Y.tl.route)}</small>`)}</div>`).join('')}</section>
      <h2 class="ptitle sec">🛕 ${pick(BH.famous)}</h2><p class="muted small">${pick(BH.famousSub)}</p>
      <section class="card famous">${C.famous.filter(f => g === 'sikh' ? f[2] === '🪯' : g === 'jain' ? f[2] === '🤲' : g === 'buddh' ? f[2] === '☸️' : !['🪯', '🤲', '☸️'].includes(f[2])).map(f => ext(mapsRoute(f[0], false), 'frow', `<span>${f[2]}</span><b>${L() ? f[1] : f[0]}</b><i>🧭</i>`)).join('')}</section>
      <p class="muted small center">${pick(BH.locNote)}</p>`;
  }
  const mText = m => m.graha ? P_.beej[m.graha] : m.text;
  const mMatch = (m, q) => !q || [m.t[0], m.t[1], m.roman || '', mText(m), m.m[0]].join(' ').toLowerCase().includes(q);
  function mantraList() {
    const q = V.bh.q.trim().toLowerCase(), cat = V.bh.cat;
    const list = BHAKTI.mantras.filter(m => (cat === 'all' || (cat === 'fav' ? favs().includes(m.id) : m.cat.includes(cat))) && mMatch(m, q));
    if (!list.length) return `<p class="muted center">${cat === 'fav' && !q ? pick(BH.noFav) : pick(BH.none)}</p>`;
    return list.map(m => `<button class="card mrow" data-a="bhOpen" data-v="${m.id}"><span class="mi">${m.cat.includes('sikh') ? '🪯' : m.cat.includes('buddh') ? '☸️' : m.cat.includes('jain') ? '🤲' : m.cat.includes('graha') ? '🪐' : m.cat.includes('aarti') ? '🪔' : '🕉️'}</span>
      <span class="mt"><b>${pick(m.t)}</b><small>${esc(mText(m).split('\n').find(x => x.trim() && !/^(दोहा|चौपाई)$/.test(x.trim())).slice(0, 48))}…</small></span>${favs().includes(m.id) ? '<i class="star">★</i>' : ''}<i>›</i></button>`).join('');
  }
  function mantrasView() {
    const r = prediction(active(), 0);
    return `<section class="card hero mfor"><div class="muted small">${pick(BH.forYou)}</div><p class="beej">${r.mantra[0]}</p><p class="muted small">${r.mantra[1]}</p></section>
      <input id="bhQ" class="search" type="search" placeholder="${pick(BH.search)}" value="${esc(V.bh.q)}">
      <div class="chips scroll">${BHAKTI.cats.map(c => `<button class="chip ${V.bh.cat === c[0] ? 'on' : ''}" data-a="bhCat" data-v="${c[0]}">${L() ? c[2] : c[1]}</button>`).join('')}</div>
      <div id="mList">${mantraList()}</div><p class="muted small center">${BHAKTI.mantras.length} ${pick(BH.count)}</p>`;
  }
  function mantraReader(m) {
    const fav = favs().includes(m.id), txt = mText(m), sp = V.speaking === 'm:' + m.id;
    const share = `🙏 ${pick(m.t)}\n\n${txt}\n\n${pick(m.m)}\n\n— ${t('appName')}`;
    return `<button class="btn link" data-a="bhClose">${ICON.left}${t('back')}</button>
      <h2 class="ptitle">🕉️ ${pick(m.t)}</h2>
      <div class="row2 mtools"><button class="btn ${sp ? 'primary' : 'ghost'}" data-a="bhSpeak" data-v="${m.id}">${ICON.speaker}<span>${sp ? pick(BH.stop) : pick(BH.listen)}</span></button>
        <button class="btn ghost" data-a="bhFav" data-v="${m.id}">${fav ? '★ ' + pick(BH.saved) : '☆ ' + pick(BH.save)}</button></div>
      <section class="card mread"><div class="msize">${pick(BH.textSize)} <button data-a="bhSize" data-v="-1">A−</button><button data-a="bhSize" data-v="1">A+</button></div>
        <pre class="mtext" style="font-size:${(1.25 * V.bh.size).toFixed(2)}rem">${esc(txt)}</pre></section>
      ${m.roman && !L() ? `<section class="card"><h3>🔤 ${pick(BH.roman)}</h3><pre class="mroman">${esc(m.roman)}</pre></section>` : ''}
      <section class="card"><h3>📖 ${pick(BH.meaning)}</h3><p>${esc(pick(m.m))}</p><h3>⏰ ${pick(BH.when)}</h3><p>${esc(pick(m.w))}</p></section>
      ${ext('https://wa.me/?text=' + encodeURIComponent(share), 'btn wa block', `${ICON.wa}<span>${pick(BH.share)}</span>`)}`;
  }
  function speakText(id, txt, lang) { if (id == null) { stopSpeech(); render(); return; } say('m:' + id, txt, lang); }
  /* area search shared by the temple place box and the birth place box */
  let locT = 0, locSeq = 0;
  function areaResults(q) {
    const hi = /[\u0900-\u097F]/.test(q), cities = searchPlaces(q).map(r => ({ n: r.n, h: r.h, sub: pick(PLACES_STATES[r.s] || [r.s, r.s]), la: r.la, lo: r.lo, tz: r.s === 'NP' ? 5.75 : 5.5, city: true }));
    if (hi) return Promise.resolve(cities);
    const ap = active(); return LOC.search(q, V.loc ? { lat: V.loc.lat, lon: V.loc.lon } : ap && ap.lat != null ? { lat: ap.lat, lon: ap.lon } : null).then(loc => {
      const seen = new Set(cities.map(c => LOC.norm(c.n)));
      const more = loc.filter(r => !(seen.has(LOC.norm(r.n)) && !r.d)).map(r => ({ n: r.n, sub: LOC.label(r, L()), la: r.la, lo: r.lo, tz: 5.5, osm: r.osm }));
      return cities.slice(0, 3).concat(more).slice(0, 12);
    }).catch(() => cities);
  }
  function areaSuggest(input, box, onShow) {
    clearTimeout(locT); const q = input.value.trim();
    if (q.length < 2) { box.hidden = true; return; }
    const my = ++locSeq; box.hidden = false; box.innerHTML = `<div class="muted small pad">${pick(Y.tl.searching)}</div>`;
    locT = setTimeout(() => areaResults(q).then(res => { if (my !== locSeq || !document.body.contains(box)) return; onShow(res, q); }), 220);
  }
  function bindTPlace() {
    const tp = $('#tPlace'); if (!tp) return;
    tp.oninput = () => { V.tDraft = tp.value; areaSuggest(tp, $('#tSug'), (res, q) => {
      V.tRes = res;
      const sg = $('#tSug'); if (!sg) return; sg.innerHTML = `<button type="button" data-a="tPick" data-v="${esc(q)}" class="typed">🔎 ${pick(Y.tl.useTyped).replace('{q}', esc(q))}</button>` + res.map((r, i) => `<button type="button" data-a="tPickI" data-v="${i}"><b>${esc(r.n)}</b>${r.h ? ` · ${r.h}` : ''}<small>${esc(r.sub)}${r.osm ? ' · 🌐' : ''}</small></button>`).join('') + `<div class="attrib">${pick(Y.tl.attrib)}</div>`; }); };
    tp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); setTPlace(tp.value); } };
  }
  function setTPlace(v) { v = (v || '').trim(); if (v.length < 2) { toast(pick(Y.tl.need)); return; } S.templePlace = v; V.tEdit = false; V.tDraft = ''; persist(); render(); }
  function bindBhakti() {
    const q = $('#bhQ'); if (!q) return;
    q.oninput = () => { V.bh.q = q.value; $('#mList').innerHTML = mantraList(); };
  }

  /* ======================= FREE AI marriage compatibility ======================= */
  const CP = { busy: false, res: null, key: null, err: '' };
  const compatDay = () => new Date().toISOString().slice(0, 10);
  const compatLeft = () => { const c = S.compatUse || {}; return Math.max(0, (CFG.freeCompatPerDay ?? 3) - (c.day === compatDay() ? c.n : 0)); };
  function compatData(r) {
    const side = p => { const ch = chartOf(p), k = kundliSummary(p, ch), pl = n => ch.planets.find(x => x.name === n);
      return { name: p.name, gender: k.gender, age: k.age, lagna: k.lagna, moonSign: k.moonSign, nakshatra: k.nakshatra, planets: k.planets, house7Lord: C.planet[E.SIGN_LORD[(ch.lagnaSign + 6) % 12]][0], venus: k.planets.find(x => x.startsWith('Venus')), jupiter: k.planets.find(x => x.startsWith('Jupiter')), currentDasha: k.currentDasha, nextDashas: k.nextDashas, manglik: k.manglik, manglikCancelled: !!ch.manglik.cancelled, birthTimeKnown: !p.timeUnknown }; };
    return { boy: side(r.boy), girl: side(r.girl), ashtakoota: { total: r.total, outOf: 36, kootas: Object.fromEntries(r.rows.map(x => [x.k, `${x.s}/${x.max}`])), nadiDoshCancelled: !!r.nadiCancel, bhakootDoshCancelled: !!r.bhakootCancel, bothManglik: !!r.manglikBoth } };
  }
  async function compatRun() {
    const r = V.matchRes; if (!r || CP.busy) return;
    const key = r.boy.id + '|' + r.girl.id + '|' + S.lang, cache = (S.compatCache = S.compatCache || {});
    if (cache[key]) { CP.res = cache[key]; CP.key = key; render(); return; }
    if (compatLeft() <= 0) { toast(pick(BH.aiDone)); return; }
    CP.busy = true; CP.err = ''; CP.key = key; render();
    let res = null, err = '';
    try {
      const data = compatData(r);
      if (CFG.apiBase && CFG.apiBase !== 'demo') {
        const x = await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/compat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ data, lang: S.lang, token: S.user && S.user.token }) });
        const j = await x.json(); if (j.ok) res = j.result; else err = j.error === 'daily_limit' ? 'aiDone' : j.error === 'not_configured' ? 'aiNoAI' : 'aiFail';
        if (j.error === 'daily_limit') S.compatUse = { day: compatDay(), n: 99 };
      } else {
        const sample = window.claude && window.claude.use ? await window.claude.use('sample') : null;
        if (!sample) err = 'aiNoAI'; else res = await sample.json(buildCompatPrompt(data, S.lang));
      }
    } catch (e) { console.error(e); err = 'aiFail'; }
    CP.busy = false;
    if (!err && (!res || !res.summary)) err = 'aiFail';
    if (err) { CP.err = err; persist(); render(); return; }
    const c = S.compatUse || {}; S.compatUse = { day: compatDay(), n: (c.day === compatDay() ? c.n : 0) + 1 };
    const ks = Object.keys(cache); if (ks.length > 8) delete cache[ks[0]];
    cache[key] = res; CP.res = res; persist(); render();
    setTimeout(() => { const el = $('#compatRes'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 40);
  }
  function compatHTML() {
    const r = V.matchRes; if (!r) return '';
    const key = r.boy.id + '|' + r.girl.id + '|' + S.lang, res = (S.compatCache || {})[key];
    if (res) { const x = res; return `<section class="card hero" id="compatRes"><div class="freepill">${pick(BH.free)}</div><h3>📜 ${pick(BH.aiTitle)}</h3><div class="score">${st5(x.stars)}<div class="score-l">${esc(x.verdict || '')}</div></div><p class="lead">${esc(x.summary || '')}</p></section>
      ${(x.areas || []).map(a => `<section class="card life"><div class="lh"><h3>${esc(a.title || '')}</h3>${st5(a.stars)}</div><p>${esc(a.text || '')}</p></section>`).join('')}
      ${(x.strengths || []).length ? `<section class="card"><h3>💪 ${pick(BH.strengths)}</h3><ul class="list good">${x.strengths.map(s => `<li>${ICON.check}<span>${esc(s)}</span></li>`).join('')}</ul></section>` : ''}
      ${(x.care || []).length ? `<section class="card"><h3>⚠️ ${pick(BH.care)}</h3><ul class="tips">${x.care.map(s => `<li>${esc(s)}</li>`).join('')}</ul></section>` : ''}
      ${x.timing ? `<section class="card"><h3>🗓️ ${pick(BH.timing)}</h3><p>${esc(x.timing)}</p></section>` : ''}
      ${(x.remedies || []).length ? `<section class="card"><h3>🪔 ${pick(BH.remedies)}</h3><ul class="tips">${x.remedies.map(s => `<li>${esc(s)}</li>`).join('')}</ul></section>` : ''}
      ${x.advice ? `<section class="card center"><p class="lead">💐 ${esc(x.advice)}</p></section>` : ''}
      <a class="btn wa block" href="https://wa.me/?text=${encodeURIComponent(`💞 ${r.boy.name} + ${r.girl.name}: ${r.total}/36\n${x.verdict || ''}\n\n${x.summary || ''}\n\n— ${t('appName')}`)}" target="_blank" rel="noopener">${ICON.wa}<span>${pick(BH.share)}</span></a>
      <p class="muted small center">${pick(BH.aiNote)}</p>`; }
    if (CP.busy && CP.key === key) return `<section class="card center scanning"><div class="spin"></div><p class="lead">${pick(BH.aiWait)}</p></section>`;
    const left = compatLeft();
    return `<section class="card center"><button class="btn primary block" data-a="compatAI" ${left ? '' : 'disabled'}>${pick(BH.aiBtn)}</button>
      <p class="muted small">${left ? pick(BH.aiLeft).replace('{n}', left) : pick(BH.aiDone)}</p>${CP.err ? `<p class="err">${pick(BH[CP.err] || BH.aiFail)}</p>` : ''}</section>`;
  }

  /* ======================= MORE tab, quick tiles ======================= */
  const PREM_TABS = ['aiask', 'report', 'muhurat', 'voice'];
  function quickTiles() {
    return `<div class="qtiles">${X.quick.map(([k, ic, n]) => `<button class="qtile" data-a="tab" data-v="${k}"><span>${ic}</span><b>${pick(n)}</b></button>`).join('')}</div>`;
  }
  function screenMore() {
    return `<h2 class="ptitle">✨ ${pick(X.more.title)}</h2>
      <div class="morelist">${X.more.items.map(([k, ic, n, d, prem]) => `<button class="card mrow more-i" data-a="tab" data-v="${k}"><span class="mi">${ic}</span><span class="mt"><b>${pick(n)}${prem ? ` <span class="premb">👑</span>` : ''}</b><small>${pick(d)}</small></span><i>›</i></button>`).join('')}</div>`;
  }
  const backMore = () => `<button class="btn link" data-a="tab" data-v="more">${ICON.left}${t('back')}</button>`;
  function premLock(icon, title, sub) {
    return `<section class="card center prem-lock"><div class="crown3d sm">👑</div><h3>${icon} ${pick(title)}</h3><p class="muted">${sub}</p><button class="btn gold block" data-a="paywall">👑 ${pick(P_.unlock)}</button></section>`;
  }

  /* ======================= VASTU compass ======================= */
  const VS = { phase: 'idle', heading: null, samples: [], live: false, room: null, src: null, err: '', raf: 0, listen: null, lastDraw: 0 };
  const dirIdx = deg => Math.round(((deg % 360) + 360) % 360 / 45) % 8;
  const circMean = arr => { let s = 0, c = 0; arr.forEach(a => { s += Math.sin(a * Math.PI / 180); c += Math.cos(a * Math.PI / 180); }); return ((Math.atan2(s, c) * 180 / Math.PI) + 360) % 360; };
  function sunPos(date, lat, lon) {   // NOAA low-precision solar position: azimuth (from North, clockwise) and altitude
    const rad = Math.PI / 180, jd = date.getTime() / 86400000 + 2440587.5, n = jd - 2451545;
    const L0 = (280.46 + 0.9856474 * n) % 360, g = (357.528 + 0.9856003 * n) % 360 * rad;
    const lam = (L0 + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad, eps = (23.439 - 0.0000004 * n) * rad;
    const ra = Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)), dec = Math.asin(Math.sin(eps) * Math.sin(lam));
    const gmst = (280.46061837 + 360.98564736629 * n) % 360, H = (gmst + lon) * rad - ra, la = lat * rad;
    const alt = Math.asin(Math.sin(la) * Math.sin(dec) + Math.cos(la) * Math.cos(dec) * Math.cos(H));
    const az = Math.atan2(-Math.sin(H), Math.tan(dec) * Math.cos(la) - Math.sin(la) * Math.cos(H));
    return { az: (az / rad + 360) % 360, alt: alt / rad };
  }
  function stopCompass() { clearInterval(VS.tick); if (VS.listen) { window.removeEventListener('deviceorientationabsolute', VS.listen); window.removeEventListener('deviceorientation', VS.listen); VS.listen = null; } VS.live = false; }
  const circStd = arr => { if (!arr.length) return 99; let sx = 0, cx = 0; arr.forEach(a => { sx += Math.sin(a * Math.PI / 180); cx += Math.cos(a * Math.PI / 180); }); const R = Math.sqrt(sx * sx + cx * cx) / arr.length; return Math.sqrt(-2 * Math.log(Math.max(1e-9, R))) * 180 / Math.PI; };
  async function startCompass() {
    stopCompass(); clearInterval(VS.tick); VS.samples = []; VS.calSamples = []; VS.err = ''; VS.phase = 'calib'; VS.src = null; VS.tilt = 0; VS.t0 = Date.now(); VS.acc = null; VS.spread = null; VS.devAcc = null; render();
    try { if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') { const r = await DeviceOrientationEvent.requestPermission(); if (r !== 'granted') { VS.phase = 'nosensor'; VS.err = 'denied'; render(); return; } } } catch (e) { }
    if (!V.loc) getLocation(true);
    VS.listen = e => {
      let h = null;
      if (typeof e.webkitCompassHeading === 'number') { h = e.webkitCompassHeading; if (typeof e.webkitCompassAccuracy === 'number' && e.webkitCompassAccuracy >= 0) VS.devAcc = e.webkitCompassAccuracy; }
      else if (e.absolute && typeof e.alpha === 'number') h = (360 - e.alpha) % 360;
      if (h == null) return;
      h = (h + ((screen.orientation && screen.orientation.angle) || 0)) % 360;
      const flat = Math.abs(e.beta || 0) < 25 && Math.abs(e.gamma || 0) < 25; VS.flat = flat;
      VS.src = 'sensor'; VS.live = true; VS.heading = h;
      if (VS.phase === 'calib') { VS.calSamples.push(h); VS.tilt = Math.max(VS.tilt, Math.abs(e.beta || 0), Math.abs(e.gamma || 0)); }
      else if (VS.phase === 'steady' && flat) VS.samples.push(h);
      const now = performance.now(); if (now - VS.lastDraw > 80) { VS.lastDraw = now; drawCompass(); }
    };
    if ('ondeviceorientationabsolute' in window) window.addEventListener('deviceorientationabsolute', VS.listen);
    else window.addEventListener('deviceorientation', VS.listen);
    const CAL = 4000, STD = 3000;
    VS.tick = setInterval(() => {
      const el = Date.now() - VS.t0, bar = $('#vprog'), msg = $('#vmsg'), cnt = $('#vcnt');
      if (VS.phase === 'calib') {
        if (el > 2500 && VS.calSamples.length < 3) { clearInterval(VS.tick); stopCompass(); VS.phase = 'nosensor'; render(); return; }
        if (bar) bar.style.width = Math.min(100, el / CAL * 100) + '%'; if (cnt) cnt.textContent = VS.calSamples.length;
        if (el >= CAL) { VS.phase = 'steady'; VS.t0 = Date.now(); render(); }
      } else if (VS.phase === 'steady') {
        if (bar) bar.style.width = Math.min(100, el / STD * 100) + '%'; if (cnt) cnt.textContent = VS.samples.length;
        if (msg) msg.classList.toggle('warn', VS.flat === false);
        if (el >= STD) {
          clearInterval(VS.tick);
          const use = VS.samples.length >= 5 ? VS.samples : VS.calSamples.slice(-15);
          VS.spread = circStd(use.slice(-40)); VS.heading = VS.scanned = circMean(use.slice(-40));
          VS.acc = Math.max(2, Math.round(Math.max(VS.spread * 1.5, VS.devAcc || 0)));
          VS.phase = 'done'; render();
        }
      } else clearInterval(VS.tick);
    }, 120);
  }
  function drawCompass() {   // live update without a full re-render
    const dial = $('#vdial'); if (dial && VS.heading != null) dial.style.transform = `rotate(${-VS.heading}deg)`;
    const lab = $('#vlive'); if (lab && VS.heading != null) { const d = X.dirs[dirIdx(VS.heading)]; lab.textContent = `${pick(d.n)} · ${Math.round(VS.heading)}°`; }
  }
  function dialSVG() {
    const labels = X.dirs.map((d, i) => { const a = i * 45, r = a * Math.PI / 180, R = i % 2 ? 98 : 104, x = 130 + R * Math.sin(r), y = 130 - R * Math.cos(r);
      return `<text x="${x}" y="${y}" class="${i % 2 ? 'dsub' : 'dmain'} ${i === 0 ? 'dnorth' : ''}" transform="rotate(${a} ${x} ${y})">${L() ? (i % 2 ? d.s[1] : d.n[1]) : d.k}</text>`; }).join('');
    const ticks = Array.from({ length: 72 }, (_, i) => { const a = i * 5 * Math.PI / 180, r1 = i % 9 === 0 ? 112 : 118; return `<line x1="${130 + r1 * Math.sin(a)}" y1="${130 - r1 * Math.cos(a)}" x2="${130 + 124 * Math.sin(a)}" y2="${130 - 124 * Math.cos(a)}" class="${i % 9 === 0 ? 'tk1' : 'tk'}"/>`; }).join('');
    const zones = X.dirs.map((d, i) => { const a0 = (i * 45 - 22.5) * Math.PI / 180, a1 = (i * 45 + 22.5) * Math.PI / 180;
      return `<path d="M130 130 L${130 + 86 * Math.sin(a0)} ${130 - 86 * Math.cos(a0)} A86 86 0 0 1 ${130 + 86 * Math.sin(a1)} ${130 - 86 * Math.cos(a1)}Z" class="vz z${i}"/>`; }).join('');
    return `<div class="vwrap"><div class="vpointer">▲</div><svg viewBox="0 0 260 260" class="vsvg"><g id="vdial" style="transform:rotate(${-(VS.heading || 0)}deg)">
      <circle cx="130" cy="130" r="126" class="vring"/>${ticks}${zones}<circle cx="130" cy="130" r="40" class="vcore"/><text x="130" y="138" class="vom">ॐ</text>${labels}</g></svg>${VS.phase === 'steady' ? '<div class="vradar"></div>' : ''}</div>`;
  }
  function screenVastu() {
    const V_ = X.v, p = active(), ch = chartOf(p), pl = place();
    const head = `${backMore()}<h2 class="ptitle">🧭 ${pick(V_.title)}</h2><p class="muted">${pick(V_.sub)}</p>`;
    const room = VS.room ? X.rooms.find(r => r.k === VS.room) : null;
    const roomPick = `<section class="card"><h3>🏠 ${pick(V_.check)}</h3><p class="muted small">${pick(V_.checkSub)}</p>
      <div class="chips grid2">${X.rooms.map(r => `<button class="chip ${VS.room === r.k ? 'on' : ''}" data-a="vRoom" data-v="${r.k}">${r.icon} ${pick(r.n)}</button>`).join('')}</div>
      ${room ? `<div class="vhow">👉 ${pick(room.how)}</div>` : ''}</section>`;
    const loc = V.loc || { lat: pl.lat, lon: pl.lon }, sun = sunPos(new Date(), loc.lat, loc.lon);
    const sunDir = X.dirs[dirIdx(sun.az)];
    const sunCard = `<section class="card small-card"><h3>☀️ ${pick(V_.sunNow)}</h3><p class="small">${sun.alt > 0 ? pick(V_.sunTxt).replace(/\{d\}/g, pick(sunDir.n)).replace('{a}', Math.round(sun.az)).replace('{h}', Math.round(sun.alt)) : pick(V_.sunDown).replace('{d}', pick(X.dirs[2].n))}</p>
      <p class="muted small">📍 ${pick(V_.place)}: ${V.loc ? `${V.loc.lat.toFixed(3)}°, ${V.loc.lon.toFixed(3)}°` : esc(pl.name)}</p></section>`;
    let res = '';
    if (VS.phase === 'done' || VS.phase === 'manual') {
      const i = dirIdx(VS.scanned), d = X.dirs[i];
      res = `<section class="card hero vres"><div class="muted small">${pick(V_.facing)}</div><h2 class="vdir">${pick(d.n)} <small>(${pick(d.s)}) · ${Math.round(VS.scanned)}°</small></h2>
        ${VS.acc != null && VS.phase === 'done' ? (() => { const qi = VS.acc <= 6 ? 0 : VS.acc <= 15 ? 1 : 2; return `<div class="vacc q${qi}"><span>🎯 ${pick(Y.vc.acc)}: <b>±${VS.acc}°</b> · ${pick(Y.vc.q[qi])}</span><span>🧲 ${pick(Y.vc.field)}: <b>${pick(qi < 2 ? Y.vc.stable : Y.vc.unstable)}</b></span></div>`; })() : ''}
        ${VS.live ? `<div class="pill">${pick(V_.live)}: <b id="vlive">${pick(d.n)} · ${Math.round(VS.heading)}°</b></div>` : ''}</section>`;
      if (room) {
        const rt = room.r[i], best = room.r.map((x, j) => x === 3 ? pick(X.dirs[j].n) : null).filter(Boolean).join(', ');
        res += `<section class="card vroom r${rt}"><h3>${room.icon} ${pick(room.n)}: ${pick(d.n)}</h3><div class="vrate r${rt}">${['⚠️', '🙂', '👍', '🌟'][rt]} ${pick(X.rate[rt])}</div><p>${pick(X.rateTxt[rt])}</p>
          ${room.note ? `<p class="muted small">${pick(room.note)}</p>` : ''}<p class="small"><b>${pick(V_.idealDirs)}:</b> ${best}</p>
          ${rt < 2 ? `<h3>🪔 ${pick(V_.remedies)}</h3><ul class="tips">${X.remedy[d.k].map(x => `<li>${pick(x)}</li>`).join('')}</ul>` : ''}
          <button class="btn ghost block" data-a="vSave">💾 ${pick(V_.saveHome)}</button></section>`;
      }
      const goodRooms = X.rooms.filter(r => r.r[i] === 3 && !r.facing).map(r => pick(r.n)), badRooms = X.rooms.filter(r => r.r[i] === 0 && !r.facing).map(r => pick(r.n));
      res += `<section class="card"><h3>📖 ${pick(V_.meaning)}: ${pick(d.n)}</h3><p>${pick(d.means)}</p>
        <div class="vfacts"><div><small>${pick(V_.deity)}</small><b>${pick(d.god)}</b></div><div><small>${pick(V_.planet)}</small><b>${pName(d.pl)}</b></div><div><small>${pick(V_.element)}</small><b>${pick(d.el)}</b></div><div><small>${pick(V_.colours)}</small><b>${pick(d.col)}</b></div></div>
        ${goodRooms.length ? `<p class="small">✅ <b>${pick(V_.bestFor)}:</b> ${goodRooms.join(', ')}</p>` : ''}${badRooms.length ? `<p class="small">⛔ <b>${pick(V_.avoidFor)}:</b> ${badRooms.join(', ')}</p>` : ''}</section>`;
    }
    const busy = VS.phase === 'calib' || VS.phase === 'steady', VC = Y.vc, stepI = VS.phase === 'calib' ? 0 : VS.phase === 'steady' ? 1 : VS.phase === 'done' ? 2 : -1;
    const steps = `<div class="vsteps">${VC.steps.map((x, k) => `<span class="${k < stepI || (VS.phase === 'done') ? 'ok' : k === stepI ? 'on' : ''}"><i>${k < stepI || VS.phase === 'done' ? '✓' : k + 1}</i>${pick(x)}</span>`).join('<b></b>')}</div>`;
    const prog = busy ? `<div class="vbusy">${VS.phase === 'calib' ? `<div class="inf"><svg viewBox="0 0 120 50"><path d="M60 25c-12-16-40-16-40 0s28 16 40 0 40-16 40 0-28 16-40 0" class="infp"/></svg><span class="infd">📱</span></div>` : ''}
      <p id="vmsg" class="vmsg">${pick(VS.phase === 'calib' ? VC.calib : VC.steady)}${VS.phase === 'steady' ? `<span class="flatw"> · ${pick(VC.flat)}</span>` : ''}</p>
      <div class="vbar"><i id="vprog"></i></div><p class="muted small"><b id="vcnt">0</b> ${pick(VC.samples)}</p></div>` : '';
    const scanBtn = busy ? '' : `<button class="btn primary block bigcta" data-a="vScan">🧭 ${VS.phase === 'done' || VS.phase === 'manual' ? pick(V_.rescan) : pick(V_.scan)}</button>`;
    const manual = (VS.phase === 'nosensor' || VS.phase === 'manual') ? `<section class="card"><p class="small">${pick(V_.noSensor)}</p><h3>${pick(V_.pickDir)}</h3>
      <div class="vgrid">${[7, 0, 1, 6, -1, 2, 5, 4, 3].map(j => j < 0 ? '<span class="vgc">🧭</span>' : `<button class="vgb ${VS.phase === 'manual' && dirIdx(VS.scanned) === j ? 'on' : ''}" data-a="vPick" data-v="${j}">${pick(X.dirs[j].n)}</button>`).join('')}</div></section>` : '';
    const mine = X.dirs[X.rashiDir[ch.moonSign]], wd = new Date().getDay(), shool = X.dirs[X.dishaShool[wd]];
    const forYou = `<section class="card"><h3>🙏 ${pick(V_.forYou)}: ${esc(p.name.split(' ')[0])}</h3>
      <div class="yoga"><b>⭐ ${pick(V_.lucky).replace('{r}', pick(C.rashiShort[ch.moonSign]))}: ${pick(mine.n)}</b><p class="small">${pick(V_.luckyTxt).replace('{d}', pick(mine.n))}</p></div>
      <div class="yoga"><b>🚫 ${pick(V_.shool)}: ${pick(shool.n)}</b><p class="small">${pick(V_.shoolTxt).replace('{w}', pick(C.wd[wd])).replace('{d}', pick(shool.n)).replace('{f}', pick(V_.shoolFood[wd]))}</p></div></section>`;
    const hm = (S.vastuMap || {}), keys = Object.keys(hm);
    const map = `<section class="card"><h3>🗺️ ${pick(V_.homeMap)}</h3>${keys.length ? (() => { const sc = Math.round(keys.reduce((a, k) => a + X.rooms.find(r => r.k === k).r[hm[k]], 0) / (keys.length * 3) * 100);
      return `<div class="vscore"><b>${sc}%</b><span>${pick(V_.score)}</span></div>${keys.map(k => { const r = X.rooms.find(x => x.k === k), rt = r.r[hm[k]]; return `<div class="area"><span>${r.icon} ${pick(r.n)}</span><b class="vrate r${rt}">${pick(X.dirs[hm[k]].n)} · ${pick(X.rate[rt])}</b></div>`; }).join('')}
      <button class="btn link" data-a="vClear">${pick(V_.clear)}</button>`; })() : `<p class="muted small">${pick(V_.homeEmpty)}</p>`}</section>`;
    return `${head}${roomPick}<section class="card center vcard">${steps}${dialSVG()}${prog}${scanBtn}${VS.err ? `<p class="err">${pick(V_[VS.err])}</p>` : ''}${busy ? '' : `<p class="muted small">${pick(V_.calib)}</p>`}</section>
      ${manual}${res}${sunCard}${forYou}${map}${vastuChecklist()}<p class="muted small center">${pick(V_.disclaimer)}</p>`;
  }

  /* ======================= MUHURAT finder ======================= */
  const MU = { ev: 'vivah' };
  function muhuratList(evk, p) {
    const ev = X.events.find(e => e.k === evk), pl = place(), ch = chartOf(p), out = [], notes = {};
    const t0 = todayYMD(), base = Date.UTC(t0.y, t0.m - 1, t0.d);
    for (let i = 1; i <= 92; i++) {
      const dt = new Date(base + i * 86400000), y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate();
      const pc = E.dayPanchang(y, m, d, pl.lat, pl.lon, pl.tz), ti = pc.tithi, tf = ti % 15;
      if (ev.noKharmas && (pc.sunSign === 8 || pc.sunSign === 11)) { if (!notes.kharmas) notes.kharmas = { a: { y, m, d } }; notes.kharmas.b = { y, m, d }; continue; }
      if (ev.noCombust) { const sp = E.sidereal(pc.sunrise); const gap = n => { const g = Math.abs(sp[n] - sp.Sun) % 360; return Math.min(g, 360 - g); };
        const cb = ev.noCombust.find(n => gap(n) < (n === 'Jupiter' ? 11 : 10)); if (cb) { notes.combust = { p: cb, y, m, d }; continue; } }
      if (ti === 29 || [3, 8, 13].includes(tf)) continue;          // Amavasya and Rikta tithis
      if (!ev.nak.includes(pc.nak) || !ev.wd.includes(pc.wd)) continue;
      const tara = ((pc.nak - ch.moonNak + 27) % 27) % 9, house = ((pc.moonSign - ch.moonSign + 12) % 12) + 1;
      if ([2, 4, 6].includes(tara) || [4, 8, 12].includes(house)) continue;   // bad Tara / Chandra for this person
      const why = [pick(C.nak[pc.nak]), pick(ti === 14 ? C.tithi[14] : C.tithi[tf])];
      let sc = 3; if (ti < 15) { sc++; why.push(pick(X.m.shukla)); } if ([1, 3, 5, 7, 8].includes(tara)) { sc += 0.5; why.push(pick(X.m.taraGood)); } if ([3, 6, 10, 11].includes(house)) { sc += 0.5; why.push(pick(X.m.chandraGood)); }
      out.push({ y, m, d, wd: pc.wd, sc: Math.min(5, Math.round(sc)), why, pc });
    }
    return { list: out, notes, ev };
  }
  function screenMuhurat() {
    const p = active(), M_ = X.m;
    const { list: all, notes, ev } = muhuratList(MU.ev, p), tz = place().tz;
    const full = hasItem('muhurat', MU.ev), list = full ? all : all.slice(0, 1);
    const fd = o => fmtDate(o.y, o.m, o.d, false);
    return `${backMore()}<h2 class="ptitle">🗓️ ${pick(M_.title)}</h2><p class="muted small">${pick(M_.sub)}</p>
      <section class="card"><h3>${pick(M_.pick)}</h3><div class="chips grid2">${X.events.map(e => `<button class="chip ${MU.ev === e.k ? 'on' : ''}" data-a="muEv" data-v="${e.k}">${e.icon} ${pick(e.n)}</button>`).join('')}</div>
      ${profilePicker()}<p class="muted small">${pick(M_.forWho)}: <b>${esc(p.name)}</b> · ${t('rashi')} ${pick(C.rashiShort[chartOf(p).moonSign])}</p></section>
      ${notes.kharmas ? `<p class="pill bad">${pick(M_.kharmas).replace('{a}', fd(notes.kharmas.a)).replace('{b}', fd(notes.kharmas.b))}</p>` : ''}
      ${notes.combust ? `<p class="pill bad">${pick(M_.combust).replace('{p}', pName(notes.combust.p)).replace('{d}', fd(notes.combust))}</p>` : ''}
      <h2 class="ptitle sec">${ev.icon} ${pick(M_.best)}</h2>
      ${list.length ? list.map(x => `<section class="card mu-row"><div class="sdate"><b>${x.d}</b><span>${pick(C.months[x.m - 1]).slice(0, L() ? 6 : 3)}</span></div>
        <div class="mu-b"><div class="lh"><b>${pick(C.wd[x.wd])}</b>${stars(x.sc)}</div><p class="small">${x.why.join(' · ')}</p>
        <p class="small">⏰ ${pick(M_.abhijit)}: <b>${fmtTime(x.pc.abhijit.start, tz)} – ${fmtTime(x.pc.abhijit.end, tz)}</b><br>🚫 ${pick(M_.avoid)}: ${fmtTime(x.pc.rahu.start, tz)} – ${fmtTime(x.pc.rahu.end, tz)}</p></div></section>`).join('')
        : `<section class="card"><p>${pick(M_.none)}</p></section>`}
      ${!full && all.length > 1 ? `<p class="muted small center">${g('muFree')}</p>` + unlockBox('muhurat', MU.ev, `${ev.icon} ${pick(GT.muMore).replace('{n}', all.length - 1)}`) : ''}
      <p class="muted small center">${pick(M_.note)}</p>`;
  }

  /* ======================= AI Jyotishi + AI Life Report ======================= */
  const AQ = { busy: false, err: '' };
  const aiStore = () => (S.aiChats = S.aiChats || {});
  async function aiCall(kind, payload) {   // kind: 'ask' | 'report'
    if (CFG.apiBase && CFG.apiBase !== 'demo') {
      const r = await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/' + kind, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...payload, lang: S.lang, token: S.user && S.user.token }) });
      const j = await r.json(); if (!j.ok) { const e = new Error(j.error); e.code = j.error; throw e; } return j.result;
    }
    const sample = window.claude && window.claude.use ? await window.claude.use('sample') : null;
    if (!sample) { const e = new Error('no_ai'); e.code = 'no_ai'; throw e; }
    const prompt = kind === 'ask' ? buildAskPrompt(payload.kundli, payload.history, payload.question, S.lang) : buildReportPrompt(payload.kundli, S.lang);
    return sample.json(prompt, kind === 'report' ? { modelTier: 'complex' } : {});
  }
  function screenAiAsk() {
    const p = active(), A = X.ai;
    if (!isPremium()) return `${backMore()}<h2 class="ptitle">📜 ${pick(A.title)}</h2>${premLock('📜', A.title, pick(A.sub).replace('{n}', esc(p.name)))}`;
    const msgs = aiStore()[p.id] || [];
    return `${backMore()}<h2 class="ptitle">📜 ${pick(A.title)}</h2>${profilePicker()}<p class="muted small">${pick(A.sub).replace('{n}', esc(p.name))}</p>
      <div class="aichat">${msgs.map(m => `<div class="msg ${m.me ? 'me' : 'bot'}">${m.me ? esc(m.t) : esc(m.t).replace(/\n/g, '<br>')}${m.f && m.f.length ? `<div class="mchips">${m.f.map(f => `<button data-a="aiQ" data-v="${esc(f)}">${esc(f)}</button>`).join('')}</div>` : ''}</div>`).join('')}
        ${AQ.busy ? `<div class="msg bot typing"><i></i><i></i><i></i> <small>${pick(A.thinking)}</small></div>` : ''}</div>
      ${AQ.err ? `<p class="err">${pick(A[AQ.err] || A.fail)}</p>` : ''}
      ${!msgs.length ? `<div class="chips">${A.sugg.map(s => `<button class="chip" data-a="aiQ" data-v="${esc(pick(s))}">${esc(pick(s))}</button>`).join('')}</div>` : ''}
      <form id="aiForm" class="chat-in big"><input id="aiInput" placeholder="${pick(A.ph)}" autocomplete="off" maxlength="300"><button class="send" aria-label="${pick(A.ask)}" ${AQ.busy ? 'disabled' : ''}>${ICON.right}</button></form>
      ${msgs.length ? `<button class="btn link" data-a="aiClear">${pick(A.clear)}</button>` : ''}<p class="muted small center">${pick(A.note)}</p>`;
  }
  async function aiAsk(q) {
    q = (q || '').trim(); if (!q || AQ.busy) return;
    const p = active(), st = aiStore(), msgs = (st[p.id] = st[p.id] || []);
    msgs.push({ me: true, t: q }); AQ.busy = true; AQ.err = ''; render(); scrollAi();
    try {
      const r = await aiCall('ask', { kundli: kundliSummary(p, chartOf(p)), history: msgs.slice(-7, -1).map(m => (m.me ? 'Q: ' : 'A: ') + m.t.slice(0, 400)), question: q });
      msgs.push({ me: false, t: String(r.answer || ''), f: (r.followups || []).slice(0, 3) });
      if (msgs.length > 30) msgs.splice(0, msgs.length - 30);
    } catch (e) { msgs.pop(); AQ.err = e.code === 'daily_limit' ? 'limit' : 'fail'; if (e.code === 'premium_required') { S.serverPremium = false; paywall(); } }
    AQ.busy = false; persist(); render(); scrollAi();
  }
  const scrollAi = () => setTimeout(() => { const m = document.querySelectorAll('.aichat .msg'); if (m.length) m[m.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 40);
  const RP = { busy: false, err: '' };
  const reports = () => (S.reports = S.reports || {});
  function reportBody(rep) {
    const r = rep.r;
    return `${(r.chapters || []).map(c => `<section class="card"><h3>${esc(c.icon || '✨')} ${esc(c.title || '')}</h3>${String(c.text || '').split(/\n+/).map(x => `<p>${esc(x)}</p>`).join('')}</section>`).join('')}
      ${(r.years || []).length ? `<section class="card"><h3>🗓️ ${pick(X.rep.years)}</h3>${r.years.map(y => `<div class="trow g"><div class="tdate">${esc(y.year)}</div><div>${esc(y.text)}</div></div>`).join('')}</section>` : ''}
      ${(r.remedies || []).length ? `<section class="card"><h3>🪔 ${pick(X.rep.remedies)}</h3><ul class="tips">${r.remedies.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>` : ''}`;
  }
  function screenReport() {
    const p = active(), R_ = X.rep, rep = reports()[p.id];
    if (!isPremium()) return `${backMore()}<h2 class="ptitle">📜 ${pick(R_.title)}</h2>${premLock('📜', R_.title, pick(R_.sub).replace('{n}', esc(p.name)))}`;
    const fresh = rep && Date.now() - rep.at < 28 * 86400e3;
    return `${backMore()}<h2 class="ptitle">📜 ${pick(R_.title)}</h2>${profilePicker()}<p class="muted small">${pick(R_.sub).replace('{n}', esc(p.name))}</p>
      ${RP.busy ? `<section class="card center scanning"><div class="spin"></div><p class="lead">${pick(R_.wait)}</p></section>` : ''}
      ${RP.err ? `<p class="err">${pick(R_.fail)}</p>` : ''}
      ${rep ? `<section class="card hero"><h3>🔮 ${esc(rep.r.title || p.name)}</h3><p class="lead">${esc(rep.r.summary || '')}</p><p class="muted small">${pick(R_.made)}: ${new Date(rep.at).toLocaleDateString(L() ? 'hi-IN' : 'en-IN')}</p>
        <button class="btn gold block" data-a="pdf">📄 ${pick(R_.pdf)}</button></section>${reportBody(rep)}` : ''}
      ${RP.busy ? '' : `<button class="btn primary block" data-a="repMake" ${fresh ? 'disabled' : ''}>📜 ${pick(rep ? R_.again : R_.make)}</button>${fresh ? `<p class="muted small center">${pick(R_.monthly)}</p>` : ''}`}`;
  }
  async function makeReport() {
    const p = active(); if (RP.busy) return;
    RP.busy = true; RP.err = ''; render(); window.scrollTo(0, 0);
    try { const r = await aiCall('report', { kundli: kundliSummary(p, chartOf(p)) }); if (!r || !r.chapters) throw new Error('bad'); reports()[p.id] = { at: Date.now(), r }; }
    catch (e) { RP.err = 'fail'; if (e.code === 'premium_required') paywall(); }
    RP.busy = false; persist(); render();
  }
  function reportPdfHTML(p) {
    const rep = reports()[p.id]; if (!rep) return '';
    return `<div class="pdf-block"><h2>📜 ${pick(X.rep.title)}</h2><p>${esc(rep.r.summary || '')}</p></div>` + (rep.r.chapters || []).map(c => `<div class="pdf-block pdf-area"><h3>${esc(c.icon || '')} ${esc(c.title || '')}</h3>${String(c.text || '').split(/\n+/).map(x => `<p>${esc(x)}</p>`).join('')}</div>`).join('')
      + ((rep.r.years || []).length ? `<div class="pdf-block"><h3>🗓️ ${pick(X.rep.years)}</h3>${rep.r.years.map(y => `<p><b>${esc(y.year)}:</b> ${esc(y.text)}</p>`).join('')}</div>` : '');
  }

  /* ======================= Daily voice guidance ======================= */
  function voiceScript(p) {
    const r = prediction(p, 0), ch = r.ch, now = jdNow(), md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0];
    const wd = new Date().getDay(), shool = X.dirs[X.dishaShool[wd]], mine = X.dirs[X.rashiDir[ch.moonSign]];
    const h = new Date().getHours(), greet = L() ? (h < 12 ? 'सुप्रभात' : h < 17 ? 'नमस्कार' : 'शुभ संध्या') : (h < 12 ? 'Good morning' : h < 17 ? 'Namaste' : 'Good evening');
    const sp = E.specialDays(r.dt.y, r.dt.m, r.dt.d, r.pl.lat, r.pl.lon, r.pl.tz, 3)[0];
    return L() ? [
      `${greet} ${p.name.split(' ')[0]} जी।`, `आज ${fmtDate(r.dt.y, r.dt.m, r.dt.d, true)} है।`,
      `आज का दिन: ${pick(C.dayLabel[r.score])}।`, pick(C.houseMsg[r.dy.house - 1]),
      `आज ${r.dos.map(pick).join(', ')}।`, `ध्यान रखें: ${r.donts.map(pick).join(', ')}।`,
      `आज का शुभ रंग ${pick(r.lucky)} और शुभ अंक ${r.luckyNum} है।`,
      `राहु काल ${fmtTime(r.pc.rahu.start, r.pl.tz)} से ${fmtTime(r.pc.rahu.end, r.pl.tz)} तक है, इस समय नया काम शुरू न करें।`,
      `आज ${pick(shool.n)} दिशा में यात्रा टालें। आपकी शुभ दिशा ${pick(mine.n)} है।`,
      `आप अभी ${pName(md.lord)} की महादशा में हैं।`, sp && sp.i === 0 ? `आज ${pick(T[sp.type] || [sp.type, sp.type])} है।` : '',
      `आज का मंत्र है: ${r.mantra[0]}। इसे ग्यारह बार जपें।`, `आपका दिन शुभ हो।`
    ].filter(Boolean).join(' ') : [
      `${greet} ${p.name.split(' ')[0]} ji.`, `Today is ${fmtDate(r.dt.y, r.dt.m, r.dt.d, true)}.`,
      `Today will be: ${pick(C.dayLabel[r.score])}.`, pick(C.houseMsg[r.dy.house - 1]),
      `Good to do today: ${r.dos.map(pick).join(', ')}.`, `Please avoid: ${r.donts.map(pick).join(', ')}.`,
      `Your lucky colour is ${pick(r.lucky)} and lucky number is ${r.luckyNum}.`,
      `Rahu Kaal is from ${fmtTime(r.pc.rahu.start, r.pl.tz)} to ${fmtTime(r.pc.rahu.end, r.pl.tz)}. Do not start new work then.`,
      `Avoid starting a journey to the ${pick(shool.n)} today. Your lucky direction is ${pick(mine.n)}.`,
      `You are in the Mahadasha of ${pName(md.lord)}.`,
      `Today's mantra is ${r.mantra[1]}. Chant it eleven times.`, `Have a blessed day.`
    ].join(' ');
  }
  function screenVoice() {
    const p = active(), VO = X.voice;
    if (!isPremium()) return `${backMore()}<h2 class="ptitle">🎙️ ${pick(VO.title)}</h2>${premLock('🎙️', VO.title, pick(VO.sub).replace('{n}', esc(p.name)))}`;
    const sp = V.speaking === 'm:voice', txt = voiceScript(p);
    return `${backMore()}<h2 class="ptitle">🎙️ ${pick(VO.title)}</h2>${profilePicker()}<p class="muted small">${pick(VO.sub).replace('{n}', esc(p.name))}</p>
      <section class="card center voice-card"><div class="voice-orb ${sp ? 'on' : ''}">🎙️</div>
      <button class="btn ${sp ? 'ghost' : 'primary'} block bigcta" data-a="voicePlay">${ICON.speaker}<span>${sp ? pick(VO.stop) : pick(VO.play)}</span></button><p class="muted small">${pick(VO.tip)}</p></section>
      <section class="card"><p class="voice-txt">${esc(txt)}</p></section>`;
  }

  /* ======================= ROUND 5: family switcher, details, chart, TTS, plans ======================= */
  /* ---- family switcher (header) ---- */
  const initials = n => (n || '?').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  function whoChip() {
    const p = active(); if (!p) return '';
    return `<button class="whobtn" data-a="whoOpen" aria-label="${pick(Y.who.title)}"><span class="av av-${S.profiles.indexOf(p) % 6}">${esc(initials(p.name))}</span><span class="wn">${esc(p.name.split(' ')[0])}</span><span class="wc">▾</span></button>`;
  }
  function whoSheet() {
    const d = document.createElement('div'); d.className = 'sheet-bg';
    const cur = active(), lim = famLimit();
    d.innerHTML = `<div class="sheet"><div class="grab"></div><h2>${pick(Y.who.title)}</h2><p class="muted small">${pick(Y.who.sub)}</p>
      <div class="wholist">${S.profiles.map((p, i) => { const ch = chartOf(p); return `<button class="whorow ${p.id === cur.id ? 'on' : ''}" data-x="pick" data-v="${p.id}"><span class="av av-${i % 6}">${esc(initials(p.name))}</span>
        <span class="wt"><b>${esc(p.name)}</b><small>${pick(C.relations[+p.rel] || C.relations[0])} · ${t('rashi')} ${pick(C.rashiShort[ch.moonSign])}</small></span>${p.id === cur.id ? '<i>✓</i>' : ''}</button>`; }).join('')}</div>
      ${isPremium() ? '' : `<p class="muted small center">${pick(Y.who.left).replace('{n}', S.profiles.length).replace('{m}', lim)}</p>`}
      <div class="row2"><button class="btn primary" data-x="add">➕ ${pick(Y.who.add)}${familyFull() ? ' 🔒' : ''}</button><button class="btn ghost" data-x="manage">${pick(Y.who.manage)}</button></div>
      <button class="btn link block" data-x="close">${pick(Y.who.close)}</button></div>`;
    const close = () => { d.classList.add('out'); setTimeout(() => d.remove(), 250); };
    d.onclick = e => {
      const x = e.target.closest('[data-x]'); if (e.target === d) return close(); if (!x) return;
      if (x.dataset.x === 'close') close();
      if (x.dataset.x === 'pick') { close(); switchTo(x.dataset.v); }
      if (x.dataset.x === 'add') { close(); if (familyFull()) { toast(pick(Y.fam.full).replace('{n}', famLimit())); paywall(); } else { V.tab = 'family'; V.sub = 'form'; V.editId = null; V.formPlaceFor = null; ANIM = true; render(); window.scrollTo(0, 0); } }
      if (x.dataset.x === 'manage') { close(); V.tab = 'family'; V.sub = null; ANIM = true; render(); window.scrollTo(0, 0); }
    };
    document.body.appendChild(d);
  }
  function switchTo(id) {
    if (id === S.activeId) return;
    S.activeId = id; persist();
    V.matchRes = null; V.matchBoy = V.matchGirl = null; PV.left = PV.right = null; PV.bad = {}; PV.q = {}; PV.err = ''; PV.phase = 'capture'; AQ.err = ''; RP.err = ''; VS.phase = ['calib', 'steady'].includes(VS.phase) ? VS.phase : 'idle';
    if (V.speaking) stopSpeech();
    ANIM = true; render(); toast('✓ ' + pick(Y.who.switched).replace('{n}', active().name.split(' ')[0]));
  }

  /* ---- detailed life-area reading ---- */
  function areaDetail(ch, a, now) {
    const P = n => ch.planets.find(x => x.name === n), lordOf = h => E.SIGN_LORD[(ch.lagnaSign + h - 1) % 12], D = Y.d, hi = L();
    const ord = h => D.ord(h, hi), digTxt = x => pick(Y.dig[x.dignity || 'neutral']) + (hi ? '।' : '.') + (x.combust ? ' ' + pick(Y.dig.combust) : '') + (x.retro && !['Rahu', 'Ketu'].includes(x.name) ? ' ' + pick(Y.dig.retro) : '');
    const chart = [];
    a.h.forEach(h => {
      const lord = lordOf(h), lp = P(lord);
      chart.push(pick(D.lordIs).replace(/\{h\}/, ord(h)).replace('{m}', pick(Y.house[h - 1])).replace('{p}', pName(lord)).replace('{h2}', ord(lp.house)).replace('{m2}', pick(Y.house[lp.house - 1])));
      chart.push(pick(Y.placeTxt[Y.placeKind(lp.house)]));
      chart.push(pick(D.isNow).replace('{p}', pName(lord)).replace('{d}', digTxt(lp)));
    });
    const inside = ch.planets.filter(x => a.h.includes(x.house));
    chart.push(inside.length ? pick(D.inside).replace('{l}', inside.map(x => pName(x.name)).join(', ')) : pick(D.none));
    const mh = a.h[a.h.length - 1], asp = n => { const x = P(n); return x.house !== mh && x.aspects.includes(mh); };
    if (asp('Jupiter')) chart.push(pick(D.jupAsp)); if (asp('Saturn')) chart.push(pick(D.satAsp)); if (asp('Mars')) chart.push(pick(D.marsAsp));
    if (a.kar && !a.h.map(lordOf).includes(a.kar)) chart.push(pick(D.karaka).replace('{p}', pName(a.kar)).replace('{d}', digTxt(P(a.kar))));
    const md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0], ad = md.sub.find(x => x.start <= now && x.end > now) || md.sub[0];
    const lords = a.h.map(lordOf).concat(a.kar ? [a.kar] : []);
    const when = [pick(D.nowDasha).replace('{md}', pName(md.lord)).replace('{ad}', pName(ad.lord)).replace('{e}', fmtMonthYear(ad.end)), pick(lords.includes(md.lord) || lords.includes(ad.lord) ? D.dashaGood : D.dashaOther)];
    if (a.period) when.push(pick(D.nextGood).replace('{s}', fmtMonthYear(a.period.start)).replace('{e}', fmtMonthYear(a.period.end)).replace('{p}', pName(a.period.md) + ' / ' + pName(a.period.lord)));
    const tips = ((Y.tips[a.k] || {})[a.lvl] || Y.tipsGeneric[a.lvl]).map(pick);
    const weakest = [...new Set(lords)].map(P).sort((x, y) => planetStrength(x) - planetStrength(y))[0];
    return `<details class="more"><summary><span data-less="${pick(Y.less)}">${pick(Y.more)}</span><i>⌄</i></summary><div class="more-b">
      <h4>🔭 ${pick(D.chart)}</h4>${chart.map(x => `<p>${x}</p>`).join('')}
      <h4>🗓️ ${pick(D.when)}</h4>${when.map(x => `<p>${x}</p>`).join('')}
      <h4>✅ ${pick(D.todo)}</h4><ul class="list good">${tips.map(x => `<li>${ICON.check}<span>${x}</span></li>`).join('')}</ul>
      <h4>🪔 ${pick(D.rem)} (${pName(weakest.name)})</h4><p>${pick(C.life.remedies[weakest.name])}</p></div></details>`;
  }

  /* ---- planet table (more data) ---- */
  function planetTable(ch) {
    const T_ = Y.ptable;
    const st = x => [x.dignity && ['ex', 'own', 'deb'].includes(x.dignity) ? `<b class="tg ${x.dignity}">${pick(T_[x.dignity])}</b>` : x.dignity ? `<span class="tg">${pick(T_[x.dignity])}</span>` : '',
      x.retro && !['Rahu', 'Ketu'].includes(x.name) ? `<span class="tg r">${pick(T_.retro)}</span>` : '', x.combust ? `<span class="tg c">${pick(T_.combust)}</span>` : '', x.vargottama ? `<span class="tg v">${pick(T_.varg)}</span>` : ''].join('');
    const dms = d => `${Math.floor(d)}°${pad(Math.floor((d % 1) * 60))}′`;
    const lag = ch.timeUnknown ? '' : `<div class="ptr"><span class="pdot" style="background:#7B1E2B">${L() ? 'ल' : 'As'}</span><div class="ptm"><b>${t('lagna')}</b><span class="pts">${pick(C.rashiShort[ch.lagnaSign])} ${dms(ch.lagna % 30)}</span><small>${pick(C.nak[ch.lagnaNak.n])} ${t('pada')} ${ch.lagnaNak.pada} · D9 ${pick(C.rashiShort[ch.lagnaD9])}</small></div></div>`;
    return `<section class="card ptab"><h3>🪐 ${pick(T_.title)}</h3><div class="ptrows">${lag}${ch.planets.map(x => `<div class="ptr">
      <span class="pdot" style="background:${Y.pColor[x.name]}">${pick(C.pAbbr[x.name])}</span>
      <div class="ptm"><b>${pName(x.name)}</b><span class="pts">${pick(C.rashiShort[x.sign])} ${dms(x.deg)}</span><small>${pick(T_.h)} ${x.house} · ${pick(C.nak[x.nak])} ${t('pada')} ${x.pada} · D9 ${pick(C.rashiShort[x.d9])}</small><div>${st(x)}</div></div></div>`).join('')}</div></section>`;
  }

  /* ---- 3D North-Indian chart ---- */
  const HOUSE_POLY = ['200,8 296,104 200,200 104,104', '8,8 200,8 104,104', '8,8 104,104 8,200', '8,200 104,104 200,200 104,296', '8,200 104,296 8,392', '8,392 104,296 200,392', '200,392 104,296 200,200 296,296', '200,392 296,296 392,392', '392,392 296,296 392,200', '392,200 296,296 200,200 296,104', '392,200 296,104 392,8', '392,8 296,104 200,8'];
  function chart3D(ch, mode) {
    const d9 = mode === 'd9', psign = pl => d9 ? pl.d9 : pl.sign;
    const asc = mode === 'lagna' ? ch.lagnaSign : d9 ? (ch.timeUnknown ? ch.planets[1].d9 : ch.lagnaD9) : ch.moonSign;
    const centers = [[200, 100], [104, 44], [44, 104], [104, 200], [44, 296], [104, 356], [200, 300], [296, 356], [356, 296], [296, 200], [356, 104], [296, 44]];
    const signPos = [[200, 182], [104, 90], [90, 104], [182, 200], [90, 296], [104, 310], [200, 218], [296, 310], [310, 296], [218, 200], [310, 104], [296, 90]];
    const byH = Array.from({ length: 12 }, () => []);
    ch.planets.forEach(pl => byH[(psign(pl) - asc + 12) % 12].push(pl));
    let polys = '', txt = '';
    HOUSE_POLY.forEach((pts, h) => { polys += `<polygon points="${pts}" class="hp ${h === 0 ? 'h1' : [3, 6, 9].includes(h) ? 'hk' : 'ho'}"/>`; });
    byH.forEach((items, h) => {
      const kite = [0, 3, 6, 9].includes(h), per = kite ? 3 : 2, [cx, cy] = centers[h], lh = 30;
      const rows = []; for (let i = 0; i < items.length; i += per) rows.push(items.slice(i, i + per));
      const y0 = cy - (rows.length - 1) * lh / 2 + (kite ? -6 : 0);
      rows.forEach((row, ri) => { const w = 47, x0 = cx - (row.length - 1) * w / 2;
        row.forEach((pl, j) => { const x = x0 + j * w, y = y0 + ri * lh, ab = pick(C.pAbbr[pl.name]) + (pl.retro && !['Rahu', 'Ketu'].includes(pl.name) ? (L() ? '॰' : 'ᴿ') : '');
          txt += `<g class="pg"><rect x="${x - 22}" y="${y - 14}" width="44" height="27" rx="13.5" fill="${Y.pColor[pl.name]}"/><text x="${x}" y="${y + 2}" class="pl3">${ab}</text></g>`; }); });
      const [sx, sy] = signPos[h]; txt += `<text x="${sx}" y="${sy}" class="sn3">${((asc + h) % 12) + 1}</text>`;
    });
    if ((mode === 'lagna' || d9) && !ch.timeUnknown) txt += `<text x="200" y="38" class="asc3">${L() ? 'लग्न' : 'Lagna'}</text>`;
    return `<div class="chart3d"><div class="c3-inner"><svg class="chart draw" viewBox="0 0 400 400" role="img" aria-label="${t('birthChart')}">
      <defs><linearGradient id="c3bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFDF7"/><stop offset="1" stop-color="#FBE7C6"/></linearGradient>
        <linearGradient id="c3gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7D774"/><stop offset=".5" stop-color="#B9831F"/><stop offset="1" stop-color="#F3C95A"/></linearGradient>
        <radialGradient id="c3h1" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#FFE7B0"/><stop offset="1" stop-color="#F6C976"/></radialGradient></defs>
      <rect x="2" y="2" width="396" height="396" rx="14" fill="url(#c3gold)"/><rect x="8" y="8" width="384" height="384" rx="6" fill="url(#c3bg)"/>
      ${polys}<path d="M8 8L392 392M392 8L8 392M200 8L392 200L200 392L8 200Z" class="cl3"/>${txt}</svg><div class="c3-shine"></div></div></div>`;
  }

  /* ---- Speech: best Indian voice, natural pauses ---- */
  const TTS = { voices: [], native: null, nVoices: null, q: [], onend: null, hasHindi: null };
  const NT = () => window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech && isNative() ? window.Capacitor.Plugins.TextToSpeech : null;
  function loadVoices() { try { TTS.voices = speechSynthesis.getVoices() || []; } catch (e) { TTS.voices = []; } }
  try { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; } catch (e) { }
  const VRANK = v => (/(google|natural|neural|online|wavenet|network|premium|enhanced)/i.test(v.name || '') ? 2 : 0) + (v.localService === false ? 1 : 0);
  function pickVoice(lang, list) {
    const pref = S.voicePref && S.voicePref[lang.slice(0, 2)];
    if (pref) { const f = list.find(v => (v.name || v.voiceURI) === pref); if (f) return f; }
    const want = lang.toLowerCase(), ok = list.filter(v => (v.lang || '').toLowerCase().replace('_', '-') === want);
    let loose = ok.length ? ok : list.filter(v => (v.lang || '').toLowerCase().startsWith(want.slice(0, 2)) && (want.startsWith('en') ? /in/i.test(v.lang) : true));
    // no Indian-English voice on this phone: a Hindi voice reads English with a natural Indian accent (better than an American voice)
    if (!loose.length && want.startsWith('en')) loose = list.filter(v => /^hi/i.test(v.lang || ''));
    const male = S.voiceGender === 'm', gm = v => { const n = (v.name || v.voiceURI || '').toLowerCase(); return /female|woman|swara|kalpana|lekha|heera|neerja|-hia-|-hic-|-ena-|-enc-/.test(n) ? 'f' : /\bmale\b|man\b|madhur|prabhat|hemant|ravi|-hid-|-hie-|-end-|-ene-/.test(n) ? 'm' : ''; };
    return loose.sort((a, b) => (VRANK(b) + (gm(b) === (male ? 'm' : 'f') ? 3 : 0)) - (VRANK(a) + (gm(a) === (male ? 'm' : 'f') ? 3 : 0)))[0] || null;
  }
  function chunks(text) {   // speak sentence by sentence – sounds calmer and more human
    const dev = /[\u0900-\u097F]/.test(text);
    return String(text).replace(/[·•]/g, ',').replace(/\s*\n+\s*/g, dev ? ' । ' : '. ').split(/(?<=[.!?।॥])\s+/).map(s => s.replace(/[॥]/g, '।').trim()).filter(s => s.length > 1);
  }
  function stopSpeech() { TTS.q = []; try { if (TTS.audio) { TTS.audio.pause(); TTS.audio = null; } } catch (e) { } try { const n = NT(); if (n) n.stop(); else speechSynthesis.cancel(); } catch (e) { } V.speaking = false; }
  /* natural Indian cloud voice from our server (Google WaveNet en-IN / hi-IN); falls back to the phone's voice */
  const cloudVoiceOn = () => CFG.apiBase && CFG.apiBase !== 'demo' && S.cloudVoice !== false && TTS.cloudOk !== false;
  function cloudParts(text) {
    const out = []; let cur = '';
    chunks(text).forEach(s => { if ((cur + ' ' + s).length > 900 && cur) { out.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s; });
    if (cur) out.push(cur); return out;
  }
  async function cloudSay(id, text, lang, rate) {
    const parts = cloudParts(text), base = CFG.apiBase.replace(/\/$/, '');
    const get = t => fetch(base + '/api/tts', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: t, lang: lang.slice(0, 2), rate, gender: S.voiceGender === 'm' ? 'm' : 'f' }) })
      .then(r => { if (!r.ok) throw new Error('tts ' + r.status); return r.blob(); });
    let next = get(parts[0]);
    for (let i = 0; i < parts.length; i++) {
      const blob = await next; if (V.speaking !== id) return true;
      if (i + 1 < parts.length) next = get(parts[i + 1]);
      await new Promise((res, rej) => { const a = new Audio(URL.createObjectURL(blob)); TTS.audio = a; a.onended = res; a.onerror = rej; a.play().catch(rej); });
      if (V.speaking !== id) return true;
    }
    return true;
  }
  async function say(id, text, lang, opt = {}) {
    if (V.speaking) { const same = V.speaking === id; stopSpeech(); render(); if (same) return; }
    if (cloudVoiceOn()) {
      V.speaking = id; render();
      try { await cloudSay(id, text, lang, opt.rate || (S.voiceRate === 'slow' ? 0.75 : 0.95)); if (V.speaking === id) { V.speaking = false; render(); } return; }
      catch (e) { console.warn('cloud voice failed, using phone voice', e); if (/501/.test(String(e))) TTS.cloudOk = false; if (V.speaking !== id) return; V.speaking = false; }
    }
    const rate = (opt.rate ? opt.rate * (S.voiceRate === 'slow' ? 0.85 : 1) : (S.voiceRate === 'slow' ? 0.68 : 0.95)) * (lang.startsWith('hi') ? 0.97 : 1);
    const pitch = S.voiceGender === 'm' ? 0.72 : 1.08;   // a male / female sound even when the phone has only one voice
    TTS.q = chunks(text); V.speaking = id; render();
    const finish = () => { if (V.speaking === id) { V.speaking = false; render(); } };
    const n = NT();
    if (n) {
      try { if (!TTS.nVoices) TTS.nVoices = ((await n.getSupportedVoices()) || {}).voices || []; } catch (e) { TTS.nVoices = []; }
      const v = pickVoice(lang, TTS.nVoices.map((x, i) => ({ ...x, idx: i, name: x.name || x.voiceURI })));
      while (TTS.q.length && V.speaking === id) { const s = TTS.q.shift(); try { await n.speak({ text: s, lang, rate, pitch, ...(v ? { voice: v.idx } : {}) }); } catch (e) { break; } await new Promise(r => setTimeout(r, 180)); }
      return finish();
    }
    let ss; try { ss = window.speechSynthesis; } catch (e) { } if (!ss) return finish();
    if (!TTS.voices.length) loadVoices();
    const v = pickVoice(lang, TTS.voices);
    const next = () => {
      if (V.speaking !== id || !TTS.q.length) return finish();
      const u = new SpeechSynthesisUtterance(TTS.q.shift()); u.lang = v ? v.lang : lang; if (v) u.voice = v; u.rate = rate; u.pitch = pitch;
      u.onend = () => setTimeout(next, 220); u.onerror = () => finish(); ss.speak(u);
    };
    ss.cancel(); next();
  }
  const hasHindiVoice = () => { if (NT() || cloudVoiceOn()) return true; if (!TTS.voices.length) loadVoices(); return !!pickVoice('hi-IN', TTS.voices); };
  function speakMantra(m) {   // Devanagari with a Hindi voice; English letters with an Indian-English voice if no Hindi voice exists
    const tx = mText(m).split('\n').filter(l => !/[਀-੿]/.test(l)).join('\n');
    if (hasHindiVoice() || !m.roman) return say('m:' + m.id, tx, 'hi-IN', { rate: 0.8 });
    say('m:' + m.id, m.roman.replace(/-/g, ' '), 'en-IN', { rate: 0.82 });
  }

  /* ---- Premium: plans and clickable features ---- */
  const PREM_GO = { '📄': 'pdf', '✋': 'palm', '🕉️': 'kundli', '🪐': 'kundli', '📆': 'kundli', '📜': 'aiask', '📜': 'report', '🗓️': 'muhurat', '🎙️': 'voice', '👨‍👩‍👧': 'family', '💑': 'match', '🛕': 'bhakti', '🧭': 'vastu' };
  function premGo(icon) {
    const to = PREM_GO[icon]; if (!to) return;
    if (to === 'pdf') { if (isPremium()) { makePDF(); } else paywall(); return; }
    V.tab = to; V.sub = null; if (to === 'bhakti') V.bh.mode = icon === '🛕' ? 'temples' : V.bh.mode;
    ANIM = true; render();
    if (to === 'kundli') setTimeout(() => { const el = $('#premSec'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80); }, 200); else window.scrollTo(0, 0);
  }
  V.plan = V.plan || 'y';
  function planName(k) { const pr = PRICE[PLAN_PROD[k] || 'prem_y']; return `₹${pr}${pick(/y$/.test(k) ? P_.perYear : P_.perMonth)}`; }

  /* ---- creative bottom navigation: duotone 3D icons ---- */
  const NAV_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="nvG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF0B8"/><stop offset=".55" stop-color="#F2C35A"/><stop offset="1" stop-color="#C98A22"/></linearGradient>
    <linearGradient id="nvG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB46B"/><stop offset="1" stop-color="#E06A1E"/></linearGradient>
    <linearGradient id="nvM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A3283A"/><stop offset="1" stop-color="#5A1520"/></linearGradient>
    <linearGradient id="nvM2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E0603A"/><stop offset="1" stop-color="#9B2335"/></linearGradient></defs></svg>`;
  const heart = (cx, cy, s) => `M${cx} ${cy + 9 * s}s-${8.5 * s}-${5.2 * s}-${8.5 * s}-${11 * s}a${4.6 * s} ${4.6 * s} 0 0 1 ${8.5 * s}-${2.6 * s}a${4.6 * s} ${4.6 * s} 0 0 1 ${8.5 * s} ${2.6 * s}c0 ${5.8 * s}-${8.5 * s} ${11 * s}-${8.5 * s} ${11 * s}z`;
  const NAVI = {
    today: `<svg viewBox="0 0 32 32">${Array.from({ length: 8 }, (_, i) => `<rect class="f1" x="14.9" y="1.8" width="2.2" height="6" rx="1.1" transform="rotate(${i * 45} 16 16)"/>`).join('')}<circle class="f2" cx="16" cy="16" r="7.4"/><circle cx="13.6" cy="13.6" r="2.4" fill="#fff" opacity=".55"/></svg>`,
    kundli: `<svg viewBox="0 0 32 32"><rect class="f1" x="3" y="3" width="26" height="26" rx="5"/><path class="f2" d="M16 7L25 16L16 25L7 16Z"/><path class="s1" d="M5.5 5.5l21 21M26.5 5.5l-21 21"/><circle cx="16" cy="16" r="2.2" fill="#fff" opacity=".85"/><rect x="5" y="4.6" width="22" height="3" rx="1.5" fill="#fff" opacity=".35"/></svg>`,
    match: `<svg viewBox="0 0 32 32"><path class="f1" d="${heart(12, 9.5, 1.05)}"/><path class="f2" d="${heart(20.5, 12, .95)}" opacity=".95"/><circle cx="9" cy="10.5" r="1.8" fill="#fff" opacity=".6"/></svg>`,
    palm: `<svg viewBox="0 0 32 32"><path class="f1" d="M12.2 29.5c-3.3-.9-6-4.3-6.7-7.6l-1.6-5.1c-.4-1.4 1-2.5 2.3-1.8l2.3 1.4V7a1.8 1.8 0 0 1 3.6 0v7.3h.5V4.6a1.8 1.8 0 0 1 3.6 0v9.7h.5V5.8a1.8 1.8 0 0 1 3.6 0v8.9h.5V8.8a1.8 1.8 0 0 1 3.6 0v11.4c0 5.4-4 9.6-9.4 9.6z"/><path class="s2" d="M11 21.5c2.5 1.6 6 1.6 8.2-.6M12 18.4c1.8.6 3.8.4 5.4-.6"/><circle class="f2" cx="20.5" cy="24.5" r="3.4"/><path d="M20.5 22.6l.6 1.3 1.4.2-1 1 .2 1.4-1.2-.7-1.2.7.2-1.4-1-1 1.4-.2z" fill="#fff"/></svg>`,
    bhakti: `<svg viewBox="0 0 32 32"><path class="s1" d="M16 2.2v4.6"/><path class="f2" d="M16.2 2.4l4.4 1.5-4.4 1.5z"/><path class="f1" d="M10.5 13.5L13 7.5h6l2.5 6z"/><rect class="f1" x="7" y="13.5" width="18" height="3.4" rx="1"/><rect class="f1" x="8.6" y="16.9" width="14.8" height="10.6"/><rect class="f2" x="5.5" y="27" width="21" height="3" rx="1.2"/><path class="f2" d="M13.6 27.5v-4.6a2.4 2.4 0 0 1 4.8 0v4.6z"/><rect x="11" y="8.4" width="10" height="1.6" rx=".8" fill="#fff" opacity=".45"/></svg>`,
    more: `<svg viewBox="0 0 32 32"><rect class="f1" x="3.5" y="3.5" width="11" height="11" rx="3.2"/><rect class="f1" x="17.5" y="17.5" width="11" height="11" rx="3.2"/><rect class="f2" x="3.5" y="17.5" width="11" height="11" rx="3.2"/><path class="f2" d="M23 3l1.7 4.3L29 9l-4.3 1.7L23 15l-1.7-4.3L17 9l4.3-1.7z"/></svg>`
  };
  /*@@GROWTH@@*/
  /* ---------- Render ---------- */
  function render() {
    document.documentElement.style.fontSize = (18 * S.scale) + 'px';
    document.documentElement.lang = S.lang === 'mr' || S.lang === 'gu' ? S.lang : L() ? 'hi' : 'en';
    const app = $('#app');
    app.classList.toggle('anim', ANIM); ANIM = false;
    const cosmic = !S.lang || needLogin() || LV.step === 'hi';
    app.classList.toggle('cosmic', cosmic); app.classList.toggle('lgmode', !!S.lang && cosmic);
    if (!S.lang) { app.innerHTML = `${COSMOS}<main class="main">${screenWelcome()}</main>`; chatRender(); return; }
    if (needLogin() || LV.step === 'hi') { app.innerHTML = `${COSMOS}<main class="main">${screenLogin()}</main>`; chatRender(); return; }
    if (!S.profiles.length) { V.sub = 'form'; app.innerHTML = `<header class="top">${LOGO}<b>${t('appName')}</b></header><main class="main">${screenForm()}</main>`; bindForm(); restoreForm(); return; }
    const scr = { today: screenToday, kundli: screenKundli, palm: screenPalm, panchang: screenPanchang, family: screenFamily, premium: screenPremium, bhakti: screenBhakti, match: screenMatch, more: screenMore, vastu: screenVastu, muhurat: screenMuhurat, aiask: screenAiAsk, report: screenReport, voice: screenVoice, ...G.screens }[V.tab]();
    const tabs = [['today', 'tabToday'], ['kundli', 'tabKundli'], ['match', 'tabMatch'], ['palm', 'tabPalm'], ['bhakti', 'tabBhakti'], ['more', 'tabMore']];
    const navOn = ['panchang', 'family', 'vastu', 'muhurat', 'aiask', 'report', 'voice', 'premium', ...G.tabs].includes(V.tab) ? 'more' : V.tab;
    app.innerHTML = `<header class="top"><button class="homebtn" data-a="tab" data-v="home" aria-label="${g('home')}">${LOGO}</button>${whoChip()}<button class="crownbtn ${S.premium ? 'on' : ''}" data-a="openPremium" aria-label="${pick(C.prem.title)}">👑</button><button class="langbtn" data-a="lang" data-v="${L() ? 'en' : 'hi'}">${L() ? 'English' : 'हिंदी'}</button></header>
      <main class="main">${scr}<p class="disc">${t('disclaimer')}</p></main>
      <nav class="tabs nav2">${NAV_DEFS}${tabs.map(([k, l]) => `<button data-a="tab" data-v="${k}" class="${navOn === k ? 'on' : ''}"><i class="nvi">${NAVI[k]}</i><span>${t(l)}</span></button>`).join('')}</nav>`;
    if (V.sub === 'form') { bindForm(); restoreForm(); }
    if (V.tab === 'bhakti') bindBhakti();
    bindTPlace();
    if (V.tab !== 'vastu') stopCompass();
    const af = $('#aiForm'); if (af) af.onsubmit = e => { e.preventDefault(); const i = $('#aiInput'); aiAsk(i.value); };
    if (V.tab === 'today' && V.locState === 'idle') setTimeout(() => getLocation(), 600);
    G.afterRender();
    chatRender();
  }

  function bindForm() {
    const nt = $('#fNoTime'); if (!nt) return;
    nt.onchange = () => { $('#fTob').disabled = nt.checked; $('#noTimeNote').hidden = !nt.checked; };
    const q = $('#fPlaceQ'); if (!q) return;
    q.oninput = () => areaSuggest(q, $('#placeList'), res => {
      V.placeRes = res;
      $('#placeList').innerHTML = res.length ? res.map((r, i) => `<button type="button" data-a="pickPlace" data-v="${i}"><b>${esc(r.n)}</b>${r.h ? ` · ${r.h}` : ''}<small>${esc(r.sub)}${r.osm ? ' · 🌐' : ''}</small></button>`).join('') + `<div class="attrib">${pick(Y.tl.attrib)}</div>` : `<div class="muted small pad">${pick(C.acc.placeNone)}</div>`;
    });
  }
  let PLACES = null;
  function searchPlaces(qs) {
    qs = (qs || '').trim().toLowerCase(); if (qs.length < 2) return [];
    if (!PLACES) PLACES = PLACES_RAW.split(';').map(r => { const [n, st, la, lo, h] = r.split('|'); return { n, s: st, la: +la, lo: +lo, h: h || '', k: n.toLowerCase() }; });
    const hi = /[\u0900-\u097F]/.test(qs), score = r => { const k = hi ? r.h : r.k; if (!k) return 0; return k.startsWith(qs) ? (r.h ? 4 : 3) : k.includes(qs) ? (r.h ? 2 : 1) : 0; };
    return PLACES.map(r => [score(r), r]).filter(x => x[0]).sort((a, b) => b[0] - a[0] || a[1].n.length - b[1].n.length).slice(0, 8).map(x => x[1]);
  }

  const famLimit = () => (CFG.freeFamilyMembers ?? 5);
  const familyFull = () => !isPremium() && S.profiles.length >= famLimit();
  function keepForm() {
    const g = id => { const el = $(id); return el ? el.value : undefined; };
    V.formDraft = { name: g('#fName'), dob: g('#fDob'), tob: g('#fTob'), rel: g('#fRel'), noTime: $('#fNoTime') && $('#fNoTime').checked, gender: $('#fGender .on') ? $('#fGender .on').dataset.v : null };
  }
  function restoreForm() {
    const d = V.formDraft; if (!d) return; V.formDraft = null;
    if (d.name != null) $('#fName').value = d.name; if (d.dob) $('#fDob').value = d.dob; if (d.tob) $('#fTob').value = d.tob; if (d.rel) $('#fRel').value = d.rel;
    if (d.noTime) { $('#fNoTime').checked = true; $('#fTob').disabled = true; $('#noTimeNote').hidden = false; }
    if (d.gender) document.querySelectorAll('#fGender button').forEach(b => b.classList.toggle('on', b.dataset.v === d.gender));
  }
  function saveForm() {
    const name = $('#fName').value.trim(), dob = $('#fDob').value;
    const gender = $('#fGender .on') ? $('#fGender .on').dataset.v : 'm';
    const noTime = $('#fNoTime').checked;
    let [h, min] = ($('#fTob').value || '12:00').split(':').map(Number);
    if (noTime) { h = 12; min = 0; }
    let lat, lon, tz, pl, cityIdx = null, tzAuto = true;
    if (V.manualPlace) { cityIdx = -1; tzAuto = false; lat = parseFloat($('#fLat').value); lon = parseFloat($('#fLon').value); tz = parseFloat($('#fTz').value); pl = $('#fPlace').value.trim() || `${lat}, ${lon}`; }
    else if (V.formPlace) { lat = V.formPlace.lat; lon = V.formPlace.lon; tz = V.formPlace.tz; pl = V.formPlace.label; cityIdx = 0; }
    const bad = !name || !dob || cityIdx == null || [lat, lon, tz].some(x => isNaN(x)) || Math.abs(lat) > 66;
    if (bad) { $('#fErr').hidden = false; $('#fErr').scrollIntoView({ block: 'center' }); return; }
    const [y, m, d] = dob.split('-').map(Number);
    const data = { name, gender, rel: +$('#fRel').value, y, m, d, h, min, timeUnknown: noTime, lat, lon, tz, tzAuto, place: pl, cityIdx };
    if (!V.editId && familyFull()) { toast(pick(C.fam.full).replace('{n}', famLimit())); paywall(); return; }
    if (V.editId) Object.assign(S.profiles.find(p => p.id === V.editId), data);
    else { const id = 'p' + Date.now().toString(36); S.profiles.push({ id, ...data }); S.activeId = id; }
    persist(); V.sub = null; V.editId = null; V.tab = V.afterSave || 'kundli'; V.afterSave = null; V.formPreset = null; V.matchRes = null; render(); toast(t('saved')); window.scrollTo(0, 0);
  }

  function countUp() {
    const el = document.querySelector('[data-count]'); if (!el) return;
    const target = +el.dataset.count, t0 = performance.now(), dur = 1400;
    const fmt = x => (x % 1 ? x.toFixed(1) : String(x));
    const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(Math.round(target * e * 2) / 2); if (k < 1) requestAnimationFrame(step); };
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(target); return; }
    requestAnimationFrame(step);
  }
  let toastT;
  function toast(msg) {
    let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
    el.textContent = msg; el.className = "show"; clearTimeout(toastT); toastT = setTimeout(() => el.className = "", msg.length > 50 ? 3200 : 1800);
  }
  function confirmBox(msg, onYes, yesLabel) {
    const d = document.createElement('div'); d.className = 'modal';
    d.innerHTML = `<div class="mbox"><p class="lead">${msg}</p><div class="row2"><button class="btn ghost" data-x="no">${t('cancel')}</button><button class="btn primary danger-bg" data-x="yes">${yesLabel || t('del')}</button></div></div>`;
    d.onclick = e => { const x = e.target.closest('[data-x]'); if (!x && e.target !== d) return; d.remove(); if (x && x.dataset.x === 'yes') onYes(); };
    document.body.appendChild(d);
  }

  function speak() { speakDay(active(), V.dayOffset); }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-a]'); if (!el) return;
    const a = el.dataset.a, v = el.dataset.v;
    const go = () => { ANIM = true; render(); window.scrollTo(0, 0); };
    switch (a) {
      case 'pickLang': S.lang = v; persist(); go(); break;
      case 'lang': S.lang = v; persist(); ANIM = true; render(); break;
      case 'scale': S.scale = +v; persist(); render(); break;
      case 'tab': V.tab = v; V.sub = null; if (V.speaking) stopSpeech(); go(); break;
      case 'day': V.dayOffset = +v; ANIM = true; render(); break;
      case 'speak': speak(); break;
      case 'cmode': V.chartMode = v; render(); { const c = document.querySelector('.chart'); if (c) { c.classList.remove('draw'); void c.offsetWidth; c.classList.add('draw'); } } break;
      case 'toggleDasha': V.showAllDasha = !V.showAllDasha; render(); break;
      case 'bhMode': V.bh.mode = v; V.bh.open = null; go(); break;
      case 'bhGroup': V.bh.g = v; render(); break;
      case 'bhCat': V.bh.cat = v; render(); break;
      case 'bhLoc': getLocation(true); render(); break;
      case 'tMode': V.tMode = v; if (v === 'near') getLocation(true); render(); break;
      case 'tEdit': V.tEdit = true; render(); setTimeout(() => { const i = $('#tPlace'); if (i) i.focus(); }, 50); break;
      case 'tPick': setTPlace(v); break;
      case 'tPickI': { const r = V.tRes && V.tRes[+v]; if (r) setTPlace(`${r.n}, ${r.sub}`); break; }
      case 'tSet': setTPlace(($('#tPlace') || {}).value); break;
      case 'bhOpen': V.bh.open = v; go(); break;
      case 'bhClose': if (V.speaking) stopSpeech(); V.bh.open = null; go(); break;
      case 'bhFav': { const f = favs(), i = f.indexOf(v); if (i < 0) f.push(v); else f.splice(i, 1); persist(); render(); break; }
      case 'bhSize': V.bh.size = Math.max(0.8, Math.min(1.8, V.bh.size + 0.15 * +v)); render(); break;
      case 'bhSpeak': speakMantra(BHAKTI.mantras.find(x => x.id === v)); break;
      case 'vTest': sayOwn('test', 'test', pick(Y.voice.testTxt), L() ? 'hi-IN' : 'en-IN'); break;
      case 'vRate': S.voiceRate = v; persist(); render(); setTimeout(() => sayOwn('test', 'test', pick(Y.voice.testTxt), L() ? 'hi-IN' : 'en-IN', true), 150); break;
      case 'compatAI': compatRun(); break;
      case 'vScan': startCompass(); break;
      case 'vRoom': VS.room = VS.room === v ? null : v; render(); break;
      case 'vPick': VS.heading = VS.scanned = +v * 45; VS.phase = 'manual'; render(); break;
      case 'vSave': if (VS.room && VS.scanned != null) { S.vastuMap = S.vastuMap || {}; S.vastuMap[VS.room] = dirIdx(VS.scanned); persist(); toast('✓'); render(); } break;
      case 'vClear': S.vastuMap = {}; persist(); render(); break;
      case 'muEv': MU.ev = v; render(); break;
      case 'aiQ': aiAsk(v); break;
      case 'aiClear': delete aiStore()[active().id]; persist(); render(); break;
      case 'repMake': makeReport(); break;
      case 'voicePlay': say('m:voice', voiceScript(active()), L() ? 'hi-IN' : 'en-IN'); break;
      case 'premTest': S.premium = !S.premium; persist(); render(); toast(pick(S.premium ? P_.demoOn : P_.demoOff)); break;
      case 'openMatch': V.tab = 'match'; V.sub = null; V.matchRes = null; go(); break;
      case 'closeMatch': V.sub = null; go(); break;
      case 'runMatch': {
        const b = S.profiles.find(p => p.id === $('#mBoy').value), g = S.profiles.find(p => p.id === $('#mGirl').value);
        V.matchBoy = b.id; V.matchGirl = g.id;
        V.matchRes = { ...E.match(chartOf(b), chartOf(g)), boy: b, girl: g }; render();
        setTimeout(() => { const r = document.querySelector('.ring'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'center' }); countUp(); }, 30); break;
      }
      case 'palmStart': V.palmStep = 0; V.palmAns = []; go(); break;
      case 'palmAns': V.palmAns[V.palmStep] = +v; V.palmStep++; go(); break;
      case 'palmBack': V.palmStep = Math.max(0, V.palmStep - 1); go(); break;
      case 'palmAgain': V.palmStep = -1; V.palmAns = []; go(); break;
      case 'pday': {
        if (+v === 0) V.pDate = null; else {
          const b = V.pDate || todayYMD(); const dt = new Date(Date.UTC(b.y, b.m - 1, b.d) + (+v) * 86400000);
          V.pDate = { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
          const td = todayYMD(); if (V.pDate.y === td.y && V.pDate.m === td.m && V.pDate.d === td.d) V.pDate = null;
        }
        render(); break;
      }
      case 'setActive': switchTo(v); break;
      case 'whoOpen': whoSheet(); break;
      case 'premGo': premGo(v); break;
      case 'plan': V.plan = v; render(); { const pp = $('#pwPlans'); if (pp) { pp.innerHTML = plansHTML(); $('#pwGo').innerHTML = '👑 ' + pick(Y.plan.cont).replace('{p}', planName(V.plan)); } } break;
      case 'planGo': planGo(); break;
      case 'addMember': if (familyFull()) { toast(pick(Y.fam.full).replace('{n}', famLimit())); paywall(); break; } V.tab = 'family'; V.sub = 'form'; V.editId = null; V.formPlaceFor = null; go(); break;
      case 'edit': V.sub = 'form'; V.editId = v; V.formPlaceFor = null; go(); break;
      case 'pickPlace': { const r = V.placeRes && V.placeRes[+v]; if (r) { V.formPlace = { label: `${r.n}, ${r.sub}`, lat: r.la, lon: r.lo, tz: r.tz || 5.5 }; keepForm(); render(); } break; }
      case 'placeManual': V.manualPlace = true; keepForm(); render(); break;
      case 'closeForm': V.sub = null; V.editId = null; go(); break;
      case 'del': confirmBox(t('confirmDel'), () => { S.profiles = S.profiles.filter(p => p.id !== v); if (S.activeId === v) S.activeId = S.profiles[0].id; persist(); render(); }); break;
      case 'gender': el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); break;
      case 'notify': S.notify = true; persist(); render(); toast(t('notified')); break;
      case 'openPremium': V.tab = 'premium'; V.sub = null; go(); break;
      case 'paywall': paywall(); break;
      case 'pdf': makePDF(); break;
      case 'takePhoto': takePhoto(); break;
      case 'liveCam': liveCam(); break;
      case 'handCam': nativeHand(v, 'CAMERA'); break;
      case 'handGal': nativeHand(v, 'PHOTOS'); break;
      case 'palmAnalyse': palmAnalyse(); break;
      case 'palmDom': PV.dom = v; render(); break;
      case 'palmQuick': PV.phase = 'quick'; V.palmStep = -1; go(); break;
      case 'palmAI': PV.phase = 'capture'; go(); break;
      case 'palmShowSaved': PV.phase = 'result'; go(); break;
      case 'palmNew': if (!palmAllowed()) { paywall(); break; } PV.phase = 'capture'; PV.left = PV.right = null; PV.bad = {}; go(); break;
      case 'pickGallery': pickGallery(); break;
      case 'demoTap': demoTap(); break;
      case 'lgChange': LV.step = 'phone'; LV.err = ''; clearInterval(LV.poll); render(); break;
      case 'lgWaOpen': if (LV.wa) LV.wa.opened = Date.now(); if (CFG.apiBase === 'demo') e.preventDefault(); break;
      case 'lgResend': sendOtp(); break;
      case 'lgSkip': S.user = { name: '', phone: '', verified: false, skipped: true }; persist(); render(); break;
      case 'lgHiSent': setTimeout(() => { LV.step = 'phone'; render(); }, 1500); break;
      case 'lgDone': LV.step = 'phone'; ANIM = true; render(); break;
      case 'consent': setConsent(v === '1'); break;
      default: G.act(a, v, el, e); break;
      case 'logout': confirmBox(pick(LG.logout) + '?', () => { S.user = null; LV.step = 'phone'; LV.num = ''; persist(); ANIM = true; render(); }, t('ok')); break;
    }
  });
  document.addEventListener('submit', e => { if (e.target.id === 'pform') { e.preventDefault(); saveForm(); } });
  document.addEventListener('change', e => {
    if (e.target.id === 'homeCity') { S.homeCity = e.target.value === '' ? null : +e.target.value; persist(); render(); }
    if (e.target.dataset && e.target.dataset.hand && e.target.files[0]) {
      const fr = new FileReader(), hand = e.target.dataset.hand; fr.onload = () => setHand(hand, fr.result); fr.readAsDataURL(e.target.files[0]);
    }
    if ((e.target.id === 'palmFile' || e.target.id === 'palmCapture') && e.target.files[0]) {
      const fr = new FileReader(); fr.onload = () => { V.palmImg = fr.result; render(); }; fr.readAsDataURL(e.target.files[0]);
    }
  });
  render();
  syncMe();
})();
