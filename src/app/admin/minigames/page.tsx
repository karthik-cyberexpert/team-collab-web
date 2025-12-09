"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Gamepad2, Trophy, Settings, Power, RotateCcw, 
  TrendingUp, Coins, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Mock Games
const GAMES = [
  { id: 1, name: "Neon Snake", status: "Active", plays: "12.5k", topScore: 450, xpReward: 50 },
  { id: 2, name: "Cyber Tic-Tac-Toe", status: "Active", plays: "8.2k", topScore: "-", xpReward: 25 },
  { id: 3, name: "Memory Matrix", status: "Disabled", plays: "1.1k", topScore: 1200, xpReward: 100 },
]

export default function MiniGamesAdminPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Gamepad2 className="text-emerald-400" /> ARCADE_MAINFRAME
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Configure casual game rewards, difficulty, and availability.</p>
        </div>
        <Card className="bg-emerald-900/10 border-emerald-500/20">
            <CardContent className="p-2 px-4 flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-emerald-400 font-bold">Total Sessions</span>
                    <span className="text-xl font-mono text-white">24,931</span>
                </div>
                <div className="h-8 w-px bg-emerald-500/20" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-yellow-400 font-bold">Coins Dist.</span>
                    <span className="text-xl font-mono text-white">1.2M</span>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {GAMES.map((game) => (
              <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`
                      relative p-5 rounded-xl border bg-black/60 backdrop-blur-md overflow-hidden group
                      ${game.status === 'Active' ? 'border-emerald-500/30' : 'border-white/10 opacity-75'}
                  `}
              >
                  {/* Background Accents */}
                  <div className={`absolute top-0 right-0 p-24 bg-gradient-to-br from-${game.status === 'Active' ? 'emerald' : 'gray'}-500/10 to-transparent rounded-bl-full pointer-events-none`} />

                  <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                          <div className={`
                             w-10 h-10 rounded-lg flex items-center justify-center border
                             ${game.status === 'Active' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-muted-foreground'}
                          `}>
                              <Gamepad2 className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="font-bold text-lg text-white leading-none">{game.name}</h3>
                              <Badge variant="outline" className={`mt-1 text-[10px] border-none px-0 ${game.status === 'Active' ? 'text-green-400' : 'text-gray-500'}`}>
                                  {game.status.toUpperCase()}
                              </Badge>
                          </div>
                      </div>
                      <Switch checked={game.status === 'Active'} />
                  </div>

                  <div className="space-y-4 relative z-10">
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-white/5 p-2 rounded">
                              <span className="text-muted-foreground block mb-1">Total Plays</span>
                              <span className="text-white font-bold">{game.plays}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded">
                              <span className="text-muted-foreground block mb-1">High Score</span>
                              <span className="text-amber-400 font-bold">{game.topScore}</span>
                          </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-white/10">
                           <div className="space-y-1">
                               <div className="flex justify-between text-xs font-bold text-white uppercase">
                                   <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-purple-400" /> XP Reward</span>
                                   <span>{game.xpReward} XP</span>
                               </div>
                               <Slider defaultValue={[game.xpReward]} max={200} step={5} className="py-1" />
                           </div>
                           
                           <div className="space-y-1">
                               <div className="flex justify-between text-xs font-bold text-white uppercase">
                                   <span className="flex items-center gap-1"><Coins className="w-3 h-3 text-yellow-400" /> Coin Reward</span>
                                   <span>{game.xpReward / 2} 🪙</span>
                               </div>
                               <Slider defaultValue={[game.xpReward / 2]} max={100} step={5} className="py-1" />
                           </div>
                      </div>

                      <div className="pt-2 flex gap-2">
                           <Button size="sm" variant="outline" className="flex-1 border-white/10 hover:bg-white/10 h-8 text-xs">
                               <Settings className="w-3 h-3 mr-2" /> Config
                           </Button>
                           <Button size="sm" variant="destructive" className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 h-8 text-xs">
                               <RotateCcw className="w-3 h-3 mr-2" /> Reset Leaderboard
                           </Button>
                      </div>
                  </div>
              </motion.div>
          ))}
          
          {/* Add New Game Logic */}
          <div className="border border-dashed border-white/20 rounded-xl bg-white/5 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-8 h-8 opacity-50" />
              </div>
              <span className="font-mono text-sm group-hover:text-white">DEPLOY_NEW_GAME_MODULE</span>
          </div>
      </div>
    </div>
  )
}
