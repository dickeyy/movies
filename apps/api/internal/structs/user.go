package structs

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Rating struct {
	ID        uuid.UUID `json:"id"`
	UserID    uuid.UUID `json:"user_id"`
	MovieID   string    `json:"movie_id"`
	Rating    float64   `json:"rating"`
	Content   *string   `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type WatchedMovie struct {
	ID        uuid.UUID `json:"id"`
	UserID    uuid.UUID `json:"user_id"`
	MovieID   string    `json:"movie_id"`
	WatchedAt time.Time `json:"watched_at"`
}

type LikedMovie struct {
	ID      uuid.UUID `json:"id"`
	UserID  uuid.UUID `json:"user_id"`
	MovieID string    `json:"movie_id"`
	LikedAt time.Time `json:"liked_at"`
}

type WatchlistMovie struct {
	ID          uuid.UUID `json:"id"`
	UserID      uuid.UUID `json:"user_id"`
	MovieID     string    `json:"movie_id"`
	WatchlistAt time.Time `json:"watchlist_at"`
}
