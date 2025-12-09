"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle, ListTodo, Calendar, RefreshCcw, 
  Trash2, Plus, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const MISSIONS = [
  { id: 1, task: "Solve 3 Easy Algorithms", xp: 150, coins: 50, active: true },
  { id: 2, task: "Win 1 Duel", xp: 300, coins: 100, active: true },
  { id: 3, task: "Post in Community Feed", xp: 50, coins: 10, active: false },
]

export default function MissionsAdminPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <ListTodo className="text-green-400" /> MISSION_CONTROL
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Configure daily/weekly rotation and streak rewards.</p>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Daily Pool
                </h3>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <RefreshCcw className="w-3 h-3 mr-2" /> Force Rotate
                </Button>
            </div>
            
            <div className="divide-y divide-white/10">
                {MISSIONS.map((mission) => (
                    <div key={mission.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <Switch checked={mission.active} />
                            <Input defaultValue={mission.task} className="w-[300px] bg-transparent border-none focus-visible:ring-0 focus-visible:bg-white/5" />
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-sm font-mono">
                                <span className="text-purple-400">{mission.xp} XP</span>
                                <span className="text-yellow-400">{mission.coins} G</span>
                            </div>
                            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    </div>
                ))}
                
                <div className="p-4 bg-green-500/5 flex justify-center">
                    <Button variant="ghost" className="text-green-500 hover:text-green-400 hover:bg-green-500/20">
                        <Plus className="w-4 h-4 mr-2" /> Add Task to Pool
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
