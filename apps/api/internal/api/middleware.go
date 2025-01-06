package api

import (
	"net/http"

	"github.com/dickeyy/movies/apps/api/config"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func loggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Process request
		c.Next()

		// Log the request completion
		log.Info().
			Str("method", c.Request.Method).
			Str("path", c.Request.URL.Path).
			Int("status", c.Writer.Status()).
			Msg("Request processed")
	}
}

func cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Set allowed origins based on environment
		if config.Config.Env == "dev" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		} else {
			origin := c.Request.Header.Get("Origin")
			allowedOrigins := []string{
				"https://movies.kyle.so",
				"https://www.movies.kyle.so",
			}

			// Check if the request origin is in our allowed list
			for _, allowed := range allowedOrigins {
				if origin == allowed {
					c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
					break
				}
			}
		}

		// Common headers for all environments
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

func autoHead() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "HEAD" {
			// Change the method to GET
			c.Request.Method = "GET"

			// Create a writer that discards the body
			w := &headResponseWriter{c.Writer}
			c.Writer = w
		}
		c.Next()
	}
}

type headResponseWriter struct {
	gin.ResponseWriter
}

func (w *headResponseWriter) Write(b []byte) (int, error) {
	// Discard the body but return the would-be length
	return len(b), nil
}
