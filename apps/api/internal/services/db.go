package services

import (
	"context"

	"github.com/dickeyy/movies/apps/api/config"
	"github.com/jackc/pgx/v5"
	"github.com/rs/zerolog/log"
)

var DB *pgx.Conn

func OpenDB() {
	conn, err := pgx.Connect(context.Background(), config.Config.DB.URL)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}
	defer CloseDB()

	DB = conn
	log.Info().Msg("Connected to database")
}

func CloseDB() {
	DB.Close(context.Background())
	log.Info().Msg("Closed database connection")
}
