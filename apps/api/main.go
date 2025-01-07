package main

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/dickeyy/movies/apps/api/config"
	"github.com/dickeyy/movies/apps/api/internal/api"
	"github.com/dickeyy/movies/apps/api/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func main() {
	// Initialize configuration
	cfg := config.Init()

	// Set Gin mode based on environment
	if cfg.Env != "dev" {
		gin.SetMode(gin.ReleaseMode)
	}

	// connect services
	services.ConnectRedis()
	services.OpenDB()

	// initialize clerk
	clerk.SetKey(config.Config.Clerk.Key)

	// Create and start server
	server := api.NewServer(cfg)
	if err := server.Start(); err != nil {
		log.Fatal().Err(err).Msg("Server failed to start")
	}
}
