/* Bilingual content */
const C = {
  rashi: [['Mesh (Aries)', 'मेष'], ['Vrishabh (Taurus)', 'वृषभ'], ['Mithun (Gemini)', 'मिथुन'], ['Kark (Cancer)', 'कर्क'], ['Simha (Leo)', 'सिंह'], ['Kanya (Virgo)', 'कन्या'], ['Tula (Libra)', 'तुला'], ['Vrishchik (Scorpio)', 'वृश्चिक'], ['Dhanu (Sagittarius)', 'धनु'], ['Makar (Capricorn)', 'मकर'], ['Kumbh (Aquarius)', 'कुंभ'], ['Meen (Pisces)', 'मीन']],
  rashiShort: [['Mesh', 'मेष'], ['Vrishabh', 'वृषभ'], ['Mithun', 'मिथुन'], ['Kark', 'कर्क'], ['Simha', 'सिंह'], ['Kanya', 'कन्या'], ['Tula', 'तुला'], ['Vrishchik', 'वृश्चिक'], ['Dhanu', 'धनु'], ['Makar', 'मकर'], ['Kumbh', 'कुंभ'], ['Meen', 'मीन']],
  nak: [['Ashwini', 'अश्विनी'], ['Bharani', 'भरणी'], ['Krittika', 'कृत्तिका'], ['Rohini', 'रोहिणी'], ['Mrigashira', 'मृगशिरा'], ['Ardra', 'आर्द्रा'], ['Punarvasu', 'पुनर्वसु'], ['Pushya', 'पुष्य'], ['Ashlesha', 'आश्लेषा'], ['Magha', 'मघा'], ['Purva Phalguni', 'पूर्वा फाल्गुनी'], ['Uttara Phalguni', 'उत्तरा फाल्गुनी'], ['Hasta', 'हस्त'], ['Chitra', 'चित्रा'], ['Swati', 'स्वाति'], ['Vishakha', 'विशाखा'], ['Anuradha', 'अनुराधा'], ['Jyeshtha', 'ज्येष्ठा'], ['Mula', 'मूल'], ['Purva Ashadha', 'पूर्वाषाढ़ा'], ['Uttara Ashadha', 'उत्तराषाढ़ा'], ['Shravana', 'श्रवण'], ['Dhanishta', 'धनिष्ठा'], ['Shatabhisha', 'शतभिषा'], ['Purva Bhadrapada', 'पूर्वा भाद्रपद'], ['Uttara Bhadrapada', 'उत्तरा भाद्रपद'], ['Revati', 'रेवती']],
  tithi: [['Pratipada', 'प्रतिपदा'], ['Dwitiya', 'द्वितीया'], ['Tritiya', 'तृतीया'], ['Chaturthi', 'चतुर्थी'], ['Panchami', 'पंचमी'], ['Shashthi', 'षष्ठी'], ['Saptami', 'सप्तमी'], ['Ashtami', 'अष्टमी'], ['Navami', 'नवमी'], ['Dashami', 'दशमी'], ['Ekadashi', 'एकादशी'], ['Dwadashi', 'द्वादशी'], ['Trayodashi', 'त्रयोदशी'], ['Chaturdashi', 'चतुर्दशी'], ['Purnima', 'पूर्णिमा'], ['Amavasya', 'अमावस्या']],
  yoga: [['Vishkambha', 'विष्कंभ'], ['Priti', 'प्रीति'], ['Ayushman', 'आयुष्मान'], ['Saubhagya', 'सौभाग्य'], ['Shobhana', 'शोभन'], ['Atiganda', 'अतिगंड'], ['Sukarma', 'सुकर्मा'], ['Dhriti', 'धृति'], ['Shula', 'शूल'], ['Ganda', 'गंड'], ['Vriddhi', 'वृद्धि'], ['Dhruva', 'ध्रुव'], ['Vyaghata', 'व्याघात'], ['Harshana', 'हर्षण'], ['Vajra', 'वज्र'], ['Siddhi', 'सिद्धि'], ['Vyatipata', 'व्यतीपात'], ['Variyana', 'वरीयान'], ['Parigha', 'परिघ'], ['Shiva', 'शिव'], ['Siddha', 'सिद्ध'], ['Sadhya', 'साध्य'], ['Shubha', 'शुभ'], ['Shukla', 'शुक्ल'], ['Brahma', 'ब्रह्म'], ['Indra', 'इंद्र'], ['Vaidhriti', 'वैधृति']],
  karana: [['Bava', 'बव'], ['Balava', 'बालव'], ['Kaulava', 'कौलव'], ['Taitila', 'तैतिल'], ['Gara', 'गर'], ['Vanija', 'वणिज'], ['Vishti (Bhadra)', 'विष्टि (भद्रा)'], ['Shakuni', 'शकुनि'], ['Chatushpada', 'चतुष्पद'], ['Naga', 'नाग'], ['Kimstughna', 'किंस्तुघ्न']],
  planet: { Sun: ['Sun', 'सूर्य'], Moon: ['Moon', 'चंद्र'], Mars: ['Mars', 'मंगल'], Mercury: ['Mercury', 'बुध'], Jupiter: ['Jupiter', 'गुरु'], Venus: ['Venus', 'शुक्र'], Saturn: ['Saturn', 'शनि'], Rahu: ['Rahu', 'राहु'], Ketu: ['Ketu', 'केतु'] },
  pAbbr: { Sun: ['Su', 'सू'], Moon: ['Mo', 'चं'], Mars: ['Ma', 'मं'], Mercury: ['Me', 'बु'], Jupiter: ['Ju', 'गु'], Venus: ['Ve', 'शु'], Saturn: ['Sa', 'श'], Rahu: ['Ra', 'रा'], Ketu: ['Ke', 'के'] },
  months: [['January', 'जनवरी'], ['February', 'फ़रवरी'], ['March', 'मार्च'], ['April', 'अप्रैल'], ['May', 'मई'], ['June', 'जून'], ['July', 'जुलाई'], ['August', 'अगस्त'], ['September', 'सितंबर'], ['October', 'अक्टूबर'], ['November', 'नवंबर'], ['December', 'दिसंबर']],
  wd: [['Sunday', 'रविवार'], ['Monday', 'सोमवार'], ['Tuesday', 'मंगलवार'], ['Wednesday', 'बुधवार'], ['Thursday', 'गुरुवार'], ['Friday', 'शुक्रवार'], ['Saturday', 'शनिवार']],
  wdLord: ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'],

  lagnaText: [
    ['Energetic, brave and a natural leader. You act fast and dislike waiting.', 'ऊर्जावान, साहसी और स्वभाव से नेता। आप तेज़ी से काम करते हैं और इंतज़ार पसंद नहीं करते।'],
    ['Calm, patient and dependable. You love comfort, good food and stability.', 'शांत, धैर्यवान और भरोसेमंद। आपको आराम, अच्छा भोजन और स्थिरता पसंद है।'],
    ['Clever, talkative and curious. You learn quickly and enjoy meeting people.', 'बुद्धिमान, बातूनी और जिज्ञासु। आप जल्दी सीखते हैं और लोगों से मिलना पसंद करते हैं।'],
    ['Caring, emotional and devoted to family. Home is your biggest strength.', 'देखभाल करने वाले, भावुक और परिवार से जुड़े हुए। घर आपकी सबसे बड़ी ताक़त है।'],
    ['Confident, generous and respected. You like to lead and be appreciated.', 'आत्मविश्वासी, उदार और सम्मानित। आपको नेतृत्व करना और सराहना पाना अच्छा लगता है।'],
    ['Practical, careful and hardworking. You notice every small detail.', 'व्यावहारिक, सावधान और मेहनती। आप हर छोटी बात पर ध्यान देते हैं।'],
    ['Balanced, polite and charming. You value fairness and harmony.', 'संतुलित, विनम्र और आकर्षक। आप न्याय और आपसी मेल को महत्व देते हैं।'],
    ['Deep, determined and private. You rarely give up on anything.', 'गहरे, दृढ़ और अपनी बातें मन में रखने वाले। आप आसानी से हार नहीं मानते।'],
    ['Optimistic, religious and honest. You love freedom and knowledge.', 'आशावादी, धार्मिक और ईमानदार। आपको स्वतंत्रता और ज्ञान से प्रेम है।'],
    ['Disciplined, patient and ambitious. Success comes to you steadily with time.', 'अनुशासित, धैर्यवान और महत्वाकांक्षी। समय के साथ आपको पक्की सफलता मिलती है।'],
    ['Thoughtful, helpful and independent. You think differently from others.', 'विचारशील, मददगार और स्वतंत्र। आप दूसरों से अलग सोचते हैं।'],
    ['Kind, spiritual and imaginative. You feel the pain of others deeply.', 'दयालु, आध्यात्मिक और कल्पनाशील। आप दूसरों का दुख गहराई से समझते हैं।']
  ],
  moonText: [
    ['Your mind is quick and active. Anger comes fast and goes fast.', 'आपका मन तेज़ और सक्रिय है। गुस्सा जल्दी आता है और जल्दी चला भी जाता है।'],
    ['The Moon is exalted here: your mind is steady and content.', 'यहाँ चंद्रमा उच्च का है: आपका मन स्थिर और संतुष्ट रहता है।'],
    ['Your mind enjoys conversation, reading and new ideas.', 'आपका मन बातचीत, पढ़ने और नए विचारों में लगता है।'],
    ['The Moon is in its own sign: a deeply caring, emotional nature.', 'चंद्रमा अपनी ही राशि में है: बहुत स्नेही और भावुक स्वभाव।'],
    ['Proud and warm-hearted. Respect matters a lot to your happiness.', 'स्वाभिमानी और दिलदार। सम्मान आपकी ख़ुशी के लिए बहुत ज़रूरी है।'],
    ['You think and analyse all the time. Try not to worry too much.', 'आप हर समय सोचते और विश्लेषण करते हैं। ज़्यादा चिंता न करें।'],
    ['You want peace and beauty around you. Arguments upset you.', 'आप अपने आसपास शांति और सुंदरता चाहते हैं। झगड़े आपको परेशान करते हैं।'],
    ['Strong emotions. The Moon is weak here, so prayer and meditation help a lot.', 'भावनाएँ बहुत गहरी हैं। यहाँ चंद्रमा नीच का है, इसलिए पूजा और ध्यान से बहुत लाभ होगा।'],
    ['A hopeful, faithful mind. You find peace in religion and travel.', 'आशावान और श्रद्धालु मन। धर्म और यात्रा से आपको शांति मिलती है।'],
    ['Serious and responsible. You keep your feelings inside.', 'गंभीर और ज़िम्मेदार। आप अपनी भावनाएँ मन में ही रखते हैं।'],
    ['A humanitarian mind. You care for friends and society.', 'मानवता से प्रेम करने वाला मन। आप मित्रों और समाज की चिंता करते हैं।'],
    ['Soft, devotional and dreamy, with a strong sixth sense.', 'कोमल, भक्तिमय और भावनाशील, आपका अंतर्ज्ञान बहुत तेज़ है।']
  ],
  dashaMeaning: {
    Ketu: ['Spiritual growth, detachment and sudden changes.', 'आध्यात्मिक उन्नति, वैराग्य और अचानक बदलाव।'],
    Venus: ['Comfort, marriage, vehicles, art and luxury.', 'सुख-सुविधा, विवाह, वाहन, कला और ऐश्वर्य।'],
    Sun: ['Authority, government work, father and self-respect.', 'अधिकार, सरकारी काम, पिता और मान-सम्मान।'],
    Moon: ['Mind, mother, travel and public relations.', 'मन, माता, यात्रा और लोगों से संबंध।'],
    Mars: ['Energy, property, land, courage and siblings.', 'ऊर्जा, ज़मीन-जायदाद, साहस और भाई-बहन।'],
    Rahu: ['Ambition, foreign links, technology and sudden events.', 'महत्वाकांक्षा, विदेश, तकनीक और अचानक घटनाएँ।'],
    Jupiter: ['Wisdom, children, wealth, religion and teachers.', 'ज्ञान, संतान, धन, धर्म और गुरु।'],
    Saturn: ['Hard work, discipline, patience and lasting results.', 'मेहनत, अनुशासन, धैर्य और स्थायी परिणाम।'],
    Mercury: ['Business, education, communication and friends.', 'व्यापार, शिक्षा, बातचीत और मित्र।']
  },
  houseMsg: [
    ['The Moon is in your own sign today. You may feel emotional and noticed. Look after yourself and begin small new things.', 'आज चंद्रमा आपकी ही राशि में है। मन भावुक रहेगा और लोग आप पर ध्यान देंगे। अपना ख़्याल रखें, छोटे नए काम शुरू कर सकते हैं।'],
    ['Money and family are in focus. Speak gently, because your words carry weight today. Postpone big spending.', 'आज धन और परिवार पर ध्यान रहेगा। सोच-समझकर बोलें, आज आपकी बात का असर रहेगा। बड़ा ख़र्च टालें।'],
    ['A day of courage and quick action. Phone calls, short trips and talks with siblings go well.', 'साहस और हिम्मत का दिन। फ़ोन, छोटी यात्राएँ और भाई-बहनों से बातचीत अच्छी रहेगी।'],
    ['You may feel restless at home. Take care of your mother and your own comfort. Postpone property decisions.', 'घर में मन थोड़ा बेचैन रह सकता है। माता और अपने आराम का ध्यान रखें। ज़मीन-जायदाद के फ़ैसले आज टालें।'],
    ['Good for prayer, learning and time with children. Keep away from risky investments.', 'पूजा-पाठ, पढ़ाई और बच्चों के साथ समय के लिए अच्छा दिन। जोखिम वाले निवेश से दूर रहें।'],
    ['Obstacles clear up and rivals stay quiet. A good day to finish pending work and improve your health.', 'रुकावटें दूर होंगी, विरोधी शांत रहेंगे। अटके काम निपटाने और सेहत सुधारने का अच्छा दिन।'],
    ['Partnerships and married life are favoured. Meetings, deals and time with your spouse go well.', 'साझेदारी और दांपत्य जीवन के लिए शुभ दिन। मुलाक़ात, सौदे और जीवनसाथी के साथ समय अच्छा रहेगा।'],
    ['Chandrashtama day: be extra careful. Avoid new beginnings, arguments and night travel. Drive carefully.', 'आज चंद्राष्टम है: विशेष सावधानी रखें। नए काम, बहस और रात की यात्रा से बचें। वाहन ध्यान से चलाएँ।'],
    ['Luck is with you. Seek blessings from elders, visit a temple and give to charity.', 'भाग्य आपके साथ है। बड़ों का आशीर्वाद लें, मंदिर जाएँ और दान करें।'],
    ['A strong day for work and reputation. Your efforts will be noticed, so take the lead.', 'काम और मान-सम्मान के लिए बहुत अच्छा दिन। आपकी मेहनत दिखेगी, आगे बढ़कर काम करें।'],
    ['A day of gains and good news. Friends help and wishes can come true. Good for money matters.', 'लाभ और शुभ समाचार का दिन। मित्रों से मदद मिलेगी, इच्छाएँ पूरी हो सकती हैं। धन के कामों के लिए अच्छा।'],
    ['Expenses and tiredness are possible. Rest well, meditate and avoid lending money.', 'ख़र्च और थकान हो सकती है। अच्छी तरह आराम करें, ध्यान करें और उधार देने से बचें।']
  ],
  houseBase: [3, 2, 4, 2, 3, 4, 4, 1, 4, 5, 5, 2],
  areaMod: [[0, 0, 0, 0], [0, 1, 0, 1], [1, 0, 1, 0], [-1, 0, 0, 1], [0, -1, 0, 1], [1, 0, 1, -1], [1, 1, 0, 1], [-1, -1, -1, 0], [0, 1, 0, 1], [1, 1, 0, 0], [1, 1, 0, 1], [-1, -1, 0, 0]],
  taraName: [['Janma', 'जन्म'], ['Sampat', 'संपत'], ['Vipat', 'विपत'], ['Kshema', 'क्षेम'], ['Pratyari', 'प्रत्यरि'], ['Sadhaka', 'साधक'], ['Vadha', 'वध'], ['Mitra', 'मित्र'], ['Ati Mitra', 'अति मित्र']],
  taraText: [['A mixed day. Stay calm and avoid overwork.', 'मिला-जुला दिन। शांत रहें और ज़्यादा काम का बोझ न लें।'], ['Good for money and shopping.', 'धन और ख़रीदारी के लिए शुभ।'], ['Small obstacles are possible, so double-check plans.', 'छोटी रुकावटें आ सकती हैं, योजनाएँ दोबारा जाँच लें।'], ['A peaceful, safe day. Good for family.', 'शांत और सुरक्षित दिन, परिवार के लिए अच्छा।'], ['Some opposition is possible. Avoid arguments.', 'कुछ विरोध हो सकता है, बहस से बचें।'], ['Your efforts succeed. Good for important work.', 'मेहनत सफल होगी, ज़रूरी कामों के लिए अच्छा।'], ['Take care of your health and travel safely.', 'सेहत और यात्रा में सावधानी रखें।'], ['Friends and well-wishers support you.', 'मित्र और शुभचिंतक साथ देंगे।'], ['A very supportive day. Go ahead with good work.', 'बहुत सहयोगी दिन, अच्छे कामों में आगे बढ़ें।']],
  taraMod: [0, 0.5, -1, 0.5, -1, 0.5, -1, 0.5, 1],
  dayLabel: [null, ['Be very careful', 'बहुत सावधानी रखें'], ['Be careful', 'सावधानी रखें'], ['Average day', 'सामान्य दिन'], ['Good day', 'शुभ दिन'], ['Excellent day', 'उत्तम दिन']],
  colour: {
    Sun: ['Orange', 'नारंगी', '#F08A24'], Moon: ['White', 'सफ़ेद', '#FFFFFF'], Mars: ['Red', 'लाल', '#D62828'], Mercury: ['Green', 'हरा', '#2A9D50'],
    Jupiter: ['Yellow', 'पीला', '#F4C430'], Venus: ['Light pink', 'हल्का गुलाबी', '#F7B6C8'], Saturn: ['Black', 'काला', '#1E1E1E'], Rahu: ['Grey', 'स्लेटी', '#8A8A8A']
  },
  wdNum: [1, 2, 9, 5, 3, 6, 8],
  luckyDir: [['East', 'पूर्व'], ['North-West', 'उत्तर-पश्चिम'], ['South', 'दक्षिण'], ['North', 'उत्तर'], ['North-East', 'उत्तर-पूर्व'], ['South-East', 'दक्षिण-पूर्व'], ['West', 'पश्चिम']],
  avoidDir: [['West', 'पश्चिम'], ['East', 'पूर्व'], ['North', 'उत्तर'], ['North', 'उत्तर'], ['South', 'दक्षिण'], ['West', 'पश्चिम'], ['East', 'पूर्व']],
  mantra: [['ॐ सूर्याय नमः', 'Om Suryaya Namah'], ['ॐ नमः शिवाय', 'Om Namah Shivaya'], ['ॐ हं हनुमते नमः', 'Om Ham Hanumate Namah'], ['ॐ गं गणपतये नमः', 'Om Gam Ganapataye Namah'], ['ॐ बृहस्पतये नमः', 'Om Brihaspataye Namah'], ['ॐ श्रीं महालक्ष्म्यै नमः', 'Om Shreem Mahalakshmyai Namah'], ['ॐ शं शनैश्चराय नमः', 'Om Sham Shanaishcharaya Namah']],
  houseDo: [['Spend 10 quiet minutes on yourself with a walk or prayer', '10 मिनट अपने लिए निकालें, टहलें या प्रार्थना करें'], ['Save a little money today', 'आज थोड़ा पैसा बचाएँ'], ['Call a brother, sister or old friend', 'भाई, बहन या किसी पुराने मित्र को फ़ोन करें'], ['Spend time at home with family', 'घर पर परिवार के साथ समय बिताएँ'], ['Read something spiritual or help a child study', 'कुछ आध्यात्मिक पढ़ें या किसी बच्चे को पढ़ाएँ'], ['Finish one pending task', 'एक अटका हुआ काम पूरा करें'], ['Plan something nice with your spouse', 'जीवनसाथी के साथ कुछ अच्छा प्लान करें'], ['Chant "Om Namah Shivaya" 11 times', '"ॐ नमः शिवाय" का 11 बार जाप करें'], ['Touch the feet of elders and take blessings', 'बड़ों के पैर छूकर आशीर्वाद लें'], ['Take the lead at work', 'काम में आगे बढ़कर पहल करें'], ['Meet friends or attend a gathering', 'मित्रों से मिलें या किसी कार्यक्रम में जाएँ'], ['Go to bed early and sleep well', 'जल्दी सोएँ और भरपूर नींद लें']],
  houseDont: [['Don\'t take small things personally', 'छोटी बातों को दिल पर न लें'], ['Avoid harsh words with family', 'परिवार से कड़वी बात न करें'], ['Don\'t delay important calls', 'ज़रूरी फ़ोन टालें नहीं'], ['Avoid property or vehicle decisions', 'ज़मीन या वाहन से जुड़े फ़ैसले न लें'], ['Avoid lottery, gambling or share-market risk', 'लॉटरी, जुआ या शेयर बाज़ार में जोखिम न लें'], ['Don\'t skip your medicines or meals', 'दवा या भोजन समय पर लेना न भूलें'], ['Avoid ego clashes with your partner', 'जीवनसाथी से अहंकार की टक्कर न करें'], ['Don\'t start anything new today', 'आज कोई नया काम शुरू न करें'], ['Don\'t argue with your father or teachers', 'पिता या गुरुजनों से बहस न करें'], ['Don\'t leave work half done', 'काम अधूरा न छोड़ें'], ['Don\'t ignore opportunities that come today', 'आज आने वाले मौक़ों को न छोड़ें'], ['Avoid lending money', 'किसी को उधार देने से बचें']],
  wdDo: [['Offer water to the rising Sun', 'उगते सूर्य को जल अर्पित करें'], ['Offer water or milk to the Shivling', 'शिवलिंग पर जल या दूध चढ़ाएँ'], ['Read the Hanuman Chalisa', 'हनुमान चालीसा का पाठ करें'], ['Feed green grass to a cow', 'गाय को हरा चारा खिलाएँ'], ['Donate chana dal or bananas', 'चने की दाल या केले का दान करें'], ['Offer white sweets to Goddess Lakshmi', 'माँ लक्ष्मी को सफ़ेद मिठाई का भोग लगाएँ'], ['Light a mustard-oil diya under a peepal tree', 'पीपल के नीचे सरसों के तेल का दीया जलाएँ']],
  wdDont: [['Don\'t disrespect your father or seniors', 'पिता या बड़ों का अनादर न करें'], ['Avoid quarrels with your mother', 'माता से कहासुनी न करें'], ['Avoid cutting hair or nails today', 'आज बाल या नाख़ून न काटें'], ['Don\'t lend or borrow money today', 'आज पैसा उधार न लें और न दें'], ['Avoid cutting or washing hair today', 'आज बाल न कटवाएँ और न धोएँ'], ['Don\'t hurt your spouse\'s feelings', 'जीवनसाथी का दिल न दुखाएँ'], ['Avoid buying iron items, oil or shoes today', 'आज लोहा, तेल या जूते न ख़रीदें']],
  genDo: [['Drink enough water and take a short walk', 'पर्याप्त पानी पिएँ और थोड़ा टहलें'], ['Pray or meditate for 10 minutes', '10 मिनट पूजा या ध्यान करें'], ['Call someone you haven\'t spoken to in a while', 'किसी ऐसे व्यक्ति को फ़ोन करें जिनसे बहुत दिनों से बात नहीं हुई'], ['Feed birds or animals', 'पक्षियों या पशुओं को भोजन दें'], ['Keep the entrance of your home clean', 'घर का प्रवेश द्वार साफ़ रखें']],
  genDont: [['Avoid making promises in anger', 'ग़ुस्से में कोई वादा न करें'], ['Don\'t skip your morning routine', 'सुबह की दिनचर्या न छोड़ें'], ['Stay away from gossip', 'चुगली और बेकार की बातों से दूर रहें'], ['Don\'t waste food', 'भोजन बर्बाद न करें']],
  badTaraDont: ['Avoid signing important papers today', 'आज ज़रूरी काग़ज़ों पर हस्ताक्षर न करें'],
  areas: [['Career', 'करियर'], ['Money', 'धन'], ['Health', 'सेहत'], ['Family', 'परिवार']],
  koota: { varna: ['Varna', 'वर्ण', 'Work and ego', 'कार्य और अहं'], vashya: ['Vashya', 'वश्य', 'Mutual attraction', 'आपसी आकर्षण'], tara: ['Tara', 'तारा', 'Health and luck', 'स्वास्थ्य और भाग्य'], yoni: ['Yoni', 'योनि', 'Nature and intimacy', 'स्वभाव और निकटता'], maitri: ['Graha Maitri', 'ग्रह मैत्री', 'Mental friendship', 'मानसिक मित्रता'], gana: ['Gana', 'गण', 'Temperament', 'स्वभाव'], bhakoot: ['Bhakoot', 'भकूट', 'Love, family, finances', 'प्रेम, परिवार, धन'], nadi: ['Nadi', 'नाड़ी', 'Health and children', 'स्वास्थ्य और संतान'] },
  special: { ekadashi: ['Ekadashi fast', 'एकादशी व्रत'], purnima: ['Purnima', 'पूर्णिमा'], amavasya: ['Amavasya', 'अमावस्या'], pradosh: ['Pradosh vrat', 'प्रदोष व्रत'], sankashti: ['Sankashti Chaturthi', 'संकष्टी चतुर्थी'] },
  relations: [['Self', 'स्वयं'], ['Spouse', 'जीवनसाथी'], ['Son', 'पुत्र'], ['Daughter', 'पुत्री'], ['Father', 'पिता'], ['Mother', 'माता'], ['Brother', 'भाई'], ['Sister', 'बहन'], ['Grandchild', 'पोता/पोती'], ['Friend', 'मित्र'], ['Other', 'अन्य']],
  cities: [['Agra', 'आगरा', 27.18, 78.01], ['Ahmedabad', 'अहमदाबाद', 23.02, 72.57], ['Ajmer', 'अजमेर', 26.45, 74.64], ['Amritsar', 'अमृतसर', 31.63, 74.87], ['Aurangabad', 'औरंगाबाद', 19.88, 75.34], ['Bengaluru', 'बेंगलुरु', 12.97, 77.59], ['Bhopal', 'भोपाल', 23.26, 77.41], ['Bhubaneswar', 'भुवनेश्वर', 20.30, 85.82], ['Chandigarh', 'चंडीगढ़', 30.73, 76.78], ['Chennai', 'चेन्नई', 13.08, 80.27], ['Coimbatore', 'कोयंबटूर', 11.02, 76.96], ['Dehradun', 'देहरादून', 30.32, 78.03], ['Delhi', 'दिल्ली', 28.61, 77.21], ['Dhanbad', 'धनबाद', 23.80, 86.43], ['Gorakhpur', 'गोरखपुर', 26.76, 83.37], ['Guwahati', 'गुवाहाटी', 26.14, 91.74], ['Gwalior', 'ग्वालियर', 26.22, 78.18], ['Haridwar', 'हरिद्वार', 29.95, 78.16], ['Hyderabad', 'हैदराबाद', 17.39, 78.49], ['Indore', 'इंदौर', 22.72, 75.86], ['Jabalpur', 'जबलपुर', 23.18, 79.99], ['Jaipur', 'जयपुर', 26.91, 75.79], ['Jalandhar', 'जालंधर', 31.33, 75.58], ['Jammu', 'जम्मू', 32.73, 74.86], ['Jamshedpur', 'जमशेदपुर', 22.80, 86.20], ['Jodhpur', 'जोधपुर', 26.24, 73.02], ['Kanpur', 'कानपुर', 26.45, 80.33], ['Kochi', 'कोच्चि', 9.93, 76.27], ['Kolkata', 'कोलकाता', 22.57, 88.36], ['Kota', 'कोटा', 25.21, 75.86], ['Lucknow', 'लखनऊ', 26.85, 80.95], ['Ludhiana', 'लुधियाना', 30.90, 75.86], ['Madurai', 'मदुरै', 9.93, 78.12], ['Mangaluru', 'मंगलुरु', 12.91, 74.86], ['Meerut', 'मेरठ', 28.98, 77.71], ['Mumbai', 'मुंबई', 19.08, 72.88], ['Mysuru', 'मैसूरु', 12.30, 76.64], ['Nagpur', 'नागपुर', 21.15, 79.09], ['Nashik', 'नासिक', 20.00, 73.79], ['Noida', 'नोएडा', 28.54, 77.39], ['Patna', 'पटना', 25.59, 85.14], ['Prayagraj', 'प्रयागराज', 25.44, 81.85], ['Pune', 'पुणे', 18.52, 73.86], ['Raipur', 'रायपुर', 21.25, 81.63], ['Rajkot', 'राजकोट', 22.30, 70.80], ['Ranchi', 'रांची', 23.34, 85.31], ['Shimla', 'शिमला', 31.10, 77.17], ['Surat', 'सूरत', 21.17, 72.83], ['Thiruvananthapuram', 'तिरुवनंतपुरम', 8.52, 76.94], ['Udaipur', 'उदयपुर', 24.59, 73.71], ['Ujjain', 'उज्जैन', 23.18, 75.78], ['Vadodara', 'वडोदरा', 22.31, 73.18], ['Varanasi', 'वाराणसी', 25.32, 82.97], ['Vijayawada', 'विजयवाड़ा', 16.51, 80.65], ['Visakhapatnam', 'विशाखापत्तनम', 17.69, 83.22]],

  palm: [
    { line: 'shape', q: ['What does your hand look like?', 'आपका हाथ कैसा दिखता है?'], hint: ['Compare the length of your palm with your fingers.', 'अपनी हथेली की लंबाई की तुलना उंगलियों से करें।'],
      opts: [
        [['Square palm, short fingers', 'चौकोर हथेली, छोटी उंगलियाँ'], ['Earth hand: practical, reliable and hardworking. You like a steady routine and are good with money.', 'पृथ्वी हाथ: व्यावहारिक, भरोसेमंद और मेहनती। आपको नियमित दिनचर्या पसंद है और आप पैसे के मामले में समझदार हैं।']],
        [['Square palm, long fingers', 'चौकोर हथेली, लंबी उंगलियाँ'], ['Air hand: intelligent, a good speaker and curious. Sometimes you think too much.', 'वायु हाथ: बुद्धिमान, अच्छे वक्ता और जिज्ञासु। कभी-कभी आप ज़रूरत से ज़्यादा सोचते हैं।']],
        [['Long palm, short fingers', 'लंबी हथेली, छोटी उंगलियाँ'], ['Fire hand: energetic, passionate and confident. Patience is your lesson.', 'अग्नि हाथ: ऊर्जावान, जोशीले और आत्मविश्वासी। धैर्य रखना आपकी सीख है।']],
        [['Long palm, long fingers', 'लंबी हथेली, लंबी उंगलियाँ'], ['Water hand: sensitive, creative and intuitive. You feel things deeply.', 'जल हाथ: संवेदनशील, रचनात्मक और अंतर्ज्ञानी। आप हर बात को गहराई से महसूस करते हैं।']]
      ] },
    { line: 'life', q: ['Look at your Life line', 'अपनी जीवन रेखा देखें'], hint: ['The curved line around the base of your thumb.', 'अंगूठे के चारों ओर घूमती हुई रेखा।'],
      opts: [
        [['Long and deep', 'लंबी और गहरी'], ['Good energy and stamina. Your life moves on a steady path.', 'अच्छी ऊर्जा और सहनशक्ति। आपका जीवन स्थिर राह पर चलता है।']],
        [['Short', 'छोटी'], ['A short life line does not mean a short life. It shows you are independent and self-driven.', 'छोटी जीवन रेखा का अर्थ छोटी उम्र नहीं है। यह दिखाती है कि आप आत्मनिर्भर हैं।']],
        [['Broken in between', 'बीच में टूटी हुई'], ['A big change in lifestyle or place at some point in life.', 'जीवन में किसी समय रहन-सहन या स्थान में बड़ा बदलाव।']],
        [['Very close to the thumb', 'अंगूठे के बहुत पास'], ['You can tire easily. Rest and routine are important for you.', 'आप जल्दी थक सकते हैं। आराम और नियमित दिनचर्या ज़रूरी है।']]
      ] },
    { line: 'heart', q: ['Look at your Heart line', 'अपनी हृदय रेखा देखें'], hint: ['The top line, just below your fingers.', 'सबसे ऊपर की रेखा, उंगलियों के ठीक नीचे।'],
      opts: [
        [['Ends between index and middle finger', 'तर्जनी और मध्यमा के बीच ख़त्म'], ['Balanced in love, caring and loyal.', 'प्रेम में संतुलित, देखभाल करने वाले और वफ़ादार।']],
        [['Ends under the index finger', 'तर्जनी के नीचे ख़त्म'], ['An idealist in love with high expectations from loved ones.', 'प्रेम में आदर्शवादी, अपनों से ऊँची उम्मीदें।']],
        [['Short and straight', 'छोटी और सीधी'], ['Practical about love. You show care through actions, not words.', 'प्रेम में व्यावहारिक, आप शब्दों से ज़्यादा काम से प्यार दिखाते हैं।']],
        [['Wavy or chained', 'लहरदार या ज़ंजीर जैसी'], ['Emotional ups and downs. Share your heart with someone you trust.', 'भावनाओं में उतार-चढ़ाव। किसी भरोसेमंद व्यक्ति से मन की बात कहें।']]
      ] },
    { line: 'head', q: ['Look at your Head line', 'अपनी मस्तिष्क रेखा देखें'], hint: ['The middle line across your palm.', 'हथेली के बीच से गुज़रने वाली रेखा।'],
      opts: [
        [['Long and straight', 'लंबी और सीधी'], ['A logical, clear thinker and a good planner.', 'तर्कशील, स्पष्ट सोच वाले और अच्छे योजनाकार।']],
        [['Sloping downwards', 'नीचे की ओर झुकी हुई'], ['Creative and imaginative. Art and ideas attract you.', 'रचनात्मक और कल्पनाशील। कला और नए विचार आपको आकर्षित करते हैं।']],
        [['Short', 'छोटी'], ['You make quick, practical decisions.', 'आप जल्दी और व्यावहारिक फ़ैसले लेते हैं।']],
        [['Starts apart from the life line', 'जीवन रेखा से अलग शुरू'], ['An independent thinker who loves adventure.', 'स्वतंत्र सोच वाले और रोमांच पसंद।']]
      ] },
    { line: 'fate', q: ['Look at your Fate line', 'अपनी भाग्य रेखा देखें'], hint: ['A vertical line running up the middle of the palm.', 'हथेली के बीच में ऊपर की ओर जाती खड़ी रेखा।'],
      opts: [
        [['Deep and clear', 'गहरी और साफ़'], ['A strong sense of direction. Your career is guided by destiny.', 'जीवन की दिशा स्पष्ट है। आपका करियर भाग्य से जुड़ा है।']],
        [['Starts from the middle of the palm', 'हथेली के बीच से शुरू'], ['Success comes after middle age, through your own efforts.', 'मध्य आयु के बाद अपनी मेहनत से सफलता मिलती है।']],
        [['Faint or broken', 'हल्की या टूटी हुई'], ['Several career changes. Being flexible is your strength.', 'करियर में कई बदलाव। लचीलापन आपकी ताक़त है।']],
        [['Not visible', 'दिखाई नहीं देती'], ['You make your own path. You have the freedom to choose.', 'आप अपना रास्ता ख़ुद बनाते हैं। चुनने की पूरी आज़ादी है।']]
      ] }
  ]
};

const T = {
  appName: ['Jyotish Saathi', 'ज्योतिष साथी'],
  tagline: ['Your daily guide from the stars', 'सितारों से आपका रोज़ का मार्गदर्शन'],
  chooseLang: ['Choose your language', 'अपनी भाषा चुनें'],
  start: ['Make my Kundli', 'मेरी कुंडली बनाएँ'],
  tabToday: ['Today', 'आज'], tabKundli: ['Kundli', 'कुंडली'], tabPalm: ['Palm', 'हस्तरेखा'], tabPanchang: ['Panchang', 'पंचांग'], tabFamily: ['Family', 'परिवार'],
  namaste: ['Namaste', 'नमस्ते'],
  yourRashi: ['Rashi', 'राशि'],
  todayFor: ['Today', 'आज'], tomorrow: ['Tomorrow', 'कल'],
  luckyColour: ['Lucky colour', 'शुभ रंग'], luckyNumber: ['Lucky number', 'शुभ अंक'], luckyDir: ['Lucky direction', 'शुभ दिशा'], avoidColour: ['Avoid colour', 'इस रंग से बचें'],
  avoidTravel: ['Avoid travel towards', 'इस दिशा में यात्रा टालें'],
  doToday: ['Do this today', 'आज यह करें'], dontToday: ['Don\'t do this today', 'आज यह न करें'],
  timings: ['Important timings', 'ज़रूरी समय'], rahuKaal: ['Rahu Kaal (avoid new work)', 'राहु काल (नया काम न करें)'], abhijit: ['Abhijit Muhurat (best time)', 'अभिजीत मुहूर्त (सबसे शुभ समय)'],
  sunrise: ['Sunrise', 'सूर्योदय'], sunset: ['Sunset', 'सूर्यास्त'],
  mantraDay: ['Mantra of the day', 'आज का मंत्र'], chant11: ['Chant 11 or 108 times', '11 या 108 बार जाप करें'],
  listen: ['Listen', 'सुनें'], stop: ['Stop', 'रोकें'], shareWA: ['Share on WhatsApp', 'WhatsApp पर भेजें'],
  lifeAreas: ['Your day in detail', 'आपका दिन विस्तार से'],
  moonTransit: ['Moon today', 'आज चंद्रमा'], inHouse: ['house from your Rashi', 'भाव में (आपकी राशि से)'],
  tara: ['Tara', 'तारा'],
  lagna: ['Lagna', 'लग्न'], rashi: ['Rashi', 'राशि'], nakshatra: ['Nakshatra', 'नक्षत्र'], pada: ['Pada', 'चरण'],
  birthChart: ['Birth chart', 'जन्म कुंडली'], lagnaChart: ['Lagna chart', 'लग्न कुंडली'], moonChart: ['Chandra chart', 'चंद्र कुंडली'],
  planets: ['Planet positions', 'ग्रह स्थिति'], planet: ['Planet', 'ग्रह'], degree: ['Degree', 'अंश'], house: ['House', 'भाव'],
  nature: ['Your nature', 'आपका स्वभाव'], mind: ['Your mind', 'आपका मन'],
  manglik: ['Manglik check', 'मांगलिक दोष'], isManglik: ['Manglik', 'मांगलिक'], notManglik: ['Not Manglik', 'मांगलिक नहीं'],
  mFromLagna: ['From Lagna', 'लग्न से'], mFromMoon: ['From Moon', 'चंद्र से'], yes: ['Yes', 'हाँ'], no: ['No', 'नहीं'],
  manglikNote: ['Mars in 1st, 2nd, 4th, 7th, 8th or 12th house. Matching with another Manglik chart usually cancels it.', 'मंगल 1, 2, 4, 7, 8 या 12वें भाव में। मांगलिक से मिलान होने पर दोष सामान्यतः शांत हो जाता है।'],
  dasha: ['Vimshottari Dasha', 'विंशोत्तरी दशा'], curMaha: ['Current Mahadasha', 'वर्तमान महादशा'], curAntar: ['Antardasha', 'अंतर्दशा'], till: ['till', 'तक'], allDasha: ['All Mahadashas', 'सभी महादशाएँ'],
  matchBtn: ['Kundli Milan (Marriage match)', 'कुंडली मिलान (विवाह)'],
  match: ['Kundli Milan', 'कुंडली मिलान'], boy: ['Boy', 'लड़का'], girl: ['Girl', 'लड़की'], checkMatch: ['Check match', 'मिलान देखें'],
  needTwo: ['Add the boy and girl in Family first. Then come back here.', 'पहले परिवार में लड़के और लड़की की जानकारी जोड़ें, फिर यहाँ आएँ।'],
  gunas: ['Gunas matched', 'गुण मिले'], outOf36: ['out of 36', '36 में से'],
  v1: ['Weak match. Please consult an experienced astrologer.', 'मिलान कमज़ोर है। किसी अनुभवी ज्योतिषी से सलाह लें।'], v2: ['Average match. Acceptable with care.', 'सामान्य मिलान, विचार करके आगे बढ़ें।'], v3: ['Good match.', 'अच्छा मिलान।'], v4: ['Excellent match!', 'उत्तम मिलान!'],
  nadiDosh: ['Nadi Dosh present', 'नाड़ी दोष है'], bhakootDosh: ['Bhakoot Dosh present', 'भकूट दोष है'], back: ['Back', 'वापस'],
  palmTitle: ['Palm reading', 'हस्तरेखा'], palmIntro: ['Hold your right palm open in good light. Answer 5 simple questions by looking at your hand.', 'अपनी दाहिनी हथेली अच्छी रोशनी में खोलें। हाथ देखकर 5 आसान सवालों के जवाब दें।'],
  addPhoto: ['Add a photo of your palm (optional)', 'हथेली की फ़ोटो जोड़ें (वैकल्पिक)'], startPalm: ['Start palm reading', 'हस्तरेखा शुरू करें'],
  step: ['Step', 'चरण'], of: ['of', 'में से'], palmResult: ['Your palm reading', 'आपकी हस्तरेखा'], again: ['Read again', 'फिर से पढ़ें'],
  aiPalm: ['Automatic AI palm scan is coming with Premium.', 'अपने-आप AI हस्तरेखा स्कैन प्रीमियम में जल्द आ रहा है।'],
  panchang: ['Panchang', 'पंचांग'], tithi: ['Tithi', 'तिथि'], yoga: ['Yoga', 'योग'], karana: ['Karana', 'करण'], vaar: ['Day', 'वार'], paksha: ['Paksha', 'पक्ष'],
  shukla: ['Shukla Paksha', 'शुक्ल पक्ष'], krishna: ['Krishna Paksha', 'कृष्ण पक्ष'], moonSign: ['Moon sign', 'चंद्र राशि'], gulika: ['Gulika Kaal', 'गुलिक काल'], yama: ['Yamaganda', 'यमगंड'],
  upcoming: ['Upcoming vrat & special days', 'आने वाले व्रत और विशेष दिन'], city: ['City', 'शहर'], prev: ['Previous day', 'पिछला दिन'], next: ['Next day', 'अगला दिन'], todayBtn: ['Today', 'आज'],
  family: ['Family members', 'परिवार के सदस्य'], addMember: ['Add family member', 'सदस्य जोड़ें'], active: ['Showing', 'चालू'], show: ['Show', 'देखें'], edit: ['Edit', 'बदलें'], del: ['Delete', 'हटाएँ'],
  settings: ['Settings', 'सेटिंग्स'], language: ['Language', 'भाषा'], textSize: ['Text size', 'अक्षरों का आकार'],
  premium: ['Premium', 'प्रीमियम'], comingSoon: ['Coming soon', 'जल्द आ रहा है'], notifyMe: ['Notify me', 'मुझे बताएँ'], notified: ['We will let you know', 'हम आपको सूचित करेंगे'],
  premiumList: [['Detailed yearly prediction report', 'विस्तृत वार्षिक भविष्यफल रिपोर्ट'], ['Talk to an expert astrologer', 'विशेषज्ञ ज्योतिषी से बात करें'], ['Automatic AI palm scan', 'अपने-आप AI हस्तरेखा स्कैन'], ['No ads, unlimited family Kundlis', 'कोई विज्ञापन नहीं, असीमित पारिवारिक कुंडलियाँ']],
  formTitle: ['Birth details', 'जन्म विवरण'], name: ['Full name', 'पूरा नाम'], gender: ['Gender', 'लिंग'], male: ['Male', 'पुरुष'], female: ['Female', 'स्त्री'], relation: ['Relation', 'संबंध'],
  dob: ['Date of birth', 'जन्म तिथि'], tob: ['Time of birth', 'जन्म समय'], noTime: ['I don\'t know my exact birth time', 'मुझे सही जन्म समय नहीं पता'],
  noTimeNote: ['We will use 12:00 noon. Lagna may not be exact.', 'हम दोपहर 12:00 मानेंगे। लग्न सटीक न हो सकता है।'],
  pob: ['Place of birth', 'जन्म स्थान'], otherPlace: ['Other place (enter manually)', 'अन्य स्थान (ख़ुद भरें)'], placeName: ['Place name', 'स्थान का नाम'], lat: ['Latitude', 'अक्षांश'], lon: ['Longitude', 'देशांतर'], tz: ['Time zone (hours from GMT)', 'समय क्षेत्र (GMT से घंटे)'],
  save: ['Save and show Kundli', 'सहेजें और कुंडली देखें'], cancel: ['Cancel', 'रद्द करें'], required: ['Please fill name, date of birth and place.', 'कृपया नाम, जन्म तिथि और स्थान भरें।'],
  confirmDel: ['Delete this person?', 'क्या इस सदस्य को हटाना है?'], saved: ['Saved', 'सहेज लिया'],
  about: ['About the calculations', 'गणना के बारे में'], aboutText: ['Sidereal zodiac with Lahiri ayanamsa, whole-sign houses, Vimshottari dasha and Ashtakoota Guna Milan. All calculations run on your phone.', 'लाहिड़ी अयनांश के साथ निरयण राशिचक्र, संपूर्ण-राशि भाव, विंशोत्तरी दशा और अष्टकूट गुण मिलान। सारी गणना आपके फ़ोन पर ही होती है।'],
  disclaimer: ['For spiritual guidance only. Not a substitute for medical, legal or financial advice.', 'केवल आध्यात्मिक मार्गदर्शन के लिए। यह चिकित्सा, क़ानूनी या आर्थिक सलाह का विकल्प नहीं है।'],
  storageNote: ['Details are saved on this device only.', 'जानकारी केवल इसी डिवाइस पर सहेजी जाती है।'],
  born: ['Born', 'जन्म'], at: ['at', 'समय'], in: ['in', 'स्थान'], score: ['Score', 'अंक'], select: ['Select', 'चुनें'], ok: ['OK', 'ठीक है'],
  houseN: ['House', 'भाव'], retro: ['R = retrograde', 'व = वक्री']
};

C.life = {
  areas: [
    { k: 'career', h: [10], kar: 'Sun', icon: '💼', t: ['Career & Work', 'करियर और काम'] },
    { k: 'money', h: [2, 11], kar: 'Jupiter', icon: '💰', t: ['Money & Wealth', 'धन और संपत्ति'] },
    { k: 'love', h: [7], kar: 'Venus', icon: '❤️', t: ['Love & Marriage', 'प्रेम और विवाह'] },
    { k: 'health', h: [1], kar: null, icon: '🌿', t: ['Health', 'स्वास्थ्य'] },
    { k: 'family', h: [4], kar: 'Moon', icon: '🏠', t: ['Family, Home & Property', 'परिवार, घर और संपत्ति'] },
    { k: 'children', h: [5], kar: 'Jupiter', icon: '🎓', t: ['Education & Children', 'शिक्षा और संतान'] }
  ],
  level: {
    career: { s: ['Your chart shows strong career potential. Hard work brings recognition, respect and a good position.', 'आपकी कुंडली में करियर के प्रबल योग हैं। मेहनत से मान-सम्मान और अच्छा पद मिलता है।'], a: ['Steady career growth. Success comes step by step through consistent effort.', 'करियर में धीरे-धीरे स्थिर प्रगति। लगातार प्रयास से सफलता क़दम-दर-क़दम मिलती है।'], w: ['Work life can see ups and downs. Patience and learning new skills bring stability with time.', 'काम में उतार-चढ़ाव आ सकते हैं। धैर्य और नई चीज़ें सीखने से समय के साथ स्थिरता आती है।'] },
    money: { s: ['Good wealth yoga in your chart. Savings grow and income increases with time.', 'आपकी कुंडली में अच्छे धन योग हैं। बचत बढ़ती है और समय के साथ आमदनी में वृद्धि होती है।'], a: ['Money comes and goes in balance. Disciplined saving builds real security.', 'पैसा आता-जाता संतुलन में रहता है। नियमित बचत से पक्की सुरक्षा बनती है।'], w: ['Expenses can run high. Avoid lending and risky investments, and save regularly.', 'ख़र्च ज़्यादा हो सकते हैं। उधार देने और जोखिम वाले निवेश से बचें, नियमित बचत करें।'] },
    love: { s: ['Marriage and relationships are blessed. You get a loving and supportive partner.', 'विवाह और रिश्तों में शुभता है। आपको प्रेमपूर्ण और साथ देने वाला जीवनसाथी मिलता है।'], a: ['A stable married life with normal ups and downs. Open conversation keeps it strong.', 'सामान्य उतार-चढ़ाव के साथ स्थिर दांपत्य जीवन। खुलकर बात करने से रिश्ता मज़बूत रहता है।'], w: ['Relationships need extra patience and understanding. Avoid ego clashes and harsh words.', 'रिश्तों में अधिक धैर्य और समझ की ज़रूरत है। अहंकार और कड़वे शब्दों से बचें।'] },
    health: { s: ['Good immunity and strong recovery power.', 'अच्छी रोग-प्रतिरोधक क्षमता और जल्दी ठीक होने की शक्ति।'], a: ['Generally good health, as long as you keep a regular routine.', 'सामान्यतः अच्छा स्वास्थ्य, बस दिनचर्या नियमित रखें।'], w: ['Health needs regular attention. Routine check-ups and a disciplined lifestyle help a lot.', 'स्वास्थ्य पर नियमित ध्यान दें। समय-समय पर जाँच और अनुशासित जीवनशैली बहुत मदद करेगी।'] },
    family: { s: ['A peaceful home, happiness from your mother, and comforts like property and vehicles.', 'घर में शांति, माता से सुख, और ज़मीन-जायदाद व वाहन का सुख।'], a: ['A normal, warm family life. Your efforts keep the home happy.', 'सामान्य और स्नेहपूर्ण पारिवारिक जीवन। आपके प्रयासों से घर में ख़ुशी रहती है।'], w: ['Some restlessness at home, or distance from family at times. Spend quality time together.', 'घर में कभी-कभी बेचैनी या परिवार से दूरी हो सकती है। साथ में अच्छा समय बिताएँ।'] },
    children: { s: ['A sharp mind, good education and happiness from children.', 'तेज़ बुद्धि, अच्छी शिक्षा और संतान से सुख।'], a: ['Learning comes through effort. Children bring joy along with some responsibilities.', 'मेहनत से ज्ञान मिलता है। संतान से ख़ुशी के साथ कुछ ज़िम्मेदारियाँ भी आती हैं।'], w: ['Studies or matters related to children may need extra care and patience.', 'पढ़ाई या संतान से जुड़े मामलों में अधिक ध्यान और धैर्य की ज़रूरत हो सकती है।'] }
  },
  lordText: {
    career: { lbl: ['Fields that suit you', 'आपके लिए उपयुक्त क्षेत्र'],
      Sun: ['Government jobs, administration, management, medicine', 'सरकारी नौकरी, प्रशासन, प्रबंधन, चिकित्सा'], Moon: ['Hospitality, nursing, food, travel, public dealing', 'होटल, नर्सिंग, खान-पान, यात्रा, जनसंपर्क'], Mars: ['Engineering, police or defence, real estate, sports, surgery', 'इंजीनियरिंग, पुलिस या सेना, रियल एस्टेट, खेल, सर्जरी'], Mercury: ['Business, trading, accounts, writing, IT, teaching', 'व्यापार, लेखा, लेखन, IT, शिक्षण'], Jupiter: ['Teaching, law, finance, banking, religion, counselling', 'शिक्षण, क़ानून, वित्त, बैंकिंग, धर्म, परामर्श'], Venus: ['Arts, fashion, beauty, media, hotels, luxury goods', 'कला, फ़ैशन, सौंदर्य, मीडिया, होटल, विलासिता की वस्तुएँ'], Saturn: ['Industry, oil, mining, law, social service, long-term service', 'उद्योग, तेल, खनन, क़ानून, समाज सेवा, लंबी सेवा वाली नौकरी'] },
    money: { lbl: ['Main source of gains', 'लाभ का मुख्य स्रोत'],
      Sun: ['Government, your father, or a position of authority', 'सरकार, पिता या किसी ऊँचे पद से'], Moon: ['Public dealing, travel, food or liquids', 'जनसंपर्क, यात्रा, खान-पान या तरल पदार्थों से'], Mars: ['Property, land and technical skills', 'ज़मीन-जायदाद और तकनीकी कौशल से'], Mercury: ['Business, trading and your own intelligence', 'व्यापार और अपनी बुद्धि से'], Jupiter: ['Wisdom, teaching, advice and blessings of elders', 'ज्ञान, शिक्षण, सलाह और बड़ों के आशीर्वाद से'], Venus: ['Art, luxury, partnerships and your spouse', 'कला, विलासिता, साझेदारी और जीवनसाथी से'], Saturn: ['Slow but steady hard work and long-term savings', 'धीमी पर पक्की मेहनत और लंबी बचत से'] },
    love: { lbl: ['Your partner\'s nature', 'जीवनसाथी का स्वभाव'],
      Sun: ['Proud, self-respecting, from a respected family', 'स्वाभिमानी, आत्मसम्मान वाले, प्रतिष्ठित परिवार से'], Moon: ['Emotional, caring and homely', 'भावुक, देखभाल करने वाले और घरेलू'], Mars: ['Energetic and bold, sometimes short-tempered', 'ऊर्जावान और साहसी, कभी-कभी जल्दी ग़ुस्सा'], Mercury: ['Smart, talkative and youthful', 'समझदार, बातूनी और युवा स्वभाव'], Jupiter: ['Wise, religious and respected', 'ज्ञानी, धार्मिक और सम्मानित'], Venus: ['Attractive, romantic and artistic', 'आकर्षक, रोमांटिक और कलाप्रेमी'], Saturn: ['Mature, responsible and serious, possibly older', 'परिपक्व, ज़िम्मेदार और गंभीर, संभवतः उम्र में बड़े'] },
    children: { lbl: ['Subjects and talents', 'विषय और प्रतिभा'],
      Sun: ['Science, leadership, government exams', 'विज्ञान, नेतृत्व, सरकारी परीक्षाएँ'], Moon: ['Arts, psychology, nursing', 'कला, मनोविज्ञान, नर्सिंग'], Mars: ['Engineering, sports, technical subjects', 'इंजीनियरिंग, खेल, तकनीकी विषय'], Mercury: ['Commerce, maths, languages, computers', 'कॉमर्स, गणित, भाषाएँ, कंप्यूटर'], Jupiter: ['Law, finance, philosophy, teaching', 'क़ानून, वित्त, दर्शन, शिक्षण'], Venus: ['Music, design, arts, media', 'संगीत, डिज़ाइन, कला, मीडिया'], Saturn: ['Research, history, law, with steady patience', 'शोध, इतिहास, क़ानून, धैर्य के साथ'] }
  },
  element: [
    ['Fire sign Lagna: strong energy. Pay attention to body heat, acidity and blood pressure. Stay calm and drink plenty of water.', 'अग्नि तत्व लग्न: भरपूर ऊर्जा। शरीर की गर्मी, एसिडिटी और ब्लड प्रेशर पर ध्यान दें। शांत रहें और ख़ूब पानी पिएँ।'],
    ['Earth sign Lagna: good stamina. Pay attention to digestion, weight and joints. A daily walk helps a lot.', 'पृथ्वी तत्व लग्न: अच्छी सहनशक्ति। पाचन, वज़न और जोड़ों पर ध्यान दें। रोज़ टहलना बहुत लाभ देगा।'],
    ['Air sign Lagna: an active mind. Pay attention to sleep, nerves, gas and joint pain. Keep a fixed daily routine.', 'वायु तत्व लग्न: सक्रिय मन। नींद, नसों, गैस और जोड़ों के दर्द पर ध्यान दें। दिनचर्या तय रखें।'],
    ['Water sign Lagna: a sensitive body. Pay attention to cold, cough and water retention. Avoid cold food at night.', 'जल तत्व लग्न: संवेदनशील शरीर। सर्दी, खाँसी और शरीर में पानी रुकने पर ध्यान दें। रात में ठंडी चीज़ें न खाएँ।']
  ],
  inHouse: { good: ['{p} here brings blessings to this area.', '{p} यहाँ होने से इस क्षेत्र में शुभता आती है।'], push: ['{p} here gives you the drive to succeed.', '{p} यहाँ होने से सफलता के लिए जोश मिलता है।'], slow: ['{p} here asks for patience in this area.', '{p} यहाँ होने से इस क्षेत्र में धैर्य रखना ज़रूरी है।'] },
  dignity: { ex: ['exalted', 'उच्च का'], own: ['in its own sign', 'स्वराशि में'], deb: ['debilitated', 'नीच का'] },
  bestPeriod: ['Best period', 'शुभ समय'], dashaOf: ['during {p} period', '{p} की दशा में'], runningNow: ['running now', 'अभी चल रहा है'],
  luckyTitle: ['Lucky for you', 'आपके लिए शुभ'], gem: ['Lucky gemstone', 'शुभ रत्न'], day: ['Lucky day', 'शुभ दिन'], colour: ['Lucky colour', 'शुभ रंग'], number: ['Lucky number', 'शुभ अंक'], deity: ['Ishta Devta', 'इष्ट देव'],
  gemNote: ['Wear a gemstone only after consulting an astrologer.', 'रत्न किसी ज्योतिषी से सलाह लेकर ही पहनें।'],
  gems: { Sun: ['Ruby', 'माणिक्य'], Moon: ['Pearl', 'मोती'], Mars: ['Red Coral', 'मूंगा'], Mercury: ['Emerald', 'पन्ना'], Jupiter: ['Yellow Sapphire', 'पुखराज'], Venus: ['Diamond or Opal', 'हीरा या ओपल'], Saturn: ['Blue Sapphire', 'नीलम'] },
  deities: { Sun: ['Surya Dev', 'सूर्य देव'], Moon: ['Lord Shiva', 'भगवान शिव'], Mars: ['Hanuman Ji', 'हनुमान जी'], Mercury: ['Lord Ganesha', 'भगवान गणेश'], Jupiter: ['Lord Vishnu', 'भगवान विष्णु'], Venus: ['Maa Lakshmi', 'माँ लक्ष्मी'], Saturn: ['Shani Dev and Hanuman Ji', 'शनि देव और हनुमान जी'] },
  num: { Sun: 1, Moon: 2, Jupiter: 3, Mercury: 5, Venus: 6, Saturn: 8, Mars: 9 },
  yogaTitle: ['Special yogas in your Kundli', 'आपकी कुंडली के विशेष योग'], noYoga: ['No major classical yoga found. Your results come mainly through your own efforts and dasha periods.', 'कोई बड़ा शास्त्रीय योग नहीं मिला। आपके फल मुख्य रूप से आपकी मेहनत और दशाओं से आते हैं।'],
  yogas: {
    gaja: ['Gajakesari Yoga', 'गजकेसरी योग', 'Jupiter in a kendra from the Moon: wisdom, fame and respect in society.', 'चंद्र से केंद्र में गुरु: ज्ञान, यश और समाज में सम्मान।'],
    budh: ['Budhaditya Yoga', 'बुधादित्य योग', 'Sun and Mercury together: sharp intelligence and good communication.', 'सूर्य और बुध साथ में: तेज़ बुद्धि और अच्छी वाणी।'],
    chandramangal: ['Chandra-Mangal Yoga', 'चंद्र-मंगल योग', 'Moon and Mars together: ability to earn money through your own effort.', 'चंद्र और मंगल साथ में: अपनी मेहनत से धन कमाने की क्षमता।'],
    raj: ['Raj Yoga', 'राज योग', 'Lords of a kendra and a trikona join: rise in status, authority and success.', 'केंद्र और त्रिकोण के स्वामी साथ: पद, अधिकार और सफलता में वृद्धि।'],
    dhana: ['Dhana Yoga', 'धन योग', 'Wealth houses are connected: good potential for building wealth.', 'धन भावों का आपस में संबंध: धन संचय की अच्छी संभावना।'],
    Mars: ['Ruchaka Yoga', 'रुचक योग', 'Strong Mars in a kendra: courage, leadership and property.', 'केंद्र में बलवान मंगल: साहस, नेतृत्व और संपत्ति।'],
    Mercury: ['Bhadra Yoga', 'भद्र योग', 'Strong Mercury in a kendra: intelligence, business skill and good speech.', 'केंद्र में बलवान बुध: बुद्धि, व्यापार कौशल और मधुर वाणी।'],
    Jupiter: ['Hamsa Yoga', 'हंस योग', 'Strong Jupiter in a kendra: wisdom, spirituality and respect.', 'केंद्र में बलवान गुरु: ज्ञान, आध्यात्मिकता और सम्मान।'],
    Venus: ['Malavya Yoga', 'मालव्य योग', 'Strong Venus in a kendra: comforts, beauty, vehicles and a happy married life.', 'केंद्र में बलवान शुक्र: सुख-सुविधा, सौंदर्य, वाहन और सुखी दांपत्य।'],
    Saturn: ['Shasha Yoga', 'शश योग', 'Strong Saturn in a kendra: discipline, authority and lasting success.', 'केंद्र में बलवान शनि: अनुशासन, अधिकार और स्थायी सफलता।']
  },
  remedyTitle: ['Simple remedies for you', 'आपके लिए सरल उपाय'], remedyFor: ['To strengthen {p}', '{p} को मज़बूत करने के लिए'],
  remedies: {
    Sun: ['Offer water to the rising Sun every morning and respect your father.', 'रोज़ सुबह उगते सूर्य को जल दें और पिता का सम्मान करें।'], Moon: ['Offer milk or water to the Shivling on Mondays and respect your mother.', 'सोमवार को शिवलिंग पर दूध या जल चढ़ाएँ और माता का सम्मान करें।'], Mars: ['Read the Hanuman Chalisa on Tuesdays and avoid anger.', 'मंगलवार को हनुमान चालीसा पढ़ें और ग़ुस्से से बचें।'], Mercury: ['Feed green grass to a cow on Wednesdays and worship Lord Ganesha.', 'बुधवार को गाय को हरा चारा खिलाएँ और गणेश जी की पूजा करें।'], Jupiter: ['Respect teachers and elders, and donate yellow items on Thursdays.', 'गुरुजनों और बड़ों का सम्मान करें, गुरुवार को पीली वस्तुओं का दान करें।'], Venus: ['Respect women, keep clean, and offer white sweets to Maa Lakshmi on Fridays.', 'स्त्रियों का सम्मान करें, स्वच्छ रहें, शुक्रवार को माँ लक्ष्मी को सफ़ेद मिठाई चढ़ाएँ।'], Saturn: ['Help workers and the needy, and light a mustard-oil lamp on Saturdays.', 'श्रमिकों और ज़रूरतमंदों की मदद करें, शनिवार को सरसों के तेल का दीया जलाएँ।'], Rahu: ['Chant a Durga mantra and avoid shortcuts or dishonest deals.', 'दुर्गा मंत्र का जाप करें और ग़लत तरीक़ों या छल से बचें।'], Ketu: ['Worship Lord Ganesha and feed street dogs.', 'गणेश जी की पूजा करें और गली के कुत्तों को भोजन दें।']
  },
  lifeTitle: ['Your life predictions', 'आपका जीवन भविष्यफल'], lifeSub: ['Based on the houses, their lords and planets in your Kundli', 'आपकी कुंडली के भावों, उनके स्वामियों और ग्रहों के आधार पर']
};

C.prem = {
  title: ['Jyotish Saathi Premium', 'ज्योतिष साथी प्रीमियम'],
  sub: ['Deeper guidance for you and your family', 'आपके और आपके परिवार के लिए गहरा मार्गदर्शन'],
  nowTitle: ['Included in Premium', 'प्रीमियम में शामिल'],
  aiTitle: ['AI features – coming soon', 'AI सुविधाएँ – जल्द आ रही हैं'],
  aiSub: ['These will unlock automatically for Premium members as they launch.', 'ये सुविधाएँ शुरू होते ही प्रीमियम सदस्यों के लिए अपने-आप खुल जाएँगी।'],
  now: [
    ['📄', ['Download your Kundli (PDF)', 'कुंडली डाउनलोड करें (PDF)'], ['A complete, beautiful report to save, print or share on WhatsApp', 'सहेजने, प्रिंट करने या WhatsApp पर भेजने के लिए पूरी सुंदर रिपोर्ट']],
    ['🕉️', ['Spiritual guidance', 'आध्यात्मिक मार्गदर्शन'], ['Your soul planet, Nakshatra deity, beej mantras, fasting day and daan', 'आत्मकारक ग्रह, नक्षत्र देवता, बीज मंत्र, व्रत का दिन और दान']],
    ['🪐', ['Shani Sade Sati report', 'शनि साढ़े साती रिपोर्ट'], ['Exact Sade Sati and Dhaiya periods with remedies', 'साढ़े साती और ढैय्या की सटीक अवधि, उपायों के साथ']],
    ['📆', ['Year-ahead forecast', 'आने वाले साल का भविष्यफल'], ['Month-by-month Guru and Shani transit effects', 'महीने-दर-महीने गुरु और शनि गोचर का प्रभाव']]
  ],
  ai: [
    ['🤖', ['AI Jyotishi', 'AI ज्योतिषी'], ['Ask anything and get a detailed answer from your chart', 'कुछ भी पूछें, अपनी कुंडली से विस्तृत जवाब पाएँ']],
    ['✋', ['AI Palm Scan', 'AI हस्तरेखा स्कैन'], ['Reads your palm lines automatically from a photo', 'फ़ोटो से अपने-आप आपकी हस्तरेखा पढ़ेगा']],
    ['📜', ['AI Life Report', 'AI जीवन रिपोर्ट'], ['A personal 20-page report written for you', 'आपके लिए लिखी गई 20 पेज की निजी रिपोर्ट']],
    ['🗓️', ['AI Muhurat Finder', 'AI मुहूर्त खोजक'], ['Best dates for marriage, griha pravesh, vehicle and more', 'विवाह, गृह प्रवेश, वाहन आदि के लिए शुभ तिथियाँ']],
    ['🎙️', ['Daily voice guidance', 'रोज़ का आवाज़ संदेश'], ['A personal morning message in your language', 'आपकी भाषा में रोज़ सुबह निजी संदेश']]
  ],
  monthly: ['Monthly', 'मासिक'], yearly: ['Yearly', 'वार्षिक'], best: ['Best value', 'सबसे फ़ायदेमंद'], priceSoon: ['Price coming soon', 'मूल्य जल्द'],
  unlock: ['Unlock Premium', 'प्रीमियम लें'], locked: ['Premium', 'प्रीमियम'], soon: ['Coming soon', 'जल्द'], active: ['Premium active', 'प्रीमियम चालू'],
  payNote: ['Payments are not live yet. Tap below and we will tell you as soon as Premium launches.', 'भुगतान अभी शुरू नहीं हुआ है। नीचे दबाएँ, प्रीमियम शुरू होते ही हम आपको बताएँगे।'],
  demoOn: ['Premium preview turned ON (for testing)', 'प्रीमियम प्रीव्यू चालू (टेस्टिंग के लिए)'], demoOff: ['Premium preview turned OFF', 'प्रीमियम प्रीव्यू बंद'],
  demoBadge: ['Preview mode', 'प्रीव्यू मोड'],
  dl: ['Download Kundli PDF', 'कुंडली PDF डाउनलोड करें'], making: ['Preparing your Kundli PDF…', 'आपकी कुंडली PDF तैयार हो रही है…'], dlDone: ['PDF ready', 'PDF तैयार है'], dlFail: ['Could not create the PDF here. Please try in the app.', 'यहाँ PDF नहीं बन सका। कृपया ऐप में कोशिश करें।'],
  premiumSection: ['Premium insights', 'प्रीमियम जानकारी'],
  spiritTitle: ['Spiritual guidance', 'आध्यात्मिक मार्गदर्शन'],
  atma: ['Your soul planet (Atmakaraka)', 'आपका आत्मकारक ग्रह'],
  nakDeity: ['Your Nakshatra deity', 'आपके नक्षत्र देवता'],
  beejLagna: ['Beej mantra for strength (Lagna lord)', 'शक्ति के लिए बीज मंत्र (लग्नेश)'],
  beejDasha: ['Beej mantra for your current Mahadasha', 'वर्तमान महादशा का बीज मंत्र'],
  chant108: ['Chant 108 times, ideally in the morning', '108 बार जाप करें, सुबह के समय सबसे अच्छा'],
  fastDay: ['Your fasting day', 'आपके व्रत का दिन'], daan: ['Daan (charity) for you', 'आपके लिए दान'], meditate: ['Meditation for you', 'आपके लिए ध्यान'],
  sadeTitle: ['Shani Sade Sati & Dhaiya', 'शनि साढ़े साती और ढैय्या'],
  sadeNow: ['Sade Sati is running now', 'अभी साढ़े साती चल रही है'], dhaiyaNow: ['Shani Dhaiya is running now', 'अभी शनि ढैय्या चल रही है'], sadeFree: ['No Sade Sati or Dhaiya right now', 'अभी साढ़े साती या ढैय्या नहीं है'],
  sadeNext: ['Next Sade Sati', 'अगली साढ़े साती'], sadeCur: ['Current period', 'वर्तमान अवधि'], dhaiyaNext: ['Next Dhaiya', 'अगली ढैय्या'],
  sadeTip: ['Sade Sati is a time of hard work, patience and inner growth, not only trouble. Serve others, stay disciplined, and offer mustard oil to Shani Dev on Saturdays.', 'साढ़े साती केवल कष्ट नहीं, मेहनत, धैर्य और आत्म-विकास का समय है। सेवा करें, अनुशासन रखें और शनिवार को शनि देव को सरसों का तेल चढ़ाएँ।'],
  yearTitle: ['Your next 12 months', 'आपके अगले 12 महीने'], guru: ['Guru (Jupiter)', 'गुरु'], shani: ['Shani (Saturn)', 'शनि'],
  transGood: ['{p} in your {n} house: growth in {t}.', '{p} आपके {n} भाव में: {t} में वृद्धि।'],
  transSlow: ['{p} in your {n} house: patience needed in {t}.', '{p} आपके {n} भाव में: {t} में धैर्य रखें।'],
  themes: [['self, health and confidence', 'स्वयं, स्वास्थ्य और आत्मविश्वास'], ['money and family', 'धन और परिवार'], ['courage and siblings', 'साहस और भाई-बहन'], ['home, mother and property', 'घर, माता और संपत्ति'], ['children and studies', 'संतान और पढ़ाई'], ['work and health', 'काम और सेहत'], ['marriage and partnerships', 'विवाह और साझेदारी'], ['sudden changes', 'अचानक बदलाव'], ['luck and religion', 'भाग्य और धर्म'], ['career and status', 'करियर और पद'], ['income and gains', 'आय और लाभ'], ['expenses and travel', 'ख़र्च और यात्रा']],
  ord: [['1st', 'पहले'], ['2nd', 'दूसरे'], ['3rd', 'तीसरे'], ['4th', 'चौथे'], ['5th', 'पाँचवें'], ['6th', 'छठे'], ['7th', 'सातवें'], ['8th', 'आठवें'], ['9th', 'नौवें'], ['10th', 'दसवें'], ['11th', 'ग्यारहवें'], ['12th', 'बारहवें']],
  from: ['from', 'से'],
  atmaText: {
    Sun: ['Your soul seeks dignity and leadership. Life lesson: humility, and letting go of ego.', 'आपकी आत्मा सम्मान और नेतृत्व चाहती है। जीवन की सीख: विनम्रता और अहंकार का त्याग।'],
    Moon: ['Your soul seeks love and emotional peace. Life lesson: inner calm and caring for others.', 'आपकी आत्मा प्रेम और मन की शांति चाहती है। जीवन की सीख: भीतर की शांति और दूसरों की देखभाल।'],
    Mars: ['Your soul seeks courage and action. Life lesson: patience and control over anger.', 'आपकी आत्मा साहस और कर्म चाहती है। जीवन की सीख: धैर्य और क्रोध पर नियंत्रण।'],
    Mercury: ['Your soul seeks knowledge and expression. Life lesson: truthful, kind speech.', 'आपकी आत्मा ज्ञान और अभिव्यक्ति चाहती है। जीवन की सीख: सच्ची और मधुर वाणी।'],
    Jupiter: ['Your soul seeks wisdom and dharma. Life lesson: share knowledge freely, without pride.', 'आपकी आत्मा ज्ञान और धर्म चाहती है। जीवन की सीख: बिना अभिमान के ज्ञान बाँटना।'],
    Venus: ['Your soul seeks love, beauty and harmony. Life lesson: balance between desire and duty.', 'आपकी आत्मा प्रेम, सौंदर्य और सामंजस्य चाहती है। जीवन की सीख: इच्छा और कर्तव्य में संतुलन।'],
    Saturn: ['Your soul seeks truth through service and discipline. Life lesson: accept hard work and serve others.', 'आपकी आत्मा सेवा और अनुशासन से सत्य चाहती है। जीवन की सीख: मेहनत स्वीकार करें और दूसरों की सेवा करें।']
  },
  deity: [['Ashwini Kumaras (divine healers)', 'अश्विनी कुमार (दिव्य वैद्य)'], ['Yama (lord of dharma)', 'यम (धर्मराज)'], ['Agni (fire god)', 'अग्नि देव'], ['Brahma (the creator)', 'ब्रह्मा जी'], ['Chandra (Soma)', 'चंद्र देव (सोम)'], ['Rudra (Shiva)', 'रुद्र (शिव)'], ['Aditi (mother of gods)', 'अदिति माता'], ['Brihaspati (guru of gods)', 'बृहस्पति देव'], ['Naga devta (serpent gods)', 'नाग देवता'], ['Pitrs (ancestors)', 'पितृ देव'], ['Bhaga (god of fortune)', 'भग देव'], ['Aryaman (god of friendship)', 'अर्यमा देव'], ['Savitr (Surya)', 'सविता (सूर्य)'], ['Vishwakarma (divine architect)', 'विश्वकर्मा'], ['Vayu (wind god)', 'वायु देव'], ['Indra and Agni', 'इंद्र और अग्नि'], ['Mitra (god of friendship)', 'मित्र देव'], ['Indra (king of gods)', 'इंद्र देव'], ['Nirriti (goddess of dissolution)', 'निऋति देवी'], ['Apah (water goddesses)', 'आपः (जल देवी)'], ['Vishvedevas (universal gods)', 'विश्वेदेव'], ['Lord Vishnu', 'भगवान विष्णु'], ['Ashta Vasus', 'अष्ट वसु'], ['Varuna (lord of waters)', 'वरुण देव'], ['Aja Ekapada (form of Shiva)', 'अज एकपाद (शिव रूप)'], ['Ahir Budhnya (serpent of the deep)', 'अहिर्बुध्न्य'], ['Pushan (protector of travellers)', 'पूषा देव']],
  deityTip: ['Remember this deity in your daily prayer. It brings peace to the mind and protection on your path.', 'रोज़ की पूजा में इन देवता का स्मरण करें। इससे मन को शांति और जीवन में रक्षा मिलती है।'],
  beej: { Sun: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः', Moon: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः', Mars: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः', Mercury: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः', Jupiter: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः', Venus: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः', Saturn: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः', Rahu: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः', Ketu: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः' },
  daanItems: { Sun: ['wheat, jaggery and copper on Sunday', 'रविवार को गेहूँ, गुड़ और ताँबा'], Moon: ['rice, milk and white cloth on Monday', 'सोमवार को चावल, दूध और सफ़ेद वस्त्र'], Mars: ['red lentils (masoor) and jaggery on Tuesday', 'मंगलवार को मसूर दाल और गुड़'], Mercury: ['green moong and green cloth on Wednesday', 'बुधवार को हरी मूँग और हरा वस्त्र'], Jupiter: ['chana dal, turmeric and yellow cloth on Thursday', 'गुरुवार को चने की दाल, हल्दी और पीला वस्त्र'], Venus: ['rice, sugar and white sweets on Friday', 'शुक्रवार को चावल, चीनी और सफ़ेद मिठाई'], Saturn: ['black sesame, mustard oil and black cloth on Saturday', 'शनिवार को काले तिल, सरसों का तेल और काला वस्त्र'], Rahu: ['a blanket and urad dal on Saturday', 'शनिवार को कंबल और उड़द दाल'], Ketu: ['a blanket and food for dogs', 'कंबल और कुत्तों को भोजन'] },
  meditation: [['Sit facing east at sunrise and focus on a diya flame for 10 minutes. It calms your fiery energy.', 'सूर्योदय के समय पूर्व की ओर बैठकर 10 मिनट दीये की लौ पर ध्यान करें। इससे अग्नि ऊर्जा शांत होगी।'], ['Walk barefoot on grass, then sit still and feel your breath for 10 minutes. It keeps you grounded.', 'घास पर नंगे पैर चलें, फिर 10 मिनट शांत बैठकर साँसों को महसूस करें। इससे मन स्थिर रहेगा।'], ['Practise slow breathing (anulom-vilom) for 10 minutes. It calms a busy mind.', '10 मिनट अनुलोम-विलोम करें। इससे चंचल मन शांत होगा।'], ['Sit near water or listen to bhajans with eyes closed for 10 minutes. It soothes your emotions.', 'पानी के पास बैठें या आँखें बंद करके 10 मिनट भजन सुनें। इससे भावनाएँ शांत होंगी।']],
  camTake: ['Take photo with camera', 'कैमरे से फ़ोटो लें'], camGallery: ['Choose from gallery', 'गैलरी से चुनें'], camCapture: ['Capture', 'फ़ोटो लें'], camHint: ['Place your open right palm inside the outline', 'खुली दाहिनी हथेली को आकृति के अंदर रखें'],
  camDenied: ['Camera is not available here. Please choose a photo from your gallery.', 'यहाँ कैमरा उपलब्ध नहीं है। कृपया गैलरी से फ़ोटो चुनें।'], retake: ['Change photo', 'फ़ोटो बदलें']
};

C.chat = {
  title: ['Ask Saathi', 'साथी से पूछें'], sub: ['Answers from your Kundli', 'आपकी कुंडली से जवाब'],
  placeholder: ['Type your question…', 'अपना सवाल लिखें…'],
  hello: ['Namaste {n} 🙏 I am Saathi. Ask me about your day, career, money, marriage, health, dasha, gemstone, Rahu Kaal or anything from your Kundli.', 'नमस्ते {n} 🙏 मैं साथी हूँ। अपने दिन, करियर, धन, विवाह, सेहत, दशा, रत्न, राहु काल या कुंडली से जुड़ा कुछ भी पूछें।'],
  chips: [['Today', 'आज कैसा रहेगा?'], ['Career', 'मेरा करियर'], ['Marriage', 'विवाह कब होगा?'], ['Money', 'धन योग'], ['Health', 'मेरी सेहत'], ['Lucky colour', 'शुभ रंग'], ['Gemstone', 'मेरा रत्न'], ['Dasha', 'मेरी दशा'], ['Sade Sati', 'साढ़े साती'], ['Rahu Kaal', 'राहु काल'], ['Remedies', 'उपाय'], ['Next Ekadashi', 'अगली एकादशी']],
  fallback: ['I can answer questions about your day, career, money, marriage, health, family, children, dasha, gemstone, mantra, Sade Sati, Rahu Kaal, Panchang and vrat days. Try one of the buttons below. For any question in your own words, the AI Jyotishi is coming soon with Premium.', 'मैं आपके दिन, करियर, धन, विवाह, सेहत, परिवार, संतान, दशा, रत्न, मंत्र, साढ़े साती, राहु काल, पंचांग और व्रत के बारे में बता सकता हूँ। नीचे के बटन आज़माएँ। अपने शब्दों में कोई भी सवाल पूछने के लिए AI ज्योतिषी जल्द ही प्रीमियम में आ रहा है।'],
  thanks: ['You are welcome 🙏 Stay blessed. Ask me anything else anytime.', 'आपका स्वागत है 🙏 सदा प्रसन्न रहें। कभी भी कुछ और पूछें।'],
  decision: ['For any important decision, choose a day rated 4★ or 5★ and avoid Rahu Kaal. Your stars for {a} are {s}/5, and your best period for it is {p}.', 'किसी भी ज़रूरी फ़ैसले के लिए 4★ या 5★ वाला दिन चुनें और राहु काल से बचें। {a} के लिए आपके सितारे {s}/5 हैं, और इसका सबसे शुभ समय {p} है।'],
  noPeriod: ['not in the next few years; steady effort is the key', 'अगले कुछ वर्षों में विशेष नहीं, लगातार प्रयास ही कुंजी है'],
  forWhom: ['(Answers are for {n}. Switch person in Family.)', '({n} के लिए जवाब। व्यक्ति बदलने के लिए परिवार में जाएँ।)'],
  openKundli: ['Open Kundli Milan', 'कुंडली मिलान खोलें'], openPalm: ['Open palm reading', 'हस्तरेखा खोलें'],
  aiSoon: ['🤖 AI Jyotishi (Premium) will soon answer any question in detail.', '🤖 AI ज्योतिषी (प्रीमियम) जल्द ही हर सवाल का विस्तार से जवाब देगा।']
};
C.prem.liveCam = ['Use live camera (computer webcam)', 'लाइव कैमरा इस्तेमाल करें (कंप्यूटर वेबकैम)'];

C.login = {
  title: ['Welcome to Jyotish Saathi', 'ज्योतिष साथी में आपका स्वागत है'],
  sub: ['Enter your name and WhatsApp number to begin', 'शुरू करने के लिए अपना नाम और WhatsApp नंबर दर्ज करें'],
  name: ['Your name', 'आपका नाम'], phone: ['WhatsApp number', 'WhatsApp नंबर'], phonePh: ['10-digit mobile number', '10 अंकों का मोबाइल नंबर'],
  consent: ['Send me daily rashifal, festival reminders and offers on WhatsApp', 'मुझे WhatsApp पर रोज़ का राशिफल, त्योहारों की याद और ऑफ़र भेजें'],
  privacy: ['Your number is safe with us and is never shared.', 'आपका नंबर हमारे पास सुरक्षित है और किसी से साझा नहीं किया जाता।'],
  sendOtp: ['Send OTP on WhatsApp', 'WhatsApp पर OTP भेजें'], next: ['Continue', 'आगे बढ़ें'], skip: ['Skip for now', 'अभी छोड़ें'],
  otpTitle: ['Enter the OTP', 'OTP दर्ज करें'], otpSent: ['We sent a 6-digit code on WhatsApp to', 'हमने WhatsApp पर 6 अंकों का कोड भेजा है'],
  verify: ['Verify and continue', 'सत्यापित करें और आगे बढ़ें'], resendIn: ['Resend code in {s}s', '{s} सेकंड में दोबारा भेजें'], resend: ['Resend code', 'कोड दोबारा भेजें'], change: ['Change number', 'नंबर बदलें'],
  badPhone: ['Please enter a valid mobile number.', 'कृपया सही मोबाइल नंबर दर्ज करें।'], badName: ['Please enter your name.', 'कृपया अपना नाम दर्ज करें।'],
  badCode: ['Wrong or expired code. Please try again.', 'कोड ग़लत है या समय ख़त्म हो गया। फिर से कोशिश करें।'], tooMany: ['Too many attempts. Please wait a few minutes.', 'बहुत ज़्यादा कोशिशें। कुछ मिनट रुकें।'],
  netErr: ['Could not connect. Check your internet and try again.', 'कनेक्ट नहीं हो सका। इंटरनेट जाँचकर फिर कोशिश करें।'],
  sending: ['Sending…', 'भेज रहे हैं…'], verifying: ['Verifying…', 'जाँच रहे हैं…'],
  verified: ['Number verified', 'नंबर सत्यापित'], notVerified: ['Not verified', 'सत्यापित नहीं'],
  demoCode: ['Demo mode: use code 123456', 'डेमो मोड: कोड 123456 डालें'],
  hiTitle: ['Say hi on WhatsApp 🙏', 'WhatsApp पर नमस्ते भेजें 🙏'], hiText: ['Get your daily rashifal and updates directly on WhatsApp. Tap below and press send.', 'रोज़ का राशिफल और अपडेट सीधे WhatsApp पर पाएँ। नीचे दबाएँ और भेजें दबाएँ।'],
  hiBtn: ['Say Hi on WhatsApp', 'WhatsApp पर नमस्ते भेजें'], hiMsg: ['Namaste! I just joined Jyotish Saathi 🙏 My name is {n}.', 'नमस्ते! मैंने अभी ज्योतिष साथी जॉइन किया है 🙏 मेरा नाम {n} है।'],
  account: ['Your account', 'आपका खाता'], waUpdates: ['WhatsApp updates', 'WhatsApp अपडेट'], on: ['On', 'चालू'], off: ['Off', 'बंद'], logout: ['Change number / log out', 'नंबर बदलें / लॉग आउट']
};
C.login.sendFail = ['Could not send the code on WhatsApp. Please check that this number uses WhatsApp.', 'WhatsApp पर कोड नहीं भेजा जा सका। कृपया जाँचें कि इस नंबर पर WhatsApp चलता है।'];

C.pa = {
  title: ['AI Palm Reading', 'AI हस्तरेखा'], sub: ['Photograph both hands. AI reads every line and combines it with your Kundli.', 'दोनों हाथों की फ़ोटो लें। AI हर रेखा पढ़कर आपकी कुंडली के साथ मिलाकर फल बताएगा।'],
  left: ['Left hand', 'बायाँ हाथ'], right: ['Right hand', 'दायाँ हाथ'],
  leftMeans: ['What you were born with', 'जन्म से मिली क्षमता'], rightMeans: ['What you have made of life', 'आपने जीवन में क्या बनाया'],
  tipsTitle: ['For a good reading', 'अच्छी रीडिंग के लिए'],
  tips: [['Open your palm fully, fingers slightly apart', 'हथेली पूरी खोलें, उंगलियाँ थोड़ी अलग रखें'], ['Use bright daylight, no shadow on the palm', 'तेज़ रोशनी में फ़ोटो लें, हथेली पर छाया न हो'], ['Fill the photo with the palm and fingers', 'फ़ोटो में पूरी हथेली और उंगलियाँ आएँ'], ['Keep the phone straight above the hand', 'फ़ोन को हाथ के ठीक ऊपर सीधा रखें']],
  take: ['Camera', 'कैमरा'], gallery: ['Gallery', 'गैलरी'], retake: ['Retake', 'दोबारा लें'], ready: ['Ready', 'तैयार'],
  analyse: ['Read my palms', 'मेरी हस्तरेखा पढ़ें'], needBoth: ['Add photos of both hands to continue', 'आगे बढ़ने के लिए दोनों हाथों की फ़ोटो जोड़ें'],
  freeNote: ['Your first AI palm reading is free. After that it is part of Premium.', 'आपकी पहली AI हस्तरेखा मुफ़्त है। उसके बाद यह प्रीमियम में शामिल है।'],
  quick: ['Quick reading without photos', 'बिना फ़ोटो के झटपट हस्तरेखा'],
  scanning: [['Studying the shape of your hands…', 'आपके हाथों का आकार देख रहे हैं…'], ['Reading your life line…', 'जीवन रेखा पढ़ रहे हैं…'], ['Reading your head and heart lines…', 'मस्तिष्क और हृदय रेखा पढ़ रहे हैं…'], ['Following your fate and sun lines…', 'भाग्य और सूर्य रेखा देख रहे हैं…'], ['Checking the mounts and special marks…', 'पर्वत और विशेष चिह्न देख रहे हैं…'], ['Matching your palm with your Kundli…', 'हस्तरेखा को कुंडली से मिला रहे हैं…'], ['Writing your detailed reading…', 'आपका विस्तृत फल लिख रहे हैं…']],
  wait: ['This takes about a minute. Please keep the app open.', 'इसमें लगभग एक मिनट लगेगा। कृपया ऐप खुला रखें।'],
  summary: ['Your reading at a glance', 'संक्षेप में आपका फल'], shape: ['Your hand type', 'आपके हाथ का प्रकार'],
  shapeNames: { Earth: ['Earth hand', 'पृथ्वी हाथ'], Air: ['Air hand', 'वायु हाथ'], Fire: ['Fire hand', 'अग्नि हाथ'], Water: ['Water hand', 'जल हाथ'] },
  linesTitle: ['Your palm lines', 'आपकी हाथ की रेखाएँ'], onLeft: ['Left', 'बायाँ'], onRight: ['Right', 'दायाँ'],
  mounts: ['Mounts (parvat)', 'पर्वत'], marks: ['Special marks', 'विशेष चिह्न'],
  combinedTitle: ['Kundli + Palm: your complete reading', 'कुंडली + हस्तरेखा: आपका संपूर्ण फल'], kStars: ['Kundli', 'कुंडली'], pStars: ['Palm', 'हस्तरेखा'],
  phases: ['Phases of life ahead', 'आगे के जीवन के पड़ाव'], agreement: ['How your palm and Kundli agree', 'हस्तरेखा और कुंडली का मेल'],
  advice: ['Advice for you', 'आपके लिए सलाह'], remedies: ['Remedies', 'उपाय'],
  newReading: ['New palm reading', 'नई हस्तरेखा पढ़ें'], readOn: ['Reading from', 'रीडिंग की तारीख़'],
  share: ['Share on WhatsApp', 'WhatsApp पर भेजें'], disclaimer: ['Palmistry is a traditional art for guidance. For health, money or legal matters, consult a professional.', 'हस्तरेखा मार्गदर्शन की पारंपरिक विद्या है। स्वास्थ्य, धन या क़ानूनी मामलों के लिए विशेषज्ञ से सलाह लें।'],
  errNoAI: ['AI palm reading is not switched on in this version yet. Please use the quick reading for now.', 'इस संस्करण में AI हस्तरेखा अभी चालू नहीं है। अभी के लिए झटपट हस्तरेखा देखें।'],
  errFail: ['Could not read the palms right now. Please check your internet and try again.', 'अभी हस्तरेखा नहीं पढ़ी जा सकी। इंटरनेट जाँचकर फिर कोशिश करें।'],
  errBusy: ['Too many readings right now. Please try again in a little while.', 'अभी बहुत ज़्यादा रीडिंग चल रही हैं। थोड़ी देर बाद फिर कोशिश करें।'],
  badPhoto: ['Please retake this photo', 'कृपया यह फ़ोटो दोबारा लें'],
  lineIcons: { life: '💗', head: '🧠', heart: '❤️', fate: '🛤️', sun: '☀️', marriage: '💍', health: '🌿', other: '✨' }
};
// AI Palm Scan is now available in Premium
C.prem.now.splice(1, 0, ['✋', ['AI Palm Reading (both hands)', 'AI हस्तरेखा (दोनों हाथ)'], ['Every line of both hands read by AI and combined with your Kundli', 'दोनों हाथों की हर रेखा AI से पढ़ी जाती है और कुंडली से मिलाई जाती है']]);
C.prem.ai = C.prem.ai.filter(x => x[0] !== '✋');
C.login.waBtn = ['Continue with WhatsApp', 'WhatsApp से आगे बढ़ें'];
C.login.waSub = ['Enter your name. You will verify your number with one WhatsApp message – no OTP needed.', 'अपना नाम लिखें। एक WhatsApp संदेश से आपका नंबर सत्यापित हो जाएगा – कोई OTP नहीं।'];
C.login.waTitle = ['Send one message on WhatsApp', 'WhatsApp पर एक संदेश भेजें'];
C.login.waSteps = [['Tap the green button below', 'नीचे हरे बटन को दबाएँ'], ['WhatsApp opens with the message ready – just press Send ➤', 'WhatsApp संदेश के साथ खुलेगा – बस भेजें ➤ दबाएँ'], ['Come back here – you will be logged in automatically', 'यहाँ वापस आएँ – आप अपने-आप लॉगिन हो जाएँगे']];
C.login.waOpen = ['Open WhatsApp and send', 'WhatsApp खोलें और भेजें'];
C.login.waWaiting = ['Waiting for your message', 'आपके संदेश का इंतज़ार है'];
C.login.waCode = ['Your code', 'आपका कोड'];
C.login.waAgain = ['Start again', 'फिर से शुरू करें'];
C.login.waDemo = ['Preview: you will be logged in 3 seconds after tapping the button', 'प्रीव्यू: बटन दबाने के 3 सेकंड बाद आप लॉगिन हो जाएँगे'];
C.pa.freeLeft = ['{n} free AI palm readings left. After that, Premium.', '{n} मुफ़्त AI हस्तरेखा बाकी हैं। उसके बाद प्रीमियम।'];
C.pa.errLogin = ['Please log in with WhatsApp to use the AI palm reading.', 'AI हस्तरेखा के लिए कृपया WhatsApp से लॉगिन करें।'];
C.prem.perMonth = ['/month', '/महीना'];
C.prem.perYear = ['/year', '/साल'];
C.prem.save = ['Save {p}%', '{p}% बचत'];

C.acc = {
  timeUnknown: ['Birth time not known: houses and predictions are read from your Moon sign (Chandra Lagna). Add your birth time for a more exact Kundli.', 'जन्म समय ज्ञात नहीं: भाव और भविष्यफल चंद्र राशि (चंद्र लग्न) से देखे गए हैं। अधिक सटीक कुंडली के लिए जन्म समय जोड़ें।'],
  lagnaEdge: ['Your Lagna is at the edge of a sign. A few minutes\' difference in birth time can change it, so check the exact time if you can.', 'आपका लग्न राशि की सीमा पर है। जन्म समय में कुछ मिनट का अंतर लग्न बदल सकता है, इसलिए सही समय जाँच लें।'],
  oldTz: ['Births in this period used local time ({tz}), not IST. The Kundli has been calculated with it.', 'इस समय के जन्म में IST नहीं, स्थानीय समय ({tz}) चलता था। कुंडली उसी से बनाई गई है।'],
  d9: ['Navamsa (D9)', 'नवांश (D9)'],
  mCancelled: ['Manglik dosh cancelled', 'मांगलिक दोष शांत (भंग)'],
  mCancelJup: ['Mars is with or aspected by Jupiter, which cancels the dosh.', 'मंगल पर गुरु की दृष्टि या युति है, जिससे दोष शांत हो जाता है।'],
  mCancelSign: ['Mars is in a sign that cancels the dosh (its own, exalted, or an exception sign for that house).', 'मंगल ऐसी राशि में है जिससे दोष शांत होता है (स्वराशि, उच्च, या उस भाव का अपवाद)।'],
  tableKey: ['R = retrograde · C = combust (too close to the Sun) · ↑ exalted · ↓ debilitated · ★ vargottama (same sign in D9, extra strong)', 'व = वक्री · अ = अस्त (सूर्य के बहुत पास) · ↑ उच्च · ↓ नीच · ★ वर्गोत्तम (D9 में भी वही राशि, विशेष बलवान)'],
  placeSearch: ['Type your town or city', 'अपना शहर या कस्बा लिखें'], placeNone: ['No match. Try another spelling, or enter the place by hand.', 'कोई मेल नहीं। दूसरी स्पेलिंग आज़माएँ या स्थान ख़ुद भरें।'],
  placeManual: ['Place not in the list? Enter it by hand', 'सूची में नहीं? स्थान ख़ुद भरें'], placeChosen: ['Selected', 'चुना गया']
};
C.acc.cancelled = ['cancelled', 'भंग'];
C.acc.doshCancelNote = ['A classical exception (parihara) applies, so this dosh is considered cancelled.', 'शास्त्रीय अपवाद (परिहार) लागू है, इसलिए यह दोष भंग माना जाता है।'];
C.acc.mBoth = ['Both are Manglik, so the dosh cancels out between them.', 'दोनों मांगलिक हैं, इसलिए दोष आपस में शांत हो जाता है।'];
C.acc.mOne = ['Only one partner is Manglik. Consult an astrologer before deciding.', 'केवल एक साथी मांगलिक है। निर्णय से पहले ज्योतिषी से सलाह लें।'];
C.why = {
  guruGood: ['Jupiter favours you now (house {n} from your Moon)', 'गुरु अभी आपके अनुकूल हैं (चंद्र से {n}वें भाव में)'],
  guruWeak: ['Jupiter is less supportive now (house {n} from your Moon)', 'गुरु अभी कम सहयोगी हैं (चंद्र से {n}वें भाव में)'],
  sadeSati: ['Shani Sade Sati is running: go slow and steady', 'शनि की साढ़े साती चल रही है: धीरे और स्थिर चलें'],
  dhaiya: ['Shani Dhaiya is running: avoid hasty decisions', 'शनि की ढैय्या चल रही है: जल्दबाज़ी के फ़ैसले न लें'],
  shaniGood: ['Saturn supports your hard work now', 'शनि अभी आपकी मेहनत का साथ दे रहे हैं'],
  dashaGood: ['Your running {n} period is strong in your Kundli', 'आपकी कुंडली में चल रही {n} की दशा बलवान है'],
  dashaWeak: ['Your running {n} period needs care: remedies help', 'चल रही {n} की दशा में सावधानी रखें: उपाय लाभ देंगे'],
  amavasya: ['Amavasya today: rest and prayer, not new starts', 'आज अमावस्या है: नई शुरुआत नहीं, आराम और पूजा करें'],
  purnima: ['Purnima today: an auspicious, positive day', 'आज पूर्णिमा है: शुभ और सकारात्मक दिन'],
  ekadashi: ['Ekadashi today: good for fasting and prayer', 'आज एकादशी है: व्रत और पूजा के लिए शुभ'],
  rikta: ['Rikta tithi today: avoid starting new work', 'आज रिक्ता तिथि है: नया काम शुरू न करें']
};
C.pa.domQ = ['Which hand do you write with?', 'आप किस हाथ से लिखते हैं?'];
C.pa.qDark = ['Too dark – retake in light', 'बहुत अँधेरा – रोशनी में दोबारा लें'];
C.pa.qBright = ['Too bright – avoid direct glare', 'बहुत तेज़ रोशनी – चमक से बचें'];
C.pa.qBlur = ['Blurry – hold steady and retake', 'धुंधली – फ़ोन स्थिर रखकर दोबारा लें'];
C.pa.conf = { high: ['Clearly visible', 'साफ़ दिखाई दी'], medium: ['Partly visible', 'आंशिक रूप से दिखी'], low: ['Faint – read with care', 'हल्की – सावधानी से पढ़ी गई'] };
C.fam = {
  full: ['Free plan allows {n} family members. Get Premium for unlimited.', 'मुफ़्त प्लान में {n} सदस्य जोड़ सकते हैं। असीमित के लिए प्रीमियम लें।'],
  count: ['{c} of {n} family members used (free plan) · Premium: unlimited', '{n} में से {c} सदस्य जोड़े गए (मुफ़्त प्लान) · प्रीमियम: असीमित']
};
C.fam = {
  full: ['Free plan allows {n} family members. Get Premium for unlimited.', 'मुफ़्त प्लान में {n} सदस्य जोड़ सकते हैं। असीमित के लिए प्रीमियम लें।'],
  count: ['{c} of {n} family members used (free plan) · Premium: unlimited', '{n} में से {c} सदस्य जोड़े गए (मुफ़्त प्लान) · प्रीमियम: असीमित']
};
/* Bhakti: temples + mantras, and the free AI marriage match */
C.bh = {
  tab: ['Bhakti', 'भक्ति'], title: ['Bhakti', 'भक्ति'],
  temples: ['Temples near me', 'पास के मंदिर'], mantras: ['Mantras & Prayers', 'मंत्र और प्रार्थना'],
  locOn: ['📍 Using your current location', '📍 आपकी वर्तमान जगह से'], locOff: ['📍 Location off: Google Maps will use its own "near me"', '📍 लोकेशन बंद है: Google Maps खुद "पास में" ढूँढेगा'],
  locAsk: ['Use my location', 'मेरी लोकेशन लें'], locWait: ['Finding your location…', 'आपकी लोकेशन ढूँढ रहे हैं…'],
  locNote: ['Your location is only used to open Google Maps. It is never saved or sent to us.', 'आपकी लोकेशन सिर्फ़ Google Maps खोलने के लिए है। इसे न सेव किया जाता है, न हमें भेजा जाता है।'],
  pick: ['Choose a temple type', 'मंदिर का प्रकार चुनें'],
  seeMap: ['See all on map', 'मैप पर सब देखें'], route: ['Route to nearest', 'सबसे पास का रास्ता'],
  todayCard: ['Temples near you', 'आपके पास के मंदिर'], todaySub: ['Tap to find the nearest temple and the route', 'सबसे पास का मंदिर और रास्ता देखने के लिए टैप करें'],
  more: ['All temple types', 'सभी प्रकार'],
  famous: ['Famous tirth (pilgrimages)', 'प्रसिद्ध तीर्थ'], famousSub: ['Tap for the route from where you are', 'आप जहाँ हैं, वहाँ से रास्ता देखने के लिए टैप करें'],
  search: ['Search mantra, aarti, chalisa…', 'मंत्र, आरती, चालीसा खोजें…'], none: ['Nothing found', 'कुछ नहीं मिला'],
  listen: ['Listen', 'सुनें'], stop: ['Stop', 'रोकें'], save: ['Save', 'सहेजें'], saved: ['Saved', 'सहेजा'], share: ['Share', 'शेयर'],
  meaning: ['Meaning', 'अर्थ'], when: ['When to chant', 'कब जपें'], roman: ['How to read (English letters)', 'अंग्रेज़ी अक्षरों में'],
  noFav: ['Tap ☆ on any mantra to save it here.', 'किसी भी मंत्र पर ☆ दबाकर यहाँ सहेजें।'],
  count: ['mantras & prayers', 'मंत्र और प्रार्थनाएँ'], textSize: ['Text size', 'अक्षर का आकार'],
  forYou: ['Mantra for you today', 'आज आपके लिए मंत्र'],
  // AI compatibility (free)
  aiBtn: ['🤖 Detailed AI marriage reading (free)', '🤖 विस्तृत AI विवाह मिलान (मुफ़्त)'],
  aiLeft: ['{n} free today', 'आज {n} मुफ़्त बाकी'], aiDone: ['Free limit of 3 a day reached. Please try again tomorrow.', 'आज की 3 मुफ़्त सीमा पूरी हो गई। कृपया कल फिर देखें।'],
  aiWait: ['Our AI astrologer is studying both Kundlis…', 'हमारे AI ज्योतिषी दोनों कुंडलियाँ पढ़ रहे हैं…'],
  aiFail: ['Could not get the AI reading right now. Please try again.', 'अभी AI मिलान नहीं हो सका। कृपया फिर से कोशिश करें।'],
  aiNoAI: ['AI reading is not set up yet.', 'AI मिलान अभी चालू नहीं है।'],
  aiTitle: ['AI Marriage Reading', 'AI विवाह मिलान'], strengths: ['Strengths', 'खूबियाँ'], care: ['Be careful about', 'ध्यान रखें'],
  timing: ['Good timing', 'शुभ समय'], remedies: ['Remedies', 'उपाय'], free: ['FREE', 'मुफ़्त'],
  aiNote: ['AI guidance based on both birth charts. Please also consult your family pandit for important decisions.', 'दोनों कुंडलियों पर आधारित AI मार्गदर्शन। बड़े फ़ैसलों के लिए अपने पारिवारिक पंडित जी से भी सलाह लें।']
};
C.famous = [
  ['Kashi Vishwanath, Varanasi', 'काशी विश्वनाथ, वाराणसी', '🔱'], ['Somnath Temple, Gujarat', 'सोमनाथ मंदिर, गुजरात', '🔱'], ['Mahakaleshwar, Ujjain', 'महाकालेश्वर, उज्जैन', '🔱'],
  ['Kedarnath Temple', 'केदारनाथ मंदिर', '🔱'], ['Vaishno Devi, Katra', 'वैष्णो देवी, कटरा', '🌺'], ['Tirupati Balaji, Tirumala', 'तिरुपति बालाजी, तिरुमला', '🪷'],
  ['Shree Jagannath Temple, Puri', 'श्री जगन्नाथ मंदिर, पुरी', '🛞'], ['Shri Ram Janmabhoomi Mandir, Ayodhya', 'श्री राम जन्मभूमि मंदिर, अयोध्या', '🏹'], ['Banke Bihari Temple, Vrindavan', 'बांके बिहारी मंदिर, वृंदावन', '🪈'],
  ['Siddhivinayak Temple, Mumbai', 'सिद्धिविनायक मंदिर, मुंबई', '🐘'], ['Shirdi Sai Baba Temple', 'शिरडी साईं बाबा मंदिर', '🙏'], ['Shani Shingnapur', 'शनि शिंगणापुर', '🪐'],
  ['Kamakhya Temple, Guwahati', 'कामाख्या मंदिर, गुवाहाटी', '🌺'], ['Meenakshi Temple, Madurai', 'मीनाक्षी मंदिर, मदुरै', '🌺'], ['Badrinath Temple', 'बद्रीनाथ मंदिर', '🪷'],
  ['Golden Temple (Harmandir Sahib), Amritsar', 'स्वर्ण मंदिर (हरमंदिर साहिब), अमृतसर', '🪯'], ['Gurudwara Bangla Sahib, Delhi', 'गुरुद्वारा बंगला साहिब, दिल्ली', '🪯'], ['Takht Sri Hazur Sahib, Nanded', 'तख़्त श्री हज़ूर साहिब, नांदेड़', '🪯'],
  ['Shikharji (Parasnath), Jharkhand', 'सम्मेद शिखरजी (पारसनाथ), झारखंड', '🤲'], ['Palitana Jain Temples, Gujarat', 'पालीताणा जैन मंदिर, गुजरात', '🤲'], ['Dilwara Jain Temples, Mount Abu', 'दिलवाड़ा जैन मंदिर, माउंट आबू', '🤲'], ['Shravanabelagola, Karnataka', 'श्रवणबेलगोला, कर्नाटक', '🤲']
];
T.tabBhakti = ['Bhakti', 'भक्ति'];
C.prem.freeTitle = ['Free for everyone', 'सबके लिए मुफ़्त'];
C.prem.free = [['💑', ['AI Marriage Match', 'AI विवाह मिलान'], ['Detailed AI Kundli Milan for marriage: 3 free every day', 'विवाह के लिए विस्तृत AI कुंडली मिलान: रोज़ 3 मुफ़्त']], ['🛕', ['Temples near you', 'पास के मंदिर'], ['Hindu, Jain and Sikh temples with Google Maps route', 'हिंदू, जैन और सिख मंदिर, Google Maps रास्ते के साथ']], ['🕉️', ['Mantras & prayers', 'मंत्र और प्रार्थना'], ['Aarti, chalisa and mantras with meaning and audio', 'अर्थ और आवाज़ के साथ आरती, चालीसा और मंत्र']]];
/* Login order: number -> OTP -> name */
C.login.sub = ['Enter your WhatsApp number to begin. We will send you a 6-digit code.', 'शुरू करने के लिए अपना WhatsApp नंबर दर्ज करें। हम आपको 6 अंकों का कोड भेजेंगे।'];
C.login.subSimple = ['Enter your WhatsApp number to begin', 'शुरू करने के लिए अपना WhatsApp नंबर दर्ज करें'];
C.login.waSub = ['Verify your number with one WhatsApp message – no OTP needed.', 'एक WhatsApp संदेश से अपना नंबर सत्यापित करें – कोई OTP नहीं।'];
C.login.nameTitle = ['What should we call you?', 'हम आपको किस नाम से बुलाएँ?'];
C.login.nameSub = ['Your number is verified ✓. Just one more step.', 'आपका नंबर सत्यापित हो गया ✓। बस एक कदम और।'];
C.login.nameSubSimple = ['Just one more step.', 'बस एक कदम और।'];
C.login.namePh = ['e.g. Kamla Sharma', 'जैसे: कमला शर्मा'];
C.login.start = ['Start', 'शुरू करें'];
C.login.otpHelp = ['Did not get it? Check that WhatsApp is on this number, then tap Resend.', 'कोड नहीं मिला? देखें कि इस नंबर पर WhatsApp चालू है, फिर "दोबारा भेजें" दबाएँ।'];
C.login.welcomeBack = ['Welcome back', 'वापसी पर स्वागत है'];
C.famous.push(['Mahabodhi Temple, Bodh Gaya', 'महाबोधि मंदिर, बोधगया', '☸️'], ['Sarnath (Dhamek Stupa)', 'सारनाथ (धमेख स्तूप)', '☸️'], ['Kushinagar Mahaparinirvana Temple', 'कुशीनगर महापरिनिर्वाण मंदिर', '☸️'], ['Rumtek Monastery, Sikkim', 'रुमटेक मठ, सिक्किम', '☸️'],
  ['Ranakpur Jain Temple, Rajasthan', 'रणकपुर जैन मंदिर, राजस्थान', '🤲'], ['Pawapuri Jal Mandir, Bihar', 'पावापुरी जल मंदिर, बिहार', '🤲'], ['Takht Sri Patna Sahib', 'तख़्त श्री पटना साहिब', '🪯'], ['Takht Sri Keshgarh Sahib, Anandpur', 'तख़्त श्री केसगढ़ साहिब, आनंदपुर', '🪯'],
  ['Dwarkadhish Temple, Dwarka', 'द्वारकाधीश मंदिर, द्वारका', '🪈'], ['Rameshwaram Temple', 'रामेश्वरम मंदिर', '🔱'], ['Trimbakeshwar, Nashik', 'त्र्यंबकेश्वर, नासिक', '🔱'], ['Salasar Balaji, Rajasthan', 'सालासर बालाजी, राजस्थान', '🚩'], ['Khatu Shyam Ji, Rajasthan', 'खाटू श्याम जी, राजस्थान', '🏵️']);
C.login.phonePh = ['98765 43210', '98765 43210'];
/* Coming-soon AI features are now live in Premium */
T.tabMatch = ['Milan', 'मिलान']; T.tabMore = ['More', 'और'];
T.premiumList = [['AI Jyotishi: ask anything from your Kundli', 'AI ज्योतिषी: कुंडली से कुछ भी पूछें'], ['AI Life Report and Kundli PDF', 'AI जीवन रिपोर्ट और कुंडली PDF'], ['Shubh Muhurat Finder', 'शुभ मुहूर्त खोजक'], ['Daily voice guidance, unlimited family', 'रोज़ का आवाज़ संदेश, असीमित परिवार']];
C.login.waSub = ['Enter your WhatsApp number. You will verify it by sending us one ready-made message – free, no OTP.', 'अपना WhatsApp नंबर दर्ज करें। हमें एक तैयार संदेश भेजकर इसे सत्यापित करें – मुफ़्त, कोई OTP नहीं।'];
C.login.waFrom = ['Send the message from WhatsApp on', 'यह संदेश इस नंबर के WhatsApp से भेजें:'];
