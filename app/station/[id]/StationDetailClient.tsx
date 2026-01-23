'use client';

import { usePlayer } from '../../context/PlayerContext';
import { useFavorites } from '../../context/FavoritesContext';
import { StationCard, SafeImage } from '../../components';
import Link from 'next/link';
import type { RadioStation } from '../../types';

interface StationDetailClientProps {
    station: RadioStation;
    relatedStations: RadioStation[];
}

export default function StationDetailClient({ station, relatedStations }: StationDetailClientProps) {
    const { playStation, currentStation, isPlaying, isLoading } = usePlayer();
    const { isFavorite, toggleFavorite } = useFavorites();

    const isCurrentStation = currentStation?.stationuuid === station.stationuuid;
    const isStationFavorite = isFavorite(station.stationuuid);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: station.name,
                    text: `Listen to ${station.name} on RadioLIV`,
                    url: window.location.href,
                });
            } catch {
                // User cancelled or error
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const tags = station.tags?.split(',').filter(t => t.trim()) || [];

    return (
        <div className="animate-fade-in pb-10">
            {/* Header */}
            <section className="hero-section" style={{
                background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.2) 0%, rgba(156, 39, 176, 0.15) 100%)'
            }}>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] no-underline mb-6 text-sm hover:text-[var(--text-primary)]"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                    Back to Home
                </Link>

                <div className="flex gap-8 items-start">
                    {/* Station Image */}
                    <div className="w-[200px] h-[200px] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--bg-secondary)] flex-shrink-0 shadow-[var(--shadow-card)]">
                        {station.favicon ? (
                            <SafeImage
                                src={station.favicon}
                                alt={station.name}
                                width={200}
                                height={200}
                                className="object-cover w-full h-full"
                                fallback={
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '80px',
                                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                                    }}>
                                        📻
                                    </div>
                                }
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '80px',
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)'
                            }}>
                                📻
                            </div>
                        )}
                    </div>

                    {/* Station Info */}
                    <div className="flex-1">
                        <div className="live-indicator mb-2">
                            <span className="live-dot"></span>
                            RADIO STATION
                        </div>
                        <h1 className="hero-title text-[42px] mb-2">
                            {station.name}
                        </h1>
                        <p className="hero-subtitle mb-5">
                            {station.country} {station.state && `• ${station.state}`} • {station.bitrate || 128} kbps • {station.codec || 'MP3'}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-6">
                            <button
                                className="btn btn-primary min-w-[140px]"
                            >
                                {isLoading && isCurrentStation ? (
                                    <>⏳ Loading...</>
                                ) : isCurrentStation && isPlaying ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                        </svg>
                                        Playing
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        Play Now
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

                            <button className="btn btn-secondary" onClick={handleShare}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                                </svg>
                                Share
                            </button>
                        </div>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 8).map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/genre/${encodeURIComponent(tag.trim())}`}
                                        className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[var(--radius-full)] text-[var(--text-secondary)] text-xs no-underline hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                                    >
                                        {tag.trim()}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Station Details */}
            <section className="px-8 py-0 mb-5">
                <h2 className="section-title mb-5">📋 Station Details</h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 bg-[var(--bg-card)] p-6 rounded-[var(--radius-lg)] border border-[var(--border-color)]">
                    <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Country</p>
                        <p className="text-sm font-medium">{station.country || 'Unknown'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Language</p>
                        <p className="text-sm font-medium">{station.language || 'Unknown'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Bitrate</p>
                        <p className="text-sm font-medium">{station.bitrate || 128} kbps</p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Codec</p>
                        <p className="text-sm font-medium">{station.codec || 'MP3'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Votes</p>
                        <p className="text-sm font-medium">{station.votes?.toLocaleString() || 0}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Clicks</p>
                        <p className="text-sm font-medium">{station.clickcount?.toLocaleString() || 0}</p>
                    </div>
                    {station.homepage && (
                        <div className="col-span-2">
                            <p className="text-xs text-[var(--text-muted)] mb-1">Website</p>
                            <a
                                href={station.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[var(--accent-primary)] no-underline hover:underline"
                            >
                                {station.homepage}
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Stations */}
            {relatedStations.length > 0 && (
                <section className="mb-10">
                    <div className="section-header">
                        <h2 className="section-title">🎵 Similar Stations</h2>
                    </div>
                    <div className="stations-grid">
                        {relatedStations.map((s) => (
                            <StationCard key={s.stationuuid} station={s} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
