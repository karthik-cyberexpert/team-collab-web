"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Clock, BookOpen } from "lucide-react"

const courses = [
  { id: 1, title: "Next.js 14 Masterclass", author: "Vercel Team", duration: "4h 30m", lessons: 24, image: "bg-gradient-to-br from-black to-slate-800" },
  { id: 2, title: "Advanced React Patterns", author: "Kent C. Dodds", duration: "6h 15m", lessons: 18, image: "bg-gradient-to-br from-blue-600 to-indigo-900" },
  { id: 3, title: "Tailwind CSS Design Systems", author: "Adam Wathan", duration: "3h 45m", lessons: 12, image: "bg-gradient-to-br from-cyan-500 to-blue-700" },
  { id: 4, title: "Web3 Fundamentals", author: "Ethereum Foundation", duration: "5h 20m", lessons: 20, image: "bg-gradient-to-br from-purple-600 to-pink-600" },
  { id: 5, title: "Rust for JS Developers", author: "The Primeagen", duration: "8h 00m", lessons: 32, image: "bg-gradient-to-br from-orange-700 to-red-900" },
]

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Learning Hub</h2>
        <Button>My Learning Path</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
              <Card key={course.id} className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                  <div className={`h-48 ${course.image} relative flex items-center justify-center`}>
                      <PlayCircle className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300" />
                  </div>
                  <CardHeader>
                      <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                      <CardDescription>{course.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" /> {course.lessons} Lessons
                          </div>
                      </div>
                      <Button className="w-full mt-4" variant="secondary">Start Learning</Button>
                  </CardContent>
              </Card>
          ))}
      </div>
    </div>
  )
}
