"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "lucide-react"

// Mock Problem Data
const problem = {
  title: "Two Sum",
  difficulty: "Easy",
  description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ]
}

export default function CodingArenaPage() {
  const [code, setCode] = useState("// Write your solution here\nfunction twoSum(nums, target) {\n  \n}")
  const [output, setOutput] = useState<string | null>(null)

  const runCode = () => {
      setOutput("Running...")
      setTimeout(() => {
          setOutput("Test Case 1: Passed ✅\nTest Case 2: Passed ✅\n\nResult: Accepted 🏆")
      }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
             <CodeIcon className="w-6 h-6" /> {problem.title} 
             <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">{problem.difficulty}</span>
         </h2>
         <div className="flex gap-2">
             <Button variant="outline" onClick={() => setCode("// Reset code")}>Reset</Button>
             <Button onClick={runCode}>Run Code</Button>
             <Button variant="default" className="bg-green-600 hover:bg-green-700">Submit</Button>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {/* Problem Description Panel */}
          <Card className="flex flex-col overflow-auto">
              <CardHeader>
                  <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p>{problem.description}</p>
                  <div className="space-y-2">
                      <h4 className="font-bold">Examples:</h4>
                      {problem.examples.map((ex, i) => (
                          <div key={i} className="bg-muted p-2 rounded-md text-sm font-mono">
                              <div><strong>Input:</strong> {ex.input}</div>
                              <div><strong>Output:</strong> {ex.output}</div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>

          {/* Code Editor Panel */}
          <div className="flex flex-col gap-4 min-h-0">
             <Card className="flex-1 flex flex-col min-h-0 overflow-hidden border-2 border-muted hover:border-primary/50 transition-colors">
                  <div className="bg-muted p-2 text-xs text-muted-foreground border-b flex justify-between">
                      <span>JavaScript</span>
                      <span>vim mode: off</span>
                  </div>
                  <textarea 
                    className="flex-1 w-full bg-[#1e1e1e] p-4 font-mono text-sm leading-6 text-white resize-none focus:outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                  />
             </Card>

             {/* Console Output */}
             <Card className="h-1/3 flex flex-col min-h-0 overflow-hidden bg-black border-t-2 border-muted">
                 <div className="bg-muted p-2 text-xs text-muted-foreground border-b">Console</div>
                 <div className="flex-1 p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-auto">
                     {output || "Output will appear here..."}
                 </div>
             </Card>
          </div>
      </div>
    </div>
  )
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
}
