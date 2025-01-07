/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar({ active }: { active?: "home" | "browse" | "sign-up" | "sign-in" }) {
    return (
        <nav className="bg-card/20 glass-blur fixed top-4 z-50 flex w-full sm:w-fit items-center justify-between rounded-full border p-1 shadow-md">
            <div className="flex items-center gap-1 sm:gap-2 w-full justify-between">
                <NavbarButton isActive={active === "home"}>
                    <Link href="/">Home</Link>
                </NavbarButton>
                <NavbarButton isActive={active === "browse"}>
                    <Link href="/browse">Browse</Link>
                </NavbarButton>
                <NavbarButton isActive={active === "sign-in"}>
                    <Link href="/sign-in">Sign In</Link>
                </NavbarButton>
            </div>
        </nav>
    );
}

function NavbarButton({
    children,
    isActive,
    highlight
}: {
    children: React.ReactNode;
    isActive?: boolean;
    highlight?: boolean;
}) {
    let variant = "ghost";
    if (highlight) {
        variant = "default";
    }
    if (isActive) {
        variant = "secondary";
    }
    return (
        <Button
            variant={variant as any}
            asChild
            className={`h-fit rounded-full px-4 py-1 text-[14px] w-full sm:w-fit ${
                isActive ? "font-medium" : "font-normal"
            }`}
        >
            {children}
        </Button>
    );
}
