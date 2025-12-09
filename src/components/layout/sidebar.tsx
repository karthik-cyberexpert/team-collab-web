"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Trophy, Swords, FolderKanban, MessageSquare, Settings, LogOut, ShoppingBag, Medal, Smile, Calendar, BookOpen, Shield } from "lucide-react"

import { cn } from "@/lib/utils"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: Users, label: "Teams", href: "/teams" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Swords, label: "Arena", href: "/arena" },
  { icon: ShoppingBag, label: "Store", href: "/store" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: Medal, label: "Achievements", href: "/achievements" },
  { icon: Smile, label: "Friends", href: "/friends" },
  { icon: Calendar, label: "Schedule", href: "/calendar" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Shield, label: "Admin", href: "/admin" },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    mobile?: boolean
}

export function Sidebar({ className, mobile }: SidebarProps) {
  // const pathname = usePathname() // Use if needed for active state

  return (
    <aside className={cn("pb-12 border-r bg-background", mobile ? "w-full" : "hidden md:flex flex-col w-64 fixed h-screen z-40")}>
      <div className="flex h-14 items-center border-b border-border/40 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <span className="text-xl">⚡</span> Antigravity
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item, index) => (
             <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-300 relative overflow-hidden hover:text-white",
                // pathname === item.href && "bg-muted text-primary" 
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              <item.icon className="h-4 w-4 relative z-10 group-hover:text-primary transition-colors" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/40 p-4">
         <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Logout
         </button>
      </div>
    </aside>
  )
}
