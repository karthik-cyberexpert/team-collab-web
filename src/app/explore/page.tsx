"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Heart, MessageSquare, Eye, ExternalLink, Code2 } from "lucide-react"
import { MOCK_PROJECTS, CATEGORIES } from "@/lib/mock-projects"
import Link from "next/link"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
      
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 p-6">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tighter hidden md:block">
                <span className="text-primary">EXPLORE</span>_REGISTRY
            </h1>

            <div className="flex w-full md:w-auto gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search projects, stacks, or creators..." 
                        className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
            </div>
        </div>
        
        {/* Categories */}
        <div className="container mx-auto max-w-7xl mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
                <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border ${selectedCategory === cat ? 'border-primary' : 'border-transparent bg-white/5 hover:bg-white/10'}`}
                >
                    {cat}
                </Button>
            ))}
        </div>
      </div>

      {/* Projects Grid */}
      <main className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
                {filteredProjects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        layout
                        className="group relative bg-card/30 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                    >
                        {/* Thumbnail Placeholder with Hover Effect */}
                        <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden group-hover:opacity-90 transition-opacity">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-20">
                                <Code2 className="w-16 h-16" />
                            </div>
                             {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                <Button size="sm" variant="secondary" className="rounded-full">
                                    <Eye className="w-4 h-4 mr-2" /> Preview
                                </Button>
                                <Button size="sm" className="rounded-full">
                                    <ExternalLink className="w-4 h-4 mr-2" /> Code
                                </Button>
                            </div>
                            {/* Badges */}
                            <div className="absolute top-2 right-2">
                                <Badge variant="secondary" className="bg-black/50 backdrop-blur-md border border-white/10 text-[10px]">
                                    {project.category}
                                </Badge>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                            </div>
                            <p className="text-muted-foreground text-xs line-clamp-2 mb-4 h-8">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {project.techStack.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                                        +{project.techStack.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-5 h-5 rounded-full ${project.author.avatar}`} />
                                    <span className="text-xs font-medium text-muted-foreground hover:text-white cursor-pointer truncate max-w-[80px]">
                                        {project.author.name}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                                        <Heart className="w-3 h-3" /> {formatNumber(project.likes)}
                                    </div>
                                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
                                        <MessageSquare className="w-3 h-3" /> {project.comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>No projects found matching your criteria.</p>
                <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                    Reset Filters
                </Button>
            </div>
        )}
      </main>
    </div>
  )
}

function formatNumber(num: number) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString()
}
