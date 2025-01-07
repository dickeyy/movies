export interface User {
    id: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Rating {
    id: string;
    user_id: string;
    movie_id: string;
    rating: number;
    content: string | null;
    created_at: string;
    updated_at: string;
}

export interface WatchedMovie {
    id: string;
    user_id: string;
    movie_id: string;
    watched_at: string;
}

export interface LikedMovie {
    id: string;
    user_id: string;
    movie_id: string;
    liked_at: string;
}

export interface WatchlistMovie {
    id: string;
    user_id: string;
    movie_id: string;
    watchlist_at: string;
}
