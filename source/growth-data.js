/* Data for: festival & vrat calendar, vrat kathas, naamkaran, regional-language UI words, Vastu checklist */
const GX = {};

/* Lunar months (amanta, 0 = Chaitra) */
GX.months = [['Chaitra', 'चैत्र'], ['Vaishakh', 'वैशाख'], ['Jyeshtha', 'ज्येष्ठ'], ['Ashadh', 'आषाढ़'], ['Shravan', 'श्रावण'], ['Bhadrapad', 'भाद्रपद'],
  ['Ashwin', 'आश्विन'], ['Kartik', 'कार्तिक'], ['Margashirsha', 'मार्गशीर्ष'], ['Paush', 'पौष'], ['Magh', 'माघ'], ['Phalgun', 'फाल्गुन']];

/* Festivals: [id, month (amanta), tithi index at sunrise (0-14 shukla, 15-29 krishna), icon, name, katha id]
   Dates follow the sunrise (udaya) tithi. A few festivals are kept at night or moonrise, so local calendars can differ by a day. */
GX.fest = [
  ['gudi', 0, 0, '🚩', ['Chaitra Navratri begins · Gudi Padwa · Ugadi', 'चैत्र नवरात्रि आरंभ · गुड़ी पड़वा · उगादि']],
  ['ram', 0, 8, '🏹', ['Ram Navami', 'राम नवमी']],
  ['hanuman', 0, 14, '🚩', ['Hanuman Jayanti', 'हनुमान जयंती'], 'purnima'],
  ['akshaya', 1, 2, '💰', ['Akshaya Tritiya', 'अक्षय तृतीया']],
  ['buddha', 1, 14, '🪷', ['Buddha Purnima', 'बुद्ध पूर्णिमा'], 'purnima'],
  ['vatsavitri', 1, 29, '🌳', ['Vat Savitri Vrat', 'वट सावित्री व्रत']],
  ['nirjala', 2, 10, '💧', ['Nirjala Ekadashi', 'निर्जला एकादशी'], 'ekadashi'],
  ['rath', 3, 1, '🛕', ['Jagannath Rath Yatra', 'जगन्नाथ रथ यात्रा']],
  ['devshayani', 3, 10, '🙏', ['Devshayani Ekadashi', 'देवशयनी एकादशी'], 'ekadashi'],
  ['guru', 3, 14, '📿', ['Guru Purnima', 'गुरु पूर्णिमा'], 'purnima'],
  ['nag', 4, 4, '🐍', ['Nag Panchami', 'नाग पंचमी']],
  ['rakhi', 4, 14, '🎀', ['Raksha Bandhan', 'रक्षा बंधन'], 'purnima'],
  ['janmashtami', 4, 22, '🪈', ['Krishna Janmashtami', 'कृष्ण जन्माष्टमी']],
  ['teej', 5, 2, '🌿', ['Hartalika Teej', 'हरतालिका तीज']],
  ['ganesh', 5, 3, '🐘', ['Ganesh Chaturthi', 'गणेश चतुर्थी']],
  ['anant', 5, 13, '🕉️', ['Anant Chaturdashi', 'अनंत चतुर्दशी']],
  ['pitru', 5, 15, '🪔', ['Pitru Paksha begins (Shraddh)', 'पितृ पक्ष आरंभ (श्राद्ध)']],
  ['mahalaya', 5, 29, '🪔', ['Sarva Pitru Amavasya', 'सर्व पितृ अमावस्या']],
  ['navratri', 6, 0, '🌺', ['Sharad Navratri begins', 'शारदीय नवरात्रि आरंभ']],
  ['ashtami', 6, 7, '🔱', ['Durga Ashtami', 'दुर्गा अष्टमी']],
  ['dussehra', 6, 9, '🏹', ['Dussehra · Vijayadashami', 'दशहरा · विजयादशमी']],
  ['sharad', 6, 14, '🌕', ['Sharad Purnima', 'शरद पूर्णिमा'], 'purnima'],
  ['karva', 6, 18, '🌙', ['Karva Chauth', 'करवा चौथ'], 'karva'],
  ['dhanteras', 6, 27, '🪙', ['Dhanteras', 'धनतेरस']],
  ['diwali', 6, 29, '🪔', ['Diwali · Lakshmi Puja', 'दीपावली · लक्ष्मी पूजा']],
  ['govardhan', 7, 0, '⛰️', ['Govardhan Puja', 'गोवर्धन पूजा']],
  ['bhaidooj', 7, 1, '🤝', ['Bhai Dooj', 'भाई दूज']],
  ['chhath', 7, 5, '🌅', ['Chhath Puja', 'छठ पूजा']],
  ['devuthani', 7, 10, '🙏', ['Dev Uthani Ekadashi · Tulsi Vivah', 'देवउठनी एकादशी · तुलसी विवाह'], 'ekadashi'],
  ['kartikp', 7, 14, '🪔', ['Kartik Purnima · Dev Deepawali', 'कार्तिक पूर्णिमा · देव दीपावली'], 'purnima'],
  ['gita', 8, 10, '📖', ['Mokshada Ekadashi · Gita Jayanti', 'मोक्षदा एकादशी · गीता जयंती'], 'ekadashi'],
  ['vasant', 10, 4, '🌼', ['Vasant Panchami · Saraswati Puja', 'वसंत पंचमी · सरस्वती पूजा']],
  ['shivratri', 10, 28, '🔱', ['Maha Shivratri', 'महाशिवरात्रि'], 'pradosh'],
  ['holika', 11, 14, '🔥', ['Holika Dahan', 'होलिका दहन'], 'purnima'],
  ['holi', 11, 15, '🎨', ['Holi', 'होली']],
];
/* Festivals kept at a time other than sunrise: tithi checked at sunset ('set'), moonrise ('moon') or midnight ('mid') */
GX.rule = { holika: 'set', diwali: 'set', dhanteras: 'set', karva: 'moon', shivratri: 'mid', pradosh: 'set', dussehra: 'set', sharad: 'moon' };
/* Solar festivals: [id, sidereal sign the Sun enters, icon, name] */
GX.solar = [['makar', 9, '🪁', ['Makar Sankranti · Pongal', 'मकर संक्रांति · पोंगल']], ['baisakhi', 0, '🌾', ['Baisakhi · Mesh Sankranti', 'बैसाखी · मेष संक्रांति']]];

/* Ekadashi names: [shukla, krishna] for each amanta month */
GX.ekadashi = [[['Kamada', 'कामदा'], ['Varuthini', 'वरूथिनी']], [['Mohini', 'मोहिनी'], ['Apara', 'अपरा']], [['Nirjala', 'निर्जला'], ['Yogini', 'योगिनी']],
  [['Devshayani', 'देवशयनी'], ['Kamika', 'कामिका']], [['Shravan Putrada', 'श्रावण पुत्रदा'], ['Aja', 'अजा']], [['Parivartini', 'परिवर्तिनी'], ['Indira', 'इंदिरा']],
  [['Papankusha', 'पापांकुशा'], ['Rama', 'रमा']], [['Dev Uthani', 'देवउठनी'], ['Utpanna', 'उत्पन्ना']], [['Mokshada', 'मोक्षदा'], ['Saphala', 'सफला']],
  [['Paush Putrada', 'पौष पुत्रदा'], ['Shattila', 'षटतिला']], [['Jaya', 'जया'], ['Vijaya', 'विजया']], [['Amalaki', 'आमलकी'], ['Papmochani', 'पापमोचनी']]];

/* Monthly vrats by sunrise tithi */
GX.vrat = {
  ekadashi: { icon: '🙏', n: ['Ekadashi', 'एकादशी'], katha: 'ekadashi', tithi: [10, 25] },
  pradosh: { icon: '🔱', n: ['Pradosh Vrat', 'प्रदोष व्रत'], katha: 'pradosh', tithi: [12, 27] },
  purnima: { icon: '🌕', n: ['Purnima', 'पूर्णिमा'], katha: 'purnima', tithi: [14] },
  amavasya: { icon: '🌑', n: ['Amavasya', 'अमावस्या'], tithi: [29] },
  sankashti: { icon: '🐘', n: ['Sankashti Chaturthi', 'संकष्टी चतुर्थी'], katha: 'sankashti', tithi: [18] },
};

/* Short vrat kathas, retold simply (read aloud in the app) */
GX.katha = {
  ekadashi: {
    t: ['Ekadashi Vrat Katha', 'एकादशी व्रत कथा'],
    x: ['Long ago a powerful demon named Mur troubled the gods. Lord Vishnu fought him for many years and then rested in a cave at Badrikashram. When Mur came to attack the sleeping Lord, a radiant goddess appeared from Vishnu\'s body and defeated the demon. Pleased, the Lord named her Ekadashi, because she appeared on the eleventh day of the moon, and blessed her: whoever keeps a fast on this day with a clean heart, remembers the Lord and avoids grains, will have their wrong deeds washed away and their home filled with peace. Since then devotees fast on Ekadashi, sing bhajans, give food to the needy and break the fast the next morning after sunrise.',
      'बहुत समय पहले मुर नाम का एक शक्तिशाली दैत्य देवताओं को सताता था। भगवान विष्णु ने वर्षों तक उससे युद्ध किया और फिर बद्रिकाश्रम की एक गुफा में विश्राम करने लगे। जब मुर सोते हुए भगवान पर वार करने आया, तब विष्णु जी के शरीर से एक तेजस्वी देवी प्रकट हुईं और उन्होंने दैत्य का अंत कर दिया। प्रसन्न होकर भगवान ने उनका नाम एकादशी रखा, क्योंकि वे चंद्रमा की ग्यारहवीं तिथि को प्रकट हुई थीं, और वरदान दिया कि जो इस दिन सच्चे मन से व्रत रखेगा, भगवान का स्मरण करेगा और अन्न नहीं खाएगा, उसके पाप धुल जाएँगे और घर में शांति रहेगी। तभी से भक्त एकादशी का व्रत रखते हैं, भजन गाते हैं, ज़रूरतमंदों को भोजन देते हैं और अगले दिन सूर्योदय के बाद व्रत खोलते हैं।'] },
  purnima: {
    t: ['Purnima · Satyanarayan Katha', 'पूर्णिमा · सत्यनारायण कथा'],
    x: ['Once Narad Muni saw people on earth suffering and asked Lord Vishnu for a simple way to remove their troubles. The Lord told him about the Satyanarayan puja: on Purnima, with family and friends, worship the Lord of Truth, offer prasad of wheat flour, ghee, sugar and banana, listen to the katha and share the prasad with everyone. A poor brahmin, a woodcutter, a merchant and a king each kept this vrat and their lives became happy. But when the merchant forgot his promise to do the puja, he faced trouble, and his luck returned only when he kept his word. The message of the katha is simple: speak the truth, keep your promises, and never refuse prasad.',
      'एक बार नारद मुनि ने धरती पर लोगों को दुखी देखा और भगवान विष्णु से उनके कष्ट दूर करने का सरल उपाय पूछा। भगवान ने सत्यनारायण पूजा बताई: पूर्णिमा के दिन परिवार और मित्रों के साथ सत्य के स्वामी की पूजा करें, आटे, घी, शक्कर और केले का प्रसाद चढ़ाएँ, कथा सुनें और प्रसाद सबमें बाँटें। एक निर्धन ब्राह्मण, एक लकड़हारा, एक व्यापारी और एक राजा, सभी ने यह व्रत किया और उनका जीवन सुखी हो गया। पर जब व्यापारी पूजा का वचन भूल गया, तो उस पर संकट आया, और वचन निभाने पर ही उसका भाग्य लौटा। कथा का संदेश सरल है: सच बोलें, वचन निभाएँ और प्रसाद का कभी अनादर न करें।'] },
  pradosh: {
    t: ['Pradosh Vrat Katha', 'प्रदोष व्रत कथा'],
    x: ['When the gods and demons churned the ocean, a deadly poison called Halahal came out first and the whole world began to burn. Everyone ran to Lord Shiva. To save the world, Mahadev drank the poison and held it in his throat, which turned blue, so he is called Neelkanth. It was the evening time of Trayodashi, the pradosh kaal. The grateful gods danced and sang in praise of Shiva, and he was very pleased. So the evening of every Trayodashi is dear to Shiva. Devotees fast during the day, and at sunset worship Shiv ji with water, milk, bel leaves and a diya, chant Om Namah Shivaya, and pray for health and freedom from worries.',
      'जब देवताओं और दानवों ने समुद्र मंथन किया, तो सबसे पहले हलाहल नाम का भयंकर विष निकला और पूरा संसार जलने लगा। सब भगवान शिव के पास दौड़े। संसार को बचाने के लिए महादेव ने विष पी लिया और उसे अपने कंठ में रोक लिया, जिससे उनका कंठ नीला हो गया, इसलिए वे नीलकंठ कहलाते हैं। वह त्रयोदशी की संध्या, यानी प्रदोष काल था। कृतज्ञ देवताओं ने शिव जी की स्तुति में नृत्य और गान किया, और भोलेनाथ बहुत प्रसन्न हुए। इसलिए हर त्रयोदशी की संध्या शिव जी को प्रिय है। भक्त दिन में व्रत रखते हैं, सूर्यास्त के समय जल, दूध, बेलपत्र और दीपक से शिव जी की पूजा करते हैं, ॐ नमः शिवाय का जाप करते हैं और स्वास्थ्य तथा चिंताओं से मुक्ति की प्रार्थना करते हैं।'] },
  sankashti: {
    t: ['Sankashti Chaturthi Katha', 'संकष्टी चतुर्थी कथा'],
    x: ['Once Lord Ganesh was returning home after a feast, riding his little mouse. The mouse tripped and Ganesh ji fell. The Moon saw this and laughed at him. Ganesh ji said that whoever looks at the Moon on this day would face blame. The Moon felt sorry and prayed for forgiveness. Kind Ganesh ji softened his words and said: on the Chaturthi after Purnima, people who fast for me and worship the Moon after it rises will have their troubles, sankat, removed. That is why this vrat is called Sankashti. Devotees fast during the day, worship Ganesh ji with durva grass and modak, and break the fast after offering water to the Moon at night.',
      'एक बार गणेश जी भोज से लौट रहे थे और अपने छोटे से मूषक पर सवार थे। मूषक लड़खड़ाया और गणेश जी गिर पड़े। यह देखकर चंद्रमा हँस पड़ा। गणेश जी ने कहा कि आज के दिन जो चंद्रमा को देखेगा, उस पर कलंक लगेगा। चंद्रमा को पछतावा हुआ और उसने क्षमा माँगी। दयालु गणेश जी ने अपना वचन नरम किया और कहा: पूर्णिमा के बाद की चतुर्थी को जो मेरा व्रत रखेगा और चंद्रोदय के बाद चंद्रमा की पूजा करेगा, उसके सारे संकट दूर होंगे। इसीलिए इसे संकष्टी चतुर्थी कहते हैं। भक्त दिन में व्रत रखते हैं, दूर्वा और मोदक से गणेश जी की पूजा करते हैं और रात को चंद्रमा को अर्घ्य देकर व्रत खोलते हैं।'] },
  karva: {
    t: ['Karva Chauth Katha', 'करवा चौथ कथा'],
    x: ['Veeravati, the only sister of seven loving brothers, kept her first Karva Chauth fast at her parents\' home. By evening she was weak with hunger and thirst. Her brothers could not bear it, so they lit a fire behind a tree and showed her the glow, saying the moon had risen. Veeravati broke her fast, and soon news came that her husband had fallen very ill. Heartbroken, she prayed to Goddess Parvati, who told her what had happened. For a whole year Veeravati kept every Chauth fast with full faith, and on the next Karva Chauth her husband was blessed with good health. Since then married women keep this fast for the long life of their husbands and open it only after seeing the real moon.',
      'सात प्यार करने वाले भाइयों की इकलौती बहन वीरवती ने अपना पहला करवा चौथ व्रत मायके में रखा। शाम तक वह भूख-प्यास से बहुत कमज़ोर हो गई। भाइयों से यह देखा न गया, तो उन्होंने पेड़ के पीछे आग जलाकर उसकी रोशनी दिखाई और कहा कि चाँद निकल आया है। वीरवती ने व्रत खोल लिया, और जल्द ही समाचार आया कि उसके पति बहुत बीमार हैं। दुखी होकर उसने माता पार्वती से प्रार्थना की, जिन्होंने उसे सारी बात बताई। पूरे एक वर्ष वीरवती ने हर चौथ का व्रत पूरी श्रद्धा से रखा, और अगले करवा चौथ पर उसके पति को अच्छे स्वास्थ्य का आशीर्वाद मिला। तभी से सुहागिनें पति की लंबी आयु के लिए यह व्रत रखती हैं और असली चाँद देखकर ही व्रत खोलती हैं।'] },
};

/* Naamkaran: first syllable for each nakshatra pada (Avakahada chakra) [roman, devanagari] */
GX.syl = [
  [['Chu', 'चु'], ['Che', 'चे'], ['Cho', 'चो'], ['La', 'ला']], [['Li', 'ली'], ['Lu', 'लू'], ['Le', 'ले'], ['Lo', 'लो']], [['A', 'अ'], ['I', 'इ'], ['U', 'उ'], ['E', 'ए']],
  [['O', 'ओ'], ['Va', 'वा'], ['Vi', 'वी'], ['Vu', 'वू']], [['Ve', 'वे'], ['Vo', 'वो'], ['Ka', 'का'], ['Ki', 'की']], [['Ku', 'कु'], ['Gha', 'घ'], ['Na', 'ङ'], ['Chha', 'छ']],
  [['Ke', 'के'], ['Ko', 'को'], ['Ha', 'हा'], ['Hi', 'ही']], [['Hu', 'हु'], ['He', 'हे'], ['Ho', 'हो'], ['Da', 'डा']], [['Di', 'डी'], ['Du', 'डू'], ['De', 'डे'], ['Do', 'डो']],
  [['Ma', 'मा'], ['Mi', 'मी'], ['Mu', 'मू'], ['Me', 'मे']], [['Mo', 'मो'], ['Ta', 'टा'], ['Ti', 'टी'], ['Tu', 'टू']], [['Te', 'टे'], ['To', 'टो'], ['Pa', 'पा'], ['Pi', 'पी']],
  [['Pu', 'पू'], ['Sha', 'ष'], ['Na', 'ण'], ['Tha', 'ठ']], [['Pe', 'पे'], ['Po', 'पो'], ['Ra', 'रा'], ['Ri', 'री']], [['Ru', 'रू'], ['Re', 'रे'], ['Ro', 'रो'], ['Ta', 'ता']],
  [['Ti', 'ती'], ['Tu', 'तू'], ['Te', 'ते'], ['To', 'तो']], [['Na', 'ना'], ['Ni', 'नी'], ['Nu', 'नू'], ['Ne', 'ने']], [['No', 'नो'], ['Ya', 'या'], ['Yi', 'यी'], ['Yu', 'यू']],
  [['Ye', 'ये'], ['Yo', 'यो'], ['Bha', 'भा'], ['Bhi', 'भी']], [['Bhu', 'भू'], ['Dha', 'धा'], ['Pha', 'फा'], ['Dha', 'ढा']], [['Bhe', 'भे'], ['Bho', 'भो'], ['Ja', 'जा'], ['Ji', 'जी']],
  [['Khi', 'खी'], ['Khu', 'खू'], ['Khe', 'खे'], ['Kho', 'खो']], [['Ga', 'गा'], ['Gi', 'गी'], ['Gu', 'गू'], ['Ge', 'गे']], [['Go', 'गो'], ['Sa', 'सा'], ['Si', 'सी'], ['Su', 'सू']],
  [['Se', 'से'], ['So', 'सो'], ['Da', 'दा'], ['Di', 'दी']], [['Du', 'दू'], ['Tha', 'थ'], ['Jha', 'झ'], ['Na', 'ञ']], [['De', 'दे'], ['Do', 'दो'], ['Cha', 'चा'], ['Chi', 'ची']],
];
/* Names: 'Roman|देवनागरी|b or g|meaning|अर्थ' */
GX.names = `Chetan|चेतन|b|Awareness|चेतना
Chirag|चिराग|b|Lamp|दीपक
Chaitanya|चैतन्य|b|Consciousness|चेतना, ज्ञान
Chandan|चंदन|b|Sandalwood|चंदन
Charu|चारु|g|Beautiful|सुंदर
Chetna|चेतना|g|Awareness|जागृति
Chandni|चांदनी|g|Moonlight|चाँद की रोशनी
Chhavi|छवि|g|Image, radiance|छवि, आभा
Chhaya|छाया|g|Shade, protection|छाया
Chhatrapati|छत्रपति|b|King|राजा
Lakshya|लक्ष्य|b|Goal|लक्ष्य
Lalit|ललित|b|Graceful|सुंदर, मनोहर
Lokesh|लोकेश|b|Lord of the world|संसार के स्वामी
Lavanya|लावण्य|g|Grace, beauty|सौंदर्य
Leela|लीला|g|Divine play|ईश्वर की लीला
Lipika|लिपिका|g|Letter, script|लेख
Aarav|आरव|b|Peaceful|शांत
Arjun|अर्जुन|b|Bright, the archer|उज्ज्वल, धनुर्धर
Aditya|आदित्य|b|The Sun|सूर्य
Ananya|अनन्या|g|Unique|अनोखी
Aditi|अदिति|g|Mother of the gods|देवताओं की माता
Ishaan|ईशान|b|Lord Shiva, north-east|भगवान शिव
Isha|ईशा|g|Goddess|देवी
Ira|इरा|g|Earth, Saraswati|पृथ्वी, सरस्वती
Utkarsh|उत्कर्ष|b|Progress|उन्नति
Uday|उदय|b|Rising|उदय होना
Urvi|उर्वी|g|Earth|पृथ्वी
Ekansh|एकांश|b|Whole|संपूर्ण
Eshan|एशान|b|Desire, wish|इच्छा
Esha|एषा|g|Desire|इच्छा
Om|ओम|b|Sacred sound|पवित्र ध्वनि
Ojas|ओजस|b|Energy, glow|तेज
Oviya|ओविया|g|Artist|कलाकार
Vansh|वंश|b|Family line|वंश
Varun|वरुण|b|God of water|जल देवता
Vivek|विवेक|b|Wisdom|विवेक, समझ
Vihaan|विहान|b|Dawn|भोर
Vishal|विशाल|b|Large-hearted|विशाल
Vedant|वेदांत|b|Ultimate knowledge|वेदों का सार
Vani|वाणी|g|Speech, Saraswati|वाणी
Vidhi|विधि|g|Destiny|भाग्य
Vedika|वेदिका|g|Altar|वेदी
Vrinda|वृंदा|g|Tulsi|तुलसी
Kabir|कबीर|b|Great|महान
Kartik|कार्तिक|b|Son of Shiva|कार्तिकेय
Kiran|किरण|b|Ray of light|किरण
Kavya|काव्या|g|Poetry|कविता
Kiara|कियारा|g|Bright|उज्ज्वल
Kriti|कृति|g|Creation|रचना
Kunal|कुणाल|b|Lotus|कमल
Kush|कुश|b|Son of Ram|राम के पुत्र
Kusum|कुसुम|g|Flower|फूल
Ketan|केतन|b|Home, flag|घर, ध्वज
Keshav|केशव|b|Lord Krishna|श्री कृष्ण
Ketki|केतकी|g|A flower|एक फूल
Komal|कोमल|g|Soft|कोमल
Ghanshyam|घनश्याम|b|Lord Krishna|श्री कृष्ण
Gaurav|गौरव|b|Pride|गौरव
Harsh|हर्ष|b|Joy|खुशी
Hardik|हार्दिक|b|Heartfelt|दिल से
Himani|हिमानी|g|Snow|बर्फ़
Harini|हरिणी|g|Deer|हिरनी
Hitesh|हितेश|b|Lord of goodness|भलाई के स्वामी
Hemant|हेमंत|b|Winter|शीत ऋतु
Hema|हेमा|g|Gold|सोना
Hrithik|हृतिक|b|From the heart|दिल से
Hoshiyar|होशियार|b|Clever|समझदार
Daksh|दक्ष|b|Skilful|कुशल
Darsh|दर्श|b|Sight, vision|दर्शन
Divya|दिव्या|g|Divine|दिव्य
Diya|दीया|g|Lamp|दीपक
Deepak|दीपक|b|Lamp|दीपक
Dev|देव|b|God|देवता
Devika|देविका|g|Little goddess|देवी
Dhruv|ध्रुव|b|Pole star|ध्रुव तारा
Dhanush|धनुष|b|Bow|धनुष
Dhara|धरा|g|Earth|पृथ्वी
Dhriti|धृति|g|Patience|धैर्य
Madhav|माधव|b|Lord Krishna|श्री कृष्ण
Manav|मानव|b|Human|मनुष्य
Mihir|मिहिर|b|The Sun|सूर्य
Mukund|मुकुंद|b|Lord Vishnu|भगवान विष्णु
Meera|मीरा|g|Devotee of Krishna|कृष्ण भक्त
Mahi|माही|g|Earth|पृथ्वी
Mitali|मिताली|g|Friendship|मित्रता
Megha|मेघा|g|Cloud|बादल
Mohan|मोहन|b|Lord Krishna|श्री कृष्ण
Mohini|मोहिनी|g|Enchanting|मनमोहक
Tanmay|तन्मय|b|Absorbed|मग्न
Tarun|तरुण|b|Young|युवा
Tejas|तेजस|b|Brilliance|तेज
Tushar|तुषार|b|Snow, dew|ओस
Tara|तारा|g|Star|तारा
Tanvi|तन्वी|g|Delicate|कोमल
Tulsi|तुलसी|g|Holy basil|तुलसी
Pranav|प्रणव|b|Sacred Om|ओम
Parth|पार्थ|b|Arjun|अर्जुन
Pratik|प्रतीक|b|Symbol|प्रतीक
Pooja|पूजा|g|Worship|पूजा
Prisha|प्रिशा|g|Gift of God|ईश्वर का उपहार
Pallavi|पल्लवी|g|New leaves|नई कोंपलें
Punit|पुनीत|b|Pure|पवित्र
Purvi|पूर्वी|g|From the east|पूर्व की
Shaurya|शौर्य|b|Bravery|वीरता
Shivansh|शिवांश|b|Part of Shiva|शिव का अंश
Shreya|श्रेया|g|Auspicious|शुभ
Shanaya|शनाया|g|First ray of sun|सूर्य की पहली किरण
Naman|नमन|b|Salutation|प्रणाम
Nakul|नकुल|b|A Pandava|पांडव
Nikhil|निखिल|b|Complete|संपूर्ण
Nitin|नितिन|b|Master of the right path|सही राह का स्वामी
Navya|नव्या|g|New, young|नई
Nisha|निशा|g|Night|रात
Nidhi|निधि|g|Treasure|खज़ाना
Neha|नेहा|g|Love|स्नेह
Rahul|राहुल|b|Efficient|कुशल
Raghav|राघव|b|Lord Ram|श्री राम
Rishi|ऋषि|b|Sage|ऋषि
Rohit|रोहित|b|Red, the rising sun|उगता सूरज
Radha|राधा|g|Beloved of Krishna|कृष्ण प्रिया
Riya|रिया|g|Singer|गायिका
Ruchi|रुचि|g|Liking, light|रुचि
Reva|रेवा|g|River Narmada|नर्मदा नदी
Roshni|रोशनी|g|Light|रोशनी
Yash|यश|b|Fame|यश
Yuvraj|युवराज|b|Prince|राजकुमार
Yogesh|योगेश|b|Lord of yoga|योग के स्वामी
Yamini|यामिनी|g|Night|रात
Yukti|युक्ति|g|Idea, skill|उपाय
Bharat|भरत|b|India, brother of Ram|भारत
Bhavesh|भावेश|b|Lord of the world|संसार के स्वामी
Bhumi|भूमि|g|Earth|धरती
Bhavya|भव्य|g|Grand|भव्य
Bhuvan|भुवन|b|The world|संसार
Phalgun|फाल्गुन|b|A month, Arjun|फाल्गुन मास
Jai|जय|b|Victory|जीत
Jatin|जतिन|b|Lord Shiva|भगवान शिव
Jiya|जिया|g|Heart|दिल
Janvi|जान्वी|g|River Ganga|गंगा नदी
Jhanvi|झान्वी|g|River Ganga|गंगा
Khushal|खुशाल|b|Happy|खुशहाल
Khushi|खुशी|g|Happiness|खुशी
Khem|खेम|b|Well-being|कुशलता
Gautam|गौतम|b|Buddha|बुद्ध
Girish|गिरीश|b|Lord Shiva|भगवान शिव
Gunjan|गुंजन|g|Humming|गुनगुनाहट
Gauri|गौरी|g|Goddess Parvati|माता पार्वती
Gopal|गोपाल|b|Lord Krishna|श्री कृष्ण
Gomti|गोमती|g|A holy river|पवित्र नदी
Sahil|साहिल|b|Shore|किनारा
Siddharth|सिद्धार्थ|b|One who achieved|सफल
Suraj|सूरज|b|Sun|सूर्य
Saanvi|सान्वी|g|Goddess Lakshmi|माता लक्ष्मी
Siya|सिया|g|Sita|सीता
Sukanya|सुकन्या|g|Good girl|अच्छी कन्या
Sejal|सेजल|g|River water|नदी का जल
Somesh|सोमेश|b|Lord of the moon|चंद्रमा के स्वामी
Sonal|सोनल|g|Golden|सुनहरी
Darpan|दर्पण|b|Mirror|दर्पण
Dinesh|दिनेश|b|The Sun|सूर्य
Disha|दिशा|g|Direction|दिशा
Durga|दुर्गा|g|Goddess Durga|माँ दुर्गा
Dushyant|दुष्यंत|b|A king|एक राजा
Thakur|ठाकुर|b|Lord|स्वामी
Chaitali|चैताली|g|Born in Chaitra|चैत्र में जन्मी
Chinmay|चिन्मय|b|Full of knowledge|ज्ञानमय`;

/* Vastu checklist: [id, question, good answer 1=yes 0=no, tip if not] */
GX.vchk = [
  ['door', ['Is your main door in the North, East or North-East?', 'क्या मुख्य द्वार उत्तर, पूर्व या उत्तर-पूर्व में है?'], 1, ['Keep the entrance bright and clean, add a toran and a nameplate.', 'प्रवेश द्वार को उजला और साफ़ रखें, तोरण और नामपट्ट लगाएँ।']],
  ['puja', ['Is the puja place in the North-East?', 'क्या पूजा स्थान उत्तर-पूर्व में है?'], 1, ['If you can, move the puja to the North-East; else face East while praying.', 'हो सके तो पूजा उत्तर-पूर्व में रखें; नहीं तो पूजा करते समय पूर्व की ओर मुख करें।']],
  ['kitchen', ['Is the kitchen in the South-East?', 'क्या रसोई दक्षिण-पूर्व में है?'], 1, ['Cook facing East; keep the stove away from the sink.', 'पूर्व की ओर मुख करके खाना बनाएँ; चूल्हा सिंक से दूर रखें।']],
  ['bed', ['Is the main bedroom in the South-West?', 'क्या मुख्य शयनकक्ष दक्षिण-पश्चिम में है?'], 1, ['Sleep with your head to the South or East.', 'सिर दक्षिण या पूर्व की ओर करके सोएँ।']],
  ['toilet', ['Is there a toilet in the North-East?', 'क्या उत्तर-पूर्व में शौचालय है?'], 0, ['Keep it very clean and the door closed; place sea salt in a bowl.', 'इसे बहुत साफ़ और दरवाज़ा बंद रखें; एक कटोरी में समुद्री नमक रखें।']],
  ['clutter', ['Is the North-East corner free of heavy things and clutter?', 'क्या उत्तर-पूर्व कोना भारी सामान और कबाड़ से खाली है?'], 1, ['Move heavy cupboards to the South-West; keep the North-East light.', 'भारी अलमारियाँ दक्षिण-पश्चिम में रखें; उत्तर-पूर्व हल्का रखें।']],
  ['locker', ['Does your money locker open towards the North?', 'क्या तिजोरी उत्तर की ओर खुलती है?'], 1, ['Place the locker on the South wall so it opens to the North.', 'तिजोरी दक्षिण की दीवार पर रखें ताकि वह उत्तर की ओर खुले।']],
  ['water', ['Is the water tank or borewell in the North or North-East?', 'क्या पानी की टंकी या बोरवेल उत्तर या उत्तर-पूर्व में है?'], 1, ['Overhead tanks are best in the South-West; underground water in the North-East.', 'छत की टंकी दक्षिण-पश्चिम में और ज़मीन के नीचे का पानी उत्तर-पूर्व में सबसे अच्छा है।']],
  ['center', ['Is the centre of the home open (no pillar, toilet or heavy furniture)?', 'क्या घर का बीच का हिस्सा खुला है (खंभा, शौचालय या भारी फ़र्नीचर नहीं)?'], 1, ['Keep the centre (Brahmasthan) open and well lit.', 'घर का बीच (ब्रह्मस्थान) खुला और रोशन रखें।']],
  ['mirror', ['Is there a mirror facing your bed?', 'क्या बिस्तर के सामने शीशा है?'], 0, ['Cover the mirror at night or move it.', 'रात में शीशा ढक दें या हटा दें।']],
  ['light', ['Does morning sunlight come into the home?', 'क्या सुबह की धूप घर में आती है?'], 1, ['Open East windows in the morning for at least 30 minutes.', 'सुबह कम से कम 30 मिनट पूर्व की खिड़कियाँ खोलें।']],
  ['plants', ['Do you keep thorny plants (except rose) inside the home?', 'क्या घर के अंदर काँटेदार पौधे (गुलाब छोड़कर) हैं?'], 0, ['Keep cactus outside; tulsi and money plant are good inside.', 'कैक्टस बाहर रखें; तुलसी और मनी प्लांट अंदर अच्छे हैं।']],
];

/* Marathi and Gujarati: words used across the app's menus and buttons (keyed by the English text).
   Content such as predictions and kathas is shown in Hindi for these languages. */
GX.rg = { mr: {}, gu: {} };
`Today|आज|આજ
Kundli|कुंडली|કુંડળી
Milan|मिलन|મિલન
Palm|हस्तरेषा|હસ્તરેખા
Bhakti|भक्ती|ભક્તિ
More|अधिक|વધુ
Back|मागे|પાછા
Cancel|रद्द करा|રદ કરો
Listen|ऐका|સાંભળો
Stop|थांबा|રોકો
Save|जतन करा|સાચવો
Delete|हटवा|કાઢી નાખો
OK|ठीक आहे|બરાબર
Tomorrow|उद्या|આવતીકાલ
Share on WhatsApp|व्हॉट्सॲपवर पाठवा|વોટ્સએપ પર મોકલો
Panchang|पंचांग|પંચાંગ
Premium|प्रीमियम|પ્રીમિયમ
Family & account|कुटुंब आणि खाते|પરિવાર અને ખાતું
Festivals & vrat|सण आणि व्रत|તહેવાર અને વ્રત
Jaap counter|जप माळ|જાપ માળા
Baby names|बाळाचे नाव|બાળકનું નામ
Year ahead|पुढचे वर्ष|આવતું વર્ષ
WhatsApp rashifal|व्हॉट्सॲप राशीभविष्य|વોટ્સએપ રાશિફળ
Shubh Muhurat Finder|शुभ मुहूर्त शोधक|શુભ મુહૂર્ત શોધક
Vastu Disha (compass)|वास्तु दिशा (होकायंत्र)|વાસ્તુ દિશા (હોકાયંત્ર)
AI Jyotishi|AI ज्योतिषी|AI જ્યોતિષી
AI Life Report|AI जीवन अहवाल|AI જીવન અહેવાલ
Daily voice guidance|रोजचा आवाज संदेश|રોજનો અવાજ સંદેશ
See all Premium features|सर्व प्रीमियम सुविधा पहा|બધી પ્રીમિયમ સુવિધાઓ જુઓ
Ask by voice|बोलून विचारा|બોલીને પૂછો
Share card|कार्ड पाठवा|કાર્ડ મોકલો
Listen to today's rashifal|आजचे राशीभविष्य ऐका|આજનું રાશિફળ સાંભળો
Lucky colour|शुभ रंग|શુભ રંગ
Lucky number|शुभ अंक|શુભ અંક
Lucky direction|शुभ दिशा|શુભ દિશા
Avoid colour|टाळायचा रंग|ટાળવાનો રંગ
Do today|आज हे करा|આજે આ કરો
Avoid today|आज हे टाळा|આજે આ ટાળો
Life areas|जीवनाची क्षेत्रे|જીવનના ક્ષેત્રો
Timings|वेळा|સમય
Rahu Kaal|राहू काळ|રાહુ કાળ
Sunrise|सूर्योदय|સૂર્યોદય
Sunset|सूर्यास्त|સૂર્યાસ્ત
Mantra of the day|आजचा मंत्र|આજનો મંત્ર
Upcoming|येणारे|આવનારા
Family dates|कुटुंबाच्या तिथी|પરિવારની તિથિઓ
Reminders|आठवण|યાદ અપાવો
Add|जोडा|ઉમેરો
Language|भाषा|ભાષા
Text size|अक्षरांचा आकार|અક્ષરનું કદ
Unlock|उघडा|ખોલો
Free|मोफत|મફત
Buy|खरेदी करा|ખરીદો
Gift Premium|प्रीमियम भेट द्या|પ્રીમિયમ ભેટ આપો
Redeem gift code|भेट कोड वापरा|ભેટ કોડ વાપરો
Parivaar plan|परिवार योजना|પરિવાર યોજના
Read the katha|कथा वाचा|કથા વાંચો
Tap to count|मोजण्यासाठी टॅप करा|ગણવા ટેપ કરો
Reset|पुन्हा सुरू|ફરી શરૂ
Calculation details|गणनेचा तपशील|ગણતરીની વિગત
Vastu checklist|वास्तु तपासणी|વાસ્તુ ચકાસણી
Yes|हो|હા
No|नाही|ના`.split('\n').forEach(l => { const [en, mr, gu] = l.split('|'); GX.rg.mr[en] = mr; GX.rg.gu[en] = gu; });

/* Extra short mantras for the jaap counter: [id, group, name, text, roman] */
GX.jaapExtra = [
  ['radhe', 'krishna', ['Radhe Radhe', 'राधे राधे'], 'राधे राधे', 'Radhe Radhe'],
  ['krishna-sharanam', 'krishna', ['Shri Krishna Sharanam Mamah', 'श्री कृष्ण शरणं मम'], 'श्री कृष्णः शरणं मम', 'Shri Krishnah sharanam mama'],
  ['govinda', 'krishna', ['Govind Bolo Hari Gopal Bolo', 'गोविंद बोलो हरि गोपाल बोलो'], 'गोविंद बोलो हरि गोपाल बोलो', 'Govind bolo Hari Gopal bolo'],
  ['narayan', 'krishna', ['Om Namo Narayanaya', 'ॐ नमो नारायणाय'], 'ॐ नमो नारायणाय', 'Om namo Narayanaya'],
  ['jai-shri-ram', 'ram', ['Jai Shri Ram', 'जय श्री राम'], 'जय श्री राम', 'Jai Shri Ram'],
  ['sitaram', 'ram', ['Sita Ram', 'सीता राम'], 'सीता राम सीता राम', 'Sita Ram Sita Ram'],
  ['ram-naam', 'ram', ['Shri Ram Jai Ram Jai Jai Ram', 'श्री राम जय राम जय जय राम'], 'श्री राम जय राम जय जय राम', 'Shri Ram Jai Ram Jai Jai Ram'],
  ['ganpati', 'ganesh', ['Om Gan Ganapataye Namah', 'ॐ गं गणपतये नमः'], 'ॐ गं गणपतये नमः', 'Om Gam Ganapataye namah'],
  ['jai-mata-di', 'devi', ['Jai Mata Di', 'जय माता दी'], 'जय माता दी', 'Jai Mata Di'],
  ['om-shreem', 'devi', ['Om Shreem Mahalakshmyai Namah', 'ॐ श्रीं महालक्ष्म्यै नमः'], 'ॐ श्रीं महालक्ष्म्यै नमः', 'Om Shreem Mahalakshmyai namah'],
  ['bam-bholenath', 'shiv', ['Har Har Mahadev', 'हर हर महादेव'], 'हर हर महादेव', 'Har Har Mahadev'],
  ['hanuman-om', 'hanuman', ['Om Hanumate Namah', 'ॐ हनुमते नमः'], 'ॐ हनुमते नमः', 'Om Hanumate namah'],
  ['om-arham', 'jain', ['Om Arham Namah', 'ॐ अर्हं नमः'], 'ॐ अर्हं नमः', 'Om Arham namah'],
  ['namo-arihantanam', 'jain', ['Namo Arihantanam', 'णमो अरिहंताणं'], 'णमो अरिहंताणं', 'Namo Arihantanam'],
  ['om-hreem-mahavir', 'jain', ['Om Hreem Shri Mahaviraya Namah', 'ॐ ह्रीं श्री महावीराय नमः'], 'ॐ ह्रीं श्री महावीराय नमः', 'Om Hreem Shri Mahaviraya namah'],
  ['satnam', 'sikh', ['Satnam Waheguru', 'सतनाम वाहेगुरु'], 'सतनाम वाहेगुरु', 'Satnam Waheguru'],
  ['om', 'daily', ['Om', 'ॐ'], 'ॐ', 'Om'],
  ['sai', 'daily', ['Om Sai Ram', 'ॐ साईं राम'], 'ॐ साईं राम', 'Om Sai Ram'],
];
/* Groups shown as chips in the jaap counter. Mantras from the Bhakti library are added by their category. */
GX.jaapGroups = [['krishna', '🪈', ['Krishna', 'कृष्ण']], ['ram', '🏹', ['Ram', 'राम']], ['shiv', '🔱', ['Shiv', 'शिव']], ['hanuman', '🚩', ['Hanuman', 'हनुमान']], ['ganesh', '🐘', ['Ganesh', 'गणेश']],
  ['devi', '🌺', ['Devi', 'देवी']], ['jain', '🙏', ['Jain', 'जैन']], ['sikh', '☬', ['Sikh', 'सिख']], ['buddh', '☸️', ['Buddh', 'बुद्ध']], ['graha', '🪐', ['Navgraha', 'नवग्रह']], ['daily', '🕉️', ['Daily', 'रोज़']]];
/* Which Bhakti library mantras belong to which jaap group (by id) */
GX.jaapMap = { 'hare-krishna': 'krishna', vasudevaya: 'krishna', krishnaya: 'krishna', 'shri-ram': 'ram', 'ram-rameti': 'ram' };
