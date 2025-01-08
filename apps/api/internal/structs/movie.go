package structs

import "time"

type MovieStats struct {
	Ratings        []Rating `json:"ratings"`
	WatchedCount   int      `json:"watched_count"`
	LikedCount     int      `json:"liked_count"`
	WatchlistCount int      `json:"watchlist_count"`
	AverageRating  float64  `json:"average_rating"`
}

type MovieUserData struct {
	Watched     bool       `json:"watched"`
	Liked       bool       `json:"liked"`
	InWatchlist bool       `json:"in_watchlist"`
	WatchedAt   *time.Time `json:"watched_at,omitempty"`
	LikedAt     *time.Time `json:"liked_at,omitempty"`
	WatchlistAt *time.Time `json:"watchlist_at,omitempty"`
	Rating      *Rating    `json:"rating,omitempty"`
}

// struct for a full movie object
type Movie struct {
	TMDB  TMDBMovie      `json:"tmdb"`
	Stats MovieStats     `json:"stats"`
	User  *MovieUserData `json:"user,omitempty"`
}
