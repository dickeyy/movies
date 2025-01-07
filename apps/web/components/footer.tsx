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
        </footer>
    );
}
