"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Award, Plus, Lock, Unlock, Star, 
  Image as ImageIcon, Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const ACHIEVEMENTS = [
  { id: 1, name: "Hello World", desc: "Write your first line of code", xp: 100, icon: "🌍", type: "Onboarding" },
  { id: 2, name: "Bug Squashers", desc: "Resolve 50 issues", xp: 500, icon: "🐛", type: "Grind" },
  { id: 3, name: "Night Owl", desc: "Commit code after 2 AM", xp: 250, icon: "🦉", type: "Hidden" },
]

export default function AchievementsAdminPage() {
  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                    <Award className="text-yellow-400" /> TROPHY_CASE_EDITOR
                </h1>
                <p className="text-sm text-muted-foreground font-mono">Design badges and set unlock conditions.</p>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                <Plus className="h-4 w-4 mr-2" /> Create Badge
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {ACHIEVEMENTS.map((ach) => (
                 <motion.div
                     key={ach.id}
                     whileHover={{ y: -5 }}
                     className="bg-black/60 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden group"
                 >
                     <div className="absolute top-2 right-2">
                         <Badge variant="outline" className="border-white/10 text-[10px] text-muted-foreground">{ach.type}</Badge>
                     </div>
                     <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-4 border-2 border-white/10 group-hover:border-yellow-500/50 group-hover:shadow-[0_0_15px_theme(colors.yellow.500)] transition-all">
                         {ach.icon}
                     </div>
                     <h3 className="font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">{ach.name}</h3>
                     <p className="text-sm text-muted-foreground mb-4 h-10">{ach.desc}</p>
                     
                     <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                         <Star className="w-3 h-3 fill-yellow-500" />
                         +{ach.xp} XP
                     </div>

                     <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </motion.div>
             ))}
             
             {/* New Badge Card */}
             <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center text-muted-foreground hover:bg-white/10 hover:text-white hover:border-white/40 transition-all cursor-pointer">
                 <Plus className="w-12 h-12 mb-2 opacity-50" />
                 <span className="font-mono text-sm">ADD_NEW_TROPHY</span>
             </div>
        </div>
    </div>
  )
}
