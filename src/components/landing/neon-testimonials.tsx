"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const TESTIMONIALS = [
    { text: "This platform is basically an MMO for developers. I learned more in 3 weeks here than 4 years of college.", author: "SarahDev", role: "Frontend Ninja", color: "border-purple-500" },
    { text: "The boss raids are insane. Collaborating with randoms to fix a memory leak in real-time? Pure adrenaline.", author: "NullPointer", role: "Backend Guru", color: "border-blue-500" },
    { text: "Finally, a place where my GitHub contributions actually feel like leveling up. The gamification is addictive.", author: "GitMaster", role: "Fullstack Hero", color: "border-green-500" },
]

export function NeonTestimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold mb-16">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Transmit Signals
                </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className={`relative p-8 rounded-2xl bg-card border ${t.color} border-opacity-50 hover:border-opacity-100 hover:shadow-[0_0_30px_-5px_var(--color-primary)] transition-all`}
                    >
                        <Quote className="w-8 h-8 text-muted-foreground opacity-20 mb-4" />
                        <p className="text-lg text-muted-foreground mb-6 italic">"{t.text}"</p>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20" />
                            <div>
                                <div className="font-bold text-white">{t.author}</div>
                                <div className="text-xs text-primary">{t.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}
