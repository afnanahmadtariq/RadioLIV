'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
);

const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
    </svg>
);

const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
);

export default function TopBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <header className="fixed top-0 right-0 z-20 flex items-center px-4 md:px-8 py-3 md:py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md left-[var(--sidebar-width)] border-b border-(--border-color)">
                <div className="flex items-center gap-3 w-full justify-between md:justify-start">
                    <button
                        onClick={() => router.push('/')}
                        className="md:hidden text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                        title="Home"
                    >
                        <HomeIcon />
                    </button>

                    <form onSubmit={handleSearch} className="flex items-center gap-3 bg-(--bg-card) border border-(--border-color) rounded-full px-4 md:px-5 py-2 md:py-2.5 w-full max-w-[280px] sm:max-w-[320px] transition-all duration-150 focus-within:border-[var(--accent-primary)] focus-within:bg-[var(--bg-card-hover)]">
                        <div className="w-4.5 h-4.5 text-(--text-muted) shrink-0">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search stations, genres, countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-foreground text-sm w-full placeholder-(--text-muted)"
                        />
                    </form>

                    <button
                        onClick={() => router.push('/settings')}
                        className="md:hidden text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                        title="Settings"
                    >
                        <SettingsIcon />
                    </button>
                </div>
            </header>
            {/* Spacer to prevent content overlap */}
            <div className="h-20" />
        </>
    );
}
