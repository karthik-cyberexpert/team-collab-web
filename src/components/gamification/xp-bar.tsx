"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface XpBarProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  max: number
  level: number
}

export function XpBar({ current, max, level, className, ...props }: XpBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100))

  return (
    <div className={cn("w-full space-y-1", className)} {...props}>
      <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Lvl {level}</span>
        <span>{current} / {max} XP</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary/10 border border-secondary/20 relative shadow-inner">
        {/* Animated Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  )
}
