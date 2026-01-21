'use client';

import { usePlayer } from '../context/PlayerContext';
import Image from 'next/image';

// Icons
const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const SkipNextIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
);

const SkipPrevIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
);

const ShuffleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
    </svg>
);

const RepeatIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
    </svg>
);

const VolumeIcon = ({ muted = false }: { muted?: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        {muted ? (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        ) : (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        )}
    </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const QueueIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
    </svg>
);

export default function PlayerBar() {
    const {
        currentStation,
        isPlaying,
        isLoading,
        volume,
        isMuted,
        togglePlay,
        setVolume,
        toggleMute,
    } = usePlayer();

    if (!currentStation) {
        return (
            <div className="player-bar">
                <div className="player-station">
                    <div className="player-station-image" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '24px'
                    }}>
                        🎵
                    </div>
                    <div className="player-station-info">
                        <h4>No station selected</h4>
                        <p>Choose a station to start listening</p>
                    </div>
                </div>

                <div className="player-controls">
                    <div className="player-buttons">
                        <button className="player-btn" disabled>
                            <ShuffleIcon />
                        </button>
                        <button className="player-btn" disabled>
                            <SkipPrevIcon />
                        </button>
                        <button className="player-btn player-btn-main" disabled style={{ opacity: 0.5 }}>
                            <PlayIcon />
                        </button>
                        <button className="player-btn" disabled>
                            <SkipNextIcon />
                        </button>
                        <button className="player-btn" disabled>
                            <RepeatIcon />
                        </button>
                    </div>
                </div>

                <div className="player-volume">
                    <button className="player-btn" disabled>
                        <QueueIcon />
                    </button>
                    <button className="player-btn" disabled>
                        <VolumeIcon />
                    </button>
                    <div className="volume-slider">
                        <div className="volume-fill" style={{ width: '80%' }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="player-bar">
            {/* Station Info */}
            <div className="player-station">
                <div className="player-station-image">
                    {currentStation.favicon ? (
                        <Image
                            src={currentStation.favicon}
                            alt={currentStation.name}
                            width={56}
                            height={56}
                            unoptimized
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
                            fontSize: '24px'
                        }}>
                            📻
                        </div>
                    )}
                </div>
                <div className="player-station-info">
                    <h4>{currentStation.name}</h4>
                    <p>{currentStation.country} • {currentStation.tags?.split(',')[0] || 'Radio'}</p>
                </div>
                <button className="player-favorite">
                    <HeartIcon />
                </button>
            </div>

            {/* Controls */}
            <div className="player-controls">
                <div className="player-buttons">
                    <button className="player-btn">
                        <ShuffleIcon />
                    </button>
                    <button className="player-btn">
                        <SkipPrevIcon />
                    </button>
                    <button
                        className="player-btn player-btn-main"
                        onClick={togglePlay}
                        style={{ position: 'relative' }}
                    >
                        {isLoading ? (
                            <div className="animate-pulse">⏳</div>
                        ) : isPlaying ? (
                            <PauseIcon />
                        ) : (
                            <PlayIcon />
                        )}
                    </button>
                    <button className="player-btn">
                        <SkipNextIcon />
                    </button>
                    <button className="player-btn">
                        <RepeatIcon />
                    </button>
                </div>

                <div className="player-progress">
                    <span className="player-time">
                        <span className="live-dot"></span>
                    </span>
                    <div className="player-progress-bar">
                        <div
                            className="player-progress-fill"
                            style={{ width: isPlaying ? '100%' : '0%' }}
                        />
                    </div>
                    <span className="player-time live-indicator">LIVE</span>
                </div>
            </div>

            {/* Volume */}
            <div className="player-volume">
                <button className="player-btn">
                    <QueueIcon />
                </button>
                <button className="player-btn" onClick={toggleMute}>
                    <VolumeIcon muted={isMuted} />
                </button>
                <div
                    className="volume-slider"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const newVolume = x / rect.width;
                        setVolume(newVolume);
                    }}
                >
                    <div
                        className="volume-fill"
                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
