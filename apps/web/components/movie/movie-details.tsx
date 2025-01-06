import { abbreviateNumber } from "@/lib/utils";
import { EllipsisIcon, EyeIcon, HeartIcon, ListIcon } from "lucide-react";
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
