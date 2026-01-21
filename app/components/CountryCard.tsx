'use client';

import Link from 'next/link';

interface CountryCardProps {
    code: string;
    name: string;
    stationCount: number;
    flag: string;
}

export default function CountryCard({ code, name, stationCount, flag }: CountryCardProps) {
    return (
        <Link
            href={`/country/${code}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--bg-card-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <span style={{ fontSize: '32px' }}>{flag}</span>
            <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
                    {name}
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                    {stationCount.toLocaleString()} stations
                </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-muted)">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
        </Link>
    );
}
