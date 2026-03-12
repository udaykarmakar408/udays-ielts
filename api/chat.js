// api/chat.js — Groq AI Proxy · llama-3.3-70b-versatile · FREE (14,400 req/day)
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured. Add it in Vercel → Settings → Environment Variables → Redeploy. Get a FREE key at console.groq.com.' });
  }

  try {
    const { messages, system, maxTokens } = req.body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const groqMessages = [];
    if (system && system.trim()) groqMessages.push({ role: 'system', content: system.trim() });
    for (const m of messages) {
      if (!m.role || !m.content) continue;
      groqMessages.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content) });
    }

    const tokens = Math.min(Math.max(parseInt(maxTokens) || 1600, 256), 4000);

    async function attempt(retries) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: groqMessages, max_tokens: tokens, temperature: 0.72 })
      });
      if (response.status === 429 && retries > 0) {
        await new Promise(r => setTimeout(r, 2500));
        return attempt(retries - 1);
      }
      const data = await response.json();
      if (!response.ok) {
        return { error: data?.error?.message || data?.error || ('HTTP ' + response.status), status: response.status };
      }
      return { text: data?.choices?.[0]?.message?.content || '' };
    }

    const result = await attempt(2);
    if (result.error) return res.status(result.status || 500).json({ error: result.error });
    return res.status(200).json({ text: result.text });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
