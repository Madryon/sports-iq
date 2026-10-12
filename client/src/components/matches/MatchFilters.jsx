import React from 'react';

export default function MatchFilters({
  leagues = [],
  selectedLeague = '',
  onLeagueChange,
  searchQuery = '',
  onSearchChange,
  selectedDate = '',
  onDateChange,
  onReset,
}) {
  const hasActiveFilters = Boolean(selectedLeague || searchQuery || selectedDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/80 p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        {/* Search team */}
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">Search team</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search teams or league..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus-ring"
          />
        </div>

        {/* League dropdown */}
        <div>
          <label htmlFor="league-select" className="sr-only">Filter by league</label>
          <select
            id="league-select"
            value={selectedLeague}
            onChange={(e) => onLeagueChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
          >
            <option value="">All Leagues</option>
            {leagues.map((league) => (
              <option key={league} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>

        {/* Date filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <label htmlFor="date-input" className="sr-only">Filter by date</label>
            <input
              id="date-input"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="p-2 text-xs font-semibold text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700/60 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors focus-ring shrink-0"
              title="Clear filters"
              aria-label="Clear all filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
