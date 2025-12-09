"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "lucide-react"

const achievements = [
  { id: 1, name: "First Blood", desc: "Win your first Arena battle", icon: "⚔️", unlocked: true, date: "2025-10-12" },
  { id: 2, name: "Code Ninja", desc: "Complete 10 coding challenges", icon: "🥷", unlocked: true, date: "2025-10-15" },
  { id: 3, name: "Bug Hunter", desc: "Report a verified bug", icon: "🐛", unlocked: true, date: "2025-10-20" },
  { id: 4, name: "Team Player", desc: "Join a team", icon: "🤝", unlocked: true, date: "2025-11-01" },
  { id: 5, name: "Social Butterfly", desc: "Make 5 friends", icon: "🦋", unlocked: false, progress: "3/5" },
  { id: 6, name: "Streak Master", desc: "Maintain a 30-day streak", icon: "🔥", unlocked: false, progress: "7/30" },
  { id: 7, name: "Grandmaster", desc: "Reach Level 50", icon: "👑", unlocked: false, progress: "Lvl 12" },
  { id: 8, name: "Hackathon Winner", desc: "Win a global hackathon", icon: "🏆", unlocked: false, progress: "0/1" },
]

export default function AchievementsPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Achievements</h2>
        <div className="text-lg font-medium text-muted-foreground">
            <span className="text-primary font-bold">4</span> / 8 Unlocked
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((ach) => (
            <Card key={ach.id} className={`overflow-hidden transition-all hover:scale-105 ${ach.unlocked ? "border-primary/50 bg-primary/5" : "opacity-70 grayscale"}`}>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className={`p-4 rounded-full text-4xl bg-background shadow-inner ${ach.unlocked ? "animate-pulse" : ""}`}>
                        {ach.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{ach.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{ach.desc}</p>
                    </div>
                    
                    {ach.unlocked ? (
                        <div className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                            Unlocked on {ach.date}
                        </div>
                    ) : (
                         <div className="w-full mt-2">
                            <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                                <span>Progress</span>
                                <span>{ach.progress}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-[30%]"></div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
