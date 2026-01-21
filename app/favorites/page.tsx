'use client';

import { useFavorites } from '../context/FavoritesContext';
import { StationCard } from '../components';

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">❤️ Your Favorites</h1>
                    <p className="hero-subtitle">
                        {favorites.length > 0
                            ? `${favorites.length} saved station${favorites.length !== 1 ? 's' : ''}`
                            : 'Save your favorite stations for quick access'
                        }
                    </p>
                </div>
            </section>

            {/* Favorites Grid */}
            <section>
                {favorites.length > 0 ? (
                    <div className="stations-grid">
                        {favorites.map((station) => (
                            <StationCard key={station.stationuuid} station={station} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <h3>No favorites yet</h3>
                        <p>Click the heart icon on any station to add it to your favorites.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
