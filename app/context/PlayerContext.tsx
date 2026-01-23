'use client';

import { createContext, useContext, useReducer, useRef, useEffect, useCallback, type ReactNode } from 'react';
import type { RadioStation, PlayerState } from '../types';
import { reportClick } from '../lib/api';

// Actions
type PlayerAction =
    | { type: 'SET_STATION'; payload: RadioStation }
    | { type: 'SET_STATION_LIST'; payload: RadioStation[] }
    | { type: 'PLAY' }
    | { type: 'PAUSE' }
    | { type: 'TOGGLE_PLAY' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_VOLUME'; payload: number }
    | { type: 'TOGGLE_MUTE' }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_SLEEP_TIMER'; payload: number | null }
    | { type: 'UPDATE_TIME_REMAINING'; payload: number }
    | { type: 'CLEAR' };

// Initial state
const initialState: PlayerState = {
    currentStation: null,
    isPlaying: false,
    isLoading: false,
    volume: 0.8,
    isMuted: false,
    error: null,
};

const initialStationList: RadioStation[] = [];

// Reducer
function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
    switch (action.type) {
        case 'SET_STATION':
            return {
                ...state,
                currentStation: action.payload,
                isLoading: true,
                error: null,
            };
        case 'PLAY':
            return { ...state, isPlaying: true, isLoading: false };
        case 'PAUSE':
            return { ...state, isPlaying: false };
        case 'TOGGLE_PLAY':
            return { ...state, isPlaying: !state.isPlaying };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_VOLUME':
            return { ...state, volume: action.payload };
        case 'TOGGLE_MUTE':
            return { ...state, isMuted: !state.isMuted };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false, isPlaying: false };
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
}

// Context
interface PlayerContextType extends PlayerState {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    playStation: (station: RadioStation, stationList?: RadioStation[]) => void;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    stop: () => void;
    nextStation: () => void;
    previousStation: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    // Sleep timer
    sleepTimer: number | null;
    timeRemaining: number;
    startSleepTimer: (minutes: number) => void;
    cancelSleepTimer: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

// Provider
export function PlayerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [stationList, setStationList] = useReducer(
        (_: RadioStation[], newList: RadioStation[]) => newList,
        initialStationList
    );
    const currentIndex = state.currentStation
        ? stationList.findIndex(s => s.stationuuid === state.currentStation?.stationuuid)
        : -1;
    const hasNext = currentIndex >= 0 && currentIndex < stationList.length - 1;
    const hasPrevious = currentIndex > 0;

    // Sleep timer state
    const [sleepTimer, setSleepTimer] = useReducer(
        (_: number | null, newTimer: number | null) => newTimer,
        null
    );
    const [timeRemaining, setTimeRemaining] = useReducer(
        (_: number, newTime: number) => newTime,
        0
    );

    // Initialize audio element
    useEffect(() => {
        if (typeof window !== 'undefined' && !audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.preload = 'none';
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => dispatch({ type: 'PLAY' });
        const handlePause = () => dispatch({ type: 'PAUSE' });
        const handleWaiting = () => dispatch({ type: 'SET_LOADING', payload: true });
        const handleCanPlay = () => dispatch({ type: 'SET_LOADING', payload: false });
        const handleError = () => {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load stream. The station may be offline.' });
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
        };
    }, []);

    // Update volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = state.isMuted ? 0 : state.volume;
        }
    }, [state.volume, state.isMuted]);

    // Actions
    const playStation = useCallback((station: RadioStation, newStationList?: RadioStation[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        // Update station list if provided
        if (newStationList && newStationList.length > 0) {
            setStationList(newStationList);
        }

        // Report click for analytics
        reportClick(station.stationuuid);

        // Set new station
        dispatch({ type: 'SET_STATION', payload: station });

        // Load and play
        audio.src = station.url_resolved || station.url;
        audio.load();
        audio.play().catch(() => {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to play stream' });
        });

        // Save to recently played
        const recent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
        const filtered = recent.filter((s: RadioStation) => s.stationuuid !== station.stationuuid);
        const updated = [station, ...filtered].slice(0, 20);
        localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
    }, []);

    const nextStation = useCallback(() => {
        if (hasNext && stationList[currentIndex + 1]) {
            playStation(stationList[currentIndex + 1]);
        }
    }, [hasNext, stationList, currentIndex, playStation]);

    const previousStation = useCallback(() => {
        if (hasPrevious && stationList[currentIndex - 1]) {
            playStation(stationList[currentIndex - 1]);
        }
    }, [hasPrevious, stationList, currentIndex, playStation]);

    // Sleep timer functions
    const startSleepTimer = useCallback((minutes: number) => {
        const endTime = Date.now() + minutes * 60 * 1000;
        setSleepTimer(endTime);
        setTimeRemaining(minutes * 60);
    }, []);

    const cancelSleepTimer = useCallback(() => {
        setSleepTimer(null);
        setTimeRemaining(0);
    }, []);

    // Media Session API
    useEffect(() => {
        if ('mediaSession' in navigator && state.currentStation) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: state.currentStation.name,
                artist: state.currentStation.country,
                artwork: state.currentStation.favicon
                    ? [{ src: state.currentStation.favicon, sizes: '512x512', type: 'image/png' }]
                    : [],
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audioRef.current?.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                audioRef.current?.pause();
            });
            navigator.mediaSession.setActionHandler('nexttrack', hasNext ? () => {
                nextStation();
            } : null);
            navigator.mediaSession.setActionHandler('previoustrack', hasPrevious ? () => {
                previousStation();
            } : null);
        }
    }, [state.currentStation, hasNext, hasPrevious, nextStation, previousStation]);

    const play = useCallback(() => {
        audioRef.current?.play().catch(() => {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to play stream' });
        });
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const togglePlay = useCallback(() => {
        if (audioRef.current?.paused) {
            play();
        } else {
            pause();
        }
    }, [play, pause]);

    const setVolume = useCallback((volume: number) => {
        dispatch({ type: 'SET_VOLUME', payload: Math.max(0, Math.min(1, volume)) });
    }, []);

    const toggleMute = useCallback(() => {
        dispatch({ type: 'TOGGLE_MUTE' });
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
        }
        dispatch({ type: 'CLEAR' });
    }, []);

    // Sleep timer countdown effect
    useEffect(() => {
        if (!sleepTimer) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.floor((sleepTimer - Date.now()) / 1000));
            setTimeRemaining(remaining);

            if (remaining <= 0) {
                audioRef.current?.pause();
                setSleepTimer(null);
                setTimeRemaining(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sleepTimer]);

    const value: PlayerContextType = {
        ...state,
        audioRef,
        playStation,
        play,
        pause,
        togglePlay,
        setVolume,
        toggleMute,
        stop,
        nextStation,
        previousStation,
        hasNext,
        hasPrevious,
        sleepTimer,
        timeRemaining,
        startSleepTimer,
        cancelSleepTimer,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}

// Hook
export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}
