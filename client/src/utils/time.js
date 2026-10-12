/**
 * Format date string to local formatted time e.g. "Today, 7:30 PM" or "Oct 12, 8:00 PM"
 */
export function formatLocalTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  if (isToday) {
    return `Today, ${timeStr}`;
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  if (isTomorrow) {
    return `Tomorrow, ${timeStr}`;
  }

  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Calculates countdown from now to target ISO time
 */
export function getCountdown(isoString) {
  if (!isoString) return { totalMs: 0, formatted: 'Upcoming', isStartingSoon: false };
  const target = new Date(isoString).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { totalMs: 0, formatted: 'Starting now', isStartingSoon: true };
  }

  const fiveMinutesMs = 5 * 60 * 1000;
  const isStartingSoon = diff <= fiveMinutesMs;

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  if (isStartingSoon) {
    return { totalMs: diff, formatted: 'Starting soon', isStartingSoon: true };
  }

  let formatted = 'Starts in ';
  if (days > 0) {
    formatted += `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    formatted += `${hours}h ${minutes}m`;
  } else {
    formatted += `${minutes}m`;
  }

  return { totalMs: diff, formatted, isStartingSoon };
}

/**
 * Format relative time ago e.g. "just now", "15 seconds ago"
 */
export function formatTimeAgo(dateInput) {
  if (!dateInput) return 'just now';
  const timestamp = typeof dateInput === 'number' ? dateInput : new Date(dateInput).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffSec < 5) return 'just now';
  if (diffSec < 60) return `${diffSec} seconds ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin === 1) return '1 minute ago';
  if (diffMin < 60) return `${diffMin} minutes ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr === 1) return '1 hour ago';
  return `${diffHr} hours ago`;
}
