import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchSports } from '../../utils/api';

// Fallback sports list if API fails
const FALLBACK_SPORTS = [
  { key: 'cricket', name: 'Cricket', icon: '🏏', color: '#16a34a' },
  { key: 'football', name: 'Football', icon: '⚽', color: '#2563eb' },
  { key: 'f1', name: 'Formula 1', icon: '🏎️', color: '#dc2626' },
  { key: 'chess', name: 'Chess', icon: '♟️', color: '#78716c' },
  { key: 'hockey', name: 'Hockey', icon: '🏑', color: '#0891b2' },
  { key: 'tennis', name: 'Tennis', icon: '🎾', color: '#ca8a04' },
  { key: 'badminton', name: 'Badminton', icon: '🏸', color: '#7c3aed' },
  { key: 'volleyball', name: 'Volleyball', icon: '🏐', color: '#ea580c' },
  { key: 'basketball', name: 'Basketball', icon: '🏀', color: '#f97316' },
  { key: 'kabaddi', name: 'Kabaddi', icon: '🤼', color: '#e11d48' },
  { key: 'rugby', name: 'Rugby', icon: '🏉', color: '#059669' },
  { key: 'baseball', name: 'Baseball', icon: '⚾', color: '#1d4ed8' },
  { key: 'table-tennis', name: 'Table Tennis', icon: '🏓', color: '#be123c' },
  { key: 'golf', name: 'Golf', icon: '⛳', color: '#15803d' },
  { key: 'boxing-mma', name: 'Boxing / MMA', icon: '🥊', color: '#9f1239' },
  { key: 'athletics', name: 'Athletics', icon: '🏃', color: '#0284c7' }
];

export default function SportNav({ activeKey = 'all' }) {
  const [sports, setSports] = useState(FALLBACK_SPORTS);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    fetchSports().then(({ data }) => {
      const sportsArr = Array.isArray(data) ? data : (data?.data || []);
      if (isMounted && sportsArr.length > 0) {
        setSports(sportsArr);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-850 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-3 focus:outline-none"
          aria-label="Sports Categories"
        >
          {/* "All" button */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => {
              const currentActive = isActive && location.pathname === '/';
              return `shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-ring ${
                currentActive || activeKey === 'all'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`;
            }}
          >
            <span className="text-base">🏆</span>
            <span>All Sports</span>
          </NavLink>

          {/* Individual Sports */}
          {sports.map((sport) => {
            const isCurrentActive =
              activeKey === sport.key || location.pathname === `/sport/${sport.key}`;

            return (
              <NavLink
                key={sport.key}
                to={`/sport/${sport.key}`}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-ring ${
                  isCurrentActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={
                  isCurrentActive && sport.color
                    ? { backgroundColor: sport.color }
                    : undefined
                }
              >
                <span className="text-base" role="img" aria-label={sport.name}>
                  {sport.icon || '🏅'}
                </span>
                <span>{sport.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
