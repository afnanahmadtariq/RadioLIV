'use client';

import { useState } from 'react';
import { StationCard } from '../components';
import type { RadioStation } from '../types';

export default function RecentPage() {
    const [recentStations, setRecentStations] = useState<RadioStation[]>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('recentlyPlayed');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch {
                    return [];
                }
            }
        }
        return [];
    });

    const clearHistory = () => {
        localStorage.removeItem('recentlyPlayed');
        setRecentStations([]);
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">🕐 Recently Played</h1>
                    <p className="hero-subtitle">
                        {recentStations.length > 0
                            ? `Your last ${recentStations.length} played station${recentStations.length !== 1 ? 's' : ''}`
                            : 'Stations you listen to will appear here'
                        }
                    </p>
                    {recentStations.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="btn btn-secondary"
                            style={{ marginTop: '16px' }}
                        >
                            Clear History
                        </button>
                    )}
                </div>
            </section>

            {/* Recent Stations Grid */}
            <section>
                {recentStations.length > 0 ? (
                    <div className="stations-grid">
                        {recentStations.map((station) => (
                            <StationCard key={station.stationuuid} station={station} stationList={recentStations} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                            </svg>
                        </div>
                        <h3>No listening history</h3>
                        <p>Start playing stations to build your history.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
