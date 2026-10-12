/**
 * API-Sports Provider
 * Handles football, hockey, basketball, volleyball, rugby, baseball via API-Sports endpoints.
 * Normalized match output format conforming to Sports-IQ schema.
 */

const API_KEY = process.env.API_SPORTS_KEY || process.env.APISPORTS_KEY;

// Map sport keys to API-Sports base domains
const SPORT_DOMAINS = {
  football: 'https://v3.football.api-sports.io',
  hockey: 'https://v1.hockey.api-sports.io',
  basketball: 'https://v1.basketball.api-sports.io',
  volleyball: 'https://v1.volleyball.api-sports.io',
  rugby: 'https://v1.rugby.api-sports.io',
  baseball: 'https://v1.baseball.api-sports.io'
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
 * Normalize an API-Sports game or football fixture object
 */
function normalizeApiSportsGame(game, sportKey, defaultState = 'upcoming') {
  if (!game) return null;

  const isFootball = sportKey === 'football';

  const home = game.teams?.home?.name || 'Home';
  const away = game.teams?.away?.name || 'Away';
  const homeLogo = game.teams?.home?.logo || null;
  const awayLogo = game.teams?.away?.logo || null;

  // Status mapping
  const statusObj = isFootball ? game.fixture?.status : game.status;
  const rawStatus = (statusObj?.short || statusObj?.long || '').toUpperCase();
  let state = defaultState;

  if (['FT', 'AET', 'PEN', 'AOT', 'AP', 'POST', 'FIN', 'FINISHED', 'ENDED'].some(s => rawStatus.includes(s))) {
    state = 'completed';
  } else if (['LIVE', '1H', '2H', 'HT', 'ET', 'BT', 'P', 'IN PLAY', '1Q', '2Q', '3Q', '4Q', '1P', '2P', '3P', 'OT', 'INNING'].some(s => rawStatus.includes(s))) {
    state = 'live';
  } else if (['NS', 'NOT STARTED', 'TBD'].some(s => rawStatus.includes(s))) {
    state = 'upcoming';
  }

  // Score extraction
  let homeScore = 0;
  let awayScore = 0;

  if (isFootball) {
    homeScore = game.goals?.home ?? 0;
    awayScore = game.goals?.away ?? 0;
  } else {
    homeScore = game.scores?.home?.total ?? game.scores?.home?.points ?? game.scores?.home ?? 0;
    awayScore = game.scores?.away?.total ?? game.scores?.away?.points ?? game.scores?.away ?? 0;
  }

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

  let displayStatus = 'Not Started';
  if (state === 'upcoming') {
    displayStatus = 'Not Started';
  } else if (state === 'completed') {
    displayStatus = 'FT';
  } else {
    // Live status
    if (isFootball && statusObj?.elapsed) {
      displayStatus = `${statusObj.elapsed}' (${statusObj.short || 'Live'})`;
    } else {
      displayStatus = statusObj?.short || 'Live';
    }
  }

  const matchId = isFootball ? game.fixture?.id : game.id;
  const matchDate = isFootball ? game.fixture?.date : game.date;
  const venue = isFootball
    ? (game.fixture?.venue?.name ? `${game.fixture.venue.name}, ${game.fixture.venue.city || ''}` : null)
    : (game.venue?.name || null);

  return {
    id: `apisports-${sportKey}-${matchId || Math.random().toString(36).substring(2, 9)}`,
    sport: sportKey,
    league: game.league?.name || `${sportKey.toUpperCase()} League`,
    teams: [
      { name: home, logo: homeLogo },
      { name: away, logo: awayLogo }
    ],
    state,
    scores,
    status: displayStatus,
    startTime: matchDate ? new Date(matchDate).toISOString() : new Date().toISOString(),
    venue,
    resultText,
    timeline: null
  };
}

/**
 * Make API-Sports games/fixtures request
 */
async function fetchGames(sportKey, params) {
  if (!API_KEY) {
    console.warn(`[${new Date().toISOString()}] [API-Sports Provider] Warning: API_SPORTS_KEY not set. Returning empty array for ${sportKey}.`);
    return [];
  }

  const domain = SPORT_DOMAINS[sportKey];
  if (!domain) {
    console.error(`[API-Sports Provider] Unknown sport key: ${sportKey}`);
    return [];
  }

  const endpoint = sportKey === 'football' ? '/fixtures' : '/games';

  try {
    const url = `${domain}${endpoint}?${new URLSearchParams(params).toString()}`;
    const res = await fetchWithTimeout(url, {
      headers: {
        'x-apisports-key': API_KEY
      }
    });

    if (!res.ok) {
      console.error(`[API-Sports Provider] HTTP ${res.status} for ${sportKey}: ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    if (!json || !Array.isArray(json.response)) return [];

    return json.response;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [API-Sports Provider] Error fetching ${sportKey}:`, err.message);
    return [];
  }
}

module.exports = {
  async fetchLive(sportKey) {
    const rawGames = await fetchGames(sportKey, { live: 'all' });
    return rawGames.map(g => normalizeApiSportsGame(g, sportKey, 'live')).filter(Boolean);
  },

  async fetchUpcoming(sportKey) {
    const today = new Date().toISOString().split('T')[0];
    const rawGames = await fetchGames(sportKey, { date: today });
    return rawGames
      .map(g => normalizeApiSportsGame(g, sportKey, 'upcoming'))
      .filter(g => g && g.state === 'upcoming');
  },

  async fetchResults(sportKey) {
    const yest = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const rawGames = await fetchGames(sportKey, { date: yest });
    return rawGames
      .map(g => normalizeApiSportsGame(g, sportKey, 'completed'))
      .filter(g => g && g.state === 'completed');
  }
};
