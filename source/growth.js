  /* =====================================================================================
     Growth features: payments & plans, festival/vrat calendar, family tithi dates, jaap counter,
     share cards, reminders, home-screen widget, WhatsApp rashifal, voice questions, naamkaran,
     yearly report, calculation details, Vastu checklist, Marathi/Gujarati menus, usage stats.
     (This block is inserted inside app.js by build.py, so it shares S, V, render, pick, ... )
     ===================================================================================== */
  const GT = {
    tyohar: ['Festivals & vrat', 'त्योहार और व्रत'], tyoharSub: ['Vrat days, festivals and family tithi dates, with reminders', 'व्रत, त्योहार और परिवार की तिथियाँ, याद दिलाने के साथ'],
    jaap: ['Jaap counter', 'जाप माला'], jaapSub: ['Count your mantra jaap, 108 beads, daily streak', 'मंत्र जाप गिनें, 108 मनके, रोज़ की लगातार गिनती'],
    naam: ['Baby names', 'बच्चे का नाम'], naamSub: ['Lucky first letter from the nakshatra, with names', 'नक्षत्र से शुभ पहला अक्षर और नाम'],
    year: ['Year ahead', 'आने वाला साल'], yearSub: ['Month-by-month guidance for the whole year', 'पूरे साल का महीने-दर-महीने मार्गदर्शन'],
    wa: ['WhatsApp rashifal', 'WhatsApp राशिफल'], waSub: ['Rashifal on WhatsApp every morning', 'हर सुबह WhatsApp पर राशिफल'],
    upcoming: ['Upcoming', 'आने वाले'], famDates: ['Family dates', 'परिवार की तिथियाँ'], reminders: ['Reminders', 'याद दिलाएँ'],
    readKatha: ['Read the katha', 'कथा पढ़ें'], listenKatha: ['Listen to the katha', 'कथा सुनें'], todayIs: ['Today', 'आज'], tomorrowIs: ['Tomorrow', 'कल'], inDays: ['in {n} days', '{n} दिन में'],
    calNote: ['Dates follow the sunrise tithi for your city. Some festivals are kept at night or moonrise, so your local calendar may differ by a day.', 'तिथियाँ आपके शहर के सूर्योदय की तिथि से हैं। कुछ त्योहार रात या चंद्रोदय पर मनाए जाते हैं, इसलिए स्थानीय पंचांग में एक दिन का अंतर हो सकता है।'],
    adhik: ['Adhik maas', 'अधिक मास'], shukla: ['Shukla', 'शुक्ल'], krishna: ['Krishna', 'कृष्ण'],
    addDate: ['Add a date', 'तिथि जोड़ें'], dName: ['Name', 'नाम'], dKind: ['Type', 'प्रकार'], dDate: ['Date it happened (English calendar)', 'घटना की तारीख़ (अंग्रेज़ी कैलेंडर)'],
    kinds: { bday: ['Birthday (by tithi)', 'जन्मदिन (तिथि से)'], shraddh: ['Shraddh / Punyatithi', 'श्राद्ध / पुण्यतिथि'], anniv: ['Anniversary (by tithi)', 'सालगिरह (तिथि से)'] },
    dFree: ['Free: up to {n} dates. Premium: unlimited.', 'मुफ़्त: {n} तिथियाँ तक। प्रीमियम: असीमित।'],
    nextOn: ['Next: {d}', 'अगली बार: {d}'], tithiOf: ['{m} {p} {t}', '{m} {p} {t}'], noDates: ['Add birthdays and shraddh dates by Hindu tithi. The app works out the English date every year.', 'जन्मदिन और श्राद्ध की तिथि हिंदू पंचांग से जोड़ें। ऐप हर साल अंग्रेज़ी तारीख़ खुद निकाल देगा।'],
    remOn: ['Remind me', 'याद दिलाएँ'], remDaily: ['Daily rashifal at 7 am', 'रोज़ सुबह 7 बजे राशिफल'], remVrat: ['Vrat & festivals (evening before)', 'व्रत और त्योहार (एक शाम पहले)'], remDates: ['Family tithi dates', 'परिवार की तिथियाँ'],
    remApp: ['Reminders work in the Android app.', 'याद दिलाना Android ऐप में काम करता है।'], remSet: ['Reminders set ✓', 'याद दिलाना चालू ✓'],
    jaapTap: ['Tap to count', 'गिनने के लिए टैप करें'], jaapMala: ['Malas', 'माला'], jaapToday: ['Today', 'आज'], jaapStreak: ['Day streak', 'लगातार दिन'], jaapTotal: ['Total', 'कुल'],
    jaapReset: ['Reset', 'फिर से'], jaapDone: ['🙏 One mala complete!', '🙏 एक माला पूरी!'], jaapPick: ['Mantra', 'मंत्र'], jaapGoal: ['Daily goal: 1 mala (108)', 'रोज़ का लक्ष्य: 1 माला (108)'],
    shareCard: ['Share card', 'कार्ड भेजें'], making: ['Making your card…', 'कार्ड बन रहा है…'], cardFoot: ['Free on Jyotish Saathi', 'ज्योतिष साथी पर मुफ़्त'],
    sunoBig: ['Listen to today\'s rashifal', 'आज का राशिफल सुनें'], askVoice: ['Ask by voice', 'बोलकर पूछें'], listening: ['Listening… speak now', 'सुन रहे हैं… अब बोलिए'],
    noMic: ['Voice questions work in Chrome and in the Android app.', 'बोलकर पूछना Chrome और Android ऐप में काम करता है।'], heard: ['You asked: “{q}”', 'आपने पूछा: “{q}”'],
    aiPrem: ['Your own questions are answered by Jyotish Sahayak in Premium. Today\'s and tomorrow\'s rashifal are free.', 'आपके अपने सवालों का जवाब प्रीमियम में ज्योतिष सहायक देता है। आज और कल का राशिफल मुफ़्त है।'],
    naamFor: ['For', 'किसके लिए'], naamLetters: ['Lucky first letters', 'शुभ पहले अक्षर'], naamMain: ['Main letter (from moon nakshatra pada)', 'मुख्य अक्षर (चंद्र नक्षत्र के चरण से)'],
    boys: ['Boys', 'लड़के'], girls: ['Girls', 'लड़कियाँ'], naamMore: ['See all {n} names with meanings', 'अर्थ सहित सभी {n} नाम देखें'], naamTip: ['Add the baby as a family member (with birth time) to see their letters.', 'बच्चे को परिवार में जोड़ें (जन्म समय के साथ), फिर उसके अक्षर देखें।'],
    yearTitle: ['{y}: month by month', '{y}: महीने-दर-महीने'], yearFree: ['Free preview: overview and the first two months', 'मुफ़्त झलक: सारांश और पहले दो महीने'], yearUnlock: ['Unlock all 12 months + PDF', 'सभी 12 महीने + PDF खोलें'],
    yearOverview: ['Overview', 'सारांश'], yearBest: ['Best months', 'सबसे अच्छे महीने'], yearCare: ['Take care in', 'इनमें सावधानी'], pdfYear: ['Download PDF', 'PDF डाउनलोड करें'],
    waTitle: ['Rashifal on WhatsApp', 'WhatsApp पर राशिफल'], waFree: ['Free: send “Rashifal” to our WhatsApp number any time and get today\'s rashifal back.', 'मुफ़्त: किसी भी समय हमारे WhatsApp नंबर पर “Rashifal” भेजें और आज का राशिफल पाएँ।'],
    waPrem: ['Premium: we send it to you every morning at 7 am, for the whole family.', 'प्रीमियम: हम हर सुबह 7 बजे पूरे परिवार का राशिफल भेजेंगे।'], waOn: ['Daily message is ON', 'रोज़ का संदेश चालू है'], waTurnOn: ['Turn on daily message', 'रोज़ का संदेश चालू करें'], waTurnOff: ['Turn off', 'बंद करें'],
    waOpen: ['Send “Rashifal” now', 'अभी “Rashifal” भेजें'], waLogin: ['Log in with your WhatsApp number first.', 'पहले अपने WhatsApp नंबर से लॉगिन करें।'], waNoServer: ['WhatsApp messages start once the app\'s server is set up.', 'ऐप का सर्वर चालू होने पर WhatsApp संदेश शुरू होंगे।'],
    calc: ['Calculation details', 'गणना का विवरण'], calcSub: ['Exact numbers behind this kundli, for anyone who wants to check', 'इस कुंडली के पीछे के सटीक आँकड़े, जाँचने वालों के लिए'],
    ayan: ['Ayanamsa (Lahiri)', 'अयनांश (लाहिड़ी)'], jd: ['Julian day', 'जूलियन दिन'], tzl: ['Time zone used', 'समय क्षेत्र'], coords: ['Place', 'स्थान'], asc: ['Lagna degree', 'लग्न अंश'], sidLon: ['Sidereal longitude', 'निरयण अंश'],
    calcNote: ['Planets from standard astronomical formulas (accurate to a fraction of a degree), Lahiri ayanamsa, whole-sign houses.', 'ग्रह मानक खगोलीय सूत्रों से (एक अंश के छोटे भाग तक सटीक), लाहिड़ी अयनांश, पूर्ण राशि भाव।'],
    vchk: ['Vastu checklist', 'वास्तु जाँच सूची'], vchkSub: ['Answer 12 quick questions about your home', 'घर के बारे में 12 आसान सवालों के जवाब दें'], yes: ['Yes', 'हाँ'], no: ['No', 'नहीं'],
    vscore: ['Your Vastu score', 'आपका वास्तु स्कोर'], vtips: ['What to improve', 'क्या सुधारें'], vgood: ['Very good! Keep the home clean and bright.', 'बहुत अच्छा! घर को साफ़ और रोशन रखें।'],
    palmTips: ['For a clear reading', 'साफ़ पढ़ाई के लिए'], palmTipList: [['Sit in daylight or under a bright light, no shadow on the palm', 'दिन की रोशनी या तेज़ बत्ती में बैठें, हथेली पर छाया न हो'], ['Keep the palm flat and fingers slightly apart', 'हथेली सीधी रखें और उँगलियाँ थोड़ी खुली'], ['Fill the photo with the palm, wrist to finger tips', 'कलाई से उँगलियों तक पूरी हथेली फ़ोटो में आए'], ['Hold the phone still for a second before taking the photo', 'फ़ोटो लेने से पहले फ़ोन एक पल स्थिर रखें']],
    langMore: ['More languages', 'और भाषाएँ'], langBeta: ['Menus in Marathi and Gujarati; predictions in Hindi for now.', 'मराठी और गुजराती में मेनू; भविष्यवाणी अभी हिंदी में।'],
    voiceG: ['Voice', 'आवाज़'], female: ['Female', 'महिला'], male: ['Male', 'पुरुष'],
    // plans & purchases
    single: ['Just me', 'सिर्फ़ मैं'], parivaar: ['Parivaar plan', 'परिवार योजना'], parivaarSub: ['Premium for you + {n} family numbers', 'आप + परिवार के {n} नंबरों के लिए प्रीमियम'],
    famMembers: ['Family members on your plan', 'आपकी योजना में परिवार'], famAdd: ['Add number', 'नंबर जोड़ें'], famPh: ['Their WhatsApp number', 'उनका WhatsApp नंबर'], famVia: ['Premium through your family plan (by {p})', 'परिवार योजना से प्रीमियम ({p} द्वारा)'],
    gift: ['Gift Premium', 'प्रीमियम उपहार दें'], giftSub: ['Pay from your phone, send a gift code to Mummy-Papa on WhatsApp', 'अपने फ़ोन से भुगतान करें, गिफ़्ट कोड WhatsApp पर मम्मी-पापा को भेजें'],
    gift1: ['1 month · ₹{p}', '1 महीना · ₹{p}'], gift12: ['1 year · ₹{p}', '1 साल · ₹{p}'], giftDone: ['Gift code: {c}', 'गिफ़्ट कोड: {c}'], giftSend: ['Send on WhatsApp', 'WhatsApp पर भेजें'],
    giftMsg: ['🎁 I have gifted you Jyotish Saathi Premium! Open the app → 👑 Premium → Redeem gift code → {c}', '🎁 मैंने आपको ज्योतिष साथी प्रीमियम उपहार में दिया है! ऐप खोलें → 👑 प्रीमियम → गिफ़्ट कोड डालें → {c}'],
    redeem: ['Redeem gift code', 'गिफ़्ट कोड डालें'], redeemOk: ['🎉 Premium is on!', '🎉 प्रीमियम चालू हो गया!'], codePh: ['GIFT…', 'GIFT…'],
    buyOnce: ['Buy once · ₹{p}', 'एक बार खरीदें · ₹{p}'], orPrem: ['or get everything with Premium', 'या प्रीमियम में सब कुछ पाएँ'], paid: ['✓ Payment received. Thank you!', '✓ भुगतान मिल गया। धन्यवाद!'],
    payFail: ['Payment did not go through. No money was taken, or it will be refunded automatically.', 'भुगतान पूरा नहीं हुआ। पैसे नहीं कटे, या अपने आप वापस आ जाएँगे।'], payLogin: ['Please log in with your WhatsApp number to buy.', 'खरीदने के लिए अपने WhatsApp नंबर से लॉगिन करें।'],
    payWait: ['Opening payment…', 'भुगतान खुल रहा है…'], restore: ['Restore purchases', 'पुरानी ख़रीद वापस लाएँ'],
    errs: { bad_code: ['That code is not valid.', 'यह कोड सही नहीं है।'], used: ['This code has already been used.', 'यह कोड पहले ही इस्तेमाल हो चुका है।'], already_yours: ['You have already used this code.', 'आप यह कोड पहले ही इस्तेमाल कर चुके हैं।'], family_full: ['Your family plan is full.', 'आपकी परिवार योजना भर चुकी है।'], in_other_family: ['This number is in another family plan.', 'यह नंबर किसी और परिवार योजना में है।'], bad_phone: ['Please check the number.', 'कृपया नंबर जाँचें।'], family_plan_required: ['This needs the Parivaar plan.', 'इसके लिए परिवार योजना चाहिए।'] },
    muFree: ['Free: the next best date. See the full list with Premium or buy this list once.', 'मुफ़्त: अगली सबसे अच्छी तिथि। पूरी सूची प्रीमियम में या एक बार ख़रीदकर देखें।'], muMore: ['{n} more good dates', '{n} और शुभ तिथियाँ'],
  };
  Object.assign(GT, {
    home: ['Home', 'होम'], goodMorning: ['Good morning', 'सुप्रभात'], goodAfternoon: ['Good afternoon', 'नमस्कार'], goodEvening: ['Good evening', 'शुभ संध्या'],
    yourDay: ['Your day', 'आपका दिन'], atGlance: ['Today at a glance', 'आज एक नज़र में'], nowTime: ['Right now', 'अभी का समय'], rahuNow: ['Rahu Kaal is on now, till {t}. Avoid starting new work.', 'अभी राहु काल चल रहा है, {t} तक। नया काम शुरू न करें।'],
    rahuLater: ['Rahu Kaal today: {a} – {b}', 'आज राहु काल: {a} – {b}'], rahuDone: ['Rahu Kaal is over for today. Good time for work.', 'आज का राहु काल बीत गया। काम के लिए अच्छा समय।'],
    abhiNow: ['Abhijit muhurat now – a very good time!', 'अभी अभिजीत मुहूर्त है – बहुत शुभ समय!'], famToday: ['Family today', 'परिवार का आज'], quick: ['Open', 'खोलें'],
    mantraDay: ['Mantra for today', 'आज का मंत्र'], startJaap: ['Start jaap', 'जाप शुरू करें'], streak: ['{n}-day jaap streak 🔥', '{n} दिन से लगातार जाप 🔥'], nextFest: ['Coming up', 'आने वाला'],
    sunTimes: ['Sunrise {a} · Sunset {b}', 'सूर्योदय {a} · सूर्यास्त {b}'], askSaathi: ['Ask Saathi', 'साथी से पूछें'],
    vaTitle: ['Ask Saathi', 'साथी से पूछें'], vaSub: ['Tap the mic and speak, or type your question.', 'माइक दबाकर बोलिए, या सवाल लिखिए।'], vaType: ['Type your question…', 'अपना सवाल लिखें…'], vaSend: ['Ask', 'पूछें'],
    vaChips: [['How is my day today?', 'आज मेरा दिन कैसा है?'], ['How will tomorrow be?', 'कल कैसा रहेगा?'], ['Is there a vrat coming?', 'कोई व्रत आने वाला है?'], ['When is Rahu Kaal today?', 'आज राहु काल कब है?'], ['Which colour is lucky today?', 'आज शुभ रंग कौन सा है?']],
    vaMicOff: ['The microphone is not available here. Please type your question instead.', 'यहाँ माइक काम नहीं कर रहा। कृपया सवाल लिखकर पूछें।'],
    addBaby: ['Add baby\'s birth details', 'बच्चे का जन्म विवरण जोड़ें'], pickSyl: ['Tap a letter to see its names', 'नाम देखने के लिए अक्षर पर टैप करें'], namesWith: ['Names starting with “{s}”', '“{s}” से शुरू होने वाले नाम'],
    noNamesSyl: ['Few names start with “{s}”. Names with a similar sound:', '“{s}” से कम नाम बनते हैं। मिलती आवाज़ वाले नाम:'], babyFor: ['Showing for', 'किसके लिए'],
    cardReady: ['Your card is ready', 'आपका कार्ड तैयार है'], cardHow: ['Press and hold the picture to save or share it, or use the buttons.', 'तस्वीर को दबाकर रखें, सेव या शेयर करें, या नीचे के बटन इस्तेमाल करें।'], download: ['Download', 'डाउनलोड'], shareNow: ['Share', 'भेजें'],
    saathiVoice: ['Saathi voice', 'साथी की आवाज़'], allJaap: ['All', 'सभी'],
  });
  const g = k => pick(GT[k]);
  const go2 = () => { ANIM = true; render(); window.scrollTo(0, 0); };
  const Cap = () => (window.Capacitor && window.Capacitor.Plugins) || {};
  const serverOn = () => !!(CFG.apiBase && CFG.apiBase !== 'demo');
  const demoMode = () => CFG.apiBase === 'demo' || CFG.showPremiumTest;
  const ymd = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
  const addDays = (o, n) => { const dt = new Date(Date.UTC(o.y, o.m - 1, o.d) + n * 86400000); return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }; };
  const daysBetween = (a, b) => Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000);

  /* ---------------- usage stats & crash reports (only when a server is set) ---------------- */
  const EVQ = {};
  const ev = name => { if (!serverOn()) return; EVQ[name] = (EVQ[name] || 0) + 1; };
  const evFlush = () => {
    if (!serverOn() || !Object.keys(EVQ).length) return;
    const body = JSON.stringify({ ev: { ...EVQ } }); Object.keys(EVQ).forEach(k => delete EVQ[k]);
    try { navigator.sendBeacon ? navigator.sendBeacon(CFG.apiBase.replace(/\/$/, '') + '/api/ev', new Blob([body], { type: 'application/json' })) : fetch(CFG.apiBase.replace(/\/$/, '') + '/api/ev', { method: 'POST', body, keepalive: true }); } catch (e) { }
  };
  setInterval(evFlush, 60000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) evFlush(); });
  let errSent = 0;
  window.addEventListener('error', e => {
    if (!serverOn() || errSent++ > 5) return;
    try { fetch(CFG.apiBase.replace(/\/$/, '') + '/api/err', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ msg: e.message, src: String(e.filename || '').split('/').pop(), line: e.lineno, ver: CFG.version || '' }) }); } catch (x) { }
  });

  /* ---------------- regional languages (menus only) ---------------- */
  const RG = () => (S.lang === 'mr' || S.lang === 'gu') ? GX.rg[S.lang] : null;

  /* ---------------- entitlements & payments ---------------- */
  const PRICE = { prem_m: CFG.priceMonthly || 99, prem_y: CFG.priceYearly || 499, fam_m: CFG.priceFamilyMonthly || 149, fam_y: CFG.priceFamilyYearly || 799, report_year: CFG.priceReport || 99, muhurat: CFG.priceMuhurat || 51, naam: CFG.priceNaam || 49, gift_m: CFG.priceMonthly || 99, gift_y: CFG.priceYearly || 499 };
  const PLAY = { prem_m: ['premium_monthly', 'subs', 'monthly'], prem_y: ['premium_yearly', 'subs', 'yearly'], fam_m: ['parivaar_monthly', 'subs', 'monthly'], fam_y: ['parivaar_yearly', 'subs', 'yearly'], report_year: ['report_year', 'inapp'], muhurat: ['muhurat_pack', 'inapp'], naam: ['naamkaran_full', 'inapp'], gift_m: ['gift_month', 'inapp'], gift_y: ['gift_year', 'inapp'] };
  const hasItem = (item, key) => isPremium() || (S.items || []).some(x => x.item === item && (x.k === key || x.k === '*') && (!x.until || x.until > Date.now()));
  function applyEnt(r) {
    if (!r) return;
    if ('premium' in r) S.serverPremium = !!r.premium;
    if (r.items) S.items = r.items; if ('plan' in r) S.plan = r.plan; if (r.family) S.family = r.family; if ('familyOwner' in r) S.familyOwner = r.familyOwner; if ('waDaily' in r) S.waDaily = r.waDaily;
    persist();
  }
  let payCfg = null;
  async function getPayCfg() { if (payCfg) return payCfg; try { payCfg = await (await fetch(CFG.apiBase.replace(/\/$/, '') + '/api/pay/config')).json(); } catch (e) { payCfg = {}; } return payCfg; }
  function loadRzp() { return window.Razorpay ? Promise.resolve() : loadScript('https://checkout.razorpay.com/v1/checkout.js'); }
  /** Buy a product (plans, one-time items, gifts). key = which person/event a one-time item is for. */
  async function buy(product, key) {
    document.querySelectorAll('.sheet-bg').forEach(x => x.remove());
    ev('buy.tap.' + product);
    if (demoMode() || !serverOn()) {   // preview mode: unlock on the phone only
      if (!serverOn() && !demoMode()) { S.notify = true; persist(); render(); toast(t('notified')); return; }
      const P = PLAY[product];
      if (product.startsWith('prem') || product.startsWith('fam')) { S.premium = true; S.plan = product.startsWith('fam') ? 'family' : 'single'; }
      else if (product.startsWith('gift')) { giftShow('GIFTDEMO1'); }
      else { S.items = (S.items || []).concat([{ item: product, k: key || '*', until: product === 'muhurat' ? Date.now() + 60 * 86400e3 : 0 }]); }
      persist(); render(); toast(g('paid')); return P;
    }
    if (!(S.user && S.user.token)) { toast(g('payLogin')); return; }
    const NP = Cap().NativePurchases;
    try {
      let r;
      if (isNative() && NP) {
        const [pid, type, plan] = PLAY[product];
        const res = await NP.purchaseProduct({ productIdentifier: pid, productType: type, ...(plan ? { planIdentifier: CFG.playPlans && CFG.playPlans[product] || plan } : {}), quantity: 1 });
        if (!res || !res.purchaseToken) throw new Error('cancel');
        r = await api('/api/play/verify', { token: S.user.token, product: pid, purchaseToken: res.purchaseToken, key });
        if (r.ok && type === 'inapp' && NP.consumePurchase) { try { await NP.consumePurchase({ purchaseToken: res.purchaseToken }); } catch (e) { } }
      } else {
        const pc = await getPayCfg();
        if (!pc.razorpay && !(pc.play && CFG.apiBase)) { S.notify = true; persist(); render(); toast(t('notified')); return; }
        toast(g('payWait'));
        const o = await api('/api/pay/order', { token: S.user.token, product, key });
        if (!o.ok) throw new Error(o.error || 'pay');
        let pay;
        if (o.dev) pay = { razorpay_order_id: o.orderId, razorpay_payment_id: 'pay_dev_' + Date.now(), razorpay_signature: '' };
        else {
          await loadRzp();
          pay = await new Promise((res, rej) => {
            const rz = new window.Razorpay({ key: o.keyId, order_id: o.orderId, amount: o.amount, currency: 'INR', name: t('appName'), description: product,
              prefill: { contact: (S.user.phone || '').replace(/\D/g, '') }, theme: { color: '#7B1E2B' }, handler: res, modal: { ondismiss: () => rej(new Error('cancel')) } });
            rz.on('payment.failed', () => rej(new Error('failed'))); rz.open();
          });
        }
        r = await api('/api/pay/verify', { token: S.user.token, orderId: pay.razorpay_order_id, paymentId: pay.razorpay_payment_id, signature: pay.razorpay_signature, product, key });
      }
      if (!r || !r.ok) throw new Error((r && r.error) || 'failed');
      applyEnt(r.ent); ev('buy.ok.' + product);
      if (r.giftCode) giftShow(r.giftCode);
      render(); toast(g('paid'));
    } catch (e) {
      if (String(e.message || e) !== 'cancel') toast(g('payFail'));
    }
  }
  function giftShow(code) {
    const msg = pick(GT.giftMsg).replace('{c}', code);
    const d = document.createElement('div'); d.className = 'sheet-bg';
    d.innerHTML = `<div class="sheet center"><div class="grab"></div><div class="crown3d sm">🎁</div><h2>${pick(GT.giftDone).replace('{c}', `<b class="gcode">${code}</b>`)}</h2>
      <a class="btn wa block" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${ICON.wa}<span>${g('giftSend')}</span></a>
      <button class="btn link block" data-x="close">${t('ok')}</button></div>`;
    d.onclick = e => { const x = e.target.closest('[data-x]'); if (e.target === d || x) d.remove(); };
    document.body.appendChild(d);
  }
  async function redeemGift() {
    const i = $('#giftCode'), code = i && i.value.trim(); if (!code) return;
    if (demoMode()) { S.premium = true; persist(); render(); toast(g('redeemOk')); return; }
    if (!(S.user && S.user.token)) { toast(g('payLogin')); return; }
    const r = await api('/api/gift/redeem', { token: S.user.token, code }).catch(() => ({}));
    if (r.ok) { applyEnt(r.ent); render(); toast(g('redeemOk')); } else toast(pick((GT.errs[r.error]) || GT.payFail));
  }
  async function famChange(op, phone) {
    const num = phone || (($('#famPhone') || {}).value || '').trim(); if (!num) return;
    if (demoMode()) { S.family = op === 'add' ? (S.family || []).concat(['+' + num.replace(/\D/g, '')]) : (S.family || []).filter(x => x !== num); persist(); render(); return; }
    const r = await api('/api/family/' + op, { token: S.user && S.user.token, phone: num }).catch(() => ({}));
    if (r.ok) { applyEnt(r.ent); render(); } else toast(pick((GT.errs[r.error]) || GT.payFail));
  }
  /** One-time unlock box shown under a locked preview */
  const unlockBox = (product, key, title) => `<section class="card center prem-lock"><div class="crown3d sm">🔓</div><h3>${title}</h3>
    <button class="btn gold block" data-a="gBuy" data-v="${product}" data-k="${esc(key || '')}">${pick(GT.buyOnce).replace('{p}', PRICE[product])}</button>
    <button class="btn link block" data-a="paywall">👑 ${g('orPrem')}</button></section>`;

  /* ---------------- lunar calendar (sunrise tithi, amanta months) ---------------- */
  const CALC = {};
  function lunarDays(from, n) {   // [{y,m,d,tithi,mon,adhik,sunSign,wd}], months found from the new moons
    const pl = place(), key = [ymd(from.y, from.m, from.d), n, pl.lat, pl.lon].join('|');
    if (CALC[key]) return CALC[key];
    const start = addDays(from, -40), out = [];
    let mon = null, adhik = false, prev = null;
    for (let i = 0; i < n + 40; i++) {
      const dt = addDays(start, i), si = E.sunriseInfo(dt.y, dt.m, dt.d, pl.lat, pl.lon, pl.tz);
      if (prev && si.tithi < prev.tithi - 15) {   // a new moon happened since yesterday's sunrise
        const nm = (si.sunSign - 11 + 12) % 12;
        adhik = nm === mon; mon = nm;
      }
      prev = si;
      if (mon !== null && i >= 40) {
        const night = 1 - (si.set - si.rise), tt = jd => E.panchangAt(jd).tithi;
        out.push({ ...dt, tithi: si.tithi, mon, adhik, sunSign: si.sunSign, wd: si.wd, tset: tt(si.set), tmoon: tt(si.set + 0.1), tmid: tt(si.set + night / 2) });
      }
      if (mon === null && i === 39) { // no new moon in 40 days cannot happen; safety
        mon = (si.sunSign - 11 + 12) % 12;
      }
    }
    CALC[key] = out; return out;
  }
  function tithiName(ti) { return ti === 29 ? pick(C.tithi[15]) : pick(C.tithi[ti === 14 ? 14 : ti % 15]); }
  function lunarLabel(x) { return `${pick(GX.months[x.mon])}${x.adhik ? ' (' + g('adhik') + ')' : ''} · ${x.tithi < 15 ? g('shukla') : g('krishna')} ${tithiName(x.tithi)}`; }
  /** Festivals and vrats in the next n days */
  function festivals(n = 370) {
    const t0 = todayYMD(), days = lunarDays(t0, n), out = [];
    const seen = {};
    days.forEach((x, i) => {
      const prevx = days[i - 1];
      // monthly vrats
      Object.entries(GX.vrat).forEach(([k, v]) => {
        const tk = { set: 'tset', moon: 'tmoon', mid: 'tmid' }[GX.rule[k]] || 'tithi';
        if (!v.tithi.includes(x[tk]) || (prevx && prevx[tk] === x[tk])) return;
        let name = v.n;
        if (k === 'ekadashi') { const e = GX.ekadashi[x.mon][x.tithi < 15 ? 0 : 1]; name = [e[0] + ' Ekadashi', e[1] + ' एकादशी']; }
        out.push({ ...x, tithi: x[tk], i, kind: 'vrat', id: k, icon: v.icon, n: name, katha: v.katha });
      });
      // lunar festivals (kshaya: if yesterday was the tithi before and today is the tithi after, keep it yesterday)
      GX.fest.forEach(f => {
        const [id, mon, ti, icon, n, katha] = f, k = id + x.y + (x.m > 6 ? 'b' : 'a');
        if (seen[id + '|' + x.y + '|' + mon] || x.adhik || x.mon !== mon) return;
        if (id === 'holi') return;   // the day after Holika Dahan, added below
        const tk = { set: 'tset', moon: 'tmoon', mid: 'tmid' }[GX.rule[id]] || 'tithi';
        const hit = x[tk] === ti || (prevx && (prevx.mon === mon || ti === 0) && prevx[tk] === (ti + 29) % 30 && x[tk] === (ti + 1) % 30);
        if (!hit) return;
        seen[id + '|' + x.y + '|' + mon] = 1;
        const at = x[tk] === ti || ti === 0 ? x : prevx;   // a skipped tithi is kept on the day it begins (Pratipada: the next day)
        if (id === 'holika' && days[days.indexOf(at) + 1]) { const h = days[days.indexOf(at) + 1], hf = GX.fest.find(z => z[0] === 'holi'); out.push({ ...h, tithi: 15, i: daysBetween(t0, h), kind: 'fest', id: 'holi', icon: hf[3], n: hf[4] }); }
        if (!at || daysBetween(t0, at) < 0) return;
        out.push({ ...at, tithi: ti, i: daysBetween(t0, at), kind: 'fest', id, icon, n, katha });
      });
      // solar festivals
      if (prevx) GX.solar.forEach(([id, sign, icon, n]) => { if (x.sunSign === sign && prevx.sunSign !== sign) out.push({ ...x, i, kind: 'fest', id, icon, n }); });
    });
    // a vrat that is also a named festival: keep the festival
    const fk = new Set(out.filter(x => x.kind === 'fest').map(x => ymd(x.y, x.m, x.d) + (x.katha || '')));
    return out.filter(x => x.kind === 'fest' || !fk.has(ymd(x.y, x.m, x.d) + (x.katha || ''))).sort((a, b) => a.i - b.i || (a.kind === 'fest' ? -1 : 1));
  }
  /** Lunar month + tithi of a past English date, and its next yearly return */
  function tithiOfDate(dt) {
    const arr = lunarDays(addDays(dt, -1), 3); return arr.find(x => x.y === dt.y && x.m === dt.m && x.d === dt.d) || arr[1];
  }
  function nextTithi(td) {
    const lt = tithiOfDate(td), t0 = todayYMD(), days = lunarDays(t0, 400);
    let hit = days.find(x => !x.adhik && x.mon === lt.mon && x.tithi === lt.tithi);
    if (!hit) hit = days.find((x, i) => !x.adhik && x.mon === lt.mon && days[i - 1] && days[i - 1].tithi === (lt.tithi + 29) % 30 && x.tithi === (lt.tithi + 1) % 30);
    return { lt, next: hit };
  }

  /* ---------------- screen: festivals, vrats, family tithi dates ---------------- */
  V.ty = V.ty || { mode: 'list', open: null };
  function screenTyohar() {
    const list = festivals(), t0 = todayYMD(), mode = V.ty.mode;
    const when = x => x.i === 0 ? g('todayIs') : x.i === 1 ? g('tomorrowIs') : pick(GT.inDays).replace('{n}', x.i);
    const row = (x, idx) => `<section class="card fest-row ${x.i <= 1 ? 'soon' : ''}"><div class="sdate"><b>${x.d}</b><span>${pick(C.months[x.m - 1]).slice(0, L() ? 6 : 3)}</span></div>
      <div class="fr-main"><b>${x.icon} ${pick(x.n)}</b><small>${pick(C.wd[x.wd])} · ${lunarLabel(x)} · ${when(x)}</small>
      ${x.katha ? `<button class="btn link sm" data-a="kathaOpen" data-v="${x.katha}">📖 ${g('readKatha')}</button>` : ''}</div></section>`;
    const seg = `<div class="seg"><button data-a="tyMode" data-v="list" class="${mode === 'list' ? 'on' : ''}">🪔 ${g('upcoming')}</button><button data-a="tyMode" data-v="dates" class="${mode === 'dates' ? 'on' : ''}">👨‍👩‍👧 ${g('famDates')}</button><button data-a="tyMode" data-v="rem" class="${mode === 'rem' ? 'on' : ''}">🔔 ${g('reminders')}</button></div>`;
    let body = '';
    if (V.ty.open) {
      const k = GX.katha[V.ty.open];
      body = `<button class="btn link" data-a="kathaClose">${ICON.left}${t('back')}</button><section class="card katha"><h2>📖 ${pick(k.t)}</h2>
        <button class="btn primary block" data-a="kathaSpeak" data-v="${V.ty.open}">${ICON.speaker}<span>${V.speaking === 'katha' ? t('stop') : g('listenKatha')}</span></button>
        <p class="lead katha-t">${pick(k.x)}</p></section>`;
      return `${backMore()}<h2 class="ptitle">🪔 ${g('tyohar')}</h2>${body}`;
    }
    if (mode === 'list') {
      const fest = list.filter(x => x.kind === 'fest').slice(0, 40), vr = list.filter(x => x.kind === 'vrat' && x.i <= 45);
      body = `<h3 class="sec-h">🎉 ${pick(['Festivals', 'त्योहार'])}</h3>${fest.map(row).join('')}<h3 class="sec-h">🙏 ${pick(['Vrat in the next 45 days', 'अगले 45 दिन के व्रत'])}</h3>${vr.map(row).join('')}<p class="muted small">${g('calNote')}</p>`;
    } else if (mode === 'dates') {
      const td = S.tdates || [], lim = isPremium() ? 99 : (CFG.freeTithiDates || 5);
      body = `${td.length ? td.map(x => { const r = nextTithi(x); return `<section class="card fest-row"><div class="sdate"><b>${r.next ? r.next.d : '–'}</b><span>${r.next ? pick(C.months[r.next.m - 1]).slice(0, L() ? 6 : 3) : ''}</span></div>
          <div class="fr-main"><b>${x.kind === 'shraddh' ? '🪔' : x.kind === 'anniv' ? '💐' : '🎂'} ${esc(x.name)}</b><small>${pick(GT.kinds[x.kind])} · ${lunarLabel(r.lt)}</small>
          <small>${r.next ? pick(GT.nextOn).replace('{d}', fmtDate(r.next.y, r.next.m, r.next.d, true)) : ''}</small></div><button class="xbtn" data-a="tdDel" data-v="${x.id}" aria-label="${t('del')}">✕</button></section>`; }).join('') : `<section class="card"><p>${g('noDates')}</p></section>`}
        ${td.length < lim ? `<form class="card form" id="tdForm"><h3>➕ ${g('addDate')}</h3>
          <label class="fl">${g('dName')}<input id="tdName" maxlength="40" required></label>
          <label class="fl">${g('dKind')}<select id="tdKind">${Object.entries(GT.kinds).map(([k, v]) => `<option value="${k}">${pick(v)}</option>`).join('')}</select></label>
          <label class="fl">${g('dDate')}<input id="tdDate" type="date" required max="${ymd(t0.y, t0.m, t0.d)}"></label>
          <button class="btn primary block">${pick(['Save', 'सहेजें'])}</button></form>` : `<section class="card center"><p>${pick(GT.dFree).replace('{n}', lim)}</p><button class="btn gold" data-a="paywall">👑 ${pick(P_.unlock)}</button></section>`}
        <p class="muted small">${pick(GT.dFree).replace('{n}', CFG.freeTithiDates || 5)}</p>`;
    } else {
      const R = S.remind || {};
      const sw = (k, label) => `<div class="area"><span>${label}</span><div class="seg sm mini"><button data-a="remSet" data-v="${k}:1" class="${R[k] ? 'on' : ''}">${pick(LG.on)}</button><button data-a="remSet" data-v="${k}:0" class="${!R[k] ? 'on' : ''}">${pick(LG.off)}</button></div></div>`;
      body = `<section class="card"><h3>🔔 ${g('reminders')}</h3>${sw('daily', g('remDaily'))}${sw('vrat', g('remVrat'))}${sw('dates', g('remDates'))}
        ${isNative() ? '' : `<p class="muted small">${g('remApp')}</p>`}</section>`;
    }
    return `${backMore()}<h2 class="ptitle">🪔 ${g('tyohar')}</h2><p class="muted small">${g('tyoharSub')}</p>${seg}${body}`;
  }
  function bindTyohar() {
    const f = $('#tdForm'); if (!f) return;
    f.onsubmit = e => {
      e.preventDefault();
      const name = $('#tdName').value.trim(), d = $('#tdDate').value; if (!name || !d) return;
      const [y, m, dd] = d.split('-').map(Number);
      S.tdates = (S.tdates || []).concat([{ id: 'd' + Date.now(), name, kind: $('#tdKind').value, y, m, d: dd }]);
      persist(); ev('tdate.add'); scheduleReminders(); render();
    };
  }

  function nextFestCard() {
    let f; try { f = festivals(40).filter(x => x.i <= 7)[0]; } catch (e) { return ''; }
    if (!f) return '';
    const when = f.i === 0 ? g('todayIs') : f.i === 1 ? g('tomorrowIs') : pick(GT.inDays).replace('{n}', f.i);
    return `<button class="card fest-strip" data-a="tab" data-v="tyohar"><span class="fi">${f.icon}</span><span><b>${pick(f.n)}</b><small>${when} · ${fmtDate(f.y, f.m, f.d, true)}</small></span><i>›</i></button>`;
  }

  /* ---------------- reminders (local notifications, Android) ---------------- */
  async function scheduleReminders() {
    const LN = Cap().LocalNotifications; if (!isNative() || !LN) return;
    try {
      const R = S.remind || {};
      const pend = await LN.getPending(); if (pend && pend.notifications && pend.notifications.length) await LN.cancel({ notifications: pend.notifications.map(n => ({ id: n.id })) });
      if (!R.daily && !R.vrat && !R.dates) return;
      const perm = await LN.requestPermissions(); if (perm && perm.display !== 'granted') return;
      const list = []; let id = 100;
      const at = (dt, h, mi) => new Date(dt.y, dt.m - 1, dt.d, h, mi, 0);
      if (R.daily) list.push({ id: 1, title: '🌅 ' + t('appName'), body: pick(['Your rashifal for today is ready. Tap to listen.', 'आज का राशिफल तैयार है। सुनने के लिए टैप करें।']), schedule: { on: { hour: 7, minute: 0 }, allowWhileIdle: true } });
      if (R.vrat) festivals(62).filter(x => x.i >= 1 && (x.kind === 'fest' || ['ekadashi', 'purnima', 'pradosh', 'sankashti'].includes(x.id))).slice(0, 40).forEach(x => {
        const eve = addDays(x, -1), when = at(eve, 19, 0); if (when > new Date()) list.push({ id: id++, title: `${x.icon} ${pick(GT.tomorrowIs)}: ${pick(x.n)}`, body: lunarLabel(x), schedule: { at: when, allowWhileIdle: true } });
      });
      if (R.dates) (S.tdates || []).forEach(td => { const r = nextTithi(td); if (!r.next) return; const eve = addDays(r.next, -1), when = at(eve, 19, 0);
        if (when > new Date()) list.push({ id: id++, title: `${td.kind === 'shraddh' ? '🪔' : '🎂'} ${pick(GT.tomorrowIs)}: ${td.name}`, body: pick(GT.kinds[td.kind]) + ' · ' + lunarLabel(r.lt), schedule: { at: when, allowWhileIdle: true } }); });
      if (list.length) await LN.schedule({ notifications: list });
    } catch (e) { console.warn('reminders', e); }
  }

  /* ---------------- jaap counter ---------------- */
  V.jp = V.jp || { m: 'gayatri' };
  const jaapToday = () => { const d = todayYMD(); return ymd(d.y, d.m, d.d); };
  function jaapStreak() {
    const J = S.jaap || { days: {} }; let n = 0, d = todayYMD();
    if (!((J.days[ymd(d.y, d.m, d.d)] || 0) >= 108)) d = addDays(d, -1);
    while ((J.days[ymd(d.y, d.m, d.d)] || 0) >= 108) { n++; d = addDays(d, -1); }
    return n;
  }
  function screenJaap() {
    const J = S.jaap || { days: {}, total: 0 }, today = J.days[jaapToday()] || 0, bead = today % 108, mala = Math.floor(today / 108);
    const pool = jaapPool(), grp = V.jp.g || 'all', ms = grp === 'all' ? pool : pool.filter(x => x.grp === grp), m = pool.find(x => x.id === V.jp.m) || ms[0] || pool[0];
    const beads = Array.from({ length: 36 }, (_, i) => { const a = i / 36 * Math.PI * 2 - Math.PI / 2, on = i < Math.round(bead / 3); return `<circle cx="${150 + 128 * Math.cos(a)}" cy="${150 + 128 * Math.sin(a)}" r="9" class="${on ? 'on' : ''}"/>`; }).join('');
    return `${backMore()}<h2 class="ptitle">📿 ${g('jaap')}</h2><p class="muted small">${g('jaapGoal')}</p>
      <section class="card"><div class="chips jgrp"><button class="chip ${grp === 'all' ? 'on' : ''}" data-a="jpG" data-v="all">${g('allJaap')}</button>${GX.jaapGroups.map(([k, ic, n]) => `<button class="chip ${grp === k ? 'on' : ''}" data-a="jpG" data-v="${k}">${ic} ${pick(n)}</button>`).join('')}</div>
        <label class="fl">${g('jaapPick')}<select id="jpM">${ms.map(x => `<option value="${x.id}" ${x.id === m.id ? 'selected' : ''}>${pick(x.t)}</option>`).join('')}</select></label>
        <div class="mtext jm">${esc(mText(m).split('\n')[0])}</div><button class="btn link sm" data-a="jpSpeak" data-v="${m.id}">${ICON.speaker} ${t('listen')}</button></section>
      <button class="jaap-btn" data-a="jaapTap" aria-label="${g('jaapTap')}"><svg viewBox="0 0 300 300" class="mala">${beads}<circle cx="150" cy="22" r="14" class="guru"/></svg>
        <span class="jc"><b id="jpN">${bead}</b><small>/ 108</small><em>${g('jaapTap')}</em></span></button>
      <section class="grid4 jaap-stats"><div class="tile"><div class="tl">${g('jaapMala')}</div><div class="tv num">${mala}</div></div><div class="tile"><div class="tl">${g('jaapToday')}</div><div class="tv num">${today}</div></div>
        <div class="tile"><div class="tl">🔥 ${g('jaapStreak')}</div><div class="tv num">${jaapStreak()}</div></div><div class="tile"><div class="tl">${g('jaapTotal')}</div><div class="tv num">${J.total || 0}</div></div></section>
      <button class="btn ghost block" data-a="jaapReset">${g('jaapReset')}</button>`;
  }
  let JPOOL = null;
  function jaapPool() {
    if (JPOOL) return JPOOL;
    const lib = BHAKTI.mantras.filter(m => ['navkar', 'mool-mantar', 'gayatri', 'mahamrityunjaya'].includes(m.id) || (!m.cat.some(c => ['aarti', 'chalisa', 'stuti'].includes(c)) && mText(m).split('\n').length <= 4))
      .map(m => ({ ...m, grp: GX.jaapMap[m.id] || (m.cat.find(c => GX.jaapGroups.some(gg => gg[0] === c)) || 'daily') }));
    const extra = GX.jaapExtra.map(([id, grp, tt, text, roman]) => ({ id, grp, t: tt, text, roman, m: tt, cat: [grp] }));
    JPOOL = extra.concat(lib);
    return JPOOL;
  }
  function jaapTap() {
    const J = S.jaap = S.jaap || { days: {}, total: 0 }, k = jaapToday();
    J.days[k] = (J.days[k] || 0) + 1; J.total = (J.total || 0) + 1;
    const keys = Object.keys(J.days).sort(); while (keys.length > 120) delete J.days[keys.shift()];
    try { navigator.vibrate && navigator.vibrate(J.days[k] % 108 === 0 ? [80, 60, 160] : 18); } catch (e) { }
    const H = Cap().Haptics; if (H && H.impact) H.impact({ style: 'LIGHT' }).catch(() => { });
    persist();
    if (J.days[k] % 108 === 0) { toast(g('jaapDone')); ev('jaap.mala'); render(); return; }
    const n = $('#jpN'); if (n) { n.textContent = J.days[k] % 108; const b = document.querySelectorAll('.mala circle:not(.guru)'); const on = Math.round((J.days[k] % 108) / 3); b.forEach((c, i) => c.classList.toggle('on', i < on)); } else render();
  }

  /* ---------------- share cards (image for WhatsApp status) ---------------- */
  function wrapLines(ctx, text, maxW) {
    const words = String(text).split(/\s+/), lines = []; let cur = '';
    words.forEach(w => { const tt = cur ? cur + ' ' + w : w; if (ctx.measureText(tt).width > maxW && cur) { lines.push(cur); cur = w; } else cur = tt; });
    if (cur) lines.push(cur); return lines;
  }
  async function shareCard(kind) {
    toast(g('making'));
    try { await document.fonts.ready; } catch (e) { }
    const W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const c = cv.getContext('2d');
    const gr = c.createRadialGradient(W / 2, H * .4, 50, W / 2, H * .5, H * .8); gr.addColorStop(0, '#9b2a3b'); gr.addColorStop(.55, '#5a1220'); gr.addColorStop(1, '#2a070d');
    c.fillStyle = gr; c.fillRect(0, 0, W, H);
    c.strokeStyle = 'rgba(255,207,107,.25)'; c.lineWidth = 2; for (let r = 120; r < 700; r += 70) { c.beginPath(); c.arc(W / 2, H * .45, r, 0, Math.PI * 2); c.stroke(); }
    const F = (w, s) => `${w} ${s}px Mukta, "Tiro Devanagari Hindi", sans-serif`;
    c.textAlign = 'center'; c.fillStyle = '#ffcf6b'; c.font = F(700, 44); c.fillText('✨ ' + t('appName') + ' ✨', W / 2, 110);
    const p = active();
    let title = '', sub = '', body = '', big = '', foot2 = '';
    if (kind === 'milan' && V.matchRes) {
      const mr = V.matchRes, tot = mr.total; title = pick(['Kundli Milan', 'कुंडली मिलान']); big = `${tot}/36`;
      sub = `${(mr.boy && mr.boy.name || '').split(' ')[0]} ❤ ${(mr.girl && mr.girl.name || '').split(' ')[0]}`; body = t(tot < 18 ? 'v1' : tot < 25 ? 'v2' : tot < 33 ? 'v3' : 'v4');
    } else {
      const r = prediction(p, V.dayOffset); title = `${p.name.split(' ')[0]} · ${pick(C.rashiShort[r.ch.moonSign])}`; sub = fmtDate(r.dt.y, r.dt.m, r.dt.d, true);
      big = '★'.repeat(r.score) + '☆'.repeat(5 - r.score); body = pick(C.houseMsg[r.dy.house - 1]);
      foot2 = `${t('luckyColour')}: ${pick(r.lucky)}   ·   ${t('luckyNumber')}: ${r.luckyNum}`;
    }
    c.fillStyle = '#fff'; c.font = F(700, 72); c.fillText(title, W / 2, 260);
    c.fillStyle = '#ffe3c2'; c.font = F(500, 42); c.fillText(sub, W / 2, 330);
    c.fillStyle = '#ffcf6b'; c.font = F(700, 120); c.fillText(big, W / 2, 500);
    c.fillStyle = '#fff'; c.font = F(500, 50); wrapLines(c, body, W - 180).slice(0, 7).forEach((l, i) => c.fillText(l, W / 2, 630 + i * 70));
    if (foot2) { c.fillStyle = '#ffe3c2'; c.font = F(500, 40); c.fillText(foot2, W / 2, 1150); }
    c.fillStyle = 'rgba(255,207,107,.95)'; c.beginPath(); c.roundRect ? c.roundRect(W / 2 - 330, 1200, 660, 90, 45) : c.rect(W / 2 - 330, 1200, 660, 90); c.fill();
    c.fillStyle = '#2B1A12'; c.font = F(700, 40); c.fillText('📲 ' + g('cardFoot'), W / 2, 1258);
    const data = cv.toDataURL('image/png'), b64 = data.split(',')[1], text = `${title} — ${t('appName')}${CFG.appLink ? '\n' + CFG.appLink : ''}`;
    ev('share.card.' + kind);
    const P = Cap();
    if (isNative() && P.Filesystem && P.Share) {
      try {
        const fname = `jyotish-${kind}-${Date.now()}.png`;
        const w = await P.Filesystem.writeFile({ path: fname, data: b64, directory: 'CACHE' });
        await P.Share.share({ title: t('appName'), text, files: [w.uri], dialogTitle: g('shareCard') }); return;
      } catch (e) { if (/cancel/i.test(String(e && e.message))) return; }
    }
    const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
    const file = blob && new File([blob], 'jyotish-saathi.png', { type: 'image/png' });
    cardSheet(data, file, text);
  }
  function cardSheet(data, file, text) {
    const d = document.createElement('div'); d.className = 'sheet-bg';
    const canFile = file && navigator.canShare && (() => { try { return navigator.canShare({ files: [file] }); } catch (e) { return false; } })();
    d.innerHTML = `<div class="sheet center"><div class="grab"></div><h2>🖼️ ${g('cardReady')}</h2><img class="cardimg" src="${data}" alt="">
      <p class="muted small">${g('cardHow')}</p>
      <div class="row2">${canFile ? `<button class="btn primary" data-x="share">📤 ${g('shareNow')}</button>` : `<a class="btn wa" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">${ICON.wa}<span>WhatsApp</span></a>`}
        <a class="btn ghost" href="${data}" download="jyotish-saathi.png">⬇️ ${g('download')}</a></div>
      <button class="btn link block" data-x="close">${t('ok')}</button></div>`;
    d.onclick = async e => {
      const x = e.target.closest('[data-x]');
      if (x && x.dataset.x === 'share') { try { await navigator.share({ files: [file], text }); } catch (er) { } return; }
      if (e.target === d || (x && x.dataset.x === 'close')) d.remove();
    };
    document.body.appendChild(d);
  }

  /* ---------------- home-screen widget data + WhatsApp queue (on app open, once a day) ---------------- */
  function widgetData() {
    const p = active(); if (!p) return null;
    const r = prediction(p, 0), pl = r.pl;
    return { date: fmtDate(r.dt.y, r.dt.m, r.dt.d, true), name: p.name.split(' ')[0], rashi: pick(C.rashiShort[r.ch.moonSign]), stars: '★'.repeat(r.score) + '☆'.repeat(5 - r.score),
      line: pick(C.houseMsg[r.dy.house - 1]), tithi: tithiName(r.pc.tithi) + (r.pc.tithi < 15 ? ' (' + g('shukla') + ')' : ' (' + g('krishna') + ')'),
      rahu: `${t('rahuKaal')}: ${fmtTime(r.pc.rahu.start, pl.tz)} – ${fmtTime(r.pc.rahu.end, pl.tz)}` };
  }
  async function dailySync() {
    const d = todayYMD(), key = ymd(d.y, d.m, d.d) + '|' + S.activeId + '|' + S.lang;
    if (S.lastDaily === key) return; S.lastDaily = key; persist();
    ev('open.day');
    // widget (Android)
    try { const P = Cap(); const w = widgetData(); if (isNative() && P.Preferences && w) { await P.Preferences.set({ key: 'widget', value: JSON.stringify(w) }); if (P.Widget && P.Widget.refresh) P.Widget.refresh().catch(() => { }); } } catch (e) { }
    // next 14 days of rashifal for WhatsApp ("Rashifal" keyword reply is free; daily push is Premium)
    if (serverOn() && S.user && S.user.token && S.profiles.length) {
      try {
        const items = [];
        for (let i = 0; i < 14; i++) {
          const dt = addDays(d, i), lines = S.profiles.slice(0, isPremium() ? 6 : 1).map(p => { const r = prediction(p, i); return `${p.name.split(' ')[0]} (${pick(C.rashiShort[r.ch.moonSign])}) ${'★'.repeat(r.score)}: ${pick(C.houseMsg[r.dy.house - 1])}`; });
          const r0 = prediction(S.profiles[0], i);
          items.push({ day: ymd(dt.y, dt.m, dt.d), text: `🙏 ${fmtDate(dt.y, dt.m, dt.d, true)} · ${lines.join(' · ')} · ${t('rahuKaal')} ${fmtTime(r0.pc.rahu.start, r0.pl.tz)}–${fmtTime(r0.pc.rahu.end, r0.pl.tz)}`.slice(0, 900) });
        }
        await api('/api/wa/daily', { token: S.user.token, items, lang: S.lang === 'en' ? 'en' : 'hi' });
      } catch (e) { }
    }
    scheduleReminders();
  }

  /* ---------------- WhatsApp rashifal screen ---------------- */
  function screenWA() {
    const num = CFG.whatsappNumber || '';
    const logged = S.user && S.user.token;
    return `${backMore()}<h2 class="ptitle">💬 ${g('waTitle')}</h2>
      <section class="card"><h3>🆓 ${pick(C.bh.free)}</h3><p>${g('waFree')}</p>${num ? `<a class="btn wa block" href="https://wa.me/${num}?text=Rashifal" target="_blank" rel="noopener">${ICON.wa}<span>${g('waOpen')}</span></a>` : `<p class="muted small">${g('waNoServer')}</p>`}</section>
      <section class="card"><h3>👑 ${pick(C.prem.title)}</h3><p>${g('waPrem')}</p>
        ${!serverOn() ? `<p class="muted small">${g('waNoServer')}</p>` : !logged ? `<p class="muted small">${g('waLogin')}</p>` :
        S.waDaily ? `<div class="pill good">✓ ${g('waOn')}</div><button class="btn ghost block" data-a="waDaily" data-v="0">${g('waTurnOff')}</button>` :
        `<button class="btn gold block" data-a="waDaily" data-v="1">${g('waTurnOn')}</button>`}</section>`;
  }
  async function waDaily(on) {
    if (on && !isPremium()) { paywall(); return; }
    const p = active(); S.lastDaily = ''; await dailySync();
    const r = await api('/api/wa/daily', { token: S.user.token, on, name: (S.user.name || p.name || '').split(' ')[0], lang: S.lang === 'en' ? 'en' : 'hi', items: [] }).catch(() => ({}));
    if (r.ok) { S.waDaily = !!r.waDaily; persist(); S.lastDaily = ''; dailySync(); ev('wa.daily.' + (on ? 'on' : 'off')); }
    render();
  }

  /* ---------------- voice questions ---------------- */
  let REC = null;
  function vaSheet(msg) {
    document.querySelectorAll('.sheet-bg.va').forEach(x => x.remove());
    const d = document.createElement('div'); d.className = 'sheet-bg va';
    d.innerHTML = `<div class="sheet center"><div class="grab"></div><h2>🙏 ${g('vaTitle')}</h2><p class="muted small">${msg || g('vaSub')}</p>
      <button class="micbig" data-x="mic" aria-label="${g('askVoice')}">🎙️</button>
      <form class="row2 vaf"><input id="vaQ" placeholder="${g('vaType')}" autocomplete="off"><button class="btn primary">${g('vaSend')}</button></form>
      <div class="chips vachips">${GT.vaChips.map(c => `<button class="chip" data-x="q" data-q="${esc(pick(c))}">${pick(c)}</button>`).join('')}</div>
      <button class="btn link block" data-x="close">${t('cancel')}</button></div>`;
    d.onclick = e => {
      const x = e.target.closest('[data-x]');
      if (x && x.dataset.x === 'mic') { voiceListen(); return; }
      if (x && x.dataset.x === 'q') { d.remove(); vaHandle(x.dataset.q); return; }
      if (e.target === d || (x && x.dataset.x === 'close')) d.remove();
    };
    d.querySelector('form').onsubmit = e => { e.preventDefault(); const q = d.querySelector('#vaQ').value; if (q.trim()) { d.remove(); vaHandle(q); } };
    document.body.appendChild(d);
  }
  function vaHandle(q) {
    q = (q || '').trim(); if (!q) return;
    ev('va.ask');
    const lang = S.lang === 'en' ? 'en-IN' : 'hi-IN';
    toast(pick(GT.heard).replace('{q}', q));
    const tomorrow = /kal|कल|tomorrow/i.test(q) && !/aaj|आज|today/i.test(q);
    if (/vrat|व्रत|tyohar|त्योहार|festival|ekadashi|एकादशी|purnima|पूर्णिमा/i.test(q)) {
      const f = festivals(40)[0]; V.tab = 'tyohar'; V.ty.open = null; V.ty.mode = 'list'; go2();
      if (f) setTimeout(() => say('va', `${pick(f.n)}, ${fmtDate(f.y, f.m, f.d, true)}.`, lang), 300); return;
    }
    if (/rahu|राहु/i.test(q)) { const r = prediction(active(), tomorrow ? 1 : 0); V.dayOffset = tomorrow ? 1 : 0; V.tab = 'today'; go2(); setTimeout(() => say('va', `${t('rahuKaal')}: ${fmtTime(r.pc.rahu.start, r.pl.tz)} - ${fmtTime(r.pc.rahu.end, r.pl.tz)}`, lang), 300); return; }
    if (/rang|रंग|colou?r|number|अंक|ank/i.test(q)) { const r = prediction(active(), tomorrow ? 1 : 0); V.dayOffset = tomorrow ? 1 : 0; V.tab = 'today'; go2(); setTimeout(() => say('va', `${t('luckyColour')}: ${pick(r.lucky)}. ${t('luckyNumber')}: ${r.luckyNum}.`, lang), 300); return; }
    if (/aaj|आज|today|kal|कल|tomorrow|din|दिन|day|rashifal|राशिफल|horoscope|kaisa|कैसा/i.test(q) && !/shaadi|शादी|naukri|नौकरी|job|career|business|व्यापार|paisa|पैसा|money|health|सेहत/i.test(q)) {
      V.dayOffset = tomorrow ? 1 : 0; V.tab = 'today'; go2(); setTimeout(() => speak(), 300); return;
    }
    if (!isPremium()) { toast(g('aiPrem')); setTimeout(paywall, 1400); return; }
    V.tab = 'aiask'; go2(); setTimeout(async () => { await aiAsk(q); const st = aiStore()[active().id]; const last = st && st[st.length - 1]; if (last && last.a) say('ai', last.a, lang); }, 200);
  }
  async function voiceListen() {
    const lang = S.lang === 'en' ? 'en-IN' : 'hi-IN', SR = Cap().SpeechRecognition;
    const done = q => { document.querySelectorAll('.sheet-bg.va').forEach(x => x.remove()); vaHandle(q); };
    if (isNative() && SR) {
      try {
        const pr = await SR.requestPermissions(); if (pr && (pr.speechRecognition || pr.microphone) === 'denied') throw new Error('denied');
        const a = await SR.available(); if (!a.available) throw new Error('na');
        const m = document.querySelector('.micbig'); if (m) m.classList.add('on');
        const res = await SR.start({ language: lang, maxResults: 1, partialResults: false, popup: true });
        done(res && res.matches && res.matches[0]); return;
      } catch (e) { vaSheet(g('vaMicOff')); return; }
    }
    const W = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!W) { vaSheet(g('vaMicOff')); return; }
    try { REC && REC.abort(); } catch (e) { }
    REC = new W(); REC.lang = lang; REC.interimResults = false; REC.maxAlternatives = 1;
    let got = false;
    REC.onresult = e => { got = true; done(e.results[0][0].transcript); };
    REC.onerror = () => { if (!got) vaSheet(g('vaMicOff')); };
    try { REC.start(); const m = document.querySelector('.micbig'); if (m) m.classList.add('on'); toast(g('listening')); } catch (e) { vaSheet(g('vaMicOff')); }
  }
  async function voiceAskOld() {
    ev('voice.ask');
    const lang = S.lang === 'en' ? 'en-IN' : 'hi-IN', SR = Cap().SpeechRecognition;
    const handle = q => {
      q = (q || '').trim(); if (!q) return;
      toast(pick(GT.heard).replace('{q}', q));
      const tomorrow = /kal|कल|tomorrow/i.test(q) && !/aaj|आज|today/i.test(q);
      if (/aaj|आज|today|kal|कल|tomorrow|din|दिन|day|rashifal|राशिफल|horoscope|kaisa|कैसा/i.test(q) && !/shaadi|शादी|naukri|नौकरी|job|career|business|व्यापार|paisa|पैसा|money/i.test(q)) {
        V.dayOffset = tomorrow ? 1 : 0; V.tab = 'today'; go2(); setTimeout(() => speak(), 300); return;
      }
      if (!isPremium()) { toast(g('aiPrem')); setTimeout(paywall, 1200); return; }
      V.tab = 'aiask'; go2(); setTimeout(async () => { await aiAsk(q); const st = aiStore()[active().id]; const last = st && st[st.length - 1]; if (last && last.a) say('ai', last.a, lang); }, 200);
    };
    if (isNative() && SR) {
      try {
        await SR.requestPermissions(); const a = await SR.available(); if (!a.available) throw new Error('na');
        toast(g('listening')); const res = await SR.start({ language: lang, maxResults: 1, partialResults: false, popup: true });
        handle(res && res.matches && res.matches[0]); return;
      } catch (e) { toast(g('noMic')); return; }
    }
    const W = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!W) { toast(g('noMic')); return; }
    try { REC && REC.abort(); } catch (e) { }
    REC = new W(); REC.lang = lang; REC.interimResults = false; REC.maxAlternatives = 1;
    REC.onresult = e => handle(e.results[0][0].transcript); REC.onerror = () => toast(g('noMic'));
    toast(g('listening')); REC.start();
  }

  /* ---------------- naamkaran ---------------- */
  const NAMES = GX.names.trim().split('\n').map(l => { const [r, d, gg, me, mh] = l.split('|'); return { r, d, g: gg, m: [me, mh] }; });
  function sylKey(s) { return s.toLowerCase().replace(/^(chh|ch|kh|gh|bh|dh|ph|sh|th|jh)?.*$/, (m0, c) => c || s[0].toLowerCase()); }
  function namesFor(syls) {
    const out = [], seen = new Set();
    const add = n => { if (!seen.has(n.r)) { seen.add(n.r); out.push(n); } };
    syls.forEach(s => NAMES.filter(n => n.r.toLowerCase().startsWith(s.toLowerCase()) || n.d.startsWith(s.slice(0, 1) === s ? s : '\u0000')).forEach(add));
    syls.forEach(s => { const k = sylKey(s); NAMES.filter(n => { const nk = sylKey(n.r); return nk === k; }).forEach(add); });
    return out;
  }
  function screenNaam() {
    const p = active(), ch = chartOf(p), moon = ch.planets[1], pada = moon.pada - 1, sy = GX.syl[ch.moonNak];
    if (V.naamFor !== p.id) { V.naamFor = p.id; V.naamSyl = pada; }
    const sel = sy[V.naamSyl] || sy[pada];
    const all = sy.map((s2, i) => `<button class="syl ${i === V.naamSyl ? 'main' : ''} ${i === pada ? 'star' : ''}" data-a="naamSyl" data-v="${i}">${s2[1]}<small>${s2[0]}${i === pada ? ' ⭐' : ''}</small></button>`).join('');
    const exact = NAMES.filter(n => n.r.toLowerCase().startsWith(sel[0].toLowerCase()) || n.d.startsWith(sel[1]));
    const list = exact.length >= 2 ? exact : namesFor([sel[0]]), full = hasItem('naam', p.id);
    const show = gg => { const arr = list.filter(n => n.g === gg); return (full ? arr : arr.slice(0, 3)).map(n => `<div class="area"><span><b>${L() ? n.d : n.r}</b> <small class="muted">${L() ? n.r : n.d}</small></span><small>${pick(n.m)}</small></div>`).join('') || '<p class="muted small">—</p>'; };
    const kids = S.profiles.filter(x => [2, 3, 8].includes(+x.rel));
    return `${backMore()}<h2 class="ptitle">👶 ${g('naam')}</h2><p class="muted small">${g('naamSub')}</p>
      <button class="btn gold block" data-a="addBaby">➕ ${g('addBaby')}</button>
      <section class="card"><div class="tl">${g('babyFor')}</div>${profilePicker()}
        ${kids.length && !kids.some(k => k.id === p.id) ? `<div class="chips">${kids.map(k => `<button class="chip" data-a="setActive" data-v="${k.id}">👶 ${esc(k.name.split(' ')[0])}</button>`).join('')}</div>` : ''}
        <p class="muted small">${t('nakshatra')}: <b>${pick(C.nak[ch.moonNak])}</b> · ${t('pada')} ${moon.pada} · ⭐ = ${pick(['main letter', 'मुख्य अक्षर'])}</p>
        <h3>${g('naamLetters')}</h3><p class="muted small">${g('pickSyl')}</p><div class="syls">${all}</div>
        ${p.timeUnknown ? `<p class="note">ℹ️ ${pick(C.acc.timeUnknown)}</p>` : ''}</section>
      <section class="card"><h3>${exact.length >= 2 ? pick(GT.namesWith).replace('{s}', sel[1] + ' (' + sel[0] + ')') : pick(GT.noNamesSyl).replace('{s}', sel[1])}</h3>
        <h3>👦 ${g('boys')}</h3>${show('b')}<h3>👧 ${g('girls')}</h3>${show('g')}</section>
      ${full ? '' : unlockBox('naam', p.id, pick(GT.naamMore).replace('{n}', list.length))}`;
  }


  /* ---------------- year ahead report ---------------- */
  const SUNH = [['A fresh start: health and confidence improve', 'नई शुरुआत: सेहत और आत्मविश्वास बढ़ेगा'], ['Focus on savings and family talks', 'बचत और परिवार की बातचीत पर ध्यान दें'], ['Courage and short trips bring results', 'साहस और छोटी यात्राओं से लाभ'], ['Home matters need attention; stay calm', 'घर के मामलों पर ध्यान दें; शांत रहें'], ['Good for children, learning and creative work', 'बच्चों, पढ़ाई और रचनात्मक काम के लिए अच्छा'], ['You will beat obstacles and win over rivals', 'रुकावटों और विरोधियों पर जीत'],
    ['Partnerships and marriage get attention', 'साझेदारी और विवाह पर ध्यान'], ['Go slow; take care of health and avoid risks', 'धीरे चलें; सेहत का ध्यान रखें, जोखिम से बचें'], ['Luck, blessings and travel for good reasons', 'भाग्य, आशीर्वाद और शुभ यात्राएँ'], ['Strong month for work and status', 'काम और प्रतिष्ठा के लिए बढ़िया महीना'], ['Gains, income and wishes fulfilled', 'लाभ, आमदनी और इच्छाएँ पूरी'], ['Spending and rest; good for spiritual practice', 'ख़र्च और आराम; साधना के लिए अच्छा']];
  const YR = () => { const d = todayYMD(); return d.m >= 10 ? d.y + 1 : d.y; };
  function yearMonths(p) {
    const ch = chartOf(p), y = YR(), out = [];
    const good = { Jupiter: [2, 5, 7, 9, 11], Saturn: [3, 6, 11], Sun: [3, 6, 10, 11], Rahu: [3, 6, 11] };
    for (let m = 1; m <= 12; m++) {
      const jd = E.jdFromLocal(y, m, 15, 12, 0, 5.5), sp = E.sidereal(jd), h = n => ((Math.floor(sp[n] / 30) - ch.moonSign + 12) % 12) + 1;
      const H = { Jupiter: h('Jupiter'), Saturn: h('Saturn'), Sun: h('Sun'), Rahu: h('Rahu') };
      let sc = 3; Object.entries(H).forEach(([n, hh]) => { if (good[n].includes(hh)) sc += n === 'Sun' ? .5 : .7; else if (n !== 'Sun' && [8, 12].includes(hh)) sc -= .6; });
      if ([12, 1, 2].includes(H.Saturn)) sc -= .5;
      const md = ch.dasha.find(x => x.start <= jd && x.end > jd) || ch.dasha[0];
      out.push({ m, y, H, sc: Math.max(1, Math.min(5, Math.round(sc))), md: md.lord, sun: SUNH[H.Sun - 1] });
    }
    return out;
  }
  function screenYear() {
    const p = active(), ch = chartOf(p), ms = yearMonths(p), y = YR(), full = hasItem('report_year', p.id);
    const best = ms.slice().sort((a, b) => b.sc - a.sc).slice(0, 3).sort((a, b) => a.m - b.m), care = ms.filter(x => x.sc <= 2).slice(0, 3);
    const ya = yearAhead(ch);
    const mrow = x => `<section class="card yr-m"><h3>${pick(C.months[x.m - 1])} ${x.y} ${stars(x.sc)}</h3><p>${pick(x.sun)}.</p>
      <p class="muted small">${pName('Jupiter')}: ${pick(P_.ord[x.H.Jupiter - 1])} · ${pName('Saturn')}: ${pick(P_.ord[x.H.Saturn - 1])} · ${t('curMaha')}: ${pName(x.md)}</p></section>`;
    return `${backMore()}<h2 class="ptitle">📆 ${pick(GT.yearTitle).replace('{y}', y)}</h2>${profilePicker()}
      <section class="card"><h3>${g('yearOverview')}</h3>${ya.map(r => r.rows.slice(0, 2).map(s => `<p>${s.good ? '🌟' : '🐢'} ${s.text}</p>`).join('')).join('')}
        <p><b>${g('yearBest')}:</b> ${best.map(x => pick(C.months[x.m - 1])).join(', ')}</p>${care.length ? `<p><b>${g('yearCare')}:</b> ${care.map(x => pick(C.months[x.m - 1])).join(', ')}</p>` : ''}
        <div class="row2"><button class="btn ghost" data-a="yearSpeak">${ICON.speaker}<span>${V.speaking === 'year' ? t('stop') : t('listen')}</span></button>${full ? `<button class="btn primary" data-a="yearPdf">📄 ${g('pdfYear')}</button>` : ''}</div></section>
      ${(full ? ms : ms.slice(0, 2)).map(mrow).join('')}
      ${full ? '' : `<p class="muted small center">${g('yearFree')}</p>` + unlockBox('report_year', p.id, g('yearUnlock'))}`;
  }
  function yearSpeech(p) { const ms = yearMonths(p), full = hasItem('report_year', p.id); return (full ? ms : ms.slice(0, 2)).map(x => `${pick(C.months[x.m - 1])}: ${pick(x.sun)}.`).join(' '); }
  async function yearPdf() {
    const p = active(); toast(pick(P_.making));
    try {
      await ensureLibs(); const ms = yearMonths(p), y = YR();
      const box = document.createElement('div'); box.className = 'pdf';
      box.innerHTML = `<div class="pdf-cover">${LOGO}<div><div class="pdf-app">${t('appName')}</div><h1>${pick(GT.yearTitle).replace('{y}', y)}</h1><div class="pdf-name">${esc(p.name)}</div></div></div>` +
        ms.map(x => `<div class="pdf-block pdf-area"><h3>${pick(C.months[x.m - 1])} ${x.y} <span class="stars">${'★'.repeat(x.sc)}<span style="color:#ddd">${'★'.repeat(5 - x.sc)}</span></span></h3><p>${pick(x.sun)}.</p><p>${pName('Jupiter')}: ${pick(P_.ord[x.H.Jupiter - 1])} · ${pName('Saturn')}: ${pick(P_.ord[x.H.Saturn - 1])} · ${t('curMaha')}: ${pName(x.md)}</p></div>`).join('') +
        `<div class="pdf-block pdf-foot">${t('disclaimer')}</div>`;
      await pdfFromBox(box, `year-${y}-${p.name.split(' ')[0]}.pdf`);
    } catch (e) { toast(pick(P_.pdfFail || ['Could not make the PDF', 'PDF नहीं बन सका'])); }
  }

  /* ---------------- calculation details sheet ---------------- */
  function calcSheet() {
    const p = active(), ch = chartOf(p), dms = d => { const a = Math.floor(d), m = Math.floor((d - a) * 60), s = Math.round(((d - a) * 60 - m) * 60); return `${a}° ${pad(m)}' ${pad(s)}"`; };
    const d = document.createElement('div'); d.className = 'sheet-bg';
    d.innerHTML = `<div class="sheet"><div class="grab"></div><h2>🔢 ${g('calc')}</h2><p class="muted small">${g('calcSub')}</p>
      <div class="area"><span>${g('ayan')}</span><b>${dms(E.ayanamsa(ch.jd))}</b></div>
      <div class="area"><span>${g('jd')}</span><b>${ch.jd.toFixed(5)}</b></div>
      <div class="area"><span>${g('tzl')}</span><b>${fmtTz(ch.tzUsed)}</b></div>
      <div class="area"><span>${g('coords')}</span><b>${(+p.lat).toFixed(3)}°, ${(+p.lon).toFixed(3)}°</b></div>
      ${ch.timeUnknown ? '' : `<div class="area"><span>${g('asc')}</span><b>${pick(C.rashiShort[ch.lagnaSign])} ${dms(ch.lagna % 30)}</b></div>`}
      <table class="tbl small"><thead><tr><th>${t('planet')}</th><th>${g('sidLon')}</th><th>${t('nakshatra')}</th></tr></thead><tbody>
      ${ch.planets.map(x => `<tr><td>${pName(x.name)}${x.retro && !['Rahu', 'Ketu'].includes(x.name) ? ' ℞' : ''}</td><td>${pick(C.rashiShort[x.sign])} ${dms(x.deg)}<br><small class="muted">${x.lon.toFixed(4)}°</small></td><td>${pick(C.nak[x.nak])} ${x.pada}</td></tr>`).join('')}</tbody></table>
      <p class="muted small">${g('calcNote')}</p><button class="btn link block" data-x="close">${t('ok')}</button></div>`;
    d.onclick = e => { const x = e.target.closest('[data-x]'); if (e.target === d || x) d.remove(); };
    document.body.appendChild(d);
  }

  /* ---------------- Vastu checklist ---------------- */
  function vastuChecklist() {
    const A = S.vchk || {}, n = GX.vchk.length, done = GX.vchk.filter(q => q[0] in A).length;
    const good = GX.vchk.filter(q => A[q[0]] === q[2]).length, score = done ? Math.round(good / n * 100) : 0;
    const tips = GX.vchk.filter(q => q[0] in A && A[q[0]] !== q[2]);
    return `<section class="card"><h3>✅ ${g('vchk')}</h3><p class="muted small">${g('vchkSub')}</p>
      ${GX.vchk.map(q => `<div class="vq"><span>${pick(q[1])}</span><div class="seg sm mini"><button data-a="vq" data-v="${q[0]}:1" class="${A[q[0]] === 1 ? 'on' : ''}">${g('yes')}</button><button data-a="vq" data-v="${q[0]}:0" class="${A[q[0]] === 0 ? 'on' : ''}">${g('no')}</button></div></div>`).join('')}
      ${done ? `<div class="vscore"><b>${score}</b><small>/100</small><span>${g('vscore')} · ${done}/${n}</span></div>
        ${tips.length ? `<h3>${g('vtips')}</h3><ul class="list">${tips.map(q => `<li>🔸 <span>${pick(q[3])}</span></li>`).join('')}</ul>` : `<p class="pill good">${g('vgood')}</p>`}` : ''}</section>`;
  }

  /* ---------------- shared PDF helper ---------------- */
  async function pdfFromBox(box, fname) {
    document.body.appendChild(box);
    try {
      const { jsPDF } = window.jspdf, pdf = new jsPDF({ unit: 'pt', format: 'a4' }), W = pdf.internal.pageSize.getWidth(), H = pdf.internal.pageSize.getHeight();
      let y = 24;
      for (const el of box.children) {
        const cv = await window.html2canvas(el, { scale: 2, backgroundColor: '#ffffff' }), h = cv.height * (W - 48) / cv.width;
        if (y + h > H - 24) { pdf.addPage(); y = 24; }
        pdf.addImage(cv.toDataURL('image/jpeg', .9), 'JPEG', 24, y, W - 48, h); y += h + 10;
      }
      const P = Cap();
      if (isNative() && P.Filesystem && P.Share) { const w = await P.Filesystem.writeFile({ path: fname, data: pdf.output('datauristring').split(',')[1], directory: 'CACHE' }); await P.Share.share({ files: [w.uri], title: fname }); }
      else pdf.save(fname);
    } finally { box.remove(); }
  }

  /* ---------------- Premium screen extras: Parivaar plan, gift, redeem ---------------- */
  function premiumExtras() {
    const fam = S.plan === 'family', mem = S.plan === 'member';
    return `${fam ? `<section class="card"><h3>👨‍👩‍👧 ${g('famMembers')}</h3>${(S.family || []).map(x => `<div class="area"><span>${esc(x)}</span><button class="xbtn" data-a="famDel" data-v="${esc(x)}">✕</button></div>`).join('')}
        ${(S.family || []).length < (CFG.familyMax || 5) ? `<div class="row2"><input id="famPhone" inputmode="tel" placeholder="${g('famPh')}"><button class="btn primary" data-a="famAdd">${g('famAdd')}</button></div>` : ''}</section>` : ''}
      ${mem ? `<p class="pill good">${pick(GT.famVia).replace('{p}', esc(S.familyOwner || ''))}</p>` : ''}
      <section class="card"><h3>🎁 ${g('gift')}</h3><p class="muted small">${g('giftSub')}</p><div class="row2">
        <button class="btn ghost" data-a="gBuy" data-v="gift_m">${pick(GT.gift1).replace('{p}', PRICE.gift_m)}</button><button class="btn gold" data-a="gBuy" data-v="gift_y">${pick(GT.gift12).replace('{p}', PRICE.gift_y)}</button></div></section>
      <section class="card"><h3>🔑 ${g('redeem')}</h3><div class="row2"><input id="giftCode" autocapitalize="characters" placeholder="${g('codePh')}"><button class="btn primary" data-a="giftRedeem">${t('ok')}</button></div></section>`;
  }
  /** Plan picker: single or Parivaar, monthly or yearly (yearly shown first) */
  function plansHTML2() {
    const fam = V.plan && V.plan.startsWith('f');
    const m = fam ? PRICE.fam_m : PRICE.prem_m, y = fam ? PRICE.fam_y : PRICE.prem_y, save = Math.round((1 - y / (m * 12)) * 100);
    const ky = fam ? 'fy' : 'y', km = fam ? 'fm' : 'm';
    const card = (k, name, price, per, day, badge) => `<button class="plan ${V.plan === k ? 'sel' : ''}" data-a="plan" data-v="${k}" aria-pressed="${V.plan === k}">${badge ? `<i>${badge}</i>` : ''}<span class="rad"></span><b>${pick(name)}</b><div class="price">₹${price}<small>${pick(per)}</small></div><small class="pday">${pick(Y.plan.perDay).replace('{d}', day)}</small></button>`;
    return `<div class="seg plan-who"><button data-a="planWho" data-v="s" class="${!fam ? 'on' : ''}">🙋 ${g('single')}</button><button data-a="planWho" data-v="f" class="${fam ? 'on' : ''}">👨‍👩‍👧 ${g('parivaar')}</button></div>
      ${fam ? `<p class="muted small center">${pick(GT.parivaarSub).replace('{n}', CFG.familyMax || 5)}</p>` : ''}
      <h3 class="center">${pick(Y.plan.pick)}</h3><div class="plans">${card(ky, P_.yearly, y, P_.perYear, (y / 365).toFixed(1), pick(P_.save).replace('{p}', save))}${card(km, P_.monthly, m, P_.perMonth, (m / 30).toFixed(1))}</div>`;
  }
  const PLAN_PROD = { m: 'prem_m', y: 'prem_y', fm: 'fam_m', fy: 'fam_y' };

  /* ---------------- Saathi's own recorded voice (kathas, test line); everything else: cloud or phone voice ---------------- */
  async function sayOwn(id, key, text, lang, force) {
    if (V.speaking) { const same = V.speaking === id; stopSpeech(); render(); if (same && !force) return; }
    if (!L()) return say(id, text, lang);
    const a = new Audio(`voice/${key}-${S.voiceGender === 'm' ? 'm' : 'f'}.mp3`);
    a.playbackRate = S.voiceRate === 'slow' ? 0.82 : 1; try { a.preservesPitch = true; } catch (e) { }
    TTS.audio = a; V.speaking = id; render();
    a.onended = () => { if (V.speaking === id) { V.speaking = false; render(); } };
    try { await a.play(); ev('ownvoice.' + key); } catch (e) { V.speaking = false; say(id, text, lang); }
  }

  /* Daily rashifal in Saathi's own recorded voice: the reading is made of fixed sentences, so it is put together from short recordings */
  function rashifalClips(p, off) {
    const r = prediction(p, off), k = [];
    const idx = (arr, v) => arr.indexOf(v);
    const tm = jd => { const x = E.jdToLocal(jd, r.pl.tz), h = x.h, m = x.min, h12 = ((h + 11) % 12) + 1;
      return [h < 12 ? 'subah' : h < 16 ? 'dopahar' : h < 20 ? 'shaam' : 'raat', 'n' + h12].concat(m ? ['bajkar', 'n' + m, 'minat'] : ['baje']); };
    k.push('namaste', 'wd' + r.dy.wd, 'n' + r.dt.d, 'mo' + (r.dt.m - 1));
    if (r.dt.y >= 2026 && r.dt.y <= 2030) k.push('y' + r.dt.y);
    k.push('rashi', 'ra' + r.ch.moonSign, 'din', 'dl' + r.score, 'hm' + (r.dy.house - 1));
    const ck = Object.keys(C.colour).find(c => C.colour[c] === r.lucky); if (ck) k.push('lcol', 'col' + ck);
    k.push('lnum', 'n' + r.luckyNum, 'do');
    [[C.houseDo, 'hdo'], [C.wdDo, 'wdo'], [C.genDo, 'gdo']].forEach(([arr, pre], i) => { const j = idx(arr, r.dos[i]); if (j >= 0) k.push(pre + j); });
    k.push('dont');
    [[C.houseDont, 'hdt'], [C.wdDont, 'wdt'], [C.genDont, 'gdt']].forEach(([arr, pre], i) => { const j = idx(arr, r.donts[i]); if (j >= 0) k.push(pre + j); else if (r.donts[i] === C.badTaraDont) k.push('btd'); });
    k.push('rahu', ...tm(r.pc.rahu.start), 'se', ...tm(r.pc.rahu.end), 'tak');
    return k;
  }
  /* The recordings live in one file per voice (normal and slow); Web Audio plays the needed parts back to back */
  const SPR = { meta: null, buf: {}, ctx: null };
  async function sprite(gnd, slow) {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) throw new Error('no audio');
    SPR.ctx = SPR.ctx || new AC();
    if (SPR.ctx.state === 'suspended') await SPR.ctx.resume();
    if (!SPR.meta) SPR.meta = await (await fetch('voice/rashifal.json')).json();
    const k = gnd + (slow ? '-slow' : '');
    if (!SPR.buf[k]) SPR.buf[k] = fetch(`voice/rashifal-${k}.mp3`).then(r => { if (!r.ok) throw new Error('404'); return r.arrayBuffer(); }).then(b => new Promise((res, rej) => SPR.ctx.decodeAudioData(b, res, rej)));
    try { return await SPR.buf[k]; } catch (e) { delete SPR.buf[k]; throw e; }
  }
  async function playClips(id, keys, fallback) {
    if (V.speaking) { const same = V.speaking === id; stopSpeech(); render(); if (same) return; }
    const gnd = S.voiceGender === 'm' ? 'm' : 'f', slow = S.voiceRate === 'slow';
    V.speaking = id; render(); ev('ownvoice.rashifal');
    let buf;
    try { buf = await sprite(gnd, slow); } catch (e) { if (V.speaking === id) { V.speaking = false; render(); } if (fallback) fallback(); return; }
    if (V.speaking !== id) return;
    const ctx = SPR.ctx, clips = SPR.meta.clips[gnd], f = slow ? 1 / SPR.meta.tempoSlow : 1, nodes = [];
    let tt = ctx.currentTime + 0.08, last = null;
    keys.forEach((k, i) => {
      const c = clips[k]; if (!c) return;
      const src = ctx.createBufferSource(); src.buffer = buf; src.connect(ctx.destination);
      src.start(tt, c[0] * f, c[1] * f); nodes.push(src); last = src;
      const pause = /^(ra|dl|hm|col|hdo|wdo|gdo|hdt|wdt|gdt|btd|y|namaste|do$|dont$)/.test(k) ? 0.32 : /^n\d/.test(k) && /^n\d/.test(keys[i + 1] || '') ? 0.02 : 0.06;
      tt += c[1] * f + pause * f;
    });
    TTS.audio = { pause() { nodes.forEach(n => { try { n.stop(); } catch (e) { } }); } };
    if (last) last.onended = () => { if (V.speaking === id) { V.speaking = false; TTS.audio = null; render(); } };
  }
  const ownVoiceOK = () => L() && CFG.ownVoice !== false && !cloudVoiceOn();
  function speakDay(p, off) {
    if (ownVoiceOK()) return playClips('day', rashifalClips(p, off), () => say('day', predictionText(p, prediction(p, off)), 'hi-IN'));
    say('day', predictionText(p, prediction(p, off)), L() ? 'hi-IN' : 'en-IN');
  }

  /* ---------------- Home: today at a glance ---------------- */
  function screenHome() {
    const p = active(), r = prediction(p, 0), pl = r.pl, now = new Date(), hr = now.getHours();
    const jdNowL = E.jdFromLocal(now.getFullYear(), now.getMonth() + 1, now.getDate(), hr, now.getMinutes(), pl.tz);
    const hello = hr < 12 ? g('goodMorning') : hr < 17 ? g('goodAfternoon') : g('goodEvening');
    let lt = null; try { lt = lunarDays(todayYMD(), 2)[0]; } catch (e) { }
    const ft = jd => fmtTime(jd, pl.tz);
    const rahuTxt = jdNowL >= r.pc.rahu.start && jdNowL < r.pc.rahu.end ? `<div class="now bad">⏳ ${pick(GT.rahuNow).replace('{t}', ft(r.pc.rahu.end))}</div>`
      : r.dy.wd !== 3 && jdNowL >= r.pc.abhijit.start && jdNowL < r.pc.abhijit.end ? `<div class="now good">✨ ${g('abhiNow')}</div>`
      : jdNowL >= r.pc.rahu.end ? `<div class="now good">✅ ${g('rahuDone')}</div>` : `<div class="now">⏰ ${pick(GT.rahuLater).replace('{a}', ft(r.pc.rahu.start)).replace('{b}', ft(r.pc.rahu.end))}</div>`;
    const fam = S.profiles.slice(0, 8).map(x => { const rr = prediction(x, 0); return `<button class="fam-c ${x.id === p.id ? 'on' : ''}" data-a="homeWho" data-v="${x.id}"><span class="av">${esc((x.name.trim()[0] || '?').toUpperCase())}</span><b>${esc(x.name.split(' ')[0])}</b><small>${'★'.repeat(rr.score)}${'☆'.repeat(5 - rr.score)}</small></button>`; }).join('');
    const J = S.jaap || { days: {} }, st = jaapStreak();
    const Q = [['kundli', '🪐', ['Kundli', 'कुंडली']], ['match', '💞', ['Milan', 'मिलान']], ['panchang', '📅', ['Panchang', 'पंचांग']], ['tyohar', '🪔', ['Festivals', 'त्योहार']],
      ['jaap', '📿', ['Jaap', 'जाप']], ['palm', '✋', ['Palm', 'हस्तरेखा']], ['bhakti', '🛕', ['Mandir', 'मंदिर']], ['muhurat', '🗓️', ['Muhurat', 'मुहूर्त']]];
    return `<section class="home-hero"><div class="hh-top"><div><div class="hello">${hello},</div><h2>${esc(p.name.split(' ')[0])} 🙏</h2>
        <div class="hdate">${fmtDate(r.dt.y, r.dt.m, r.dt.d, true)}${lt ? `<br>${lunarLabel(lt)}` : ''}</div></div><div class="badge">${t('rashi')}<b>${pick(C.rashiShort[r.ch.moonSign])}</b></div></div>
        <div class="hh-day"><div class="score s${r.score}">${stars(r.score, 'big')}<div class="score-l">${pick(C.dayLabel[r.score])}</div></div><p class="lead">${pick(C.houseMsg[r.dy.house - 1])}</p>${basisLine(r)}</div>
        <button class="btn primary block suno" data-a="speak">${ICON.speaker}<span>${V.speaking === 'day' ? t('stop') : g('sunoBig')}</span></button>
        <div class="row2"><button class="btn ghost" data-a="tab" data-v="today">📖 ${pick(['Full rashifal', 'पूरा राशिफल'])}</button><button class="btn ghost" data-a="voiceAsk">🎙️ ${g('askSaathi')}</button></div></section>
      <section class="card"><h3>🕰️ ${g('nowTime')}</h3>${rahuTxt}<div class="muted small">🌅 ${pick(GT.sunTimes).replace('{a}', ft(r.pc.sunrise)).replace('{b}', ft(r.pc.sunset))}</div>
        <div class="grid2 hl"><div class="tile"><div class="tl">${t('luckyColour')}</div><div class="tv"><span class="swatch" style="background:${r.lucky[2]}"></span>${pick(r.lucky)}</div></div><div class="tile"><div class="tl">${t('luckyNumber')}</div><div class="tv num">${r.luckyNum}</div></div></div></section>
      ${nextFestCard()}
      <button class="card trust-strip" data-a="tab" data-v="method"><span>📜</span><span><b>${m_('same')}</b><small>${m_('badge')} · ${m_('compare')}</small></span><i>›</i></button>
      ${S.profiles.length > 1 ? `<section class="card"><h3>👨‍👩‍👧 ${g('famToday')}</h3><div class="fam-row">${fam}</div></section>` : ''}
      <section class="card mantra home-m"><h3>${g('mantraDay')}</h3><div class="mtext">${r.mantra[0]}</div><div class="muted">${r.mantra[1]}</div>
        <div class="row2"><button class="btn gold" data-a="tab" data-v="jaap">📿 ${g('startJaap')}</button>${st ? `<span class="pill good">${pick(GT.streak).replace('{n}', st)}</span>` : ''}</div></section>
      <section class="qgrid">${Q.map(([k, ic, n]) => `<button class="qbtn" data-a="tab" data-v="${k}"><span>${ic}</span><b>${pick(n)}</b></button>`).join('')}</section>
      ${premiumCard()}`;
  }

  /* ---------------- "Our method": how the app calculates, which shastra it follows, compare with a paper kundli ---------------- */
  const MT = {
    title: ['Our method', 'हमारी पद्धति'], sub: ['How Jyotish Saathi calculates, and which shastra it follows', 'ज्योतिष साथी कैसे गणना करता है और किस शास्त्र का पालन करता है'],
    badge: ['Shastra-based · Lahiri ayanamsa', 'शास्त्र आधारित · लाहिड़ी अयनांश'],
    same: ['The same calculation your pandit ji does', 'वही गणना जो आपके पंडित जी करते हैं'],
    sameTxt: ['A kundli is not a guess. It is mathematics: where each planet stood in the sky at the moment and place of birth. Jyotish Saathi does this calculation with standard astronomical formulas, in the same way as printed panchangs and the kundli software used by pandits.', 'कुंडली अंदाज़ा नहीं है। यह गणित है: जन्म के समय और स्थान पर आकाश में हर ग्रह कहाँ था। ज्योतिष साथी यह गणना मानक खगोलीय सूत्रों से करता है, उसी तरह जैसे छपे हुए पंचांग और पंडितों के कुंडली सॉफ़्टवेयर करते हैं।'],
    rules: ['What we use', 'हम क्या इस्तेमाल करते हैं'],
    ruleList: [
      ['🪐', ['Lahiri (Chitrapaksha) ayanamsa', 'लाहिड़ी (चित्रपक्ष) अयनांश'], ['The standard adopted for India\'s national panchang, and used by most pandits.', 'भारत के राष्ट्रीय पंचांग के लिए अपनाया गया मानक, जिसे अधिकांश पंडित भी इस्तेमाल करते हैं।']],
      ['🏠', ['Lagna, 12 bhavas and navamsa (D9)', 'लग्न, 12 भाव और नवांश (D9)'], ['Whole-sign houses, as in Brihat Parashara Hora Shastra.', 'पूर्ण राशि भाव, जैसा बृहत् पाराशर होरा शास्त्र में है।']],
      ['⏳', ['Vimshottari dasha', 'विंशोत्तरी दशा'], ['Mahadasha and antardasha from the Moon\'s nakshatra, the Parashari system.', 'चंद्र नक्षत्र से महादशा और अंतर्दशा, पाराशरी पद्धति।']],
      ['🌙', ['Daily rashifal from gochar and tara bal', 'गोचर और तारा बल से दैनिक राशिफल'], ['Today\'s Moon from your Moon sign, your nakshatra\'s tara, the weekday lord and your running dasha. The reason is shown under every rashifal.', 'आपकी राशि से आज का चंद्रमा, आपके नक्षत्र का तारा, वार स्वामी और चल रही दशा। हर राशिफल के नीचे कारण लिखा होता है।']],
      ['💞', ['Ashtakoot milan (36 gun)', 'अष्टकूट मिलान (36 गुण)'], ['Varna, vashya, tara, yoni, graha maitri, gana, bhakoot and nadi, with Manglik check.', 'वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी, मांगलिक जाँच के साथ।']],
      ['📅', ['Panchang, muhurat and festivals', 'पंचांग, मुहूर्त और त्योहार'], ['Tithi, nakshatra, yoga, karana, Rahu Kaal for your own city; muhurat rules from Muhurta Chintamani; festival dates by the tithi at sunrise (or at night for Diwali, Shivratri, Karva Chauth).', 'आपके शहर के लिए तिथि, नक्षत्र, योग, करण, राहु काल; मुहूर्त के नियम मुहूर्त चिंतामणि से; त्योहार की तिथि सूर्योदय की तिथि से (दीपावली, शिवरात्रि, करवा चौथ में रात की तिथि से)।']],
      ['✋', ['Hastrekha by Samudrik Shastra', 'सामुद्रिक शास्त्र से हस्तरेखा'], ['Lines, mounts and hand shape read by the rules of Samudrik Shastra, together with your kundli.', 'रेखाएँ, पर्वत और हाथ का आकार सामुद्रिक शास्त्र के नियमों से, आपकी कुंडली के साथ।']],
      ['🧭', ['Vastu Shastra directions', 'वास्तु शास्त्र की दिशाएँ'], ['The eight directions and their elements, from traditional Vastu texts.', 'आठ दिशाएँ और उनके तत्व, पारंपरिक वास्तु ग्रंथों से।']]],
    checked: ['How we check our accuracy', 'हम अपनी शुद्धता कैसे जाँचते हैं'],
    checkList: [['Planet positions are accurate to a small fraction of a degree, the same level as printed panchangs.', 'ग्रहों की स्थिति एक अंश के छोटे से भाग तक सटीक है, छपे पंचांग के बराबर।'],
      ['Festival dates for the coming year were checked one by one against published panchangs.', 'आने वाले साल की त्योहार तिथियाँ एक-एक करके प्रकाशित पंचांगों से मिलाई गईं।'],
      ['Every kundli shows its exact degrees (Kundli → Calculation details), so anyone can check them.', 'हर कुंडली अपने सटीक अंश दिखाती है (कुंडली → गणना का विवरण), ताकि कोई भी जाँच सके।']],
    compare: ['Compare with your paper kundli', 'अपनी काग़ज़ वाली कुंडली से मिलाएँ'], compareSub: ['Take out the kundli made by your pandit ji and choose what is written in it. If birth date, time and place are the same, these should match.', 'पंडित जी की बनाई कुंडली निकालें और उसमें जो लिखा है वह चुनें। जन्म की तारीख़, समय और स्थान एक जैसे हों, तो ये मिलने चाहिए।'],
    cLagna: ['Lagna', 'लग्न'], cRashi: ['Rashi (Moon sign)', 'राशि (चंद्र राशि)'], cNak: ['Nakshatra', 'नक्षत्र'], cDasha: ['Running mahadasha', 'चल रही महादशा'], choose: ['— choose —', '— चुनें —'],
    match: ['Matches ✓', 'मिल गया ✓'], nomatch: ['Different', 'अलग है'], app: ['App', 'ऐप'],
    whyDiff: ['If something is different: the birth time may differ by a few minutes (lagna changes about every 2 hours), the birth place may differ, or the paper kundli may use a different ayanamsa (such as KP or Raman). Check the birth time on the paper first.', 'अगर कुछ अलग है: जन्म समय में कुछ मिनट का अंतर हो सकता है (लग्न लगभग हर 2 घंटे में बदलता है), जन्म स्थान अलग हो सकता है, या काग़ज़ की कुंडली में दूसरा अयनांश (जैसे KP या रमन) हो सकता है। पहले काग़ज़ पर लिखा जन्म समय देखें।'],
    allMatch: ['🙏 All match your paper kundli.', '🙏 सब कुछ आपकी काग़ज़ वाली कुंडली से मिल गया।'],
    computer: ['Where a computer writes in simple words', 'कहाँ कंप्यूटर सरल भाषा में लिखता है'],
    computerTxt: ['The calculations above are fixed shastra rules, the same for everyone, never guessed. Only Jyotish Sahayak (your questions), the Life Report and the photo palm reading use a computer program to explain those calculations in simple, personal words.', 'ऊपर की सभी गणनाएँ शास्त्र के तय नियम हैं, सबके लिए एक जैसे, कभी अंदाज़ा नहीं। सिर्फ़ ज्योतिष सहायक (आपके सवाल), जीवन रिपोर्ट और फ़ोटो से हस्तरेखा, इन गणनाओं को सरल और निजी शब्दों में समझाने के लिए कंप्यूटर प्रोग्राम की मदद लेते हैं।'],
    promise: ['Our promise', 'हमारा वचन'],
    promiseList: [['No fear: we never predict death or serious illness.', 'डर नहीं: हम कभी मृत्यु या गंभीर बीमारी की भविष्यवाणी नहीं करते।'], ['No costly remedies or pujas sold out of fear.', 'डर दिखाकर कोई महँगा उपाय या पूजा नहीं बेची जाती।'],
      ['Every result shows its reason.', 'हर परिणाम के साथ उसका कारण लिखा होता है।'], ['Your birth details stay on your phone.', 'आपका जन्म विवरण आपके फ़ोन पर ही रहता है।']],
    reviewed: ['Reviewed by', 'इनके द्वारा जाँचा गया'],
    guidance: ['Jyotish is guidance from tradition, not a guarantee. For health, legal or money decisions, please also ask an expert.', 'ज्योतिष परंपरा से मिला मार्गदर्शन है, गारंटी नहीं। सेहत, क़ानूनी या पैसे के फ़ैसलों में विशेषज्ञ से भी सलाह लें।'],
    basis: ['Basis: Moon in your {h} house today (gochar) · {t} tara', 'आधार: आज चंद्रमा आपकी राशि से {h} भाव में (गोचर) · {t} तारा'],
  };
  const m_ = k => pick(MT[k]);
  function trustBadge() { return `<button class="trust-b" data-a="tab" data-v="method">✅ ${m_('badge')} ›</button>`; }
  V.cmp = V.cmp || {};
  function screenMethod() {
    const p = active(), ch = chartOf(p), now = jdNow(), md = ch.dasha.find(x => x.start <= now && x.end > now) || ch.dasha[0];
    const appV = { lagna: ch.timeUnknown ? null : ch.lagnaSign, rashi: ch.moonSign, nak: ch.moonNak, dasha: md.lord };
    const opts = { lagna: C.rashiShort, rashi: C.rashiShort, nak: C.nak, dasha: ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'] };
    const nameOf = (k, v) => k === 'dasha' ? pName(v) : pick(opts[k][v]);
    const C2 = V.cmp[p.id] || {};
    const row = (k, label) => {
      if (k === 'lagna' && appV.lagna === null) return '';
      const sel = C2[k], has = sel !== undefined && sel !== '', ok = has && String(sel) === String(appV[k]);
      return `<div class="cmp-row"><label class="fl">${m_(label)}<select data-cmp="${k}"><option value="">${m_('choose')}</option>${(k === 'dasha' ? opts.dasha.map(x => [x, pName(x)]) : opts[k].map((x, i) => [i, pick(x)])).map(([v, n]) => `<option value="${v}" ${String(sel) === String(v) ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        ${has ? `<div class="cmp-res ${ok ? 'ok' : 'no'}">${ok ? m_('match') : `${m_('nomatch')} · ${m_('app')}: ${nameOf(k, appV[k])}`}</div>` : ''}</div>`;
    };
    const keys = ['lagna', 'rashi', 'nak', 'dasha'].filter(k => !(k === 'lagna' && appV.lagna === null));
    const done = keys.filter(k => C2[k] !== undefined && C2[k] !== ''), allOk = done.length === keys.length && done.every(k => String(C2[k]) === String(appV[k]));
    const anyNo = done.some(k => String(C2[k]) !== String(appV[k]));
    const rv = (CFG.reviewers || []).filter(x => x && x.name);
    return `${backMore()}<h2 class="ptitle">📜 ${m_('title')}</h2><p class="muted small">${m_('sub')}</p>
      <section class="card method-hero"><h3>🙏 ${m_('same')}</h3><p>${m_('sameTxt')}</p></section>
      <section class="card"><h3>📚 ${m_('rules')}</h3>${MT.ruleList.map(([ic, h, x]) => `<div class="mrule"><span>${ic}</span><div><b>${pick(h)}</b><p>${pick(x)}</p></div></div>`).join('')}</section>
      <section class="card"><h3>🔍 ${m_('checked')}</h3><ul class="list">${MT.checkList.map(x => `<li>✔️ <span>${pick(x)}</span></li>`).join('')}</ul>
        <button class="btn link sm" data-a="calc">🔢 ${g('calc')}</button></section>
      <section class="card" id="cmpCard"><h3>📄 ${m_('compare')}</h3><p class="muted small">${m_('compareSub')}</p>${profilePicker()}
        ${row('lagna', 'cLagna')}${row('rashi', 'cRashi')}${row('nak', 'cNak')}${row('dasha', 'cDasha')}
        ${allOk ? `<p class="pill good">${m_('allMatch')}</p>` : ''}${anyNo ? `<p class="note small">ℹ️ ${m_('whyDiff')}</p>` : ''}</section>
      ${rv.length ? `<section class="card"><h3>🧑‍🏫 ${m_('reviewed')}</h3>${rv.map(x => `<div class="area"><span><b>${esc(x.name)}</b><br><small class="muted">${esc(x.about || '')}</small></span></div>`).join('')}</section>` : ''}
      <section class="card"><h3>💻 ${m_('computer')}</h3><p>${m_('computerTxt')}</p></section>
      <section class="card"><h3>🤝 ${m_('promise')}</h3><ul class="list">${MT.promiseList.map(x => `<li>🪔 <span>${pick(x)}</span></li>`).join('')}</ul></section>
      <p class="muted small center">${m_('guidance')}</p>`;
  }
  function bindMethod() {
    document.querySelectorAll('[data-cmp]').forEach(el => el.onchange = () => {
      const id = active().id; V.cmp[id] = Object.assign({}, V.cmp[id], { [el.dataset.cmp]: el.value }); ev('compare.' + el.dataset.cmp);
      const y = window.scrollY; render(); window.scrollTo(0, y);
    });
  }
  function basisLine(r) {
    return `<p class="basis">📐 ${pick(MT.basis).replace('{h}', pick(P_.ord[r.dy.house - 1])).replace('{t}', pick(C.taraName[r.dy.tara]))} · <button class="linkbtn" data-a="tab" data-v="method">${m_('title')} ›</button></p>`;
  }

  /* ---------------- More-menu entries ---------------- */
  X.more.items.splice(0, 0, ['method', '📜', MT.title, MT.sub, false]);
  X.more.items.splice(3, 0,
    ['tyohar', '🪔', GT.tyohar, GT.tyoharSub, false], ['jaap', '📿', GT.jaap, GT.jaapSub, false], ['naam', '👶', GT.naam, GT.naamSub, false], ['year', '📆', GT.year, GT.yearSub, false], ['wa', '💬', GT.wa, GT.waSub, false]);
  X.quick.splice(2, 0, ['tyohar', '🪔', GT.tyohar]);

  /* ---------------- hooks used by app.js ---------------- */
  const G = {
    screens: { home: screenHome, method: screenMethod, tyohar: screenTyohar, jaap: screenJaap, naam: screenNaam, year: screenYear, wa: screenWA },
    tabs: ['tyohar', 'jaap', 'naam', 'year', 'wa', 'method'],
    afterRender() {
      if (V.tab === 'tyohar') bindTyohar();
      if (V.tab === 'method') bindMethod();
      const jm = $('#jpM'); if (jm) jm.onchange = () => { V.jp.m = jm.value; render(); };
      if (S.profiles.length) setTimeout(dailySync, 1500);
    },
    act(a, v, el, e) {
      switch (a) {
        case 'gBuy': buy(v, el.dataset.k || ''); return true;
        case 'giftRedeem': redeemGift(); return true;
        case 'famAdd': famChange('add'); return true;
        case 'famDel': famChange('remove', v); return true;
        case 'planWho': V.plan = v === 'f' ? 'fy' : 'y'; { const pp = $('#pwPlans'); if (pp) { pp.innerHTML = plansHTML(); $('#pwGo').innerHTML = '👑 ' + pick(Y.plan.cont).replace('{p}', planName(V.plan)); } else render(); } return true;
        case 'tyMode': V.ty.mode = v; V.ty.open = null; render(); return true;
        case 'kathaOpen': V.tab = 'tyohar'; V.ty.open = v; ev('katha.' + v); go2(); return true;
        case 'kathaClose': if (V.speaking) stopSpeech(); V.ty.open = null; go2(); return true;
        case 'kathaSpeak': sayOwn('katha', 'katha-' + v, pick(GX.katha[v].t) + '. ' + pick(GX.katha[v].x), L() ? 'hi-IN' : 'en-IN'); return true;
        case 'tdDel': S.tdates = (S.tdates || []).filter(x => x.id !== v); persist(); scheduleReminders(); render(); return true;
        case 'remSet': { const [k, on] = v.split(':'); S.remind = Object.assign({}, S.remind, { [k]: on === '1' }); persist(); render(); scheduleReminders().then(() => isNative() && toast(g('remSet'))); return true; }
        case 'jaapTap': jaapTap(); return true;
        case 'jaapReset': if (S.jaap) { S.jaap.days[jaapToday()] = 0; persist(); } render(); return true;
        case 'shareCard': shareCard(v || 'day').catch(() => toast(pick(['Could not share', 'भेज नहीं सके']))); return true;
        case 'voiceAsk': vaSheet(); return true;
        case 'waDaily': waDaily(v === '1'); return true;
        case 'yearSpeak': say('year', yearSpeech(active()), L() ? 'hi-IN' : 'en-IN'); return true;
        case 'yearPdf': yearPdf(); return true;
        case 'calc': calcSheet(); return true;
        case 'vq': { const [k, on] = v.split(':'); S.vchk = Object.assign({}, S.vchk, { [k]: +on }); persist(); render(); return true; }
        case 'voiceG': S.voiceGender = v; persist(); render(); setTimeout(() => sayOwn('test', 'test', pick(Y.voice.testTxt), L() ? 'hi-IN' : 'en-IN', true), 150); return true;
        case 'restore': syncMe(); toast('✓'); return true;
        case 'homeWho': switchTo(v); V.tab = 'home'; render(); return true;
        case 'naamSyl': V.naamSyl = +v; render(); return true;
        case 'addBaby': V.formPreset = { rel: 2 }; V.afterSave = 'naam'; V.editId = null; V.formPlaceFor = null; V.tab = 'family'; V.sub = 'form'; go2(); return true;
        case 'jpG': V.jp.g = v; const f = (v === 'all' ? jaapPool() : jaapPool().filter(x => x.grp === v))[0]; if (f) V.jp.m = f.id; render(); return true;
        case 'jpSpeak': { const m = jaapPool().find(x => x.id === v); if (m) say('jp', mText(m), 'hi-IN', { rate: 0.8 }); return true; }
      }
      return false;
    }
  };
  /*@@GROWTH_END@@*/
