"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserProfile, useAuth, useUser } from "@clerk/nextjs";
import { Code2Icon, HelpCircleIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AccountDropdown() {
    const { user } = useUser();
    const { signOut } = useAuth();

    const [acctSettingsDialogOpen, setAcctSettingsDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-fit w-full rounded-full px-4 py-1 text-[14px] sm:w-fit"
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
                            {/* {user?.username} */}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={() => {
                                setAcctSettingsDialogOpen(true);
                            }}
                        >
                            <SettingsIcon className="mr-2 h-[1rem] w-[1rem]" />
                            Account Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="https://github.com/dickeyy/diary" target="_blank">
                            <Code2Icon className="mr-2 h-[1rem] w-[1rem]" />
                            GitHub
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="https://github.com/dickeyy/diary/issues" target="_blank">
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
            <AccountSettingsDialog
                isOpen={acctSettingsDialogOpen}
                onStateChange={setAcctSettingsDialogOpen}
            />
        </>
    );
}

function AccountSettingsDialog({ isOpen, onStateChange }: { isOpen: boolean; onStateChange: any }) {
    return (
        <Dialog open={isOpen} onOpenChange={onStateChange}>
            <DialogContent className="flex w-fit max-w-full items-center justify-center p-8">
                <UserProfile routing="hash" />
            </DialogContent>
        </Dialog>
    );
}
