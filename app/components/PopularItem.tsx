'use client';

import Image from 'next/image';
import { usePlayer } from '../context/PlayerContext';
import type { RadioStation } from '../types';

interface PopularItemProps {
    station: RadioStation;
    index: number;
}

export default function PopularItem({ station, index }: PopularItemProps) {
    const { playStation, currentStation, isPlaying } = usePlayer();
    const isCurrentStation = currentStation?.stationuuid === station.stationuuid;

    return (
        <div
            className={`popular-item ${isCurrentStation ? 'playing' : ''}`}
            onClick={() => playStation(station)}
        >
            <span style={{
                width: '24px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '14px',
                fontWeight: '500'
            }}>
                {index + 1}
            </span>

            <div className="popular-item-image">
                {station.favicon ? (
                    <Image
                        src={station.favicon}
                        alt={station.name}
                        width={48}
                        height={48}
                        unoptimized
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        background: `linear-gradient(135deg, hsl(${station.name.length * 20}, 70%, 40%) 0%, hsl(${station.name.length * 30}, 60%, 30%) 100%)`
                    }}>
                        📻
                    </div>
                )}
            </div>

            <div className="popular-item-info">
                <p className="popular-item-name">{station.name}</p>
                <p className="popular-item-meta">
                    {station.country} {station.tags && `• ${station.tags.split(',')[0]}`}
                </p>
            </div>

            <span className="popular-item-duration">
                {isCurrentStation && isPlaying ? (
                    <span className="live-indicator">
                        <span className="live-dot"></span>
                        LIVE
                    </span>
                ) : (
                    station.bitrate ? `${station.bitrate} kbps` : 'Radio'
                )}
            </span>

            <button
                className="popular-item-action btn-icon"
                onClick={(e) => {
                    e.stopPropagation();
                    // Add to favorites logic
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </button>
        </div>
    );
}
