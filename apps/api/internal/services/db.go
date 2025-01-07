package services

import (
	"context"
	"os"

	"github.com/dickeyy/movies/apps/api/config"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

var DB *pgxpool.Pool

func OpenDB() {
	var err error

	// Create a connection pool configuration
	config, err := pgxpool.ParseConfig(config.Config.DB.URL)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to parse database config")
	}

	config.MaxConns = 10
	config.MinConns = 2

	// Create the pool
	DB, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}

	// Test the connection
	if err := DB.Ping(context.Background()); err != nil {
		log.Fatal().Err(err).Msg("failed to ping database")
	}

	// initialize the schema
	if err := initSchema(); err != nil {
		log.Fatal().Err(err).Msg("failed to initialize database schema")
	}

	log.Info().Msg("Connected to database")
}

func CloseDB() {
	if DB != nil {
		DB.Close()
		log.Info().Msg("Closed database connection pool")
	} else {
		log.Info().Msg("Database connection pool is already closed")
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
