# 🎓 Uday's IELTS — AI Personal Tutor

A fully-featured, mobile-first IELTS preparation app powered by Claude AI. Includes AI Tutor, Mock Tests, Cambridge Sample Questions, Daily Quiz, Vocabulary, Grammar, and more.

---

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1 — Get a Free Anthropic API Key
1. Go to **https://console.anthropic.com**
2. Sign up / log in
3. Click **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`) — save it somewhere safe

---

### Step 2 — Upload to GitHub
1. Go to **https://github.com** → Sign in → click **"New repository"**
2. Name it `udays-ielts` → click **"Create repository"**
3. Upload all these files by dragging them into the GitHub page:
   - `vercel.json`
   - `package.json`
   - `.gitignore`
   - `api/chat.js`
   - `public/index.html`

   Or use Git:
   ```bash
   git init
   git add .
   git commit -m "Initial deploy"
   git remote add origin https://github.com/YOUR_USERNAME/udays-ielts.git
   git push -u origin main
   ```

---

### Step 3 — Deploy on Vercel
1. Go to **https://vercel.com** → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `udays-ielts` repository
4. Leave all settings as default — click **"Deploy"**
5. Wait ~30 seconds for the build to finish ✅

---

### Step 4 — Add Your API Key (Critical!)
1. In Vercel dashboard, go to your project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Set:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (your key from Step 1)
   - **Environment:** ✅ Production ✅ Preview ✅ Development
4. Click **Save**
5. Go to **Deployments** → click the three dots on your latest deployment → **"Redeploy"**

Your app is now live at `https://udays-ielts.vercel.app` 🎉

---

## 📁 Project Structure

```
udays-ielts/
├── api/
│   └── chat.js          ← Serverless function (keeps API key safe)
├── public/
│   └── index.html       ← The complete app
├── vercel.json          ← Vercel routing config
├── package.json
└── .gitignore
```

---

## 🔧 How It Works

```
Mobile Browser → /api/chat (Vercel serverless) → Anthropic API
                     ↑
              API key stored securely
              in Vercel environment variables
              (never exposed to browser)
```

---

## 💡 Opening as a Local File (Without Vercel)

If you just want to run it locally:
1. Open `public/index.html` in Chrome or Safari
2. Go to **⚙️ Settings** → scroll down to **🔑 API Key**
3. Paste your Anthropic API key and click **Save**
4. All AI features will work immediately

---

## 🛠️ Features

| Feature | Description |
|---|---|
| 🤖 AI Tutor | Chat, Writing Analysis, Speaking Simulation, Quick Tips |
| 📝 Mock Tests | 5 timed exams with AI examiner feedback |
| 🎓 Cambridge Samples | Real exam Q&As for all 4 skills + band-scored model answers |
| ✏️ Daily Quiz | 20 questions with explanations, tracked daily |
| 📚 Resources | 20 lessons across Reading, Writing, Speaking, Listening |
| 🔤 Vocabulary | Academic wordlists, collocations, flashcards |
| 📖 Grammar | 6 modules with examples and exercises |
| 📊 Analytics | Band score history, quiz trends, mock test results |
| 🗓️ Roadmap | 4-phase study plan with progress tracking |
| 🏆 Badges | 7 achievement badges to earn |

---

## ❓ Troubleshooting

**AI not responding?**
- Check Vercel dashboard → Functions tab → look for errors
- Verify `ANTHROPIC_API_KEY` is set correctly in Environment Variables
- Make sure you redeployed after adding the key

**App not loading?**
- Check `vercel.json` is in the root folder
- Check `public/index.html` exists
- Check Vercel build logs for errors

**CORS errors?**
- The `api/chat.js` already handles CORS — this shouldn't occur
- If it does, check your Vercel deployment region

---

Built with ❤️ for Uday's IELTS journey.
