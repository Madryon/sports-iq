/**
 * Provider Registry
 * Routes requests to Mock, Cricket, Football, F1, Chess, API-Sports, or TheSportsDB providers.
 * Handles TTL caching (25s for live, 300s for fixtures/results).
 */

const fs = require('fs');
const path = require('path');
const cache = require('../cache');

const mockProvider = require('./mock');
const cricketProvider = require('./cricket');
const footballProvider = require('./football');
const f1Provider = require('./f1');
const chessProvider = require('./chess');
const apisportsProvider = require('./apisports');
const thesportsdbProvider = require('./thesportsdb');

// Map provider keys from sports.json to provider instances
const PROVIDER_MAP = {
  cricket: cricketProvider,
  football: footballProvider,
  f1: f1Provider,
  chess: chessProvider,
  apisports: apisportsProvider,
  thesportsdb: thesportsdbProvider,
  mock: mockProvider
};

// Cache TTLs in milliseconds
const TTL_LIVE = 25 * 1000;       // 25 seconds
const TTL_FIXTURES = 300 * 1000;  // 300 seconds (5 minutes)

/**
 * Load sports config from config/sports.json
 */
function loadSportsConfig() {
  const possiblePaths = [
    path.join(__dirname, '..', '..', 'config', 'sports.json'),
    path.join(__dirname, '..', 'config', 'sports.json'),
    path.join(process.cwd(), 'config', 'sports.json'),
    path.join(process.cwd(), '..', 'config', 'sports.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const raw = fs.readFileSync(p, 'utf8');
        return JSON.parse(raw);
      } catch (e) {
        console.error(`[Provider Registry] Error reading sports config from ${p}:`, e.message);
      }
    }
  }

  console.warn('[Provider Registry] sports.json could not be found, using fallback sport list.');
  return [];
}

const sportsConfig = loadSportsConfig();

/**
 * Get provider instance for a sport key
 */
function getProviderForSport(sportKey) {
  // If USE_MOCK is explicitly set to true or default fallback is mock
  if (process.env.USE_MOCK === 'true') {
    return mockProvider;
  }

  const conf = sportsConfig.find(s => s.key === sportKey);
  if (!conf) {
    return mockProvider;
  }

  const providerName = conf.provider || 'mock';
  return PROVIDER_MAP[providerName] || mockProvider;
}

/**
 * Fetch matches for a single sport and specific state from provider
 */
async function fetchFromSportProvider(sportKey, state = 'all') {
  const provider = getProviderForSport(sportKey);

  // If using mock provider directly
  if (provider === mockProvider) {
    return mockProvider.getMatches(sportKey, state);
  }

  let matches = [];

  try {
    if (state === 'live') {
      matches = await provider.fetchLive(sportKey);
    } else if (state === 'upcoming') {
      matches = await provider.fetchUpcoming(sportKey);
    } else if (state === 'completed') {
      matches = await provider.fetchResults(sportKey);
    } else {
      // 'all'
      const [live, up, comp] = await Promise.all([
        provider.fetchLive(sportKey).catch(() => []),
        provider.fetchUpcoming(sportKey).catch(() => []),
        provider.fetchResults(sportKey).catch(() => [])
      ]);
      matches = [...live, ...up, ...comp];
    }

    // If real provider returned no matches and USE_MOCK is not explicitly false, fall back to mock data
    if ((!matches || matches.length === 0) && process.env.USE_MOCK !== 'false') {
      return mockProvider.getMatches(sportKey, state);
    }

    return matches || [];
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [Provider Registry] Error fetching ${sportKey} (${state}):`, err.message);
    if (process.env.USE_MOCK !== 'false') {
      return mockProvider.getMatches(sportKey, state);
    }
    return [];
  }
}

/**
 * Fetch matches with caching
 * @param {string} sportKey ('all' or specific sport key)
 * @param {'live'|'upcoming'|'completed'|'all'} state
 * @returns {Promise<Array>}
 */
async function getMatches(sportKey = 'all', state = 'all') {
  const cacheKey = `matches:${sportKey}:${state}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const ttl = state === 'live' ? TTL_LIVE : TTL_FIXTURES;
  let result = [];

  if (sportKey === 'all') {
    // Collect from all configured sports (or mock database)
    if (process.env.USE_MOCK === 'true') {
      result = await mockProvider.getMatches('all', state);
    } else {
      const sportKeys = sportsConfig.length > 0
        ? sportsConfig.map(s => s.key)
        : ['cricket', 'football', 'f1', 'chess', 'hockey', 'tennis', 'badminton', 'volleyball', 'basketball', 'kabaddi', 'rugby', 'baseball', 'table-tennis', 'golf', 'boxing-mma', 'athletics'];

      const matchPromises = sportKeys.map(k => fetchFromSportProvider(k, state));
      const nested = await Promise.all(matchPromises);
      result = nested.flat();
    }
  } else {
    result = await fetchFromSportProvider(sportKey, state);
  }

  cache.set(cacheKey, result, ttl);
  return result;
}

/**
 * Fetch a single match by ID across sports
 * @param {string} sportKey
 * @param {string} matchId
 */
async function getMatchById(sportKey, matchId) {
  // First check mock provider
  const mockMatch = await mockProvider.getMatchById(matchId);
  if (mockMatch) return mockMatch;

  // Otherwise search cached or fetched matches
  const matches = await getMatches(sportKey || 'all', 'all');
  const found = matches.find(m => String(m.id) === String(matchId));
  return found || null;
}

module.exports = {
  getMatches,
  getMatchById,
  loadSportsConfig
};
