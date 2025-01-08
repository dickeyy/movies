import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UserProfile } from "@clerk/nextjs";

export default function AccountSettingsPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Navbar />
            <main className="flex w-full flex-1 items-center justify-center px-4 pb-2 pt-8 sm:mt-0">
                <UserProfile />
            </main>
            <Footer />
        </div>
    );
}
