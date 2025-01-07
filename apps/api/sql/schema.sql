-- Create User Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username TEXT UNIQUE NOT NULL CHECK (length(username) >= 3 AND length(username) <= 64),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relations
CREATE UNIQUE INDEX IF NOT EXISTS users_username_idx ON users (lower(username));
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users (lower(email));

-- Create Ratings Table
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    movie_id TEXT NOT NULL, 
    rating FLOAT NOT NULL CHECK (rating >= 0 AND rating <= 5),
    content TEXT CHECK (length(content) <= 5000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Relations
CREATE INDEX IF NOT EXISTS ratings_movie_id_idx ON ratings (movie_id);

-- Create Watched Movies Junction Table
CREATE TABLE IF NOT EXISTS watched_movies (
    user_id UUID NOT NULL,
    movie_id TEXT NOT NULL, 
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Liked Movies Junction Table
CREATE TABLE IF NOT EXISTS liked_movies (
    user_id UUID NOT NULL,
    movie_id TEXT NOT NULL, 
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Watchlist Movies Junction Table
CREATE TABLE IF NOT EXISTS watchlist_movies (
    user_id UUID NOT NULL,
    movie_id TEXT NOT NULL, 
    watchlist_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 
-- Relations
CREATE INDEX IF NOT EXISTS watched_movies_movie_id_idx ON watched_movies (movie_id);
CREATE INDEX IF NOT EXISTS liked_movies_movie_id_idx ON liked_movies (movie_id);
CREATE INDEX IF NOT EXISTS watchlist_movies_movie_id_idx ON watchlist_movies (movie_id);