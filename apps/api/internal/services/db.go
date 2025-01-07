package services

import (
	"context"
	"os"

	"github.com/dickeyy/movies/apps/api/config"
	"github.com/jackc/pgx/v5"
	"github.com/rs/zerolog/log"
)

var DB *pgx.Conn

func OpenDB() {
	var err error
	DB, err = pgx.Connect(context.Background(), config.Config.DB.URL)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}

	// initialize the schema
	if err := initSchema(); err != nil {
		log.Fatal().Err(err).Msg("failed to initialize database schema")
	}

	log.Info().Msg("Connected to database")
}

func CloseDB() {
	if DB != nil {
		DB.Close(context.Background())
		log.Info().Msg("Closed database connection")
	} else {
		log.Info().Msg("Database connection is already closed")
	}
}

func initSchema() error {
	// read the schema file
	schemaSQL, err := os.ReadFile("sql/schema.sql")
	if err != nil {
		return err
	}

	// execute the schema
	_, err = DB.Exec(context.Background(), string(schemaSQL))
	if err != nil {
		return err
	}

	return nil
}
