'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
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
            <header className="fixed top-0 right-0 z-20 flex items-center justify-between px-8 py-4 bg-transparent backdrop-blur-md left-[var(--sidebar-width)] border-b border-(--border-color)">
                <form onSubmit={handleSearch} className="flex items-center gap-3 bg-(--bg-card) border border-(--border-color) rounded-full px-5 py-2.5 w-[320px] transition-all duration-150 focus-within:border-[var(--accent-primary)] focus-within:bg-[var(--bg-card-hover)]">
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

                {/* <div className="flex gap-3 items-center">
                    <button className="btn btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        Add Station
                    </button>
                </div> */}
            </header>
            {/* Spacer to prevent content overlap */}
            <div className="h-18" />
        </>
    );
}
