import React, { useState, useMemo, useEffect } from 'react';
import FacilityCard from '../components/facilities/FacilityCard';
import FacilityFilters from '../components/facilities/FacilityFilters';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import { useFacilities } from '../hooks/useFacilities';
import { fetchSports } from '../utils/api';

export default function Facilities() {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchSports().then(({ data }) => {
      const sportsArr = Array.isArray(data) ? data : (data?.data || []);
      if (sportsArr.length > 0) {
        setSports(sportsArr);
      }
    });
  }, []);

  const { facilities, loading, error, refetch } = useFacilities(selectedSport, selectedCity);

  const filteredFacilities = useMemo(() => {
    if (!facilities) return [];
    if (!searchQuery.trim()) return facilities;

    const q = searchQuery.toLowerCase().trim();
    return facilities.filter((f) => {
      const name = (f.name || '').toLowerCase();
      const address = (f.address || '').toLowerCase();
      const city = (f.city || '').toLowerCase();
      const sport = (f.sport || '').toLowerCase();
      return name.includes(q) || address.includes(q) || city.includes(q) || sport.includes(q);
    });
  }, [facilities, searchQuery]);

  const handleReset = () => {
    setSelectedSport('');
    setSelectedCity('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-10 shadow-lg">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Book & Play
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Sports Facilities & Venues
            </h1>
            <p className="text-sm sm:text-base text-blue-100">
              Discover top-rated turfs, badminton courts, cricket nets, football arenas, and fitness centers near you.
            </p>
          </div>
        </div>

        {/* Filters */}
        <FacilityFilters
          sports={sports}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReset={handleReset}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing <strong className="text-gray-900 dark:text-white">{filteredFacilities.length}</strong> facilities
          </span>
          {(selectedSport || selectedCity || searchQuery) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton count={6} type="facility" />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : filteredFacilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <span className="text-4xl mb-3">🏟️</span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              No Facilities Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">
              We couldn't find any sports venues matching your selected filters. Try broadening your criteria.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm focus-ring"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id || facility.name} facility={facility} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
