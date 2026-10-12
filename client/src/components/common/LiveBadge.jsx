import React from 'react';

export default function LiveBadge({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-bold',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-red-600/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 uppercase tracking-wider font-mono ${sizeClasses[size] || sizeClasses.md} ${className}`}
      role="status"
      aria-label="Live match in progress"
    >
      <span className="relative flex">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75`}
        />
        <span
          className={`relative inline-flex rounded-full bg-red-600 dark:bg-red-400 ${dotSizes[size] || dotSizes.md}`}
        />
      </span>
      <span>LIVE</span>
    </span>
  );
}
