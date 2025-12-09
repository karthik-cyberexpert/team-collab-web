"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Crown, Medal, ChevronRight, Flame } from "lucide-react"
import Link from "next/link"

const TOP_USERS = [
    { rank: 1, name: "NeonSlayer", xp: 154000, level: 42, avatar: "bg-red-500" },
    { rank: 2, name: "CodeNinja", xp: 142500, level: 40, avatar: "bg-blue-500" },
    { rank: 3, name: "ByteViper", xp: 138900, level: 39, avatar: "bg-green-500" },
    { rank: 4, name: "AlgoGod", xp: 125000, level: 36, avatar: "bg-purple-500" },
    { rank: 5, name: "ZeroDay", xp: 110000, level: 32, avatar: "bg-yellow-500" },
]

export function LeaderboardPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 pointer-events-none" />
        
        <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                
                {/* Visual / Season Status */}
                <div className="flex-1 w-full">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
                            Rise to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Glory</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                            Compete against the best developers in the world. Climb the ranks, earn legendary badges, and prove your dominance.
                        </p>

                        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-500/20 mb-8 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <div className="flex items-center gap-2 text-orange-400">
                                    <Flame className="w-5 h-5 animate-pulse" />
                                    <span className="font-bold tracking-widest uppercase text-sm">Season 3 Ends In</span>
                                </div>
                                <span className="font-mono text-xl font-bold text-white">14d 08h 22m</span>
                            </div>
                            <Progress value={78} className="h-3 bg-orange-950/50 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-red-600" />
                            <div className="flex justify-between mt-2 text-xs text-orange-400/60 font-mono">
                                <span>Day 1</span>
                                <span>Day 60</span>
                            </div>

                            {/* Decorative Fire */}
                            <div className="absolute -bottom-10 -right-10 opacity-20 text-orange-600">
                                <Flame className="w-48 h-48" />
                            </div>
                        </div>

                        <Link href="/leaderboard">
                            <Button size="lg" className="w-full sm:w-auto gap-2 text-lg h-12 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                                View Full Leaderboard <ChevronRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Top 5 Table */}
                <div className="flex-1 w-full">
                    <div className="bg-card/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                Top Agents
                            </h3>
                            <span className="text-xs font-mono text-muted-foreground">GLOBAL RANKING</span>
                        </div>
                        <div className="divide-y divide-white/5">
                            {TOP_USERS.map((user, i) => (
                                <motion.div 
                                    key={user.rank}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group cursor-pointer"
                                >
                                    <div className={`w-8 h-8 flex items-center justify-center font-bold text-lg ${i === 0 ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                                        {i === 0 ? <Crown className="w-6 h-6 animate-bounce" /> : user.rank}
                                    </div>
                                    
                                    <div className={`w-10 h-10 rounded-full ${user.avatar} relative`}>
                                        {i === 0 && <div className="absolute -inset-1 rounded-full border-2 border-yellow-400 animate-spin-slow border-dashed" />}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="font-bold text-white group-hover:text-primary transition-colors">{user.name}</div>
                                        <div className="text-xs text-muted-foreground">Level {user.level} Guild Master</div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <div className="font-mono text-primary font-bold">{user.xp.toLocaleString('en-US')} XP</div>
                                        <div className="text-[10px] text-muted-foreground">98% Win Rate</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-4 bg-white/5 text-center text-xs text-muted-foreground hover:bg-white/10 transition-colors cursor-pointer">
                            Load more players...
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
