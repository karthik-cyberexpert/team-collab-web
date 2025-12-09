"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserNav() {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className="flex flex-col gap-1">
                            <span className="font-medium">New Mission Available</span>
                            <span className="text-xs text-muted-foreground">Check your dashboard!</span>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className="flex flex-col gap-1">
                            <span className="font-medium">Team Invite</span>
                            <span className="text-xs text-muted-foreground">CyberNinjas invited you.</span>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-xs text-muted-foreground w-full flex justify-center cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Access Level</p>
                <p className="text-xs leading-none text-muted-foreground">
                Demo User
                </p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/login")}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
