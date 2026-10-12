import React, { useState, useMemo } from 'react';
import SportNav from '../components/layout/SportNav';
import MatchList from '../components/matches/MatchList';
import MatchCard from '../components/matches/MatchCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import LastUpdated from '../components/common/LastUpdated';
import { useMatches } from '../hooks/useMatches';
import { usePolling } from '../hooks/usePolling';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'live' | 'upcoming' | 'completed'

  const { matches, isMock, loading, error, lastUpdated, refetch, silentRefetch } = useMatches('all', '');

  // Separate live matches for top ticker/strip
  const liveMatches = useMemo(() => {
    return (matches || []).filter((m) => m.state === 'live');
  }, [matches]);

  const upcomingMatches = useMemo(() => {
    return (matches || []).filter((m) => m.state === 'upcoming');
  }, [matches]);

  const completedMatches = useMemo(() => {
    return (matches || []).filter((m) => m.state === 'completed');
  }, [matches]);

  // Tab filtering
  const filteredMatches = useMemo(() => {
    if (activeTab === 'live') return liveMatches;
    if (activeTab === 'upcoming') return upcomingMatches;
    if (activeTab === 'completed') return completedMatches;
    return matches;
  }, [activeTab, matches, liveMatches, upcomingMatches, completedMatches]);

  // Polling condition: has live matches or user is on the Live tab
  const shouldPoll = liveMatches.length > 0 || activeTab === 'live';
  usePolling(() => {
    silentRefetch();
  }, shouldPoll, 30000);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sport Navigation Strip */}
      <SportNav activeKey="all" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Mode Notice Banner */}
        {isMock && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-xs text-amber-800 dark:text-amber-200 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🧪</span>
              <div>
                <strong className="font-bold">Demo / Simulation Mode Active:</strong> Showing sample fixture data for UI testing.
                <span className="hidden sm:inline text-amber-700/80 dark:text-amber-300/80 ml-1">
                  Scores and fixtures are simulated. Switch to Live API for real-time provider data.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Live Now Horizontal Strip (if any live matches exist) */}
        {liveMatches.length > 0 && (
          <section aria-labelledby="live-ticker-heading" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                </span>
                <h2 id="live-ticker-heading" className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                  Live Now
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                  {liveMatches.length}
                </span>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 focus:outline-none">
              {liveMatches.map((match) => (
                <div key={match.id} className="min-w-[300px] sm:min-w-[340px] max-w-md shrink-0">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Matches Section Header */}
        <section aria-labelledby="matches-heading" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 id="matches-heading" className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Match Center
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Latest updates, scores, and schedules across all sports
              </p>
            </div>

            <LastUpdated timestamp={lastUpdated} onRefresh={() => refetch()} />
          </div>

          {/* Tab Bar */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-800">
            <nav className="-mb-px flex space-x-6 sm:space-x-8" aria-label="Match Status Tabs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                All Matches ({matches.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('live')}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring flex items-center gap-2 ${
                  activeTab === 'live'
                    ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${liveMatches.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                Live ({liveMatches.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                className={`py-3 px-1 border-b-2 font-semibold text-sm transition-colors focus-ring ${
                  activeTab === 'upcoming'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Upcoming ({upcomingMatches.length})
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
                Results ({completedMatches.length})
              </button>
            </nav>
          </div>

          {/* Content state */}
          {loading && !matches.length ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <ErrorState message={error} onRetry={() => refetch()} />
          ) : (
            <MatchList
              matches={filteredMatches}
              emptyMessage={
                activeTab === 'live'
                  ? 'No live matches in progress right now.'
                  : activeTab === 'upcoming'
                  ? 'No upcoming matches scheduled.'
                  : activeTab === 'completed'
                  ? 'No completed results available.'
                  : 'No matches found.'
              }
            />
          )}
        </section>
      </main>
    </div>
  );
}
