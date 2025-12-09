"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"
import { toast } from "sonner"
import { Trophy, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

const sampleText = "function binarySearch(arr, target) { let left = 0; let right = arr.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (arr[mid] === target) return mid; if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }"

export default function TypingArenaPage() {
  const { addXp, addCoins } = useStore()
  const router = useRouter()
  
  const [input, setInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isFinished, setIsFinished] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isFinished) return
      
      const val = e.target.value
      if (!startTime) setStartTime(Date.now())
      setInput(val)
      
      // Basic WPM Calc
      const words = val.length / 5
      const minutes = (Date.now() - (startTime || Date.now())) / 60000
      if (minutes > 0) setWpm(Math.round(words / minutes))
      
      // Basic Accuracy Calc
      let correctChars = 0
      for (let i = 0; i < val.length; i++) {
          if (val[i] === sampleText[i]) correctChars++
      }
      setAccuracy(Math.round((correctChars / val.length) * 100) || 100)

      // Completion Check
      if (val === sampleText) {
          handleFinish()
      }
  }

  const handleFinish = () => {
      setIsFinished(true)
      const earnedXp = Math.max(10, Math.floor(wpm * 2))
      const earnedCoins = Math.max(5, Math.floor(wpm / 2))
      
      addXp(earnedXp)
      addCoins(earnedCoins)
      
      toast.success("Challenge Complete!", {
          description: `You earned ${earnedXp} XP and ${earnedCoins} Coins.`
      })
  }

  if (isFinished) {
      return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
              <Card className="w-full max-w-md p-6 border-primary/50 bg-primary/5 text-center">
                  <div className="flex justify-center mb-4">
                      <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-background p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">WPM</div>
                          <div className="text-2xl font-bold">{wpm}</div>
                      </div>
                      <div className="bg-background p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                          <div className="text-2xl font-bold text-green-500">{accuracy}%</div>
                      </div>
                  </div>
                  <div className="space-y-4">
                       <Button className="w-full gap-2" size="lg" onClick={() => {setInput(""); setIsFinished(false); setWpm(0); setStartTime(null);}}>
                          <RefreshCw className="w-4 h-4" /> Play Again
                       </Button>
                       <Button variant="outline" className="w-full" onClick={() => router.push("/arena")}>
                           Back to Arena
                       </Button>
                  </div>
              </Card>
          </div>
      )
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 h-[calc(100vh-4rem)] flex flex-col">
       <div className="flex items-center justify-between">
            <div>
                 <h2 className="text-3xl font-bold tracking-tight">Speed Typing</h2>
                 <p className="text-muted-foreground">Type the code below exactly as shown.</p>
            </div>
            <div className="flex gap-4 text-center">
                 <div className="bg-card p-2 rounded-lg border min-w-[80px]">
                     <div className="text-2xl font-bold">{wpm}</div>
                     <div className="text-xs text-muted-foreground">WPM</div>
                 </div>
                  <div className="bg-card p-2 rounded-lg border min-w-[80px]">
                     <div className={`text-2xl font-bold ${accuracy < 90 ? 'text-red-500' : 'text-green-500'}`}>{accuracy}%</div>
                     <div className="text-xs text-muted-foreground">ACC</div>
                 </div>
            </div>
       </div>

       <Card className="flex-1 flex flex-col overflow-hidden border-2 border-muted relative group hover:border-primary/30 transition-colors">
           <CardContent className="flex-1 p-0 flex flex-col relative">
               {/* Overlay Code Text */}
               <div className="absolute inset-0 p-6 font-mono text-lg leading-relaxed text-muted-foreground/50 select-none pointer-events-none whitespace-pre-wrap break-all">
                   {sampleText}
               </div>
               
                {/* User Input Overlay - Colors handled by logic typically, keeping simple for now */}
               <div className="absolute inset-0 p-6 font-mono text-lg leading-relaxed text-primary/80 select-none pointer-events-none whitespace-pre-wrap break-all">
                   {/* Simplified visualization logic would go here to color matched characters */}
                   {input}
               </div>

                <textarea 
                    className="flex-1 w-full h-full bg-transparent p-6 font-mono text-lg leading-relaxed opacity-0 resize-none focus:outline-none z-10 cursor-text"
                    autoFocus
                    value={input}
                    onChange={handleChange}
                    spellCheck={false}
                />
           </CardContent>
           <div className="p-4 bg-muted/50 border-t flex justify-between items-center">
               <div className="w-full max-w-md">
                   {/* Progress bar */}
                    <Progress value={(input.length / sampleText.length) * 100} className="h-2" />
               </div>
               <Button onClick={() => {setInput(""); setWpm(0); setStartTime(null);}}>Restart</Button>
           </div>
       </Card>
    </div>
  )
}
