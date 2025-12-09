import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, LayoutDashboard } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30">
      <AdminSidebar />
      <main className="pl-72 min-h-screen bg-[url('/grid-pattern.svg')] bg-fixed bg-center">
        {/* Top Bar / HUD */}
        <div className="h-16 border-b border-red-500/10 bg-black/40 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                <span>// ROOT_ACCESS_GRANTED</span>
                <span className="text-red-500/50">::</span>
                <span>SECURE_CONNECTION_ESTABLISHED</span>
            </div>
            
            <div className="flex items-center gap-6">
                 {/* Simplified HUD Elements for visual flair */}
                <div className="hidden md:flex items-center gap-2 text-xs font-bold font-mono">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="text-green-400">12%</span>
                    <span className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[12%] h-full bg-green-400" />
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-bold font-mono">
                    <span className="text-muted-foreground">MEM</span>
                    <span className="text-yellow-400">48%</span>
                    <span className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[48%] h-full bg-yellow-400" />
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold ring-2 ring-red-500/50 ring-offset-2 ring-offset-black cursor-pointer hover:scale-105 transition-transform">
                            AD
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-black border-red-500/20 text-white backdrop-blur-xl">
                        <DropdownMenuLabel className="font-mono text-red-500">ADMIN_ACCESS</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer font-mono text-xs">
                            <User className="mr-2 h-4 w-4" /> PROFILE_CONFIG
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer font-mono text-xs">
                            <Settings className="mr-2 h-4 w-4" /> SYSTEM_PREFS
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer font-mono text-xs">
                            <LayoutDashboard className="mr-2 h-4 w-4" /> USER_VIEW_OVERRIDE
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="text-red-500 focus:bg-red-950/50 focus:text-red-400 cursor-pointer font-mono text-xs font-bold">
                            <LogOut className="mr-2 h-4 w-4" /> TERMINATE_SESSION
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-8 relative">
             <div className="absolute top-0 left-0 w-full h-96 bg-red-500/5 blur-[100px] pointer-events-none" />
             <div className="relative z-10">
                {children}
             </div>
        </div>
      </main>
    </div>
  )
}
