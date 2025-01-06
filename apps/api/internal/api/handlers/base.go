package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleBase(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}

func HandlePing(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
