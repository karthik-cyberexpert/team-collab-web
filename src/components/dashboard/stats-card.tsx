import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardStatsProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function DashboardStats({ title, value, description, icon, trend, trendValue, className }: DashboardStatsProps) {
  return (
    <Card className={cn("hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--color-primary)] hover:-translate-y-1 group relative overflow-hidden", className)}>
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-110 duration-300">
            {icon}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-primary group-hover:to-secondary transition-all">
            {value}
        </div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend === "up" && <ArrowUp className="w-3 h-3 text-green-500 mr-1 animate-bounce" />}
            {trend === "down" && <ArrowDown className="w-3 h-3 text-red-500 mr-1" />}
            <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}>
                {trendValue}
            </span>
            <span className="ml-1">{description}</span>
        </p>
      </CardContent>
    </Card>
  )
}
