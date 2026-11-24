# Jyotish Saathi – Start here

This guide takes you from this folder to a live app on Google Play and a live website. You don't need to write any code. GitHub, which is free, builds the Android app and hosts the website for you automatically.

---

## What's in this folder

| Folder | What it is |
|---|---|
| `app/` | The Android app (Capacitor project). GitHub builds it automatically. |
| `website/` | The landing page, the privacy policy, and the browser version of the app (`website/app/`). |
| `store-assets/` | The Play Store icon, feature graphic, screenshots, and listing text in Hindi and English. |
| `source/` | The app's source code. Only needed when making changes (see "Updating the app"). |
| `backend/` | The small server: WhatsApp OTP login, welcome message, contacts list and AI palm reading. |
| `.github/workflows/` | The automation that builds the app, publishes the website and deploys the login server. |

Your **signing key** comes in a separate zip, `SIGNING-KEY-KEEP-SAFE.zip`. Keep it out of this folder and never upload it to GitHub.

---

## Do I need to host anything?

- **The Android app: no.** Everything is packed inside the app, and it works offline. Google Play hosts the download.
- **A privacy policy page: yes.** Google Play won't accept an app without a privacy policy link.
- **The landing page: optional**, but useful for Instagram bio links, ads and trust.

- **A login server: only for WhatsApp OTP.** It's free on Cloudflare, and the automation deploys it (Step 8).

The website, privacy policy and browser app are hosted **free on GitHub Pages** by the automation in this folder. Later you can point a domain like `jyotish.hashtagged.in` at it (see Step 7).

## What it costs

| Item | Cost |
|---|---|
| Google Play developer account | US $25, one time (about ₹2,200) |
| GitHub (app builds + website hosting) | Free |
| Server on Cloudflare (login, palm AI, contacts) | Free (up to 100,000 requests a day) |
| Domain | Free with a subdomain of hashtagged.in |
| WhatsApp login (default "send us a code" method) | **Free**: the user messages you, and your welcome reply is free |
| AI palm reading (Claude Haiku 5.5) | About **₹0.30 per reading** (3 free per user, then Premium) |
| Optional: OTP method / marketing templates | About ₹0.12 per OTP, ₹0.86 per marketing message (+ GST) |

**Example with 1,000 new users a month:** about 3,000 free palm readings, roughly **₹900**. Everything else costs ₹0.
**Premium at ₹99/month:** after GST and Google's 15% share, you keep about ₹71. A heavy Premium user (30 readings a month) costs you about ₹9. So **13–15 paying users cover the costs of 1,000 free users.**

## Timeline

- **Day 1 (about 1–2 hours):** Steps 1–5.
- **Days 2–15:** the closed test with 12 testers. Only needed if you use a *personal* Play account.
- **Day 15–20:** apply for production, Google reviews, and the app goes live.

---

## Step 1 – Put the project on GitHub (about 15 minutes)

1. Create a free account at https://github.com.
2. Install **GitHub Desktop**: https://desktop.github.com. Sign in with your GitHub account.
3. In GitHub Desktop: **File → Add local repository →** choose this `JyotishSaathi` folder. It will say "not a git repository". Click **create a repository** there.
   - Name: `jyotish-saathi`
   - Click **Create repository**.
4. Click **Publish repository** at the top.
   - **Untick "Keep this code private"** if you want the free website hosting. GitHub Pages is free for public repositories.
   - Nothing secret is in this folder, so public is safe. The signing key is kept separately.

## Step 2 – Add your signing key to GitHub (about 5 minutes)

Unzip `SIGNING-KEY-KEEP-SAFE.zip`. Open `READ-ME-FIRST.txt`, which has your passwords.

On github.com, open your repository and go to **Settings → Secrets and variables → Actions → New repository secret**. Add these 4 secrets:

| Name | Value |
|---|---|
| `KEYSTORE_BASE64` | all the text inside `KEYSTORE_BASE64.txt` |
| `KEYSTORE_PASSWORD` | from READ-ME-FIRST.txt |
| `KEY_ALIAS` | `upload` |
| `KEY_PASSWORD` | from READ-ME-FIRST.txt |

**Back up the signing key folder** to Google Drive and one other place. You need the same key for every future update.

## Step 3 – Turn on the website (about 2 minutes)

1. In your repository, go to **Settings → Pages**. Under **Source**, choose **GitHub Actions**.
2. Go to the **Actions** tab, click **Publish website**, then **Run workflow**.
3. After about 1 minute, your site is live at:
   `https://YOUR-GITHUB-USERNAME.github.io/jyotish-saathi/`
   - Privacy policy: `.../jyotish-saathi/privacy-policy.html`. **You need this link for Play Console.**
   - Browser app: `.../jyotish-saathi/app/`

**Before you share it, fill in your details.** On github.com, open `website/privacy-policy.html` and click the ✏️ pencil icon. Replace `[YOUR NAME / COMPANY NAME]` and `[YOUR EMAIL]`, then click **Commit changes**. The site updates by itself.

## Step 4 – Get your app files (automatic)

1. Go to the **Actions** tab, click **Build Android app**, then **Run workflow**. It also runs by itself whenever you change anything in `app/`.
2. It takes about 8–12 minutes. When the tick turns ✅ green, open the **Releases** page on the right side of your repository's main page. Each build has two files:
   - **`JyotishSaathi-test-vN.apk`**: open this link **on your Android phone** to install the app and test it. If asked, allow "Install unknown apps" for Chrome.
   - **`JyotishSaathi-vN.aab`**: this is the file you upload to Google Play.

If the build is ❌ red, open it, copy the red error lines and send them to Claude.

## Step 5 – Google Play Console

1. **Create a developer account** at https://play.google.com/console. It costs $25 one time.
   - **Personal account:** before the app can go public, you must run a **closed test with at least 12 testers for 14 days in a row**.
   - **Organization account:** for example, under #HASHTAGGED. This needs a free **D-U-N-S number** for your business, and it **skips the 12-tester rule**. Verification takes a few days longer.
2. **Create app**
   - Name: `Jyotish Saathi: Kundli & Rashifal`
   - Language: Hindi or English
   - Type: **App**, **Free**
3. **App content.** All the answers are in `store-assets/store-listing.md`.
   - Privacy policy: your GitHub Pages link from Step 3
   - App access: all functionality available without special access
   - Ads: **No**
   - Content rating: fill in the questionnaire. Choose the Reference/Lifestyle category and answer *No* to violence, gambling, etc.
   - Target audience: **18+**
   - Data safety: answer exactly as in `store-listing.md`. The app collects **name and phone number** for login and, with consent, WhatsApp updates.
   - Government apps, financial features, health apps: **No**
4. **Main store listing.** Copy the short and full descriptions from `store-listing.md`. Upload `icon-512.png`, `feature-graphic-1024x500.png` and 4–8 `screen-*.png` files.
   Category: **Lifestyle**.
5. **Testing → Closed testing → Create track.**
   - Upload the `.aab` from Step 4.
   - Under testers, add your testers' Gmail addresses: family, friends and clients. At least 12, and add 15–20 to be safe.
   - Send them the **opt-in link**. They must install the app and stay opted in for 14 days.
   - Keep **Play App Signing** ON. It's the default.
6. After 14 days, go to **Dashboard → Apply for production** and answer the questions about your test.
7. When you're approved, go to **Production → Create release**, add the latest `.aab` and **Roll out**. Review usually takes 1–7 days.
8. Once the app is live, copy its Play Store link. On github.com, edit `website/index.html`: near the bottom, change `playStoreUrl: ''` to your link, e.g. `playStoreUrl: 'https://play.google.com/store/apps/details?id=com.jyotishsaathi.app'`. Also set `contactEmail`. The landing page buttons switch from "Coming soon" to a live download.

## Step 6 (optional) – Fully automatic uploads to Play

After your **first** `.aab` is uploaded by hand (Step 5.5), GitHub can upload future versions for you.

1. Go to https://console.cloud.google.com and create a project.
   - Enable the **Google Play Android Developer API**.
   - Go to **IAM → Service accounts → Create**. When it's created, open **Keys → Add key → JSON**. A file downloads.
2. In Play Console, go to **Users and permissions → Invite new users**. Paste the service account's email address and give it permission to release to testing and production for this app.
3. In GitHub secrets, add a secret named `PLAY_SERVICE_ACCOUNT_JSON` and paste the whole JSON file as its value.
4. From now on, go to **Actions → Build Android app → Run workflow**. Choose **Upload to Google Play: closed-testing** or **production**, and set the version name (1.1, 1.2…). It builds and uploads in one go.

## Step 7 (optional) – Use your own domain

1. In your domain's DNS settings, add a **CNAME** record: `jyotish` → `YOUR-GITHUB-USERNAME.github.io`.
2. In GitHub, go to **Settings → Pages → Custom domain**, type `jyotish.hashtagged.in` and tick **Enforce HTTPS**.

---

## Step 8 – Login with WhatsApp (free)

New users enter their **name**, tick the box if they want WhatsApp updates, and tap **"Continue with WhatsApp"**.
WhatsApp opens with a ready message containing a short code (e.g. `JS482913`) to **your** business number. They press Send, come back, and they're logged in.
Their number is verified because the message really came from it, and your server replies **"Namaste … welcome to Jyotish Saathi"** automatically. Meta doesn't charge for chats started by the user, so **login and welcome cost ₹0**.

Without a server (`apiBase: ''`), the app saves the name and number on the phone only. If you also set `whatsappNumber` in `source/config.js`, it shows a "Say Hi on WhatsApp" button.

### 8a – Free server on Cloudflare (about 10 minutes)
1. Create a free account at https://dash.cloudflare.com. Go to **My Profile → API Tokens → Create Token** and use the **"Edit Cloudflare Workers"** template. Copy the token and your **Account ID**.
2. In GitHub secrets, add:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token |
| `CLOUDFLARE_ACCOUNT_ID` | the account ID |
| `ADMIN_KEY` | a strong password of your choice (for contacts and giving Premium) |
| `OTP_SECRET` | any long random text |

3. Go to **Actions → Deploy login server → Run workflow**. Your server address appears in the log, e.g. `https://jyotish-saathi-api.YOURNAME.workers.dev`.
4. Put it in `source/config.js` → `apiBase: 'https://jyotish-saathi-api.YOURNAME.workers.dev'`. Commit, and the app rebuilds.

### 8b – Connect your WhatsApp Business number (Meta)
1. Go to https://developers.facebook.com → **Create app** → **Business** → add **WhatsApp**. Connect your business phone number. Meta's "coexistence" option lets you keep using the WhatsApp Business app on the same number. Copy the **Phone number ID**.
2. Create a **permanent access token**: Business settings → System users → Add → assign the WhatsApp app → **Generate token**, with the `whatsapp_business_messaging` and `whatsapp_business_management` permissions.
3. In your Meta app → **App settings → Basic**, copy the **App secret**.
4. Add these GitHub secrets, then run **Deploy login server** again:

| Name | Value |
|---|---|
| `WA_TOKEN` | the permanent token |
| `WA_PHONE_ID` | the phone number ID |
| `WA_BUSINESS_NUMBER` | your business number with country code, e.g. `919876543210` |
| `WA_VERIFY_TOKEN` | any word you choose, e.g. `jyotish2026` |
| `WA_APP_SECRET` | the app secret |

5. In Meta → **WhatsApp → Configuration → Webhook**:
   - Callback URL: `https://jyotish-saathi-api.YOURNAME.workers.dev/api/whatsapp/webhook`
   - Verify token: the same word as `WA_VERIFY_TOKEN`
   - Click **Verify and save**, then subscribe to **messages**.
6. Open `…/api/health`. It should show `"whatsappLogin":true`. Test login with your own phone.

No message templates are needed for this login. *(Optional: to use the paid OTP method instead, set `loginMethod: 'otp'` and create an Authentication template named `jyotish_otp`.)*

### 8c – Your contacts and Premium by hand
- **Contacts (CSV):** open `https://…workers.dev/api/admin/users.csv?key=YOUR_ADMIN_KEY`. It lists phone, name, language, **WhatsApp-updates consent**, join date, Premium status and palm readings used. **Only send marketing to people marked `yes`.**
- **Give someone Premium** (for testing, a gift or an offer) by sending this from any API tool, or ask Claude to make a small admin page:
  `POST …/api/admin/premium` with `{"key":"YOUR_ADMIN_KEY","phone":"9876543210","days":30}`
  The app picks it up the next time it opens.

### Cheapest way to market on WhatsApp
Inside the 24 hours after a person messages you, your replies are **free**. Use labels in WhatsApp Business to group users and reply when they write in. Paid marketing templates (about ₹0.86 each) only go to people who agreed. Send them weekly, not daily.

### Login order
New users see: **WhatsApp number → verify → their name**. Returning users skip the name step.
- **Default, FREE (`loginMethod: 'whatsapp'`):** after typing their number, the user taps the green button and WhatsApp opens with a ready message (e.g. "Namaste! My Jyotish Saathi login code: JS482913") to your business number. They press Send, your server verifies it and replies "Welcome" for free (Meta does not charge for chats the user starts). The verified number is the real WhatsApp number that sent the message.
- **Optional, paid (`loginMethod: 'otp'`):** we send a 6-digit code (Authentication template `jyotish_otp`, about ₹0.12 per code).
- Without a server (`apiBase: ''`), the app asks number → name and saves them on the phone only.

## Step 9 – AI palm reading (both hands)

The palm tab asks for photos of **both hands**. AI reads every line, mount and mark, compares left and right, and combines them with the person's Kundli. The result covers career, money, marriage, health, family, children, life phases, advice and remedies, and it's added to the Kundli PDF.

- **Who gets it:** every verified number gets **3 free AI palm readings**, counted on your server so reinstalling doesn't reset them. After that it's part of **Premium (₹99/month or ₹799/year)**. Change `FREE_PALM_READINGS` in `backend/wrangler.toml` and `freePalmReadings` in `source/config.js`.
- **The free "Quick reading without photos"** (5 simple questions) is still there for everyone.
- **To switch it on in the app:**
  1. Create an account at https://console.anthropic.com, add billing, then go to **API keys → Create key**.
  2. Add the GitHub secret `ANTHROPIC_API_KEY` and run **Actions → Deploy login server**. `/api/health` should now show `"palmAI":true`.
  3. The app uses your server automatically once `apiBase` is set in `source/config.js` (Step 8).
- **Cost control (already set up):**
  - It uses **Claude Haiku 5.5**, the cheapest model, at about ₹0.30 per reading.
  - Photos are reduced to 900px and answers are kept short.
  - The **same photos asked again within 7 days are answered from memory for free**.
  - There's a limit of **5 readings per user per day** and **8 per device/network**.
  - For richer readings, change `PALM_MODEL` to `claude-sonnet-5-5`, which costs about 20 times more.
  - Also set a **monthly spending limit** in the Anthropic console.
- **Privacy:** photos are sent only for the reading and are not stored. The privacy policy and Data safety answers are already updated for this.

## Step 10 – Temples, mantras and free AI marriage match (new)
Nothing to set up for temples and mantras: they work on day one, with no API key and no cost.
- **Temples near me:** a card on the Today screen when the app opens, plus the new **Bhakti** tab. Filters: Hindu (Shiv, Hanuman, Ganesh, Devi, Krishna/ISKCON, Ram, Vishnu/Balaji, Lakshmi, Shani, Sai Baba, Kali, Murugan, Ayyappa, Jagannath, Navgraha), Jain (Digambar, Shwetambar) and Sikh (Gurdwara). "See all on map" opens Google Maps with every temple of that type around the user; "Route to nearest" opens turn-by-turn directions. There is also a list of 22 famous tirth with one-tap routes. It uses free Google Maps links, so no Google Maps API key or billing is needed.
- **Location:** the app asks for location permission once. It is used only to centre the map and is never saved or sent to your server. If the user says no, Google Maps uses its own "near me".
- **Mantras & prayers:** 83 texts across Hindu, Jain, Sikh and Buddhist traditions. Aartis: Om Jai Jagdish Hare, Om Jai Shiv Omkara, Jai Ambe Gauri, Aarti Kunj Bihari Ki, Aarti Kije Hanuman Lala Ki, Jai Ganesh Deva, Sukhkarta Dukhharta, Om Jai Lakshmi Mata, the Jain Adi Jinanda aarti, Mangal Divo and Panch Parmeshthi aarti, and the Sikh Gagan Mai Thaal. Also Hanuman Chalisa, Gayatri, Mahamrityunjaya, Ram Stuti, Gita shlokas, Navgraha mantras, Jain Navkar, Chattari Mangalam, Khamemi, Bhaktamar and Uvasaggaharam, Sikh Mool Mantar, Japji, Tati Vao, Deh Shiva and Ardas lines, and Buddhist Tisarana, Metta and Om Mani Padme Hum. Each has meaning, when to chant, Listen (voice), text size, Save and WhatsApp share. All are traditional public-domain texts. Add more in `source/bhakti.js`.
- **AI marriage match (free, 3 a day):** after Kundli Milan, tap "Detailed AI marriage reading". It uses the low-cost Haiku model (about ₹0.15 per reading). The same couple again is cached and costs nothing. Change the limit with `COMPAT_PER_DAY` in `backend/wrangler.toml` and `freeCompatPerDay` in `source/config.js`. It needs the same `ANTHROPIC_API_KEY` secret as the palm reading (Step 9).

## Step 11 – Kundli Milan tab, Vastu compass and the Premium AI features (new)
- **Tabs:** Today · Kundli · **Milan** · Palm · Bhakti · **More**. Kundli Milan now has its own tab and a tile on the Today screen. Panchang, Family, Vastu and all Premium tools live in **More** (and Panchang/Vastu/Muhurat also have Today tiles).
- **Vastu Disha (free):** uses the phone's compass sensor. Hold the phone flat and tap **Scan direction**; it averages the readings for ~2.5 seconds and shows the direction (N, NE "Ishaan", E, SE "Agneya", S, SW "Nairutya", W, NW "Vayavya"), its deity, planet, element and colours, which rooms are best or to avoid, and simple remedies. Choose a room first (main door, pooja room, kitchen, bedroom, toilet, locker, sleeping head direction, desk facing…) to get a Best / Good / Okay / Avoid result, then **save it to the home map** for a home Vastu score. It also shows a **Sun check** (where the Sun is right now from your GPS location, to verify the compass), your **lucky direction** from your Moon sign, and today's **Disha Shool**. Phones without a compass (and computers) let the user pick the direction by hand. No extra Android permission is needed for the compass.
- **Premium AI Jyotishi:** ask any question; answered by Claude Haiku from the person's Kundli and dashas. 20 questions a day per member (`ASK_PER_DAY`), about ₹0.10 each.
- **Premium AI Life Report:** 8 chapters + the next 5 years + remedies, saved on the phone and added to the Kundli PDF. 6 a month per member (`REPORTS_PER_MONTH`), Haiku by default (about ₹0.50 each); set `REPORT_MODEL = "claude-sonnet-5-5"` for richer reports at a higher cost.
- **Premium Shubh Muhurat Finder:** works on the phone (no AI cost): next 3 months of dates for marriage, griha pravesh, vehicle, property, business opening, gold, naming and travel. It checks nakshatra, tithi (no Rikta/Amavasya), weekday, Kharmas, Guru/Shukra asta, and the person's own Tara and Chandra bala, and shows Abhijit time and Rahu Kaal for each date.
- **Premium Daily voice guidance:** a personal morning message (day rating, do's and don'ts, lucky colour, Rahu Kaal, Disha Shool, dasha, mantra) read aloud in Hindi or English.
- The AI features need `ANTHROPIC_API_KEY` (Step 9) and a logged-in Premium member; the server checks Premium itself.

## How to turn on Premium for testing and review
1. **In the preview / browser test link:** open **More → Premium** and tap **Turn Premium preview ON** (the yellow "For testing" box). Tap again to turn it off. This box only shows in the preview, or if you set `showPremiumTest: true` in `source/config.js`.
2. **In any build (hidden switch):** open **More → Family & account**, scroll to **About**, and tap the word **About** 7 times quickly. A message says "Premium preview turned ON". Repeat to turn it off. You can also add `#premium-demo` to the end of the website link.
3. **Real Premium on your server (needed for the AI Jyotishi and AI Life Report in the Android app):** log in with your own number, then send
   `curl -X POST https://jyotish-saathi-api.YOURNAME.workers.dev/api/admin/premium -H "content-type: application/json" -d '{"key":"YOUR_ADMIN_KEY","phone":"9876543210","days":30}'`
   Close and reopen the app; the crown turns on. Use the same command to gift Premium to testers.

## Accuracy features (built in)

- **Exact birthplace:** about 4,300 towns in India and Nepal, searchable in Hindi or English, with the state shown. Places not in the list can be entered by hand (latitude, longitude and time zone).
- **Old time zones:** births before 1956 automatically use the time zone in force then. That covers Bombay time (to 1955), Calcutta time (to 1947), WW2 war time (1942–45) and Nepal's change in 1986.
- **Unknown birth time:** houses are read from the Moon sign (Chandra Lagna), and the app says so. A warning also appears when the Lagna sits at the edge of a sign.
- **Kundli predictions:** they weigh each planet's sign strength, Navamsa (D9), vargottama, combustion, house placement and aspects (drishti). Marriage also uses the 7th lord and Venus in D9, and there's a D9 chart.
- **Manglik:** classical cancellations are checked (Mars in its own or exalted sign, Jupiter's aspect, and the exception signs for each house).
- **Kundli Milan:** uses the full standard Yoni table and shows Nadi and Bhakoot cancellations (parihara) and both-Manglik cancellation.
- **Daily reading:** combines the Moon's transit and tara with Jupiter and Saturn transits, the running dasha, the tithi and the weekday. It shows the top reasons ("▲ Jupiter favours you now").
- **AI palm reading:**
  - The app checks each photo for darkness and blur before sending.
  - It asks which hand the person writes with, and sends sharper 1200px photos.
  - The AI must say how clearly it sees each line (shown as "clearly visible / partly visible / faint").
  - Premium members get **Claude Sonnet 5.5**, the most accurate model, for 4 readings a month (`PREMIUM_BEST_PER_MONTH`). Free readings use Haiku. That's at most about ₹28 a month per Premium user.

## Updating the app later

1. Ask Claude for the change. You'll get new files for `source/`, `app/www/` and `website/`.
2. Replace the files in this folder. Then in GitHub Desktop, write a short note and click **Commit**, then **Push**.
3. GitHub builds a new version automatically. The version number goes up by itself.
4. Upload the new `.aab` to Play, or let Step 6 do it.

## Premium features and how to test them

Premium is fully built. Until payments are connected, it's **locked** for users, and the 👑 button shows "Price coming soon" with a **Notify me** option.

- **Family members:** free users can save **5** (self, spouse, children, parents). Premium is unlimited. Change `freeFamilyMembers` in `source/config.js`. Existing members are never removed; only adding a 6th asks for Premium.
- **Included in Premium now:** Kundli PDF download (saved or shared from the phone), spiritual guidance (soul planet, Nakshatra deity, beej mantras, fasting day, daan, meditation), the Shani Sade Sati and Dhaiya report, and a month-by-month forecast for the next 12 months.
- **AI features, shown as "Coming soon":** AI Jyotishi, AI palm scan, AI life report, AI compatibility, AI Muhurat finder and daily voice guidance. They're listed in the Premium screen so users know what's coming.
- **To preview Premium yourself:** in the app, go to **Family**, then tap the **"About the calculations"** heading **7 times**. Do the same again to switch it off. On the website version, you can also open `.../app/#premium-demo`.

## The "Ask Saathi" chatbot

The floating **🕉️ Ask Saathi** button opens a chat on every screen. It answers in Hindi, English or Hinglish from the person's own Kundli. It covers today and tomorrow, career, money, marriage, health, family, children, dasha, gemstone, colour, number, mantra, remedies, yogas, Manglik, Sade Sati, Rahu Kaal, Panchang, and vrat days like Ekadashi and Purnima. It works offline and is free. For questions outside these topics, it points to the coming **AI Jyotishi (Premium)**, which needs an online AI service and will be added with subscriptions.

## Camera for palm reading

- **In the Android app:** "Take photo" opens the phone's own camera, and "Choose from gallery" opens the photo picker. The first time, the phone asks for camera permission.
- **On the website:** a live camera opens with a palm outline to line up the hand. If the browser blocks the camera, the phone's camera or photo picker opens instead.
- **On the Play Console Data safety form:** the palm photo stays on the phone and is never uploaded, so photos are **not** collected.

## Adding subscriptions later (₹99 / ₹799)

The app already shows **₹99/month** and **₹799/year**. You can change these in `source/config.js`. In **Play Console → Monetize → Subscriptions**, create the same two plans. Google requires **Google Play Billing** for digital subscriptions. The usual route for this kind of app is RevenueCat (`@revenuecat/purchases-capacitor`). Set up the product in **Play Console → Monetize → Subscriptions**, then connect the Premium "Notify me" button to it. Update the privacy policy at the same time.

---

## Checklist

- [ ] Project on GitHub (Step 1)
- [ ] 4 signing secrets added (Step 2), and the key is backed up in 2 places
- [ ] Website live, with name and email filled into the privacy policy (Step 3)
- [ ] Test APK installed and checked on your phone (Step 4)
- [ ] Play developer account created (personal or organization)
- [ ] Store listing, content rating, data safety and privacy link done
- [ ] Closed test running with 12+ testers (personal accounts)
- [ ] Applied for production, then rolled out
- [ ] Play Store link added to the landing page
- [ ] (Optional) `ANTHROPIC_API_KEY` added for AI palm reading
- [ ] (Optional) Login server deployed, WhatsApp templates approved, `apiBase` set in `source/config.js`
