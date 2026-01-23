'use client';

import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useFavorites } from '../context/FavoritesContext';
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

const SleepTimerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
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
        nextStation,
        previousStation,
        hasNext,
        hasPrevious,
        sleepTimer,
        timeRemaining,
        startSleepTimer,
        cancelSleepTimer,
    } = usePlayer();

    const [showSleepMenu, setShowSleepMenu] = React.useState(false);

    const handleSleepTimer = (minutes: number) => {
        startSleepTimer(minutes);
        setShowSleepMenu(false);
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const { isFavorite, toggleFavorite } = useFavorites();
    const isStationFavorite = currentStation ? isFavorite(currentStation.stationuuid) : false;

    if (!currentStation) {
        return (
            <div className="player-bar">
                <div className="player-station">
                    <div className="player-station-image flex items-center justify-center text-[var(--text-muted)] text-2xl">
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
                            <SkipPrevIcon />
                        </button>
                        <button className="player-btn player-btn-main" disabled style={{ opacity: 0.5 }}>
                            <PlayIcon />
                        </button>
                        <button className="player-btn" disabled>
                            <SkipNextIcon />
                        </button>
                    </div>
                </div>

                <div className="player-volume">
                    <button className="player-btn" disabled>
                        <SleepTimerIcon />
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

    // Trim favicon URL to avoid issues with trailing spaces
    const faviconUrl = currentStation.favicon?.trim() || '';

    return (
        <div className="player-bar">
            {/* Station Info */}
            <div className="player-station">
                <div className="player-station-image">
                    {faviconUrl ? (
                        <Image
                            src={faviconUrl}
                            alt={currentStation.name}
                            width={56}
                            height={56}
                            unoptimized
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            📻
                        </div>
                    )}
                </div>
                <div className="player-station-info">
                    <h4>{currentStation.name}</h4>
                    <p>{currentStation.country} • {currentStation.tags?.split(',')[0] || 'Radio'}</p>
                </div>
                <button
                    className={`player-favorite ${isStationFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(currentStation)}
                >
                    <HeartIcon filled={isStationFavorite} />
                </button>
            </div>

            {/* Controls */}
            <div className="player-controls">
                <div className="player-buttons">
                    <button 
                        className="player-btn"
                        onClick={previousStation}
                        disabled={!hasPrevious}
                        style={{ opacity: hasPrevious ? 1 : 0.3 }}
                        title="Previous station"
                    >
                        <SkipPrevIcon />
                    </button>
                    <button
                        className="player-btn player-btn-main relative"
                        onClick={togglePlay}
                    >
                        {isLoading ? (
                            <div className="animate-pulse">⏳</div>
                        ) : isPlaying ? (
                            <PauseIcon />
                        ) : (
                            <PlayIcon />
                        )}
                    </button>
                    <button 
                        className="player-btn"
                        onClick={nextStation}
                        disabled={!hasNext}
                        style={{ opacity: hasNext ? 1 : 0.3 }}
                        title="Next station"
                    >
                        <SkipNextIcon />
                    </button>
                </div>

                {/* <div className="player-progress">
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
                </div> */}
            </div>

            {/* Volume */}
            <div className="player-volume">
                <div className="relative">
                    <button 
                        className={`player-btn ${sleepTimer ? 'text-[var(--accent-primary)]' : ''}`}
                        onClick={() => setShowSleepMenu(!showSleepMenu)}
                        title={sleepTimer ? `Sleep timer: ${formatTime(timeRemaining)}` : 'Set sleep timer'}
                    >
                        <SleepTimerIcon />
                        {sleepTimer && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-primary)] rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                                ✓
                            </span>
                        )}
                    </button>
                    {showSleepMenu && (
                        <div className="sleep-timer-menu">
                            <div className="text-xs text-[var(--text-muted)] px-3 py-2 font-semibold border-b border-[var(--border)]">
                                Sleep Timer
                            </div>
                            {sleepTimer ? (
                                <div className="px-3 py-4">
                                    <div className="text-center mb-3">
                                        <div className="text-xs text-[var(--text-muted)] mb-1">Time remaining</div>
                                        <div className="text-2xl font-bold text-[var(--accent-primary)]">
                                            {formatTime(timeRemaining)}
                                        </div>
                                    </div>
                                    <button
                                        className="w-full text-center px-3 py-2 text-sm hover:bg-[var(--hover-bg)] rounded font-medium text-[var(--accent-primary)]"
                                        onClick={() => {
                                            cancelSleepTimer();
                                            setShowSleepMenu(false);
                                        }}
                                    >
                                        Cancel Timer
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {[15, 30, 45, 60, 90, 120].map(minutes => (
                                        <button
                                            key={minutes}
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--hover-bg)] transition-colors"
                                            onClick={() => handleSleepTimer(minutes)}
                                        >
                                            {minutes} minutes
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
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
