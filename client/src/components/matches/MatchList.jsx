import React from 'react';
import MatchCard from './MatchCard';

export default function MatchList({ matches = [], emptyMessage = 'No matches found.' }) {
  if (!matches || matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700/60 text-gray-400 dark:text-gray-500 flex items-center justify-center mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {matches.map((match) => (
        <MatchCard key={match.id || `${match.sport}-${match.startTime}-${Math.random()}`} match={match} />
      ))}
    </div>
  );
}
