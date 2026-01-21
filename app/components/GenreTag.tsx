'use client';

import Link from 'next/link';

interface GenreTagProps {
    name: string;
    count: number;
}

export default function GenreTag({ name, count }: GenreTagProps) {
    return (
        <Link
            href={`/genre/${encodeURIComponent(name)}`}
            style={{
                padding: '8px 16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--bg-card-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.color = 'var(--text-secondary)';
            }}
        >
            {name} <span style={{ color: 'var(--text-muted)' }}>({count})</span>
        </Link>
    );
}
