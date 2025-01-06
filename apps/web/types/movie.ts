/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TMDBMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any | null; // Could be defined as a specific type if needed
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Company[];
    production_countries: Country[];
    release_date: string;
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
