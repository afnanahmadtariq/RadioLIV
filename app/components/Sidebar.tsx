'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
    </svg>
);

const RadioIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34-.37-.92L3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V10h16v2z" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const HistoryIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </svg>
);

const GenreIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
);

const GlobeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
);

const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
);

interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const libraryNavItems: NavItem[] = [
    { href: '/', label: 'Home', icon: <HomeIcon /> },
    { href: '/radio', label: 'Radio', icon: <RadioIcon /> },
    { href: '/favorites', label: 'Favorites', icon: <HeartIcon /> },
    { href: '/recent', label: 'Recently Played', icon: <HistoryIcon /> },
];

const discoverNavItems: NavItem[] = [
    { href: '/genres', label: 'Genres', icon: <GenreIcon /> },
    { href: '/countries', label: 'Countries', icon: <GlobeIcon /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="user-profile">
                <div className="user-avatar">📻</div>
                <div className="user-info">
                    <h3>RadioLIV</h3>
                    <span>Online Radio</span>
                </div>
            </div>

            {/* Library */}
            <div className="sidebar-section">
                <p className="sidebar-label">Library</p>
                <nav className="sidebar-nav">
                    {libraryNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Discover */}
            <div className="sidebar-section">
                <p className="sidebar-label">Discover</p>
                <nav className="sidebar-nav">
                    {discoverNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Settings & Footer */}
            <div className="sidebar-section" style={{ marginTop: 'auto' }}>
                <nav className="sidebar-nav">
                    <Link
                        href="/settings"
                        className={`sidebar-link ${pathname === '/settings' ? 'active' : ''}`}
                    >
                        <SettingsIcon />
                        Settings
                    </Link>
                </nav>

                {/* Legal Links */}
                <div style={{
                    padding: '16px 12px',
                    marginTop: '16px',
                    borderTop: '1px solid var(--border-color)'
                }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                    }}>
                        <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Terms
                        </Link>
                        <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Privacy
                        </Link>
                        <Link href="/dmca" style={{ color: 'inherit', textDecoration: 'none' }}>
                            DMCA
                        </Link>
                    </div>
                    <p style={{
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        marginTop: '8px',
                        opacity: 0.7
                    }}>
                        © 2026 RadioLIV
                    </p>
                </div>
            </div>
        </aside>
    );
}
