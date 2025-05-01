export default async function handler(req, res) {
  // Parameter prompt dari frontend
  const { prompt } = req.query;

  try {
    // Panggil Pollinations API
    const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`);
    
    // Dapatkan buffer gambar
    const imageBuffer = await response.arrayBuffer();
    
    // Kirim kembali sebagai response
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
