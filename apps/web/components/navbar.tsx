/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar({ active }: { active?: "home" | "browse" | "sign-up" | "sign-in" }) {
    return (
        <nav className="glass-blur fixed top-4 z-50 flex w-[95%] items-center justify-between rounded-full border bg-card/20 p-1 shadow-md sm:w-fit">
            <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
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
            className={`h-fit w-full rounded-full px-4 py-1 text-[14px] sm:w-fit ${
                isActive ? "font-medium" : "font-normal"
            }`}
        >
            {children}
        </Button>
    );
}
