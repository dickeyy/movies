"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { MiniMovie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
    const [movies, setMovies] = useState<MiniMovie[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    const fetchMovies = async (pageNum: number) => {
        try {
            setIsLoading(true);
            const data = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?page=${pageNum}`
            ).then((res) => res.json());

            if (data.movies.length === 0) {
                setHasMore(false);
                return;
            }

            setMovies((prev) => [...prev, ...data.movies]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchMovies(1);
    }, []);

    // Load more when scrolling to bottom
    useEffect(() => {
        if (inView && !isLoading && hasMore) {
            fetchMovies(page);
        }
    }, [inView]);

    return (
        <div className="flex min-h-screen flex-col items-center">
            <Navbar active="browse" />
            <main className="flex flex-1 flex-col items-start justify-center gap-2 px-4 py-12 pt-24 sm:px-6 lg:px-8">
                <div className="flex w-full flex-row items-center justify-between">
                    <h1 className="text-3xl font-medium">Movies</h1>
                </div>
                <p className="font-mono text-xs text-foreground/40">Scroll to load more movies</p>
                <Separator />

                <div className="mt-2 grid grid-cols-2 items-center gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {movies.map((movie: MiniMovie) => (
                        <MiniMovie key={movie.id} movie={movie} />
                    ))}

                    {/* Loading indicator */}
                    {isLoading && <Skelys />}

                    {/* Intersection observer target */}
                    <div ref={ref} className="col-span-full h-10" />

                    {/* No more movies indicator */}
                    {!hasMore && (
                        <div className="col-span-full text-center text-foreground/40">
                            No more movies to load
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function Skelys() {
    return (
        <>
            <Skeleton className="aspect-[2/3] w-[250px] rounded-lg" />
            <Skeleton className="aspect-[2/3] w-[250px] rounded-lg" />
            <Skeleton className="aspect-[2/3] w-[250px] rounded-lg" />
            <Skeleton className="aspect-[2/3] w-[250px] rounded-lg" />
            <Skeleton className="aspect-[2/3] w-[250px] rounded-lg" />
            <Skeleton className="aspect-[2/3] w-[250px] rounded-lg" />
        </>
    );
}

function MiniMovie({ movie }: { movie: MiniMovie }) {
    return (
        <Link className="group flex w-fit flex-col items-center gap-2" href={`/movie/${movie.id}`}>
            <Image
                src={`https://media.themoviedb.org/t/p/original/${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={250}
                height={200}
                className="aspect-[2/3] rounded-lg border transition-all group-hover:brightness-75"
            />
            <p className="font-mono text-xs text-foreground/40">{movie.title}</p>
        </Link>
    );
}
