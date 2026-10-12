import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMatch } from '../utils/api';
import LiveBadge from '../components/common/LiveBadge';
import CountdownTimer from '../components/common/CountdownTimer';
import ScoreDisplay from '../components/matches/ScoreDisplay';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import LastUpdated from '../components/common/LastUpdated';
import { formatLocalTime } from '../utils/time';
import { useFavorites } from '../context/FavoritesContext';
import { usePolling } from '../hooks/usePolling';

export default function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const loadData = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    setError(null);

    const { data, error: reqErr } = await fetchMatch(id);

    if (reqErr) {
      setError(reqErr.message || 'Match not found');
    } else {
      setMatch(data?.data || data?.match || data);
      setLastUpdated(Date.now());
    }

    if (!isBackground) setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const isLive = match?.state === 'live';
  usePolling(() => {
    loadData(true);
  }, isLive, 15000); // 15s poll for single live match

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1.5"
        >
          ← Back
        </button>
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-6"
        >
          ← Back
        </button>
        <ErrorState
          title="Match Not Found"
          message={error || 'Could not find details for this match.'}
          onRetry={() => loadData(false)}
        />
      </div>
    );
  }

  const {
    league,
    sport,
    venue,
    startTime,
    state = 'upcoming',
    status,
    resultText,
    scores = [],
    commentary = [],
    timeline = [],
    stats = [],
  } = match;

  const teams = match.teams && match.teams.length
    ? match.teams
    : [
        match.homeTeam || { name: 'Home Team' },
        match.awayTeam || { name: 'Away Team' },
      ];

  const team1 = teams[0] || { name: 'Team 1' };
  const team2 = teams[1] || { name: 'Team 2' };

  const isFav = isFavorite(team1.name, 'team') || isFavorite(team2.name, 'team');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top bar with back button, league & last updated */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus-ring"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-3">
          <LastUpdated timestamp={lastUpdated} onRefresh={() => loadData(false)} />
          <button
            type="button"
            onClick={() => toggleFavorite(team1.name, 'team')}
            aria-label={isFav ? 'Remove favorite' : 'Add favorite'}
            className="p-1.5 rounded-full text-gray-400 hover:text-amber-400 dark:hover:text-amber-400 transition-colors focus-ring"
          >
            <svg
              className={`w-5 h-5 ${isFav ? 'fill-amber-400 text-amber-400' : 'fill-none stroke-current'}`}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Scoreboard Card */}
      <div className="bg-white dark:bg-gray-850 rounded-3xl border border-gray-200 dark:border-gray-700/80 p-6 sm:p-8 shadow-sm space-y-6">
        {/* League, Venue & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {sport}
            </span>
            <span className="text-gray-300 dark:text-gray-600 mx-2">•</span>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              {league || 'Tournament'}
            </span>
            {venue && (
              <span className="text-xs text-gray-400 dark:text-gray-500 block sm:inline sm:ml-2">
                📍 {venue}
              </span>
            )}
          </div>

          <div>
            {state === 'live' && <LiveBadge size="md" />}
            {state === 'completed' && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                Completed
              </span>
            )}
            {state === 'upcoming' && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                Upcoming
              </span>
            )}
          </div>
        </div>

        {/* Large Teams Display */}
        <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-6 py-4">
          {/* Team 1 */}
          <div className="sm:col-span-3 flex flex-col sm:flex-row items-center sm:justify-start gap-4 text-center sm:text-left">
            {team1.logo ? (
              <img
                src={team1.logo}
                alt={team1.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-gray-50 dark:bg-gray-800 p-2 border border-gray-100 dark:border-gray-700 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black text-2xl flex items-center justify-center border border-blue-500/20">
                {team1.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                {team1.name}
              </h2>
            </div>
          </div>

          {/* Center VS or Status */}
          <div className="sm:col-span-1 text-center">
            {state === 'live' && status ? (
              <div className="inline-flex flex-col items-center">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest animate-pulse">
                  {status}
                </span>
              </div>
            ) : (
              <span className="text-lg font-black text-gray-300 dark:text-gray-600">VS</span>
            )}
          </div>

          {/* Team 2 */}
          <div className="sm:col-span-3 flex flex-col sm:flex-row-reverse items-center sm:justify-start gap-4 text-center sm:text-right">
            {team2.logo ? (
              <img
                src={team2.logo}
                alt={team2.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-gray-50 dark:bg-gray-800 p-2 border border-gray-100 dark:border-gray-700 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-2xl flex items-center justify-center border border-emerald-500/20">
                {team2.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                {team2.name}
              </h2>
            </div>
          </div>
        </div>

        {/* ALWAYS Render Scores array prominently for live and completed */}
        {(state === 'live' || state === 'completed') && (
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Official Scoreboard
            </h3>
            <ScoreDisplay scores={scores} state={state} />
          </div>
        )}

        {/* State: Completed Result Banner */}
        {state === 'completed' && resultText && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-emerald-800 dark:text-emerald-300 font-semibold text-center text-sm sm:text-base">
            🏆 {resultText}
          </div>
        )}

        {/* State: Upcoming Time & Countdown */}
        {state === 'upcoming' && (
          <div className="p-6 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Scheduled Start: <span className="font-bold text-gray-900 dark:text-white">{formatLocalTime(startTime)}</span>
            </div>
            <CountdownTimer startTime={startTime} className="text-sm font-semibold" />
          </div>
        )}
      </div>

      {/* Match Commentary / Timeline / Additional details if provided */}
      {((commentary && commentary.length > 0) || (timeline && timeline.length > 0)) && (
        <div className="bg-white dark:bg-gray-850 rounded-3xl border border-gray-200 dark:border-gray-700/80 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Live Feed & Timeline
          </h3>
          <div className="space-y-3">
            {(commentary.length > 0 ? commentary : timeline).map((entry, idx) => (
              <div key={idx} className="flex gap-3 text-sm pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                  {entry.time || `${idx + 1}'`}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{entry.text || entry.description || entry}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
