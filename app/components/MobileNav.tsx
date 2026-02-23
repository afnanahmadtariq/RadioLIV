'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const RadioIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6H8.3l8.26-3.34-.37-.92L3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V10h16v2z" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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

interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { href: '/radio', label: 'Radio', icon: <RadioIcon /> },
    { href: '/favorites', label: 'Favorites', icon: <HeartIcon /> },
    { href: '/genres', label: 'Genres', icon: <GenreIcon /> },
    { href: '/countries', label: 'Countries', icon: <GlobeIcon /> },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="mobile-bottom-nav">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}
