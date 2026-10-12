/**
 * Sports-IQ API Server
 * Express app with modular providers, caching, and normalized schema.
 */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '..', '.env') });
// Also load local server .env if present
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

const sportsRoutes = require('./routes/sports');
const matchesRoutes = require('./routes/matches');
const facilitiesRoutes = require('./routes/facilities');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - Allow localhost:5173 and standard dev origins
const corsOptions = {
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'http://localhost:5174'
    ];
    // Allow non-browser requests or allowed origins
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev mode
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    mockMode: process.env.USE_MOCK !== 'false'
  });
});

// Mount modular API routes
app.use('/api/sports', sportsRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/ai', aiRoutes);

// Serve static frontend assets from client/dist (for Render & production deployment)
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  // Root API info fallback if client is not built
  app.get('/', (req, res) => {
    res.json({
      name: 'Sports-IQ Backend API',
      version: '1.0.0',
      documentation: {
        health: '/api/health',
        sports: '/api/sports',
        matches: '/api/matches?sport=all|{key}&state=live|upcoming|completed|all',
        facilities: '/api/facilities?sport=&city='
      }
    });
  });
}

// 404 Route Handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.url} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Unhandled Server Error:`, err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(` Sports-IQ Server running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Matches API:  http://localhost:${PORT}/api/matches`);
  console.log(` Sports API:   http://localhost:${PORT}/api/sports`);
  console.log(` Facilities:   http://localhost:${PORT}/api/facilities`);
  console.log(` Mock Mode:    ${process.env.USE_MOCK !== 'false' ? 'ENABLED' : 'DISABLED'}`);
  console.log(`===========================================`);
});

// Graceful shutdown handling
function handleGracefulShutdown(signal) {
  console.log(`\n[${new Date().toISOString()}] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force close after 5 seconds if hanging
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

module.exports = app;
