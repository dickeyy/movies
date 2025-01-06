package lib

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/dickeyy/movies/apps/api/config"
	"github.com/dickeyy/movies/apps/api/internal/structs"
)

func QueryTMDBMovie(id string) (*structs.TMDBMovie, error) {
	url := "https://api.themoviedb.org/3/movie/" + id + "?language=en-US"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", "Bearer "+config.Config.TMDB.Token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	// cast to struct
	var movie structs.TMDBMovie
	err = json.Unmarshal(body, &movie)
	if err != nil {
		return nil, err
	}

	return &movie, nil
}
