import Link from "next/link";

export default function Footer() {
    return (
        <footer className="pb-2 px-4 z-10 pt-0 text-center text-sm shadow-lg w-screen flex flex-row justify-between items-center">
            <p className="text-foreground/40 text-xs">
                © {new Date().getFullYear()}{" "}
                <Link href="https://kyle.so" className="hover:underline">
                    Kyle Dickey
                </Link>
            </p>
        </footer>
    );
}
