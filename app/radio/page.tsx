import { getPopularStations } from '../lib/api';
import { StationCard } from '../components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Radio Stations - RadioLIV',
    description: 'Browse and listen to thousands of online radio stations from around the world on RadioLIV.',
};

export default async function RadioPage() {
    const stations = await getPopularStations(100);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">📻 All Radio Stations</h1>
                    <p className="hero-subtitle">
                        Browse {stations.length}+ popular stations from around the world
                    </p>
                </div>
            </section>

            {/* Stations Grid */}
            <section>
                <div className="stations-grid">
                    {stations.map((station) => (
                        <StationCard key={station.stationuuid} station={station} stationList={stations} />
                    ))}
                </div>
            </section>
        </div>
    );
}
