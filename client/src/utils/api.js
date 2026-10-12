const BASE_URL = '';

/**
 * Helper to handle fetch responses and return { data, error } tuple
 */
async function handleRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => '');
      return {
        data: null,
        error: new Error(`HTTP ${res.status}: ${res.statusText} ${errorBody ? `- ${errorBody}` : ''}`),
      };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Network request failed'),
    };
  }
}

/**
 * Fetch all supported sports and their metadata
 */
export async function fetchSports() {
  return handleRequest('/api/sports');
}

/**
 * Fetch matches by sport and state (live | upcoming | completed | all)
 */
export async function fetchMatches(sport = 'all', state = '') {
  const params = new URLSearchParams();
  if (sport && sport !== 'all') params.append('sport', sport);
  if (state) params.append('state', state);

  const qs = params.toString();
  return handleRequest(`/api/matches${qs ? `?${qs}` : ''}`);
}

/**
 * Fetch a single match details by ID
 */
export async function fetchMatch(id) {
  return handleRequest(`/api/matches/${id}`);
}

/**
 * Fetch facilities with optional sport and city filters
 */
export async function fetchFacilities(sport = '', city = '') {
  const params = new URLSearchParams();
  if (sport && sport !== 'all') params.append('sport', sport);
  if (city) params.append('city', city);

  const qs = params.toString();
  return handleRequest(`/api/facilities${qs ? `?${qs}` : ''}`);
}

/**
 * Send query to AI endpoint
 */
export async function sendAiQuery(message) {
  return handleRequest('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

/**
 * Fetch current server data mode (Mock vs Live)
 */
export async function fetchDataMode() {
  return handleRequest('/api/matches/mode');
}

/**
 * Switch server data mode between Demo and Live
 */
export async function toggleDataMode(useMock) {
  return handleRequest('/api/matches/mode', {
    method: 'POST',
    body: JSON.stringify({ useMock }),
  });
}
