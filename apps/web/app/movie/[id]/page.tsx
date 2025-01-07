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
import { notFound } from "next/navigation";

interface MovieResponse {
    movie: TMDBMovie;
    cache: boolean;
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const data = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())) as MovieResponse;

    if (!data.movie || !data.movie.id) {
        return notFound();
    }

    const movie = data.movie;

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center flex-col">
            <Navbar />
            {/* Banner background with gradient overlay */}
            <MovieBackdrop src={movie.backdrop_path} />

            {/* Content */}
            <main className="relative flex-1 w-full px-4 py-8 flex items-center justify-center sm:mt-0 mt-12">
                <div className="max-w-6xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Column - Poster and Stats */}
                        <div className="md:col-span-4 flex flex-col items-center">
                            <MoviePoster src={movie.poster_path} />
                            <MovieStats views={821_000} likes={205_000} lists={131_000} />
                        </div>

                        {/* Right Column - Movie Details */}
                        <div className="md:col-span-8 flex flex-col">
                            <div className="flex flex-col gap-4">
                                {/* Header Section */}
                                <MovieDetailsHeader
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                />

                                {/* Tagline */}
                                {movie.tagline && <MovieTagline tagline={movie.tagline} />}

                                {/* Rating */}
                                <MovieRating
                                    rating={movie.vote_average / 2}
                                    votes={movie.vote_count / 2}
                                />

                                {/* Movie Info */}
                                <MovieCertificationDateAndGenres
                                    cert={
                                        movie.release_dates.results[0].release_dates[0]
                                            .certification
                                    }
                                    releaseDate={movie.release_date}
                                    genres={movie.genres}
                                />

                                {/* Overview */}
                                <p className="text-white/90 text-sm mt-2">{movie.overview}</p>

                                {/* Action Buttons */}
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
