/* eslint-disable @typescript-eslint/no-explicit-any */
import { MovieDetailsHeader, MovieStats, MovieTagline } from "@/components/movie/movie-details";
import { MovieBackdrop, MoviePoster } from "@/components/movie/movie-images";
import { Button } from "@/components/ui/button";
import { TMDBMovie } from "@/types/movie";
import { EyeIcon, HeartIcon, ListIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Link from "next/link";
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
        <div className="relative min-h-screen w-full flex items-center justify-center">
            {/* Banner background with gradient overlay */}
            <MovieBackdrop src={movie.backdrop_path} />

            {/* Content */}
            <main className="relative w-full px-4 py-8 flex items-center justify-center">
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
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        <StarIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                        <StarIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                        <StarIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                        <StarHalfIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                    </div>
                                    <span className="text-white/70 text-sm">
                                        3.5/5 ({movie.vote_count})
                                    </span>
                                </div>

                                {/* Movie Info */}
                                <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                                    <MovieCerfification
                                        cert={
                                            movie.release_dates.results[0].release_dates[0]
                                                .certification
                                        }
                                    />
                                    <span>·</span>
                                    <span className="text-white/70">
                                        {new Date(movie.release_date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                        {movie.production_countries[0]?.iso_3166_1 &&
                                            ` (${movie.production_countries[0].iso_3166_1})`}
                                    </span>
                                    <span>·</span>
                                    <div className="flex flex-wrap items-center gap-1">
                                        {movie.genres.map((genre: any, i: number) => (
                                            <span key={genre.id}>
                                                <Link
                                                    href={`/genre/${genre.id}`}
                                                    className="text-white/70 hover:underline hover:text-white transition-colors"
                                                >
                                                    {genre.name}
                                                </Link>
                                                {i !== movie.genres.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Overview */}
                                <p className="text-white/90 text-sm mt-2">{movie.overview}</p>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                                    <Button variant="secondary" className="w-full text-white">
                                        <EyeIcon className="w-5 h-5 mr-2" />
                                        Watch
                                    </Button>
                                    <Button variant="secondary" className="w-full text-white">
                                        <HeartIcon className="w-5 h-5 mr-2" />
                                        Like
                                    </Button>
                                    <Button variant="secondary" className="w-full text-white">
                                        <StarIcon className="w-5 h-5 mr-2" />
                                        Rate
                                    </Button>
                                    <Button variant="secondary" className="w-full text-white">
                                        <ListIcon className="w-5 h-5 mr-2" />
                                        Watchlist
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function MovieCerfification({ cert }: { cert: string }) {
    return <div className="border px-1 rounded border-white/40 text-white/70 text-sm">{cert}</div>;
}
