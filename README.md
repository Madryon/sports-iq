# ⚡ Sports-IQ: Multi-Sport Live Scores & Facilities Hub

Sports-IQ is a modern, responsive, multi-sport platform featuring real-time scores, upcoming fixtures, final match results, and local sports venue directory & booking.

---

## 🏗️ Architecture & Stack

- **Frontend**: React 18, Vite, Tailwind CSS (light & dark mode, accessibility, responsive mobile-first UI).
- **Backend**: Node.js & Express API proxy.
  - API keys reside **only** in server-side `.env`, never exposed to the client.
  - In-memory TTL caching (Live matches: 25s TTL, Fixtures/Results: 5 min TTL) to stay within free-tier limits.
  - Provider Adapter pattern normalizing all feeds into a consistent schema.
  - Mock mode (`USE_MOCK=true`) allows running the entire application offline without API keys.
- **Config-Driven Sports Registry**: `config/sports.json` specifies all supported sports, icons, brand colors, provider links, and live data capabilities. Adding a new sport requires zero changes to UI components.
- **Facilities Engine**: Admin-editable JSON seed (`config/facilities.json`) for grounds, turfs, and courts with sport/city filters and instant booking enquiry.
- **AI Assistant**: Optional local Ollama assistant panel behind feature flag with contextual match intelligence.

---

## 📋 Normalized Match Schema

Every provider adapter normalizes incoming data to this uniform structure:

```typescript
interface NormalizedMatch {
  id: string;
  sport: string;              // Matches sport key in config/sports.json
  league: string;             // Tournament or League name
  teams: [
    { name: string; logo: string | null },
    { name: string; logo: string | null }
  ];
  state: "live" | "upcoming" | "completed";
  scores: Array<{ label: string; text: string }>;  // ALWAYS populated for live & completed
  status: string;             // e.g. "2nd Innings", "68'", "FT", "Not Started"
  startTime: string;          // ISO 8601 string
  venue: string | null;
  resultText: string | null;  // e.g. "India won by 6 wickets" (completed only)
  timeline?: Array<{ time: string; text: string }> | null;
}
```

### Critical Match Display Invariants
- **Live Matches**: Red pulsing `LIVE` badge, live scoreboard (`scores` array), match status indicator, and automatic 30s background polling (pauses when browser tab is hidden).
- **Completed Matches**: Final scoreline (`scores` array) **plus** official outcome banner (`resultText`).
- **Upcoming Matches**: User local timezone start time, live countdown timer (`Starts in Xd Xh Xm`), and 'Starting soon' threshold.
- **Sports without live API**: Banner indicator (`Live data unavailable for this sport. Showing fixtures and results.`).

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Installation
Clone the repository and install all dependencies:

```bash
# In the sports-iq root directory:
npm run install:all
```
*(Or manually run `npm install` in root, `server/`, and `client/`)*

### 3. Environment Configuration
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

To run immediately with full mock data across all 16 sports (no API keys needed):
```ini
USE_MOCK=true
PORT=3001
```

### 4. Running the Application
Start both the backend API and frontend Vite dev server concurrently:

```bash
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:3001](http://localhost:3001)
- **Health Check**: [http://localhost:3001/api/health](http://localhost:3001/api/health)

---

## 🔑 External API Providers & Keys

To switch from mock data to real API feeds, set `USE_MOCK=false` in `.env` and provide the following keys:

| Sport | Suggested Provider | Env Variable | Free Tier Notes |
|---|---|---|---|
| **Cricket** | CricketData.org / CricAPI | `CRICKET_API_KEY` | Free 100 hits/day |
| **Football** | football-data.org | `FOOTBALL_DATA_KEY` | Free tier covers top 12 European leagues |
| **Hockey, Basketball, Volleyball, Rugby, Baseball** | API-Sports (v3.api-sports.io) | `API_SPORTS_KEY` | 100 requests/day per sport with 1 key |
| **Formula 1** | Jolpica-F1 / Ergast API | *(None needed)* | Public free REST API |
| **Chess** | Lichess API | *(None needed)* | Public broadcast & TV feed |
| **Tennis, Badminton, Kabaddi, etc.** | TheSportsDB | `THESPORTSDB_KEY` | Free public key `3` or `1` |

---

## ➕ Adding a New Sport or Provider

### 1. Adding a Sport (Config-Driven)
Open `config/sports.json` and add a new entry:

```json
{
  "key": "pickleball",
  "name": "Pickleball",
  "icon": "🎾",
  "color": "#10b981",
  "provider": "thesportsdb",
  "enabled": true,
  "hasLive": false,
  "description": "Pickleball tournaments, matches, and local court schedules."
}
```
*The UI will immediately render Pickleball in the navigation strip, sports page route (`/sport/pickleball`), filters, and facility selectors with zero component edits!*

### 2. Adding a New Provider Adapter
Create a new file in `server/providers/myprovider.js`:

```javascript
module.exports = {
  async fetchLive(sportKey) {
    // Return Array<NormalizedMatch>
  },
  async fetchUpcoming(sportKey) {
    // Return Array<NormalizedMatch>
  },
  async fetchResults(sportKey) {
    // Return Array<NormalizedMatch>
  }
};
```

Register your adapter in `server/providers/index.js`:
```javascript
const myProvider = require('./myprovider');
PROVIDER_MAP['myprovider'] = myProvider;
```

---

## 🤖 Optional AI Assistant (Ollama)

To enable the floating sports AI assistant:
1. Ensure Ollama is running locally:
   ```bash
   ollama run llama3
   ```
2. Enable in server `.env`:
   ```ini
   ENABLE_AI_ASSISTANT=true
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama3
   ```
3. Enable in client `client/.env`:
   ```ini
   VITE_ENABLE_AI=true
   ```
*If Ollama is offline or disabled, the built-in intelligent contextual engine automatically answers questions regarding currently loaded matches.*

---

## 🧪 Testing & Verification

1. Start the server: `cd server && npm start`
2. Test health check: `curl http://localhost:3001/api/health`
3. Test matches endpoint: `curl http://localhost:3001/api/matches?sport=cricket&state=live`
4. Test facilities endpoint: `curl http://localhost:3001/api/facilities`
5. Test client build: `cd client && npm run build`
