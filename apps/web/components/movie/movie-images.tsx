import Image from "next/image";

export function MovieBackdrop({ src }: { src: string }) {
    if (!src) return null;
    return (
        <div className="absolute inset-0">
            <div className="relative h-full w-full">
                <Image
                    src={`https://media.themoviedb.org/t/p/original/${src}`}
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
    );
}

export function MoviePoster({ src }: { src: string }) {
    if (!src) return null; // TODO: return a placeholder image
    return (
        <div className="relative aspect-[2/3] w-64 overflow-hidden rounded-lg shadow-lg">
            <Image
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${src}`}
                alt={`${src} poster`}
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}
