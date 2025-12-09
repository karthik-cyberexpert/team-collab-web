"use client"

import { motion } from "framer-motion"
import { Shield, Users, Coins, Zap, Activity, AlertTriangle, Eye, Server, RefreshCw } from "lucide-react"

// Mock real-time logs
const SYSTEM_LOGS = [
    { time: "10:42:05", type: "INFO", message: "User [Neo] initiated Hackathon Protocol", color: "text-blue-400" },
    { time: "10:41:58", type: "WARN", message: "High latency detected in Europe-West Node", color: "text-yellow-400" },
    { time: "10:41:42", type: "SUCCESS", message: "Batch Transaction: 500 Coins -> Team [CyberPunks]", color: "text-green-400" },
    { time: "10:41:15", type: "ALERT", message: "Failed Login Attempt (IP: 192.168.x.x) - Blocked", color: "text-red-400" },
    { time: "10:40:55", type: "INFO", message: "New Project 'AI Core' submitted by User [DevOne]", color: "text-blue-400" },
    { time: "10:40:30", type: "INFO", message: "Boss Fight [Omega] stage 2 initialized", color: "text-purple-400" },
]

const STAT_CARDS = [
    { label: "Total Users", value: "1,204", icon: Users, color: "text-blue-400", change: "+12 today" },
    { label: "Active Now", value: "342", icon: Eye, color: "text-green-400", change: "Peak 410" },
    { label: "Economy (Coins)", value: "1.2M", icon: Coins, color: "text-yellow-400", change: "Inflation 2%" },
    { label: "XP Generated", value: "850k", icon: Zap, color: "text-purple-400", change: "Record High" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
        {/* Title Section */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-mono tracking-tighter text-white flex items-center gap-3">
                    <Activity className="text-red-500 animate-pulse" />
                    COMMAND_CENTER
                </h1>
                <p className="text-muted-foreground font-mono text-sm mt-1">
                    System Overview // Real-time Monitoring
                </p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 rounded font-mono text-xs hover:bg-red-500/20 transition-colors">
                    <AlertTriangle className="w-3 h-3" /> MAINTENANCE MODE
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded font-mono text-xs hover:bg-white/10 transition-colors">
                    <RefreshCw className="w-3 h-3" /> REFRESH DATA
                </button>
            </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors relative group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded bg-white/5 ${stat.color} bg-opacity-10`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{stat.change}</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 font-mono tracking-tighter">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Live Map / Activities */}
            <div className="lg:col-span-2 space-y-8">
                {/* Simulated Region Map / Activity Heatmap */}
                <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden relative h-[400px]">
                     <div className="absolute top-4 left-4 z-10">
                        <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-500" /> GLOBAL_TRAFFIC_MAP
                        </h3>
                     </div>
                     {/* Decorative Grid Map Placeholder */}
                     <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [perspective:1000px] [transform:rotateX(60deg)_scale(1.5)] bg-blue-500/5"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full border border-blue-500/30 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-40 h-40 rounded-full border border-blue-500/50 animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_20px_theme(colors.blue.500)]" />
                     </div>
                     {/* Random "pings" */}
                     <span className="absolute top-1/3 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                     <span className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-700" />
                     <span className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-300" />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {["Purge Cache", "Broadcast Alert", "Force Save", "Export Logs"].map((action, i) => (
                         <button key={i} className="p-4 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono font-bold text-center transition-all hover:scale-[1.02] active:scale-95">
                             {action}
                         </button>
                     ))}
                </div>
            </div>

            {/* Right Col: Logs & System Health */}
            <div className="space-y-6">
                 {/* System Logs Terminal */}
                 <div className="rounded-xl border border-white/10 bg-black/80 font-mono text-xs h-[500px] flex flex-col">
                     <div className="p-3 border-b border-white/10 flex items-center justify-between">
                         <span className="font-bold text-muted-foreground">TERMINAL_OUTPUT</span>
                         <div className="flex gap-1.5">
                             <div className="w-2 h-2 rounded-full bg-red-500" />
                             <div className="w-2 h-2 rounded-full bg-yellow-500" />
                             <div className="w-2 h-2 rounded-full bg-green-500" />
                         </div>
                     </div>
                     <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
                         {SYSTEM_LOGS.map((log, i) => (
                             <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                                 <span className="text-muted-foreground opacity-50 shrink-0">{log.time}</span>
                                 <div className="flex-1 break-words">
                                     <span className={`font-bold ${log.color} mr-2`}>[{log.type}]</span>
                                     <span className="text-white/80">{log.message}</span>
                                 </div>
                             </div>
                         ))}
                         <div className="animate-pulse text-green-500">_</div>
                     </div>
                 </div>
            </div>
        </div>
    </div>
  )
}
