"use client"

import { BarChart3, TrendingUp, Users, Zap, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsAdminPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <BarChart3 className="text-teal-400" /> SYSTEM_ANALYTICS
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Platform health, retention metrics, and growth data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
                 { label: "Daily Active Users", value: "1.2k", change: "+12%", icon: Users, color: "text-blue-400" },
                 { label: "Retention Rate", value: "85%", change: "+2%", icon: TrendingUp, color: "text-green-400" },
                 { label: "Avg Session", value: "45m", change: "+5m", icon: Clock, color: "text-yellow-400" },
                 { label: "Compute Usage", value: "34%", change: "-2%", icon: Zap, color: "text-purple-400" },
             ].map((stat, i) => (
                 <Card key={i} className="bg-black/60 border-white/10">
                     <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-2">
                             <stat.icon className={`w-5 h-5 ${stat.color}`} />
                             <span className="text-xs font-mono text-green-400">{stat.change}</span>
                         </div>
                         <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                         <div className="text-xs text-muted-foreground uppercase">{stat.label}</div>
                     </CardContent>
                 </Card>
             ))}
        </div>

        <div className="h-96 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center relative">
            <div className="text-muted-foreground font-mono text-xs text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                // LIVE_DATA_STREAM_VISUALIZER<br/>
                [Connect Recharts or Chart.js here]
            </div>
            {/* Mock Chart Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-teal-500/10 to-transparent" />
            <svg className="absolute bottom-0 left-0 right-0 h-48 w-full" preserveAspectRatio="none">
                <path d="M0,100 Q100,50 200,80 T400,60 T600,100 T800,40 T1000,80 L1000,200 L0,200 Z" fill="rgba(45, 212, 191, 0.1)" stroke="rgba(45, 212, 191, 0.5)" strokeWidth="2" />
            </svg>
        </div>
    </div>
  )
}
import { Clock } from "lucide-react"
