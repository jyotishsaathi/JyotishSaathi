/* Area / locality search: 6.5 lakh villages, towns and city areas of India (India Post offices + GeoNames, CC BY 4.0),
   split into small files in loc/ that load only when needed, plus a live OpenStreetMap lookup when online. */
const LOC = (() => {
  const STATES = [["Andaman & Nicobar", "अंडमान-निकोबार"], ["Andhra Pradesh", "आंध्र प्रदेश"], ["Arunachal Pradesh", "अरुणाचल प्रदेश"], ["Assam", "असम"], ["Bihar", "बिहार"], ["Chandigarh", "चंडीगढ़"], ["Chhattisgarh", "छत्तीसगढ़"], ["Delhi", "दिल्ली"], ["Goa", "गोवा"], ["Gujarat", "गुजरात"], ["Haryana", "हरियाणा"], ["Himachal Pradesh", "हिमाचल प्रदेश"], ["Jammu & Kashmir", "जम्मू-कश्मीर"], ["Jharkhand", "झारखंड"], ["Karnataka", "कर्नाटक"], ["Kerala", "केरल"], ["Ladakh", "लद्दाख"], ["Lakshadweep", "लक्षद्वीप"], ["Madhya Pradesh", "मध्य प्रदेश"], ["Maharashtra", "महाराष्ट्र"], ["Manipur", "मणिपुर"], ["Meghalaya", "मेघालय"], ["Mizoram", "मिज़ोरम"], ["Nagaland", "नागालैंड"], ["Odisha", "ओडिशा"], ["Puducherry", "पुडुचेरी"], ["Punjab", "पंजाब"], ["Rajasthan", "राजस्थान"], ["Sikkim", "सिक्किम"], ["Tamil Nadu", "तमिलनाडु"], ["Telangana", "तेलंगाना"], ["Dadra Nagar Haveli & Daman Diu", "दादरा नगर हवेली और दमन दीव"], ["Tripura", "त्रिपुरा"], ["Uttar Pradesh", "उत्तर प्रदेश"], ["Uttarakhand", "उत्तराखंड"], ["West Bengal", "पश्चिम बंगाल"]];
  const cache = {}, ALIAS = { bangalore: 'bengaluru', bengaluru: 'bangalore', bombay: 'mumbai', mumbai: 'bombay', calcutta: 'kolkata', kolkata: 'calcutta', madras: 'chennai', chennai: 'madras',
    gurgaon: 'gurugram', gurugram: 'gurgaon', poona: 'pune', mysore: 'mysuru', mysuru: 'mysore', baroda: 'vadodara', vadodara: 'baroda', trivandrum: 'thiruvananthapuram', cochin: 'ernakulam', kochi: 'ernakulam',
    banaras: 'varanasi', benares: 'varanasi', allahabad: 'prayagraj', prayagraj: 'allahabad', noida: 'gautam buddha nagar', calicut: 'kozhikode', vizag: 'visakhapatnam', pondicherry: 'puducherry', orissa: 'odisha', newdelhi: 'delhi' };
  const norm = s => String(s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const file = k => k.replace(/[^a-z0-9]/g, '_');
  async function shard(k2) {
    if (cache[k2]) return cache[k2];
    const LOCBASE = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.siteUrl && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) ? APP_CONFIG.siteUrl.replace(/\/$/, '') + '/app/loc/' : 'loc/';
    const get = u => fetch(u).then(r => r.ok ? r.text() : '').catch(() => '');
    cache[k2] = get(LOCBASE + file(k2) + '.txt').then(t => t || get(LOCBASE + file(k2.slice(0, 1)) + '.txt')).then(t => {
      if (!t) return [];
      const lines = t.split('\n'), dists = lines[0].split('|');
      return lines.slice(1).map(l => { const [n, d, s, la, lo] = l.split('\t'); return { n, k: norm(n), d: dists[+d] || '', s: STATES[+s] || ['', ''], la: +la, lo: +lo }; });
    }).catch(() => []);
    return cache[k2];
  }
  const dist2 = (a, b) => (a.la - b.lat) ** 2 + ((a.lo - b.lon) * Math.cos(b.lat / 57.3)) ** 2;
  async function local(q, near) {
    const nq = norm(q); if (nq.length < 2) return [];
    const words = nq.split(' ');
    const rows = await shard(nq.slice(0, 2));
    // the place name is the longest leading part of the query that matches; the rest must match the district or state
    const out = [];
    for (let cut = words.length; cut >= 1; cut--) {
      const head = words.slice(0, cut).join(' '), rest = words.slice(cut);
      for (const r of rows) {
        if (!r.k.startsWith(head)) continue;
        if (rest.length) { const where = norm(r.d + ' ' + r.s[0]); if (!rest.every(w => where.includes(w) || (ALIAS[w] && where.includes(ALIAS[w])))) continue; }
        out.push({ ...r, score: (r.k === head ? 3 : 1) + (rest.length ? 2 : 0) + cut + (/urban|^central|^new delhi|^south|^north|^east|^west/i.test(r.d) ? 0.5 : 0) });
        if (out.length > 400) break;
      }
      if (out.length) break;
    }
    out.sort((a, b) => b.score - a.score || (near ? dist2(a, near) - dist2(b, near) : 0) || a.n.length - b.n.length);
    return out.slice(0, 12);
  }
  async function online(q) {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return [];
    try {
      const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 3500);
      const r = await fetch('https://photon.komoot.io/api/?limit=8&lang=en&bbox=68,6,98,37.5&q=' + encodeURIComponent(q), { signal: ctl.signal });
      clearTimeout(tm); if (!r.ok) return [];
      const j = await r.json();
      return (j.features || []).filter(f => (f.properties.countrycode || '') === 'IN' && f.properties.name).map(f => {
        const p = f.properties, [lo, la] = f.geometry.coordinates;
        return { n: p.name, d: p.city || p.district || p.county || '', s: [p.state || '', p.state || ''], la, lo, osm: true };
      });
    } catch (e) { return []; }
  }
  async function search(q, near) {
    const [a, b] = await Promise.all([local(q, near), online(q)]);
    const seen = new Set(), res = [];
    for (const r of a.slice(0, 8).concat(b, a.slice(8))) {
      const key = norm(r.n) + '|' + Math.round(r.la * 20) + '|' + Math.round(r.lo * 20);
      if (seen.has(key)) continue; seen.add(key); res.push(r);
      if (res.length >= 12) break;
    }
    return res;
  }
  const label = (r, hi) => [r.d, r.s[hi ? 1 : 0] || r.s[0]].filter(Boolean).filter((x, i, a) => a.indexOf(x) === i).join(', ');
  return { search, local, label, norm };
})();
