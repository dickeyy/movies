package services

import (
	"context"
	"time"

	"github.com/dickeyy/movies/apps/api/config"
	r "github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

var (
	Redis *r.Client
)

func ConnectRedis() {
	opt, _ := r.ParseURL(config.Config.Redis.URL)
	Redis = r.NewClient(opt)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := Redis.Ping(ctx).Result()
	if err != nil {
		log.Error().Err(err).Msg("Failed to connect to Redis")
	}

	log.Info().Msg("Connected to Redis")
}

func DisconnectRedis() {
	Redis.Close()
	log.Info().Msg("Disconnected from Redis")
}
