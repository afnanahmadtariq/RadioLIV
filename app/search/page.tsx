import { searchStations } from '../lib/api';
import { StationCard } from '../components';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `Search: ${q} - RadioLIV` : 'Search Radio Stations - RadioLIV',
        description: q
            ? `Search results for "${q}" on RadioLIV. Find and listen to radio stations.`
            : 'Search for radio stations by name, genre, or country on RadioLIV.',
    };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q: query } = await searchParams;
    const stations = query ? await searchStations(query, 50) : [];

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">
                        🔍 {query ? `Results for "${query}"` : 'Search'}
                    </h1>
                    <p className="hero-subtitle">
                        {query
                            ? `Found ${stations.length} station${stations.length !== 1 ? 's' : ''}`
                            : 'Enter a search term to find radio stations'
                        }
                    </p>
                </div>
            </section>

            {/* Search Results */}
            <section>
                {query ? (
                    stations.length > 0 ? (
                        <div className="stations-grid">
                            {stations.map((station) => (
                                <StationCard key={station.stationuuid} station={station} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <h3>No stations found</h3>
                            <p>Try a different search term or browse by genre or country.</p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                <Link href="/genres" className="btn btn-primary">
                                    Browse Genres
                                </Link>
                                <Link href="/countries" className="btn btn-secondary">
                                    Browse Countries
                                </Link>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🎵</div>
                        <h3>Search for stations</h3>
                        <p>Use the search bar above to find radio stations.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
