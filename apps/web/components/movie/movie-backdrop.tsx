import Image from "next/image";

export default function MovieBackdrop({ src }: { src: string }) {
    return (
        <div className="absolute inset-0">
            <div className="relative w-full h-full">
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
