/* Jyotish Saathi - astrology engine (Lahiri ayanamsa, whole-sign houses) */
const AstroEngine = (function () {
  const RAD = Math.PI / 180;
  const SIGN_LORD_ = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
  const FRIENDS_ = {
    Sun: { f: ['Moon', 'Mars', 'Jupiter'], e: ['Venus', 'Saturn'] }, Moon: { f: ['Sun', 'Mercury'], e: [] },
    Mars: { f: ['Sun', 'Moon', 'Jupiter'], e: ['Mercury'] }, Mercury: { f: ['Sun', 'Venus'], e: ['Moon'] },
    Jupiter: { f: ['Sun', 'Moon', 'Mars'], e: ['Mercury', 'Venus'] }, Venus: { f: ['Mercury', 'Saturn'], e: ['Sun', 'Moon'] },
    Saturn: { f: ['Mercury', 'Venus'], e: ['Sun', 'Moon', 'Mars'] }
  };
  const norm = x => { x %= 360; return x < 0 ? x + 360 : x; };
  const sind = x => Math.sin(x * RAD), cosd = x => Math.cos(x * RAD);
  const atan2d = (y, x) => Math.atan2(y, x) / RAD;

  function jdFromLocal(y, m, d, h, min, tz) {
    let Y = y, M = m;
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100), B = 2 - A + Math.floor(A / 4);
    const jd0 = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5;
    return jd0 + (h + min / 60 - tz) / 24;
  }
  function jdToLocal(jd, tz) {
    const j = jd + tz / 24 + 0.5;
    const Z = Math.floor(j), F = j - Z;
    let A = Z;
    if (Z >= 2299161) { const a = Math.floor((Z - 1867216.25) / 36524.25); A = Z + 1 + a - Math.floor(a / 4); }
    const B = A + 1524, C = Math.floor((B - 122.1) / 365.25), D = Math.floor(365.25 * C), E = Math.floor((B - D) / 30.6001);
    const dayF = B - D - Math.floor(30.6001 * E) + F;
    const day = Math.floor(dayF);
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    let mins = Math.round((dayF - day) * 1440);
    let dd = day, hh = Math.floor(mins / 60), mm = mins % 60;
    if (hh === 24) { hh = 23; mm = 59; }
    return { y: year, m: month, d: dd, h: hh, min: mm };
  }

  function kepler(M, e) {
    let E = M + (e / RAD) * sind(M) * (1 + e * cosd(M));
    for (let i = 0; i < 8; i++) E = E - (E - (e / RAD) * sind(E) - M) / (1 - e * cosd(E));
    return E;
  }
  function sun(d) {
    const w = 282.9404 + 4.70935e-5 * d, e = 0.016709 - 1.151e-9 * d, M = norm(356.0470 + 0.9856002585 * d);
    const E = kepler(M, e);
    const xv = cosd(E) - e, yv = Math.sqrt(1 - e * e) * sind(E);
    const v = atan2d(yv, xv), r = Math.hypot(xv, yv);
    const lon = norm(v + w);
    return { lon, r, M, w, x: r * cosd(lon), y: r * sind(lon) };
  }
  function moon(d, S) {
    const N = 125.1228 - 0.0529538083 * d, i = 5.1454, w = 318.0634 + 0.1643573223 * d;
    const a = 60.2666, e = 0.0549, M = norm(115.3654 + 13.0649929509 * d);
    const E = kepler(M, e);
    const xv = a * (cosd(E) - e), yv = a * Math.sqrt(1 - e * e) * sind(E);
    const v = atan2d(yv, xv), r = Math.hypot(xv, yv);
    const xh = r * (cosd(N) * cosd(v + w) - sind(N) * sind(v + w) * cosd(i));
    const yh = r * (sind(N) * cosd(v + w) + cosd(N) * sind(v + w) * cosd(i));
    let lon = atan2d(yh, xh);
    const Ms = S.M, Mm = M, Ls = S.M + S.w, Lm = M + w + N, D = Lm - Ls, F = Lm - N;
    lon += -1.274 * sind(Mm - 2 * D) + 0.658 * sind(2 * D) - 0.186 * sind(Ms) - 0.059 * sind(2 * Mm - 2 * D)
      - 0.057 * sind(Mm - 2 * D + Ms) + 0.053 * sind(Mm + 2 * D) + 0.046 * sind(2 * D - Ms) + 0.041 * sind(Mm - Ms)
      - 0.035 * sind(D) - 0.031 * sind(Mm + Ms) - 0.015 * sind(2 * F - 2 * D) + 0.011 * sind(Mm - 4 * D);
    return { lon: norm(lon), node: norm(N) };
  }
  const EL = {
    Mercury: d => [48.3313 + 3.24587e-5 * d, 7.0047 + 5e-8 * d, 29.1241 + 1.01444e-5 * d, 0.387098, 0.205635 + 5.59e-10 * d, 168.6562 + 4.0923344368 * d],
    Venus: d => [76.6799 + 2.4659e-5 * d, 3.3946 + 2.75e-8 * d, 54.891 + 1.38374e-5 * d, 0.72333, 0.006773 - 1.302e-9 * d, 48.0052 + 1.6021302244 * d],
    Mars: d => [49.5574 + 2.11081e-5 * d, 1.8497 - 1.78e-8 * d, 286.5016 + 2.92961e-5 * d, 1.523688, 0.093405 + 2.516e-9 * d, 18.6021 + 0.5240207766 * d],
    Jupiter: d => [100.4542 + 2.76854e-5 * d, 1.303 - 1.557e-7 * d, 273.8777 + 1.64505e-5 * d, 5.20256, 0.048498 + 4.469e-9 * d, 19.895 + 0.0830853001 * d],
    Saturn: d => [113.6634 + 2.3898e-5 * d, 2.4886 - 1.081e-7 * d, 339.3939 + 2.97661e-5 * d, 9.55475, 0.055546 - 9.499e-9 * d, 316.967 + 0.0334442282 * d]
  };
  function planet(name, d, S) {
    const [N, i, w, a, e, M0] = EL[name](d); const M = norm(M0);
    const E = kepler(M, e);
    const xv = a * (cosd(E) - e), yv = a * Math.sqrt(1 - e * e) * sind(E);
    const v = atan2d(yv, xv), r = Math.hypot(xv, yv);
    const xh = r * (cosd(N) * cosd(v + w) - sind(N) * sind(v + w) * cosd(i));
    const yh = r * (sind(N) * cosd(v + w) + cosd(N) * sind(v + w) * cosd(i));
    const zh = r * sind(v + w) * sind(i);
    let lon = atan2d(yh, xh), lat = atan2d(zh, Math.hypot(xh, yh));
    if (name === 'Jupiter' || name === 'Saturn') {
      const Mj = norm(EL.Jupiter(d)[5]), Ms = norm(EL.Saturn(d)[5]);
      if (name === 'Jupiter') lon += -0.332 * sind(2 * Mj - 5 * Ms - 67.6) - 0.056 * sind(2 * Mj - 2 * Ms + 21) + 0.042 * sind(3 * Mj - 5 * Ms + 21)
        - 0.036 * sind(Mj - 2 * Ms) + 0.022 * cosd(Mj - Ms) + 0.023 * sind(2 * Mj - 3 * Ms + 52) - 0.016 * sind(Mj - 5 * Ms - 69);
      else {
        lon += 0.812 * sind(2 * Mj - 5 * Ms - 67.6) - 0.229 * cosd(2 * Mj - 4 * Ms - 2) + 0.119 * sind(Mj - 2 * Ms - 3)
          + 0.046 * sind(2 * Mj - 6 * Ms - 69) + 0.014 * sind(Mj - 3 * Ms + 32);
        lat += -0.02 * cosd(2 * Mj - 4 * Ms - 2) + 0.018 * sind(2 * Mj - 6 * Ms - 49);
      }
    }
    const rr = r * cosd(lat);
    const xg = rr * cosd(lon) + S.x, yg = rr * sind(lon) + S.y;
    return norm(atan2d(yg, xg));
  }
  function ayanamsa(jd) { return 23.85709 + 0.0139689 * (jd - 2451545) / 365.25; }

  const PLANETS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  function tropical(jd) {
    const d = jd - 2451543.5, S = sun(d), Mo = moon(d, S);
    const p = { Sun: S.lon, Moon: Mo.lon, Rahu: Mo.node, Ketu: norm(Mo.node + 180) };
    ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'].forEach(n => p[n] = planet(n, d, S));
    return p;
  }
  function sidereal(jd) {
    const t = tropical(jd), ay = ayanamsa(jd), out = {};
    for (const k in t) out[k] = norm(t[k] - ay);
    return out;
  }
  function ascendant(jd, lat, lon) {
    const gmst = norm(280.46061837 + 360.98564736629 * (jd - 2451545));
    const th = norm(gmst + lon), eps = 23.4393 - 3.563e-7 * (jd - 2451543.5);
    const asc = atan2d(cosd(th), -(sind(th) * cosd(eps) + Math.tan(lat * RAD) * sind(eps)));
    return norm(norm(asc) - ayanamsa(jd));
  }
  const NAK = 360 / 27;
  const nakOf = lon => { const n = Math.floor(lon / NAK); return { n, pada: Math.floor((lon - n * NAK) / (NAK / 4)) + 1 }; };
  const signOf = lon => Math.floor(lon / 30);

  /* ---- Historical Indian time zones (matters for births before 1956) ---- */
  function tzFor(lat, lon, y, m, d, defTz) {
    const ymd = y * 10000 + m * 100 + d;
    if (defTz === 5.75 || (lon > 80 && lon < 88.3 && lat > 26.3 && lat < 30.5 && defTz !== 5.5)) return ymd < 19860101 ? 5.5 : 5.75; // Nepal
    if (defTz !== 5.5) return defTz;
    if (ymd >= 19420901 && ymd < 19451015) return 6.5;                                   // WW2 war time, all India
    if (Math.abs(lat - 22.57) < 0.35 && Math.abs(lon - 88.36) < 0.35 && ymd < 19480101) return 5 + 53 / 60 + 20 / 3600; // Calcutta time
    if (Math.abs(lat - 19.05) < 0.35 && Math.abs(lon - 72.88) < 0.35 && ymd < 19551001) return 4 + 51 / 60;           // Bombay time
    return 5.5;
  }

  /* ---- Planet strength helpers ---- */
  const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
  const COMBUST = { Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15 };
  const navamsa = lon => Math.floor(lon / (30 / 9)) % 12;
  function dignityIn(name, sign) {
    if (!(name in EXALT)) return null;
    if (sign === EXALT[name]) return 'ex';
    if (sign === (EXALT[name] + 6) % 12) return 'deb';
    if (SIGN_LORD_[sign] === name) return 'own';
    const lord = SIGN_LORD_[sign];
    if (FRIENDS_[name].f.includes(lord)) return 'friend';
    if (FRIENDS_[name].e.includes(lord)) return 'enemy';
    return 'neutral';
  }
  // houses a planet aspects (counted from its own house: 1 = its house)
  const ASPECTS = { Mars: [4, 7, 8], Jupiter: [5, 7, 9], Saturn: [3, 7, 10], Rahu: [5, 7, 9], Ketu: [5, 7, 9] };
  const aspectHouses = (name, house) => (ASPECTS[name] || [7]).map(n => ((house + n - 2) % 12) + 1);

  /* ---- Birth chart ---- */
  function chart(b) {
    const tz = b.tzAuto === false ? b.tz : tzFor(b.lat, b.lon, b.y, b.m, b.d, b.tz);
    const jd = jdFromLocal(b.y, b.m, b.d, b.h, b.min, tz);
    const p = sidereal(jd), pa = sidereal(jd - 0.5), pb = sidereal(jd + 0.5);
    const lagnaTrue = ascendant(jd, b.lat, b.lon);
    // birth time unknown: houses are read from the Moon sign (Chandra Lagna), as astrologers do
    const moonSignTmp = signOf(p.Moon);
    const lagna = b.timeUnknown ? moonSignTmp * 30 + 15 : lagnaTrue, lagnaSign = signOf(lagna);
    const planets = PLANETS.map(name => {
      const lon = p[name];
      let diff = pb[name] - pa[name]; if (diff > 180) diff -= 360; if (diff < -180) diff += 360;
      const retro = (name === 'Rahu' || name === 'Ketu') ? true : (name === 'Sun' || name === 'Moon') ? false : diff < 0;
      const s = signOf(lon), nk = nakOf(lon);
      const d9 = navamsa(lon), sunGap = Math.abs(((lon - p.Sun + 540) % 360) - 180);
      const combust = name in COMBUST && sunGap < (retro && (name === 'Mercury' || name === 'Venus') ? COMBUST[name] - 2 : COMBUST[name]);
      return { name, lon, sign: s, deg: lon - s * 30, nak: nk.n, pada: nk.pada, house: ((s - lagnaSign + 12) % 12) + 1, retro,
        d9, vargottama: d9 === s, combust, dignity: dignityIn(name, s), d9dignity: dignityIn(name, d9) };
    });
    planets.forEach(pl => pl.aspects = aspectHouses(pl.name, pl.house));
    const moonP = planets[1];
    const marsP = planets[2];
    const badH = [1, 2, 4, 7, 8, 12];
    const marsFromMoon = ((marsP.sign - moonP.sign + 12) % 12) + 1;
    const jupP = planets[4];
    const jupOnMars = jupP.sign === marsP.sign || jupP.aspects.includes(marsP.house);
    const signRule = { 1: [0, 7, 9], 2: [2, 5], 4: [0, 7], 7: [3, 9], 8: [8, 11], 12: [1, 6] }[marsP.house] || [];
    const cancelled = [0, 7, 9].includes(marsP.sign) || jupOnMars || signRule.includes(marsP.sign);
    const manglik = { fromLagna: badH.includes(marsP.house), fromMoon: badH.includes(marsFromMoon), cancelled, jupOnMars };
    const lagnaEdge = !b.timeUnknown && (lagnaTrue % 30 < 1 || lagnaTrue % 30 > 29);
    return { jd, tzUsed: tz, timeUnknown: !!b.timeUnknown, lagnaEdge, lagnaD9: navamsa(lagnaTrue), lagna, lagnaSign, lagnaNak: nakOf(lagna), planets, moonSign: moonP.sign, moonNak: moonP.nak, moonLon: moonP.lon, manglik, dasha: vimshottari(moonP.lon, jd) };
  }

  /* ---- Vimshottari dasha ---- */
  const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const DASHA_YRS = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };
  const YEAR = 365.25;
  function vimshottari(moonLon, birthJd) {
    const n = Math.floor(moonLon / NAK), f = (moonLon - n * NAK) / NAK;
    const startIdx = n % 9;
    let start = birthJd - f * DASHA_YRS[DASHA_ORDER[startIdx]] * YEAR;
    const list = [];
    for (let k = 0; k < 18; k++) {
      const lord = DASHA_ORDER[(startIdx + k) % 9], len = DASHA_YRS[lord] * YEAR;
      const md = { lord, start, end: start + len, sub: [] };
      let s2 = start;
      for (let j = 0; j < 9; j++) {
        const l2 = DASHA_ORDER[(startIdx + k + j) % 9], len2 = DASHA_YRS[lord] * DASHA_YRS[l2] / 120 * YEAR;
        md.sub.push({ lord: l2, start: s2, end: s2 + len2 }); s2 += len2;
      }
      list.push(md); start += len;
      if (start > birthJd + 120 * YEAR) break;
    }
    return list;
  }

  /* ---- Sunrise / sunset ---- */
  function sunTimes(y, m, d, lat, lon, tz) {
    const jdNoonLocal = jdFromLocal(y, m, d, 12, 0, tz);
    const n = Math.round(jdNoonLocal - 2451545.0);
    const Js = n - lon / 360;
    const M = norm(357.5291 + 0.98560028 * Js);
    const C = 1.9148 * sind(M) + 0.02 * sind(2 * M) + 0.0003 * sind(3 * M);
    const L = norm(M + C + 180 + 102.9372);
    const Jt = 2451545 + Js + 0.0053 * sind(M) - 0.0069 * sind(2 * L);
    const dec = Math.asin(sind(L) * sind(23.44)) / RAD;
    const cw = (sind(-0.833) - sind(lat) * sind(dec)) / (cosd(lat) * cosd(dec));
    const w0 = Math.acos(Math.max(-1, Math.min(1, cw))) / RAD;
    return { rise: Jt - w0 / 360, set: Jt + w0 / 360, noon: Jt };
  }

  /* ---- Panchang ---- */
  function panchangAt(jd) {
    const p = sidereal(jd);
    const el = norm(p.Moon - p.Sun);
    const tithi = Math.floor(el / 12);
    const k = Math.floor(el / 6);
    let karana;
    if (k === 0) karana = 10; else if (k >= 57) karana = 7 + (k - 57); else karana = (k - 1) % 7;
    return { tithi, nak: Math.floor(p.Moon / NAK), yoga: Math.floor(norm(p.Sun + p.Moon) / NAK), karana, moonSign: signOf(p.Moon), sunSign: signOf(p.Sun), moonLon: p.Moon };
  }
  function findEnd(jd0, key) {
    const v0 = panchangAt(jd0)[key];
    let a = jd0, b = jd0, step = 1 / 24;
    for (let i = 0; i < 72; i++) { b = a + step; if (panchangAt(b)[key] !== v0) break; a = b; }
    for (let i = 0; i < 25; i++) { const mid = (a + b) / 2; if (panchangAt(mid)[key] === v0) a = mid; else b = mid; }
    return b;
  }
  // segments of daytime (8 parts); index 1-based by weekday 0=Sun
  const RAHU = [8, 2, 7, 5, 6, 4, 3], GULIKA = [7, 6, 5, 4, 3, 2, 1], YAMA = [5, 4, 3, 2, 1, 7, 6];
  function weekday(y, m, d) { return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); }
  function dayPanchang(y, m, d, lat, lon, tz) {
    const st = sunTimes(y, m, d, lat, lon, tz);
    const wd = weekday(y, m, d);
    const pc = panchangAt(st.rise);
    const seg = (st.set - st.rise) / 8;
    const part = i => ({ start: st.rise + (i - 1) * seg, end: st.rise + i * seg });
    const mid = (st.rise + st.set) / 2, half = (st.set - st.rise) / 30 / 2;
    return {
      ...pc, wd, sunrise: st.rise, sunset: st.set,
      tithiEnd: findEnd(st.rise, 'tithi'), nakEnd: findEnd(st.rise, 'nak'), yogaEnd: findEnd(st.rise, 'yoga'),
      rahu: part(RAHU[wd]), gulika: part(GULIKA[wd]), yama: part(YAMA[wd]),
      abhijit: { start: mid - half, end: mid + half }
    };
  }
  /** tithi (0-29), signs and nakshatra at sunrise, light enough to run for a whole year */
  function sunriseInfo(y, m, d, lat, lon, tz) {
    const st = sunTimes(y, m, d, lat, lon, tz), pc = panchangAt(st.rise);
    return { tithi: pc.tithi, nak: pc.nak, sunSign: pc.sunSign, moonSign: pc.moonSign, rise: st.rise, set: st.set, wd: weekday(y, m, d) };
  }
  function specialDays(y, m, d, lat, lon, tz, days) {
    const out = [];
    const base = Date.UTC(y, m - 1, d);
    for (let i = 0; i < days; i++) {
      const dt = new Date(base + i * 86400000);
      const Y = dt.getUTCFullYear(), M = dt.getUTCMonth() + 1, D = dt.getUTCDate();
      const st = sunTimes(Y, M, D, lat, lon, tz);
      const t = panchangAt(st.rise).tithi;
      let type = null;
      if (t === 10 || t === 25) type = 'ekadashi';
      else if (t === 14) type = 'purnima';
      else if (t === 29) type = 'amavasya';
      else if (t === 12 || t === 27) type = 'pradosh';
      else if (t === 18) type = 'sankashti';
      if (type) {
        if (out.length && out[out.length - 1].type === type && out[out.length - 1].i === i - 1) continue;
        out.push({ type, y: Y, m: M, d: D, i, wd: dt.getUTCDay(), tithi: t });
      }
    }
    return out;
  }

  /* ---- Ashtakoota Guna Milan ---- */
  const SIGN_LORD = SIGN_LORD_; const _unused = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
  const FRIENDS = FRIENDS_; const _unused2 = {
    Sun: { f: ['Moon', 'Mars', 'Jupiter'], e: ['Venus', 'Saturn'] },
    Moon: { f: ['Sun', 'Mercury'], e: [] },
    Mars: { f: ['Sun', 'Moon', 'Jupiter'], e: ['Mercury'] },
    Mercury: { f: ['Sun', 'Venus'], e: ['Moon'] },
    Jupiter: { f: ['Sun', 'Moon', 'Mars'], e: ['Mercury', 'Venus'] },
    Venus: { f: ['Mercury', 'Saturn'], e: ['Sun', 'Moon'] },
    Saturn: { f: ['Mercury', 'Venus'], e: ['Sun', 'Moon', 'Mars'] }
  };
  const rel = (a, b) => a === b ? 'f' : FRIENDS[a].f.includes(b) ? 'f' : FRIENDS[a].e.includes(b) ? 'e' : 'n';
  const YONI = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1];
  // 0 horse 1 elephant 2 sheep 3 serpent 4 dog 5 cat 6 rat 7 cow 8 buffalo 9 tiger 10 deer 11 monkey 12 mongoose 13 lion
  // standard Ashtakoota Yoni table: horse, elephant, sheep, serpent, dog, cat, rat, cow, buffalo, tiger, deer, monkey, mongoose, lion
  const YONI_T = [[4,2,2,3,2,2,2,1,0,1,3,3,2,1],[2,4,3,3,2,2,2,2,3,1,2,3,2,0],[2,3,4,2,1,2,1,3,3,1,2,0,3,1],[3,3,2,4,2,1,1,1,1,2,2,2,0,2],[2,2,1,2,4,2,1,2,2,1,0,2,1,1],[2,2,2,1,2,4,0,2,2,1,3,3,2,1],[2,2,1,1,1,0,4,2,2,2,2,2,1,2],[1,2,3,1,2,2,2,4,3,0,3,2,2,1],[0,3,3,1,2,2,2,3,4,1,2,2,2,1],[1,1,1,2,1,1,2,0,1,4,1,1,2,1],[3,2,2,2,0,3,2,3,2,1,4,2,2,1],[3,3,0,2,2,3,2,2,2,1,2,4,3,2],[2,2,3,0,1,2,1,2,2,2,2,3,4,2],[1,0,1,2,1,1,2,1,1,1,1,2,2,4]];
  const GANA = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0]; // 0 deva 1 manushya 2 rakshasa
  const NADI = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2];
  function varnaOf(s) { return [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0][s]; } // 0 brahmin(high) ... 3 shudra
  function vashyaOf(s, deg) {
    if (s === 8) return deg < 15 ? 1 : 0; if (s === 9) return deg < 15 ? 0 : 2;
    return [0, 0, 1, 2, 3, 1, 1, 4, 1, 0, 1, 2][s]; // 0 chatushpada 1 manava 2 jalachara 3 vanachara 4 keeta
  }
  const VASHYA = [[2, 1, 1, 0.5, 1], [1, 2, 0.5, 0, 1], [1, 0.5, 2, 1, 1], [0, 0, 0, 2, 0], [1, 1, 1, 0, 2]];
  const GANA_S = [[6, 6, 1], [5, 6, 0], [1, 0, 6]];
  function match(boy, girl) {
    const bs = boy.moonSign, gs = girl.moonSign, bn = boy.moonNak, gn = girl.moonNak;
    const r = [];
    r.push({ k: 'varna', max: 1, s: varnaOf(bs) <= varnaOf(gs) ? 1 : 0 });
    r.push({ k: 'vashya', max: 2, s: VASHYA[vashyaOf(bs, boy.moonLon % 30)][vashyaOf(gs, girl.moonLon % 30)] });
    const tara = (a, b) => { const t = ((b - a + 27) % 27) + 1, x = t % 9; return (x === 3 || x === 5 || x === 7) ? 0 : 1.5; };
    r.push({ k: 'tara', max: 3, s: tara(gn, bn) + tara(bn, gn) });
    r.push({ k: 'yoni', max: 4, s: YONI_T[YONI[bn]][YONI[gn]] });
    const lb = SIGN_LORD[bs], lg = SIGN_LORD[gs];
    let gm;
    if (lb === lg) gm = 5; else {
      const a = rel(lb, lg), b = rel(lg, lb), key = [a, b].sort().join('');
      gm = { ff: 5, fn: 4, nn: 3, ef: 1, en: 0.5, ee: 0 }[key];
    }
    r.push({ k: 'maitri', max: 5, s: gm });
    r.push({ k: 'gana', max: 6, s: GANA_S[GANA[bn]][GANA[gn]] });
    const dist = ((bs - gs + 12) % 12) + 1;
    r.push({ k: 'bhakoot', max: 7, s: [2, 12, 6, 8, 5, 9].includes(dist) ? 0 : 7 });
    r.push({ k: 'nadi', max: 8, s: NADI[bn] === NADI[gn] ? 0 : 8 });
    // classical exceptions that cancel (parihara) the two big doshas
    const bPada = boy.planets ? boy.planets[1].pada : 0, gPada = girl.planets ? girl.planets[1].pada : 0;
    const nadiCancel = NADI[bn] === NADI[gn] && ((bn === gn && bs !== gs) || (bs === gs && bn !== gn) || (bn === gn && bPada !== gPada));
    const bhakootCancel = [2, 12, 6, 8, 5, 9].includes(dist) && (lb === lg || (rel(lb, lg) === 'f' && rel(lg, lb) === 'f'));
    const bMang = boy.manglik && (boy.manglik.fromLagna || boy.manglik.fromMoon) && !boy.manglik.cancelled, gMang = girl.manglik && (girl.manglik.fromLagna || girl.manglik.fromMoon) && !girl.manglik.cancelled;
    return { rows: r, total: r.reduce((a, b) => a + b.s, 0), nadiCancel, bhakootCancel, manglikBoth: bMang && gMang, manglikOne: bMang !== gMang };
  }

  /* ---- Daily prediction from transits ---- */
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function daily(natal, y, m, d, tz) {
    const jd = jdFromLocal(y, m, d, 12, 0, tz);
    const pc = panchangAt(jd);
    const house = ((pc.moonSign - natal.moonSign + 12) % 12) + 1;
    const t = ((pc.nak - natal.moonNak + 27) % 27) % 9; // 0 janma .. 8 atimitra
    return { house, tara: t, wd: weekday(y, m, d), todayNak: pc.nak, todayMoonSign: pc.moonSign, tithi: pc.tithi, seed: hashStr(natal.key + y + '-' + m + '-' + d) };
  }

  return { sunriseInfo, panchangAt, tzFor, navamsa, dignityIn, aspectHouses, FRIENDS, jdFromLocal, jdToLocal, chart, sidereal, tropical, ascendant, ayanamsa, dayPanchang, specialDays, match, daily, sunTimes, weekday, PLANETS, DASHA_ORDER, SIGN_LORD, rel, NADI, GANA, YONI };
})();
if (typeof module !== 'undefined') module.exports = AstroEngine;
