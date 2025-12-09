"use client"

import { motion } from "framer-motion"
import { Trophy, Crown, Calendar, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress" // Assuming exists or will verify

const LEVELS = Array.from({ length: 10 }, (_, i) => i + 1)

export default function SeasonsAdminPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-end">
             <div>
                <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                    <Crown className="text-amber-500" /> BATTLE_PASS_SEASON_1
                </h1>
                <p className="text-sm text-muted-foreground font-mono">Current Theme: <span className="text-cyan-400">Cyberverify</span></p>
            </div>
            <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase font-mono mb-1">Season Ends In</div>
                <div className="text-xl font-bold font-mono text-white">14d : 12h : 30m</div>
            </div>
        </div>

        {/* Battle Pass Track Visualizer */}
        <div className="overflow-x-auto pb-6">
            <div className="min-w-max flex gap-4 px-2">
                {LEVELS.map((lvl) => (
                    <motion.div 
                        key={lvl}
                        whileHover={{ y: -10 }}
                        className="w-48 flex-shrink-0 flex flex-col gap-4"
                    >
                        <div className="h-64 border border-white/10 rounded-xl bg-black/60 relative overflow-hidden group">
                             {/* Free Tier */}
                             <div className="h-1/2 border-b border-white/10 p-4 flex flex-col items-center justify-center bg-white/5">
                                 <div className="text-xs text-muted-foreground uppercase mb-2">Free</div>
                                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg">💰</div>
                                 <div className="text-xs font-bold mt-2 text-white">100 Coins</div>
                             </div>

                             {/* Premium Tier */}
                             <div className="h-1/2 p-4 flex flex-col items-center justify-center bg-gradient-to-b from-amber-900/10 to-transparent relative">
                                 <div className="absolute top-2 right-2"><Lock className="w-3 h-3 text-amber-500/50" /></div>
                                 <div className="text-xs text-amber-500 uppercase mb-2 font-bold">Premium</div>
                                 <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/50 flex items-center justify-center text-lg shadow-[0_0_15px_theme(colors.amber.900)]">🗡️</div>
                                 <div className="text-xs font-bold mt-2 text-amber-100">Cyber Blade</div>
                             </div>

                             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6 bg-black border border-white/20 rounded-full flex items-center justify-center text-[10px] font-mono z-10 -ml-3">
                                 {lvl}
                             </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full border-white/10 hover:bg-white/10">Edit Rewards</Button>
                    </motion.div>
                ))}
                
                <div className="w-48 flex-shrink-0 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5 text-muted-foreground cursor-pointer hover:bg-white/10 hover:text-white transition-colors">
                     <div className="text-center">
                         <div className="text-2xl font-bold">+</div>
                         <div className="text-sm font-mono">Extend Season</div>
                     </div>
                </div>
            </div>
        </div>
    </div>
  )
}
