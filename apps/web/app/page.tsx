import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Navbar active="home" />
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 sm:items-start">
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-sm text-foreground/70">movies.kyle.so</p>
                        <h1 className="text-2xl font-medium">
                            A free and open-source{" "}
                            <span>
                                <Link
                                    href="https://letterboxd.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline decoration-foreground/20 underline-offset-4 transition-colors hover:decoration-foreground"
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
