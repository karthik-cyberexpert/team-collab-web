import { LucideIcon, Construction, AlertTriangle } from "lucide-react"

interface AdminPageScaffoldProps {
    title: string
    description: string
    icon: LucideIcon
    color?: string
}

export function AdminPageScaffold({ title, description, icon: Icon, color = "text-white" }: AdminPageScaffoldProps) {
    return (
        <div className="space-y-8 h-[80vh] flex flex-col">
            <div>
                <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                    <Icon className={color} /> {title}
                </h1>
                <p className="text-sm text-muted-foreground font-mono">{description}</p>
            </div>

            <div className="flex-1 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
                     <Construction className="w-12 h-12 text-muted-foreground opacity-50" />
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2">MODULE_UNDER_CONSTRUCTION</h2>
                <p className="text-muted-foreground max-w-md">
                    This system component is currently being compiled by the core mainframe. 
                    Please check back after the next patch cycle.
                </p>

                <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-500 font-mono">
                    <AlertTriangle className="w-3 h-3" />
                    <span>PRIORITY_QUEUE: LOW</span>
                </div>

                {/* Background Grid Animation */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
            </div>
        </div>
    )
}
