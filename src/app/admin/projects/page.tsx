"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  FolderKanban, Plus, Calendar, Users, 
  CheckCircle, Clock, AlertCircle, FileCode,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Mock Projects
const PROJECTS = [
  { id: 1, title: "Build a Portfolio", type: "Individual", deadline: "2 Days", status: "Active", submissions: 45, total: 120 },
  { id: 2, title: "Team Chat App", type: "Team", deadline: "5 Days", status: "Active", submissions: 12, total: 30 },
  { id: 3, title: "Algorithm Visualizer", type: "Individual", deadline: "Ended", status: "Closed", submissions: 89, total: 100 },
]

export default function ProjectsAdminPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <FolderKanban className="text-green-400" /> PROJECT_DIRECTIVE
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Issue assignments, review code, and sync progress.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 font-bold">
            <Plus className="h-4 w-4 mr-2" /> Issue New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative border border-white/10 bg-black/60 backdrop-blur-md rounded-xl overflow-hidden hover:border-green-500/50 transition-colors"
              >
                  <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                          <Badge variant="outline" className={`font-mono
                              ${project.type === 'Team' ? 'text-indigo-400 border-indigo-500/50' : 'text-blue-400 border-blue-500/50'}
                          `}>
                              {project.type}
                          </Badge>
                          <Badge className={`
                              ${project.status === 'Active' ? 'bg-green-500 animate-pulse text-black' : 'bg-white/10'}
                          `}>
                              {project.status}
                          </Badge>
                      </div>
                      
                      <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2 font-mono">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {project.deadline}</span>
                              <span className="flex items-center gap-1"><FileCode className="w-3 h-3" /> {project.submissions}/{project.total} Subs</span>
                          </div>
                      </div>

                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${(project.submissions / project.total) * 100}%` }} 
                          />
                      </div>

                      <div className="pt-2 flex gap-2">
                          <Button size="sm" className="w-full bg-white/5 hover:bg-white/10 border border-white/10">Manage</Button>
                          <Button size="icon" variant="outline" className="border-white/10"><ArrowRight className="w-4 h-4" /></Button>
                      </div>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  )
}
