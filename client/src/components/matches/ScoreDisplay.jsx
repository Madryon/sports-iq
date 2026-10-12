import React from 'react';

/**
 * ScoreDisplay renders scores array:
 * Each item has { label: 'India', text: '185/4 (20)' } or similar.
 */
export default function ScoreDisplay({ scores = [], state = 'completed', compact = false }) {
  const isLive = state === 'live';
  const isCompleted = state === 'completed';

  // If live or completed and no scores provided
  if ((!scores || scores.length === 0) && (isLive || isCompleted)) {
    return (
      <div className="py-2 px-3 my-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-lg text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
        <svg className="w-4 h-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Score data unavailable</span>
      </div>
    );
  }

  if (!scores || scores.length === 0) {
    return null;
  }

  return (
    <div className={`w-full divide-y divide-gray-100 dark:divide-gray-800 ${compact ? 'space-y-1' : 'space-y-1.5'}`}>
      {scores.map((scoreItem, index) => {
        const label = scoreItem.label || scoreItem.team || scoreItem.name || `Team ${index + 1}`;
        const scoreText = scoreItem.text !== undefined ? scoreItem.text : (scoreItem.score !== undefined ? scoreItem.score : '-');
        const isCurrent = isLive && (index === 0 || scoreItem.current);

        return (
          <div
            key={index}
            className={`flex items-center justify-between py-1 transition-colors ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            <span
              className={`font-medium truncate mr-3 ${
                isLive
                  ? isCurrent
                    ? 'text-gray-900 dark:text-gray-100 font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {label}
            </span>
            <span
              className={`font-mono font-semibold text-right shrink-0 tracking-tight ${
                isLive
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {scoreText}
            </span>
          </div>
        );
      })}
    </div>
  );
}
