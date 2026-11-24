/* Bhakti: nearby temple categories and the mantra / prayer directory (all texts are traditional, public domain) */
const BHAKTI = {
  temples: [
    { g: 'hindu', id: 'all-hindu', icon: '🛕', t: ['All Hindu temples', 'सभी हिंदू मंदिर'], q: 'Hindu temple' },
    { g: 'hindu', id: 'shiv', icon: '🔱', t: ['Shiv ji', 'शिव जी'], q: 'Shiv temple' },
    { g: 'hindu', id: 'hanuman', icon: '🚩', t: ['Hanuman ji', 'हनुमान जी'], q: 'Hanuman temple' },
    { g: 'hindu', id: 'ganesh', icon: '🐘', t: ['Ganesh ji', 'गणेश जी'], q: 'Ganesh temple' },
    { g: 'hindu', id: 'devi', icon: '🌺', t: ['Durga / Devi', 'दुर्गा / देवी माँ'], q: 'Durga Devi temple' },
    { g: 'hindu', id: 'krishna', icon: '🪈', t: ['Krishna / ISKCON', 'कृष्ण / इस्कॉन'], q: 'Krishna temple' },
    { g: 'hindu', id: 'ram', icon: '🏹', t: ['Ram ji', 'राम जी'], q: 'Ram temple' },
    { g: 'hindu', id: 'vishnu', icon: '🪷', t: ['Vishnu / Balaji', 'विष्णु / बालाजी'], q: 'Vishnu Balaji temple' },
    { g: 'hindu', id: 'lakshmi', icon: '🪙', t: ['Lakshmi ji', 'लक्ष्मी जी'], q: 'Lakshmi temple' },
    { g: 'hindu', id: 'shani', icon: '🪐', t: ['Shani Dev', 'शनि देव'], q: 'Shani temple' },
    { g: 'hindu', id: 'sai', icon: '🙏', t: ['Sai Baba', 'साईं बाबा'], q: 'Sai Baba temple' },
    { g: 'hindu', id: 'kali', icon: '🗡️', t: ['Kali Mata', 'काली माता'], q: 'Kali temple' },
    { g: 'hindu', id: 'murugan', icon: '🦚', t: ['Murugan / Kartikeya', 'मुरुगन / कार्तिकेय'], q: 'Murugan temple' },
    { g: 'hindu', id: 'ayyappa', icon: '⛰️', t: ['Ayyappa', 'अय्यप्पा'], q: 'Ayyappa temple' },
    { g: 'hindu', id: 'jagannath', icon: '🛞', t: ['Jagannath', 'जगन्नाथ'], q: 'Jagannath temple' },
    { g: 'hindu', id: 'navgraha', icon: '☀️', t: ['Navgraha / Surya', 'नवग्रह / सूर्य'], q: 'Navagraha temple' },
    { g: 'jain', id: 'jain', icon: '🤲', t: ['All Jain temples', 'सभी जैन मंदिर'], q: 'Jain temple' },
    { g: 'jain', id: 'digambar', icon: '🕉️', t: ['Digambar Jain', 'दिगंबर जैन'], q: 'Digambar Jain temple' },
    { g: 'jain', id: 'shwetambar', icon: '🕉️', t: ['Shwetambar Jain / Derasar', 'श्वेतांबर जैन / देरासर'], q: 'Shwetambar Jain derasar' },
    { g: 'sikh', id: 'gurdwara', icon: '🪯', t: ['Gurdwara', 'गुरुद्वारा'], q: 'Gurdwara' }
  ],
  groups: { hindu: ['Hindu', 'हिंदू'], jain: ['Jain', 'जैन'], sikh: ['Sikh', 'सिख'] },
  cats: [['all', 'All', 'सभी'], ['fav', '★ Saved', '★ सहेजे'], ['daily', 'Daily', 'रोज़ाना'], ['aarti', 'Aarti', 'आरती'], ['chalisa', 'Chalisa', 'चालीसा'], ['shiv', 'Shiv', 'शिव'], ['hanuman', 'Hanuman', 'हनुमान'], ['ganesh', 'Ganesh', 'गणेश'], ['devi', 'Devi', 'देवी'], ['vishnu', 'Vishnu · Ram · Krishna', 'विष्णु · राम · कृष्ण'], ['graha', 'Navgraha', 'नवग्रह'], ['peace', 'Peace', 'शांति'], ['jain', 'Jain', 'जैन'], ['sikh', 'Sikh', 'सिख']],
  mantras: [
    { id: 'gayatri', cat: ['daily'], t: ['Gayatri Mantra', 'गायत्री मंत्र'],
      text: 'ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्॥',
      roman: 'Om bhur bhuvah svah\ntat savitur varenyam\nbhargo devasya dhimahi\ndhiyo yo nah prachodayat',
      m: ['We meditate on the divine light of the Sun (Savitr). May it inspire and guide our minds.', 'हम सविता देव के दिव्य तेज का ध्यान करते हैं। वह हमारी बुद्धि को सही मार्ग पर प्रेरित करें।'],
      w: ['Morning and evening, 3, 11 or 108 times', 'सुबह और शाम, 3, 11 या 108 बार'] },
    { id: 'mahamrityunjaya', cat: ['shiv', 'daily'], t: ['Mahamrityunjaya Mantra', 'महामृत्युंजय मंत्र'],
      text: 'ॐ त्र्यम्बकं यजामहे\nसुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्\nमृत्योर्मुक्षीय माऽमृतात्॥',
      roman: 'Om tryambakam yajamahe\nsugandhim pushti-vardhanam\nurvarukam iva bandhanan\nmrityor mukshiya mamritat',
      m: ['We worship the three-eyed Lord Shiva, who nourishes all. May he free us from the fear of death, as a ripe cucumber is freed from its vine.', 'हम त्रिनेत्र भगवान शिव की पूजा करते हैं, जो सबका पोषण करते हैं। जैसे पका खीरा बेल से अलग होता है, वैसे ही वे हमें मृत्यु के भय से मुक्त करें।'],
      w: ['For health and protection, 108 times, especially on Mondays', 'स्वास्थ्य और रक्षा के लिए, 108 बार, विशेषकर सोमवार को'] },
    { id: 'om-namah-shivaya', cat: ['shiv'], t: ['Om Namah Shivaya', 'ॐ नमः शिवाय'], text: 'ॐ नमः शिवाय॥', roman: 'Om namah shivaya',
      m: ['I bow to Lord Shiva. The five-syllable (Panchakshari) mantra of Shiv.', 'मैं भगवान शिव को नमन करता हूँ। यह शिव का पंचाक्षरी मंत्र है।'], w: ['108 times, Mondays and Shivratri', '108 बार, सोमवार और शिवरात्रि पर'] },
    { id: 'karpur-gauram', cat: ['shiv', 'aarti'], t: ['Karpur Gauram', 'कर्पूरगौरं'],
      text: 'कर्पूरगौरं करुणावतारं\nसंसारसारं भुजगेन्द्रहारम्।\nसदा वसन्तं हृदयारविन्दे\nभवं भवानीसहितं नमामि॥',
      roman: 'Karpura gauram karunavataram\nsamsara saram bhujagendra haram\nsada vasantam hridayaravinde\nbhavam bhavani sahitam namami',
      m: ['I bow to Shiva, white as camphor, the embodiment of compassion, who lives in the lotus of the heart, together with Mother Bhavani.', 'कपूर जैसे गोरे, करुणा के अवतार, हृदय-कमल में बसने वाले भगवान शिव को माता भवानी सहित नमन।'], w: ['After every aarti', 'हर आरती के बाद'] },
    { id: 'hanuman-chalisa', cat: ['hanuman', 'chalisa'], t: ['Hanuman Chalisa', 'हनुमान चालीसा'],
      text: 'दोहा\nश्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥\nबुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।\nबल बुद्धि बिद्या देहु मोहिं, हरहु कलेस बिकार॥\n\nचौपाई\nजय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥\nराम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥\nमहाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥\nकंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥\nहाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥\nसंकर सुवन केसरीनंदन। तेज प्रताप महा जग बंदन॥\nबिद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥\nप्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥\nसूक्ष्म रूप धरि सियहिं दिखावा। बिकट रूप धरि लंक जरावा॥\nभीम रूप धरि असुर सँहारे। रामचंद्र के काज सँवारे॥\nलाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये॥\nरघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥\nसहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥\nसनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥\nजम कुबेर दिगपाल जहाँ ते। कबि कोबिद कहि सके कहाँ ते॥\nतुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥\nतुम्हरो मंत्र बिभीषन माना। लंकेस्वर भए सब जग जाना॥\nजुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥\nप्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥\nदुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥\nराम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥\nसब सुख लहै तुम्हारी सरना। तुम रच्छक काहू को डर ना॥\nआपन तेज सम्हारो आपै। तीनों लोक हाँक तें काँपै॥\nभूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥\nनासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥\nसंकट तें हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै॥\nसब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥\nऔर मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥\nचारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥\nसाधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥\nअष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥\nराम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥\nतुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥\nअंत काल रघुबर पुर जाई। जहाँ जन्म हरि-भक्त कहाई॥\nऔर देवता चित्त न धरई। हनुमत सेइ सर्ब सुख करई॥\nसंकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥\nजै जै जै हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥\nजो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥\nजो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥\nतुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥\n\nदोहा\nपवन तनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥',
      m: ['Forty verses by Goswami Tulsidas praising Hanuman ji, his strength, wisdom and devotion to Shri Ram. Recited for courage, protection and removing obstacles.', 'गोस्वामी तुलसीदास जी द्वारा रचित 40 चौपाइयों में हनुमान जी के बल, बुद्धि और श्रीराम भक्ति का गुणगान। साहस, रक्षा और संकट दूर करने के लिए पढ़ी जाती है।'],
      w: ['Tuesdays and Saturdays, morning or evening', 'मंगलवार और शनिवार, सुबह या शाम'] },
    { id: 'hanuman-mantra', cat: ['hanuman'], t: ['Hanuman Mantra', 'हनुमान मंत्र'], text: 'ॐ हं हनुमते नमः॥', roman: 'Om ham hanumate namah',
      m: ['Salutations to Hanuman ji, for strength and courage.', 'हनुमान जी को नमन, बल और साहस के लिए।'], w: ['108 times on Tuesday', 'मंगलवार को 108 बार'] },
    { id: 'vakratunda', cat: ['ganesh', 'daily'], t: ['Vakratunda Mahakaya', 'वक्रतुण्ड महाकाय'],
      text: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
      roman: 'Vakratunda mahakaya surya-koti samaprabha\nnirvighnam kuru me deva sarva-karyeshu sarvada',
      m: ['O Ganesha, with the curved trunk and mighty body, bright as a million suns: remove the obstacles from all my work, always.', 'हे घुमावदार सूँड़ और विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी गणेश जी, मेरे सभी कार्य सदा बिना विघ्न के पूरे करें।'], w: ['Before starting any new work', 'कोई भी नया काम शुरू करने से पहले'] },
    { id: 'ganesh-mantra', cat: ['ganesh'], t: ['Ganesh Mantra', 'गणेश मंत्र'], text: 'ॐ गं गणपतये नमः॥', roman: 'Om gam ganapataye namah',
      m: ['Salutations to Lord Ganesha, remover of obstacles.', 'विघ्नहर्ता भगवान गणेश को नमन।'], w: ['108 times on Wednesday', 'बुधवार को 108 बार'] },
    { id: 'aarti-ganesh', cat: ['ganesh', 'aarti'], t: ['Jai Ganesh Deva (Aarti)', 'जय गणेश देवा (आरती)'],
      text: 'जय गणेश जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥\n\nएक दंत दयावंत, चार भुजा धारी।\nमाथे सिंदूर सोहे, मूसे की सवारी॥\n\nपान चढ़े फल चढ़े, और चढ़े मेवा।\nलड्डुअन का भोग लगे, संत करें सेवा॥\n\nअंधन को आँख देत, कोढ़िन को काया।\nबाँझन को पुत्र देत, निर्धन को माया॥\n\n\'सूर\' श्याम शरण आए, सफल कीजे सेवा।\nमाता जाकी पार्वती, पिता महादेवा॥',
      m: ['The traditional aarti of Ganesh ji, son of Parvati and Mahadev, sung at the start of every puja.', 'माता पार्वती और महादेव के पुत्र गणेश जी की पारंपरिक आरती, जो हर पूजा की शुरुआत में गाई जाती है।'], w: ['At the start of puja, and on Wednesdays', 'पूजा की शुरुआत में और बुधवार को'] },
    { id: 'aarti-jagdish', cat: ['vishnu', 'aarti'], t: ['Om Jai Jagdish Hare (Aarti)', 'ॐ जय जगदीश हरे (आरती)'],
      text: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, दास जनों के संकट, क्षण में दूर करे॥\n\nजो ध्यावे फल पावे, दुख बिनसे मन का, स्वामी दुख बिनसे मन का।\nसुख सम्पति घर आवे, कष्ट मिटे तन का॥\n\nमात पिता तुम मेरे, शरण गहूँ मैं किसकी, स्वामी शरण गहूँ मैं किसकी।\nतुम बिन और न दूजा, आस करूँ मैं जिसकी॥\n\nतुम पूरण परमात्मा, तुम अन्तर्यामी, स्वामी तुम अन्तर्यामी।\nपारब्रह्म परमेश्वर, तुम सब के स्वामी॥\n\nतुम करुणा के सागर, तुम पालनकर्ता, स्वामी तुम पालनकर्ता।\nमैं मूरख फलकामी, मैं सेवक तुम स्वामी, कृपा करो भर्ता॥\n\nतुम हो एक अगोचर, सबके प्राणपति, स्वामी सबके प्राणपति।\nकिस विधि मिलूँ दयामय, तुमको मैं कुमति॥\n\nदीन-बन्धु दुःख-हर्ता, ठाकुर तुम मेरे, स्वामी रक्षक तुम मेरे।\nअपने हाथ उठाओ, अपने शरण लगाओ, द्वार पड़ा तेरे॥\n\nविषय-विकार मिटाओ, पाप हरो देवा, स्वामी पाप हरो देवा।\nश्रद्धा भक्ति बढ़ाओ, सन्तन की सेवा॥',
      m: ['The best-known aarti of Lord Vishnu (written in the 1870s by Pt. Shardha Ram Phillauri), sung in homes and temples across India.', 'भगवान विष्णु की सबसे प्रसिद्ध आरती (पं. श्रद्धाराम फिल्लौरी द्वारा 1870 के दशक में रचित), जो पूरे भारत में घरों और मंदिरों में गाई जाती है।'], w: ['Evening puja, and on Thursdays', 'शाम की पूजा में और गुरुवार को'] },
    { id: 'aarti-lakshmi', cat: ['devi', 'aarti'], t: ['Om Jai Lakshmi Mata (Aarti)', 'ॐ जय लक्ष्मी माता (आरती)'],
      text: 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।\nतुमको निशदिन सेवत, हरि विष्णु विधाता॥\n\nउमा रमा ब्रह्माणी, तुम ही जग-माता।\nसूर्य-चंद्रमा ध्यावत, नारद ऋषि गाता॥\n\nदुर्गा रूप निरंजनी, सुख सम्पति दाता।\nजो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥\n\nतुम पाताल-निवासिनि, तुम ही शुभदाता।\nकर्म-प्रभाव-प्रकाशिनी, भवनिधि की त्राता॥\n\nजिस घर में तुम रहतीं, सब सद्गुण आता।\nसब सम्भव हो जाता, मन नहीं घबराता॥\n\nतुम बिन यज्ञ न होते, वस्त्र न कोई पाता।\nखान-पान का वैभव, सब तुमसे आता॥\n\nशुभ-गुण मंदिर सुंदर, क्षीरोदधि-जाता।\nरत्न चतुर्दश तुम बिन, कोई नहीं पाता॥\n\nमहालक्ष्मीजी की आरती, जो कोई जन गाता।\nउर आनंद समाता, पाप उतर जाता॥',
      m: ['The aarti of Maa Lakshmi, goddess of wealth and good fortune, sung especially on Fridays and Diwali.', 'धन और सौभाग्य की देवी माँ लक्ष्मी की आरती, विशेष रूप से शुक्रवार और दीपावली पर गाई जाती है।'], w: ['Fridays and Diwali evening', 'शुक्रवार और दीपावली की शाम'] },
    { id: 'lakshmi-mantra', cat: ['devi'], t: ['Mahalakshmi Mantra', 'महालक्ष्मी मंत्र'], text: 'ॐ श्रीं महालक्ष्म्यै नमः॥', roman: 'Om shreem mahalakshmyai namah',
      m: ['Salutations to Mahalakshmi, for prosperity.', 'समृद्धि के लिए माँ महालक्ष्मी को नमन।'], w: ['108 times on Friday', 'शुक्रवार को 108 बार'] },
    { id: 'ya-devi', cat: ['devi'], t: ['Ya Devi Sarva Bhuteshu', 'या देवी सर्वभूतेषु'],
      text: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
      roman: 'Ya devi sarva-bhuteshu shakti-rupena samsthita\nnamas tasyai namas tasyai namas tasyai namo namah',
      m: ['To the Goddess who lives in all beings as strength (Shakti): salutations to her again and again. From the Durga Saptashati.', 'जो देवी सब प्राणियों में शक्ति रूप में विराजमान हैं, उन्हें बार-बार नमस्कार। (दुर्गा सप्तशती से)'], w: ['Navratri and Fridays', 'नवरात्रि और शुक्रवार'] },
    { id: 'durga-mantra', cat: ['devi'], t: ['Durga Mantra', 'दुर्गा मंत्र'], text: 'ॐ दुं दुर्गायै नमः॥', roman: 'Om dum durgayai namah',
      m: ['Salutations to Maa Durga, for protection.', 'रक्षा के लिए माँ दुर्गा को नमन।'], w: ['108 times during Navratri', 'नवरात्रि में 108 बार'] },
    { id: 'saraswati', cat: ['devi', 'daily'], t: ['Saraswati Vandana', 'सरस्वती वंदना'],
      text: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता।\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥\nया ब्रह्माच्युतशंकरप्रभृतिभिर्देवैः सदा वन्दिता।\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा॥',
      m: ['To Saraswati, pure white like jasmine and snow, holding the veena and seated on a white lotus: may she protect me and remove all dullness of mind.', 'कुंद के फूल और हिम के समान श्वेत, वीणा धारण करने वाली, श्वेत कमल पर विराजमान माँ सरस्वती मेरी रक्षा करें और बुद्धि की जड़ता दूर करें।'], w: ['Before study, and on Basant Panchami', 'पढ़ाई से पहले और बसंत पंचमी पर'] },
    { id: 'hare-krishna', cat: ['vishnu'], t: ['Hare Krishna Mahamantra', 'हरे कृष्ण महामंत्र'],
      text: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥',
      roman: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare',
      m: ['The great chant of the names of Krishna and Ram, for peace and devotion.', 'श्रीकृष्ण और श्रीराम के नामों का महामंत्र, शांति और भक्ति के लिए।'], w: ['Anytime; 108 times on a mala', 'कभी भी; माला पर 108 बार'] },
    { id: 'vasudevaya', cat: ['vishnu'], t: ['Om Namo Bhagavate Vasudevaya', 'ॐ नमो भगवते वासुदेवाय'], text: 'ॐ नमो भगवते वासुदेवाय॥', roman: 'Om namo bhagavate vasudevaya',
      m: ['Salutations to Lord Vasudeva (Vishnu / Krishna), the twelve-syllable mantra.', 'भगवान वासुदेव (विष्णु / कृष्ण) को नमन, द्वादशाक्षर मंत्र।'], w: ['108 times on Thursday and Ekadashi', 'गुरुवार और एकादशी को 108 बार'] },
    { id: 'shri-ram', cat: ['vishnu'], t: ['Shri Ram Jai Ram', 'श्री राम जय राम'], text: 'श्री राम जय राम जय जय राम॥', roman: 'Shri Ram Jai Ram Jai Jai Ram',
      m: ['The thirteen-letter Ram naam, chanted for peace and strength.', 'तेरह अक्षरों का राम नाम, शांति और शक्ति के लिए।'], w: ['Anytime, especially Ram Navami', 'कभी भी, विशेषकर राम नवमी पर'] },
    { id: 'karagre', cat: ['daily'], t: ['Karagre Vasate Lakshmi (morning)', 'कराग्रे वसते लक्ष्मीः (सुबह)'],
      text: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
      roman: 'Karagre vasate lakshmih kara-madhye sarasvati\nkara-mule tu govindah prabhate kara-darshanam',
      m: ['Lakshmi lives at the fingertips, Saraswati in the middle of the palm and Govinda at its base: look at your palms on waking.', 'हाथ के अग्रभाग में लक्ष्मी, बीच में सरस्वती और मूल में गोविंद बसते हैं: सुबह उठते ही अपनी हथेलियाँ देखें।'], w: ['On waking up', 'सुबह उठते ही'] },
    { id: 'asato-ma', cat: ['peace', 'daily'], t: ['Asato Ma Sadgamaya', 'असतो मा सद्गमय'],
      text: 'ॐ असतो मा सद्गमय।\nतमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय।\nॐ शान्तिः शान्तिः शान्तिः॥',
      roman: 'Om asato ma sad gamaya\ntamaso ma jyotir gamaya\nmrityor ma amritam gamaya\nOm shantih shantih shantih',
      m: ['Lead me from untruth to truth, from darkness to light, from death to immortality. (Brihadaranyaka Upanishad)', 'मुझे असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर, मृत्यु से अमरता की ओर ले चलो। (बृहदारण्यक उपनिषद)'], w: ['Morning prayer', 'सुबह की प्रार्थना'] },
    { id: 'sarve-bhavantu', cat: ['peace'], t: ['Sarve Bhavantu Sukhinah', 'सर्वे भवन्तु सुखिनः'],
      text: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥',
      roman: 'Sarve bhavantu sukhinah sarve santu niramayah\nsarve bhadrani pashyantu ma kashchid duhkha-bhag bhavet',
      m: ['May all be happy, may all be free from illness, may all see good things, may no one suffer.', 'सब सुखी हों, सब निरोगी हों, सब शुभ देखें, किसी को भी दुख न मिले।'], w: ['End of daily prayer', 'रोज़ की पूजा के अंत में'] },
    { id: 'sahana', cat: ['peace'], t: ['Om Sahana Vavatu', 'ॐ सह नाववतु'],
      text: 'ॐ सह नाववतु। सह नौ भुनक्तु।\nसह वीर्यं करवावहै।\nतेजस्वि नावधीतमस्तु मा विद्विषावहै।\nॐ शान्तिः शान्तिः शान्तिः॥',
      roman: 'Om saha navavatu saha nau bhunaktu\nsaha viryam karavavahai\ntejasvi navadhitam astu ma vidvishavahai\nOm shantih shantih shantih',
      m: ['May we be protected together, nourished together, work with strength together; may our learning be bright, and may we never quarrel. (Taittiriya Upanishad)', 'हम साथ रक्षित हों, साथ पोषित हों, साथ शक्ति से कार्य करें; हमारी विद्या तेजस्वी हो और हम कभी द्वेष न करें। (तैत्तिरीय उपनिषद)'], w: ['Before study or meals', 'पढ़ाई या भोजन से पहले'] },
    { id: 'navkar', cat: ['jain', 'daily'], t: ['Navkar Mantra (Namokar)', 'णमोकार मंत्र (नवकार)'],
      text: 'णमो अरिहंताणं।\nणमो सिद्धाणं।\nणमो आयरियाणं।\nणमो उवज्झायाणं।\nणमो लोए सव्व साहूणं।\n\nएसो पंच णमोक्कारो, सव्व पावप्पणासणो।\nमंगलाणं च सव्वेसिं, पढमं हवइ मंगलं॥',
      roman: 'Namo arihantanam\nnamo siddhanam\nnamo ayariyanam\nnamo uvajjhayanam\nnamo loe savva sahunam\neso pancha namokkaro, savva pavappanasano\nmangalanam cha savvesim, padhamam havai mangalam',
      m: ['I bow to the Arihants, the Siddhas, the Acharyas, the Upadhyayas and all the Sadhus of the world. These five salutations destroy all sins and are the first of all blessings.', 'अरिहंतों, सिद्धों, आचार्यों, उपाध्यायों और लोक के सभी साधुओं को नमस्कार। यह पंच नमस्कार सब पापों का नाश करने वाला और सभी मंगलों में पहला मंगल है।'], w: ['Morning, evening and before any new work', 'सुबह, शाम और हर नए काम से पहले'] },
    { id: 'mool-mantar', cat: ['sikh', 'daily'], t: ['Mool Mantar', 'मूल मंत्र'],
      text: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥\n\nइक ओंकार सतिनामु करता पुरखु निरभउ निरवैरु\nअकाल मूरति अजूनी सैभं गुर प्रसादि॥',
      roman: 'Ik Onkar, Sat Naam, Karta Purakh, Nirbhau, Nirvair,\nAkaal Moorat, Ajooni, Saibhang, Gur Prasaad',
      m: ['One Creator, whose name is Truth, the Creator, without fear, without hate, timeless, unborn, self-existent, known by the Guru\'s grace. The opening of Sri Guru Granth Sahib by Guru Nanak Dev Ji.', 'एक ओंकार, जिसका नाम सत्य है, सृष्टिकर्ता, निर्भय, निर्वैर, कालातीत, अजन्मा, स्वयंभू, गुरु की कृपा से प्राप्त। श्री गुरु ग्रंथ साहिब का आरंभ, गुरु नानक देव जी द्वारा।'], w: ['Morning prayer (Japji Sahib begins with it)', 'सुबह की प्रार्थना (जपजी साहिब इसी से आरंभ होता है)'] },
    { id: 'waheguru', cat: ['sikh'], t: ['Waheguru Simran', 'वाहेगुरु सिमरन'], text: 'ਵਾਹਿਗੁਰੂ\n\nवाहेगुरु॥', roman: 'Waheguru',
      m: ['Remembering the Wondrous Lord. Repeated quietly as simran (meditation on God\'s name).', 'अद्भुत प्रभु का स्मरण। सिमरन (नाम जप) के रूप में मन ही मन दोहराया जाता है।'], w: ['Anytime, with each breath', 'कभी भी, हर साँस के साथ'] }
  ]
};
// Navgraha mantras from the existing list
['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'].forEach((p, i) => BHAKTI.mantras.push({
  id: 'graha-' + p.toLowerCase(), cat: ['graha'], t: [['Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani', 'Rahu', 'Ketu'][i] + ' Beej Mantra', ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'राहु', 'केतु'][i] + ' बीज मंत्र'],
  text: '', graha: p,
  m: [`Beej mantra of ${['the Sun', 'the Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'][i]}, to strengthen it in your Kundli.`, `कुंडली में ${['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'राहु', 'केतु'][i]} को बलवान करने का बीज मंत्र।`],
  w: [`108 times on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Saturday', 'Tuesday'][i]}`, `${['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'शनिवार', 'मंगलवार'][i]} को 108 बार`]
}));

/* ===== More aartis, stutis and prayers (all traditional, public domain) ===== */
BHAKTI.cats.splice(BHAKTI.cats.length - 2, 0, ['stuti', 'Stuti & Shloka', 'स्तुति और श्लोक']);
BHAKTI.cats.push(['buddh', 'Buddhist', 'बौद्ध']);
BHAKTI.groups.buddh = ['Buddhist', 'बौद्ध'];
BHAKTI.temples.push(
  { g: 'jain', id: 'jain-mahavir', icon: '🪷', t: ['Mahavir Swami temple', 'महावीर स्वामी मंदिर'], q: 'Mahavir Jain temple' },
  { g: 'jain', id: 'jain-parshvanath', icon: '🐍', t: ['Parshvanath temple', 'पार्श्वनाथ मंदिर'], q: 'Parshvanath Jain temple' },
  { g: 'jain', id: 'jain-sthanak', icon: '🏠', t: ['Sthanak / Upashray', 'स्थानक / उपाश्रय'], q: 'Jain sthanak upashray' },
  { g: 'hindu', id: 'ganga', icon: '🌊', t: ['Ghat / Ganga aarti', 'घाट / गंगा आरती'], q: 'ghat Ganga aarti' },
  { g: 'hindu', id: 'khatu', icon: '🏵️', t: ['Khatu Shyam', 'खाटू श्याम'], q: 'Khatu Shyam temple' },
  { g: 'hindu', id: 'santoshi', icon: '🌼', t: ['Santoshi Mata', 'संतोषी माता'], q: 'Santoshi Mata temple' },
  { g: 'sikh', id: 'gurdwara-langar', icon: '🍲', t: ['Gurdwara with langar', 'लंगर वाला गुरुद्वारा'], q: 'Gurdwara langar' },
  { g: 'buddh', id: 'buddh', icon: '☸️', t: ['Buddhist temple / Vihara', 'बौद्ध मंदिर / विहार'], q: 'Buddhist temple vihara' },
  { g: 'buddh', id: 'monastery', icon: '🏯', t: ['Monastery / Gompa', 'मठ / गोम्पा'], q: 'Buddhist monastery' }
);
const M = (id, cat, t, text, m, w, roman) => BHAKTI.mantras.push({ id, cat, t, text, m, w, roman });

/* --- Hindu aartis --- */
M('aarti-shiv', ['shiv', 'aarti'], ['Om Jai Shiv Omkara (Aarti)', 'ॐ जय शिव ओंकारा (आरती)'],
'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।\nब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा॥\n\nएकानन चतुरानन पंचानन राजे।\nहंसासन गरुड़ासन वृषवाहन साजे॥\n\nदो भुज चार चतुर्भुज दसभुज अति सोहे।\nत्रिगुण रूप निरखते त्रिभुवन जन मोहे॥\n\nअक्षमाला वनमाला मुण्डमाला धारी।\nचंदन मृगमद सोहे भाले शशिधारी॥\n\nश्वेताम्बर पीताम्बर बाघम्बर अंगे।\nसनकादिक गरुड़ादिक भूतादिक संगे॥\n\nकर के मध्य कमण्डलु चक्र त्रिशूलधारी।\nसुखकारी दुखहारी जगपालन कारी॥\n\nब्रह्मा विष्णु सदाशिव जानत अविवेका।\nप्रणवाक्षर में शोभित ये तीनों एका॥\n\nत्रिगुणस्वामी जी की आरती जो कोई नर गावे।\nकहत शिवानन्द स्वामी मनवांछित फल पावे॥',
['The best-known aarti of Lord Shiva, praising Him as Omkara, in whom Brahma, Vishnu and Sadashiv are one.', 'भगवान शिव की सबसे प्रसिद्ध आरती, जिसमें उन्हें ओंकार कहा गया है, जिनमें ब्रह्मा, विष्णु और सदाशिव एक हैं।'],
['Mondays, Sawan and Mahashivratri', 'सोमवार, सावन और महाशिवरात्रि']);
M('aarti-ambe', ['devi', 'aarti'], ['Jai Ambe Gauri (Durga Aarti)', 'जय अम्बे गौरी (दुर्गा आरती)'],
'जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥\n\nमांग सिंदूर विराजत, टीको मृगमद को।\nउज्ज्वल से दोउ नैना, चंद्रवदन नीको॥\n\nकनक समान कलेवर, रक्ताम्बर राजै।\nरक्तपुष्प गल माला, कंठन पर साजै॥\n\nकेहरि वाहन राजत, खड्ग खप्पर धारी।\nसुर-नर-मुनिजन सेवत, तिनके दुखहारी॥\n\nकानन कुण्डल शोभित, नासाग्रे मोती।\nकोटिक चंद्र दिवाकर, सम राजत ज्योती॥\n\nशुंभ-निशुंभ बिदारे, महिषासुर घाती।\nधूम्र विलोचन नैना, निशदिन मदमाती॥\n\nचण्ड-मुण्ड संहारे, शोणित बीज हरे।\nमधु-कैटभ दोउ मारे, सुर भयहीन करे॥\n\nब्रह्माणी रूद्राणी, तुम कमला रानी।\nआगम निगम बखानी, तुम शिव पटरानी॥\n\nचौंसठ योगिनी गावत, नृत्य करत भैरों।\nबाजत ताल मृदंगा, अरु बाजत डमरू॥\n\nतुम ही जग की माता, तुम ही हो भरता।\nभक्तन की दुख हरता, सुख संपति करता॥\n\nभुजा चार अति शोभित, वर मुद्रा धारी।\nमनवांछित फल पावत, सेवत नर नारी॥\n\nकंचन थाल विराजत, अगर कपूर बाती।\nश्रीमालकेतु में राजत, कोटि रतन ज्योती॥\n\nश्री अम्बेजी की आरती, जो कोई नर गावे।\nकहत शिवानंद स्वामी, सुख-संपति पावे॥',
['The main aarti of Maa Durga (Ambe), recalling how she destroyed the demons and protects her devotees.', 'माँ दुर्गा (अम्बे) की मुख्य आरती, जिसमें असुरों के नाश और भक्तों की रक्षा का गुणगान है।'],
['Navratri, Fridays and every evening', 'नवरात्रि, शुक्रवार और हर शाम']);
M('aarti-kunj', ['vishnu', 'aarti'], ['Aarti Kunj Bihari Ki (Krishna)', 'आरती कुंजबिहारी की (कृष्ण)'],
'आरती कुंजबिहारी की, श्री गिरधर कृष्ण मुरारी की॥\n\nगले में बैजंती माला, बजावै मुरली मधुर बाला।\nश्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला।\nगगन सम अंग कांति काली, राधिका चमक रही आली।\nलतन में ठाढ़े बनमाली, भ्रमर सी अलक, कस्तूरी तिलक,\nचंद्र सी झलक, ललित छवि श्यामा प्यारी की॥ श्री गिरधर कृष्ण मुरारी की॥\n\nकनकमय मोर मुकुट बिलसै, देवता दरसन को तरसैं।\nगगन सों सुमन रासि बरसै, बजे मुरचंग, मधुर मिरदंग,\nग्वालिन संग, अतुल रति गोप कुमारी की॥ श्री गिरधर कृष्ण मुरारी की॥\n\nजहां ते प्रकट भई गंगा, सकल मन हारिणि श्री गंगा।\nस्मरन ते होत मोह भंगा, बसी शिव सीस, जटा के बीच,\nहरै अघ कीच, चरन छवि श्री बनवारी की॥ श्री गिरधर कृष्ण मुरारी की॥\n\nचमकती उज्ज्वल तट रेनू, बज रही वृंदावन बेनू।\nचहुं दिसि गोपि ग्वाल धेनू, हंसत मृदु मंद, चांदनी चंद,\nकटत भव फंद, टेर सुन दीन दुखारी की॥ श्री गिरधर कृष्ण मुरारी की॥\n\nआरती कुंजबिहारी की, श्री गिरधर कृष्ण मुरारी की॥',
['The best-loved aarti of Shri Krishna of Vrindavan, describing His flute, peacock crown and beauty.', 'वृंदावन के श्रीकृष्ण की सबसे प्रिय आरती, जिसमें उनकी मुरली, मोर मुकुट और सुंदर छवि का वर्णन है।'],
['Janmashtami, Wednesdays and evening puja', 'जन्माष्टमी, बुधवार और शाम की पूजा']);
M('aarti-hanuman', ['hanuman', 'aarti'], ['Aarti Kije Hanuman Lala Ki', 'आरती कीजै हनुमान लला की'],
'आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की॥\n\nजाके बल से गिरिवर कांपे। रोग दोष जाके निकट न झांके॥\nअंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई॥\n\nदे बीरा रघुनाथ पठाए। लंका जारि सिया सुधि लाए॥\nलंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई॥\n\nलंका जारि असुर संहारे। सियारामजी के काज संवारे॥\nलक्ष्मण मूर्छित पड़े सकारे। आनि संजीवन प्राण उबारे॥\n\nपैठि पाताल तोरि जम-कारे। अहिरावण की भुजा उखारे॥\nबाएं भुजा असुरदल मारे। दाहिने भुजा संतजन तारे॥\n\nसुर नर मुनि आरती उतारें। जय जय जय हनुमान उचारें॥\nकंचन थार कपूर लौ छाई। आरती करत अंजना माई॥\n\nजो हनुमानजी की आरती गावे। बसि बैकुण्ठ परम पद पावे॥',
['The aarti of Hanuman ji, recalling how he burnt Lanka, brought the Sanjeevani herb and protects the saints.', 'हनुमान जी की आरती, जिसमें लंका दहन, संजीवनी लाने और संतों की रक्षा का वर्णन है।'],
['Tuesdays and Saturdays, after Hanuman Chalisa', 'मंगलवार और शनिवार, हनुमान चालीसा के बाद']);
M('aarti-sukhkarta', ['ganesh', 'aarti'], ['Sukhkarta Dukhharta (Marathi Ganesh Aarti)', 'सुखकर्ता दुःखहर्ता (मराठी गणेश आरती)'],
'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची।\nनुरवी पुरवी प्रेम कृपा जयाची।\nसर्वांगी सुंदर उटी शेंदुराची।\nकंठी झळके माळ मुक्ताफळांची॥\n\nजय देव जय देव जय मंगलमूर्ती।\nदर्शनमात्रे मनकामना पुरती॥\n\nरत्नखचित फरा तुज गौरीकुमरा।\nचंदनाची उटी कुंकुमकेशरा।\nहिरे जडित मुकुट शोभतो बरा।\nरुणझुणती नूपुरे चरणी घागरिया॥ जय देव जय देव…\n\nलंबोदर पीतांबर फणिवरबंधना।\nसरळ सोंड वक्रतुंड त्रिनयना।\nदास रामाचा वाट पाहे सदना।\nसंकटी पावावे निर्वाणी रक्षावे सुरवरवंदना॥ जय देव जय देव…',
['The famous Marathi aarti of Ganpati by Sant Samarth Ramdas (17th century), sung during Ganeshotsav.', 'संत समर्थ रामदास (17वीं सदी) की प्रसिद्ध मराठी गणपति आरती, जो गणेशोत्सव में गाई जाती है।'],
['Ganesh Chaturthi and daily Ganpati puja', 'गणेश चतुर्थी और रोज़ की गणपति पूजा']);
M('ram-kripalu', ['vishnu', 'stuti'], ['Shri Ramchandra Kripalu (Ram Stuti)', 'श्री रामचन्द्र कृपालु (राम स्तुति)'],
'श्रीरामचन्द्र कृपालु भजु मन हरण भवभय दारुणं।\nनवकंज लोचन कंज मुख कर कंज पद कंजारुणं॥\n\nकंदर्प अगणित अमित छवि नवनील नीरद सुंदरं।\nपट पीत मानहुँ तड़ित रुचि शुचि नौमि जनक सुतावरं॥\n\nभजु दीनबंधु दिनेश दानव दैत्य वंश निकंदनं।\nरघुनंद आनंद कंद कोशल चंद दशरथ नंदनं॥\n\nसिर मुकुट कुंडल तिलक चारु उदारु अंग विभूषणं।\nआजानु भुज शर चाप धर संग्राम जित खरदूषणं॥\n\nइति वदति तुलसीदास शंकर शेष मुनि मन रंजनं।\nमम हृदय कंज निवास कुरु कामादि खल दल गंजनं॥',
['Goswami Tulsidas\'s hymn (Vinay Patrika): O mind, worship kind Shri Ram, who removes the fear of this world. May He live in the lotus of my heart.', 'गोस्वामी तुलसीदास की स्तुति (विनय पत्रिका): हे मन, संसार का भय हरने वाले कृपालु श्रीराम को भजो। वे मेरे हृदय-कमल में निवास करें।'],
['Ram Navami, Thursdays and evening', 'राम नवमी, गुरुवार और शाम']);
M('aarti-jain-adi', ['jain', 'aarti'], ['Jay Jay Aarti Adi Jinanda (Jain Aarti)', 'जय जय आरती आदि जिणंदा (जैन आरती)'],
'जय जय आरती आदि जिणंदा,\nनाभिराया मरुदेवी को नंदा॥\n\nपहली आरती पूजा कीजे,\nनरभव पामीने लाहो लीजे॥\n\nदूसरी आरती दीनदयाला,\nधूलेवा नगर में जग अजवाला॥\n\nतीसरी आरती त्रिभुवन देवा,\nसुरनर इंद्र करे तोरी सेवा॥\n\nचौथी आरती चउगति चूरे,\nमनवांछित फल शिवसुख पूरे॥\n\nपांचमी आरती पुण्य उपाया,\nमूलचंदे रिषभ गुण गाया॥',
['The Shwetambar Jain aarti of Bhagwan Adinath (Rishabhdev), son of King Nabhi and Mata Marudevi, by the poet Mulchand.', 'भगवान आदिनाथ (ऋषभदेव), राजा नाभि और माता मरुदेवी के पुत्र, की श्वेतांबर जैन आरती, कवि मूलचंद द्वारा।'],
['Evening aarti in the derasar, followed by Mangal Divo', 'शाम को देरासर में आरती, उसके बाद मंगल दीवो']);
M('jain-mangal-divo', ['jain', 'aarti'], ['Mangal Divo (Jain)', 'मंगल दीवो (जैन)'],
'दीवो रे दीवो प्रभु मंगलिक दीवो,\nआरती उतारण बहु चिरंजीवो॥\n\nसोहामणुं घेर पर्व दिवाळी,\nअंबर खेले अमरा बाळी॥\n\nदीपाल भणे एणे कुळ अजवाळी,\nभावे भगते विघन निवारी॥\n\nदीपाल भणे एणे ए कलिकाले,\nआरती उतारी राजा कुमारपाळे॥\n\nअम घेर मंगलिक, तुम घेर मंगलिक,\nमंगलिक चतुर्विध संघने होजो॥',
['The auspicious lamp sung right after the Jain aarti: may there be blessings in our home, your home and the whole fourfold Jain Sangh.', 'जैन आरती के तुरंत बाद गाया जाने वाला मंगल दीवो: हमारे घर, आपके घर और पूरे चतुर्विध संघ में मंगल हो।'],
['Right after the evening aarti', 'शाम की आरती के ठीक बाद']);
M('aarti-panch-parmeshthi', ['jain', 'aarti'], ['Panch Parmeshthi Aarti (Digambar)', 'पंच परमेष्ठी आरती (दिगंबर)'],
'इह विधि मंगल आरती कीजे,\nपंच परमपद भज सुख लीजे॥\n\nपहली आरती श्री जिनराजा,\nभव दधि पार उतार जिहाजा॥\n\nदूसरी आरती सिद्धन केरी,\nसुमरन करत मिटे भव फेरी॥\n\nतीजी आरती सूर मुनिंदा,\nजनम मरन दुःख दूर करिंदा॥\n\nचौथी आरती श्री उवझाया,\nदर्शन देखत पाप पलाया॥\n\nपाँचमी आरती साधु तिहारी,\nकुमति विनाशन शिव अधिकारी॥\n\nछट्ठी ग्यारह प्रतिमा धारी,\nश्रावक वंदूं आनंदकारी॥\n\nसातवीं आरती श्री जिनवाणी,\n‘द्यानत’ सुरग मुकति सुखदानी॥',
['Digambar Jain aarti by Kavi Dyanatrai, offering a lamp to the five supreme beings: Arihant, Siddha, Acharya, Upadhyaya and Sadhu, and to Jinvani.', 'कवि द्यानतराय की दिगंबर जैन आरती, जिसमें पाँच परमेष्ठी – अरिहंत, सिद्ध, आचार्य, उपाध्याय, साधु – और जिनवाणी की आरती है।'],
['Evening aarti in the Jain mandir', 'शाम को जैन मंदिर में आरती']);

/* --- Hindu stutis and shlokas --- */
M('shantakaram', ['vishnu', 'stuti'], ['Shantakaram Bhujagashayanam', 'शान्ताकारं भुजगशयनं'],
'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥',
['I bow to Lord Vishnu: peaceful, resting on the serpent, with a lotus at His navel, support of the universe, dark as a rain cloud, beloved of Lakshmi, who removes the fear of worldly life.', 'शांत स्वरूप, शेषनाग पर शयन करने वाले, नाभि में कमल वाले, जगत के आधार, मेघ के समान वर्ण वाले, लक्ष्मीपति, संसार का भय हरने वाले भगवान विष्णु को प्रणाम।'],
['Thursday, Ekadashi and before Vishnu puja', 'गुरुवार, एकादशी और विष्णु पूजा से पहले'],
'Shantakaram bhujagashayanam padmanabham suresham\nvishvadharam gaganasadrisham meghavarnam shubhangam\nlakshmikantam kamalanayanam yogibhir dhyanagamyam\nvande vishnum bhavabhayaharam sarvalokaikanatham');
M('guru-brahma', ['daily', 'stuti'], ['Gurur Brahma (Guru Vandana)', 'गुरुर्ब्रह्मा (गुरु वंदना)'],
'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः॥',
['The Guru is Brahma, Vishnu and Maheshwar; the Guru is the Supreme itself. Salutations to that Guru.', 'गुरु ही ब्रह्मा, विष्णु और महेश्वर हैं; गुरु साक्षात परब्रह्म हैं। ऐसे श्री गुरु को नमस्कार।'],
['Morning, Guru Purnima and before study', 'सुबह, गुरु पूर्णिमा और पढ़ाई से पहले'], 'Gurur brahma gurur vishnuh gurur devo maheshvarah\nguruh sakshat para-brahma tasmai shri gurave namah');
M('tvameva', ['daily', 'stuti'], ['Tvameva Mata Cha Pita', 'त्वमेव माता च पिता'],
'त्वमेव माता च पिता त्वमेव,\nत्वमेव बन्धुश्च सखा त्वमेव।\nत्वमेव विद्या द्रविणं त्वमेव,\nत्वमेव सर्वं मम देव देव॥',
['O God, You alone are my mother and father, my relative and friend, my knowledge and wealth; You are my everything.', 'हे प्रभु, आप ही मेरी माता, पिता, बंधु और सखा हैं; आप ही विद्या और धन हैं; आप ही मेरे सब कुछ हैं।'],
['End of puja, anytime', 'पूजा के अंत में, कभी भी'], 'Tvameva mata cha pita tvameva\ntvameva bandhushcha sakha tvameva\ntvameva vidya dravinam tvameva\ntvameva sarvam mama deva deva');
M('purnamadah', ['peace'], ['Om Purnamadah (Shanti Path)', 'ॐ पूर्णमदः (शांति पाठ)'],
'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥\nॐ शान्तिः शान्तिः शान्तिः॥',
['That is whole, this is whole; from the whole comes the whole. Take the whole from the whole and the whole remains. (Ishavasya Upanishad)', 'वह पूर्ण है, यह पूर्ण है; पूर्ण से पूर्ण उत्पन्न होता है। पूर्ण में से पूर्ण निकालने पर भी पूर्ण ही शेष रहता है। (ईशावास्य उपनिषद)'],
['Start or end of any puja', 'किसी भी पूजा के आरंभ या अंत में'], 'Om purnamadah purnamidam purnat purnam udachyate\npurnasya purnam adaya purnam evavashishyate\nOm shantih shantih shantih');
M('brahmarpanam', ['daily', 'peace'], ['Brahmarpanam (Bhojan Mantra)', 'ब्रह्मार्पणं (भोजन मंत्र)'],
'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम्।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना॥',
['From the Bhagavad Gita (4.24): the offering, the food and the one who eats are all the Divine. Said before meals.', 'भगवद गीता (4.24) से: अर्पण, भोजन और खाने वाला – सब ब्रह्म ही है। भोजन से पहले बोला जाता है।'],
['Before every meal', 'हर भोजन से पहले'], 'Brahmarpanam brahma havir brahmagnau brahmana hutam\nbrahmaiva tena gantavyam brahma-karma-samadhina');
M('yada-yada', ['vishnu', 'stuti'], ['Yada Yada Hi Dharmasya (Gita)', 'यदा यदा हि धर्मस्य (गीता)'],
'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥\nपरित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
['Shri Krishna in the Gita (4.7-8): whenever dharma declines, I come, age after age, to protect the good and restore dharma.', 'गीता (4.7-8) में श्रीकृष्ण: जब-जब धर्म की हानि होती है, मैं सज्जनों की रक्षा और धर्म की स्थापना के लिए युग-युग में प्रकट होता हूँ।'],
['Gita path, Janmashtami', 'गीता पाठ, जन्माष्टमी'], 'Yada yada hi dharmasya glanir bhavati bharata\nabhyutthanam adharmasya tadatmanam srijamyaham\nparitranaya sadhunam vinashaya cha dushkritam\ndharma-samsthapanarthaya sambhavami yuge yuge');
M('krishnaya', ['vishnu'], ['Krishnaya Vasudevaya', 'कृष्णाय वासुदेवाय'],
'कृष्णाय वासुदेवाय हरये परमात्मने।\nप्रणतः क्लेशनाशाय गोविन्दाय नमो नमः॥',
['Salutations again and again to Krishna, Vasudeva, Hari, the Supreme Soul, Govinda, who removes the troubles of those who bow to Him.', 'कृष्ण, वासुदेव, हरि, परमात्मा, गोविंद को बार-बार नमन, जो शरणागत के कष्ट दूर करते हैं।'],
['To remove troubles; 11 or 108 times', 'कष्ट दूर करने के लिए; 11 या 108 बार'], 'Krishnaya vasudevaya haraye paramatmane\npranatah klesha-nashaya govindaya namo namah');
M('ram-rameti', ['vishnu'], ['Shri Ram Ram Rameti', 'श्रीराम राम रामेति'],
'श्रीराम राम रामेति रमे रामे मनोरमे।\nसहस्रनाम तत्तुल्यं रामनाम वरानने॥',
['Shiva tells Parvati: saying "Ram" three times equals reciting the thousand names of Vishnu.', 'शिवजी पार्वती जी से कहते हैं: तीन बार "राम" कहना विष्णु सहस्रनाम के बराबर है।'],
['When there is no time for a full path', 'जब पूरा पाठ करने का समय न हो'], 'Shri rama rama rameti rame rame manorame\nsahasranama tat-tulyam rama-nama varanane');
M('manojavam', ['hanuman', 'stuti'], ['Manojavam Marutatulyavegam', 'मनोजवं मारुततुल्यवेगं'],
'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
['I take refuge in Hanuman, swift as the mind and the wind, master of his senses, wisest of the wise, messenger of Shri Ram.', 'मन और वायु के समान वेगवान, जितेंद्रिय, बुद्धिमानों में श्रेष्ठ, श्रीराम के दूत हनुमान जी की शरण लेता हूँ।'],
['Before travel and on Tuesdays', 'यात्रा से पहले और मंगलवार को'], 'Manojavam maruta-tulya-vegam jitendriyam buddhimatam varishtham\nvatatmajam vanara-yutha-mukhyam shri-rama-dutam sharanam prapadye');
M('ganesh-gayatri', ['ganesh'], ['Ganesh Gayatri', 'गणेश गायत्री'],
'ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि।\nतन्नो दन्ती प्रचोदयात्॥',
['We know the one-tusked Lord and meditate on the curved-trunk Lord; may Ganesha inspire us.', 'हम एकदंत को जानते हैं, वक्रतुंड का ध्यान करते हैं; गणेश जी हमें प्रेरित करें।'],
['108 times on Wednesday and Chaturthi', 'बुधवार और चतुर्थी को 108 बार'], 'Om ekadantaya vidmahe vakratundaya dhimahi\ntanno danti prachodayat');
M('shiv-panchakshar', ['shiv', 'stuti'], ['Nagendraharaya (Shiv Panchakshar)', 'नागेन्द्रहाराय (शिव पंचाक्षर)'],
'नागेन्द्रहाराय त्रिलोचनाय\nभस्माङ्गरागाय महेश्वराय।\nनित्याय शुद्धाय दिगम्बराय\nतस्मै नकाराय नमः शिवाय॥',
['First verse of Adi Shankaracharya\'s Shiva Panchakshara Stotra: to Shiva who wears the serpent king, three-eyed, smeared with ash, eternal and pure – salutations to "Na".', 'आदि शंकराचार्य के शिव पंचाक्षर स्तोत्र का पहला श्लोक: नागराज को धारण करने वाले, त्रिनेत्र, भस्म लगाए, नित्य और शुद्ध शिव को – "न" अक्षर को नमन।'],
['Mondays and Sawan', 'सोमवार और सावन'], 'Nagendra-haraya trilochanaya\nbhasmanga-ragaya maheshvaraya\nnityaya shuddhaya digambaraya\ntasmai na-karaya namah shivaya');
M('kshama', ['shiv', 'daily'], ['Karacharana Kritam (Forgiveness Prayer)', 'करचरणकृतं (क्षमा प्रार्थना)'],
'करचरणकृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधम्।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो॥',
['O Mahadev, ocean of compassion, forgive every mistake I made with hands, feet, speech, body, ears, eyes or mind, knowingly or unknowingly.', 'हे करुणा के सागर महादेव, हाथ, पैर, वाणी, शरीर, कान, आँख या मन से जाने-अनजाने हुई मेरी सब भूलें क्षमा करें।'],
['At night before sleeping', 'रात को सोने से पहले'], 'Kara-charana-kritam vak-kayajam karmajam va\nshravana-nayanajam va manasam vaparadham\nvihitam avihitam va sarvam etat kshamasva\njaya jaya karunabdhe shri mahadeva shambho');
M('sarva-mangala', ['devi', 'stuti'], ['Sarva Mangala Mangalye', 'सर्वमङ्गलमाङ्गल्ये'],
'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
['From the Durga Saptashati: salutations to Narayani, Gauri, the most auspicious one, who fulfils every good aim and gives refuge.', 'दुर्गा सप्तशती से: सब मंगलों में मंगलमयी, सब कार्य सिद्ध करने वाली, शरण देने वाली गौरी नारायणी को नमस्कार।'],
['Navratri and before any good work', 'नवरात्रि और हर शुभ कार्य से पहले'], 'Sarva-mangala-mangalye shive sarvartha-sadhike\nsharanye tryambake gauri narayani namostu te');
M('navarna', ['devi'], ['Navarna Mantra (Chamunda)', 'नवार्ण मंत्र (चामुंडा)'], 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥',
['The nine-syllable mantra of Maa Durga (Chamunda), for Saraswati, Lakshmi and Kali\'s blessings together.', 'माँ दुर्गा (चामुंडा) का नौ अक्षरों का मंत्र – सरस्वती, लक्ष्मी और काली की एक साथ कृपा के लिए।'],
['108 times in Navratri', 'नवरात्रि में 108 बार'], 'Om aim hreem kleem chamundayai vichche');
M('sarva-badha', ['devi'], ['Sarva Badha Vinirmukto', 'सर्वाबाधाविनिर्मुक्तो'],
'सर्वाबाधाविनिर्मुक्तो धनधान्यसुतान्वितः।\nमनुष्यो मत्प्रसादेन भविष्यति न संशयः॥',
['The Devi\'s promise in the Durga Saptashati: by My grace a person becomes free of all obstacles and is blessed with wealth, food and children.', 'दुर्गा सप्तशती में देवी का वचन: मेरी कृपा से मनुष्य सब बाधाओं से मुक्त होकर धन, धान्य और संतान से युक्त होगा।'],
['For removing obstacles; 108 times', 'बाधा दूर करने के लिए; 108 बार'], 'Sarva-badha-vinirmukto dhana-dhanya-sutanvitah\nmanushyo mat-prasadena bhavishyati na samshayah');
M('kali-mantra', ['devi'], ['Kali Mantra', 'काली मंत्र'], 'ॐ क्रीं कालिकायै नमः॥',
['Salutations to Maa Kali, for protection and courage.', 'रक्षा और साहस के लिए माँ काली को नमन।'], ['Saturday or Amavasya, 108 times', 'शनिवार या अमावस्या, 108 बार'], 'Om kreem kalikayai namah');
M('lakshmi-ashtak', ['devi', 'stuti'], ['Namastestu Mahamaye (Mahalakshmi)', 'नमस्तेऽस्तु महामाये (महालक्ष्मी)'],
'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥',
['First verse of the Mahalakshmi Ashtakam: salutations to Mahalakshmi, the great Maya, worshipped by the gods, holding conch, discus and mace.', 'महालक्ष्मी अष्टकम का पहला श्लोक: देवताओं द्वारा पूजित, शंख-चक्र-गदा धारण करने वाली महामाया महालक्ष्मी को नमस्कार।'],
['Fridays and Diwali', 'शुक्रवार और दीपावली'], 'Namastestu mahamaye shri-pithe sura-pujite\nshankha-chakra-gada-haste mahalakshmi namostu te');
M('kuber', ['devi'], ['Kuber Mantra', 'कुबेर मंत्र'], 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये\nधनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
['Prayer to Kuber, lord of wealth, for prosperity in the home.', 'धन के स्वामी कुबेर से घर में समृद्धि की प्रार्थना।'], ['Dhanteras, Diwali and Fridays', 'धनतेरस, दीपावली और शुक्रवार'], 'Om yakshaya kuberaya vaishravanaya dhana-dhanyadhipataye\ndhana-dhanya-samriddhim me dehi dapaya svaha');
M('navgraha-shanti', ['graha', 'peace'], ['Navgraha Shanti Shloka', 'नवग्रह शांति श्लोक'],
'ब्रह्मा मुरारिस्त्रिपुरान्तकारी\nभानुः शशी भूमिसुतो बुधश्च।\nगुरुश्च शुक्रः शनिराहुकेतवः\nसर्वे ग्रहाः शान्तिकरा भवन्तु॥',
['May Brahma, Vishnu, Shiva and the nine planets – Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu – all bring peace.', 'ब्रह्मा, विष्णु, शिव और नौ ग्रह – सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु, केतु – सब शांति देने वाले हों।'],
['Daily, for peace from all planets', 'रोज़, सभी ग्रहों की शांति के लिए'], 'Brahma murari-stripurantakari\nbhanuh shashi bhumisuto budhashcha\ngurushcha shukrah shani-rahu-ketavah\nsarve grahah shantikara bhavantu');
M('surya-japakusuma', ['graha', 'daily'], ['Japakusuma (Surya Mantra)', 'जपाकुसुम (सूर्य मंत्र)'],
'जपाकुसुमसंकाशं काश्यपेयं महाद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥\n\nॐ घृणि सूर्याय नमः॥',
['I bow to the Sun, red like the hibiscus, son of Kashyapa, enemy of darkness, who removes all sins.', 'गुड़हल के फूल जैसे लाल, कश्यप के पुत्र, अंधकार के शत्रु, सब पाप हरने वाले सूर्यदेव को प्रणाम।'],
['Morning, while offering water (arghya) to the Sun', 'सुबह, सूर्य को जल (अर्घ्य) देते समय'], 'Japa-kusuma-sankasham kashyapeyam mahadyutim\ntamorim sarva-papaghnam pranatosmi divakaram\nOm ghrini suryaya namah');
M('shani-nilanjana', ['graha'], ['Nilanjana Samabhasam (Shani)', 'नीलांजनसमाभासं (शनि)'],
'नीलांजनसमाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तण्डसंभूतं तं नमामि शनैश्चरम्॥',
['I bow to Shani Dev, dark like blue collyrium, son of the Sun and Chhaya, elder brother of Yama.', 'नीले अंजन जैसे, सूर्य और छाया के पुत्र, यमराज के बड़े भाई शनिदेव को नमन।'],
['Saturdays, especially in Sade Sati', 'शनिवार, विशेषकर साढ़े साती में'], 'Nilanjana-samabhasam ravi-putram yamagrajam\nchhaya-martanda-sambhutam tam namami shanaishcharam');
M('sai-mantra', ['daily'], ['Om Sai Ram', 'ॐ साईं राम'], 'ॐ साईं नमो नमः, श्री साईं नमो नमः।\nजय जय साईं नमो नमः, सद्गुरु साईं नमो नमः॥',
['Simple chant to Shirdi Sai Baba: salutations again and again to Sai, the true Guru.', 'शिरडी साईं बाबा का सरल जप: सद्गुरु साईं को बार-बार नमन।'], ['Thursdays', 'गुरुवार'], 'Om sai namo namah, shri sai namo namah\njai jai sai namo namah, sadguru sai namo namah');

/* --- Jain --- */
M('chattari', ['jain', 'daily'], ['Chattari Mangalam', 'चत्तारि मंगलं'],
'चत्तारि मंगलं, अरिहंता मंगलं, सिद्धा मंगलं,\nसाहू मंगलं, केवलि पण्णत्तो धम्मो मंगलं॥\n\nचत्तारि लोगुत्तमा, अरिहंता लोगुत्तमा, सिद्धा लोगुत्तमा,\nसाहू लोगुत्तमा, केवलि पण्णत्तो धम्मो लोगुत्तमो॥\n\nचत्तारि सरणं पवज्जामि, अरिहंते सरणं पवज्जामि,\nसिद्धे सरणं पवज्जामि, साहू सरणं पवज्जामि,\nकेवलि पण्णत्तं धम्मं सरणं पवज्जामि॥',
['Four are auspicious, four are the highest in the world, and in four I take refuge: the Arihants, the Siddhas, the Sadhus and the Dharma taught by the Kevalis.', 'चार मंगल हैं, चार लोक में उत्तम हैं, चार की शरण लेता हूँ: अरिहंत, सिद्ध, साधु और केवली भगवान द्वारा कहा गया धर्म।'],
['After the Navkar Mantra, morning and before sleep', 'णमोकार मंत्र के बाद, सुबह और सोने से पहले'], 'Chattari mangalam, arihanta mangalam, siddha mangalam,\nsahu mangalam, kevali pannatto dhammo mangalam\nChattari loguttama ... Chattari saranam pavajjami ...');
M('khamemi', ['jain', 'peace'], ['Khamemi Savve Jiva (Forgiveness)', 'खामेमि सव्वे जीवा (क्षमापना)'],
'खामेमि सव्वे जीवा, सव्वे जीवा खमंतु मे।\nमित्ती मे सव्व भूएसु, वेरं मज्झ न केणइ॥\n\nमिच्छामि दुक्कडं॥',
['I forgive all living beings; may all living beings forgive me. I have friendship with all, enmity with none. "Michchhami Dukkadam" – may my faults be forgiven.', 'मैं सब जीवों को क्षमा करता हूँ, सब जीव मुझे क्षमा करें। सबसे मेरी मैत्री है, किसी से वैर नहीं। "मिच्छामि दुक्कडं" – मेरी भूलें क्षमा हों।'],
['Daily, and especially on Samvatsari / Kshamavani (Paryushan)', 'रोज़, और विशेषकर संवत्सरी / क्षमावाणी (पर्युषण) पर'], 'Khamemi savve jiva, savve jiva khamantu me\nmitti me savva bhuesu, veram majjha na kenai\nMichchhami dukkadam');
M('mangalam-viro', ['jain', 'daily'], ['Mangalam Bhagwan Viro', 'मंगलं भगवान वीरो'],
'मंगलं भगवान वीरो, मंगलं गौतम प्रभु।\nमंगलं स्थूलिभद्राद्या, जैन धर्मोऽस्तु मंगलम्॥\n\n(दिगंबर परंपरा: मंगलं कुन्दकुन्दार्यो, जैन धर्मोऽस्तु मंगलम्॥)',
['Bhagwan Mahavir is auspicious, Gautam Swami is auspicious, Acharya Sthulibhadra (Digambar: Kundakunda) is auspicious, Jain Dharma is auspicious.', 'भगवान महावीर मंगल हैं, गौतम स्वामी मंगल हैं, आचार्य स्थूलिभद्र (दिगंबर: कुंदकुंद) मंगल हैं, जैन धर्म मंगल है।'],
['Start of any puja, travel or new work', 'हर पूजा, यात्रा या नए काम की शुरुआत में'], 'Mangalam bhagavan viro, mangalam gautama prabhu\nmangalam sthulibhadradya, jaina dharmostu mangalam');
M('darshanam', ['jain'], ['Darshanam Devadevasya', 'दर्शनं देवदेवस्य'],
'दर्शनं देवदेवस्य दर्शनं पापनाशनम्।\nदर्शनं स्वर्गसोपानं दर्शनं मोक्षसाधनम्॥',
['The darshan of the Jina destroys sins; it is a step to heaven and a means to moksha.', 'जिनेन्द्र देव के दर्शन पापों का नाश करते हैं; दर्शन स्वर्ग की सीढ़ी और मोक्ष का साधन है।'],
['On entering the Jain mandir', 'जैन मंदिर में प्रवेश करते समय'], 'Darshanam deva-devasya darshanam papa-nashanam\ndarshanam svarga-sopanam darshanam moksha-sadhanam');
M('bhaktamar', ['jain', 'stuti'], ['Bhaktamar Stotra (verses 1, 2, 26)', 'भक्तामर स्तोत्र (श्लोक 1, 2, 26)'],
'भक्तामर-प्रणत-मौलि-मणि-प्रभाणा-\nमुद्योतकं दलित-पाप-तमो-वितानम्।\nसम्यक् प्रणम्य जिन-पाद-युगं युगादा-\nवालम्बनं भव-जले पततां जनानाम्॥१॥\n\nयः संस्तुतः सकल-वाङ्मय-तत्त्व-बोधा-\nदुद्भूत-बुद्धि-पटुभिः सुर-लोक-नाथैः।\nस्तोत्रैर्जगत्त्रितय-चित्त-हरैरुदारैः\nस्तोष्ये किलाहमपि तं प्रथमं जिनेन्द्रम्॥२॥\n\nतुभ्यं नमस्त्रिभुवनार्तिहराय नाथ,\nतुभ्यं नमः क्षितितलामलभूषणाय।\nतुभ्यं नमस्त्रिजगतः परमेश्वराय,\nतुभ्यं नमो जिन भवोदधिशोषणाय॥२६॥',
['Acharya Mantunga\'s hymn to Bhagwan Rishabhdev (Adinath), loved by both Shwetambar and Digambar Jains. "Salutations to You, O Lord, who removes the pain of the three worlds and dries up the ocean of rebirth."', 'आचार्य मानतुंग का भगवान ऋषभदेव (आदिनाथ) का स्तोत्र, जो श्वेतांबर और दिगंबर दोनों में प्रिय है। "हे नाथ, तीनों लोकों का दुख हरने वाले और भवसागर को सुखाने वाले, आपको नमस्कार।"'],
['Morning; the full stotra has 44/48 verses', 'सुबह; पूरे स्तोत्र में 44/48 श्लोक हैं'], 'Bhaktamara-pranata-mauli-mani-prabhanam\nudyotakam dalita-papa-tamo-vitanam\n...\nTubhyam namas tribhuvanarti-haraya natha ...');
M('uvasaggaharam', ['jain', 'stuti'], ['Uvasaggaharam (verse 1)', 'उवसग्गहरं (पहली गाथा)'],
'उवसग्गहरं पासं, पासं वंदामि कम्म-घण-मुक्कं।\nविसहर-विस-निन्नासं, मंगल-कल्लाण-आवासं॥',
['Attributed to Acharya Bhadrabahu: I bow to Bhagwan Parshvanath, remover of troubles, free from heavy karma, destroyer of snake-poison, home of blessings and welfare.', 'आचार्य भद्रबाहु से जुड़ी स्तुति: संकट हरने वाले, कर्मों से मुक्त, विष का नाश करने वाले, मंगल और कल्याण के धाम भगवान पार्श्वनाथ को वंदन।'],
['Morning, for protection from troubles', 'सुबह, संकटों से रक्षा के लिए'], 'Uvasaggaharam pasam, pasam vandami kamma-ghana-mukkam\nvisahara-visa-ninnasam, mangala-kallana-avasam');
M('shivamastu', ['jain', 'peace'], ['Shivamastu Sarva Jagatah', 'शिवमस्तु सर्व जगतः'],
'शिवमस्तु सर्वजगतः, परहितनिरता भवन्तु भूतगणाः।\nदोषाः प्रयान्तु नाशं, सर्वत्र सुखीभवतु लोकः॥',
['May the whole world be blessed; may all beings work for the good of others; may all faults vanish; may people everywhere be happy.', 'सारे जगत का कल्याण हो, सब प्राणी दूसरों के हित में लगें, सब दोष नष्ट हों, सर्वत्र लोग सुखी हों।'],
['End of puja and pratikraman', 'पूजा और प्रतिक्रमण के अंत में'], 'Shivam astu sarva-jagatah, para-hita-nirata bhavantu bhuta-ganah\ndoshah prayantu nasham, sarvatra sukhi bhavatu lokah');
M('jain-mahavir-mantra', ['jain'], ['Om Hreem Shri Mahavir', 'ॐ ह्रीं श्री महावीर स्वामिने नमः'], 'ॐ ह्रीं श्री महावीर स्वामिने नमः॥',
['Salutations to Bhagwan Mahavir Swami, the 24th Tirthankar.', '24वें तीर्थंकर भगवान महावीर स्वामी को नमन।'], ['108 times, Mahavir Jayanti and daily jaap', '108 बार, महावीर जयंती और रोज़ का जाप'], 'Om hreem shri mahavira svamine namah');

/* --- Sikh --- */
M('aad-sach', ['sikh', 'daily'], ['Aad Sach (Japji Sahib)', 'आदि सचु (जपजी साहिब)'],
'ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥\nਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥\n\nआदि सचु जुगादि सचु॥\nहै भी सचु नानक होसी भी सचु॥१॥',
['Guru Nanak Dev Ji, opening of Japji Sahib: True in the beginning, true through the ages, true now, and, says Nanak, forever true.', 'गुरु नानक देव जी, जपजी साहिब का आरंभ: आदि में सच, युगों से सच, अब भी सच, और नानक कहते हैं, आगे भी सच ही रहेगा।'],
['Morning (Amrit vela), after the Mool Mantar', 'सुबह (अमृत वेला), मूल मंत्र के बाद'], 'Aad sach, jugaad sach\nhai bhi sach, Nanak hosi bhi sach');
M('japji-1', ['sikh'], ['Sochai Soch Na Hovai (Japji, Pauri 1)', 'सोचै सोचि न होवई (जपजी, पउड़ी 1)'],
'सोचै सोचि न होवई जे सोची लख वार॥\nचुपै चुप न होवई जे लाइ रहा लिव तार॥\nभुखिआ भुख न उतरी जे बंना पुरीआ भार॥\nसहस सिआणपा लख होहि त इक न चलै नालि॥\nकिव सचिआरा होईऐ किव कूड़ै तुटै पालि॥\nहुकमि रजाई चलणा नानक लिखिआ नालि॥१॥',
['Thinking a lakh times, staying silent or piling up riches does not bring peace; cleverness does not go with us. The way to truth is to walk in God\'s will (Hukam).', 'लाख बार सोचने, चुप रहने या धन जमा करने से शांति नहीं मिलती; चतुराई साथ नहीं जाती। सच का रास्ता है – प्रभु के हुकम में चलना।'],
['Morning, as part of Japji Sahib', 'सुबह, जपजी साहिब के भाग के रूप में'], 'Sochai soch na hovai je sochi lakh vaar ...\nHukam rajai chalna, Nanak likhia naal');
M('gagan-thaal', ['sikh', 'aarti'], ['Gagan Mai Thaal (Sikh Aarti)', 'गगन मै थालु (सिख आरती)'],
'ਗਗਨ ਮੈ ਥਾਲੁ ਰਵਿ ਚੰਦੁ ਦੀਪਕ ਬਨੇ ਤਾਰਿਕਾ ਮੰਡਲ ਜਨਕ ਮੋਤੀ ॥\n\nगगन मै थालु रवि चंदु दीपक बने तारिका मंडल जनक मोती॥\nधूपु मलआनलो पवणु चवरो करे सगल बनराइ फूलंत जोती॥१॥\nकैसी आरती होइ॥ भव खंडना तेरी आरती॥\nअनहता सबद वाजंत भेरी॥१॥ रहाउ॥',
['Guru Nanak Dev Ji\'s aarti, sung at Jagannath Puri: the sky is the plate, the sun and moon are the lamps, the stars are pearls – all of nature performs Your aarti.', 'गुरु नानक देव जी की आरती, जगन्नाथ पुरी में गाई: आकाश थाल है, सूर्य-चंद्र दीपक, तारे मोती – सारी प्रकृति आपकी आरती कर रही है।'],
['Evening, as part of Kirtan Sohila', 'रात को, कीर्तन सोहिला के भाग के रूप में'], 'Gagan mai thaal rav chand deepak bane, taarika mandal janak moti\nDhoop malaanlo pavan chavro kare, sagal banrai phoolant joti\nKaisi aarti hoi, bhav khandna teri aarti');
M('tati-vao', ['sikh', 'peace'], ['Tati Vao Na Lagai (Protection)', 'ताती वाउ न लगई (रक्षा)'],
'ताती वाउ न लगई पारब्रहम सरणाई॥\nचउगिरद हमारै राम कार दुखु लगै न भाई॥१॥',
['Guru Arjan Dev Ji: in the refuge of the Supreme Lord, no hot wind touches me; God has drawn a protective circle around me, so no pain can reach me.', 'गुरु अर्जन देव जी: परब्रह्म की शरण में कोई गर्म हवा नहीं लगती; प्रभु ने चारों ओर रक्षा की रेखा खींची है, कोई दुख नहीं लगता।'],
['For protection and when a child is unwell', 'रक्षा के लिए और जब बच्चा अस्वस्थ हो'], 'Taati vaao na lag-ee paarbrahm sarnaa-ee\nChaugird hamaarai raam kaar dukh lagai na bhaa-ee');
M('deh-shiva', ['sikh', 'stuti'], ['Deh Shiva Bar Mohe Ehai', 'देह सिवा बरु मोहि इहै'],
'देह सिवा बरु मोहि इहै सुभ करमन ते कबहूं न टरों॥\nन डरों अरि सों जब जाइ लरों निसचै करि अपुनी जीत करों॥\nअरु सिख हों आपने ही मन कौ इह लालच हउ गुन तउ उचरों॥\nजब आव की अउध निदान बनै अति ही रन मै तब जूझ मरों॥',
['Guru Gobind Singh Ji\'s prayer: grant me this boon, O Lord, that I never turn away from good deeds, never fear when I face the enemy, and win with certainty.', 'गुरु गोबिंद सिंह जी की प्रार्थना: हे प्रभु, मुझे यह वर दो कि मैं शुभ कर्मों से कभी न हटूँ, शत्रु से लड़ते समय न डरूँ और निश्चय से विजय पाऊँ।'],
['For courage, anytime', 'साहस के लिए, कभी भी'], 'Deh shiva bar mohe ehai, shubh karman te kabhoon na taron\nNa daron ar so jab jaye laron, nischai kar apuni jeet karon');
M('sarbat-bhala', ['sikh', 'peace'], ['Nanak Naam Chardi Kala', 'नानक नाम चढ़दी कला'],
'नानक नाम चढ़दी कला, तेरे भाणे सरबत दा भला॥\n\nवाहिगुरु जी का खालसा, वाहिगुरु जी की फ़तेह॥',
['The closing line of the Ardas: through Nanak and the Name may our spirits always rise, and by Your will may there be good for all (Sarbat da Bhala).', 'अरदास की अंतिम पंक्ति: नानक के नाम से हमारा मन सदा चढ़दी कला में रहे, और आपके भाणे में सबका भला हो।'],
['End of Ardas, morning and evening', 'अरदास के अंत में, सुबह और शाम'], 'Nanak naam chardi kala, tere bhaane sarbat da bhala\nWaheguru ji ka Khalsa, Waheguru ji ki Fateh');

/* --- Buddhist --- */
M('namo-tassa', ['buddh', 'daily'], ['Namo Tassa (Homage to the Buddha)', 'नमो तस्स (बुद्ध वंदना)'],
'नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स॥ (३ बार)',
['Homage to the Blessed One, the Worthy One, the fully Enlightened Buddha. Said three times at the start of every Buddhist prayer.', 'उन भगवान, अर्हत, सम्यक् संबुद्ध को नमस्कार। हर बौद्ध वंदना की शुरुआत में तीन बार बोला जाता है।'],
['Start of meditation or prayer', 'ध्यान या वंदना की शुरुआत में'], 'Namo tassa bhagavato arahato samma-sambuddhassa (3 times)');
M('tisarana', ['buddh', 'daily'], ['Tisarana (Three Refuges)', 'तिसरण (त्रिशरण)'],
'बुद्धं सरणं गच्छामि।\nधम्मं सरणं गच्छामि।\nसंघं सरणं गच्छामि॥',
['I go to the Buddha for refuge, I go to the Dhamma for refuge, I go to the Sangha for refuge.', 'मैं बुद्ध की शरण जाता हूँ, धम्म की शरण जाता हूँ, संघ की शरण जाता हूँ।'],
['Daily, Buddha Purnima', 'रोज़, बुद्ध पूर्णिमा'], 'Buddham saranam gacchami\nDhammam saranam gacchami\nSangham saranam gacchami');
M('metta', ['buddh', 'peace'], ['Metta (Loving-kindness)', 'मेत्ता (मैत्री भावना)'],
'सब्बे सत्ता भवन्तु सुखितत्ता।\nसब्बे सत्ता अवेरा होन्तु।\nभवतु सब्ब मंगलं॥',
['May all beings be happy; may all beings be free from hatred; may all be blessed.', 'सब प्राणी सुखी हों; सब प्राणी वैर से मुक्त हों; सबका मंगल हो।'],
['End of meditation, before sleep', 'ध्यान के अंत में, सोने से पहले'], 'Sabbe satta bhavantu sukhitatta\nSabbe satta avera hontu\nBhavatu sabba mangalam');
M('om-mani', ['buddh'], ['Om Mani Padme Hum', 'ॐ मणि पद्मे हूँ'], 'ॐ मणि पद्मे हूँ॥',
['The six-syllable mantra of Avalokiteshvara, the Bodhisattva of compassion, chanted across the Himalayas.', 'करुणा के बोधिसत्व अवलोकितेश्वर का छह अक्षरों का मंत्र, जो पूरे हिमालय क्षेत्र में जपा जाता है।'],
['Anytime, 108 times on a mala', 'कभी भी, माला पर 108 बार'], 'Om mani padme hum');
