import { getPopularStations, getTrendingStations, getGenres } from './lib/api';
import { StationCard, PopularItem, GenreTag, HeroSection, GenreCard } from './components';
import TrendingCarousel from './components/TrendingCarousel';
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
      <TrendingCarousel stations={trendingStations} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 mb-10">
        {/* Popular Stations */}
        <section>
          <h2 className="section-title mb-4">⭐ Popular Stations</h2>
          <div className="flex flex-col">
            {popularStations.slice(1, 6).map((station, index) => (
              <PopularItem key={station.stationuuid} station={station} index={index} stationList={popularStations.slice(1, 6)} />
            ))}
          </div>
        </section>

        {/* Genre Categories */}
        <section>
          <h2 className="section-title mb-4">🎵 Browse by Genre</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredGenres.map((genre) => (
              <GenreCard
                key={genre.name}
                name={genre.name}
                label={genre.label}
              />
            ))}
          </div>
        </section>
      </div>

      {/* More Stations Grid */}
      <section className="mb-10">
        <div className="section-header">
          <h2 className="section-title">🎧 More Stations</h2>
          <Link href="/radio" className="btn btn-secondary py-2 px-4 text-sm">
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
      <section className="px-4 md:px-8 mb-15">
        <h2 className="section-title mb-4">🏷️ Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 20).map((genre) => (
            <GenreTag key={genre.name} name={genre.name} count={genre.stationcount} />
          ))}
        </div>
      </section>
    </div>
  );
}
