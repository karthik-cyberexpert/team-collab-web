"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Crosshair, Swords, MessageSquare, AlertTriangle, 
  CheckCircle, XCircle, Code2, Scale
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Mock Disputes
const DISPUTES = [
  { id: 1, players: ["Neo", "Morpheus"], reason: "Runtime Error", status: "Pending", time: "2m ago" },
  { id: 2, players: ["Trinity", "Cypher"], reason: "Cheating Accusation", status: "Investigating", time: "15m ago" },
]

export default function DuoAdminPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Crosshair className="text-cyan-400" /> DUO_BATTLE_JUDGE
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Resolve 1v1 conflicts and review match replay logs.</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 font-bold">
           <Scale className="w-4 h-4 mr-2" /> View Tribunal Queue
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Disputes */}
          <div className="space-y-4">
              <h3 className="font-mono text-sm uppercase text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" /> Active Disputes
              </h3>
              {DISPUTES.map((dispute) => (
                  <motion.div
                      key={dispute.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md"
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                              <Badge variant="outline" className="border-red-500/50 text-red-400">
                                  {dispute.status.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-mono">{dispute.time}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full hover:bg-white/10">
                              <MessageSquare className="w-3 h-3" />
                          </Button>
                      </div>

                      <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 mb-4">
                          <div className="font-bold text-cyan-400">{dispute.players[0]}</div>
                          <div className="text-xs font-mono text-muted-foreground">VS</div>
                          <div className="font-bold text-red-400">{dispute.players[1]}</div>
                      </div>

                      <div className="space-y-2 mb-4">
                          <p className="text-sm text-gray-300">
                              <span className="text-muted-foreground font-mono text-xs uppercase mr-2">Reason:</span>
                              {dispute.reason}
                          </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                           <Button className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/50">
                               <CheckCircle className="w-4 h-4 mr-2" /> Award {dispute.players[0]}
                           </Button>
                           <Button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/50">
                               <CheckCircle className="w-4 h-4 mr-2" /> Award {dispute.players[1]}
                           </Button>
                      </div>
                      <Button variant="ghost" className="w-full mt-2 text-xs text-muted-foreground hover:text-white">
                          Void Match (No Winner)
                      </Button>
                  </motion.div>
              ))}
          </div>

          {/* Code Diff Viewer Mock */}
          <Card className="bg-black/60 border-white/10 h-full">
               <CardHeader className="py-3 border-b border-white/10">
                   <CardTitle className="text-sm font-mono flex items-center gap-2">
                       <Code2 className="w-4 h-4 text-purple-400" /> SNAPSHOT_VIEWER
                   </CardTitle>
               </CardHeader>
               <CardContent className="p-0 font-mono text-xs">
                   <div className="grid grid-cols-2">
                        <div className="p-4 border-r border-white/10">
                            <h4 className="text-cyan-400 mb-2 opacity-70">// Neo's Submission</h4>
                            <div className="space-y-1 text-gray-400 opacity-50">
                                <p>1  def solve(arr):</p>
                                <p>2      n = len(arr)</p>
                                <p>3      return sorted(arr)</p>
                            </div>
                        </div>
                        <div className="p-4 bg-red-500/5">
                             <h4 className="text-red-400 mb-2 opacity-70">// Morpheus's Submission</h4>
                             <div className="space-y-1 text-gray-300">
                                <p>1  def solve(arr):</p>
                                <p className="bg-red-500/20 -mx-1 px-1">2      # O(n) solution attempted</p>
                                <p>3      return [x for x in arr]</p>
                             </div>
                        </div>
                   </div>
               </CardContent>
          </Card>
      </div>
    </div>
  )
}
