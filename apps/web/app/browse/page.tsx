import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Navbar active="browse" />
            <main className="flex flex-1 flex-col items-start justify-center gap-2 px-4 py-12 pt-24 sm:px-6 lg:px-8">
                <div className="flex w-full flex-row items-center justify-between">
                    <h1 className="text-3xl font-medium">Movies</h1>
                </div>
                <p className="font-mono text-xs text-foreground/40">
                    1,245,301 found based on your search.
                </p>
                <Separator />

                <div className="mt-2 grid grid-cols-2 items-center gap-4 md:grid-cols-4 lg:grid-cols-6">
                    <Skelys />
                </div>
            </main>
            <Footer />
        </div>
    );
}

function Skelys() {
    return (
        <>
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
            <Skeleton className="aspect-[2/3] w-36 rounded-lg" />
        </>
    );
}
