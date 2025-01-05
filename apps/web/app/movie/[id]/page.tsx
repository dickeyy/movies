/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { EllipsisIcon, EyeIcon, HeartIcon, ListIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    }).then((res) => res.json());

    if (!data.id) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="relative min-h-screen">
            {/* Banner background with gradient overlay */}
            <div className="absolute inset-0">
                <div className="relative w-full h-full">
                    <Image
                        src={`https://media.themoviedb.org/t/p/original/${data.backdrop_path}`}
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
                                src={`https://media.themoviedb.org/t/p/original/${data.poster_path}`}
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
                            <div className="flex flex-row justify-between w-full items-center">
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-3xl font-bold text-white">{data.title}</h1>
                                    <Link
                                        href="/movie/gladiator-ii"
                                        className="text-foreground/50 decoration-foreground/50 hover:underline hover:text-foreground transition-colors underline-offset-4"
                                    >
                                        (2024)
                                    </Link>
                                </div>
                                <Button variant="ghost" className="h-fit px-1 py-1">
                                    <EllipsisIcon className="w-5 h-5 text-white/50" />
                                </Button>
                            </div>
                            <p className="text-white/80 text-sm">{data.tagline}</p>
                            <div className="flex flex-row gap-2 items-center text-white/90 mt-4">
                                <MovieRating />
                                <p>·</p>
                                <p className="text-white/70 text-sm">
                                    {new Date(data.release_date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}{" "}
                                    ({data.origin_country[0]})
                                </p>
                                <p>·</p>
                                <p className="text-white/70 text-sm">
                                    {data.genres.map((genre: any) => genre.name).join(", ")}
                                </p>
                            </div>
                            <p className="text-white/90 text-sm mt-4">{data.overview}</p>
                            <div className="flex flex-col md:flex-row gap-2 items-center mt-8">
                                <Button className="w-full bg-blue-500/40 hover:bg-blue-700 text-white">
                                    <EyeIcon className="w-5 h-5 text-white" />
                                    You have seen this film
                                </Button>
                                <Button className="w-full bg-red-500/40 hover:bg-red-700 text-white">
                                    <HeartIcon className="w-5 h-5 text-white" />
                                    You liked this film
                                </Button>
                                <Button variant="secondary" className="w-full">
                                    <ListIcon className="w-5 h-5 text-white" />
                                    Add to watchlist
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
    return (
        <div className="border w-fit px-1 rounded border-white/40 h-fit text-white/70 text-sm">
            <p>R</p>
        </div>
    );
}
