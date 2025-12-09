"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Swords, Trophy, ShoppingBag, Terminal } from "lucide-react"

const features = [
    { 
        title: "Coding Arena", 
        desc: "PvP Competitive Battles", 
        icon: Code2, 
        color: "from-blue-600 to-cyan-500", 
        image: "linear-gradient(to bottom right, #1e3a8a, #06b6d4)" 
    },
    { 
        title: "Boss Raids", 
        desc: "Co-op PvE Events", 
        icon: Swords, 
        color: "from-red-600 to-orange-500", 
        image: "linear-gradient(to bottom right, #991b1b, #f97316)" 
    },
    { 
        title: "Leaderboards", 
        desc: "Global Rankings & Seasons", 
        icon: Trophy, 
        color: "from-yellow-500 to-amber-300", 
        image: "linear-gradient(to bottom right, #eab308, #fcd34d)" 
    },
    { 
        title: "Marketplace", 
        desc: "Cosmetics & Power-ups", 
        icon: ShoppingBag, 
        color: "from-purple-600 to-pink-500", 
        image: "linear-gradient(to bottom right, #9333ea, #ec4899)" 
    },
]

export function CinematicFeatures() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Core Systems</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to level up your development career, gamified.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group"
                    >
                        <div className={`h-[400px] rounded-2xl relative overflow-hidden bg-gradient-to-br ${feature.color} p-[1px]`}>
                            <div className="absolute inset-0 bg-background/90 group-hover:bg-background/80 transition-colors duration-500 p-6 flex flex-col items-center justify-end text-center rounded-2xl h-full w-full">
                                
                                {/* Background Abstract Shape */}
                                <div 
                                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                                    style={{ background: feature.image }}
                                />

                                {/* Icon */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:top-1/3 transition-all duration-500">
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-${feature.color.split('-')[1]}-500/20`}>
                                        <feature.icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-6">{feature.desc}</p>
                                    
                                    <div className="w-8 h-1 bg-white/20 rounded-full mx-auto group-hover:w-16 transition-all duration-500 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100" />
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
