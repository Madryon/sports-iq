/**
 * Facilities Route Handler
 * Endpoint: /api/facilities
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * Locate and read config/facilities.json
 */
function getFacilitiesData() {
  const possiblePaths = [
    path.join(__dirname, '..', '..', 'config', 'facilities.json'),
    path.join(__dirname, '..', 'config', 'facilities.json'),
    path.join(process.cwd(), 'config', 'facilities.json'),
    path.join(process.cwd(), '..', 'config', 'facilities.json')
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
 * GET /api/facilities?sport=&city=
 * Returns filtered list of sports facilities
 */
router.get('/', (req, res, next) => {
  try {
    const { sport, city } = req.query;
    let facilities = getFacilitiesData();

    if (sport && sport.toLowerCase() !== 'all') {
      const targetSport = sport.toLowerCase().trim();
      facilities = facilities.filter(f => f.sport && f.sport.toLowerCase() === targetSport);
    }

    if (city && city.toLowerCase() !== 'all') {
      const targetCity = city.toLowerCase().trim();
      facilities = facilities.filter(f => {
        const facilityCity = f.location?.city || f.city || '';
        return facilityCity.toLowerCase().includes(targetCity);
      });
    }

    res.json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [Facilities Route] Error:`, err.message);
    next(err);
  }
});

module.exports = router;
