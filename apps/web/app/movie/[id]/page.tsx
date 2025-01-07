import Footer from "@/components/footer";
import {
    MovieActionButtons,
    MovieCertificationDateAndGenres,
    MovieDetailsHeader,
    MovieRating,
    MovieStats,
    MovieTagline
} from "@/components/movie/movie-details";
import { MovieBackdrop, MoviePoster } from "@/components/movie/movie-images";
import Navbar from "@/components/navbar";
import { TMDBMovie } from "@/types/movie";
import { Rating } from "@/types/user";
import { Metadata } from "next";
import { headers as h } from "next/headers";

interface MovieResponse {
    movie: {
        tmdb: TMDBMovie;
        ratings: Rating[];
        watched_count: number;
        liked_count: number;
        watchlist_count: number;
    };
    error?: string;
}

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).id;
    const data = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())) as MovieResponse;

    if (!data || !data.movie || !data.movie.tmdb || !data.movie.tmdb.id) {
        return {};
    }

    return {
        title: data.movie.tmdb.title + " | Reviews, Ratings, and Stats",
        description: data.movie.tmdb.overview,
        openGraph: {
            title: data.movie.tmdb.title,
            description: data.movie.tmdb.overview
        }
    };
}

async function getMovie(id: string): Promise<MovieResponse> {
    const headersList = await h();
    const authHeader = headersList.get("x-clerk-auth-token");

    const headers: HeadersInit = {
        "Content-Type": "application/json"
    };

    if (authHeader) {
        headers["Authorization"] = `Bearer ${authHeader}`;
    }

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`, {
        headers
    }).then((res) => res.json());

    return data;
}

export default async function MoviePage({ params }: Props) {
    const id = (await params).id;

    const data = await getMovie(id);
    if (!data || !data.movie || !data.movie.tmdb || !data.movie.tmdb.id) {
        return <div className="flex min-h-screen items-center justify-center">Movie not found</div>;
    }

    const movie = data.movie.tmdb;

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
            <Navbar />
            <MovieBackdrop src={movie.backdrop_path} />

            <main className="relative mt-12 flex w-full flex-1 items-center justify-center px-4 py-8 sm:mt-0">
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                        <div className="flex flex-col items-center md:col-span-4">
                            <MoviePoster src={movie.poster_path} />
                            <MovieStats
                                views={data.movie.watched_count}
                                likes={data.movie.liked_count}
                                lists={data.movie.watchlist_count}
                            />
                        </div>

                        <div className="flex flex-col md:col-span-8">
                            <div className="flex flex-col gap-4">
                                <MovieDetailsHeader
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                />

                                {movie.tagline && <MovieTagline tagline={movie.tagline} />}

                                <MovieRating
                                    rating={movie.vote_average / 2}
                                    votes={
                                        (data.movie.ratings && data.movie.ratings.length / 2) || 0
                                    }
                                />

                                <MovieCertificationDateAndGenres
                                    cert={
                                        movie.release_dates.results[0].release_dates[0]
                                            .certification
                                    }
                                    releaseDate={movie.release_date}
                                    genres={movie.genres}
                                />

                                <p className="mt-2 text-sm text-white/90">{movie.overview}</p>

                                <MovieActionButtons />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
