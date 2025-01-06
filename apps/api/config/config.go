package config

import (
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type ConfigType struct {
	Env  string
	Port string
	TMDB struct {
		Token string
	}
	Redis struct {
		URL string
	}
}

var Config *ConfigType

func Init() *ConfigType {
	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		log.Debug().Msg("No .env file found")
	}

	// Set default values
	Config = &ConfigType{
		Env:  getEnvWithDefault("ENV", "prod"),
		Port: getEnvWithDefault("PORT", "8080"),
		TMDB: struct {
			Token string
		}{
			Token: getEnvWithDefault("TMDB_TOKEN", ""),
		},
		Redis: struct {
			URL string
		}{
			URL: getEnvWithDefault("REDIS_URL", ""),
		},
	}

	// Configure logging
	setupLogging(Config.Env)

	return Config
}

func setupLogging(env string) {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	// Set up console writer
	consoleWriter := zerolog.ConsoleWriter{
		Out:        os.Stdout,
		TimeFormat: time.RFC3339,
	}

	// Set global logger
	log.Logger = log.Output(consoleWriter)

	// Set log level based on environment
	if env == "dev" {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
		log.Debug().Msg("Debug logging enabled")
	} else {
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
		log.Info().Str("env", env).Msg("Production logging enabled")
	}
}

func getEnvWithDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}