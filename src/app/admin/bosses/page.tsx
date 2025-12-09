"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Ghost, Skull, Plus, Activity, HeartPulse, Flame, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

const ACTIVE_BOSS = {
    name: "OMEGA PRIME",
    hp: 45,
    maxHp: 100,
    status: "Enraged",
    timeRemaining: "42:15",
    participants: 156,
    dps: 24500
}

export default function BossAdminPage() {
    const [mockHp, setMockHp] = useState(45)

    return (
        <div className="space-y-6">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                        <Ghost className="text-purple-500" /> RAID_CONTROLLER
                    </h1>
                    <p className="text-sm text-muted-foreground font-mono">Spawn bosses, monitor global damage, and adjust difficulty dynamically.</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 font-bold">
                    <Plus className="h-4 w-4 mr-2" /> Summon Boss
                </Button>
            </div>

            {/* Boss Monitor */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Visualizer */}
                <div className="lg:col-span-2 relative p-1 rounded-2xl bg-gradient-to-br from-purple-500/20 to-red-500/20 border border-purple-500/30">
                    <div className="bg-black/80 backdrop-blur-xl rounded-xl p-8 h-full flex flex-col items-center justify-center relative overflow-hidden">
                        
                        {/* Boss Avatar / HP Bar */}
                        <motion.div 
                            animate={{ scale: [1, 1.05, 1] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-48 h-48 rounded-full bg-purple-900/30 flex items-center justify-center border-4 border-purple-500 shadow-[0_0_50px_theme(colors.purple.600)] mb-8 relative z-10"
                        >
                            <Skull className="w-24 h-24 text-white" />
                        </motion.div>

                        <div className="w-full max-w-lg space-y-2 relative z-10">
                            <div className="flex justify-between items-end">
                                <h2 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">{ACTIVE_BOSS.name}</h2>
                                <span className="font-mono text-xl font-bold text-red-400">{mockHp}% HP</span>
                            </div>
                            <div className="h-6 w-full bg-white/10 rounded-full overflow-hidden border border-white/20">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-red-600 to-purple-600" 
                                    initial={{ width: "100%" }}
                                    animate={{ width: `${mockHp}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                        </div>

                        {/* Background FX */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-10 left-10 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            <div className="absolute bottom-10 right-20 w-3 h-3 bg-purple-500 rounded-full animate-ping delay-500" />
                        </div>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md space-y-6">
                        <h3 className="font-mono text-sm uppercase text-muted-foreground flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Live Metrics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded bg-white/5 border border-white/10 text-center">
                                <div className="text-xs text-muted-foreground uppercase">Playes</div>
                                <div className="text-2xl font-bold text-blue-400">{ACTIVE_BOSS.participants}</div>
                            </div>
                            <div className="p-3 rounded bg-white/5 border border-white/10 text-center">
                                <div className="text-xs text-muted-foreground uppercase">Global DPS</div>
                                <div className="text-2xl font-bold text-orange-400">{ACTIVE_BOSS.dps.toLocaleString()}</div>
                            </div>
                        </div>
                        
                        <div className="space-y-4 pt-4 border-t border-white/10">
                             <div className="space-y-2">
                                <label className="text-xs font-mono uppercase text-muted-foreground">Manual HP Override</label>
                                <Slider 
                                    value={[mockHp]} 
                                    onValueChange={(val) => setMockHp(val[0])} 
                                    max={100} step={1} 
                                    className="cursor-pointer"
                                />
                             </div>
                             
                             <div className="grid grid-cols-2 gap-2">
                                 <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/20" title="Enrage Boss">
                                     <Flame className="w-4 h-4 mr-2" /> Enrage
                                 </Button>
                                 <Button variant="outline" className="border-green-500/50 text-green-500 hover:bg-green-500/20" title="Heal Boss">
                                     <HeartPulse className="w-4 h-4 mr-2" /> Heal
                                 </Button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
