const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { prompt } = req.query;
    const url = `https://image.pollinations.ai/prompt/${prompt}?nologo=true`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    response.body.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
};
