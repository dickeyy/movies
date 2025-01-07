package handlers

import (
	"net/http"

	"github.com/dickeyy/movies/apps/api/internal/storage"
	"github.com/gin-gonic/gin"
)

func GetMovie(c *gin.Context) {
	id := c.Param("id")

	movie, err := storage.GetMovieByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if movie.TMDB.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "movie not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"movie": movie,
	})
}
