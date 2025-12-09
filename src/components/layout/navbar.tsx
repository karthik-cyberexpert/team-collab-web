"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons" // Assuming I might need icons later
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="font-bold sm:inline-block">TeamCollab</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              href="/features"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/features" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Features
            </Link>
            <Link
              href="/explore"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/explore" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Explore
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none hidden md:block">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input 
                    type="text" 
                    className="flex h-9 w-full rounded-md border border-input bg-background/50 px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px] hover:bg-background/80 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_-3px_var(--color-primary)]" 
                    placeholder="Search users, projects..." 
                />
            </div>
          </div>
          <nav className="flex items-center gap-2">
             <Link href="/login">
                <Button variant="ghost" size="sm">
                    Login
                </Button>
            </Link>
            <Link href="/signup">
                <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20">
                    Get Started
                </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
