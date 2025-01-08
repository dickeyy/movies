package storage

import (
	"context"
	"time"

	"github.com/dickeyy/movies/apps/api/internal/cache"
	"github.com/dickeyy/movies/apps/api/internal/services"
	"github.com/dickeyy/movies/apps/api/internal/structs"
)

func GetMovieByID(id string, userID string) (*structs.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var movie structs.Movie

	// Get TMDB data
	tmdb, _, err := cache.GetTMDBMovie(id)
	if err != nil {
		return nil, err
	}
	movie.TMDB = *tmdb

	// Use a transaction for all queries
	tx, err := services.DB.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	// Base stats query that's always needed
	statsQuery := `
		SELECT 
			COUNT(DISTINCT w.user_id) as watched_count,
			COUNT(DISTINCT l.user_id) as liked_count,
			COUNT(DISTINCT wl.user_id) as watchlist_count
		FROM (SELECT $1::text as mid) m
		LEFT JOIN watched_movies w ON w.movie_id = m.mid
		LEFT JOIN liked_movies l ON l.movie_id = m.mid
		LEFT JOIN watchlist_movies wl ON wl.movie_id = m.mid
		GROUP BY m.mid`

	err = tx.QueryRow(ctx, statsQuery, id).Scan(
		&movie.Stats.WatchedCount,
		&movie.Stats.LikedCount,
		&movie.Stats.WatchlistCount,
	)
	if err != nil {
		return nil, err
	}

	// Get user data if userID is provided
	if userID != "" {
		userQuery := `
			SELECT 
				EXISTS(SELECT 1 FROM watched_movies WHERE movie_id = $1 AND user_id = $2) as watched,
				EXISTS(SELECT 1 FROM liked_movies WHERE movie_id = $1 AND user_id = $2) as liked,
				EXISTS(SELECT 1 FROM watchlist_movies WHERE movie_id = $1 AND user_id = $2) as in_watchlist,
				(SELECT watched_at FROM watched_movies WHERE movie_id = $1 AND user_id = $2) as watched_at,
				(SELECT liked_at FROM liked_movies WHERE movie_id = $1 AND user_id = $2) as liked_at,
				(SELECT watchlist_at FROM watchlist_movies WHERE movie_id = $1 AND user_id = $2) as watchlist_at
		`
		userData := structs.MovieUserData{}
		err = tx.QueryRow(ctx, userQuery, id, userID).Scan(
			&userData.Watched,
			&userData.Liked,
			&userData.InWatchlist,
			&userData.WatchedAt,
			&userData.LikedAt,
			&userData.WatchlistAt,
		)
		if err != nil {
			return nil, err
		}
		movie.User = &userData
	}

	// Get all ratings
	var ratingQuery string
	var ratingArgs []interface{}

	if userID != "" {
		ratingQuery = `
			SELECT 
				id, user_id, movie_id, rating, content, created_at, updated_at,
				(user_id = $2) as is_user_rating
			FROM ratings 
			WHERE movie_id = $1
			ORDER BY 
				CASE WHEN user_id = $2 THEN 0 ELSE 1 END,
				created_at DESC`
		ratingArgs = []interface{}{id, userID}
	} else {
		ratingQuery = `
			SELECT 
				id, user_id, movie_id, rating, content, created_at, updated_at,
				false as is_user_rating
			FROM ratings 
			WHERE movie_id = $1
			ORDER BY created_at DESC`
		ratingArgs = []interface{}{id}
	}

	rows, err := tx.Query(ctx, ratingQuery, ratingArgs...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ratings []structs.Rating
	for rows.Next() {
		var r structs.Rating
		var isUserRating bool
		err := rows.Scan(
			&r.ID,
			&r.UserID,
			&r.MovieID,
			&r.Rating,
			&r.Content,
			&r.CreatedAt,
			&r.UpdatedAt,
			&isUserRating,
		)
		if err != nil {
			return nil, err
		}
		ratings = append(ratings, r)
		if isUserRating && movie.User != nil {
			movie.User.Rating = &r
		}
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	movie.Stats.Ratings = ratings

	// Calculate average rating
	var totalRating float64
	for _, r := range ratings {
		totalRating += r.Rating
	}
	if len(ratings) > 0 {
		movie.Stats.AverageRating = totalRating / float64(len(ratings))
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return &movie, nil
}
