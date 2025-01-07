package storage

import (
	"context"

	"github.com/dickeyy/movies/apps/api/internal/cache"
	"github.com/dickeyy/movies/apps/api/internal/services"
	"github.com/dickeyy/movies/apps/api/internal/structs"
)

func GetMovieByID(id string) (*structs.Movie, error) {
	var movie structs.Movie

	// Get TMDB data
	tmdb, _, err := cache.GetTMDBMovie(id)
	if err != nil {
		return nil, err
	}
	movie.TMDB = *tmdb

	// First get all the counts
	err = services.DB.QueryRow(
		context.Background(),
		`SELECT 
            COUNT(DISTINCT w.user_id) as watched_count,
            COUNT(DISTINCT l.user_id) as liked_count,
            COUNT(DISTINCT wl.user_id) as watchlist_count
        FROM (SELECT $1::text as mid) m
        LEFT JOIN watched_movies w ON w.movie_id = m.mid
        LEFT JOIN liked_movies l ON l.movie_id = m.mid
        LEFT JOIN watchlist_movies wl ON wl.movie_id = m.mid
        GROUP BY m.mid`,
		id,
	).Scan(
		&movie.WatchedCount,
		&movie.LikedCount,
		&movie.WatchlistCount,
	)
	if err != nil {
		return nil, err
	}

	// Then get the ratings in a separate query
	rows, err := services.DB.Query(
		context.Background(),
		`SELECT id, user_id, movie_id, rating, content, created_at, updated_at 
         FROM ratings 
         WHERE movie_id = $1`,
		id,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ratings []structs.Rating
	for rows.Next() {
		var r structs.Rating
		err := rows.Scan(
			&r.ID,
			&r.UserID,
			&r.MovieID,
			&r.Rating,
			&r.Content,
			&r.CreatedAt,
			&r.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		ratings = append(ratings, r)
	}
	movie.Ratings = ratings

	return &movie, nil
}
