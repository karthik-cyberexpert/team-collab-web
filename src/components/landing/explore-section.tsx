"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "lucide-react"

// Mock Data
const projects = [
  {
    id: 1,
    title: "AI Chatbot Assistant",
    category: "AI/ML",
    difficulty: "Hard",
    xp: 500,
    coins: 200,
    image: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    category: "Web Dev",
    difficulty: "Medium",
    xp: 350,
    coins: 150,
    image: "bg-gradient-to-br from-emerald-400 to-cyan-600",
  },
  {
    id: 3,
    title: "Multiplayer Snake Game",
    category: "Game Dev",
    difficulty: "Medium",
    xp: 400,
    coins: 180,
    image: "bg-gradient-to-br from-orange-400 to-red-600",
  },
  {
    id: 4,
    title: "Blockchain Voting System",
    category: "Web3",
    difficulty: "Expert",
    xp: 1000,
    coins: 500,
    image: "bg-gradient-to-br from-blue-600 to-purple-800",
  },
]

const categories = ["All", "Web Dev", "AI/ML", "Game Dev", "Web3"]

export function ExploreSection() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section className="py-24 bg-black/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Explore Quests</h2>
            <p className="text-muted-foreground">Find a project, build your team, and start earning rewards.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={project.id}
              className="group rounded-xl overflow-hidden border border-white/10 bg-card hover:border-primary/50 transition-colors"
            >
              <div className={`h-32 ${project.image} relative`}>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white uppercase">
                  {project.difficulty}
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{project.category}</div>
                <h3 className="font-bold text-lg mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span>🪙</span> {project.coins}
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <span>✨</span> {project.xp} XP
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
