package lib

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/dickeyy/movies/apps/api/config"
	"github.com/dickeyy/movies/apps/api/internal/structs"
)

func QueryTMDBMovie(id string, lang string) (*structs.TMDBMovie, error) {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%s?language=%s&api_key=%s", id, lang, config.Config.TMDB.APIKey)

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")

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
