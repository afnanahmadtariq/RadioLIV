'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { RadioStation } from '../types';

interface FavoritesContextType {
    favorites: RadioStation[];
    isFavorite: (stationuuid: string) => boolean;
    addFavorite: (station: RadioStation) => void;
    removeFavorite: (stationuuid: string) => void;
    toggleFavorite: (station: RadioStation) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<RadioStation[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch {
                setFavorites([]);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const isFavorite = useCallback((stationuuid: string) => {
        return favorites.some(s => s.stationuuid === stationuuid);
    }, [favorites]);

    const addFavorite = useCallback((station: RadioStation) => {
        setFavorites(prev => {
            if (prev.some(s => s.stationuuid === station.stationuuid)) {
                return prev;
            }
            return [station, ...prev];
        });
    }, []);

    const removeFavorite = useCallback((stationuuid: string) => {
        setFavorites(prev => prev.filter(s => s.stationuuid !== stationuuid));
    }, []);

    const toggleFavorite = useCallback((station: RadioStation) => {
        if (isFavorite(station.stationuuid)) {
            removeFavorite(station.stationuuid);
        } else {
            addFavorite(station);
        }
    }, [isFavorite, addFavorite, removeFavorite]);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            isFavorite,
            addFavorite,
            removeFavorite,
            toggleFavorite,
        }}>
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
