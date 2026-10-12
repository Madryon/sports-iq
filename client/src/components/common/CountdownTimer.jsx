import React, { useState, useEffect } from 'react';
import { getCountdown } from '../../utils/time';

export default function CountdownTimer({ startTime, className = '' }) {
  const [countdown, setCountdown] = useState(() => getCountdown(startTime));

  useEffect(() => {
    // Initial evaluation
    setCountdown(getCountdown(startTime));

    // Update every minute (or 10s if starting soon)
    const intervalTime = countdown.isStartingSoon ? 10000 : 60000;
    const interval = setInterval(() => {
      setCountdown(getCountdown(startTime));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [startTime, countdown.isStartingSoon]);

  if (!startTime) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        countdown.isStartingSoon
          ? 'text-amber-600 dark:text-amber-400 font-semibold'
          : 'text-gray-500 dark:text-gray-400'
      } ${className}`}
      aria-label={`Match countdown: ${countdown.formatted}`}
    >
      <svg
        className={`w-3.5 h-3.5 ${countdown.isStartingSoon ? 'animate-bounce text-amber-500' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{countdown.formatted}</span>
    </div>
  );
}
