import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    // Follow redirect (server-side, no CORS)
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });

    const finalUrl = response.url;

    // Parse coordinates from final URL
    const patterns = [
      /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
      /[?&](?:query|q)=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
      /\/place\/[^@]*@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    ];

    for (const pattern of patterns) {
      const match = finalUrl.match(pattern);
      if (match) {
        const lat = parseFloat(match[1]);
        const lng = parseFloat(match[2]);
        if (!isNaN(lat) && !isNaN(lng)) {
          return res.json({ lat, lng, finalUrl });
        }
      }
    }

    return res.status(400).json({ error: 'Coordinates not found in final URL', finalUrl });
  } catch (e) {
    console.error('Resolve maps error:', e);
    return res.status(500).json({ error: 'Failed to resolve URL' });
  }
}