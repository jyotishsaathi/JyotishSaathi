/* ===== Jyotish Saathi settings – edit these, push to GitHub, the app rebuilds itself ===== */
const APP_CONFIG = {
  // Web address of your server (after deploying backend/), e.g. 'https://jyotish-saathi-api.yourname.workers.dev'
  // Leave '' to run without a server: the number is saved only on the phone.
  apiBase: '',
  // How users log in when apiBase is set (order: WhatsApp number -> verify -> name):
  //   'whatsapp' = FREE (default). After typing the number, the user taps a button and sends one ready-made message
  //                to your WhatsApp number. Meta does not charge for chats the user starts.
  //   'otp'      = we send a 6-digit code on WhatsApp that the user types in (about ₹0.12 per code).
  loginMethod: 'whatsapp',
  // Your business WhatsApp number with country code, digits only (used when there is no server), e.g. '919876543210'
  whatsappNumber: '',
  // true = new users must log in before using the app
  requireLogin: true,
  // Free AI palm readings per person before Premium is needed (the server enforces this too)
  freePalmReadings: 3,
  // Family members a free user can save (Premium = unlimited)
  freeFamilyMembers: 5,
  showPremiumTest: false,      // true = show the "Turn Premium preview ON" test button in the real app too (turn off before launch)
  freeCompatPerDay: 3,         // free AI marriage matches per day (must match COMPAT_PER_DAY on the server)
  // Premium prices shown in the app (set the same prices in Google Play Console)
  priceMonthly: 99,
  priceYearly: 499,
  priceFamilyMonthly: 149,     // Parivaar plan: Premium for you + up to familyMax other WhatsApp numbers
  priceFamilyYearly: 799,
  familyMax: 5,
  priceReport: 99,             // one-time: full year-ahead report for one person
  priceMuhurat: 51,            // one-time: full muhurat list for one event (60 days)
  priceNaam: 49,               // one-time: all baby names with meanings
  freeTithiDates: 5,           // family tithi dates a free user can save
  // Google Play base-plan ids for subscriptions (set the same in Play Console → Subscriptions)
  playPlans: { prem_m: 'monthly', prem_y: 'yearly', fam_m: 'monthly', fam_y: 'yearly' },
  // Your website address, e.g. 'https://jyotishsaathi.in'. When set, the Android app downloads the area-search
  // data from the website instead of carrying it inside (the app becomes about 20 MB smaller).
  siteUrl: 'https://jyotishsaathi.com',
  appLink: '',                 // Play Store link, added to share cards and WhatsApp messages
  // Pandits who reviewed the app's rules, shown on the "Our method" page. Add real people only, with their permission:
  // reviewers: [{ name: 'Pt. Ramesh Shastri', about: 'Jyotishacharya, Varanasi · 25 years' }],
  reviewers: [],
  version: '1.4'
};
