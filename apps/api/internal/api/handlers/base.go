package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBase(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}

func GetPing(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
