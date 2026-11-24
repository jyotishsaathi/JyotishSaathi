/* Vastu compass, Muhurat finder, AI Jyotishi, AI Life Report, Daily voice, More tab: texts and rules */
const X = {};
X.tabs = { match: ['Milan', 'मिलान'], more: ['More', 'और'] };
X.quick = [['match', '💞', ['Kundli Milan', 'कुंडली मिलान']], ['vastu', '🧭', ['Vastu Disha', 'वास्तु दिशा']], ['panchang', '📅', ['Panchang', 'पंचांग']], ['muhurat', '🗓️', ['Shubh Muhurat', 'शुभ मुहूर्त']]];
X.more = {
  title: ['More', 'और भी'],
  items: [
    ['vastu', '🧭', ['Vastu Disha (compass)', 'वास्तु दिशा (कम्पास)'], ['Find directions in your home and get Vastu advice', 'घर की दिशा जानें और वास्तु सलाह पाएँ'], false],
    ['panchang', '📅', ['Panchang', 'पंचांग'], ['Tithi, nakshatra, Rahu Kaal and vrat days', 'तिथि, नक्षत्र, राहु काल और व्रत'], false],
    ['family', '👨‍👩‍👧', ['Family & account', 'परिवार और खाता'], ['Add family members, text size, login', 'परिवार जोड़ें, अक्षर का आकार, लॉगिन'], false],
    ['aiask', '🤖', ['AI Jyotishi', 'AI ज्योतिषी'], ['Ask anything, answered from your Kundli', 'कुछ भी पूछें, कुंडली से जवाब'], true],
    ['report', '📜', ['AI Life Report', 'AI जीवन रिपोर्ट'], ['Your complete personal life report', 'आपकी पूरी निजी जीवन रिपोर्ट'], true],
    ['muhurat', '🗓️', ['Shubh Muhurat Finder', 'शुभ मुहूर्त खोजक'], ['Best dates for marriage, griha pravesh, vehicle…', 'विवाह, गृह प्रवेश, वाहन आदि की शुभ तिथियाँ'], true],
    ['voice', '🎙️', ['Daily voice guidance', 'रोज़ का आवाज़ संदेश'], ['Your personal morning message, read aloud', 'आपका निजी सुबह का संदेश, बोलकर'], true],
    ['premium', '👑', ['Premium', 'प्रीमियम'], ['See all Premium features', 'सभी प्रीमियम सुविधाएँ देखें'], false]
  ]
};

/* ---------- Vastu ---------- */
X.dirs = [ // index 0 = North, clockwise every 45°
  { k: 'N', n: ['North', 'उत्तर'], s: ['Uttar', 'उत्तर'], god: ['Kuber (wealth)', 'कुबेर (धन)'], pl: 'Mercury', el: ['Water', 'जल'], col: ['Green, light blue', 'हरा, हल्का नीला'],
    means: ['Direction of money, new opportunities and career. Keep it open, light and clutter-free.', 'धन, नए अवसर और करियर की दिशा। इसे खुला, हल्का और साफ़ रखें।'] },
  { k: 'NE', n: ['North-East', 'उत्तर-पूर्व'], s: ['Ishaan', 'ईशान'], god: ['Lord Shiva (Ishaan)', 'भगवान शिव (ईशान)'], pl: 'Jupiter', el: ['Water', 'जल'], col: ['Yellow, white', 'पीला, सफ़ेद'],
    means: ['The most sacred corner: wisdom, peace and blessings. Best for the pooja room. Keep it the cleanest and lightest part of the home.', 'सबसे पवित्र कोना: ज्ञान, शांति और आशीर्वाद। पूजा घर के लिए सबसे अच्छा। इसे घर का सबसे साफ़ और हल्का हिस्सा रखें।'] },
  { k: 'E', n: ['East', 'पूर्व'], s: ['Purva', 'पूर्व'], god: ['Indra and Surya', 'इंद्र और सूर्य'], pl: 'Sun', el: ['Air / Sun', 'वायु / सूर्य'], col: ['White, light green', 'सफ़ेद, हल्का हरा'],
    means: ['The rising sun: health, respect and good relations with society. Open windows here for morning light.', 'उगते सूर्य की दिशा: स्वास्थ्य, सम्मान और समाज से अच्छे संबंध। सुबह की रोशनी के लिए यहाँ खिड़कियाँ खुली रखें।'] },
  { k: 'SE', n: ['South-East', 'दक्षिण-पूर्व'], s: ['Agneya', 'आग्नेय'], god: ['Agni (fire)', 'अग्नि देव'], pl: 'Venus', el: ['Fire', 'अग्नि'], col: ['Red, orange, pink', 'लाल, नारंगी, गुलाबी'],
    means: ['The fire corner: energy, cash flow and health. The ideal place for the kitchen, stove and electric items.', 'अग्नि कोण: ऊर्जा, पैसे का प्रवाह और स्वास्थ्य। रसोई, चूल्हे और बिजली के सामान के लिए सबसे अच्छी जगह।'] },
  { k: 'S', n: ['South', 'दक्षिण'], s: ['Dakshin', 'दक्षिण'], god: ['Yama (dharma)', 'यमराज (धर्म)'], pl: 'Mars', el: ['Earth', 'पृथ्वी'], col: ['Red, brown', 'लाल, भूरा'],
    means: ['Strength, fame and rest. Good for heavy furniture and the master bedroom. Keep this side higher and closed rather than open.', 'शक्ति, यश और विश्राम। भारी सामान और मुख्य शयनकक्ष के लिए अच्छा। इस तरफ़ को ऊँचा और बंद रखें, खुला नहीं।'] },
  { k: 'SW', n: ['South-West', 'दक्षिण-पश्चिम'], s: ['Nairutya', 'नैऋत्य'], god: ['Nairuti / ancestors (Pitru)', 'नैऋति / पितृ'], pl: 'Rahu', el: ['Earth', 'पृथ्वी'], col: ['Brown, cream, yellow', 'भूरा, क्रीम, पीला'],
    means: ['Stability, the head of the family and savings. Best for the owner\'s bedroom and heavy almirahs. Avoid openings and toilets here.', 'स्थिरता, घर के मुखिया और बचत। मालिक के शयनकक्ष और भारी अलमारी के लिए सबसे अच्छा। यहाँ दरवाज़ा या शौचालय न हो।'] },
  { k: 'W', n: ['West', 'पश्चिम'], s: ['Pashchim', 'पश्चिम'], god: ['Varuna (rain)', 'वरुण देव'], pl: 'Saturn', el: ['Space / water', 'आकाश / जल'], col: ['Blue, white, grey', 'नीला, सफ़ेद, स्लेटी'],
    means: ['Gains, results of hard work and children\'s progress. Good for the dining area, children\'s room and study.', 'लाभ, मेहनत का फल और बच्चों की प्रगति। भोजन कक्ष, बच्चों के कमरे और पढ़ाई के लिए अच्छा।'] },
  { k: 'NW', n: ['North-West', 'उत्तर-पश्चिम'], s: ['Vayavya', 'वायव्य'], god: ['Vayu (wind)', 'वायु देव'], pl: 'Moon', el: ['Air', 'वायु'], col: ['White, cream, silver', 'सफ़ेद, क्रीम, चाँदी'],
    means: ['Movement, support from others and relationships. Good for the guest room, garage and storing grain. Things here do not stay long.', 'गति, दूसरों का सहयोग और संबंध। मेहमान कक्ष, गाड़ी और अनाज रखने के लिए अच्छा। यहाँ रखी चीज़ें ज़्यादा देर नहीं टिकतीं।'] }
];
// rating per room for N, NE, E, SE, S, SW, W, NW : 3 best, 2 good, 1 okay, 0 avoid
X.rooms = [
  { k: 'door', icon: '🚪', n: ['Main door', 'मुख्य द्वार'], how: ['Stand inside the house at the main door and point the top of the phone OUT through the door.', 'घर के अंदर मुख्य द्वार पर खड़े होकर फ़ोन का ऊपरी हिस्सा दरवाज़े से बाहर की ओर रखें।'], r: [3, 3, 3, 0, 1, 0, 2, 2], facing: true },
  { k: 'pooja', icon: '🪔', n: ['Pooja room', 'पूजा घर'], how: ['Stand at the centre of your home and point the phone towards the room.', 'घर के बीच में खड़े होकर फ़ोन को उस कमरे की ओर करें।'], r: [2, 3, 3, 0, 0, 0, 1, 1] },
  { k: 'kitchen', icon: '🍳', n: ['Kitchen', 'रसोई'], how: ['Stand at the centre of your home and point the phone towards the kitchen.', 'घर के बीच में खड़े होकर फ़ोन को रसोई की ओर करें।'], r: [0, 0, 1, 3, 1, 0, 1, 2] },
  { k: 'master', icon: '🛏️', n: ['Master bedroom', 'मुख्य शयनकक्ष'], how: ['Stand at the centre of your home and point the phone towards the bedroom.', 'घर के बीच में खड़े होकर फ़ोन को शयनकक्ष की ओर करें।'], r: [1, 0, 1, 0, 2, 3, 2, 1] },
  { k: 'kids', icon: '📚', n: ['Children / study room', 'बच्चों / पढ़ाई का कमरा'], how: ['Stand at the centre of your home and point the phone towards the room.', 'घर के बीच में खड़े होकर फ़ोन को कमरे की ओर करें।'], r: [2, 2, 3, 0, 1, 1, 3, 2] },
  { k: 'guest', icon: '🧳', n: ['Guest room', 'मेहमान कक्ष'], how: ['Stand at the centre of your home and point the phone towards the room.', 'घर के बीच में खड़े होकर फ़ोन को कमरे की ओर करें।'], r: [2, 1, 2, 1, 1, 0, 2, 3] },
  { k: 'living', icon: '🛋️', n: ['Living room', 'बैठक'], how: ['Stand at the centre of your home and point the phone towards the room.', 'घर के बीच में खड़े होकर फ़ोन को कमरे की ओर करें।'], r: [3, 3, 3, 0, 1, 1, 2, 2] },
  { k: 'toilet', icon: '🚽', n: ['Toilet / bathroom', 'शौचालय / स्नानघर'], how: ['Stand at the centre of your home and point the phone towards the toilet.', 'घर के बीच में खड़े होकर फ़ोन को शौचालय की ओर करें।'], r: [0, 0, 1, 1, 2, 0, 3, 3] },
  { k: 'locker', icon: '💰', n: ['Cash locker / safe', 'तिजोरी / लॉकर'], how: ['Stand at the centre of your home and point the phone towards where the locker is kept.', 'घर के बीच में खड़े होकर फ़ोन को उस ओर करें जहाँ तिजोरी रखी है।'], r: [3, 0, 1, 0, 2, 3, 1, 1], note: ['Keep the locker against the south or west wall so its door opens towards the North (Kuber\'s direction).', 'तिजोरी को दक्षिण या पश्चिम की दीवार से सटाकर रखें, ताकि उसका दरवाज़ा उत्तर (कुबेर की दिशा) की ओर खुले।'] },
  { k: 'stairs', icon: '🪜', n: ['Staircase', 'सीढ़ियाँ'], how: ['Stand at the centre of your home and point the phone towards the staircase.', 'घर के बीच में खड़े होकर फ़ोन को सीढ़ियों की ओर करें।'], r: [0, 0, 1, 2, 3, 3, 3, 2] },
  { k: 'sleep', icon: '😴', n: ['Sleeping head direction', 'सोते समय सिर की दिशा'], how: ['Lie down or stand at the bed and point the top of the phone where your HEAD rests.', 'बिस्तर पर लेटकर या पास खड़े होकर फ़ोन का ऊपरी हिस्सा उस ओर करें जहाँ आपका सिर रहता है।'], r: [0, 1, 3, 2, 3, 2, 2, 1], facing: true,
    note: ['Head to the South gives deep sleep and health; East gives memory and good thoughts. Avoid sleeping with your head to the North.', 'सिर दक्षिण में होने से गहरी नींद और स्वास्थ्य; पूर्व में होने से स्मरण शक्ति और अच्छे विचार। उत्तर की ओर सिर करके न सोएँ।'] },
  { k: 'desk', icon: '💼', n: ['Work / study facing', 'काम / पढ़ाई करते समय मुख'], how: ['Sit at your desk and point the top of the phone where your FACE looks.', 'अपनी मेज़ पर बैठकर फ़ोन का ऊपरी हिस्सा उस ओर करें जिधर आपका मुँह होता है।'], r: [3, 3, 3, 1, 0, 1, 1, 1], facing: true,
    note: ['Facing North brings new opportunities; facing East brings focus and growth.', 'उत्तर की ओर मुख करने से नए अवसर; पूर्व की ओर मुख करने से एकाग्रता और उन्नति।'] }
];
X.rate = [['Avoid', 'बचें'], ['Okay', 'ठीक है'], ['Good', 'अच्छा'], ['Best', 'सबसे अच्छा']];
X.rateTxt = [
  ['Vastu does not recommend this. Try the simple remedies below.', 'वास्तु इसकी सलाह नहीं देता। नीचे दिए आसान उपाय अपनाएँ।'],
  ['Acceptable. A small remedy will make it better.', 'स्वीकार्य है। एक छोटा उपाय इसे और बेहतर करेगा।'],
  ['Good placement as per Vastu.', 'वास्तु के अनुसार अच्छी जगह है।'],
  ['Excellent! This is the ideal direction as per Vastu.', 'बहुत बढ़िया! वास्तु के अनुसार यही सबसे सही दिशा है।']
];
X.remedy = { // simple, free or low-cost remedies for each direction (no products to buy)
  N: [['Keep this side clutter-free and well lit.', 'इस तरफ़ अव्यवस्था न रखें, रोशनी अच्छी रखें।'], ['Keep a green plant or a bowl of clean water here.', 'यहाँ हरा पौधा या साफ़ पानी का बर्तन रखें।'], ['Use green or light blue colours.', 'हरे या हल्के नीले रंग का प्रयोग करें।']],
  NE: [['Keep it spotless every day – no shoes, dustbin or heavy items.', 'इसे रोज़ साफ़ रखें – जूते, कूड़ेदान या भारी सामान न रखें।'], ['Light a diya or keep a copper pot of water here.', 'यहाँ दीया जलाएँ या ताँबे के लोटे में पानी रखें।'], ['If a toilet is here, keep its door closed and a bowl of sea salt inside; change it weekly.', 'अगर यहाँ शौचालय है तो दरवाज़ा बंद रखें और अंदर समुद्री नमक की कटोरी रखें; हर हफ़्ते बदलें।']],
  E: [['Open the windows for morning sunlight.', 'सुबह की धूप के लिए खिड़कियाँ खोलें।'], ['Offer water to the Sun (Surya arghya) in the morning.', 'सुबह सूर्य को जल (अर्घ्य) अर्पित करें।'], ['Keep a tulsi or green plant here.', 'यहाँ तुलसी या हरा पौधा रखें।']],
  SE: [['Light a diya or keep a red lamp here in the evening.', 'शाम को यहाँ दीया या लाल रंग का लैंप जलाएँ।'], ['Avoid keeping water or a water tank in this corner.', 'इस कोने में पानी या पानी की टंकी न रखें।'], ['Use red, orange or pink colours.', 'लाल, नारंगी या गुलाबी रंग का प्रयोग करें।']],
  S: [['Keep heavy furniture against the south wall.', 'भारी सामान दक्षिण की दीवार से सटाकर रखें।'], ['If the door is here, keep a Hanuman ji picture or swastik above it.', 'अगर दरवाज़ा यहाँ है तो उसके ऊपर हनुमान जी का चित्र या स्वस्तिक लगाएँ।'], ['Use red or brown colours; avoid blue here.', 'लाल या भूरे रंग का प्रयोग करें; यहाँ नीला रंग न करें।']],
  SW: [['Keep this corner heavy and closed – almirahs and heavy beds.', 'इस कोने को भारी और बंद रखें – अलमारी और भारी पलंग।'], ['Keep a family photo or pictures of ancestors here.', 'यहाँ परिवार का फ़ोटो या पूर्वजों के चित्र लगाएँ।'], ['If a toilet or door is here, keep a brass or copper item and keep the door closed.', 'अगर यहाँ शौचालय या दरवाज़ा है तो पीतल या ताँबे की कोई वस्तु रखें और दरवाज़ा बंद रखें।']],
  W: [['Good place for the dining table and study.', 'भोजन की मेज़ और पढ़ाई के लिए अच्छी जगह।'], ['Use white, blue or grey colours.', 'सफ़ेद, नीले या स्लेटी रंग का प्रयोग करें।'], ['Keep it tidy so hard work brings results.', 'साफ़ रखें ताकि मेहनत का फल मिले।']],
  NW: [['Keep a white or silver item here for peace of mind.', 'मन की शांति के लिए यहाँ सफ़ेद या चाँदी की वस्तु रखें।'], ['Wind chimes or open windows help the air flow.', 'विंड चाइम या खुली खिड़कियाँ हवा का प्रवाह बढ़ाती हैं।'], ['Do not keep important papers here for long.', 'ज़रूरी कागज़ यहाँ लंबे समय तक न रखें।']]
};
X.rashiDir = [2, 4, 6, 0, 2, 4, 6, 0, 2, 4, 6, 0]; // Mesh/Simha/Dhanu East, Vrishabh/Kanya/Makar South, Mithun/Tula/Kumbh West, Kark/Vrishchik/Meen North
X.dishaShool = [6, 2, 0, 0, 4, 6, 2]; // weekday → direction to avoid travelling in: Sun W, Mon E, Tue N, Wed N, Thu S, Fri W, Sat E
X.v = {
  title: ['Vastu Disha', 'वास्तु दिशा'], sub: ['Hold your phone flat, like a plate. The top of the phone points to the direction shown.', 'फ़ोन को थाली की तरह सीधा पकड़ें। फ़ोन का ऊपरी हिस्सा जिस ओर है, वही दिशा दिखेगी।'],
  scan: ['Scan direction', 'दिशा स्कैन करें'], scanning: ['Scanning… hold the phone still', 'स्कैन हो रहा है… फ़ोन स्थिर रखें'], rescan: ['Scan again', 'फिर से स्कैन करें'],
  facing: ['Your phone is pointing', 'आपका फ़ोन इस ओर है'], live: ['Live compass', 'लाइव कम्पास'],
  noSensor: ['This device has no compass sensor (common on computers). Choose the direction yourself below, or use the Sun check.', 'इस डिवाइस में कम्पास सेंसर नहीं है (कंप्यूटर में अक्सर नहीं होता)। नीचे खुद दिशा चुनें, या सूर्य से जाँचें।'],
  denied: ['Motion sensor permission was not given. Tap Scan again and allow it.', 'मोशन सेंसर की अनुमति नहीं मिली। फिर से स्कैन दबाएँ और अनुमति दें।'],
  calib: ['If the reading jumps, move your phone in a figure-8 a few times, away from metal and magnets.', 'अगर दिशा बार-बार बदले, तो फ़ोन को हवा में 8 के आकार में कुछ बार घुमाएँ, लोहे और चुंबक से दूर।'],
  pickDir: ['Or choose the direction', 'या दिशा चुनें'],
  place: ['Your place', 'आपकी जगह'],
  sunNow: ['Sun check', 'सूर्य से जाँच'], sunTxt: ['Right now the Sun is in the {d} ({a}°), {h}° above the horizon. Point your phone at the Sun: the compass should show {d}.', 'अभी सूर्य {d} दिशा ({a}°) में है, क्षितिज से {h}° ऊपर। फ़ोन को सूर्य की ओर करें: कम्पास में {d} दिखना चाहिए।'],
  sunDown: ['The Sun has set. Tomorrow morning it rises in the {d}.', 'सूर्य अस्त हो चुका है। कल सुबह यह {d} में उगेगा।'],
  meaning: ['What this direction means', 'इस दिशा का अर्थ'], deity: ['Deity', 'देवता'], planet: ['Planet', 'ग्रह'], element: ['Element', 'तत्व'], colours: ['Good colours', 'शुभ रंग'],
  bestFor: ['Best for', 'सबसे अच्छा'], avoidFor: ['Avoid', 'बचें'],
  check: ['Check a room', 'कमरे की जाँच करें'], checkSub: ['Choose what you want to check, follow the tip, then scan.', 'जो जाँचना है वह चुनें, निर्देश मानें, फिर स्कैन करें।'],
  result: ['Vastu result', 'वास्तु परिणाम'], remedies: ['Simple remedies', 'आसान उपाय'], idealDirs: ['Ideal directions for this', 'इसके लिए सही दिशाएँ'],
  forYou: ['For you', 'आपके लिए'], lucky: ['Your lucky direction (from your Moon sign {r})', 'आपकी शुभ दिशा (चंद्र राशि {r} से)'],
  luckyTxt: ['Face {d} for important work, prayers and signing papers.', 'ज़रूरी काम, पूजा और कागज़ पर हस्ताक्षर करते समय {d} की ओर मुख करें।'],
  shool: ['Today\'s Disha Shool', 'आज का दिशा शूल'], shoolTxt: ['Today ({w}) avoid starting a journey towards the {d}. If you must go, eat a little {f} before leaving.', 'आज ({w}) {d} दिशा की यात्रा शुरू न करें। जाना ज़रूरी हो तो निकलने से पहले थोड़ा {f} खाएँ।'],
  shoolFood: [['ghee or dalia', 'घी या दलिया'], ['a sip of milk or a mirror look', 'दूध या दर्पण देखकर'], ['jaggery (gud)', 'गुड़'], ['sesame or coriander', 'तिल या धनिया'], ['curd (dahi)', 'दही'], ['barley or jau', 'जौ'], ['urad dal or ginger', 'उड़द या अदरक']],
  saveHome: ['Save to my home map', 'मेरे घर के नक्शे में सहेजें'], homeMap: ['My home Vastu map', 'मेरे घर का वास्तु नक्शा'], homeEmpty: ['Check rooms one by one and save them here to see your home\'s Vastu score.', 'एक-एक कमरा जाँचें और यहाँ सहेजें, अपने घर का वास्तु स्कोर देखें।'],
  score: ['Home Vastu score', 'घर का वास्तु स्कोर'], clear: ['Clear', 'मिटाएँ'],
  disclaimer: ['Vastu is traditional guidance. Phone compasses can be off near metal; for building work, consult a Vastu expert.', 'वास्तु पारंपरिक मार्गदर्शन है। लोहे के पास फ़ोन का कम्पास गलत हो सकता है; निर्माण कार्य के लिए वास्तु विशेषज्ञ से सलाह लें।']
};

/* ---------- Muhurat ---------- */
// nakshatra indices 0 Ashwini … 26 Revati
X.events = [
  { k: 'vivah', icon: '💍', n: ['Marriage (Vivah)', 'विवाह'], nak: [3, 4, 9, 11, 12, 14, 16, 18, 20, 25, 26], wd: [1, 3, 4, 5], noKharmas: true, noCombust: ['Jupiter', 'Venus'] },
  { k: 'griha', icon: '🏠', n: ['Griha Pravesh (new home)', 'गृह प्रवेश'], nak: [3, 4, 11, 13, 16, 20, 21, 22, 23, 25, 26], wd: [1, 3, 4, 5, 6], noKharmas: true, noCombust: ['Jupiter', 'Venus'] },
  { k: 'vehicle', icon: '🚗', n: ['Vehicle purchase', 'वाहन ख़रीदना'], nak: [0, 3, 4, 6, 7, 12, 13, 14, 16, 21, 22, 23, 26], wd: [1, 3, 4, 5, 0] },
  { k: 'property', icon: '🏡', n: ['Property / land purchase', 'संपत्ति / ज़मीन ख़रीदना'], nak: [3, 4, 7, 11, 12, 16, 20, 21, 25, 26], wd: [1, 3, 4, 5], noKharmas: true },
  { k: 'business', icon: '🏪', n: ['New shop / business opening', 'नई दुकान / व्यापार शुरू'], nak: [0, 3, 4, 7, 11, 12, 13, 16, 20, 25, 26], wd: [3, 4, 5] },
  { k: 'gold', icon: '🪙', n: ['Gold / jewellery purchase', 'सोना / आभूषण ख़रीदना'], nak: [0, 3, 6, 7, 11, 12, 13, 16, 20, 21, 25, 26], wd: [0, 3, 4, 5] },
  { k: 'naming', icon: '👶', n: ['Naming ceremony (Namkaran)', 'नामकरण'], nak: [0, 3, 4, 6, 7, 11, 12, 13, 14, 16, 20, 21, 22, 23, 25, 26], wd: [1, 3, 4, 5] },
  { k: 'travel', icon: '✈️', n: ['Starting a journey', 'यात्रा आरंभ'], nak: [0, 4, 6, 7, 12, 16, 21, 22, 26], wd: [1, 3, 4, 5] }
];
X.m = {
  title: ['Shubh Muhurat Finder', 'शुभ मुहूर्त खोजक'], sub: ['Auspicious dates in the next 3 months, checked for tithi, nakshatra, weekday, Kharmas, Guru-Shukra asta and your own Tara and Chandra bala.', 'अगले 3 महीनों की शुभ तिथियाँ – तिथि, नक्षत्र, वार, खरमास, गुरु-शुक्र अस्त और आपके तारा व चंद्र बल की जाँच के साथ।'],
  pick: ['What is the occasion?', 'किस काम के लिए?'], forWho: ['Checked for', 'किसके लिए'], best: ['Best dates', 'सबसे शुभ तिथियाँ'],
  none: ['No fully auspicious date in the next 3 months. Please consult your family pandit.', 'अगले 3 महीनों में पूरी तरह शुभ तिथि नहीं मिली। कृपया अपने पंडित जी से सलाह लें।'],
  kharmas: ['Kharmas {a} – {b}: no dates shown, as marriage and griha pravesh are traditionally not done then.', 'खरमास {a} – {b}: इस समय विवाह और गृह प्रवेश परंपरागत रूप से नहीं होते, इसलिए ये तिथियाँ नहीं दिखाई गईं।'],
  combust: ['{p} is combust (asta) until about {d}.', '{p} लगभग {d} तक अस्त है।'],
  abhijit: ['Best time (Abhijit)', 'शुभ समय (अभिजीत)'], avoid: ['Avoid (Rahu Kaal)', 'टालें (राहु काल)'],
  why: ['Why', 'क्यों'], taraGood: ['Good Tara for you', 'आपके लिए शुभ तारा'], chandraGood: ['Moon favourable for you', 'चंद्रमा आपके अनुकूल'],
  shukla: ['Shukla paksha', 'शुक्ल पक्ष'], note: ['These dates follow common Panchang rules. For marriage and griha pravesh, please confirm the exact lagna time with your pandit.', 'ये तिथियाँ सामान्य पंचांग नियमों पर आधारित हैं। विवाह और गृह प्रवेश के लिए सटीक लग्न समय अपने पंडित जी से ज़रूर पूछें।'],
  locked: ['Premium: see all auspicious dates', 'प्रीमियम: सभी शुभ तिथियाँ देखें']
};

/* ---------- AI Jyotishi, Life Report, Voice ---------- */
X.ai = {
  title: ['AI Jyotishi', 'AI ज्योतिषी'], sub: ['Ask any question. The answer is written from {n}\'s Kundli and current dasha.', 'कोई भी सवाल पूछें। जवाब {n} की कुंडली और वर्तमान दशा से लिखा जाएगा।'],
  ph: ['Type your question…', 'अपना सवाल लिखें…'], ask: ['Ask', 'पूछें'], thinking: ['Studying the Kundli…', 'कुंडली देख रहे हैं…'],
  sugg: [['When will my career improve?', 'मेरा करियर कब सुधरेगा?'], ['Is this a good year for buying a house?', 'क्या यह साल घर ख़रीदने के लिए अच्छा है?'], ['How will my health be this year?', 'इस साल मेरा स्वास्थ्य कैसा रहेगा?'], ['When is a good time for my child\'s marriage?', 'मेरे बच्चे की शादी का अच्छा समय कब है?'], ['Which remedy should I do for Shani?', 'शनि के लिए कौन सा उपाय करूँ?']],
  limit: ['You have used today\'s AI questions. Please ask again tomorrow.', 'आज के AI सवाल पूरे हो गए। कृपया कल फिर पूछें।'],
  fail: ['Could not get an answer right now. Please try again.', 'अभी जवाब नहीं मिल सका। कृपया फिर कोशिश करें।'],
  clear: ['Clear chat', 'बातचीत मिटाएँ'], note: ['AI guidance from your Kundli. For health, legal or money decisions, consult an expert.', 'कुंडली पर आधारित AI मार्गदर्शन। स्वास्थ्य, क़ानूनी या पैसे के फ़ैसलों के लिए विशेषज्ञ से सलाह लें।']
};
X.rep = {
  title: ['AI Life Report', 'AI जीवन रिपोर्ट'], sub: ['A complete personal report for {n}: personality, career, money, marriage, health, family, spiritual path and the next 5 years.', '{n} के लिए पूरी निजी रिपोर्ट: स्वभाव, करियर, धन, विवाह, स्वास्थ्य, परिवार, आध्यात्मिक मार्ग और अगले 5 साल।'],
  make: ['Create my Life Report', 'मेरी जीवन रिपोर्ट बनाएँ'], again: ['Create a new report', 'नई रिपोर्ट बनाएँ'], wait: ['Writing your report… this takes about a minute.', 'आपकी रिपोर्ट लिखी जा रही है… लगभग एक मिनट लगेगा।'],
  made: ['Created on', 'बनाई गई'], pdf: ['Download PDF (with Kundli)', 'PDF डाउनलोड करें (कुंडली के साथ)'], years: ['The next 5 years', 'अगले 5 साल'], remedies: ['Remedies for you', 'आपके लिए उपाय'],
  fail: ['Could not create the report right now. Please try again.', 'अभी रिपोर्ट नहीं बन सकी। कृपया फिर कोशिश करें।'], monthly: ['One new report per person each month.', 'हर व्यक्ति के लिए हर महीने एक नई रिपोर्ट।']
};
X.voice = {
  title: ['Daily voice guidance', 'रोज़ का आवाज़ संदेश'], play: ['Play today\'s message', 'आज का संदेश सुनें'], stop: ['Stop', 'रोकें'],
  sub: ['A personal morning message for {n}, read aloud in your language.', '{n} के लिए निजी सुबह का संदेश, आपकी भाषा में बोलकर।'],
  tip: ['Tip: play it every morning with your tea ☕', 'सुझाव: रोज़ सुबह चाय के साथ सुनें ☕']
};
X.prem = {
  nowAdd: [
    ['🤖', ['AI Jyotishi', 'AI ज्योतिषी'], ['Ask anything and get a detailed answer from your chart (20 a day)', 'कुछ भी पूछें, अपनी कुंडली से विस्तृत जवाब पाएँ (रोज़ 20)']],
    ['📜', ['AI Life Report', 'AI जीवन रिपोर्ट'], ['A complete personal life report, also in the PDF', 'पूरी निजी जीवन रिपोर्ट, PDF में भी']],
    ['🗓️', ['Shubh Muhurat Finder', 'शुभ मुहूर्त खोजक'], ['Best dates for marriage, griha pravesh, vehicle and more', 'विवाह, गृह प्रवेश, वाहन आदि के लिए शुभ तिथियाँ']],
    ['🎙️', ['Daily voice guidance', 'रोज़ का आवाज़ संदेश'], ['A personal morning message in your language', 'आपकी भाषा में रोज़ सुबह निजी संदेश']]
  ],
  testTitle: ['For testing (preview only)', 'टेस्टिंग के लिए (केवल प्रीव्यू)'], testOn: ['Turn Premium preview ON', 'प्रीमियम प्रीव्यू चालू करें'], testOff: ['Turn Premium preview OFF', 'प्रीमियम प्रीव्यू बंद करें']
};
C.prem.now.push(...X.prem.nowAdd);
C.prem.ai = [];
