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
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%s?language=%s&api_key=%s&append_to_response=release_dates", id, lang, config.Config.TMDB.APIKey)

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

	// filter to only keep US release dates
	if movie.ReleaseDates.Results != nil {
		var filteredResults []structs.ReleaseDateCountry
		for _, result := range movie.ReleaseDates.Results {
			if result.ISO_3166_1 == "US" {
				filteredResults = append(filteredResults, result)
				break
			}
		}
		movie.ReleaseDates.Results = filteredResults
	}

	return &movie, nil
}

func QueryTMDBPopularMovies(lang string, page string) ([]*structs.TMDBMiniMovie, error) {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/popular?language=%s&api_key=%s&page=%s", lang, config.Config.TMDB.APIKey, page)
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

	// Create a struct to hold the full response
	var response struct {
		Page         int                      `json:"page"`
		Results      []*structs.TMDBMiniMovie `json:"results"`
		TotalPages   int                      `json:"total_pages"`
		TotalResults int                      `json:"total_results"`
	}

	// Unmarshal the full response
	err = json.Unmarshal(body, &response)
	if err != nil {
		return nil, err
	}

	return response.Results, nil
}
