import { getCountries } from '../lib/api';
import { CountryCard } from '../components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Browse Radio by Country - RadioLIV',
    description: 'Discover radio stations from every country in the world. Listen to international radio on RadioLIV.',
};

// Country flag emoji mapping (common countries)
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

export default async function CountriesPage() {
    const countries = await getCountries();

    // Filter out countries with no stations and sort by station count
    const filteredCountries = countries
        .filter(c => c.stationcount > 0)
        .sort((a, b) => b.stationcount - a.stationcount);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Header */}
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">🌍 Browse by Country</h1>
                    <p className="hero-subtitle">
                        Listen to radio from {filteredCountries.length} countries
                    </p>
                </div>
            </section>

            {/* Countries Grid */}
            <section style={{ padding: '0 32px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '12px'
                }}>
                    {filteredCountries.map((country) => (
                        <CountryCard
                            key={country.iso_3166_1}
                            code={country.iso_3166_1}
                            name={country.name}
                            stationCount={country.stationcount}
                            flag={getFlag(country.iso_3166_1)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
