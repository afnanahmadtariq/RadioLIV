'use client';

import SafeImage from './SafeImage';
import type { RadioStation } from '../types';

interface HeroSectionProps {
    station: RadioStation;
}

export default function HeroSection({ station }: HeroSectionProps) {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="live-indicator" style={{ marginBottom: '16px' }}>
                    <span className="live-dot"></span>
                    FEATURED STATION
                </div>
                <h1 className="hero-title">{station.name}</h1>
                <p className="hero-subtitle">
                    {station.country} • {station.tags?.split(',').slice(0, 2).join(', ') || 'Radio'} • {station.bitrate || '128'} kbps
                </p>
                <div className="hero-actions">
                    <a href={`/station/${station.stationuuid}`} className="btn btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Listen Now
                    </a>
                    <button className="btn btn-secondary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        Add to Favorites
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
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                </div>
            )}
        </section>
    );
}
