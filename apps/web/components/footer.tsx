import BlueskyIcon from "@/public/icons/bluesky.svg";
import GitHubIcon from "@/public/icons/github.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="z-10 flex w-screen flex-row items-center justify-between px-4 pb-2 pt-0 text-center text-sm shadow-lg">
            <p className="text-xs text-foreground/40">
                © {new Date().getFullYear()}{" "}
                <Link href="https://kyle.so" className="hover:underline">
                    Kyle Dickey
                </Link>
            </p>
            <div className="flex flex-row items-center gap-4">
                <Link href="https://bsky.app/profile/kyle.so" target="_blank">
                    <BlueskyIcon className="h-4 w-4 fill-foreground/40 transition-colors duration-150 hover:fill-foreground" />
                </Link>
                <Link href="https://github.com/dickeyy/movies" target="_blank">
                    <GitHubIcon className="h-4 w-4 fill-foreground/40 transition-colors duration-150 hover:fill-foreground" />
                </Link>
            </div>
        </footer>
    );
}
