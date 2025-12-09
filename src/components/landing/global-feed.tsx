"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Sword, Trophy, ShoppingBag, ShieldAlert } from "lucide-react"

const EVENTS = [
    { id: 1, text: "Cipher defeated NullPointer in Duo Challenge", icon: Sword, color: "text-red-400" },
    { id: 2, text: "Team Titans won the Weekly Hackathon", icon: Trophy, color: "text-yellow-400" },
    { id: 3, text: "User404 unlocked 'Legendary' badge", icon: Trophy, color: "text-purple-400" },
    { id: 4, text: "New Item 'Cyber katana' added to Store", icon: ShoppingBag, color: "text-blue-400" },
    { id: 5, text: "Boss Omega has 25% HP remaining!", icon: ShieldAlert, color: "text-orange-400" },
]

export function GlobalFeed() {
    const [event, setEvent] = useState<typeof EVENTS[0] & { uniqueId: number } | null>(null)

    useEffect(() => {
        // Simulate real-time ticker
        let index = 0
        setEvent({ ...EVENTS[0], uniqueId: Date.now() }) // Set initial

        const interval = setInterval(() => {
            index = (index + 1) % EVENTS.length
            setEvent({ ...EVENTS[index], uniqueId: Date.now() })
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full bg-black/40 border-b border-primary/20 p-2 overflow-hidden h-12 flex items-center relative gap-4">
            <div className="bg-primary/20 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shrink-0 ml-4 animate-pulse">
                Live Feed
            </div>
            <div className="flex-1 relative h-full flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                    {event && (
                        <motion.div
                            key={event.uniqueId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-0 flex items-center gap-2 text-sm text-muted-foreground min-w-max"
                        >
                            <event.icon className={`w-4 h-4 ${event.color}`} />
                            <span className="text-white/80 font-medium">{event.text}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
