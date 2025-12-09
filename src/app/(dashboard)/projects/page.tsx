"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, MoreHorizontal, Users, ListTodo, Circle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useStore, Project } from "@/lib/store"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

export default function ProjectsPage() {
    const { projects, addProject, removeProject, moveProject } = useStore()
    const [newProjectOpen, setNewProjectOpen] = useState(false)
    const [formData, setFormData] = useState({ title: '', status: 'todo' as 'todo' | 'in-progress' | 'done', tasks: 0 })

    const handleCreateProject = () => {
        if (!formData.title) {
            toast.error("Project title is required")
            return
        }
        
        addProject({
            id: Math.random().toString(36).substr(2, 9),
            title: formData.title,
            status: formData.status,
            tasks: Number(formData.tasks) || 0,
            users: 1
        })
        
        setFormData({ title: '', status: 'todo', tasks: 0 })
        setNewProjectOpen(false)
        toast.success("Project created successfully")
    }

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects Board</h1>
                    <p className="text-muted-foreground">Manage your team's ongoing missions and tasks.</p>
                </div>
                
                <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Project Name</Label>
                                <Input 
                                    id="name" 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. Cyber Security Audit" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Initial Status</Label>
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>
                        <Button onClick={handleCreateProject}>Create Project</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-3 h-full overflow-hidden">
                {/* To Do Column */}
                <div className="flex flex-col gap-4 h-full bg-muted/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Circle className="h-3 w-3 text-muted-foreground" /> To Do
                        </h3>
                        <Badge variant="outline">{projects.filter(p => p.status === 'todo').length}</Badge>
                    </div>
                    <div className="flex flex-col gap-3 overflow-y-auto">
                        {projects.filter(p => p.status === 'todo').map(project => (
                            <ProjectCard key={project.id} project={project} moveProject={moveProject} removeProject={removeProject} />
                        ))}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col gap-4 h-full bg-muted/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Circle className="h-3 w-3 text-blue-500 fill-blue-500" /> In Progress
                        </h3>
                         <Badge variant="outline">{projects.filter(p => p.status === 'in-progress').length}</Badge>
                    </div>
                     <div className="flex flex-col gap-3 overflow-y-auto">
                        {projects.filter(p => p.status === 'in-progress').map(project => (
                            <ProjectCard key={project.id} project={project} moveProject={moveProject} removeProject={removeProject} />
                        ))}
                    </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col gap-4 h-full bg-muted/20 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Circle className="h-3 w-3 text-green-500 fill-green-500" /> Completed
                        </h3>
                        <Badge variant="outline">{projects.filter(p => p.status === 'done').length}</Badge>
                    </div>
                     <div className="flex flex-col gap-3 overflow-y-auto">
                        {projects.filter(p => p.status === 'done').map(project => (
                            <ProjectCard key={project.id} project={project} moveProject={moveProject} removeProject={removeProject} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectCard({ project, moveProject, removeProject }: { project: Project, moveProject: any, removeProject: any }) {
    return (
        <Card className="hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium">{project.title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => moveProject(project.id, 'todo')}>Move to To Do</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => moveProject(project.id, 'in-progress')}>Move to In Progress</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => moveProject(project.id, 'done')}>Move to Done</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500" onClick={() => removeProject(project.id)}>
                                Delete Project
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <ListTodo className="h-4 w-4" />
                        <span>{project.tasks} Tasks</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.users} Members</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
