package handlers

import (
	"github.com/dickeyy/movies/apps/api/internal/storage"
	"github.com/dickeyy/movies/apps/api/internal/structs"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func PostUser(c *gin.Context) {
	// get the body
	var body struct {
		Username string `json:"username"`
		Email    string `json:"email"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// create the user
	err := storage.CreateUser(&structs.User{
		Username: body.Username,
		Email:    body.Email,
	})
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User created successfully"})
}

func GetUserByID(c *gin.Context) {
	id := c.Param("id")

	// cast the id to a uuid
	uid, err := uuid.Parse(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	user, err := storage.GetUserByID(uid)
	if err != nil {
		// if the user doesnt exist
		if err == pgx.ErrNoRows {
			c.JSON(404, gin.H{"error": "User not found"})
			return
		}
		// otherwise, return an internal server error
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"user": user})
}

func GetUserByUsername(c *gin.Context) {
	username := c.Param("username")

	user, err := storage.GetUserByUsername(username)
	if err != nil {
		// if the user doesnt exist
		if err == pgx.ErrNoRows {
			c.JSON(404, gin.H{"error": "User not found"})
			return
		}
		// otherwise, return an internal server error
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"user": user})
}
