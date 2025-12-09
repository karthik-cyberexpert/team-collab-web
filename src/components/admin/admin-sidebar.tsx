"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Users, Shield, LayoutDashboard, Database, ShoppingBag, 
  Trophy, Swords, Crosshair, Terminal, Gamepad2, 
  MessageSquare, Bell, Settings, Activity, FileCode, 
  Cpu, Award, Calendar, Ghost, MonitorPlay
} from "lucide-react"

const adminRoutes = [
  { label: "Command Center", icon: Activity, href: "/admin", color: "text-red-500" },
  { label: "Users & Roles", icon: Users, href: "/admin/users", color: "text-blue-400" },
  { label: "Teams & Clans", icon: Shield, href: "/admin/teams", color: "text-indigo-400" },
  { label: "Projects & Tasks", icon: FolderKanban, href: "/admin/projects", color: "text-green-400" },
  { label: "Auctions", icon: Database, href: "/admin/auctions", color: "text-yellow-400" },
  { label: "Coding Arena (PvP)", icon: Swords, href: "/admin/arena", color: "text-red-400" },
  { label: "Boss Raids (PvE)", icon: Ghost, href: "/admin/bosses", color: "text-purple-500" },
  { label: "Duo Challenges", icon: Crosshair, href: "/admin/duo", color: "text-orange-400" },
  { label: "Hackathons", icon: Calendar, href: "/admin/hackathons", color: "text-pink-400" },
  { label: "Mini-Games", icon: Gamepad2, href: "/admin/minigames", color: "text-emerald-400" },
  { label: "Typing Module", icon: Terminal, href: "/admin/typing", color: "text-cyan-400" },
  { label: "Store Items", icon: ShoppingBag, href: "/admin/store", color: "text-amber-400" },
  { label: "Achievements", icon: Award, href: "/admin/achievements", color: "text-yellow-300" },
  { label: "Daily Missions", icon: CheckCircle, href: "/admin/missions", color: "text-green-300" },
  { label: "Seasons", icon: Trophy, href: "/admin/seasons", color: "text-gold-400" },
  { label: "Social Feed", icon: MessageSquare, href: "/admin/feed", color: "text-blue-300" },
  { label: "Endorsements", icon: Star, href: "/admin/skills", color: "text-violet-400" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics", color: "text-teal-400" },
  { label: "Notifications", icon: Bell, href: "/admin/notifications", color: "text-rose-400" },
  { label: "Settings", icon: Settings, href: "/admin/settings", color: "text-gray-400" },
]

// Import these locally to avoid circular deps or missing icon errors if Lucide version differs
import { FolderKanban, CheckCircle, Star, BarChart3 } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-72 bg-black/95 border-r border-red-500/20 h-screen overflow-y-auto flex flex-col fixed left-0 top-0 z-50 shadow-[4px_0_24px_-4px_rgba(255,0,0,0.1)]">
        
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-red-500/20 bg-black/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center border border-red-500/50 animate-pulse">
                    <Shield className="w-5 h-5 text-red-500" />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-white tracking-widest uppercase font-mono">GOD MODE</h2>
                    <p className="text-[10px] text-red-500 opacity-80 uppercase tracking-wider">System Administrator</p>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 px-4 space-y-1">
            {adminRoutes.map((route, idx) => (
                <Link 
                    key={idx} 
                    href={route.href}
                    className={cn(
                        "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 relative overflow-hidden",
                        pathname === route.href 
                            ? "bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_12px_-2px_rgba(239,68,68,0.2)]" 
                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                >
                    <route.icon className={cn("w-4 h-4 transition-colors", route.color)} />
                    <span className="relative z-10">{route.label}</span>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                </Link>
            ))}
        </div>

        {/* Footer Status */}
        <div className="p-4 border-t border-red-500/10 bg-black/50 backdrop-blur-sm">
             <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                <span>SYSTEM STATUS</span>
                <span className="text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    ONLINE
                </span>
             </div>
             <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-red-500/50 rounded-full animate-progress" />
             </div>
             <div className="mt-2 text-[10px] text-center opacity-40 font-mono">
                v3.0.4-ADMIN_BUILD
             </div>
        </div>
    </div>
  )
}
