"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useTheme } from "next-themes"

const data = [
  {
    average: 400,
    today: 240,
    day: "Mon",
  },
  {
    average: 300,
    today: 139,
    day: "Tue",
  },
  {
    average: 200,
    today: 980,
    day: "Wed",
  },
  {
    average: 278,
    today: 390,
    day: "Thu",
  },
  {
    average: 189,
    today: 480,
    day: "Fri",
  },
  {
    average: 239,
    today: 380,
    day: "Sat",
  },
  {
    average: 349,
    today: 430,
    day: "Sun",
  },
]

export function Overview() {
    const { theme } = useTheme()

  return (
    <Card className="col-span-4 hover:border-primary/50 transition-colors">
        <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your XP earnings over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <defs>
                    <linearGradient id="colorToday" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                    </linearGradient>
                </defs>
                <XAxis
                dataKey="day"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}XP`}
                />
                 <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', background: theme === 'dark' ? '#0f0f12' : '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: 'var(--color-foreground)' }}
                    cursor={{ stroke: 'var(--color-accent)', strokeWidth: 1, strokeDasharray: '5 5' }}
                 />
                <Line
                type="monotone"
                dataKey="today"
                stroke="url(#colorToday)" 
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--color-background)", strokeWidth: 2, stroke: "var(--color-primary)" }}
                activeDot={{ r: 6, fill: "var(--color-accent)" }}
                className="drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                />
                 <Line
                type="monotone"
                dataKey="average"
                stroke="currentColor" 
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
                className="stroke-muted-foreground opacity-30"
                />
            </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}
