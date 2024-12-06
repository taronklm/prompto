import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body.message)
    try {
      const response = await axios.post('http://localhost:8000/chatbot/', { input_text: req.body.message });
      console.log("RESPONSE DATA: ", response.data.generated_text)
      res.status(response.status).json(response.data.generated_text);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Verbinden mit der LLM.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
