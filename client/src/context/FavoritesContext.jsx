import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

const STORAGE_KEY = 'sports_iq_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { sports: [], teams: [] };
    } catch {
      return { sports: [], teams: [] };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (item, type = 'team') => {
    setFavorites(prev => {
      const list = prev[type] || [];
      const id = typeof item === 'object' ? item.id || item.name : item;
      const exists = list.some(fav => (typeof fav === 'object' ? (fav.id || fav.name) : fav) === id);

      const nextList = exists
        ? list.filter(fav => (typeof fav === 'object' ? (fav.id || fav.name) : fav) !== id)
        : [...list, item];

      return {
        ...prev,
        [type]: nextList,
      };
    });
  };

  const isFavorite = (item, type = 'team') => {
    const list = favorites[type] || [];
    const id = typeof item === 'object' ? item.id || item.name : item;
    return list.some(fav => (typeof fav === 'object' ? (fav.id || fav.name) : fav) === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
