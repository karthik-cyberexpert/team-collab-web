"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock Data
const leaderboardData = [
  { rank: 1, name: "CyberNinja", xp: 15400, avatar: "/avatars/01.png", tier: "Diamond" },
  { rank: 2, name: "CodeMaster99", xp: 14200, avatar: "/avatars/02.png", tier: "Platinum" },
  { rank: 3, name: "HackThePlanet", xp: 13800, avatar: "/avatars/03.png", tier: "Platinum" },
  { rank: 4, name: "PixelArtist", xp: 12500, avatar: "/avatars/04.png", tier: "Gold" },
  { rank: 5, name: "BugSquasher", xp: 11200, avatar: "/avatars/05.png", tier: "Gold" },
  { rank: 6, name: "ReactGod", xp: 10800, avatar: "/avatars/06.png", tier: "Gold" },
  { rank: 7, name: "AlgoQueen", xp: 9500, avatar: "/avatars/07.png", tier: "Silver" },
  { rank: 8, name: "CSS_Wizard", xp: 9200, avatar: "/avatars/08.png", tier: "Silver" },
  { rank: 9, name: "Pythonista", xp: 8800, avatar: "/avatars/01.png", tier: "Silver" },
  { rank: 10, name: "NoobSlayer", xp: 8500, avatar: "/avatars/02.png", tier: "Bronze" },
]

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("Global")

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
            {["Global", "Friends", "Team"].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        filter === f ? "bg-background shadow text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12 mt-8">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 flex flex-col items-center">
            <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-slate-300">
                    <AvatarImage src={leaderboardData[1].avatar} />
                    <AvatarFallback>2</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 font-bold px-3 py-0.5 rounded-full text-sm">
                    #2
                </div>
            </div>
            <div className="mt-4 text-center">
                <div className="font-bold text-lg">{leaderboardData[1].name}</div>
                <div className="text-muted-foreground">{leaderboardData[1].xp} XP</div>
            </div>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 flex flex-col items-center z-10 scale-110">
            <div className="relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">👑</div>
                <Avatar className="h-32 w-32 border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                    <AvatarImage src={leaderboardData[0].avatar} />
                    <AvatarFallback>1</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-4 py-0.5 rounded-full">
                    #1
                </div>
            </div>
             <div className="mt-4 text-center">
                <div className="font-bold text-xl text-primary">{leaderboardData[0].name}</div>
                <div className="text-muted-foreground font-semibold">{leaderboardData[0].xp} XP</div>
                <div className="text-xs text-yellow-500 mt-1">{leaderboardData[0].tier}</div>
            </div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 md:order-3 flex flex-col items-center">
             <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-orange-400">
                    <AvatarImage src={leaderboardData[2].avatar} />
                    <AvatarFallback>3</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-400 text-orange-900 font-bold px-3 py-0.5 rounded-full text-sm">
                    #3
                </div>
            </div>
            <div className="mt-4 text-center">
                <div className="font-bold text-lg">{leaderboardData[2].name}</div>
                <div className="text-muted-foreground">{leaderboardData[2].xp} XP</div>
            </div>
        </div>
      </div>

      {/* Rest of the List */}
      <Card>
        <CardHeader>
             <CardTitle className="text-lg">Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
             <div className="divide-y divide-border">
                {leaderboardData.slice(3).map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-8 text-center font-bold text-muted-foreground">#{user.rank}</div>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.rank}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.tier}</div>
                            </div>
                        </div>
                        <div className="font-bold">{user.xp} XP</div>
                    </div>
                ))}
             </div>
        </CardContent>
      </Card>
    </div>
  )
}
