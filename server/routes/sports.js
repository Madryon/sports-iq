/**
 * Sports Route Handler
 * Endpoint: /api/sports
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * Locate and read config/sports.json
 */
function getSportsData() {
  const possiblePaths = [
    path.join(__dirname, '..', '..', 'config', 'sports.json'),
    path.join(__dirname, '..', 'config', 'sports.json'),
    path.join(process.cwd(), 'config', 'sports.json'),
    path.join(process.cwd(), '..', 'config', 'sports.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      return JSON.parse(content);
    }
  }

  return [];
}

/**
 * GET /api/sports
 * Returns the list of configured sports
 */
router.get('/', (req, res, next) => {
  try {
    const sports = getSportsData();
    res.json({
      success: true,
      data: sports
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [Sports Route] Error:`, err.message);
    next(err);
  }
});

module.exports = router;
