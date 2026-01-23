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
            className="inline-block px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[var(--radius-full)] text-[var(--text-secondary)] text-[13px] no-underline transition-all duration-150 hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
        >
            {name} <span className="text-[var(--text-muted)]">({count})</span>
        </Link>
    );
}
