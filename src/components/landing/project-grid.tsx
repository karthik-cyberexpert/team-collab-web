"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Zap, Github } from "lucide-react"
import Link from "next/link"

const PROJECTS = [
    { title: "Neon API Gateway", desc: "High-performance API gateway with rate limiting.", tags: ["Rust", "Actix", "Redis"], likes: 128, views: 3400, xp: 500, author: "DevOne" },
    { title: "CyberChat App", desc: "E2E encrypted chat with holographic UI.", tags: ["Next.js", "Socket.io", "WebRTC"], likes: 256, views: 8900, xp: 1200, author: "CryptoQueen" },
    { title: "Neural Net Vis", desc: "3D visualization of neural networks.", tags: ["Three.js", "Python", "TensorFlow"], likes: 89, views: 1200, xp: 350, author: "AI_Wizard" },
    { title: "Quantum Algo Sim", desc: "Simulating quantum gates in browser.", tags: ["WASM", "C++", "React"], likes: 412, views: 15000, xp: 2500, author: "QubitMaster" },
]

export function ProjectGrid() {
  return (
    <section className="py-24 bg-background/50 relative">
        <div className="container px-4 md:px-6">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Community Builds</h2>
                    <p className="text-muted-foreground">Explore open-source projects crafted by the elite.</p>
                </div>
                <Link href="/explore">
                    <Button variant="outline" className="hidden md:flex">View All Projects</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROJECTS.map((project, i) => (
                    <TiltCard key={i} project={project} index={i} />
                ))}
            </div>
            
            <div className="mt-8 flex justify-center md:hidden">
                 <Link href="/explore">
                    <Button variant="outline">View All Projects</Button>
                </Link>
            </div>
        </div>
    </section>
  )
}

function TiltCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group perspective-1000"
        >
            <div className="relative h-full transition-all duration-500 transform-style-3d group-hover:rotate-x-2 group-hover:rotate-y-2">
                <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                        <Zap className="w-12 h-12 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                        
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-yellow-400 border border-yellow-400/20">
                            +{project.xp} XP
                        </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" /> by {project.author}
                        </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 transition-colors">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 flex justify-between text-muted-foreground text-xs">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1 hover:text-red-400 transition-colors"><Heart className="w-3 h-3" /> {project.likes}</span>
                            <span className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Eye className="w-3 h-3" /> {project.views}</span>
                        </div>
                        <Github className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                    </CardFooter>
                </Card>
            </div>
        </motion.div>
    )
}
