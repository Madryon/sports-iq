import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchMatches } from '../utils/api';
import { useFavorites } from '../context/FavoritesContext';

export function useMatches(sport = 'all', state = '') {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMock, setIsMock] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const { isFavorite } = useFavorites();

  const loadData = useCallback(async (isBackground = false) => {
    if (!isBackground) {
      setLoading(true);
    }
    setError(null);

    const { data, error: reqError } = await fetchMatches(sport, state);

    if (reqError) {
      setError(reqError.message || 'Failed to load matches');
    } else {
      const matchesArr = Array.isArray(data) ? data : (data?.data || data?.matches || []);
      setMatches(Array.isArray(matchesArr) ? matchesArr : []);
      setIsMock(Boolean(data?.isMock));
      setLastUpdated(Date.now());
    }

    if (!isBackground) {
      setLoading(false);
    }
  }, [sport, state]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Sort matches so that favorite teams appear first
  const sortedMatches = useMemo(() => {
    if (!matches || !matches.length) return [];

    return [...matches].sort((a, b) => {
      const aFav =
        (a.teams && a.teams.some(t => isFavorite(t.name, 'team') || isFavorite(t.id, 'team'))) ||
        isFavorite(a.sport, 'sport');
      const bFav =
        (b.teams && b.teams.some(t => isFavorite(t.name, 'team') || isFavorite(t.id, 'team'))) ||
        isFavorite(b.sport, 'sport');

      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;

      // Keep original order or sort by date
      return 0;
    });
  }, [matches, isFavorite]);

  return {
    matches: sortedMatches,
    rawMatches: matches,
    isMock,
    loading,
    error,
    lastUpdated,
    refetch: () => loadData(false),
    silentRefetch: () => loadData(true),
  };
}
