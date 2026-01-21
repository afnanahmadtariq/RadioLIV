import { getStation, getStationsByGenre } from '../../lib/api';
import Link from 'next/link';
import type { Metadata } from 'next';
import StationDetailClient from './StationDetailClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const station = await getStation(id);

    if (!station) {
        return {
            title: 'Station Not Found - RadioLIV',
        };
    }

    return {
        title: `${station.name} - RadioLIV`,
        description: `Listen to ${station.name} from ${station.country} on RadioLIV. ${station.tags || 'Online radio streaming.'}`,
        openGraph: {
            title: `${station.name} - RadioLIV`,
            description: `Listen to ${station.name} from ${station.country}`,
            images: station.favicon ? [station.favicon] : [],
        },
    };
}

export default async function StationPage({ params }: PageProps) {
    const { id } = await params;
    const station = await getStation(id);

    if (!station) {
        return (
            <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
                <section className="hero-section">
                    <div className="hero-content" style={{ maxWidth: '100%' }}>
                        <Link
                            href="/"
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
                            Back to Home
                        </Link>
                        <h1 className="hero-title">Station Not Found</h1>
                        <p className="hero-subtitle">
                            The station you&apos;re looking for doesn&apos;t exist or has been removed.
                        </p>
                    </div>
                </section>
            </div>
        );
    }

    // Get related stations by first tag
    const firstTag = station.tags?.split(',')[0]?.trim();
    const relatedStations = firstTag
        ? await getStationsByGenre(firstTag, 8)
        : [];

    // Filter out current station from related
    const filteredRelated = relatedStations.filter(s => s.stationuuid !== station.stationuuid);

    return <StationDetailClient station={station} relatedStations={filteredRelated.slice(0, 6)} />;
}
