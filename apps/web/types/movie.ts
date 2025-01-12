import { Rating } from "./user";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TMDBMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: Collection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Company[];
    production_countries: Country[];
    release_date: string;
    release_dates: ReleaseDatesWrapper;
    revenue: number;
    runtime: number;
    spoken_languages: Language[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MiniMovie {
    id: number;
    original_language: string;
    title: string;
    poster_path: string;
}

export interface Collection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface ReleaseDatesWrapper {
    results: ReleaseDateCountry[];
}

export interface ReleaseDateCountry {
    iso_3166_1: string;
    release_dates: ReleaseDate[];
}

export interface ReleaseDate {
    certification: string;
    descriptors: string[];
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Company {
    id: number;
    logo_path: string | null; // Using union type for nullable string
    name: string;
    origin_country: string;
}

export interface Country {
    iso_3166_1: string;
    name: string;
}

export interface Language {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface MovieStats {
    ratings: Rating[];
    watched_count: number;
    liked_count: number;
    watchlist_count: number;
    average_rating: number;
}

export interface MovieUserData {
    watched: boolean;
    liked: boolean;
    in_watchlist: boolean;
    watched_at?: string; // ISO date string
    liked_at?: string; // ISO date string
    watchlist_at?: string; // ISO date string
    rating?: Rating;
}

interface Movie {
    tmdb: TMDBMovie;
    stats: MovieStats;
    user?: MovieUserData;
}

export interface MovieResponse {
    movie: Movie;
    error?: string;
}
