"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Calendar, Flag, Users, Plus, Star, Globe, 
  Trophy, Rocket, Edit, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const EVENTS = [
  { id: 1, name: "Global Game Jam 2025", theme: "Cyberpunk", teams: 156, prize: "$5,000", status: "Upcoming", days: 12 },
  { id: 2, name: "AI Hackathon", theme: "LLMs & Agents", teams: 89, prize: "$10,000", status: "Live", days: 2 },
]

export default function HackathonsAdminPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Calendar className="text-pink-400" /> EVENT_COMMAND
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Organize hackathons, manage registrations, and distribute prizes.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 font-bold">
            <Plus className="h-4 w-4 mr-2" /> Launch Event
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
          {EVENTS.map((event) => (
              <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative border border-white/10 bg-black/60 backdrop-blur-md rounded-xl overflow-hidden hover:border-pink-500/50 transition-colors"
              >
                  {/* Banner Image Mock */}
                  <div className="h-32 bg-gradient-to-r from-pink-900/20 to-purple-900/20 relative">
                        <div className="absolute bottom-4 left-6">
                             <div className="flex items-center gap-3">
                                 <Badge className={`
                                     ${event.status === 'Live' ? 'bg-green-500' : 'bg-blue-500'}
                                 `}>{event.status}</Badge>
                                 <h2 className="text-2xl font-black italic tracking-tighter text-white">{event.name}</h2>
                             </div>
                        </div>
                        <div className="absolute top-4 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button size="sm" variant="outline" className="bg-black/50 border-white/10"><Edit className="w-4 h-4" /></Button>
                             <Button size="sm" variant="destructive"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                  </div>

                  <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                       <div>
                           <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Theme</div>
                           <div className="flex items-center gap-2 text-pink-300 font-bold"><Rocket className="w-4 h-4" /> {event.theme}</div>
                       </div>
                       <div>
                           <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Participation</div>
                           <div className="flex items-center gap-2 text-white font-bold"><Users className="w-4 h-4 text-blue-400" /> {event.teams} Teams</div>
                       </div>
                       <div>
                           <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Prize Pool</div>
                           <div className="flex items-center gap-2 text-amber-400 font-bold"><Trophy className="w-4 h-4" /> {event.prize}</div>
                       </div>
                       <div>
                            <div className="text-xs font-mono text-muted-foreground uppercase mb-1">Timeline</div>
                            <div className="flex items-center gap-2 text-white font-bold">
                                T-Minus {event.days} days
                            </div>
                       </div>
                  </div>

                  <div className="bg-white/5 p-4 border-t border-white/10 flex justify-between items-center">
                       <div className="flex -space-x-2">
                           {[1,2,3,4].map((i) => (
                               <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-[10px] text-white">
                                   U{i}
                               </div>
                           ))}
                           <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-[10px] text-white">
                               +99
                           </div>
                       </div>
                       <Button variant="ghost" className="text-xs hover:bg-white/10">Manage Registrations &rarr;</Button>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  )
}
