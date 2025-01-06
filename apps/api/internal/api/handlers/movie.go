package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMovie(c *gin.Context) {
	id := c.Param("id")
	c.String(http.StatusOK, id)
}
