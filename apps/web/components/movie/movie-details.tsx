import { abbreviateNumber } from "@/lib/utils";
import { Genre } from "@/types/movie";
import { EllipsisIcon, EyeIcon, HeartIcon, ListIcon, StarHalfIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function MovieStats({
    views,
    likes,
    lists
}: {
    views: number;
    likes: number;
    lists: number;
}) {
    return (
        <div className="mt-4 flex w-full justify-center gap-8">
            <div className="flex items-center gap-1 text-foreground/50">
                <EyeIcon className="h-4 w-4" />
                <span className="text-sm">{abbreviateNumber(views)}</span>
            </div>
            <div className="flex items-center gap-1 text-foreground/50">
                <HeartIcon className="h-4 w-4" />
                <span className="text-sm">{abbreviateNumber(likes)}</span>
            </div>
            <div className="flex items-center gap-1 text-foreground/50">
                <ListIcon className="h-4 w-4" />
                <span className="text-sm">{abbreviateNumber(lists)}</span>
            </div>
        </div>
    );
}

export function MovieTitle({ title }: { title: string }) {
    return <h1 className="text-3xl font-bold text-white">{title}</h1>;
}

export function MovieDetailsHeader({ title, releaseDate }: { title: string; releaseDate: string }) {
    return (
        <div className="flex flex-col gap-2">
            {new Date(releaseDate) > new Date() && (
                <Badge variant="destructive" className="w-fit">
                    Upcoming
                </Badge>
            )}

            <div className="flex items-start justify-between">
                <div className="flex flex-wrap items-baseline gap-2">
                    <MovieTitle title={title} />
                    <Link
                        href={`/year/${releaseDate.split("-")[0]}`}
                        className="text-foreground/50 transition-colors hover:text-foreground hover:underline"
                    >
                        ({releaseDate.split("-")[0]})
                    </Link>
                </div>
                <Button variant="ghost" size="icon" className="text-white/50">
                    <EllipsisIcon className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}

export function MovieTagline({ tagline }: { tagline: string }) {
    return <p className="text-sm italic text-white/80">{tagline}</p>;
}

export function MovieRating({ rating, votes }: { rating: number; votes: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {/* Full stars */}
                {Array.from({ length: fullStars }, (_, i) => (
                    <StarIcon
                        key={`full-${i}`}
                        className="h-5 w-5 fill-yellow-500 text-yellow-500"
                    />
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <StarHalfIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                )}
            </div>
            <span className="text-sm text-white/70">
                {rating.toFixed(1)}/5 ({votes.toFixed(0)})
            </span>
        </div>
    );
}

export function MovieCertificationDateAndGenres({
    cert,
    releaseDate,
    genres
}: {
    cert: string;
    releaseDate: string;
    genres: Genre[];
}) {
    return (
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
            <div className="rounded border border-white/40 px-1 text-sm text-white/70">
                {cert || "NR"}
            </div>
            <span>·</span>
            <span className="text-white/70">
                {new Date(releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
                (US)
            </span>
            <span>·</span>
            <div className="flex flex-wrap items-center gap-1">
                {genres.map((genre: Genre, i: number) => (
                    <span key={genre.id}>
                        <Link
                            href={`/genre/${genre.id}`}
                            className="text-white/70 transition-colors hover:text-white hover:underline"
                        >
                            {genre.name}
                        </Link>
                        {i !== genres.length - 1 && ", "}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function MovieActionButtons() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            <Button variant="secondary" className="w-full text-white">
                <EyeIcon className="mr-2 h-5 w-5" />
                Watch
            </Button>
            <Button variant="secondary" className="w-full text-white">
                <HeartIcon className="mr-2 h-5 w-5" />
                Like
            </Button>
            <Button variant="secondary" className="w-full text-white">
                <StarIcon className="mr-2 h-5 w-5" />
                Rate
            </Button>
            <Button variant="secondary" className="w-full text-white">
                <ListIcon className="mr-2 h-5 w-5" />
                Watchlist
            </Button>
        </div>
    );
}
