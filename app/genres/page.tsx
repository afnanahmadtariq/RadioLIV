import { getGenres } from '../lib/api';
import Link from 'next/link';
import type { Metadata } from 'next';

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

function getGenreColor(genre: string): string {
    const lowerGenre = genre.toLowerCase();
    return genreColors[lowerGenre] || `linear-gradient(135deg, hsl(${genre.length * 30}, 60%, 45%) 0%, hsl(${genre.length * 40}, 50%, 35%) 100%)`;
}

export default async function GenresPage() {
    const genres = await getGenres(100);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">🎵 Browse by Genre</h1>
                    <p className="hero-subtitle">
                        Explore {genres.length}+ genres from around the world
                    </p>
                </div>
            </section>

            {/* Genres Grid */}
            <section>
                <div className="category-grid">
                    {genres.map((genre) => (
                        <Link
                            key={genre.name}
                            href={`/genre/${encodeURIComponent(genre.name)}`}
                            className="category-card"
                            style={{ background: getGenreColor(genre.name) }}
                        >
                            <div className="category-card-content">
                                <h3 className="category-card-name" style={{ textTransform: 'capitalize' }}>
                                    {genre.name}
                                </h3>
                                <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
                                    {genre.stationcount.toLocaleString()} stations
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
