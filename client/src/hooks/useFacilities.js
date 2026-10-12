import { useState, useEffect, useCallback } from 'react';
import { fetchFacilities } from '../utils/api';

export function useFacilities(sport = '', city = '') {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: reqError } = await fetchFacilities(sport, city);

    if (reqError) {
      setError(reqError.message || 'Failed to load sports facilities');
    } else {
      setFacilities(Array.isArray(data) ? data : (data?.data || data?.facilities || []));
    }

    setLoading(false);
  }, [sport, city]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    facilities,
    loading,
    error,
    refetch: loadData,
  };
}
