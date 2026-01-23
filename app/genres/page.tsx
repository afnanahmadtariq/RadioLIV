import { getGenres } from '../lib/api';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
    Mic2,
    Guitar,
    Music2,
    Music4,
    Zap,
    Headphones,
    Heart,
    Sun,
    CloudRain,
    Skull,
    Compass,
    Flame,
    Disc3,
    Newspaper,
    MessageCircle,
    Trophy,
    Radio,
    TreePine,
    LucideIcon
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Browse Radio by Genre - RadioLIV',
    description: 'Explore thousands of radio stations organized by genre. Find pop, rock, jazz, classical, electronic, and more on RadioLIV.',
};

// Genre colors mapping
const genreColors: Record<string, string> = {
    pop: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
    rock: 'linear-gradient(135deg, #ff5722 0%, #e91e63 100%)',
    jazz: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
    classical: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
    electronic: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)',
    'hip hop': 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
    country: 'linear-gradient(135deg, #8bc34a 0%, #4caf50 100%)',
    'r&b': 'linear-gradient(135deg, #e91e63 0%, #ff5722 100%)',
    reggae: 'linear-gradient(135deg, #4caf50 0%, #ffeb3b 100%)',
    blues: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
    metal: 'linear-gradient(135deg, #424242 0%, #212121 100%)',
    indie: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
    latin: 'linear-gradient(135deg, #ff9800 0%, #f44336 100%)',
    dance: 'linear-gradient(135deg, #e040fb 0%, #7c4dff 100%)',
    news: 'linear-gradient(135deg, #607d8b 0%, #455a64 100%)',
    talk: 'linear-gradient(135deg, #795548 0%, #5d4037 100%)',
    sports: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    oldies: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
    soul: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
    folk: 'linear-gradient(135deg, #8d6e63 0%, #6d4c41 100%)',
};

// Genre icons mapping
const genreIcons: Record<string, LucideIcon> = {
    pop: Mic2,
    rock: Guitar,
    jazz: Music2,
    classical: Music4,
    electronic: Zap,
    'hip hop': Headphones,
    country: Guitar, // Acoustic usually implied
    'r&b': Heart,
    reggae: Sun,
    blues: CloudRain,
    metal: Skull,
    indie: Compass,
    latin: Flame,
    dance: Disc3,
    news: Newspaper,
    talk: MessageCircle,
    sports: Trophy,
    oldies: Radio,
    soul: Heart,
    folk: TreePine,
};

function getGenreColor(genre: string): string {
    const lowerGenre = genre.toLowerCase();
    return genreColors[lowerGenre] || `linear-gradient(135deg, hsl(${genre.length * 30}, 60%, 45%) 0%, hsl(${genre.length * 40}, 50%, 35%) 100%)`;
}

function getGenreIcon(genre: string): LucideIcon {
    const lowerGenre = genre.toLowerCase();
    return genreIcons[lowerGenre] || Music2;
}

export default async function GenresPage() {
    const genres = await getGenres(100);

    return (
        <div className="animate-fade-in pb-10">
            {/* Header */}
            <section className="hero-section pb-6">
                <div className="hero-content max-w-full">
                    <h1 className="hero-title flex items-center gap-3">
                        <Music2 className="w-8 h-8 md:w-10 md:h-10 text-[var(--accent-primary)]" />
                        Browse by Genre
                    </h1>
                    <p className="hero-subtitle">
                        Explore {genres.length}+ genres from around the world
                    </p>
                </div>
            </section>

            {/* Genres Grid */}
            <section className="px-8">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {genres.map((genre) => {
                        const Icon = getGenreIcon(genre.name);
                        return (
                            <Link
                                key={genre.name}
                                href={`/genre/${encodeURIComponent(genre.name)}`}
                                className="relative h-[120px] rounded-[var(--radius-lg)] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card)] group"
                                style={{ background: getGenreColor(genre.name) }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 text-white transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 pointer-events-none">
                                    <Icon size={80} strokeWidth={1} />
                                </div>
                                <div className="relative z-[2] h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-lg font-semibold m-0 capitalize text-white shadow-black drop-shadow-md flex items-center gap-2">
                                        <Icon size={20} className="stroke-[2.5]" />
                                        {genre.name}
                                    </h3>
                                    <p className="text-xs text-white/90 m-0 font-medium">
                                        {genre.stationcount.toLocaleString()} stations
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
