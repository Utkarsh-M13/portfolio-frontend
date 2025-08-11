// api/last.cjs
const axios = require('axios');

module.exports = async function (req, res) {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    res.status(500).json({ error: 'missing_env' });
    return;
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const token = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'refresh_token', refresh_token: REFRESH_TOKEN }),
      { headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const access = token.data.access_token;

    const r = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${access}` },
    });

    const item = r.data?.items?.[0];
    const t = item?.track;

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600');
    res.json(
      t
        ? {
            played_at: item.played_at,
            name: t.name,
            artists: t.artists.map(a => a.name).join(', '),
            url: t.external_urls.spotify,
            cover: t.album.images?.[0]?.url,
            id: t.id,
          }
        : null
    );
  } catch (err) {
    res.status(err?.response?.status || 500).json({
      error: 'spotify_failed',
      detail: err?.response?.data || err?.message || String(err),
    });
  }
};
