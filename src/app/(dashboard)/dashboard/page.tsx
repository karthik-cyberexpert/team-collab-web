"use client"

import { DashboardStats } from "@/components/dashboard/stats-card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Trophy, Zap, Code, Star } from "lucide-react"
import { useStore } from "@/lib/store"

export default function DashboardPage() {
  const { user, projects } = useStore()

  const completedProjects = projects.filter(p => p.status === 'done').length
  const activeProjects = projects.filter(p => p.status === 'in-progress').length
  
  // Calculate simulated "streak" or other derived stats
  const currentStreak = 7 // Mocked for now

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
             {/* Action buttons could go here */}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats 
            title="Total XP" 
            value={user.xp.toLocaleString()} 
            description={`Level ${user.level}`} 
            icon={<Zap className="h-4 w-4 text-yellow-500" />} 
            trend="up" 
        />
        <DashboardStats 
            title="Current Rank" 
            value={`Rank #${Math.max(1, 100 - user.level)}`} 
            description={user.role} 
            icon={<Trophy className="h-4 w-4 text-yellow-500" />} 
        />
        <DashboardStats 
            title="Active Missions" 
            value={activeProjects.toString()} 
            description={`${completedProjects} completed so far`} 
            icon={<Code className="h-4 w-4 text-blue-500" />} 
        />
         <DashboardStats 
            title="Current Streak" 
            value={`${currentStreak} Days`} 
            description="Keep it up!" 
            icon={<Star className="h-4 w-4 text-orange-500" />} 
             trend="up"
             trendValue="🔥"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You earned {user.xp > 1000 ? '1000+' : user.xp} XP this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
