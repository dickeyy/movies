import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "movies.kyle.so",
    description: "An open-source and free Letterboxd alternative"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // hard coding this because docker is fucking with the env variables, and
        // clerk throws an error when it tries to read the pub key from the env at buld time
        // and it technically hasnt been set yet
        // for now i'm hardcoding it, but i'll fix this later
        <ClerkProvider publishableKey={"pk_test_cmVhbC1zYWlsZmlzaC01Ny5jbGVyay5hY2NvdW50cy5kZXYk"}>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <script
                        defer
                        data-domain="movies.kyle.so"
                        src="https://a.kyle.so/js/script.js"
                    ></script>
                </head>
                <body
                    className={`min-h-screen overflow-auto bg-background font-sans antialiased ${geistSans.variable}`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TooltipProvider>{children}</TooltipProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
