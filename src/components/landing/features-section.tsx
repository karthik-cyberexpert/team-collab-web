"use client"

import { motion } from "framer-motion"
import { Code2, Swords, Users, Zap, Terminal, Globe, Award, Lock } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Gamified Coding",
    description: "Solve problems, earn XP, and climb the leaderboards in real-time.",
    color: "text-blue-500",
  },
  {
    icon: Swords,
    title: "PvP Arenas",
    description: "Challenge friends or random opponents to code battles and typing wars.",
    color: "text-red-500",
  },
  {
    icon: Users,
    title: "Team Clans",
    description: "Form alliances, pool resources, and compete in seasonal clan wars.",
    color: "text-purple-500",
  },
  {
    icon: Zap,
    title: "Daily Streaks",
    description: "Keep your momentum going with daily missions and escalating rewards.",
    color: "text-yellow-500",
  },
  {
    icon: Terminal,
    title: "Boss Fights",
    description: "Co-op raid bosses where your code deals damage. Survive the timer!",
    color: "text-green-500",
  },
  {
    icon: Globe,
    title: "Global Projects",
    description: "Collaborate on open-source style projects and build a real portfolio.",
    color: "text-cyan-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
            Forged for Champions
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Everything you need to master your craft, compete with the best, and build the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className={`p-3 rounded-lg w-fit mb-4 bg-black/50 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
              
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-primary/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
