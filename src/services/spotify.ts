import axios from 'axios';

export async function getLastPlayed() {
  const { data } = await axios.get('/api/spotify/last', { timeout: 5000 });
  return data;
}