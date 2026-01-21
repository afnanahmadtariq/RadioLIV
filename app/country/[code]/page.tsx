import { getStationsByCountry, getCountries } from '../../lib/api';
import { StationCard } from '../../components';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ code: string }>;
}

// Country flag emoji mapping
const countryFlags: Record<string, string> = {
    US: '🇺🇸', GB: '🇬🇧', DE: '🇩🇪', FR: '🇫🇷', ES: '🇪🇸', IT: '🇮🇹',
    BR: '🇧🇷', MX: '🇲🇽', CA: '🇨🇦', AU: '🇦🇺', JP: '🇯🇵', KR: '🇰🇷',
    CN: '🇨🇳', IN: '🇮🇳', RU: '🇷🇺', NL: '🇳🇱', BE: '🇧🇪', AT: '🇦🇹',
    CH: '🇨🇭', PL: '🇵🇱', SE: '🇸🇪', NO: '🇳🇴', DK: '🇩🇰', FI: '🇫🇮',
    PT: '🇵🇹', GR: '🇬🇷', TR: '🇹🇷', AR: '🇦🇷', CL: '🇨🇱', CO: '🇨🇴',
    ZA: '🇿🇦', EG: '🇪🇬', NG: '🇳🇬', KE: '🇰🇪', PH: '🇵🇭', TH: '🇹🇭',
    ID: '🇮🇩', MY: '🇲🇾', SG: '🇸🇬', NZ: '🇳🇿', IE: '🇮🇪', CZ: '🇨🇿',
    HU: '🇭🇺', RO: '🇷🇴', UA: '🇺🇦', PK: '🇵🇰', BD: '🇧🇩', VN: '🇻🇳',
};

function getFlag(countryCode: string): string {
    return countryFlags[countryCode] || '🌍';
}

export async function generateMetadata({ params }: PageProps) {
    const { code } = await params;
    const countries = await getCountries();
    const country = countries.find(c => c.iso_3166_1 === code.toUpperCase());
    const countryName = country?.name || code;

    return {
        title: `${countryName} Radio Stations - RadioLIV`,
        description: `Listen to the best radio stations from ${countryName} on RadioLIV.`,
    };
}

export default async function CountryPage({ params }: PageProps) {
    const { code } = await params;
    const countryCode = code.toUpperCase();

    const [stations, countries] = await Promise.all([
        getStationsByCountry(countryCode, 50),
        getCountries()
    ]);

    const country = countries.find(c => c.iso_3166_1 === countryCode);
    const countryName = country?.name || countryCode;

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.3) 0%, rgba(63, 81, 181, 0.2) 100%)',
                paddingBottom: '32px'
            }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <Link
                        href="/countries"
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
                        Back to Countries
                    </Link>
                    <h1 className="hero-title">
                        {getFlag(countryCode)} {countryName}
                    </h1>
                    <p className="hero-subtitle">
                        {stations.length} stations available
                    </p>
                </div>
            </section>

            {/* Stations Grid */}
            <section>
                <div className="section-header">
                    <h2 className="section-title">All Stations from {countryName}</h2>
                </div>
                {stations.length > 0 ? (
                    <div className="stations-grid">
                        {stations.map((station) => (
                            <StationCard key={station.stationuuid} station={station} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🌍</div>
                        <h3>No stations found</h3>
                        <p>We couldn&apos;t find any stations for this country.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
