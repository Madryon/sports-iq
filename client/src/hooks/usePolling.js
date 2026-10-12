import { useEffect, useRef } from 'react';

/**
 * Custom polling hook that only triggers when live matches exist AND page is visible.
 *
 * @param {Function} callback - Function to execute on tick
 * @param {boolean} shouldPoll - Whether condition is met (e.g. hasLiveMatches)
 * @param {number} intervalMs - Polling interval in milliseconds (default: 30000)
 */
export function usePolling(callback, shouldPoll = true, intervalMs = 30000) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!shouldPoll || intervalMs <= 0) return;

    let timerId = null;

    const tick = () => {
      // Only execute if page is visible
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Immediately trigger refresh on becoming visible again
        tick();
        // Reset timer
        if (timerId) clearInterval(timerId);
        timerId = setInterval(tick, intervalMs);
      } else {
        if (timerId) {
          clearInterval(timerId);
          timerId = null;
        }
      }
    };

    // Start interval if document is visible
    if (document.visibilityState === 'visible') {
      timerId = setInterval(tick, intervalMs);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerId) clearInterval(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldPoll, intervalMs]);
}
