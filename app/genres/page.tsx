import { getGenres } from '../lib/api';
import type { Metadata } from 'next';
import { Music2 } from 'lucide-react';
import { GenreCard } from '../components';

export const metadata: Metadata = {
    title: 'Browse Radio by Genre - RadioLIV',
    description: 'Explore thousands of radio stations organized by genre. Find pop, rock, jazz, classical, electronic, and more on RadioLIV.',
};

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
            <section className="px-4 md:px-8">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {genres.map((genre) => (
                        <GenreCard
                            key={genre.name}
                            name={genre.name}
                            stationCount={genre.stationcount}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
