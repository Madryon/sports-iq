/**
 * AI Assistant Route Handler
 * Endpoint: POST /api/ai/chat
 * Answers questions about the currently loaded matches.
 * Uses local Ollama instance if available, with intelligent contextual fallback.
 */

const express = require('express');
const router = express.Router();
const { getMatches } = require('../providers');

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

/**
 * Helper to fetch with timeout
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
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
 * Generate a smart response based on in-memory matches context
 */
function generateContextualAnswer(query, matches) {
  const q = query.toLowerCase();

  // Find live matches
  const liveMatches = matches.filter(m => m.state === 'live');
  const upcomingMatches = matches.filter(m => m.state === 'upcoming');
  const completedMatches = matches.filter(m => m.state === 'completed');

  if (q.includes('live') || q.includes('score') || q.includes('now') || q.includes('playing')) {
    if (liveMatches.length === 0) {
      return 'There are currently no live matches in progress across tracked sports.';
    }
    const summaries = liveMatches.slice(0, 5).map(m => {
      const scoreStr = m.scores && m.scores.length
        ? m.scores.map(s => `${s.label}: ${s.text}`).join(' vs ')
        : 'Scores active';
      return `• [${m.sport.toUpperCase()}] ${m.teams[0]?.name} vs ${m.teams[1]?.name}: ${scoreStr} (${m.status})`;
    });
    return `Here are the currently active live games:\n\n${summaries.join('\n')}\n\nAuto-refreshing live data every 30 seconds.`;
  }

  if (q.includes('upcoming') || q.includes('next') || q.includes('schedule') || q.includes('fixture')) {
    if (upcomingMatches.length === 0) {
      return 'No upcoming fixtures are currently scheduled.';
    }
    const summaries = upcomingMatches.slice(0, 5).map(m => {
      return `• [${m.sport.toUpperCase()}] ${m.teams[0]?.name} vs ${m.teams[1]?.name} (${m.league || 'League'})`;
    });
    return `Upcoming highlights:\n\n${summaries.join('\n')}\n\nCheck the upcoming tab for countdowns and local start times.`;
  }

  if (q.includes('result') || q.includes('who won') || q.includes('winner') || q.includes('finished')) {
    if (completedMatches.length === 0) {
      return 'No completed match results found.';
    }
    const summaries = completedMatches.slice(0, 5).map(m => {
      const result = m.resultText || (m.scores ? m.scores.map(s => `${s.label}: ${s.text}`).join(' - ') : 'Concluded');
      return `• [${m.sport.toUpperCase()}] ${m.teams[0]?.name} vs ${m.teams[1]?.name}: ${result}`;
    });
    return `Recent final results:\n\n${summaries.join('\n')}`;
  }

  // Sport-specific search
  const sports = ['cricket', 'football', 'f1', 'chess', 'hockey', 'tennis', 'badminton', 'basketball', 'volleyball', 'rugby', 'baseball'];
  const matchedSport = sports.find(s => q.includes(s));
  if (matchedSport) {
    const sportMatches = matches.filter(m => m.sport.toLowerCase() === matchedSport);
    if (sportMatches.length > 0) {
      const list = sportMatches.slice(0, 4).map(m => {
        const scoreInfo = m.scores?.length ? ` [${m.scores.map(s => `${s.label} ${s.text}`).join(', ')}]` : '';
        return `• ${m.teams[0]?.name} vs ${m.teams[1]?.name} (${m.state.toUpperCase()}${scoreInfo})`;
      });
      return `${matchedSport.toUpperCase()} matches on Sports-IQ:\n\n${list.join('\n')}`;
    }
  }

  return `Sports-IQ currently tracks ${matches.length} matches across 16 sports (${liveMatches.length} live, ${upcomingMatches.length} upcoming, ${completedMatches.length} completed). You can ask about live scores, specific teams, or upcoming schedules!`;
}

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const matches = await getMatches('all', 'all');

    // Try Ollama if enabled or configured
    if (process.env.ENABLE_AI_ASSISTANT === 'true') {
      try {
        const systemPrompt = `You are the Sports-IQ AI Assistant. You have real-time access to currently loaded sports matches in JSON: ${JSON.stringify(
          matches.slice(0, 20).map(m => ({
            sport: m.sport,
            league: m.league,
            teams: m.teams.map(t => t.name),
            state: m.state,
            scores: m.scores,
            status: m.status,
            resultText: m.resultText
          }))
        )}. Provide helpful, concise sports answers based on this match data.`;

        const ollamaRes = await fetchWithTimeout(`${OLLAMA_BASE_URL}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt: `${systemPrompt}\n\nUser Question: ${message}`,
            stream: false
          })
        }, 5000);

        if (ollamaRes.ok) {
          const data = await ollamaRes.json();
          if (data && data.response) {
            return res.json({
              success: true,
              reply: data.response
            });
          }
        }
      } catch (ollamaErr) {
        console.warn(`[AI Route] Ollama unavailable (${ollamaErr.message}), falling back to context engine.`);
      }
    }

    // Fallback: intelligent contextual engine based on live match store
    const reply = generateContextualAnswer(message, matches);
    return res.json({
      success: true,
      reply
    });
  } catch (err) {
    console.error(`[AI Route] Error processing chat:`, err.message);
    res.status(500).json({ success: false, error: 'Internal server error processing AI query' });
  }
});

module.exports = router;
