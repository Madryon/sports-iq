/**
 * Formula 1 Provider (Jolpica / Ergast F1 API)
 * Normalized match output format conforming to Sports-IQ schema.
 */

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

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
 * Normalize an F1 race object into the normalized schema
 */
function normalizeRace(race, state = 'upcoming', results = null) {
  if (!race) return null;

  const round = race.round;
  const raceName = race.raceName || `Grand Prix Round ${round}`;
  const circuit = race.Circuit?.circuitName || 'Grand Prix Circuit';
  const locality = race.Circuit?.Location?.locality || '';
  const country = race.Circuit?.Location?.country || '';
  const venue = [circuit, locality, country].filter(Boolean).join(', ');

  let scores = [];
  let resultText = null;
  let status = 'Not Started';

  if (state === 'completed' && Array.isArray(results) && results.length > 0) {
    scores = results.slice(0, 3).map(r => ({
      label: `P${r.position} ${r.Driver?.code || r.Driver?.familyName || 'Driver'}`,
      text: r.Time?.time || r.status || `Points: ${r.points}`
    }));

    const winner = results[0];
    const winnerName = `${winner?.Driver?.givenName || ''} ${winner?.Driver?.familyName || ''}`.trim() || 'Winner';
    resultText = `${winnerName} won the ${raceName}`;
    status = 'Chequered Flag';
  } else if (state === 'live') {
    scores = [
      { label: 'P1 Leader', text: 'On Track' },
      { label: 'P2 Chaser', text: '+1.5s' }
    ];
    status = 'Race in Progress';
  } else {
    scores = [];
    status = 'Not Started';
  }

  // Construct teams field
  const teams = [
    { name: raceName, logo: null },
    { name: circuit, logo: null }
  ];

  const startTime = (race.date && race.time)
    ? new Date(`${race.date}T${race.time}`).toISOString()
    : (race.date ? new Date(race.date).toISOString() : new Date().toISOString());

  return {
    id: `f1-${race.season || new Date().getFullYear()}-${round}`,
    sport: 'f1',
    league: 'Formula 1 World Championship',
    teams,
    state,
    scores,
    status,
    startTime,
    venue,
    resultText,
    timeline: null
  };
}

module.exports = {
  async fetchLive(sportKey = 'f1') {
    try {
      // Ergast / Jolpica is primarily historical and schedule-based.
      // Check current race weekend to see if any session is actively running right now.
      const currentYear = new Date().getFullYear();
      const url = `${BASE_URL}/${currentYear}/current.json`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      const race = json?.MRData?.RaceTable?.Races?.[0];
      if (!race) return [];

      const raceDate = new Date(`${race.date}T${race.time || '14:00:00Z'}`).getTime();
      const now = Date.now();
      // If within 2.5 hours of race start
      if (now >= raceDate && now <= raceDate + (2.5 * 3600 * 1000)) {
        return [normalizeRace(race, 'live')].filter(Boolean);
      }

      return [];
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [F1 Provider] Error fetching live:`, err.message);
      return [];
    }
  },

  async fetchUpcoming(sportKey = 'f1') {
    try {
      const currentYear = new Date().getFullYear();
      const url = `${BASE_URL}/${currentYear}.json`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      const races = json?.MRData?.RaceTable?.Races || [];
      const now = Date.now();

      return races
        .filter(r => {
          const raceTime = new Date(`${r.date}T${r.time || '12:00:00Z'}`).getTime();
          return raceTime > now;
        })
        .slice(0, 5)
        .map(r => normalizeRace(r, 'upcoming'))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [F1 Provider] Error fetching upcoming:`, err.message);
      return [];
    }
  },

  async fetchResults(sportKey = 'f1') {
    try {
      const currentYear = new Date().getFullYear();
      const url = `${BASE_URL}/${currentYear}/results.json?limit=50`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];

      const json = await res.json();
      const races = json?.MRData?.RaceTable?.Races || [];

      return races
        .slice(-5)
        .reverse()
        .map(r => normalizeRace(r, 'completed', r.Results))
        .filter(Boolean);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [F1 Provider] Error fetching results:`, err.message);
      return [];
    }
  }
};
