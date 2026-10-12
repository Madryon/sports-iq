import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiveBadge from '../common/LiveBadge';
import CountdownTimer from '../common/CountdownTimer';
import ScoreDisplay from './ScoreDisplay';
import { formatLocalTime } from '../../utils/time';
import { useFavorites } from '../../context/FavoritesContext';

export default function MatchCard({ match }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!match) return null;

  const {
    id,
    sport,
    league,
    venue,
    startTime,
    state = 'upcoming',
    status,
    resultText,
    scores = [],
  } = match;

  // Normalize teams
  const teams = match.teams && match.teams.length
    ? match.teams
    : [
        match.homeTeam || { name: 'Home Team' },
        match.awayTeam || { name: 'Away Team' },
      ];

  const team1 = teams[0] || { name: 'Team 1' };
  const team2 = teams[1] || { name: 'Team 2' };

  const isFav = isFavorite(team1.name, 'team') || isFavorite(team2.name, 'team');

  const handleCardClick = () => {
    navigate(`/match/${id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // Toggle primary team or sport
    toggleFavorite(team1.name, 'team');
  };

  return (
    <div
      role="article"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/70 p-5 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between focus-ring"
      aria-label={`${team1.name} versus ${team2.name}, status: ${state}`}
    >
      {/* Top Header: League, State Badge, Favorite Button */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gray-100 dark:border-gray-750">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">
            {league || sport || 'Match'}
          </span>
          {venue && (
            <>
              <span className="text-gray-300 dark:text-gray-600 text-xs">•</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 truncate hidden sm:inline max-w-[140px]" title={venue}>
                {venue}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {state === 'live' && <LiveBadge size="sm" />}
          {state === 'completed' && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              Completed
            </span>
          )}
          {state === 'upcoming' && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
              Upcoming
            </span>
          )}

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={isFav ? 'Remove team from favorites' : 'Add team to favorites'}
            className="p-1 rounded-full text-gray-300 hover:text-amber-400 dark:text-gray-600 dark:hover:text-amber-400 transition-colors focus-ring"
          >
            <svg
              className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : 'fill-none stroke-current'}`}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="space-y-3 my-1">
        {/* Teams with Logos */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {team1.logo ? (
              <img
                src={team1.logo}
                alt=""
                className="w-8 h-8 rounded-full object-contain bg-gray-100 dark:bg-gray-700 p-0.5 shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                {team1.name ? team1.name.slice(0, 2).toUpperCase() : 'T1'}
              </div>
            )}
            <span className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">
              {team1.name}
            </span>
          </div>

          <div className="text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0 px-1">
            vs
          </div>

          <div className="flex items-center justify-end gap-2.5 min-w-0 flex-1">
            <span className="font-semibold text-gray-900 dark:text-white truncate text-right text-sm sm:text-base">
              {team2.name}
            </span>
            {team2.logo ? (
              <img
                src={team2.logo}
                alt=""
                className="w-8 h-8 rounded-full object-contain bg-gray-100 dark:bg-gray-700 p-0.5 shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                {team2.name ? team2.name.slice(0, 2).toUpperCase() : 'T2'}
              </div>
            )}
          </div>
        </div>

        {/* ALWAYS Render Scores array for LIVE and COMPLETED */}
        {(state === 'live' || state === 'completed') && (
          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-750">
            <ScoreDisplay scores={scores} state={state} />
          </div>
        )}

        {/* State: Completed - Show resultText below scores */}
        {state === 'completed' && resultText && (
          <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
            {resultText}
          </div>
        )}

        {/* State: Live - Show match status (e.g. 2nd Innings, 65') */}
        {state === 'live' && status && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>{status}</span>
          </div>
        )}

        {/* State: Upcoming - Show start time in local timezone & CountdownTimer */}
        {state === 'upcoming' && (
          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-750 flex flex-col gap-1.5">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatLocalTime(startTime)}</span>
            </div>
            <CountdownTimer startTime={startTime} />
          </div>
        )}
      </div>

      {/* Footer / Details Action */}
      <div className="mt-4 pt-2.5 border-t border-gray-100 dark:border-gray-750/50 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <span className="truncate">{venue || (league ? `${league}` : '')}</span>
        <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 shrink-0">
          Details
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}
