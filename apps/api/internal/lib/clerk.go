package lib

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/gin-gonic/gin"
)

// Helper function to get the session claims from the context if they exist
func GetSessionClaims(c *gin.Context) (*clerk.SessionClaims, bool) {
	claims, exists := c.Get("session_claims")
	if !exists {
		return nil, false
	}
	return claims.(*clerk.SessionClaims), true
}

// Helper function to get the user ID from the context if it exists
func GetUserID(c *gin.Context) (string, bool) {
	userID, exists := c.Get("user_id")
	if !exists {
		return "", false
	}
	return userID.(string), true
}
