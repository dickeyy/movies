/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from "@clerk/nextjs";
import { Code2Icon, HelpCircleIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AccountDropdown() {
    const { user } = useUser();
    const { signOut } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-fit w-full rounded-full py-1 pl-1 pr-4 text-[14px] sm:w-fit"
                >
                    <div className="flex flex-row items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback>
                                {user?.username ? user?.username.charAt(0) : "?"}
                            </AvatarFallback>
                            <AvatarImage
                                className="h-6 w-6"
                                src={user?.imageUrl}
                                alt={user?.username + "'s avatar"}
                            />
                        </Avatar>
                        {user?.username}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={`/${user?.username}`}>
                            <UserIcon className="mr-2 h-[1rem] w-[1rem]" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings/account">
                            <SettingsIcon className="mr-2 h-[1rem] w-[1rem]" />
                            Account Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="https://github.com/dickeyy/movies" target="_blank">
                        <Code2Icon className="mr-2 h-[1rem] w-[1rem]" />
                        GitHub
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="https://github.com/dickeyy/movies/issues" target="_blank">
                        <HelpCircleIcon className="mr-2 h-[1rem] w-[1rem]" />
                        Support
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="focus:bg-red-500/20"
                    onSelect={() => {
                        signOut();
                    }}
                >
                    <LogOutIcon className="mr-2 h-[1rem] w-[1rem]" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
