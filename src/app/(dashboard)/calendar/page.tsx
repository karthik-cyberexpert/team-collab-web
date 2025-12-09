"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "lucide-react"

const schedule = [
  { day: "Mon", tasks: [{ id: 1, title: "Team Meeting", time: "10:00 AM", type: "work" }] },
  { day: "Tue", tasks: [{ id: 2, title: "React Query Workshop", time: "2:00 PM", type: "learning" }, { id: 3, title: "Coding Battle", time: "4:00 PM", type: "gaming" }] },
  { day: "Wed", tasks: [{ id: 4, title: "Project Deadline", time: "5:00 PM", type: "urgent" }] },
  { day: "Thu", tasks: [] },
  { day: "Fri", tasks: [{ id: 5, title: "Casual Gaming Night", time: "8:00 PM", type: "gaming" }] },
  { day: "Sat", tasks: [{ id: 6, title: "Global Hackathon Start", time: "9:00 AM", type: "event" }] },
  { day: "Sun", tasks: [] },
]

export default function CalendarPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Schedule & Events</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {schedule.map((day) => (
              <Card key={day.day} className="h-full min-h-[300px] flex flex-col">
                  <CardHeader className="py-3 bg-muted/20 border-b">
                      <CardTitle className="text-center text-sm font-bold">{day.day}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-2 space-y-2 relative">
                      {/* Grid lines helper logic omitted for simplicity */}
                      {day.tasks.length === 0 && (
                          <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
                              No events
                          </div>
                      )}
                      {day.tasks.map(task => (
                          <div 
                            key={task.id} 
                            className={`p-2 rounded border text-xs cursor-pointer hover:scale-105 transition-transform ${
                                task.type === "work" ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                                task.type === "learning" ? "bg-purple-500/10 border-purple-500/20 text-purple-500" :
                                task.type === "gaming" ? "bg-green-500/10 border-green-500/20 text-green-500" :
                                task.type === "event" ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" :
                                "bg-red-500/10 border-red-500/20 text-red-500"
                            }`}
                          >
                              <div className="font-bold">{task.time}</div>
                              <div>{task.title}</div>
                          </div>
                      ))}
                  </CardContent>
              </Card>
          ))}
      </div>
    </div>
  )
}
