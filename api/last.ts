import axios from "axios";

export default async function handler(req, res) {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return res.status(500).json({ error: "missing_env" });
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    // 1) Refresh access token
    const tokenResp = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 8000,
      }
    );
    const access_token = tokenResp.data.access_token;

    // 2) Get most recent track
    const r = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        params: { limit: 1 },
        headers: { Authorization: `Bearer ${access_token}` },
        timeout: 8000,
      }
    );

    const item = r.data.items?.[0];
    const t = item?.track;

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=3600");
    return res.json(
      t
        ? {
            played_at: item.played_at,
            name: t.name,
            artists: t.artists[0],
            url: t.external_urls.spotify,
            cover: t.album.images?.[0]?.url,
            id: t.id,
          }
        : null
    );
  } catch (err) {
    const status = err?.response?.status || 500;
    const detail = err?.response?.data || err?.message || String(err);
    return res.status(status).json({ error: "spotify_failed", detail });
  }
}
