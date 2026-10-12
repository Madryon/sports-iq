/**
 * Football Provider (football-data.org API)
 * Normalized match output format conforming to Sports-IQ schema.
 */

const API_KEY = process.env.FOOTBALL_DATA_API_KEY || process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

/**
 * Fetch wrapper with 10s timeout
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * Normalize football-data.org match
 */
function normalizeFootballMatch(m) {
  if (!m) return null;

  const home = m.homeTeam?.name || m.homeTeam?.shortName || 'Home';
  const away = m.awayTeam?.name || m.awayTeam?.shortName || 'Away';
  const homeLogo = m.homeTeam?.crest || null;
  const awayLogo = m.awayTeam?.crest || null;

  const homeScore = m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? 0;
  const awayScore = m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? 0;

  let state = 'upcoming';
  let status = 'Not Started';

  switch (m.status) {
    case 'IN_PLAY':
    case 'PAUSED':
    case 'LIVE':
      state = 'live';
      status = m.status === 'PAUSED' ? 'HT' : 'Live';
      break;
    case 'FINISHED':
    case 'AWARDED':
      state = 'completed';
      status = 'FT';
      break;
    case 'TIMED':
    case 'SCHEDULED':
    default:
      state = 'upcoming';
      status = 'Not Started';
      break;
  }

  // Scores array rules
  let scores = [];
  if (state === 'live' || state === 'completed') {
    scores = [
      { label: home, text: String(homeScore) },
      { label: away, text: String(awayScore) }
    ];
  }

  const resultText = state === 'completed'
    ? (homeScore === awayScore ? `Draw ${homeScore} - ${awayScore}` : `${homeScore > awayScore ? home : away} won ${Math.max(homeScore, awayScore)} - ${Math.min(homeScore, awayScore)}`)
    : null;

  return {
    id: `fb-${m.id || Math.random().toString(36).substring(2, 9)}`,
    sport: 'football',
    league: m.competition?.name || 'Football League',
    teams: [
      { name: home, logo: homeLogo },
      { name: away, logo: awayLogo }
    ],
    state,
    scores,
    status,
    startTime: m.utcDate ? new Date(m.utcDate).toISOString() : new Date().toISOString(),
    venue: m.venue || null,
    resultText,
    timeline: null
  };
}

module.exports = {
  async fetchLive(sportKey = 'football') {
    if (!API_KEY) {
      if (process.env.API_SPORTS_KEY || process.env.APISPORTS_KEY) {
        return require('./apisports').fetchLive('football');
      }
      console.warn(`[${new Date().toISOString()}] [Football Provider] Warning: FOOTBALL_DATA_API_KEY not set. Returning empty array.`);
      return [];
    }

    try {
      const url = `${BASE_URL}/matches?status=IN_PLAY,PAUSED`;
      const res = await fetchWithTimeout(url, {
        headers: { 'X-Auth-Token': API_KEY }
      });
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || !Array.isArray(json.matches)) return [];

      return json.matches.map(normalizeFootballMatch).filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Football Provider] Error fetching live:`, err.message);
      return [];
    }
  },

  async fetchUpcoming(sportKey = 'football') {
    if (!API_KEY) {
      if (process.env.API_SPORTS_KEY || process.env.APISPORTS_KEY) {
        return require('./apisports').fetchUpcoming('football');
      }
      console.warn(`[${new Date().toISOString()}] [Football Provider] Warning: FOOTBALL_DATA_API_KEY not set. Returning empty array.`);
      return [];
    }

    try {
      const url = `${BASE_URL}/matches?status=SCHEDULED,TIMED`;
      const res = await fetchWithTimeout(url, {
        headers: { 'X-Auth-Token': API_KEY }
      });
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || !Array.isArray(json.matches)) return [];

      return json.matches.map(normalizeFootballMatch).filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Football Provider] Error fetching upcoming:`, err.message);
      return [];
    }
  },

  async fetchResults(sportKey = 'football') {
    if (!API_KEY) {
      if (process.env.API_SPORTS_KEY || process.env.APISPORTS_KEY) {
        return require('./apisports').fetchResults('football');
      }
      console.warn(`[${new Date().toISOString()}] [Football Provider] Warning: FOOTBALL_DATA_API_KEY not set. Returning empty array.`);
      return [];
    }

    try {
      const url = `${BASE_URL}/matches?status=FINISHED`;
      const res = await fetchWithTimeout(url, {
        headers: { 'X-Auth-Token': API_KEY }
      });
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || !Array.isArray(json.matches)) return [];

      return json.matches.map(normalizeFootballMatch).filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Football Provider] Error fetching results:`, err.message);
      return [];
    }
  }
};
