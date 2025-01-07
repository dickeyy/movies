import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const comingSoon = true;
    return (
        <div className="flex min-h-screen flex-col items-center">
            {!comingSoon && <Navbar active="home" />}
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center sm:items-start">
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <div className="flex w-full flex-row items-center justify-between font-mono text-sm text-foreground/70">
                            <p>movies.kyle.so</p>
                            <p>Coming Soon</p>
                        </div>
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
                <Button className="group mt-8 w-full" asChild>
                    <Link
                        href="https://bsky.app/profile/kyle.so"
                        target="_blank"
                        className="flex items-center"
                    >
                        Get Updates
                        <ArrowRightIcon className="ml-0 h-2 w-2 translate-x-[-5px] transform opacity-0 transition-all duration-150 ease-in-out group-hover:ml-1 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                </Button>
            </main>
            <Footer />
        </div>
    );
}
