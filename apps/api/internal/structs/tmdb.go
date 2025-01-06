package structs

type TMDBMovie struct {
	Adult               bool        `json:"adult"`
	BackdropPath        string      `json:"backdrop_path"`
	BelongsToCollection interface{} `json:"belongs_to_collection"` // null in example, could be a separate struct if needed
	Budget              int         `json:"budget"`
	Genres              []Genre     `json:"genres"`
	Homepage            string      `json:"homepage"`
	ID                  int         `json:"id"`
	ImdbID              string      `json:"imdb_id"`
	OriginalLanguage    string      `json:"original_language"`
	OriginalTitle       string      `json:"original_title"`
	Overview            string      `json:"overview"`
	Popularity          float64     `json:"popularity"`
	PosterPath          string      `json:"poster_path"`
	ProductionCompanies []Company   `json:"production_companies"`
	ProductionCountries []Country   `json:"production_countries"`
	ReleaseDate         string      `json:"release_date"`
	Revenue             int         `json:"revenue"`
	Runtime             int         `json:"runtime"`
	SpokenLanguages     []Language  `json:"spoken_languages"`
	Status              string      `json:"status"`
	Tagline             string      `json:"tagline"`
	Title               string      `json:"title"`
	Video               bool        `json:"video"`
	VoteAverage         float64     `json:"vote_average"`
	VoteCount           int         `json:"vote_count"`
}

type Genre struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Company struct {
	ID            int     `json:"id"`
	LogoPath      *string `json:"logo_path"` // pointer since it can be null
	Name          string  `json:"name"`
	OriginCountry string  `json:"origin_country"`
}

type Country struct {
	ISO3166_1 string `json:"iso_3166_1"`
	Name      string `json:"name"`
}

type Language struct {
	EnglishName string `json:"english_name"`
	ISO639_1    string `json:"iso_639_1"`
	Name        string `json:"name"`
}
