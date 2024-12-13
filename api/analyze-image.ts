// api/analyze-image.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ollama from 'ollama';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    
    const response = await ollama.chat({
      model: 'llama3.2-vision:latest',
      messages: [{
        role: 'user',
        content: '這是一張甚麼圖片？請用中文簡單描述。',
        images: [image]
      }],
      stream: false
    });

    res.status(200).json({ analysis: response.message.content });
  } catch (error) {
    console.error('Ollama analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
}