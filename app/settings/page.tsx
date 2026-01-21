'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function SettingsPage() {
    const { pause, volume, setVolume, isMuted, toggleMute } = usePlayer();

    // Sleep Timer State
    const [sleepTimer, setSleepTimer] = useState<number | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [customMinutes, setCustomMinutes] = useState('');

    // Sleep timer presets
    const timerPresets = [
        { label: '15 min', value: 15 },
        { label: '30 min', value: 30 },
        { label: '45 min', value: 45 },
        { label: '1 hour', value: 60 },
        { label: '2 hours', value: 120 },
    ];

    const startSleepTimer = useCallback((minutes: number) => {
        setSleepTimer(Date.now() + minutes * 60 * 1000);
        setTimeRemaining(minutes * 60);
    }, []);

    const cancelSleepTimer = useCallback(() => {
        setSleepTimer(null);
        setTimeRemaining(0);
    }, []);

    // Sleep timer countdown
    useEffect(() => {
        if (!sleepTimer) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.floor((sleepTimer - Date.now()) / 1000));
            setTimeRemaining(remaining);

            if (remaining <= 0) {
                pause();
                setSleepTimer(null);
                setTimeRemaining(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sleepTimer, pause]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleCustomTimer = () => {
        const mins = parseInt(customMinutes);
        if (mins > 0 && mins <= 480) {
            startSleepTimer(mins);
            setCustomMinutes('');
        }
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">⚙️ Settings</h1>
                    <p className="hero-subtitle">
                        Customize your RadioLIV experience
                    </p>
                </div>
            </section>

            {/* Settings Sections */}
            <div style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Sleep Timer */}
                <section style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🌙 Sleep Timer
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Automatically stop playback after a set time
                    </p>

                    {sleepTimer ? (
                        <div style={{
                            background: 'rgba(233, 30, 99, 0.1)',
                            border: '1px solid var(--accent-primary)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '20px',
                            textAlign: 'center',
                            marginBottom: '16px'
                        }}>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                Playback will stop in
                            </p>
                            <p style={{ fontSize: '48px', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '16px' }}>
                                {formatTime(timeRemaining)}
                            </p>
                            <button className="btn btn-secondary" onClick={cancelSleepTimer}>
                                Cancel Timer
                            </button>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                {timerPresets.map((preset) => (
                                    <button
                                        key={preset.value}
                                        className="btn btn-secondary"
                                        onClick={() => startSleepTimer(preset.value)}
                                        style={{ minWidth: '80px' }}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                    type="number"
                                    placeholder="Custom minutes"
                                    value={customMinutes}
                                    onChange={(e) => setCustomMinutes(e.target.value)}
                                    min="1"
                                    max="480"
                                    style={{
                                        padding: '10px 16px',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)',
                                        fontSize: '14px',
                                        width: '150px',
                                    }}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleCustomTimer}
                                    disabled={!customMinutes || parseInt(customMinutes) <= 0}
                                >
                                    Set Timer
                                </button>
                            </div>
                        </>
                    )}
                </section>

                {/* Audio Settings */}
                <section style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🔊 Audio Settings
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Adjust playback settings
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '14px' }}>Volume</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={isMuted ? 0 : Math.round(volume * 100)}
                                    onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                                    style={{ width: '200px' }}
                                />
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)', minWidth: '40px' }}>
                                    {isMuted ? '0' : Math.round(volume * 100)}%
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '14px' }}>Mute</span>
                            <button
                                onClick={toggleMute}
                                style={{
                                    width: '50px',
                                    height: '28px',
                                    borderRadius: '14px',
                                    border: 'none',
                                    background: isMuted ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <span style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: isMuted ? '24px' : '2px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    transition: 'left 0.2s',
                                }} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Data & Storage */}
                <section style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        💾 Data & Storage
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Manage your local data
                    </p>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                localStorage.removeItem('recentlyPlayed');
                                window.location.reload();
                            }}
                        >
                            Clear History
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                localStorage.removeItem('favorites');
                                window.location.reload();
                            }}
                        >
                            Clear Favorites
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            style={{ color: '#f44336' }}
                        >
                            Clear All Data
                        </button>
                    </div>
                </section>

                {/* About */}
                <section style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ℹ️ About RadioLIV
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        RadioLIV is a free online radio player powered by the Radio Browser API.
                    </p>

                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        <p style={{ marginBottom: '8px' }}>Version: 1.0.0</p>
                        <p style={{ marginBottom: '8px' }}>
                            Data provided by{' '}
                            <a href="https://www.radio-browser.info/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
                                Radio Browser
                            </a>
                        </p>
                        <p>
                            RadioLIV does not host or stream audio content. All radio streams are provided by their respective broadcasters.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
