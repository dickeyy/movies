package api

import (
	"net/http"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/dickeyy/movies/apps/api/config"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

// RequireAuth is middleware that requires a valid Clerk session
func requireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the session JWT from the Authorization header
		sessionToken := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
		if sessionToken == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "No authorization token provided"})
			return
		}

		// Verify the session token
		claims, err := jwt.Verify(c.Request.Context(), &jwt.VerifyParams{
			Token: sessionToken,
		})
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "Invalid session token"})
			return
		}

		// Store claims in gin context for the route handler
		c.Set("session_claims", claims)
		c.Set("user_id", claims.Subject)

		c.Next()
	}
}

// OptionalAuth is middleware that verifies a session if present but allows unauthed requests
func optionalAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the session JWT from the Authorization header
		sessionToken := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
		if sessionToken != "" {
			// Try to verify the session token
			claims, err := jwt.Verify(c.Request.Context(), &jwt.VerifyParams{
				Token: sessionToken,
			})
			if err == nil {
				// If verification succeeds, store claims in context
				c.Set("session_claims", claims)
				c.Set("user_id", claims.Subject)
			}
		}

		c.Next()
	}
}

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
