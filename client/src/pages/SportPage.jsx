import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SportNav from '../components/layout/SportNav';
import MatchList from '../components/matches/MatchList';
import MatchFilters from '../components/matches/MatchFilters';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import LastUpdated from '../components/common/LastUpdated';
import { useMatches } from '../hooks/useMatches';
import { usePolling } from '../hooks/usePolling';
import { fetchSports } from '../utils/api';

const DEFAULT_SPORTS_MAP = {
  cricket: { name: 'Cricket', icon: '🏏', color: '#16a34a', hasLive: true, description: 'Live cricket scores, fixtures, and results from international and domestic leagues.' },
  football: { name: 'Football', icon: '⚽', color: '#2563eb', hasLive: true, description: 'Football scores and fixtures from leagues around the world.' },
  f1: { name: 'Formula 1', icon: '🏎️', color: '#dc2626', hasLive: true, description: 'F1 race results, qualifying, and upcoming Grand Prix events.' },
  chess: { name: 'Chess', icon: '♟️', color: '#78716c', hasLive: true, description: 'Live chess games and broadcasts from Lichess.' },
  hockey: { name: 'Hockey', icon: '🏑', color: '#0891b2', hasLive: true, description: 'Field and ice hockey live scores and fixtures.' },
  tennis: { name: 'Tennis', icon: '🎾', color: '#ca8a04', hasLive: false, description: 'Tennis fixtures and results from ATP, WTA, and Grand Slams.' },
  badminton: { name: 'Badminton', icon: '🏸', color: '#7c3aed', hasLive: false, description: 'Badminton tournament schedules and results.' },
  volleyball: { name: 'Volleyball', icon: '🏐', color: '#ea580c', hasLive: true, description: 'Volleyball live scores from leagues worldwide.' },
  basketball: { name: 'Basketball', icon: '🏀', color: '#f97316', hasLive: true, description: 'Basketball live scores including NBA, EuroLeague, and more.' },
  kabaddi: { name: 'Kabaddi', icon: '🤼', color: '#e11d48', hasLive: false, description: 'Kabaddi fixtures and results from PKL and international tournaments.' },
  rugby: { name: 'Rugby', icon: '🏉', color: '#059669', hasLive: true, description: 'Rugby union and league scores from around the globe.' },
  baseball: { name: 'Baseball', icon: '⚾', color: '#1d4ed8', hasLive: true, description: 'Baseball live scores including MLB and international leagues.' },
  'table-tennis': { name: 'Table Tennis', icon: '🏓', color: '#be123c', hasLive: false, description: 'Table tennis tournament results and schedules.' },
  golf: { name: 'Golf', icon: '⛳', color: '#15803d', hasLive: false, description: 'Golf tournament leaderboards and schedules.' },
  'boxing-mma': { name: 'Boxing / MMA', icon: '🥊', color: '#9f1239', hasLive: false, description: 'Boxing and MMA fight cards, results, and upcoming bouts.' },
  athletics: { name: 'Athletics', icon: '🏃', color: '#0284c7', hasLive: false, description: 'Track and field events, results, and schedules.' },
};

export default function SportPage() {
  const { sportKey } = useParams();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'live' | 'upcoming' | 'completed'

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Sport metadata
  const [sportMeta, setSportMeta] = useState(DEFAULT_SPORTS_MAP[sportKey] || {
    name: sportKey ? sportKey.charAt(0).toUpperCase() + sportKey.slice(1) : 'Sport',
    icon: '🏅',
    color: '#2563eb',
    hasLive: true,
    description: 'Fixtures, live action, and results.',
  });

  useEffect(() => {
    fetchSports().then(({ data }) => {
      const sportsArr = Array.isArray(data) ? data : (data?.data || []);
      if (sportsArr.length > 0) {
        const found = sportsArr.find((s) => s.key === sportKey);
        if (found) setSportMeta(found);
      }
    });
  }, [sportKey]);

  const { matches, isMock, loading, error, lastUpdated, refetch, silentRefetch } = useMatches(sportKey, '');

  // Extract unique leagues
  const leagues = useMemo(() => {
    const set = new Set();
    matches.forEach((m) => {
      if (m.league) set.add(m.league);
    });
    return Array.from(set).sort();
  }, [matches]);

  // Filtered matches
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Tab filter
      if (activeTab !== 'all' && match.state !== activeTab) {
        return false;
      }

      // League filter
      if (selectedLeague && match.league !== selectedLeague) {
        return false;
      }

      // Date filter (compare YYYY-MM-DD)
      if (selectedDate && match.startTime) {
        const matchDate = new Date(match.startTime).toISOString().slice(0, 10);
        if (matchDate !== selectedDate) return false;
      }

      // Search query filter (teams, league, venue)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const teamNames = (match.teams || []).map((t) => t.name.toLowerCase()).join(' ');
        const leagueName = (match.league || '').toLowerCase();
        const venueName = (match.venue || '').toLowerCase();

        if (!teamNames.includes(query) && !leagueName.includes(query) && !venueName.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [matches, activeTab, selectedLeague, selectedDate, searchQuery]);

  // Check for live matches to poll
  const hasLiveMatches = useMemo(() => {
    return matches.some((m) => m.state === 'live');
  }, [matches]);

  usePolling(() => {
    silentRefetch();
  }, hasLiveMatches || activeTab === 'live', 30000);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLeague('');
    setSelectedDate('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SportNav activeKey={sportKey} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Sport Header */}
        <div
          className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg"
          style={{
            backgroundColor: sportMeta.color || '#1e3a8a',
            backgroundImage: `linear-gradient(135deg, ${sportMeta.color || '#1e3a8a'} 0%, rgba(15, 23, 42, 0.95) 100%)`,
          }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                {sportMeta.icon || '🏅'}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{sportMeta.name}</h1>
                <p className="text-sm text-blue-100/90 max-w-2xl mt-1">{sportMeta.description}</p>
              </div>
            </div>

            <div className="sm:self-end">
              <LastUpdated
                timestamp={lastUpdated}
                onRefresh={() => refetch()}
                className="text-white/80"
              />
            </div>
          </div>
        </div>

        {/* Demo Mode Notice */}
        {isMock && (
          <div className="flex items-center gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-xs text-amber-800 dark:text-amber-200 shadow-sm">
            <span className="text-base">🧪</span>
            <span>
              Showing simulated demo fixtures for <strong>{sportMeta.name}</strong>. Toggle to <strong>Live API</strong> in the header to fetch live provider feeds.
            </span>
          </div>
        )}

        {/* Info Banner when sport does not support live data */}
        {!isMock && sportMeta.hasLive === false && (
          <div
            role="status"
            className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-amber-800 dark:text-amber-300 text-sm shadow-sm"
          >
            <svg className="w-5 h-5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Live data unavailable for {sportMeta.name}. Showing fixtures and results.
            </span>
          </div>
        )}

        {/* Filters */}
        <MatchFilters
          leagues={leagues}
          selectedLeague={selectedLeague}
          onLeagueChange={setSelectedLeague}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onReset={resetFilters}
        />

        {/* Tab Bar */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800">
          <nav className="-mb-px flex space-x-6 sm:space-x-8" aria-label="Tabs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring ${
                activeTab === 'all'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              All Matches
            </button>

            {sportMeta.hasLive !== false && (
              <button
                type="button"
                onClick={() => setActiveTab('live')}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring flex items-center gap-1.5 ${
                  activeTab === 'live'
                    ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Live
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring ${
                activeTab === 'upcoming'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Upcoming
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring ${
                activeTab === 'completed'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Results
            </button>
          </nav>
        </div>

        {/* Match List Results */}
        {loading && !matches.length ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={() => refetch()} />
        ) : (
          <MatchList
            matches={filteredMatches}
            emptyMessage={`No ${activeTab !== 'all' ? activeTab : ''} ${sportMeta.name} matches match your criteria.`}
          />
        )}
      </main>
    </div>
  );
}
