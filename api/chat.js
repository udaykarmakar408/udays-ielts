// api/chat.js — Vercel Serverless Proxy for Anthropic API
// Uses CommonJS (module.exports) — required for Vercel Node.js functions

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY not set. Go to Vercel Dashboard → Project → Settings → Environment Variables → add ANTHROPIC_API_KEY → Redeploy.'
    });
  }

  try {
    const body = req.body || {};
    const { messages, system, model, max_tokens } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required and must not be empty' });
    }

    // Build the Anthropic payload — only add system if non-empty
    const payload = {
      model: model || 'claude-sonnet-4-5',
      max_tokens: max_tokens || 1024,
      messages: messages
    };

    if (system && typeof system === 'string' && system.trim().length > 0) {
      payload.system = system.trim();
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data?.error?.message || JSON.stringify(data);
      console.error('Anthropic error:', response.status, errMsg);
      return res.status(response.status).json({ error: errMsg });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
};
