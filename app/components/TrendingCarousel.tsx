'use client';

import { useState, useRef } from 'react';
import { StationCard } from './';
import { Station } from '../types';

interface TrendingCarouselProps {
  stations: Station[];
}

export default function TrendingCarousel({ stations }: TrendingCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section style={{ marginBottom: '40px' }}>
      <div className="section-header">
        <h2 className="section-title">🔥 Trending Now</h2>
        <div className="section-nav">
          <button
            onClick={() => scroll('left')}
            className="btn btn-icon"
            disabled={!canScrollLeft}
            style={{ opacity: canScrollLeft ? 1 : 0.3 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="btn btn-icon"
            disabled={!canScrollRight}
            style={{ opacity: canScrollRight ? 1 : 0.3 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="stations-carousel"
        onScroll={checkScroll}
      >
        {stations.map((station) => (
          <StationCard key={station.stationuuid} station={station} stationList={stations} />
        ))}
      </div>
    </section>
  );
}
