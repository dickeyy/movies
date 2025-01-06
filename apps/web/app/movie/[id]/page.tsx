/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TMDBMovie } from "@/types/movie";
import { EllipsisIcon, EyeIcon, HeartIcon, ListIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        return <div>Movie not found</div>;
    }

    const movie = data.movie;

    return (
        <div className="relative min-h-screen">
            {/* Banner background with gradient overlay */}
            <div className="absolute inset-0">
                <div className="relative w-full h-full">
                    <Image
                        src={`https://media.themoviedb.org/t/p/original/${movie.backdrop_path}`}
                        alt="background"
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black"
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col min-h-screen justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-center">
                    <div className="flex flex-col md:flex-row justify-between gap-8 items-start max-w-4xl">
                        <div className="flex flex-col gap-2 justify-center items-center w-full">
                            <Image
                                src={`https://media.themoviedb.org/t/p/original/${movie.poster_path}`}
                                alt="cover"
                                width={300}
                                height={450}
                                className="rounded-lg border shadow-md"
                            />
                            <div className="flex flex-row gap-4 items-center">
                                <div className="flex flex-row gap-1 items-center text-foreground/50">
                                    <EyeIcon className="w-4 h-4" />
                                    <p className="text-xs">821k</p>
                                </div>
                                <div className="flex flex-row gap-1 items-center text-foreground/50">
                                    <HeartIcon className="w-4 h-4" />
                                    <p className="text-xs">205k</p>
                                </div>
                                <div className="flex flex-row gap-1 items-center text-foreground/50">
                                    <ListIcon className="w-4 h-4" />
                                    <p className="text-xs">131k</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {new Date(movie.release_date) > new Date() && (
                                <Badge variant="destructive" className="w-fit mb-2">
                                    Upcoming
                                </Badge>
                            )}
                            <div className="flex flex-row justify-between w-full items-center">
                                <div className="flex flex-row space-x-2 items-center">
                                    <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                                    <Link
                                        href={`/year/${movie.release_date.split("-")[0]}`}
                                        className="text-foreground/50 decoration-foreground/50 hover:underline hover:text-foreground transition-colors"
                                    >
                                        ({movie.release_date.split("-")[0]})
                                    </Link>
                                </div>
                                <Button variant="ghost" className="h-fit px-1 py-1">
                                    <EllipsisIcon className="w-5 h-5 text-white/50" />
                                </Button>
                            </div>
                            <p className="text-white/80 text-sm">{movie.tagline}</p>
                            <div className="flex flex-row gap-1 items-center mt-2">
                                <StarIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                <StarIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                <StarIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                <StarHalfIcon className="w-5 h-5 fill-yellow-500 text-transparent" />
                                <p className="text-white/70 text-sm">3.5/5 ({movie.vote_count})</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center text-white/90 mt-4">
                                <MovieRating />
                                <p>·</p>
                                <p className="text-white/70 text-sm">
                                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}{" "}
                                    ({movie.production_countries[0].iso_3166_1})
                                </p>
                                <p>·</p>
                                <div className="flex flex-row gap-1 items-center">
                                    {movie.genres.map((genre: any, i: number) => (
                                        <div
                                            key={genre.id}
                                            className="flex flex-row items-center text-white/70 text-sm"
                                        >
                                            <Link
                                                href={`/genre/${genre.id}`}
                                                className="hover:underline hover:text-white transition-colors underline-offset-4"
                                            >
                                                {genre.name}
                                            </Link>
                                            {i !== movie.genres.length - 1 && <p>,</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-white/90 text-sm mt-4">{movie.overview}</p>
                            <div className="flex flex-col md:flex-row gap-2 items-center mt-8">
                                <Button variant="secondary" className="w-full text-white">
                                    <EyeIcon className="w-5 h-5" />
                                    Watch
                                </Button>
                                <Button variant="secondary" className="w-full text-white">
                                    <HeartIcon className="w-5 h-5" />
                                    Like
                                </Button>
                                <Button variant="secondary" className="w-full text-white">
                                    <StarIcon className="w-5 h-5" />
                                    Rate
                                </Button>
                                <Button variant="secondary" className="w-full text-white">
                                    <ListIcon className="w-5 h-5" />
                                    Watchlisted
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function MovieRating() {
    // TODO: implement
    return (
        <div className="border w-fit px-1 rounded border-white/40 h-fit text-white/70 text-sm">
            <p>R</p>
        </div>
    );
}
