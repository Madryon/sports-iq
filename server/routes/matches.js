/**
 * Matches Route Handler
 * Endpoints:
 * - GET /api/matches?sport=all|{key}&state=live|upcoming|completed|all
 * - GET /api/matches/:id
 */

const express = require('express');
const router = express.Router();
const { getMatches, getMatchById } = require('../providers');

/**
 * GET /api/matches/mode - Get current data mode
 */
router.get('/mode', (req, res) => {
  res.json({
    success: true,
    isMock: process.env.USE_MOCK !== 'false',
    message: process.env.USE_MOCK !== 'false'
      ? 'Currently running in Demo / Mock Data Mode'
      : 'Currently running in Live Provider API Mode'
  });
});

/**
 * POST /api/matches/mode - Toggle or set data mode
 * Body: { useMock: boolean }
 */
router.post('/mode', (req, res) => {
  const { useMock } = req.body;
  if (typeof useMock === 'boolean') {
    process.env.USE_MOCK = useMock ? 'true' : 'false';
  } else {
    // Toggle
    process.env.USE_MOCK = process.env.USE_MOCK === 'false' ? 'true' : 'false';
  }

  // Clear memory cache so data switches immediately
  const cache = require('../cache');
  cache.clear();

  const isMock = process.env.USE_MOCK !== 'false';
  console.log(`[Matches Route] Switched data mode: isMock = ${isMock}`);

  res.json({
    success: true,
    isMock,
    message: isMock ? 'Switched to Demo / Mock Data Mode' : 'Switched to Live Provider API Mode'
  });
});

/**
 * GET /api/matches
 * Query params:
 * - sport: sport key (e.g. 'cricket', 'football') or 'all' (default: 'all')
 * - state: 'live' | 'upcoming' | 'completed' | 'all' (default: 'all')
 */
router.get('/', async (req, res, next) => {
  try {
    const sport = (req.query.sport || 'all').toLowerCase();
    const state = (req.query.state || 'all').toLowerCase();

    const matches = await getMatches(sport, state);

    res.json({
      success: true,
      sport,
      state,
      isMock: process.env.USE_MOCK !== 'false',
      count: matches.length,
      lastUpdated: new Date().toISOString(),
      data: matches
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [Matches Route] Error fetching matches:`, err.message);
    next(err);
  }
});

/**
 * GET /api/matches/:id
 * Fetches single match detail by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sport } = req.query;

    const match = await getMatchById(sport, id);

    if (!match) {
      return res.status(404).json({
        success: false,
        error: `Match with ID '${id}' not found`
      });
    }

    res.json({
      success: true,
      lastUpdated: new Date().toISOString(),
      data: match
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [Matches Route] Error fetching match ${req.params.id}:`, err.message);
    next(err);
  }
});

module.exports = router;
