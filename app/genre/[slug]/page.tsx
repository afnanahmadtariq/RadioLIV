import { getStationsByGenre } from '../../lib/api';
import { StationCard } from '../../components';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const decodedGenre = decodeURIComponent(slug);
    return {
        title: `${decodedGenre.charAt(0).toUpperCase() + decodedGenre.slice(1)} Radio Stations - RadioLIV`,
        description: `Listen to the best ${decodedGenre} radio stations from around the world on RadioLIV.`,
    };
}

export default async function GenrePage({ params }: PageProps) {
    const { slug } = await params;
    const genre = decodeURIComponent(slug);
    const stations = await getStationsByGenre(genre, 50);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{
                background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.3) 0%, rgba(156, 39, 176, 0.2) 100%)',
                paddingBottom: '32px'
            }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <Link
                        href="/genres"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            marginBottom: '16px',
                            fontSize: '14px'
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                        Back to Genres
                    </Link>
                    <h1 className="hero-title" style={{ textTransform: 'capitalize' }}>
                        {genre} Radio
                    </h1>
                    <p className="hero-subtitle">
                        {stations.length} stations available
                    </p>
                </div>
            </section>

            {/* Stations Grid */}
            <section>
                <div className="section-header">
                    <h2 className="section-title">All {genre} Stations</h2>
                </div>
                {stations.length > 0 ? (
                    <div className="stations-grid">
                        {stations.map((station) => (
                            <StationCard key={station.stationuuid} station={station} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🎵</div>
                        <h3>No stations found</h3>
                        <p>We couldn&apos;t find any stations for this genre.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
