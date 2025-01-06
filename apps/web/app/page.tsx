import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <Navbar active="home" />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 items-center sm:items-start">
                    <div className="flex flex-col space-y-2 items-start justify-center">
                        <p className="text-foreground/70 text-sm">movies.kyle.so</p>
                        <h1 className="text-2xl font-medium">
                            A free and open-source{" "}
                            <span>
                                <Link
                                    href="https://letterboxd.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-primary underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-colors"
                                >
                                    Letterboxd
                                </Link>
                            </span>{" "}
                            alternative.
                        </h1>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
