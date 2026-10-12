/**
 * TheSportsDB Provider
 * Handles tennis, badminton, kabaddi, table-tennis, golf, boxing-mma, athletics
 * Normalized match output format conforming to Sports-IQ schema.
 */

const API_KEY = process.env.THESPORTSDB_KEY || process.env.THE_SPORTS_DB_KEY || '3';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// Sport names mapping for TheSportsDB search/lookup
const SPORT_NAME_MAP = {
  tennis: 'Tennis',
  badminton: 'Badminton',
  kabaddi: 'Kabaddi',
  'table-tennis': 'Table Tennis',
  golf: 'Golf',
  'boxing-mma': 'Motorsport', // Or 'Boxing'/'MMA'
  athletics: 'Athletics'
};

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
 * Normalize a TheSportsDB event
 */
function normalizeTheSportsDbEvent(event, sportKey, defaultState = 'upcoming') {
  if (!event) return null;

  const eventName = event.strEvent || 'Sports Event';
  const home = event.strHomeTeam || event.strPlayer1 || eventName.split(' vs ')[0] || eventName;
  const away = event.strAwayTeam || event.strPlayer2 || (eventName.split(' vs ')[1] || 'Opponent');

  const homeScore = event.intHomeScore ?? null;
  const awayScore = event.intAwayScore ?? null;

  let state = defaultState;
  const statusStr = (event.strStatus || '').toUpperCase();

  if (['FT', 'FINISHED', 'ENDED', 'FINAL'].some(s => statusStr.includes(s)) || (homeScore !== null && awayScore !== null && statusStr !== 'NOT STARTED')) {
    state = 'completed';
  } else if (['LIVE', 'IN PLAY', '1H', '2H', 'HT'].some(s => statusStr.includes(s))) {
    state = 'live';
  } else {
    state = 'upcoming';
  }

  let scores = [];
  if (state === 'live' || state === 'completed') {
    scores = [
      { label: home, text: homeScore !== null ? String(homeScore) : 'Completed' },
      { label: away, text: awayScore !== null ? String(awayScore) : '-' }
    ];
  }

  let resultText = null;
  if (state === 'completed') {
    if (event.strResult) {
      resultText = event.strResult;
    } else if (homeScore !== null && awayScore !== null) {
      resultText = `${home} ${homeScore} - ${awayScore} ${away}`;
    } else {
      resultText = `${home} vs ${away} finished`;
    }
  }

  const status = state === 'upcoming'
    ? 'Not Started'
    : (event.strStatus || (state === 'completed' ? 'FT' : 'Live'));

  const dateStr = event.strTimestamp || (event.dateEvent ? `${event.dateEvent}T${event.strTime || '12:00:00Z'}` : new Date().toISOString());

  return {
    id: `thesportsdb-${sportKey}-${event.idEvent || Math.random().toString(36).substring(2, 9)}`,
    sport: sportKey,
    league: event.strLeague || `${sportKey.toUpperCase()} Championship`,
    teams: [
      { name: home, logo: event.strThumb || event.strSquare || null },
      { name: away, logo: null }
    ],
    state,
    scores,
    status,
    startTime: new Date(dateStr).toISOString(),
    venue: event.strVenue || event.strCountry || null,
    resultText,
    timeline: null
  };
}

module.exports = {
  async fetchLive(sportKey) {
    // TheSportsDB free tier does not have true real-time websocket/live for minor sports
    // Returning empty array so registry falls back or delivers clean state
    return [];
  },

  async fetchUpcoming(sportKey) {
    if (!API_KEY) {
      console.warn(`[${new Date().toISOString()}] [TheSportsDB] Warning: THESPORTSDB_KEY not configured.`);
      return [];
    }

    try {
      const sportName = SPORT_NAME_MAP[sportKey] || sportKey;
      const today = new Date().toISOString().split('T')[0];
      const url = `${BASE_URL}/eventsday.php?d=${today}&s=${encodeURIComponent(sportName)}`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || !Array.isArray(json.events)) return [];

      return json.events
        .map(e => normalizeTheSportsDbEvent(e, sportKey, 'upcoming'))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [TheSportsDB Provider] Error fetching upcoming for ${sportKey}:`, err.message);
      return [];
    }
  },

  async fetchResults(sportKey) {
    if (!API_KEY) {
      console.warn(`[${new Date().toISOString()}] [TheSportsDB] Warning: THESPORTSDB_KEY not configured.`);
      return [];
    }

    try {
      const sportName = SPORT_NAME_MAP[sportKey] || sportKey;
      const yest = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const url = `${BASE_URL}/eventsday.php?d=${yest}&s=${encodeURIComponent(sportName)}`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      if (!json || !Array.isArray(json.events)) return [];

      return json.events
        .map(e => normalizeTheSportsDbEvent(e, sportKey, 'completed'))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [TheSportsDB Provider] Error fetching results for ${sportKey}:`, err.message);
      return [];
    }
  }
};
