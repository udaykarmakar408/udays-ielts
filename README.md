# 🎓 Uday's IELTS — AI Personal Tutor

## 📁 Correct File Structure

```
udays-ielts/         ← root of GitHub repo
├── api/
│   └── chat.js      ← AI proxy serverless function
├── index.html       ← the full app
├── vercel.json      ← Vercel config
├── package.json
└── .gitignore
```

> ⚠️ `index.html` must be at ROOT level — NOT inside any subfolder.
> `api/chat.js` must be inside `api/` at ROOT level.

---

## 🚀 Deploy to Vercel

### Step 1 — Get Anthropic API Key
1. Go to https://console.anthropic.com
2. API Keys → Create Key → copy it (starts with sk-ant-...)

### Step 2 — Upload to GitHub
1. github.com → New repository → name: udays-ielts → Create
2. Click "uploading an existing file"
3. Drag ALL files from this ZIP (including the api/ folder)
4. Commit changes

### Step 3 — Deploy on Vercel
1. vercel.com → Add New Project → Import udays-ielts
2. Leave ALL settings default → click Deploy
3. Wait 30 seconds

### Step 4 — ADD YOUR API KEY (required for AI to work!)
1. Vercel dashboard → your project → Settings → Environment Variables
2. Add New:
   - Key: ANTHROPIC_API_KEY
   - Value: sk-ant-... (your full key)
   - Check: Production + Preview + Development
3. Save → Deployments → ... → Redeploy

Done! AI Tutor will now work at your Vercel URL.

---

## Troubleshooting

- "ANTHROPIC_API_KEY not set" → add env variable in Vercel, redeploy
- "HTTP 401" → API key is incorrect
- "Failed to fetch" → check Vercel URL is live
- Running locally → go to Settings in app, add API key there
