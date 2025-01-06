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
        <div className="flex justify-center gap-8 mt-4 w-full">
            <div className="flex items-center gap-1 text-foreground/50">
                <EyeIcon className="w-4 h-4" />
                <span className="text-sm">{abbreviateNumber(views)}</span>
            </div>
            <div className="flex items-center gap-1 text-foreground/50">
                <HeartIcon className="w-4 h-4" />
                <span className="text-sm">{abbreviateNumber(likes)}</span>
            </div>
            <div className="flex items-center gap-1 text-foreground/50">
                <ListIcon className="w-4 h-4" />
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
                        className="text-foreground/50 hover:underline hover:text-foreground transition-colors"
                    >
                        ({releaseDate.split("-")[0]})
                    </Link>
                </div>
                <Button variant="ghost" size="icon" className="text-white/50">
                    <EllipsisIcon className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}

export function MovieTagline({ tagline }: { tagline: string }) {
    return <p className="text-white/80 text-sm italic">{tagline}</p>;
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
                        className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <StarHalfIcon className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                )}
            </div>
            <span className="text-white/70 text-sm">
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
            <div className="border px-1 rounded border-white/40 text-white/70 text-sm">
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
                            className="text-white/70 hover:underline hover:text-white transition-colors"
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
    );
}
