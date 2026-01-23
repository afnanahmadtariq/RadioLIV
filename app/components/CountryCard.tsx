'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CountryCardProps {
    code: string;
    name: string;
    stationCount: number;
}

export default function CountryCard({ code, name, stationCount }: CountryCardProps) {
    // Use flagcdn.com for reliable flag rendering on all OSs (especially Windows)
    const flagUrl = `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

    return (
        <Link
            href={`/country/${code}`}
            className="flex items-center gap-4 px-5 py-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[var(--radius-lg)] no-underline text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--bg-card-hover)] hover:-translate-y-0.5"
        >
            <div className="w-10 h-[30px] relative flex-shrink-0 rounded overflow-hidden shadow-md">
                <Image
                    src={flagUrl}
                    alt={`${name} flag`}
                    fill
                    sizes="40px"
                    className="object-cover"
                    unoptimized // flagcdn handles optimization
                />
            </div>
            <div className="flex-1">
                <h3 className="m-0 text-[15px] font-semibold">
                    {name}
                </h3>
                <p className="m-0 text-[13px] text-[var(--text-muted)]">
                    {stationCount.toLocaleString()} stations
                </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-muted)">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
        </Link>
    );
}
