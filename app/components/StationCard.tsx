'use client';

import Image from 'next/image';
import { usePlayer } from '../context/PlayerContext';
import type { RadioStation } from '../types';

const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

interface StationCardProps {
    station: RadioStation;
    stationList?: RadioStation[];
}

export default function StationCard({ station, stationList }: StationCardProps) {
    const { playStation, currentStation, isPlaying } = usePlayer();
    const isCurrentStation = currentStation?.stationuuid === station.stationuuid;

    // Trim favicon URL and upgrade http to https to avoid mixed content warnings
    let faviconUrl = station.favicon?.trim() || '';
    if (faviconUrl.startsWith('http://')) {
        faviconUrl = faviconUrl.replace('http://', 'https://');
    }

    const handlePlay = () => {
        playStation(station, stationList);
    };

    return (
        <div
            className={`station-card ${isCurrentStation ? 'playing' : ''}`}
            onClick={handlePlay}
        >
            <div className="station-card-image">
                {faviconUrl ? (
                    <Image
                        src={faviconUrl}
                        alt={station.name}
                        width={160}
                        height={160}
                        unoptimized
                        className="object-cover w-full h-full"
                        onError={(e: any) => {
                            if (e.target) (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl" style={{
                        background: `linear-gradient(135deg, hsl(${station.name.length * 20}, 70%, 40%) 0%, hsl(${station.name.length * 30}, 60%, 30%) 100%)`
                    }}>
                        📻
                    </div>
                )}
                <button
                    className="station-card-play"
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePlay();
                    }}
                >
                    {isCurrentStation && isPlaying ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <PlayIcon />
                    )}
                </button>
            </div>
            <h3 className="station-card-name" title={station.name}>
                {station.name}
            </h3>
            <p className="station-card-info">
                {station.country} {station.tags && `• ${station.tags.split(',')[0]}`}
            </p>
        </div>
    );
}
