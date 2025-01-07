import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Navbar active="sign-in" />
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <SignUp />
            </main>
            <Footer />
        </div>
    );
}
