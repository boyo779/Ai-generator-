export default async function handler(req, res) {
  try {
    const { prompt } = req.query;
    if (!prompt) throw new Error('Prompt required');

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`;
    const apiResponse = await fetch(url);
    
    if (!apiResponse.ok) {
      throw new Error(`Pollinations API error: ${apiResponse.status}`);
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'image/png');
    apiResponse.body.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
