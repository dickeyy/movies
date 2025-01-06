/* eslint-disable @typescript-eslint/no-explicit-any */
import MovieBackdrop from "@/components/movie/movie-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TMDBMovie } from "@/types/movie";
import { EllipsisIcon, EyeIcon, HeartIcon, ListIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Image from "next/image";
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
                            <div className="w-64 aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                    alt={`${movie.title} poster`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="flex justify-center gap-8 mt-4 w-full">
                                <div className="flex items-center gap-1 text-foreground/50">
                                    <EyeIcon className="w-4 h-4" />
                                    <span className="text-sm">821k</span>
                                </div>
                                <div className="flex items-center gap-1 text-foreground/50">
                                    <HeartIcon className="w-4 h-4" />
                                    <span className="text-sm">205k</span>
                                </div>
                                <div className="flex items-center gap-1 text-foreground/50">
                                    <ListIcon className="w-4 h-4" />
                                    <span className="text-sm">131k</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Movie Details */}
                        <div className="md:col-span-8 flex flex-col">
                            <div className="flex flex-col gap-4">
                                {/* Header Section */}
                                <div className="flex flex-col gap-2">
                                    {new Date(movie.release_date) > new Date() && (
                                        <Badge variant="destructive" className="w-fit">
                                            Upcoming
                                        </Badge>
                                    )}

                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-wrap items-baseline gap-2">
                                            <h1 className="text-3xl font-bold text-white">
                                                {movie.title}
                                            </h1>
                                            <Link
                                                href={`/year/${movie.release_date.split("-")[0]}`}
                                                className="text-foreground/50 hover:underline hover:text-foreground transition-colors"
                                            >
                                                ({movie.release_date.split("-")[0]})
                                            </Link>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-white/50"
                                        >
                                            <EllipsisIcon className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Tagline */}
                                {movie.tagline && (
                                    <p className="text-white/80 text-sm italic">{movie.tagline}</p>
                                )}

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
                                    <MovieRating />
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

function MovieRating() {
    return <div className="border px-2 rounded border-white/40 text-white/70 text-sm">R</div>;
}
