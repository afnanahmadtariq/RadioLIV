import { getPopularStations, getTrendingStations, getGenres } from './lib/api';
import { StationCard, PopularItem, GenreTag, HeroSection } from './components';
import Link from 'next/link';

// Featured genres with colors
const featuredGenres = [
  { name: 'pop', label: 'Pop', color: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)' },
  { name: 'rock', label: 'Rock', color: 'linear-gradient(135deg, #ff5722 0%, #e91e63 100%)' },
  { name: 'jazz', label: 'Jazz', color: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)' },
  { name: 'classical', label: 'Classical', color: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)' },
  { name: 'electronic', label: 'Electronic', color: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)' },
  { name: 'hip hop', label: 'Hip Hop', color: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)' },
];

export default async function Home() {
  // Fetch data in parallel
  const [popularStations, trendingStations, genres] = await Promise.all([
    getPopularStations(20),
    getTrendingStations(10),
    getGenres(50),
  ]);

  // Get featured station (most voted)
  const featuredStation = popularStations[0];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      {featuredStation && <HeroSection station={featuredStation} stationList={popularStations} />}

      {/* Trending Stations Carousel */}
      <section style={{ marginBottom: '40px' }}>
        <div className="section-header">
          <h2 className="section-title">🔥 Trending Now</h2>
          <div className="section-nav">
            <Link href="/radio" className="btn btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </Link>
            <Link href="/radio" className="btn btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="stations-carousel">
          {trendingStations.map((station) => (
            <StationCard key={station.stationuuid} station={station} stationList={trendingStations} />
          ))}
        </div>
      </section>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '0 32px', marginBottom: '40px' }}>
        {/* Popular Stations */}
        <section>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>⭐ Popular Stations</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {popularStations.slice(1, 6).map((station, index) => (
              <PopularItem key={station.stationuuid} station={station} index={index} stationList={popularStations.slice(1, 6)} />
            ))}
          </div>
        </section>

        {/* Genre Categories */}
        <section>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>🎵 Browse by Genre</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {featuredGenres.map((genre) => (
              <Link
                key={genre.name}
                href={`/genre/${encodeURIComponent(genre.name)}`}
                className="category-card"
                style={{ background: genre.color }}
              >
                <div className="category-card-content">
                  <h3 className="category-card-name">{genre.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* More Stations Grid */}
      <section style={{ marginBottom: '40px' }}>
        <div className="section-header">
          <h2 className="section-title">🎧 More Stations</h2>
          <Link href="/radio" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            View All
          </Link>
        </div>
        <div className="stations-grid">
          {popularStations.slice(6, 14).map((station) => (
            <StationCard key={station.stationuuid} station={station} stationList={popularStations.slice(6, 14)} />
          ))}
        </div>
      </section>

      {/* Top Genres Tags */}
      <section style={{ padding: '0 32px', marginBottom: '60px' }}>
        <h2 className="section-title" style={{ marginBottom: '16px' }}>🏷️ Popular Tags</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {genres.slice(0, 20).map((genre) => (
            <GenreTag key={genre.name} name={genre.name} count={genre.stationcount} />
          ))}
        </div>
      </section>
    </div>
  );
}
