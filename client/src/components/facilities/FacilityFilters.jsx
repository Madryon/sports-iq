import React from 'react';

export default function FacilityFilters({
  sports = [],
  selectedSport = '',
  onSportChange,
  cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'],
  selectedCity = '',
  onCityChange,
  searchQuery = '',
  onSearchChange,
  onReset,
}) {
  const hasActiveFilters = Boolean(selectedSport || selectedCity || searchQuery);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/80 p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        {/* Search */}
        <div className="relative">
          <label htmlFor="facility-search" className="sr-only">Search venue or turf</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="facility-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search venue name, turf..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus-ring"
          />
        </div>

        {/* Sport filter */}
        <div>
          <label htmlFor="facility-sport" className="sr-only">Filter by sport</label>
          <select
            id="facility-sport"
            value={selectedSport}
            onChange={(e) => onSportChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
          >
            <option value="">All Sports</option>
            {sports.map((sport) => {
              const key = typeof sport === 'string' ? sport : sport.key;
              const name = typeof sport === 'string' ? sport : sport.name;
              const icon = typeof sport === 'object' ? sport.icon : '';
              return (
                <option key={key} value={key}>
                  {icon ? `${icon} ` : ''}{name}
                </option>
              );
            })}
          </select>
        </div>

        {/* City filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <label htmlFor="facility-city" className="sr-only">Filter by city</label>
            <select
              id="facility-city"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="p-2 text-xs font-semibold text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700/60 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors focus-ring shrink-0"
              title="Reset filters"
              aria-label="Reset all filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
