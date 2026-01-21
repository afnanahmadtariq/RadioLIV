// Types for Radio Browser API
export interface RadioStation {
    changeuuid: string;
    stationuuid: string;
    serveruuid: string;
    name: string;
    url: string;
    url_resolved: string;
    homepage: string;
    favicon: string;
    tags: string;
    country: string;
    countrycode: string;
    iso_3166_2: string;
    state: string;
    language: string;
    languagecodes: string;
    votes: number;
    lastchangetime: string;
    lastchangetime_iso8601: string;
    codec: string;
    bitrate: number;
    hls: number;
    lastcheckok: number;
    lastchecktime: string;
    lastchecktime_iso8601: string;
    lastcheckoktime: string;
    lastcheckoktime_iso8601: string;
    lastlocalchecktime: string;
    lastlocalchecktime_iso8601: string;
    clicktimestamp: string;
    clicktimestamp_iso8601: string;
    clickcount: number;
    clicktrend: number;
    ssl_error: number;
    geo_lat: number | null;
    geo_long: number | null;
    has_extended_info: boolean;
}

export interface Country {
    name: string;
    iso_3166_1: string;
    stationcount: number;
}

export interface Tag {
    name: string;
    stationcount: number;
}

export interface Language {
    name: string;
    iso_639: string;
    stationcount: number;
}

// Player state types
export interface PlayerState {
    currentStation: RadioStation | null;
    isPlaying: boolean;
    isLoading: boolean;
    volume: number;
    isMuted: boolean;
    error: string | null;
}

// Favorites and history
export interface UserData {
    favorites: RadioStation[];
    recentlyPlayed: RadioStation[];
}
