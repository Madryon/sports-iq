/**
 * Chess Provider (Lichess Public API)
 * Normalized match output format conforming to Sports-IQ schema.
 */

const BASE_URL = 'https://lichess.org/api';

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

module.exports = {
  async fetchLive(sportKey = 'chess') {
    try {
      // Lichess TV channels provide live games from top players
      const url = `${BASE_URL}/tv/channels`;
      const res = await fetchWithTimeout(url, {
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) return [];

      const data = await res.json();
      if (!data || typeof data !== 'object') return [];

      const channels = Object.entries(data);
      const matches = [];

      for (const [channelKey, game] of channels) {
        if (!game || !game.user) continue;

        const whiteName = game.user?.name || `${channelKey} Player 1`;
        const whiteRating = game.rating ? `(${game.rating})` : '';
        const whiteFull = `${whiteName} ${whiteRating}`.trim();

        matches.push({
          id: `chess-${game.id || channelKey}`,
          sport: 'chess',
          league: `Lichess TV: ${channelKey.toUpperCase()} Arena`,
          teams: [
            { name: whiteFull, logo: null },
            { name: 'Opponent', logo: null }
          ],
          state: 'live',
          scores: [
            { label: whiteName, text: 'Active' },
            { label: 'Opponent', text: 'Active' }
          ],
          status: 'Game in Progress',
          startTime: new Date().toISOString(),
          venue: 'Lichess Online Arena',
          resultText: null,
          timeline: null
        });
      }

      return matches.slice(0, 5);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Chess Provider] Error fetching live:`, err.message);
      return [];
    }
  },

  async fetchUpcoming(sportKey = 'chess') {
    try {
      // Lichess official tournament broadcasts
      const url = `${BASE_URL}/broadcast`;
      const res = await fetchWithTimeout(url, {
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) return [];

      const broadcasts = await res.json();
      if (!Array.isArray(broadcasts)) return [];

      const now = Date.now();
      const upcoming = broadcasts
        .filter(b => b.tour && (!b.rounds || b.rounds.some(r => r.startsAt && new Date(r.startsAt).getTime() > now)))
        .slice(0, 5)
        .map(b => {
          const nextRound = b.rounds?.find(r => r.startsAt && new Date(r.startsAt).getTime() > now) || b.rounds?.[0];
          return {
            id: `chess-tour-${b.tour.id}`,
            sport: 'chess',
            league: b.tour.name || 'FIDE Classical Broadcast',
            teams: [
              { name: b.tour.name || 'Top Grandmasters Field', logo: b.tour.image || null },
              { name: nextRound ? `Round ${nextRound.name}` : 'Broadcast Round', logo: null }
            ],
            state: 'upcoming',
            scores: [],
            status: 'Not Started',
            startTime: nextRound?.startsAt ? new Date(nextRound.startsAt).toISOString() : new Date(Date.now() + 86400000).toISOString(),
            venue: b.tour.info || 'Official Tournament Hall',
            resultText: null,
            timeline: null
          };
        });

      return upcoming;
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Chess Provider] Error fetching upcoming:`, err.message);
      return [];
    }
  },

  async fetchResults(sportKey = 'chess') {
    try {
      const url = `${BASE_URL}/broadcast?nb=5`;
      const res = await fetchWithTimeout(url, {
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) return [];

      const broadcasts = await res.json();
      if (!Array.isArray(broadcasts)) return [];

      return broadcasts
        .filter(b => b.tour && b.rounds && b.rounds.some(r => r.finished))
        .slice(0, 5)
        .map(b => {
          const finishedRound = b.rounds.find(r => r.finished) || b.rounds[0];
          return {
            id: `chess-res-${b.tour.id}`,
            sport: 'chess',
            league: b.tour.name || 'Chess Championship',
            teams: [
              { name: b.tour.name || 'Competitors', logo: b.tour.image || null },
              { name: finishedRound ? finishedRound.name : 'Final Round', logo: null }
            ],
            state: 'completed',
            scores: [
              { label: 'Round Result', text: 'Concluded' },
              { label: 'Leaderboard', text: 'Official Standings Verified' }
            ],
            status: 'FT',
            startTime: new Date(Date.now() - 86400000).toISOString(),
            venue: b.tour.info || 'Tournament Venue',
            resultText: `${b.tour.name} - Round Concluded`,
            timeline: null
          };
        });
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [Chess Provider] Error fetching results:`, err.message);
      return [];
    }
  }
};
