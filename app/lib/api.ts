// Radio Browser API base URL
const API_BASE = 'https://de1.api.radio-browser.info';

// Cache configuration (in seconds)
export const CACHE_DURATION = {
    POPULAR: 7200,      // 2 hours for popular stations
    GENRE: 21600,       // 6 hours for genre pages
    COUNTRY: 43200,     // 12 hours for country pages
    FULL_LIST: 86400,   // 24 hours for full lists
    SINGLE: 86400,      // 24 hours for single station
};

// In-memory cache for client-side
const cache = new Map<string, { data: unknown; expiry: number }>();

function getCached<T>(key: string): T | null {
    const item = cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
    }
    return item.data as T;
}

function setCache<T>(key: string, data: T, ttlSeconds: number): void {
    cache.set(key, {
        data,
        expiry: Date.now() + ttlSeconds * 1000,
    });
}

import type { RadioStation, Country, Tag } from '../types';

// Fetch popular stations (by votes)
export async function getPopularStations(limit: number = 50): Promise<RadioStation[]> {
    const cacheKey = `popular:${limit}`;
    const cached = getCached<RadioStation[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
        `${API_BASE}/json/stations/topvote/${limit}`,
        { next: { revalidate: CACHE_DURATION.POPULAR } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.POPULAR);
    return data;
}

// Fetch trending stations (by click count)
export async function getTrendingStations(limit: number = 50): Promise<RadioStation[]> {
    const cacheKey = `trending:${limit}`;
    const cached = getCached<RadioStation[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
        `${API_BASE}/json/stations/topclick/${limit}`,
        { next: { revalidate: CACHE_DURATION.POPULAR } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.POPULAR);
    return data;
}

// Fetch stations by country
export async function getStationsByCountry(
    countryCode: string,
    limit: number = 100
): Promise<RadioStation[]> {
    const cacheKey = `country:${countryCode}:${limit}`;
    const cached = getCached<RadioStation[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
        `${API_BASE}/json/stations/bycountrycodeexact/${countryCode}?limit=${limit}&order=votes&reverse=true`,
        { next: { revalidate: CACHE_DURATION.COUNTRY } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.COUNTRY);
    return data;
}

// Fetch stations by genre/tag
export async function getStationsByGenre(
    genre: string,
    limit: number = 100
): Promise<RadioStation[]> {
    const cacheKey = `genre:${genre}:${limit}`;
    const cached = getCached<RadioStation[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
        `${API_BASE}/json/stations/bytag/${encodeURIComponent(genre)}?limit=${limit}&order=votes&reverse=true`,
        { next: { revalidate: CACHE_DURATION.GENRE } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.GENRE);
    return data;
}

// Search stations
export async function searchStations(
    query: string,
    limit: number = 50
): Promise<RadioStation[]> {
    const response = await fetch(
        `${API_BASE}/json/stations/search?name=${encodeURIComponent(query)}&limit=${limit}&order=votes&reverse=true`
    );
    return response.json();
}

// Get single station by UUID
export async function getStation(uuid: string): Promise<RadioStation | null> {
    const cacheKey = `station:${uuid}`;
    const cached = getCached<RadioStation[]>(cacheKey);
    if (cached && cached.length > 0) return cached[0];

    const response = await fetch(
        `${API_BASE}/json/stations/byuuid/${uuid}`,
        { next: { revalidate: CACHE_DURATION.SINGLE } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.SINGLE);
    return data.length > 0 ? data[0] : null;
}

// Get all countries
export async function getCountries(): Promise<Country[]> {
    const cacheKey = 'countries';
    const cached = getCached<Country[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
        `${API_BASE}/json/countries?order=stationcount&reverse=true`,
        { next: { revalidate: CACHE_DURATION.FULL_LIST } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.FULL_LIST);
    return data;
}

// Get all genres/tags
export async function getGenres(limit: number = 100): Promise<Tag[]> {
    const cacheKey = `genres:${limit}`;
    const cached = getCached<Tag[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
        `${API_BASE}/json/tags?order=stationcount&reverse=true&limit=${limit}`,
        { next: { revalidate: CACHE_DURATION.FULL_LIST } }
    );
    const data = await response.json();
    setCache(cacheKey, data, CACHE_DURATION.FULL_LIST);
    return data;
}

// Report a station click (for analytics)
export async function reportClick(stationuuid: string): Promise<void> {
    try {
        await fetch(`${API_BASE}/json/url/${stationuuid}`);
    } catch {
        // Silently fail - this is just for analytics
    }
}
