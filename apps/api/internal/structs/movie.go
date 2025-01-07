package structs

// struct for a full movie object, includes
// all TMDB fields
// as well as our own fields
type Movie struct {
	TMDB           TMDBMovie `json:"tmdb"`
	Ratings        []Rating  `json:"ratings"`
	WatchedCount   int       `json:"watched_count"`
	LikedCount     int       `json:"liked_count"`
	WatchlistCount int       `json:"watchlist_count"`
}
