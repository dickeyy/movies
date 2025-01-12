package handlers

import (
	"net/http"

	"github.com/dickeyy/movies/apps/api/internal/lib"
	"github.com/dickeyy/movies/apps/api/internal/storage"
	"github.com/dickeyy/movies/apps/api/internal/structs"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func GetMovie(c *gin.Context) {
	id := c.Param("id")

	// if the user is signed in, their user id should be in the session
	userID, exists := lib.GetUserID(c)
	if exists {
		log.Debug().Str("user_id", userID).Msg("User ID found")
	}

	movie, err := storage.GetMovieByID(id, userID) // user id will be empty if not signed in
	if err != nil {
		log.Err(err).Msg("Failed to get movie")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if movie.TMDB.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "movie not found"})
		return
	}

	res := gin.H{
		"movie": movie,
	}

	if userID != "" {
		res["user_id"] = userID
	}

	c.JSON(http.StatusOK, res)
}

func GetPopularMovies(c *gin.Context) {
	pageStr := c.Query("page")

	tmdbMovies, err := lib.QueryTMDBPopularMovies("en-US", pageStr)
	if err != nil {
		log.Err(err).Msg("Failed to get popular movies")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Create a new slice for MovieMini
	miniMovies := make([]*structs.MovieMini, len(tmdbMovies))

	// Convert each movie to MovieMini
	for i, movie := range tmdbMovies {
		miniMovies[i] = &structs.MovieMini{
			ID:               movie.ID,
			OriginalLanguage: movie.OriginalLanguage,
			Title:            movie.Title,
			PosterPath:       movie.PosterPath,
		}
	}

	res := gin.H{
		"movies": miniMovies,
	}

	c.JSON(http.StatusOK, res)
}
