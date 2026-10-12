/**
 * Cricket Provider (cricketdata.org API)
 * Normalized match output format conforming to Sports-IQ schema.
 */

const API_KEY = process.env.CRICKET_DATA_API_KEY || process.env.CRICKET_API_KEY;
const BASE_URL = 'https://api.cricapi.com/v1';

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
 * Normalize a cricketdata.org match object
 */
function normalizeCricketMatch(item, defaultState = 'upcoming') {
  if (!item) return null;

  const t1 = item.teams?.[0] || item.teamInfo?.[0]?.name || 'Team 1';
  const t2 = item.teams?.[1] || item.teamInfo?.[1]?.name || 'Team 2';

  const t1Logo = item.teamInfo?.[0]?.img || null;
  const t2Logo = item.teamInfo?.[1]?.img || null;

  let state = defaultState;
  const matchEnded = Boolean(item.matchEnded || (item.status && item.status.toLowerCase().includes('won')));
  const matchStarted = Boolean(item.matchStarted);

  if (matchEnded) {
    state = 'completed';
  } else if (matchStarted) {
    state = 'live';
  } else {
    state = 'upcoming';
  }

  // Build scores array
  let scores = [];
  if (Array.isArray(item.score) && item.score.length > 0) {
    scores = item.score.map(s => {
      const teamInning = s.inning ? ` (${s.inning})` : '';
      const runWkt = `${s.r || 0}/${s.w || 0}`;
      const overs = s.o ? ` in ${s.o} ov` : '';
      return {
        label: `${s.inning || 'Team'}`,
        text: `${runWkt}${overs}`.trim()
      };
    });
  }

  // CRITICAL SCHEMA RULE: Live and completed matches MUST have scores populated
  if ((state === 'live' || state === 'completed') && scores.length === 0) {
    scores = [
      { label: t1, text: 'In Progress' },
      { label: t2, text: '-' }
    ];
  } else if (state === 'upcoming') {
    scores = [];
  }

  const resultText = state === 'completed'
    ? (item.status || `${t1} vs ${t2} completed`)
    : null;

  const status = state === 'upcoming'
    ? 'Not Started'
    : (item.status || (state === 'completed' ? 'FT' : 'Live'));

  return {
    id: `cricket-${item.id || Math.random().toString(36).substring(2, 9)}`,
    sport: 'cricket',
    league: item.seriesName || item.matchType?.toUpperCase() || 'International Cricket',
    teams: [
      { name: t1, logo: t1Logo },
      { name: t2, logo: t2Logo }
    ],
    state,
    scores,
    status,
    startTime: item.dateTimeGMT ? new Date(item.dateTimeGMT).toISOString() : (item.date || new Date().toISOString()),
    venue: item.venue || null,
    resultText,
    timeline: null
  };
}

module.exports = {
  async fetchLive(sportKey = 'cricket') {
    if (!API_KEY) {
      console.warn(`[${new Date().toISOString()}] [Cricket Provider] Warning: CRICKET_DATA_API_KEY not set. Returning empty array.`);
      return [];
    }

    try {
      const url = `${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) {
        console.error(`[Cricket Provider] HTTP ${res.status}: ${res.statusText}`);
        return [];
      }

      const json = await res.json();
      if (!json || json.status !== 'success' || !Array.isArray(json.data)) {
        return [];
      }

      return json.data
        .filter(m => m.matchStarted && !m.matchEnded)
        .map(m => normalizeCricketMatch(m, 'live'))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Cricket Provider] Error fetching live matches:`, err.message);
      return [];
    }
  },

  async fetchUpcoming(sportKey = 'cricket') {
    if (!API_KEY) {
      console.warn(`[${new Date().toISOString()}] [Cricket Provider] Warning: CRICKET_DATA_API_KEY not set. Returning empty array.`);
      return [];
    }

    try {
      const url = `${BASE_URL}/matches?apikey=${API_KEY}&offset=0`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || json.status !== 'success' || !Array.isArray(json.data)) {
        return [];
      }

      return json.data
        .filter(m => !m.matchStarted)
        .map(m => normalizeCricketMatch(m, 'upcoming'))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Cricket Provider] Error fetching upcoming matches:`, err.message);
      return [];
    }
  },

  async fetchResults(sportKey = 'cricket') {
    if (!API_KEY) {
      console.warn(`[${new Date().toISOString()}] [Cricket Provider] Warning: CRICKET_DATA_API_KEY not set. Returning empty array.`);
      return [];
    }

    try {
      const url = `${BASE_URL}/matches?apikey=${API_KEY}&offset=0`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || json.status !== 'success' || !Array.isArray(json.data)) {
        return [];
      }

      return json.data
        .filter(m => m.matchEnded)
        .map(m => normalizeCricketMatch(m, 'completed'))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Cricket Provider] Error fetching results:`, err.message);
      return [];
    }
  }
};
