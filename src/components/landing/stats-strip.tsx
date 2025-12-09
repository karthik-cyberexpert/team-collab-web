"use client"

import { motion } from "framer-motion"
import { Users, Trophy, Flag, Shield, Laptop } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
    { label: "Registered Devs", value: 12450, icon: Users, color: "text-blue-400" },
    { label: "XP Grinded", value: 89000000, icon: ZapIcon, color: "text-purple-400" }, // Using wrapper icon below
    { label: "Projects Built", value: 3420, icon: Laptop, color: "text-green-400" },
    { label: "Bosses Defeated", value: 875, icon: Shield, color: "text-red-400" },
    { label: "Hackathons Hosted", value: 42, icon: Flag, color: "text-yellow-400" },
]

function ZapIcon(props: any) {
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
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2A.5.5 0 0 1 14 2.6V12a1 1 0 0 0 1 1h8a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.88-.4V14z" />
        </svg>
    )
}

export function StatsStrip() {
    return (
        <div className="w-full bg-background/50 border-y border-white/5 backdrop-blur-sm py-8 overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {stats.map((stat, i) => (
                        <StatItem key={i} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatItem({ stat, index }: { stat: typeof stats[0], index: number }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // Simple count up animation
        const steps = 50
        const increment = Math.ceil(stat.value / steps)
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= stat.value) {
                current = stat.value
                clearInterval(timer)
            }
            setCount(current)
        }, 30)
        return () => clearInterval(timer)
    }, [stat.value])

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
        >
            <stat.icon className={`w-8 h-8 mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
            <div className="text-2xl font-bold font-mono tracking-tight">
                {count.toLocaleString()}
                {index === 1 && "+"}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {stat.label}
            </div>
        </motion.div>
    )
}
