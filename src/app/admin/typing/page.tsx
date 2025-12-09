"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Keyboard, FileText, Upload, RefreshCw, 
  Zap, Trophy, AlertTriangle 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const WORD_LISTS = [
  { id: 1, name: "JavaScript Keywords", words: 45, difficulty: "Easy", status: "Active" },
  { id: 2, name: "Python Data Structures", words: 120, difficulty: "Medium", status: "Active" },
  { id: 3, name: "Rust Borrow Checker", words: 80, difficulty: "Hard", status: "Disabled" },
]

export default function TypingAdminPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Keyboard className="text-cyan-400" /> TYPING_MODULE_CORE
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Manage word lists, WPM thresholds, and anti-cheat parameters.</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 font-bold">
            <Upload className="h-4 w-4 mr-2" /> Import Word List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
              {WORD_LISTS.map((list) => (
                  <motion.div
                      key={list.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-between group hover:border-cyan-500/30 transition-colors"
                  >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{list.name}</h3>
                                <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                                    <Badge variant="outline" className="border-white/10 text-xs">{list.difficulty}</Badge>
                                    <span>{list.words} words</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className={`${list.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'} border`}>
                                {list.status}
                            </Badge>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10"><RefreshCw className="w-4 h-4" /></Button>
                        </div>
                  </motion.div>
              ))}
          </div>

          <div className="space-y-6">
               <Card className="bg-black/60 border-white/10">
                   <CardHeader>
                       <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                           <Zap className="w-4 h-4 text-yellow-500" /> Config_Params
                       </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                       <div className="space-y-2">
                           <label className="text-xs text-muted-foreground font-mono uppercase">Base WPM Multiplier</label>
                           <Input defaultValue="1.5" className="bg-black/50 border-white/10" />
                       </div>
                       <div className="space-y-2">
                           <label className="text-xs text-muted-foreground font-mono uppercase">Min. Accuracy to Qualify</label>
                           <Input defaultValue="95%" className="bg-black/50 border-white/10" />
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <div className="text-xs">
                                <span className="font-bold text-red-400">Strict Mode</span>
                                <p className="text-muted-foreground">Fail on first typo.</p>
                            </div>
                       </div>
                   </CardContent>
               </Card>
          </div>
      </div>
    </div>
  )
}
