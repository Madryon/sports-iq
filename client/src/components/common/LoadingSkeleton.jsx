import React from 'react';

export default function LoadingSkeleton({ count = 4, type = 'match' }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'facility') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(i => (
          <div
            key={i}
            className="animate-pulse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700/60 p-5 space-y-4 shadow-sm"
          >
            <div className="h-44 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map(i => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700/60 p-5 space-y-4 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700/40">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-14" />
          </div>

          {/* Teams and Scores */}
          <div className="space-y-3 py-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
              </div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12" />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-28" />
              </div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12" />
            </div>
          </div>

          {/* Status / Footer */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700/40 flex justify-between items-center">
            <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
