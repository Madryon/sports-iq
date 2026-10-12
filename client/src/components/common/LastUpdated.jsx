import React, { useState, useEffect } from 'react';
import { formatTimeAgo } from '../../utils/time';

export default function LastUpdated({ timestamp, onRefresh, isRefreshing = false, className = '' }) {
  const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(timestamp));

  useEffect(() => {
    setTimeAgo(formatTimeAgo(timestamp));
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(timestamp));
    }, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div className={`flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      <span>Last updated: {timeAgo}</span>
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh match data"
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-750 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus-ring disabled:opacity-50"
          title="Refresh"
        >
          <svg
            className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
