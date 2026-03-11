// api/chat.js — Google Gemini Proxy (FREE tier: 1,500 req/day)
// Uses CommonJS for Vercel Node.js compatibility

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY not set. Get a FREE key at aistudio.google.com → Get API Key, then add it in Vercel → Settings → Environment Variables → GEMINI_API_KEY → Redeploy.'
    });
  }

  try {
    const { messages, system } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    // Convert chat history to Gemini format
    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Build system instruction if provided
    const payload = {
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7
      }
    };

    if (system && system.trim()) {
      payload.systemInstruction = { parts: [{ text: system.trim() }] };
    }

    const model = 'gemini-2.0-flash';  // Free tier — latest fast model
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data?.error?.message || JSON.stringify(data);
      console.error('Gemini error:', response.status, errMsg);
      return res.status(response.status).json({ error: errMsg });
    }

    // Extract text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) {
      return res.status(500).json({ error: 'Empty response from AI' });
    }

    // Return in a consistent format
    return res.status(200).json({ text });

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
