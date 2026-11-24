# Jyotish Saathi v1.4 – Complete launch guide (Google Play)

Follow every step in order and tick the checklist at the end as you go. You don't need to write any code.
- **GitHub** builds the Android app and hosts the website (free).
- **Cloudflare** runs the small server (free).
- **Google Play** publishes the app.

**Timeline**

| Day | What happens |
|---|---|
| Day 1 (4–5 hours) | Phases 1–5: GitHub, website, server, WhatsApp, first build tested on your phone |
| Day 1–3 | Play Console account verified (Phase 6) |
| Day 3 | Closed test starts with your testers (Phase 7) |
| Day 3–17 | 14-day test. Meanwhile you set up payments (Phase 8) |
| Day 17 | Apply for production (Phase 9) |
| Day 18–24 | Google reviews it, and the app is live |

How each feature works, and which setting controls it, is in `FEATURES-AND-SETTINGS.md`.

---

## Before you start

### What you need
- A **laptop or computer** (Windows or Mac). GitHub Desktop doesn't run on a phone.
- An **Android phone**, for testing and for Google's device check.
- **One free Gmail address** for all the accounts, e.g. `jyotishsaathi.app@gmail.com`. Make it at https://accounts.google.com/signup → **For my personal use** → **Create your own Gmail address**. Turn on 2-step verification.
  - **Don't** take Google's "link a domain / buy a domain" offer during sign-up. That is **Google Workspace**, which charges ₹160–270 per user every month on top of the ₹860 domain. You don't need it.
- **The domain `jyotishsaathi.com`** (about ₹900 a year), bought on Cloudflare in Step 5. It also gives you a free `support@jyotishsaathi.com` address that forwards to your Gmail.
- **PAN card or Aadhaar** for Google's identity check.
- A **debit or credit card with international payments turned on** for Google's US $25 fee (about ₹2,200). Turn it on in your bank app under card settings → international usage.
- Your **WhatsApp Business number**. It must be a number you can receive an SMS or call on.
- A **bank account and PAN** for Razorpay (Phase 8).

### Your files
| File | What it is | What to do |
|---|---|---|
| `JyotishSaathi-Project.zip` | The whole project | Unzip it and put it on GitHub (Step 1) |
| `SIGNING-KEY-KEEP-SAFE.zip` | Your app signing key and its passwords | **Never put this on GitHub or inside the project folder.** Save copies to Google Drive and a pen drive |
| `Store-Graphics.zip` | Play Store icon, feature graphic and 8 screenshots (the same as `store-assets/`) | Upload them to Play Console (Step 17) |

Inside the project:

| Folder or file | What it is |
|---|---|
| `source/config.js` | **The app settings you'll change** (server address, WhatsApp number, prices) |
| `backend/wrangler.toml` | Server settings, and the prices actually charged |
| `store-assets/store-listing.md` | Play listing text in Hindi and English, and every Play form answer |
| `website/` | Landing page, browser app, and the privacy, terms, refund, contact and delete-account pages |
| `app/` | The Android project. GitHub builds it; you never touch it |
| `.github/workflows/` | The 3 automations: **Build Android app**, **Publish website**, **Deploy login server** |

### Keep a notes file
Open a private note (Google Keep or Notes) titled **"Jyotish Saathi – keys"**. Every time this guide says "write down", put it there. **Never share this note with anyone.**

---

# Phase 1 – GitHub (about 30 minutes)

## Step 1 – Create a GitHub account
1. Open https://github.com/signup on your computer.
2. Enter your Gmail address, a password and a username (e.g. `jyotishsaathi`). **Write down the username**; you'll use it in links.
3. Verify the email with the code GitHub sends.
4. Choose the **Free** plan.

## Step 2 – Put the project on GitHub
1. Download and install **GitHub Desktop** from https://desktop.github.com, then sign in with your GitHub account.
2. Unzip `JyotishSaathi-Project.zip`, for example into `Documents`. You get a folder called `JyotishSaathi`. Check that it contains `source`, `app`, `website`, `backend`, `store-assets` and `START-HERE.md`.
3. The `.github` folder is hidden but must be there:
   - Windows: in File Explorer, go to **View → Show → Hidden items**.
   - Mac: press Cmd + Shift + . (dot) in Finder.
4. In GitHub Desktop, go to **File → Add local repository → Choose…** and pick the `JyotishSaathi` folder. It says "This directory does not appear to be a Git repository". Click **create a repository**.
5. Set Name: `jyotish-saathi`. Leave everything else as it is, then click **Create repository**.
6. Click **Publish repository** at the top.
   - **Untick "Keep this code private"**. The free website hosting needs a public repository, and nothing secret is in the folder.
   - Click **Publish repository**.
7. Check on github.com: open `https://github.com/YOUR-USERNAME/jyotish-saathi`. You should see the folders, including `.github`.

## Step 3 – Add the signing key as GitHub secrets
1. Unzip `SIGNING-KEY-KEEP-SAFE.zip` **outside** the project folder, e.g. on the Desktop. Open `READ-ME-FIRST.txt`.
2. On github.com, open your repository, then go to **Settings** (top tab) → **Secrets and variables** (left menu) → **Actions** → **New repository secret**.
3. Add these 4 secrets one by one. Type the Name exactly, paste the Secret, then click **Add secret**.

| Name | Secret |
|---|---|
| `KEYSTORE_BASE64` | open `KEYSTORE_BASE64.txt`, select all (Ctrl+A), copy, paste |
| `KEYSTORE_PASSWORD` | the keystore password from READ-ME-FIRST.txt |
| `KEY_ALIAS` | `upload` |
| `KEY_PASSWORD` | the key password from READ-ME-FIRST.txt |

4. Copy the whole `SIGNING-KEY-KEEP-SAFE` folder to Google Drive and a pen drive. **Without this key you can never update the app.**

---

# Phase 2 – Website (about 30 minutes)

## Step 4 – Fill in your details on the website pages
On github.com, open each file below. Click the ✏️ pencil (top right of the file), replace the text in square brackets, then click **Commit changes… → Commit changes**.

| File | Replace |
|---|---|
| `website/privacy-policy.html` | `[YOUR NAME / COMPANY NAME]` (your name or #HASHTAGGED) |
| `website/terms.html` | name, `[YOUR CITY, STATE]` (e.g. Bengaluru, Karnataka) |
| `website/refund-policy.html` | `[YOUR WHATSAPP NUMBER]` (e.g. +91 98765 43210) |
| `website/contact.html` | name, WhatsApp number, city and state |
| `website/delete-account.html` | WhatsApp number |

The email `support@jyotishsaathi.com` is already filled in everywhere (it starts working in Step 5). Tip: press Ctrl+F in the editor to find each remaining `[YOUR` placeholder.

## Step 5 – Buy jyotishsaathi.com, connect it, and turn on the website

**A. Buy the domain on Cloudflare** (about ₹900 a year at cost price, no Workspace needed)
1. Sign up at https://dash.cloudflare.com/sign-up with your Gmail and verify the email. You use this same account for the server in Step 6.
2. In the left menu, go to **Domain Registration → Register Domains**, search `jyotishsaathi.com`, and click **Purchase**.
3. Fill in the contact details (your name and address; Cloudflare hides them from the public). Pay with your card (international payments on). Untick auto-renew only if you're sure you want it to expire later; **leave it on**.
4. After a few minutes, `jyotishsaathi.com` appears under **Websites** (or **Domains**) in your Cloudflare dashboard.

*(If it's no longer available on Cloudflare, buy it from GoDaddy or Hostinger, or Squarespace directly, then in Cloudflare go to **Add a domain**, choose the Free plan, and change the nameservers at the seller to the two Cloudflare shows.)*

**B. Point the domain at your GitHub website**
1. In Cloudflare, click `jyotishsaathi.com` → **DNS → Records → Add record** and add these 5 records. For each one, set **Proxy status** to **DNS only** (grey cloud, not orange), so GitHub can make the HTTPS certificate.

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

2. On github.com, open your repository and go to **Settings → Pages**:
   - **Source:** GitHub Actions
   - **Custom domain:** type `jyotishsaathi.com` → **Save**. Wait until it shows "DNS check successful" (a few minutes to an hour).
   - Tick **Enforce HTTPS** once you can (up to 24 hours for the certificate).
3. Go to the **Actions** tab. If asked, click **I understand my workflows, go ahead and enable them**. Then click **Publish website → Run workflow → Run workflow** and wait for the green tick.
4. Open https://jyotishsaathi.com. Your landing page should appear. Write down:
   - Privacy: `https://jyotishsaathi.com/privacy-policy.html`
   - Delete account: `https://jyotishsaathi.com/delete-account.html`
   - Browser app: `https://jyotishsaathi.com/app/`
5. Open the privacy link on your phone and check that your name and email show correctly.

**C. Free `support@jyotishsaathi.com` email (forwards to your Gmail)**
1. In Cloudflare, click `jyotishsaathi.com` → **Email → Email Routing → Get started / Enable**. Click **Add records and enable** so Cloudflare adds the mail records by itself.
2. Go to **Routing rules → Create address**. Custom address: `support`, Action: **Send to an email**, Destination: your Gmail. Click **Save**.
3. Open the verification email in your Gmail and click **Verify email address**.
4. Test it: from another email account, send a mail to `support@jyotishsaathi.com`. It should arrive in your Gmail.
5. *(Optional: reply as support@)* In Gmail, go to **Settings → See all settings → Accounts → Send mail as → Add another email address**:
   - Name `Jyotish Saathi`, address `support@jyotishsaathi.com`, untick "Treat as alias"
   - SMTP server `smtp.gmail.com`, port `587`, username = your Gmail, password = a **Google App password** (Google Account → Security → 2-Step Verification → App passwords)
   - Click **Add account** and confirm the code that arrives.

---

# Phase 3 – Server (about 30 minutes)

## Step 6 – Deploy the server on Cloudflare
1. Log in to the Cloudflare account you made in Step 5.
2. In the left menu, click **Workers & Pages**. If it asks you to pick a subdomain, choose one (e.g. `jyotishsaathi`). **Write down the Account ID** shown on the right side of that page.
3. Click the person icon (top right) → **My Profile → API Tokens → Create Token**. Next to **Edit Cloudflare Workers**, click **Use template**, then **Continue to summary → Create Token**. **Copy the token** (it's shown only once) and write it down.
4. Add these 4 GitHub secrets (Settings → Secrets and variables → Actions → New repository secret):

| Name | Secret |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token |
| `CLOUDFLARE_ACCOUNT_ID` | the Account ID |
| `ADMIN_KEY` | make up a strong password, e.g. `Js!2026-kM8q-Ra41`. It opens your contacts and sales, so keep it private. **Write it down** |
| `OTP_SECRET` | 40 random letters and numbers (mash the keyboard). Write it down |

5. Go to **Actions → Deploy login server → Run workflow → Run workflow**. Wait for the green tick (about 2 minutes).
6. Click the finished run → **deploy** → open the **Deploy to Cloudflare Workers** step. Near the bottom is an address like `https://jyotish-saathi-api.jyotishsaathi.workers.dev`. **Write it down**: this guide calls it **"your server"**.
7. Open `your server/api/health` in your browser. You should see `"ok":true`.

## Step 7 – Turn on the AI features (palm reading, AI Jyotishi, Life Report, marriage match)
1. Sign up at https://console.anthropic.com.
2. Go to **Settings → Billing**, add a card and buy a small credit to start (e.g. US $10).
3. Go to **Settings → Limits** and set a **monthly spend limit** (e.g. US $25). The server also limits each user, so normal use costs much less.
4. Go to **API keys → Create key**, name it `jyotish-saathi`, and copy the key (shown once).
5. Add the GitHub secret `ANTHROPIC_API_KEY` with that key.
6. Go to **Actions → Deploy login server → Run workflow**. After it's green, `your server/api/health` shows `"palmAI":true`.

## Step 8 – Natural Indian voice (recommended)
Without this, the Hindi rashifal and kathas still play in Saathi's recorded voice, and other text uses the phone's voice.
1. Go to https://console.cloud.google.com and sign in with the same Gmail.
2. Use the project picker (top left) → **New project**, name it `jyotish-saathi`, and click **Create**. Make sure it's selected.
3. Go to **Billing** (left menu) and link a billing account (card). A small app stays within the free monthly allowance.
4. In the top search bar, type **Cloud Text-to-Speech API**, open it and click **Enable**.
5. Go to **APIs & Services → Credentials → + Create credentials → API key** and copy the key.
6. Click the key's name → **API restrictions → Restrict key** → tick **Cloud Text-to-Speech API** → **Save**.
7. Add the GitHub secret `GOOGLE_TTS_KEY` and run **Deploy login server** again. Health now shows `"indianVoice":true`.

---

# Phase 4 – WhatsApp (about 1 hour, plus Meta approval)

## Step 9 – Connect your WhatsApp Business number
1. Go to https://developers.facebook.com and log in with your Facebook account. Click **Get started** and verify your account if asked.
2. Go to **My Apps → Create app**. Choose the use case **Connect with customers through WhatsApp** (or type **Business**), name it `Jyotish Saathi`, pick or create your **Business portfolio**, and click **Create app**.
3. In the app's left menu, go to **WhatsApp → API Setup**.
   - Click **Add phone number** and add your business number with the display name `Jyotish Saathi`. Verify it with the SMS or call code.
   - To keep using the **WhatsApp Business app** on that number, choose the "coexistence" option (connect an existing WhatsApp Business app) when it's offered.
   - **Write down the Phone number ID** shown on API Setup.
4. **Permanent token:**
   1. Open https://business.facebook.com → **Settings → Users → System users → Add**. Name it `jyotish-server` with role **Admin**.
   2. Click it → **Assign assets → Apps →** `Jyotish Saathi` → **Full control** → **Save**.
   3. Click **Generate token**, choose the app, set expiry **Never**, and tick `whatsapp_business_messaging` and `whatsapp_business_management`.
   4. Click **Generate** and copy the token. Write it down.
5. Back in the developer app, go to **App settings → Basic**. Next to **App secret**, click **Show** and copy it.
6. Add these 5 GitHub secrets, then run **Deploy login server**:

| Name | Secret |
|---|---|
| `WA_TOKEN` | the permanent token |
| `WA_PHONE_ID` | the Phone number ID |
| `WA_BUSINESS_NUMBER` | your number with 91 in front, digits only, e.g. `919876543210` |
| `WA_VERIFY_TOKEN` | any word you choose, e.g. `jyotish2026` |
| `WA_APP_SECRET` | the App secret |

7. **Webhook.** Go to **WhatsApp → Configuration → Webhook → Edit**:
   - Callback URL: `your server/api/whatsapp/webhook` (e.g. `https://jyotish-saathi-api.jyotishsaathi.workers.dev/api/whatsapp/webhook`)
   - Verify token: exactly the same word as `WA_VERIFY_TOKEN`
   - Click **Verify and save**. Then, under **Webhook fields**, click **Manage** and **Subscribe** to **messages**.
8. **Publish the Meta app.** At the top of the app dashboard, switch **App mode** from Development to **Live** (it may ask for your privacy policy link from Step 5).
9. **Check it:**
   - `your server/api/health` shows `"whatsappLogin":true`.
   - From your own phone, send the word **Rashifal** to the business number. Today's rashifal should come back within a few seconds.
10. **Business verification:** in business.facebook.com, go to **Settings → Business info → Start verification** (or Security centre), and upload a document with your name and address (PAN, GST or a utility bill). Until you're verified, Meta limits how many people you can message per day.

## Step 10 – Daily 7 am rashifal template (Premium feature)
1. Go to https://business.facebook.com/wa/manage/message-templates → **Create template**.
2. Category: **Utility**. Name: `daily_rashifal`. Language: **English**.
3. Body: `Namaste {{1}} 🙏 Aaj ka rashifal: {{2}}`. Sample values: `{{1}}` = `Sneha`, `{{2}}` = `Aaj ka din shubh hai, naye kaam ki shuruaat karein.`
4. Click **Submit**. Then add a **Hindi** version with the same name: open the template → **Add language → Hindi** → same body → Submit.
5. Approval takes from a few minutes to a day (you'll get an email). When it's approved, open `backend/wrangler.toml` on github.com → ✏️, find `DAILY_TEMPLATE = ""`, change it to `DAILY_TEMPLATE = "daily_rashifal"`, and **Commit**. The server redeploys by itself.

---

# Phase 5 – App settings and the first build (about 1 hour)

## Step 11 – Edit `source/config.js`
On github.com, open `source/config.js` → ✏️ and change only these lines. Keep the quotes and the comma at the end of each line.

| Line | Change to |
|---|---|
| `apiBase: '',` | `apiBase: 'https://jyotish-saathi-api.YOURNAME.workers.dev',` (your server, no `/` at the end) |
| `whatsappNumber: '',` | `whatsappNumber: '919876543210',` |
| `siteUrl: 'https://jyotishsaathi.com',` | **already set**; just check https://jyotishsaathi.com opens before you build (Step 5) |
| `showPremiumTest: false,` | leave it `false` |
| `appLink: '',` | leave it for now (Step 23) |
| `reviewers: [],` | leave it empty. Only add a **real** pandit who has checked the app and agreed to be named |

Leave the prices as they are. They must match `backend/wrangler.toml` and Play Console, so if you change one you must change all three.

Click **Commit changes**. This starts the **Build Android app** and **Publish website** automations by themselves.

## Step 12 – Build the app
1. Go to **Actions → Build Android app**. Wait for the run started by your commit to turn green (8–12 minutes).
   - For a named version, click **Run workflow** and set **version_name** to `1.4`. Leave the upload option at **no**.
2. Open your repository's main page and click **Releases** (right side). The newest release has two files:
   - `JyotishSaathi-test-vN.apk` – for installing on your phone
   - `JyotishSaathi-vN.aab` – for Google Play. **Download this to your computer.**
3. If the build turns ❌ red, click it, click the red step, copy the last red lines, and send them to Claude.

## Step 13 – Install the test app
1. On your Android phone, open the Releases page in Chrome and tap the `.apk` file.
2. If asked, allow Chrome to **install unknown apps**, then tap **Install**. If Play Protect warns you, choose **More details → Install anyway**. This is normal for test files.

## Step 14 – Test everything (about 30 minutes; use 2 phones if you can)
- [ ] Log in with WhatsApp. WhatsApp opens; send the message; the app logs in, and you get "Namaste … welcome"
- [ ] Home: today's card, the **Suno** button (try male, female and slow in Settings), next festival
- [ ] Make your Kundli and compare it with a paper kundli you trust. Open the **Our method** tab
- [ ] Panchang, Tyohar calendar, a vrat katha with sound, Jaap counter
- [ ] Kundli Milan, Vastu compass, Temples near me (the route opens Google Maps)
- [ ] Palm reading with both hands
- [ ] Ask by voice: "kal ka din kaisa hai" (allow the microphone)
- [ ] Share card to WhatsApp; add the home-screen widget
- [ ] Baby names: add a baby and switch letters
- [ ] Premium test: send yourself 30 days of Premium:
  1. Open https://reqbin.com. Choose **POST** and enter `your server/api/admin/premium`.
  2. In **Content**, choose **JSON** and enter `{"key":"YOUR_ADMIN_KEY","phone":"9876543210","days":30}`, then click **Send**.
  3. Reopen the app: the 👑 is on. Check that the AI Jyotishi and Life Report work.
- [ ] Turn on **More → WhatsApp rashifal**. The next morning at 7 am the message arrives (needs Step 10)
- [ ] Open `your server/api/admin/stats?key=YOUR_ADMIN_KEY`: you see your opens and no errors

If something is wrong, send Claude what you tapped, what happened and a screenshot. Then repeat Steps 12–14 with the fixed files.

---

# Phase 6 – Google Play Console (about 2 hours, plus 1–3 days of checks)

## Step 15 – Create your developer account
1. Open https://play.google.com/console/signup on your computer with your Gmail.
2. Choose **Yourself** (a **personal** account).
3. Fill in:
   - **Developer name:** shown on Play, e.g. `Jyotish Saathi` or your name
   - **Legal name and address:** exactly as on your PAN or Aadhaar
   - **Contact email and phone:** shown privately to Google; verify both with the OTP codes
   - **Developer email:** shown to users: `support@jyotishsaathi.com` (Play sends a code to it; it arrives in your Gmail)
4. Answer the experience questions honestly ("first app", etc.).
5. Pay **US $25** with your card (international payments on).
6. **Identity check:** upload a clear photo of your PAN or Aadhaar when asked. This usually takes 1–3 days, and you'll get an email.
7. **Device check:** install the **Google Play Console** app on your Android phone, sign in with the same Gmail, and follow the prompt to verify the device.

## Step 16 – Create the app
1. In Play Console, click **Create app**.
2. Fill in:
   - **App name:** `Jyotish Saathi: Kundli & Rashifal`
   - **Default language:** Hindi – हिन्दी (or English (United States))
   - **App or game:** App
   - **Free or paid:** Free (Premium is sold inside the app)
3. Tick the two declarations (Developer Program Policies and US export laws), then click **Create app**.

## Step 17 – Store listing
1. Go to **Grow users → Store presence → Main store listing**. Open `store-assets/store-listing.md`, then copy:
   - **App name:** `Jyotish Saathi: Kundli & Rashifal`
   - **Short description** (max 80 characters) and **Full description**
2. Graphics (from `Store-Graphics.zip`):
   - **App icon:** `icon-512.png`
   - **Feature graphic:** `feature-graphic-1024x500.png`
   - **Phone screenshots:** all 8 `screen-*.png`, in order
3. Click **Save**.
4. For a Hindi and English listing, go to **Manage translations → Add your own translation**, add the other language, and paste that text from `store-listing.md`.
5. Go to **Store settings**:
   - **App category:** Lifestyle
   - **Tags:** Astrology, Lifestyle
   - **Contact details:** email `support@jyotishsaathi.com`, website `https://jyotishsaathi.com`
   - **Save**

## Step 18 – App content (Policy and programs → App content)
Click each item, answer it, and **Save**. Every answer is in `store-assets/store-listing.md`.

| Item | Answer |
|---|---|
| Privacy policy | your privacy link from Step 5 |
| App access | **All functionality is available without any access restrictions**. Login is by WhatsApp; reviewers can use the app without Premium |
| Ads | **No, my app does not contain ads** |
| Content rating | Start questionnaire → email → category **All other app types** → answer **No** to violence, sexual content, language, controlled substances, gambling and user-to-user sharing (WhatsApp sharing is the phone's own share sheet, not chat inside the app) → Submit |
| Target audience and content | **18 and over** only. Answer **No** to "appeals to children" |
| Data safety | Copy exactly from `store-listing.md`: collected (not shared) name, phone number, photos (processed ephemerally), purchase history, app interactions, crash logs; encrypted in transit **Yes**; deletion request **Yes**, with the delete-account link from Step 5 |
| Government apps | No |
| Financial features | **My app doesn't provide any financial features** |
| Health | No health features |
| Advertising ID | **No** (the app doesn't use it) |
| News app | No |

If Play asks for a **permission declaration** (camera, microphone, location or notifications), say what each is for: camera for palm photos, microphone for "Ask by voice", location for temples near you and the Sun compass check (only on the phone, never sent), notifications for rashifal and vrat reminders.

---

# Phase 7 – Closed test with 12+ testers for 14 days

## Step 19 – Line up your testers
- Ask **20 people** (not just 12): family, friends, clients, followers. Each needs an Android phone and a **Gmail** address.
- Collect their Gmail addresses in a list. Testers who signed up only with an Apple ID or a work email can't join.
- Tell them three things:
  - "Open the link and tap **Become a tester**, then install from Play."
  - "Don't uninstall for 14 days."
  - "Open it every day or two and send me feedback."
- **If fewer than 12 are signed up on any day, the 14 days start again.** That's why you ask 20.

## Step 20 – Start the closed test
1. Go to **Test and release → Testing → Closed testing**. Next to the track named **Closed testing (Alpha)**, click **Manage track**.
2. **Countries / regions** tab → **Add countries** → tick **India** (add others if you like) → **Save**.
3. **Testers** tab → **Create email list**. Name it `Jyotish testers` and paste all the Gmail addresses, separated by commas. Click **Save changes**, tick the list, and click **Save**.
4. In **Feedback URL or email address**, enter your email.
5. Click **Create new release**:
   - **Play App Signing:** click **Continue** (keep it on; it's the default).
   - **App bundles:** upload `JyotishSaathi-vN.aab` from Step 12.
   - **Release name:** `1.4 test`. **Release notes:** `<hi-IN>पहला टेस्ट</hi-IN><en-US>First test version</en-US>`
   - **Next → Save → Send for review** (on the Publishing overview page, click **Send changes for review**).
6. Google checks the test release (a few hours to 2 days). When it's ready, the Testers tab shows the **opt-in link**. Copy it.
7. Send testers this message on WhatsApp with the link:
   > Namaste 🙏 I've made an astrology app, Jyotish Saathi. Please help me test it for 14 days. 1) Open this link on your Android phone with your Gmail: [LINK] 2) Tap "Become a tester" 3) Tap "Download it on Google Play" and install. Please don't uninstall for 14 days, and tell me anything that doesn't work. Thank you!
8. **Every 2–3 days**, check the number of testers in **Closed testing → Testers**. If someone drops out, add a new Gmail address right away.
9. **Setup → License testing:** add your own Gmail, then **Save**. This lets you test payments for free (Step 22).

---

# Phase 8 – Payments (do this during the 14 days)

## Step 21 – Razorpay (payments on the website)
1. Sign up at https://razorpay.com → **Sign up**, using your email and phone.
2. Complete KYC:
   - Business type: **Individual / Proprietorship**
   - PAN and bank account
   - Website: `https://jyotishsaathi.com`. Razorpay checks the terms, refund and contact pages there.
   - Business category: **Services → Other services** (or Astrology/Spiritual if it's listed)
3. While you wait for activation, test in **Test mode**:
   1. **Account & Settings → API Keys → Generate Test Key**. Copy the Key ID and Key Secret.
   2. Add the GitHub secrets `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
4. **Webhook.** Go to **Account & Settings → Webhooks → + Add new webhook**:
   - URL: `your server/api/pay/webhook`
   - Secret: a word you choose. Add the same word as the GitHub secret `RAZORPAY_WEBHOOK_SECRET`
   - Active events: tick **payment.captured**
   - Click **Create webhook**
5. Run **Deploy login server**. Health shows `"razorpay":true`.
6. **Test:**
   1. Open the browser app from Step 5 and log in.
   2. Go to **👑 Premium → Continue**, choose UPI and enter `success@razorpay`.
   3. The crown should turn on.
7. **When Razorpay activates your account (Live mode):**
   1. Generate **Live** keys, then replace `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with them. (Open the secret → **Update**.)
   2. Add the same webhook again in Live mode with the same secret word.
   3. Run **Deploy login server**.

## Step 22 – Google Play Billing (payments in the Android app)
Google requires its own billing inside Play apps. You can only create products **after** the first `.aab` is uploaded (Step 20). You may also need to set up a **payments profile** first: go to **Monetize with Play → Payments profile**, add your bank account and PAN, and Google may ask for GST details.

1. **Subscriptions.** Go to **Monetize with Play → Products → Subscriptions → Create subscription**. For each row:
   - Enter the **Product ID** and name, then click **Create**.
   - Click **Add base plan**, set the **Base plan ID**, choose **Auto-renewing**, and set the billing period.
   - Under **Set prices**, set the **India** price (other countries can be set automatically), click **Save**, then **Activate**.

| Product ID | Name | Base plan ID | Period | Price |
|---|---|---|---|---|
| `premium_monthly` | Premium (monthly) | `monthly` | 1 month | ₹99 |
| `premium_yearly` | Premium (yearly) | `yearly` | 1 year | ₹499 |
| `parivaar_monthly` | Parivaar plan (monthly) | `monthly` | 1 month | ₹149 |
| `parivaar_yearly` | Parivaar plan (yearly) | `yearly` | 1 year | ₹799 |

   (Optional: add a 7-day free-trial **offer** on premium_monthly.)

2. **One-time products.** Go to **Monetize with Play → Products → In-app products** (or **One-time products**) → **Create product**. For each, enter the ID, name, description and India price, then **Save → Activate**.

| Product ID | Name | Price |
|---|---|---|
| `report_year` | Year-ahead report | ₹99 |
| `muhurat_pack` | Shubh muhurat list | ₹51 |
| `naamkaran_full` | All baby names | ₹49 |
| `gift_month` | Gift Premium – 1 month | ₹99 |
| `gift_year` | Gift Premium – 1 year | ₹499 |

3. **Let your server check purchases:**
   1. In Google Cloud (same project as Step 8), search for **Google Play Android Developer API** and click **Enable**.
   2. Go to **IAM & Admin → Service accounts → + Create service account**. Name it `play-checker`, then **Create and continue → Done** (no roles needed).
   3. Click it → **Keys → Add key → Create new key → JSON → Create**. A `.json` file downloads.
   4. Open the file and copy its email, which looks like `play-checker@jyotish-saathi.iam.gserviceaccount.com`.
   5. In Play Console, go to **Users and permissions → Invite new users**. Paste that email, then go to **App permissions → Add app → Jyotish Saathi** and tick **View financial data** and **Manage orders and subscriptions**. Click **Invite user**.
   6. Open the `.json` file in Notepad, select all, copy, and add it as the GitHub secret `PLAY_SA_JSON`.
   7. Run **Deploy login server**. Health shows `"playBilling":true`.
4. **Test:** on your phone, uninstall the test APK, then install the app from the **opt-in link** (Step 20) using your licence-tester Gmail. Buy Premium. It says "Test card, always approves", no money is taken, and the crown turns on.

## Step 23 (optional) – Automatic uploads to Play
Saves you downloading and uploading the `.aab` by hand for every update.
1. In Play Console, go to **Users and permissions**, open `play-checker`, and also tick **Release to testing tracks** and **Release apps to production**.
2. Add the same JSON again as the GitHub secret `PLAY_SERVICE_ACCOUNT_JSON`.
3. From then on, go to **Actions → Build Android app → Run workflow**, set the version (1.5, 1.6…) and choose **closed-testing** or **production**. It builds and uploads by itself.

---

# Phase 9 – Go live

## Step 24 – Apply for production (Day 17 or later)
1. Make sure **at least 12 testers have been signed up for 14 days in a row**. The Dashboard shows a progress bar.
2. Go to **Dashboard → Apply for production**. Answer honestly:
   - **How did you recruit testers?** "Family, friends and clients."
   - **How did they use the app?** "Daily rashifal, kundli, panchang, palm reading."
   - **What feedback did you get, and what did you change?** Mention 2–3 real fixes or improvements.
   - **Is it ready?** Yes.
3. Google replies within about 7 days.

## Step 25 – Release to everyone
1. Go to **Test and release → Production → Countries / regions → Add countries** → India → **Save**.
2. Click **Create new release** and upload the **latest** `.aab`. Build a fresh one with version `1.4` (Step 12) if you've made fixes.
3. Release notes: `<hi-IN>पहला संस्करण – कुंडली, राशिफल, पंचांग, हस्तरेखा</hi-IN><en-US>First release – Kundli, Rashifal, Panchang, Palm reading</en-US>`
4. **Next → Save → Send changes for review → Start rollout to Production (100%)**.
5. Review takes 1–7 days. You'll get an email when the app is live.

## Step 26 – After the app is live
1. Copy the Play link: `https://play.google.com/store/apps/details?id=com.jyotishsaathi.app`.
2. On github.com, set:
   - `source/config.js`: `appLink: 'https://play.google.com/store/apps/details?id=com.jyotishsaathi.app',` (share cards and WhatsApp messages carry it)
   - `website/index.html`: `playStoreUrl: '…same link…',` (the website buttons change from "Coming soon" to Download)
3. Commit. Upload the new `.aab` to Production as an update (Step 25), or use Step 23.
4. If you're using live Razorpay keys, check Step 21.7 is done.
5. Put the website link in your Instagram and Facebook bios and start the reels and Meta ads.
6. Thank your testers, and ask them to leave an honest Play rating. **Never write fake reviews.**

---

## Every GitHub secret in one place

| Secret | Step | Needed? |
|---|---|---|
| `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD` | 3 | Yes |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `ADMIN_KEY`, `OTP_SECRET` | 6 | Yes |
| `ANTHROPIC_API_KEY` | 7 | Yes, for the AI features |
| `GOOGLE_TTS_KEY` | 8 | Recommended |
| `WA_TOKEN`, `WA_PHONE_ID`, `WA_BUSINESS_NUMBER`, `WA_VERIFY_TOKEN`, `WA_APP_SECRET` | 9 | Yes, for WhatsApp login |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` | 21 | For website payments |
| `PLAY_SA_JSON` | 22 | For Android payments |
| `PLAY_SERVICE_ACCOUNT_JSON` | 23 | Optional |

**After adding or changing any server secret, run Actions → Deploy login server.** When everything is set up, `your server/api/health` shows `whatsappLogin`, `palmAI`, `indianVoice`, `razorpay`, `playBilling` and `dailyWhatsApp` all `true`.

## Your admin links (keep them private)
- **Contacts list (CSV):** `your server/api/admin/users.csv?key=ADMIN_KEY`. **Only send marketing to people marked `yes` for WhatsApp updates.**
- **Usage and sales:** `your server/api/admin/stats?key=ADMIN_KEY`
- **Give Premium:** POST `{"key":"ADMIN_KEY","phone":"98…","days":30}` to `your server/api/admin/premium` (use reqbin.com as in Step 14)
- **Delete an account** (when someone asks through the delete-account page, within 30 days): POST `{"key":"ADMIN_KEY","phone":"98…"}` to `your server/api/admin/delete-user`, then reply to the user to confirm

## Running costs at 1,000 users a month
| Item | Cost |
|---|---|
| GitHub, Cloudflare, website, WhatsApp login and replies | ₹0 |
| AI (palm, marriage match, Jyotishi, reports) | about ₹900–1,500 |
| Google voice | ₹0 within the free allowance |
| Daily WhatsApp template (Premium only) | about ₹0.12–0.20 per message |
| Google Play's share / Razorpay fee | 15% / about 2% of sales |

## Updating the app later
1. Ask Claude for the change. You'll get new files; replace them in your `JyotishSaathi` folder.
2. In GitHub Desktop, type a short note (e.g. "fix panchang"), then click **Commit to main** and **Push origin**.
3. The website and server update by themselves, and **Build Android app** runs. For a store update, click **Run workflow** with a new version name (1.5, 1.6…).
4. In Play Console, go to **Production → Create new release**, upload the new `.aab`, then **Send for review** (or use Step 23).

## If something goes wrong
| Problem | Fix |
|---|---|
| A build is ❌ red | Open the run, click the red step, copy the red lines and send them to Claude |
| `/api/health` shows something `false` | That secret is missing or misspelt. Add it again and rerun **Deploy login server** |
| WhatsApp login doesn't reply | Is the webhook subscribed to **messages**? Does the verify token match exactly? Is the Meta app **Live**? |
| Paid but no crown | Check the Razorpay webhook URL and secret. Give Premium by hand meanwhile (admin link) |
| Play test purchase fails | Install from the opt-in link (not the APK), and check your Gmail is under License testing |
| Tester can't see the app | They must open the opt-in link **with the same Gmail** you added, and tap Become a tester |
| Fewer than 12 testers | Add more Gmail addresses at once. The 14 days restart if the count drops below 12 |
| Play rejects the app | Copy the email text and send it to Claude; most fixes are small |
| Lost the signing key | Play Console → **Test and release → App integrity → Request upload key reset** |

---

## Checklist
- [ ] 1 GitHub account created; username written down
- [ ] 2 Project published on GitHub (public), with the `.github` folder
- [ ] 3 Four signing secrets added; key backed up in 2 places
- [ ] 4 Name, WhatsApp number and city filled into the 5 website pages
- [ ] 5 jyotishsaathi.com bought on Cloudflare; DNS records added; https://jyotishsaathi.com opens with HTTPS; support@ email forwards to Gmail
- [ ] 6 Server deployed; health shows ok; "your server" address written down
- [ ] 7 `ANTHROPIC_API_KEY` added; spend limit set
- [ ] 8 `GOOGLE_TTS_KEY` added
- [ ] 9 WhatsApp connected, webhook verified, Meta app Live, "Rashifal" reply works, business verification started
- [ ] 10 `daily_rashifal` approved (English + Hindi); `DAILY_TEMPLATE` set
- [ ] 11 `apiBase`, `whatsappNumber`, `siteUrl` set in config.js
- [ ] 12 Build green; `.aab` downloaded
- [ ] 13 Test APK installed
- [ ] 14 Phone test list all ticked
- [ ] 15 Play personal account paid; identity and device verified
- [ ] 16 App created
- [ ] 17 Store listing, graphics and store settings saved
- [ ] 18 All App content items done
- [ ] 19 20 testers' Gmail addresses collected
- [ ] 20 Closed test live; opt-in link sent; 12+ testers signed up; you're a licence tester
- [ ] 21 Razorpay test payment works; Live keys swapped in after activation
- [ ] 22 Play products active; `PLAY_SA_JSON` added; test purchase works
- [ ] 24 14 days completed; applied for production; approved
- [ ] 25 Production release rolled out
- [ ] 26 `appLink` and `playStoreUrl` set; bio links updated; ads started
