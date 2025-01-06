package api

import (
	"fmt"

	"github.com/dickeyy/movies/apps/api/config"
	h "github.com/dickeyy/movies/apps/api/internal/api/handlers"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type Server struct {
	router *gin.Engine
	cfg    *config.ConfigType
}

func NewServer(cfg *config.ConfigType) *Server {
	router := gin.New()

	// Middleware
	router.Use(gin.Recovery())
	router.Use(loggerMiddleware())
	router.Use(cors())
	router.Use(autoHead())

	// Initialize server
	server := &Server{
		router: router,
		cfg:    cfg,
	}

	// Register routes
	server.registerRoutes()

	return server
}

func (s *Server) registerRoutes() {
	s.router.GET("/", h.GetBase)
	s.router.GET("/ping", h.GetPing)

	s.router.GET("/movie/:id", h.GetMovie)
}

func (s *Server) Start() error {
	addr := fmt.Sprintf(":%s", s.cfg.Port)
	log.Info().
		Str("env", s.cfg.Env).
		Str("port", s.cfg.Port).
		Msg("Starting server")

	return s.router.Run(addr)
}
