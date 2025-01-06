package cache

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/dickeyy/movies/apps/api/internal/lib"
	"github.com/dickeyy/movies/apps/api/internal/services"
	"github.com/dickeyy/movies/apps/api/internal/structs"
)

const (
	movieCachePrefix = "movie:"
	movieCacheTTL    = 24 * time.Hour // Cache movies for 24 hours
)

func GetTMDBMovie(id string) (*structs.TMDBMovie, bool, error) {
	ctx := context.Background()

	// Create the cache key
	cacheKey := fmt.Sprintf("%s%s", movieCachePrefix, id)

	// Try to get from Redis
	cachedMovie, err := services.Redis.Get(ctx, cacheKey).Result()
	if err == nil {
		// Found in cache, unmarshal and return
		var movie structs.TMDBMovie
		if err := json.Unmarshal([]byte(cachedMovie), &movie); err != nil {
			return nil, false, fmt.Errorf("failed to unmarshal cached movie: %w", err)
		}
		return &movie, true, nil
	}

	// Not found in cache or error occurred, query TMDB
	movie, err := lib.QueryTMDBMovie(id)
	if err != nil {
		return nil, false, fmt.Errorf("failed to query TMDB: %w", err)
	}

	if movie.ID == 0 {
		return nil, false, fmt.Errorf("movie not found")
	}

	// Cache the result
	if err := setMovie(id, movie); err != nil {
		// Log the error but don't fail the request
		fmt.Printf("failed to cache movie: %v\n", err)
	}

	return movie, false, nil
}

func setMovie(id string, movie *structs.TMDBMovie) error {
	ctx := context.Background()

	// Marshal the movie to JSON
	movieJSON, err := json.Marshal(movie)
	if err != nil {
		return fmt.Errorf("failed to marshal movie: %w", err)
	}

	// Create the cache key
	cacheKey := fmt.Sprintf("%s%s", movieCachePrefix, id)

	// Set in Redis with TTL
	err = services.Redis.Set(ctx, cacheKey, movieJSON, movieCacheTTL).Err()
	if err != nil {
		return fmt.Errorf("failed to set movie in cache: %w", err)
	}

	return nil
}
