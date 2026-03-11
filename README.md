# 🎓 Uday's IELTS — AI Personal Tutor (100% FREE)

Uses Google Gemini AI — completely free, no credit card needed.
Free tier: 1,500 AI requests per day.

## 📁 File Structure

```
├── api/
│   └── chat.js      ← AI proxy (serverless)
├── index.html       ← the full app
├── vercel.json      ← Vercel config
├── package.json
└── .gitignore
```

---

## 🚀 Deploy in 3 Steps

### Step 1 — Get FREE Gemini API Key (no credit card!)
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" → copy it (starts with AIza...)

### Step 2 — Upload to GitHub
1. github.com → New repository → name: udays-ielts → Create
2. Click "uploading an existing file"
3. Drag ALL files from this ZIP into GitHub (including the api/ folder)
4. Click "Commit changes"

### Step 3 — Deploy on Vercel + Add API Key
1. vercel.com → Sign in with GitHub → Add New Project → Import udays-ielts
2. Leave ALL settings default → Deploy
3. After deploy: Settings → Environment Variables → Add New:
   - Key:   GEMINI_API_KEY
   - Value: AIza... (your key from Step 1)
   - Check: ✅ Production ✅ Preview ✅ Development
4. Save → Deployments → ... → Redeploy

✅ AI is now FREE and working!

---

## 💡 Running Locally (Without Vercel)
1. Open index.html in Chrome/Safari
2. Go to ⚙️ Settings → add your Gemini API key → Save
3. AI works immediately — free!

## ❓ Troubleshooting
- "GEMINI_API_KEY not set" → add the env variable in Vercel, then redeploy
- "HTTP 400" → check your key is correct and starts with AIza
- AI not responding → check Vercel → Functions tab for error logs
