package storage

import (
	"context"

	"github.com/dickeyy/movies/apps/api/internal/services"
	"github.com/dickeyy/movies/apps/api/internal/structs"
	"github.com/google/uuid"
)

func CreateUser(user *structs.User) error {
	user.ID = uuid.New()

	// execute the insert statement
	_, err := services.DB.Exec(
		context.Background(),
		"INSERT INTO USERS (id, username, email) VALUES ($1, $2, $3)",
		user.ID, user.Username, user.Email,
	)
	if err != nil {
		return err
	}

	return nil
}

func GetUserByID(id uuid.UUID) (*structs.User, error) {
	var user structs.User

	err := services.DB.QueryRow(
		context.Background(),
		"SELECT * FROM USERS WHERE id = $1",
		id,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUserByUsername(username string) (*structs.User, error) {
	var user structs.User

	err := services.DB.QueryRow(
		context.Background(),
		"SELECT * FROM USERS WHERE username = $1",
		username,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
