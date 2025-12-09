"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Terminal, Trophy, Code2, Globe, Zap, Users, Shield, Cpu, Gamepad2, Play } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

const features = [
  { icon: Code2, label: "Coding Arena", color: "text-blue-400" },
  { icon: Trophy, label: "Leaderboards", color: "text-yellow-400" },
  { icon: Users, label: "Team Hackathons", color: "text-purple-400" },
  { icon: Shield, label: "Boss Raids", color: "text-red-400" },
  { icon: Zap, label: "Daily Missions", color: "text-orange-400" },
  { icon: Gamepad2, label: "Mini-Games", color: "text-green-400" },
]

export function HeroPortal() {
  const [featureIndex, setFeatureIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32 perspective-1000">
      
      {/* 1. Animated Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.05),transparent_70%)]" />
          <ParticleField />
      </div>

      {/* 2. Main Hero Content */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Slogan Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative bg-background/50 backdrop-blur-md border border-primary/30 rounded-full px-6 py-2 flex items-center gap-3 shadow-[0_0_15px_-3px_theme(colors.primary.DEFAULT)]">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse box-shadow-[0_0_10px_theme(colors.green.500)]"></span>
                <span className="text-sm font-semibold tracking-wider uppercase text-primary">Season 3: The Age of Hackathons</span>
            </div>
        </motion.div>

        {/* Dynamic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 relative px-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Learn <span className="text-primary">•</span> Build
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_auto]">
             Compete • Grow
          </span>
        </motion.h1>

        {/* Sub-Headline with Typewriter/Glitch effect placeholder */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[800px] text-lg md:text-xl text-muted-foreground/80 mb-10 leading-relaxed"
        >
          Enter the competitive developer universe where 
          <span className="text-white font-medium"> coding, gaming, and collaboration </span> 
          merge. Prove your skills in the arena, join a squad, and become a legend.
        </motion.p>

        {/* Feature Carousel Preview */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-12 mb-10 overflow-hidden relative w-full max-w-md flex justify-center items-center"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={featureIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 text-xl font-bold"
                >
                   {(() => {
                       const FeatureIcon = features[featureIndex].icon
                       return <FeatureIcon className={cn("w-6 h-6", features[featureIndex].color)} />
                   })()}
                   <span className={cn(features[featureIndex].color)}>{features[featureIndex].label}</span>
                </motion.div>
            </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link href="/signup">
            <Button size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_30px_-5px_theme(colors.primary.DEFAULT)] hover:scale-105 transition-transform group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              <Zap className="mr-2 h-5 w-5 fill-current" /> Initialize Sequence
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-transform">
              <Globe className="mr-2 h-5 w-5" /> Explore Universe
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* 3. Floating Glitch Elements (Decoration) */}
      <div className="absolute top-1/4 left-10 hidden xl:block opacity-20">
          <Terminal className="w-24 h-24 text-primary animate-float" />
      </div>
      <div className="absolute bottom-1/4 right-10 hidden xl:block opacity-20">
          <Cpu className="w-24 h-24 text-secondary animate-float-delayed" />
      </div>

      {/* 4. Bottom Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  )
}

function ParticleField() {
    // Simple mock particle field using divs for performance/simplicity
    // In a real prod app, could use Three.js or Canvas
    const particles = Array.from({ length: 20 })
    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.1,
                    }}
                    animate={{
                        y: [null, Math.random() * -100 + "%"],
                        opacity: [null, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}
