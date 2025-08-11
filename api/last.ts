import axios from 'axios';

export default async function handler(req, res) {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    // Refresh token
    const tokenResp = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN || ''
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenResp.data.access_token;

    // Get last played track
    const r = await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const item = r.data.items?.[0];
    const t = item?.track;

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');
    res.json(
      t
        ? {
            played_at: item.played_at,
            name: t.name,
            artists: t.artists.map((a) => a.name).join(', '),
            url: t.external_urls.spotify,
            cover: t.album.images?.[0]?.url
          }
        : null
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'spotify_error' });
  }
}
