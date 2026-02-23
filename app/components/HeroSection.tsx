'use client';

import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
import SafeImage from './SafeImage';
import type { RadioStation } from '../types';

interface HeroSectionProps {
    station: RadioStation;
    stationList?: RadioStation[];
}

export default function HeroSection({ station, stationList }: HeroSectionProps) {
    const { playStation, currentStation, isPlaying, isLoading } = usePlayer();
    const { isFavorite, toggleFavorite } = useFavorites();

    const isCurrentStation = currentStation?.stationuuid === station.stationuuid;
    const isStationFavorite = isFavorite(station.stationuuid);

    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="live-indicator mb-4">
                    <span className="live-dot"></span>
                    FEATURED STATION
                </div>
                <h1 className="hero-title">{station.name}</h1>
                <p className="hero-subtitle">
                    {station.country} • {station.tags?.split(',').slice(0, 2).join(', ') || 'Radio'} • {station.bitrate || '128'} kbps
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => playStation(station, stationList)}
                        disabled={isLoading && isCurrentStation}
                    >
                        {isLoading && isCurrentStation ? (
                            <>⏳ Loading...</>
                        ) : isCurrentStation && isPlaying ? (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                                Now Playing
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Listen Now
                            </>
                        )}
                    </button>
                    <button
                        className={`btn ${isStationFavorite ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => toggleFavorite(station)}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={isStationFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {isStationFavorite ? 'Favorited' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
            {station.favicon && (
                <div className="hero-image">
                    <SafeImage
                        src={station.favicon}
                        alt={station.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                        fallback={
                            <div className="w-full h-full flex items-center justify-center text-[80px]" style={{
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                            }}>
                                📻
                            </div>
                        }
                    />
                </div>
            )}
        </section>
    );
}
