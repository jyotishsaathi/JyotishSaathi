/* Round 5: detailed life readings, family switcher, temple location, Vastu calibration, voice, plans */
const Y = {};
Y.who = {
  forLbl: ['For', 'किसके लिए'], title: ['Whose Kundli?', 'किसकी कुंडली?'], sub: ['Everything in the app – Today, Kundli, Palm, Milan, Vastu, Muhurat and Jyotish Sahayak – follows the person you choose here.', 'ऐप में सब कुछ – आज, कुंडली, हस्तरेखा, मिलान, वास्तु, मुहूर्त और ज्योतिष सहायक – यहाँ चुने गए व्यक्ति के लिए होगा।'],
  add: ['Add family member', 'परिवार का सदस्य जोड़ें'], manage: ['Manage family', 'परिवार प्रबंधित करें'], left: ['{n} of {m} free places used', '{m} में से {n} मुफ़्त जगह भरी'],
  switched: ['Now showing {n}', 'अब {n} की जानकारी'], close: ['Close', 'बंद करें']
};
Y.more = ['Read more', 'और पढ़ें'], Y.less = ['Show less', 'कम दिखाएँ'];
Y.house = [ // simple meaning of each house (bhava)
  ['self, body and personality', 'स्वयं, शरीर और स्वभाव'], ['money, family and speech', 'धन, परिवार और वाणी'], ['courage, effort and siblings', 'साहस, मेहनत और भाई-बहन'],
  ['home, mother, property and peace of mind', 'घर, माता, संपत्ति और मन की शांति'], ['children, intelligence and good karma', 'संतान, बुद्धि और पूर्व पुण्य'], ['health, debts, enemies and daily work', 'स्वास्थ्य, कर्ज़, शत्रु और रोज़ का काम'],
  ['marriage and partnership', 'विवाह और साझेदारी'], ['sudden changes, secrets and long life', 'अचानक बदलाव, गुप्त बातें और आयु'], ['luck, father, guru and dharma', 'भाग्य, पिता, गुरु और धर्म'],
  ['career, status and karma', 'करियर, पद और कर्म'], ['income, gains and friends', 'आय, लाभ और मित्र'], ['expenses, foreign travel and moksha', 'ख़र्च, विदेश यात्रा और मोक्ष']
];
Y.placeKind = h => [1, 4, 7, 10].includes(h) ? 'kendra' : [5, 9].includes(h) ? 'trikona' : [2, 11].includes(h) ? 'dhana' : h === 3 ? 'effort' : h === 6 ? 'six' : h === 8 ? 'eight' : 'twelve';
Y.placeTxt = {
  kendra: ['This is a strong, visible position: results come through your own active effort and are easy to see.', 'यह एक मज़बूत स्थान (केंद्र) है: फल आपकी अपनी मेहनत से आते हैं और साफ़ दिखते हैं।'],
  trikona: ['This is a lucky position (trikona): blessings, good karma and help from elders support this area.', 'यह भाग्य का स्थान (त्रिकोण) है: आशीर्वाद, पूर्व पुण्य और बड़ों की मदद इस क्षेत्र को सहारा देते हैं।'],
  dhana: ['This is a money-giving position: this area is closely linked with income and savings for you.', 'यह धन देने वाला स्थान है: आपके लिए यह क्षेत्र आय और बचत से गहराई से जुड़ा है।'],
  effort: ['This position rewards courage and steady effort: results come step by step, through your own initiative.', 'यह स्थान साहस और लगातार मेहनत का फल देता है: परिणाम धीरे-धीरे, आपकी अपनी पहल से आते हैं।'],
  six: ['This position brings results through hard work, service and handling competition. Avoid loans and disputes in this area.', 'यह स्थान मेहनत, सेवा और प्रतिस्पर्धा से फल देता है। इस क्षेत्र में कर्ज़ और विवाद से बचें।'],
  eight: ['This is a hidden position: results can come suddenly, with ups and downs. Patience, research and faith help most.', 'यह गुप्त स्थान है: फल अचानक और उतार-चढ़ाव के साथ आ सकते हैं। धैर्य, शोध और आस्था सबसे ज़्यादा मदद करते हैं।'],
  twelve: ['This position is linked with expenses, distant places and spirituality: spend wisely, and results may come from far away or abroad.', 'यह स्थान ख़र्च, दूर की जगहों और अध्यात्म से जुड़ा है: सोच-समझकर ख़र्च करें, फल दूर या विदेश से आ सकते हैं।']
};
Y.dig = {
  ex: ['very strong (exalted) – gives excellent results', 'बहुत बलवान (उच्च) – उत्तम फल देता है'], own: ['strong (in its own sign) – gives steady, reliable results', 'बलवान (स्वराशि) – स्थिर और भरोसेमंद फल देता है'],
  friend: ['comfortable (in a friendly sign) – gives good results', 'सहज (मित्र राशि) – अच्छे फल देता है'], neutral: ['average strength – results depend on effort', 'सामान्य बल – फल मेहनत पर निर्भर'],
  enemy: ['uncomfortable (in an unfriendly sign) – results come with some struggle', 'असहज (शत्रु राशि) – फल कुछ संघर्ष के साथ आते हैं'], deb: ['weak (debilitated) – needs remedies; results improve with age and patience', 'कमज़ोर (नीच) – उपाय ज़रूरी; उम्र और धैर्य के साथ फल सुधरते हैं'],
  combust: ['It is close to the Sun (combust), so its results may feel hidden; remedies help.', 'यह सूर्य के पास (अस्त) है, इसलिए इसके फल छिपे से लग सकते हैं; उपाय मदद करते हैं।'],
  retro: ['It is retrograde: results may come late or after a second try.', 'यह वक्री है: फल देर से या दूसरी कोशिश में आ सकते हैं।']
};
Y.d = {
  chart: ['What your chart shows', 'आपकी कुंडली क्या कहती है'], when: ['Timing', 'समय'], todo: ['What you should do', 'आपको क्या करना चाहिए'], rem: ['Simple remedy', 'आसान उपाय'],
  lordIs: ['The lord of your {h} house ({m}) is {p}. It sits in your {h2} house ({m2}).', 'आपके {h} भाव ({m}) के स्वामी {p} हैं। वे आपके {h2} भाव ({m2}) में बैठे हैं।'],
  isNow: ['{p} is {d}', '{p} {d}'],
  inside: ['Planets sitting in this area: {l}.', 'इस भाव में बैठे ग्रह: {l}।'], none: ['No planet sits in this house, so its lord decides the results.', 'इस भाव में कोई ग्रह नहीं है, इसलिए इसके स्वामी ही फल तय करते हैं।'],
  jupAsp: ['Jupiter looks at this house – a strong sign of protection and growth.', 'गुरु की दृष्टि इस भाव पर है – यह सुरक्षा और उन्नति का अच्छा संकेत है।'],
  satAsp: ['Saturn looks at this house – results are slow but long-lasting; do not lose patience.', 'शनि की दृष्टि इस भाव पर है – फल धीरे आते हैं पर टिकाऊ होते हैं; धैर्य न खोएँ।'],
  marsAsp: ['Mars looks at this house – lots of energy here; avoid haste and anger.', 'मंगल की दृष्टि इस भाव पर है – यहाँ ऊर्जा बहुत है; जल्दबाज़ी और ग़ुस्से से बचें।'],
  karaka: ['{p}, the natural planet (karaka) for this area, is {d}', 'इस क्षेत्र के कारक ग्रह {p} {d}'],
  nowDasha: ['You are now in {md} Mahadasha with {ad} Antardasha (until {e}).', 'अभी आप पर {md} की महादशा और {ad} की अंतर्दशा चल रही है ({e} तक)।'],
  dashaGood: ['This period is connected to this area, so it is active for you now.', 'यह दशा इस क्षेत्र से जुड़ी है, इसलिए अभी यह क्षेत्र आपके लिए सक्रिय है।'],
  dashaOther: ['This period is not directly linked to this area; use it to prepare.', 'यह दशा इस क्षेत्र से सीधे जुड़ी नहीं है; इस समय तैयारी करें।'],
  nextGood: ['Most helpful period: {s} – {e} ({p}).', 'सबसे मददगार समय: {s} – {e} ({p})।'], ord: (n, hi) => hi ? `${n}वें` : n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th')
};
Y.tips = { // practical tips per area for strong (s), average (a) and weak (w) results
  career: { s: [['Aim higher – ask for responsibility or a bigger role.', 'ऊँचा लक्ष्य रखें – ज़िम्मेदारी या बड़ा पद माँगें।'], ['Start new projects in the helpful period shown above.', 'ऊपर बताए अच्छे समय में नए काम शुरू करें।'], ['Respect seniors; their support multiplies your success.', 'बड़ों का सम्मान करें; उनका सहयोग सफलता बढ़ाता है।']],
    a: [['Build one strong skill this year; steady work pays.', 'इस साल एक हुनर पक्का करें; लगातार मेहनत फल देगी।'], ['Avoid sudden job changes outside the helpful period.', 'अच्छे समय के बाहर अचानक नौकरी न बदलें।'], ['Keep your work papers and promises clean.', 'काम के कागज़ और वादे साफ़ रखें।']],
    w: [['Do not quit without a backup plan.', 'दूसरा रास्ता तय किए बिना काम न छोड़ें।'], ['Small, regular progress is better than big risks now.', 'अभी बड़े जोखिम से अच्छा है छोटी-छोटी नियमित प्रगति।'], ['Serve and help others at work – it softens hurdles.', 'काम पर दूसरों की मदद करें – इससे रुकावटें कम होती हैं।']] },
  money: { s: [['Good time to invest in safe, long-term options.', 'सुरक्षित, लंबी अवधि के निवेश के लिए अच्छा समय।'], ['Buy property or gold in the helpful period.', 'अच्छे समय में संपत्ति या सोना ख़रीदें।'], ['Share some income in daan – it keeps wealth flowing.', 'आय का कुछ हिस्सा दान करें – इससे धन का प्रवाह बना रहता है।']],
    a: [['Save a fixed amount every month, even if small.', 'हर महीने एक तय रक़म बचाएँ, चाहे छोटी हो।'], ['Avoid lending large amounts to friends.', 'दोस्तों को बड़ी रक़म उधार न दें।'], ['Check documents twice before signing.', 'हस्ताक्षर से पहले कागज़ दो बार जाँचें।']],
    w: [['Avoid loans, speculation and get-rich-quick offers.', 'कर्ज़, सट्टा और जल्दी अमीर बनने वाले ऑफ़र से बचें।'], ['Keep an emergency fund for 3–6 months of expenses.', '3–6 महीने के ख़र्च जितना आपातकालीन पैसा रखें।'], ['Keep your locker in the south-west, opening north.', 'तिजोरी दक्षिण-पश्चिम में रखें, दरवाज़ा उत्तर की ओर।']] },
  love: { s: [['Plan important family or marriage events in the helpful period.', 'परिवार या विवाह के बड़े काम अच्छे समय में करें।'], ['Express appreciation openly – it deepens the bond.', 'खुलकर सराहना करें – इससे रिश्ता गहरा होता है।'], ['Spend one evening a week together without phones.', 'हफ़्ते में एक शाम बिना फ़ोन के साथ बिताएँ।']],
    a: [['Listen more than you speak in disagreements.', 'मतभेद में बोलने से ज़्यादा सुनें।'], ['Small surprises and kindness keep harmony.', 'छोटे सरप्राइज़ और प्यार से सामंजस्य बना रहता है।'], ['For matches, use Kundli Milan before deciding.', 'रिश्ते के लिए फ़ैसले से पहले कुंडली मिलान करें।']],
    w: [['Avoid decisions in anger; wait a day before reacting.', 'ग़ुस्से में फ़ैसला न लें; प्रतिक्रिया से पहले एक दिन रुकें।'], ['Involve elders or a counsellor if conflicts repeat.', 'झगड़े बार-बार हों तो बड़ों या सलाहकार की मदद लें।'], ['Worship Gauri-Shankar together on Mondays.', 'सोमवार को साथ मिलकर गौरी-शंकर की पूजा करें।']] },
  health: { s: [['Keep your good routine – walking, yoga and early sleep.', 'अच्छी दिनचर्या बनाए रखें – सैर, योग और जल्दी सोना।'], ['Yearly health check-ups keep it that way.', 'हर साल स्वास्थ्य जाँच कराते रहें।'], ['Share your energy – help elders and the needy.', 'अपनी ऊर्जा बाँटें – बड़ों और ज़रूरतमंदों की मदद करें।']],
    a: [['Fix meal and sleep timings.', 'भोजन और नींद का समय तय करें।'], ['Walk 30 minutes daily and drink enough water.', 'रोज़ 30 मिनट टहलें और भरपूर पानी पिएँ।'], ['Do pranayama for 10 minutes in the morning.', 'सुबह 10 मिनट प्राणायाम करें।']],
    w: [['Do not ignore small symptoms – see a doctor early.', 'छोटे लक्षणों को नज़रअंदाज़ न करें – जल्दी डॉक्टर को दिखाएँ।'], ['Avoid heavy, fried food and late nights.', 'भारी, तली चीज़ें और देर रात जागने से बचें।'], ['Chant the Mahamrityunjaya mantra 11 times daily.', 'रोज़ 11 बार महामृत्युंजय मंत्र जपें।']] },
  family: { s: [['Host family get-togethers; your home brings people together.', 'परिवार को इकट्ठा करें; आपका घर सबको जोड़ता है।'], ['Good period for home renovation or buying a house.', 'घर की मरम्मत या घर ख़रीदने का अच्छा समय।'], ['Take blessings from your mother regularly.', 'माँ का आशीर्वाद नियमित लें।']],
    a: [['Keep the home clean and the north-east corner light.', 'घर साफ़ और ईशान कोण हल्का रखें।'], ['Give time to children and parents every week.', 'हर हफ़्ते बच्चों और माता-पिता को समय दें।'], ['Settle small property matters calmly.', 'संपत्ति के छोटे मामले शांति से सुलझाएँ।']],
    w: [['Avoid property disputes; prefer compromise.', 'संपत्ति के विवाद से बचें; समझौते को चुनें।'], ['Light a diya in the evening at home.', 'शाम को घर में दीया जलाएँ।'], ['Serve your mother or an elderly woman.', 'माँ या किसी बुज़ुर्ग महिला की सेवा करें।']] },
  children: { s: [['Go for higher studies or certifications.', 'उच्च शिक्षा या सर्टिफ़िकेट कोर्स करें।'], ['Teach or guide others – it brings respect.', 'दूसरों को सिखाएँ – इससे सम्मान मिलता है।'], ['Visit holy places in the helpful period.', 'अच्छे समय में तीर्थ यात्रा करें।']],
    a: [['Study at a fixed time, facing east or north.', 'तय समय पर, पूर्व या उत्तर की ओर मुँह करके पढ़ें।'], ['Read one good book a month.', 'हर महीने एक अच्छी किताब पढ़ें।'], ['Respect teachers and gurus.', 'शिक्षकों और गुरुओं का सम्मान करें।']],
    w: [['Revise regularly; avoid last-minute study.', 'नियमित दोहराएँ; आख़िरी समय की पढ़ाई से बचें।'], ['Chant the Saraswati vandana before study.', 'पढ़ाई से पहले सरस्वती वंदना करें।'], ['Feed green grass to a cow on Wednesdays.', 'बुधवार को गाय को हरा चारा खिलाएँ।']] }
};
Y.tipsGeneric = { s: [['Use the helpful period shown above for big steps.', 'बड़े क़दम ऊपर बताए अच्छे समय में उठाएँ।']], a: [['Steady effort and patience bring results here.', 'यहाँ लगातार मेहनत और धैर्य से फल मिलता है।']], w: [['Go slow, avoid risks and do the remedy below.', 'धीरे चलें, जोखिम से बचें और नीचे दिया उपाय करें।']] };
Y.ptable = { title: ['Planet positions', 'ग्रह स्थिति'], pl: ['Planet', 'ग्रह'], sign: ['Sign', 'राशि'], deg: ['Degree', 'अंश'], nak: ['Nakshatra', 'नक्षत्र'], h: ['House', 'भाव'], st: ['Status', 'स्थिति'],
  ex: ['Exalted', 'उच्च'], own: ['Own sign', 'स्वराशि'], deb: ['Debilitated', 'नीच'], retro: ['Retrograde', 'वक्री'], combust: ['Combust', 'अस्त'], friend: ['Friendly', 'मित्र'], enemy: ['Unfriendly', 'शत्रु'], neutral: ['Neutral', 'सम'], varg: ['Vargottama', 'वर्गोत्तम'] };
Y.pColor = { Sun: '#E8711C', Moon: '#6E7FA0', Mars: '#C7372F', Mercury: '#1F9254', Jupiter: '#C28A00', Venus: '#C2457E', Saturn: '#2F4FA2', Rahu: '#5B5B66', Ketu: '#8A5A2B' };

/* ---------- Temple location ---------- */
Y.tl = {
  near: ['📍 Near me', '📍 मेरे पास'], other: ['🔎 Another place', '🔎 दूसरी जगह'],
  ph: ['Type a place, e.g. Agra or Begur, Bangalore', 'जगह लिखें, जैसे आगरा या बेगूर, बेंगलुरु'], set: ['Show temples here', 'यहाँ के मंदिर दिखाएँ'],
  showing: ['Showing temples near {p}', '{p} के पास के मंदिर'], change: ['Change', 'बदलें'], need: ['Please type a place name', 'कृपया जगह का नाम लिखें']
};

/* ---------- Vastu calibration ---------- */
Y.vc = {
  steps: [['Calibrate', 'कैलिब्रेट'], ['Scan', 'स्कैन'], ['Result', 'परिणाम']],
  calib: ['Step 1: Calibrating the compass… slowly move your phone in a figure-8 ∞', 'चरण 1: कम्पास कैलिब्रेट हो रहा है… फ़ोन को धीरे-धीरे 8 के आकार ∞ में घुमाएँ'],
  steady: ['Step 2: Scanning your surroundings… hold the phone flat and still', 'चरण 2: आसपास स्कैन हो रहा है… फ़ोन को सीधा और स्थिर रखें'],
  flat: ['Hold the phone flat like a plate', 'फ़ोन को थाली की तरह सीधा रखें'],
  acc: ['Accuracy', 'सटीकता'], q: [['Excellent', 'बहुत अच्छी'], ['Good', 'अच्छी'], ['Weak – move away from metal, magnets and electric items, then scan again', 'कमज़ोर – लोहे, चुंबक और बिजली के सामान से दूर होकर फिर स्कैन करें']],
  field: ['Magnetic field', 'चुंबकीय क्षेत्र'], stable: ['stable', 'स्थिर'], unstable: ['disturbed', 'अस्थिर'], samples: ['readings', 'रीडिंग'],
  moveMore: ['Move the phone a bit more in a figure-8', 'फ़ोन को थोड़ा और 8 के आकार में घुमाएँ']
};

/* ---------- Voice ---------- */
Y.voice = { title: ['Voice', 'आवाज़'], sub: ['Choose the voice that reads predictions and mantras. Indian voices sound the most natural.', 'भविष्यफल और मंत्र पढ़ने वाली आवाज़ चुनें। भारतीय आवाज़ सबसे स्वाभाविक लगती है।'],
  auto: ['Best Indian voice (automatic)', 'सबसे अच्छी भारतीय आवाज़ (अपने-आप)'], test: ['Test voice', 'आवाज़ सुनें'], speed: ['Speed', 'गति'], slow: ['Slow', 'धीमी'], normal: ['Normal', 'सामान्य'],
  testTxt: ['Namaste. I am your Jyotish Saathi. Have a blessed day.', 'नमस्ते। मैं आपका ज्योतिष साथी हूँ। आपका दिन शुभ हो।'],
  noHindi: ['No Hindi voice was found on this device, so mantras are read in English letters. On Android, install "Google Speech Services" and download Hindi for the best voice.', 'इस डिवाइस में हिंदी आवाज़ नहीं मिली, इसलिए मंत्र अंग्रेज़ी अक्षरों में पढ़े जा रहे हैं। Android पर "Google Speech Services" में हिंदी डाउनलोड करें।'] };

/* ---------- Plans and limits ---------- */
Y.plan = { pick: ['Choose your plan', 'अपना प्लान चुनें'], cont: ['Continue with {p}', '{p} के साथ आगे बढ़ें'], perDay: ['only ₹{d} a day', 'सिर्फ़ ₹{d} रोज़'],
  previewOn: ['Premium preview activated with the {p} plan (testing – no payment taken).', '{p} प्लान के साथ प्रीमियम प्रीव्यू चालू (टेस्टिंग – कोई भुगतान नहीं)।'] };
Y.palm = { usedFor: ['The free palm reading for {n} is already used. Each person gets one free reading (3 people in total). Get Premium for new readings.', '{n} की मुफ़्त हस्तरेखा पढ़ाई हो चुकी है। हर व्यक्ति को एक मुफ़्त पढ़ाई मिलती है (कुल 3 लोग)। नई पढ़ाई के लिए प्रीमियम लें।'],
  rule: ['Free: 1 reading per person, for up to 3 family members.', 'मुफ़्त: हर व्यक्ति के लिए 1 पढ़ाई, परिवार के 3 सदस्यों तक।'] };
Y.fam = { full: ['Free accounts can save {n} people. Get Premium to add more family members.', 'मुफ़्त खाते में {n} लोग सहेजे जा सकते हैं। और सदस्य जोड़ने के लिए प्रीमियम लें।'] };
Y.premGo = { open: ['Open', 'खोलें'] };
Y.tl.map = ['Map', 'मैप']; Y.tl.route = ['Route', 'रास्ता'];
Y.tl.searching = ['Searching places…', 'जगह खोज रहे हैं…'];
Y.tl.useTyped = ['Use "{q}"', '"{q}" ही इस्तेमाल करें'];
Y.tl.ph = ['Type an area or city, e.g. Begur Bangalore, Kamla Nagar Delhi', 'इलाका या शहर लिखें, जैसे बेगूर बेंगलुरु, कमला नगर दिल्ली'];
Y.tl.attrib = ['Places: India Post, GeoNames (CC BY 4.0) and © OpenStreetMap contributors', 'जगहें: इंडिया पोस्ट, GeoNames (CC BY 4.0) और © OpenStreetMap योगदानकर्ता'];
