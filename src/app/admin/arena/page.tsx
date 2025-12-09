"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Swords, Play, Pause, Trash2, StopCircle, Plus, 
  Users, Timer, Target, AlertTriangle, ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock Events
const EVENTS = [
  { id: 1, name: "Speed Run: Algo", status: "Live", participants: 42, difficulty: "Hard", timeLeft: "14:30" },
  { id: 2, name: "Debug Challenge", status: "Scheduled", participants: 120, difficulty: "Medium", timeLeft: "starts in 2h" },
  { id: 3, name: "Python Basics", status: "Ended", participants: 85, difficulty: "Easy", timeLeft: "-" },
]

export default function ArenaAdminPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Swords className="text-red-500" /> PVP_ARENA_CONTROL
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Manage competitive events, ban cheaters, and monitor fairness.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 font-bold">
                    <Plus className="h-4 w-4 mr-2" /> Host New Event
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-red-500/20 backdrop-blur-xl sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-red-500">INITIALIZE_COMBAT_EVENT</DialogTitle>
                    <DialogDescription className="text-muted-foreground">Configure parameters for a new sitewide or ranked coding event.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-muted-foreground">Event Name</label>
                        <Input placeholder="e.g. Weekly Deathmatch" className="bg-black/50 border-white/10" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-xs font-mono uppercase text-muted-foreground">Difficulty</label>
                            <select className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-white">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                                <option>Insane</option>
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-mono uppercase text-muted-foreground">Duration (Min)</label>
                            <Input type="number" placeholder="60" className="bg-black/50 border-white/10" />
                         </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded bg-white/5">
                        <span className="text-sm font-bold">Enable Power-ups</span>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded bg-white/5">
                        <span className="text-sm font-bold">Ranked Mode (Elo Impact)</span>
                        <Switch />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                    <Button className="bg-green-600 hover:bg-green-700 font-bold">
                        <Play className="w-4 h-4 mr-2" /> Start Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Events Panel */}
          <div className="lg:col-span-2 space-y-4">
              <h2 className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
                  <Play className="w-4 h-4 text-green-500" /> Active Streams
              </h2>
              {EVENTS.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`
                        p-6 rounded-xl border bg-black/60 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6
                        ${event.status === 'Live' ? 'border-green-500/50 shadow-[0_0_15px_-5px_theme(colors.green.500)]' : 'border-white/10 opacity-70'}
                    `}
                  >
                      <div className="flex items-center gap-4">
                          <div className={`
                             w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                             ${event.status === 'Live' ? 'bg-green-500 text-black animate-pulse' : 'bg-white/10 text-muted-foreground'}
                          `}>
                              VS
                          </div>
                          <div>
                              <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-lg text-white">{event.name}</h3>
                                  {event.status === 'Live' && <Badge className="bg-red-600 hover:bg-red-700 animate-pulse">LIVE</Badge>}
                              </div>
                              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.participants} Online</span>
                                  <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {event.timeLeft}</span>
                                  <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {event.difficulty}</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="flex gap-2">
                           <Button size="icon" variant="outline" className="h-10 w-10 border-white/10 hover:bg-white/10" title="Pause">
                               <Pause className="w-4 h-4" />
                           </Button>
                           <Button size="icon" variant="destructive" className="h-10 w-10 bg-red-500/20 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/50" title="Force Stop">
                               <StopCircle className="w-4 h-4" />
                           </Button>
                      </div>
                  </motion.div>
              ))}
          </div>

          {/* Side Stats */}
          <div className="space-y-6">
               <Card className="bg-black/60 border-white/10">
                   <CardHeader>
                       <CardTitle className="text-sm font-mono uppercase">Anti-Cheat Logs</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-sm p-2 bg-red-500/10 border border-red-500/20 rounded">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                            <div>
                                <div className="font-bold text-red-400">Suspicious Activity</div>
                                <div className="text-xs text-muted-foreground">User [xX_Hacker_Xx] pasted 200 lines in 0.5s</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm p-2 bg-white/5 border border-white/10 rounded">
                            <ShieldCheck className="w-8 h-8 text-green-500" />
                            <div>
                                <div className="font-bold text-green-400">System Secure</div>
                                <div className="text-xs text-muted-foreground">Last integrity check: 2m ago</div>
                            </div>
                        </div>
                   </CardContent>
               </Card>
          </div>
      </div>
    </div>
  )
}
