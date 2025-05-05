import axios from 'axios';

export async function POST(req) {
  const { last5 } = await req.json();

  if (!last5 || !Array.isArray(last5) || last5.length < 5) {
    return new Response(JSON.stringify({ error: 'Need at least 5 values' }), { status: 400 });
  }

  try {
    const response = await axios.post('https://python-ai-t9zt.onrender.com/predict', { last5 });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    console.error('ML error:', err.message);
    return new Response(JSON.stringify({ error: 'Prediction failed' }), { status: 500 });
  }
}
