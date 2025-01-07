package handlers

import (
	"net/http"

	"github.com/dickeyy/movies/apps/api/internal/lib"
	"github.com/dickeyy/movies/apps/api/internal/storage"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func GetMovie(c *gin.Context) {
	id := c.Param("id")

	userID, exists := lib.GetUserID(c)
	if exists {
		log.Debug().Str("user_id", userID).Msg("User ID found")
	}

	movie, err := storage.GetMovieByID(id)
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
