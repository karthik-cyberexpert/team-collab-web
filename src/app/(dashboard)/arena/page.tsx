"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Keyboard, Code2, Gamepad2, Swords } from "lucide-react"

const gameModes = [
  {
    title: "Speed Typing",
    description: "Race against the clock to type AI-generated code snippets.",
    icon: Keyboard,
    href: "/arena/typing",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Coding Battle",
    description: "Solve algorithmic challenges faster than your opponent.",
    icon: Code2,
    href: "/arena/coding",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Mini-Games Hub",
    description: "Relax with casual multiplayer games like Tic-Tac-Toe.",
    icon: Gamepad2,
    href: "/arena/minigames",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Boss Raid",
    description: "Co-op event. Defeat the AI Boss before time runs out!",
    icon: Swords,
    href: "/arena/boss",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
]

export default function ArenaPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Arena</h2>
        <p className="text-muted-foreground">Select a game mode to start earning XP and Coins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {gameModes.map((mode) => (
            <Link href={mode.href} key={mode.title} className="group">
                <Card className={`h-full transition-all duration-300 border-2 border-transparent hover:border-${mode.color ? mode.color.split('-')[1] : 'primary'}-500/50 hover:shadow-[0_0_30px_-5px_var(--color-${mode.color ? mode.color.split('-')[1] : 'primary'})] relative overflow-hidden bg-card/60 backdrop-blur-sm`}>
                     {/* Dynamic Gradient Background on Hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-${mode.color ? mode.color.split('-')[1] : 'primary'}-500/10 to-transparent pointer-events-none`} />
                    
                    <CardHeader>
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${mode.bg} ${mode.color} shadow-lg ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                            <mode.icon className="w-7 h-7" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{mode.title}</CardTitle>
                        <CardDescription>{mode.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-secondary/10 hover:bg-secondary text-secondary hover:text-secondary-foreground border border-secondary/20 transition-all font-semibold" variant="outline">
                            Enter Arena
                        </Button>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
      
      {/* Active Events Section */}
      <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Live Events</h3>
          <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-purple-500/30">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <span className="animate-pulse w-2 h-2 rounded-full bg-red-500 display-inline-block"></span>
                          Global Hackathon: AI Revolution
                      </h4>
                      <p className="text-white/70 text-sm">Team up and build the best AI agent. Prize pool: 10,000 Coins.</p>
                  </div>
                  <Button variant="default" className="bg-white text-purple-900 hover:bg-white/90">Join Event</Button>
              </CardContent>
          </Card>
      </div>
    </div>
  )
}
