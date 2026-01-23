import Link from 'next/link';
import { useMemo } from 'react';
import { getGenreColor, getGenreIcon } from '../lib/genreData';

interface GenreCardProps {
    name: string;
    label?: string;
    stationCount?: number;
    className?: string;
}

const GenreCard = ({ name, label, stationCount, className = '' }: GenreCardProps) => {
    const Icon = useMemo(() => getGenreIcon(name), [name]);
    const color = getGenreColor(name);
    const displayName = label || name;

    return (
        <Link
            href={`/genre/${encodeURIComponent(name)}`}
            className={`relative h-[120px] rounded-[var(--radius-lg)] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card)] group ${className}`}
            style={{ background: color }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 text-white transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 pointer-events-none">
                <Icon size={80} strokeWidth={1} />
            </div>
            <div className="relative z-[2] h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-lg font-semibold m-0 capitalize text-white shadow-black drop-shadow-md flex items-center gap-2">
                    <Icon size={20} className="stroke-[2.5]" />
                    {displayName}
                </h3>
                {stationCount !== undefined && (
                    <p className="text-xs text-white/90 m-0 font-medium">
                        {stationCount.toLocaleString()} stations
                    </p>
                )}
            </div>
        </Link>
    );
};

export default GenreCard;
