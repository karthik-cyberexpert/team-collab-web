"use client"

import { useState } from "react"
import { useStore, Project, Task } from "@/lib/store"
import { toast } from "sonner"
import { 
  Plus, MoreHorizontal, Users, ListTodo, Circle, 
  Calendar, Flag, AlertCircle, CheckSquare, Square, Trash2, Edit,
  ArrowRightLeft, UserPlus, X, Shield
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ProjectsPage() {
    const { 
        projects, teamMembers, user,
        addProject, removeProject, moveProject, updateProject, 
        addTask, toggleTask, deleteTask, 
        addProjectMember, removeProjectMember 
    } = useStore()

    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    
    const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
    const [transferTargetProject, setTransferTargetProject] = useState<Project | null>(null)
    const [newOwner, setNewOwner] = useState("")

    // Form State
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: ''
    })
    
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newMemberName, setNewMemberName] = useState("")

    const openCreateSheet = () => {
        setEditingProject(null)
        setFormData({ title: '', description: '', priority: 'medium', status: 'todo', dueDate: '' })
        setIsSheetOpen(true)
    }

    const openEditSheet = (project: Project) => {
        setEditingProject(project)
        setFormData({
            title: project.title,
            description: project.description || '',
            priority: project.priority,
            status: project.status,
            dueDate: project.dueDate || ''
        })
        setIsSheetOpen(true)
    }

    const openTransferDialog = (project: Project) => {
        setTransferTargetProject(project)
        setNewOwner("")
        setIsTransferDialogOpen(true)
    }

    const handleSaveProject = () => {
        if (!formData.title) {
            toast.error("Title required")
            return
        }

        if (editingProject) {
            updateProject(editingProject.id, formData)
            toast.success("Project Updated")
        } else {
            addProject({
                id: Math.random().toString(36).substr(2, 9),
                title: formData.title!,
                description: formData.description,
                priority: formData.priority as any || 'medium',
                status: formData.status as any || 'todo',
                dueDate: formData.dueDate,
                tasks: [],
                owner: user.name,
                members: [user.name]
            })
            toast.success("Project Issued", { description: "New mission added to the board." })
        }
        setIsSheetOpen(false)
    }

    const handleAddTask = () => {
        if (!newTaskTitle || !editingProject) return
        addTask(editingProject.id, newTaskTitle)
        setNewTaskTitle("")
    }

    const handleAddMember = () => {
        if (!newMemberName || !editingProject) return
        if (editingProject.members.includes(newMemberName)) {
            toast.error("Already a member")
            return
        }
        addProjectMember(editingProject.id, newMemberName)
        setNewMemberName("")
    }

    const handleTransferOwnership = () => {
        if (!transferTargetProject || !newOwner) return
        
        updateProject(transferTargetProject.id, { owner: newOwner })
        
        // Ensure new owner is in members list
        if (!transferTargetProject.members.includes(newOwner)) {
            addProjectMember(transferTargetProject.id, newOwner)
        }

        toast.success("Ownership Transferred", { description: `${newOwner} is now the lead of ${transferTargetProject.title}.` })
        setIsTransferDialogOpen(false)
    }

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects Board</h1>
                    <p className="text-muted-foreground">Issue new missions, manage squads, and track execution.</p>
                </div>
                
                <Button onClick={openCreateSheet} className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" /> Issue New Project
                </Button>

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent className="overflow-y-auto sm:max-w-md border-l border-white/10 bg-background/95 backdrop-blur-xl">
                        <SheetHeader>
                            <SheetTitle>{editingProject ? 'Manage Project' : 'Issue New Project'}</SheetTitle>
                            <SheetDescription>
                                {editingProject ? 'Configure mission parameters and roster.' : 'Define scope, priority, and timeline.'}
                            </SheetDescription>
                        </SheetHeader>
                        
                        <div className="grid gap-6 py-6">
                            <div className="grid gap-2">
                                <Label>Project Title</Label>
                                <Input 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                    placeholder="e.g. Quantum Interface"
                                    className="bg-muted/50"
                                />
                            </div>
                            
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea 
                                    value={formData.description} 
                                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                    placeholder="Brief mission briefing..."
                                    className="min-h-[80px] bg-muted/50"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Priority</Label>
                                    <Select 
                                        value={formData.priority} 
                                        onValueChange={(v: any) => setFormData({...formData, priority: v})}
                                    >
                                        <SelectTrigger className="bg-muted/50"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low Priority</SelectItem>
                                            <SelectItem value="medium">Medium Priority</SelectItem>
                                            <SelectItem value="high">High Priority</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="grid gap-2">
                                    <Label>Due Date</Label>
                                    <Input 
                                        type="date" 
                                        value={formData.dueDate} 
                                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
                                        className="bg-muted/50 [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select 
                                    value={formData.status} 
                                    onValueChange={(v: any) => setFormData({...formData, status: v})}
                                >
                                    <SelectTrigger className="bg-muted/50"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">To Do</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Task Management */}
                            {editingProject && (
                                <div className="space-y-4 pt-4 border-t border-border/50">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2"><ListTodo className="w-4 h-4" /> Task Checklist</Label>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {(Array.isArray(editingProject.tasks) ? editingProject.tasks : []).filter(t => t.completed).length}/{(Array.isArray(editingProject.tasks) ? editingProject.tasks : []).length}
                                        </span>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Input 
                                            placeholder="Add sub-task..." 
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                            className="bg-muted/50"
                                        />
                                        <Button size="icon" variant="ghost" onClick={handleAddTask}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <ScrollArea className="h-[150px] rounded-md border border-white/5 bg-black/20 p-2">
                                        <div className="space-y-1">
                                            {(Array.isArray(editingProject.tasks) ? editingProject.tasks : []).map(task => (
                                                <div key={task.id} className="flex items-center gap-2 group hover:bg-white/5 p-1.5 rounded transition-colors">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-5 w-5 hover:bg-transparent"
                                                        onClick={() => toggleTask(editingProject.id, task.id)}
                                                    >
                                                        {task.completed ? 
                                                            <CheckSquare className="w-4 h-4 text-green-500" /> : 
                                                            <Square className="w-4 h-4 text-muted-foreground" />
                                                        }
                                                    </Button>
                                                    <span className={`text-sm flex-1 truncate ${task.completed ? 'line-through text-muted-foreground' : 'text-zinc-300'}`}>
                                                        {task.title}
                                                    </span>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                                        onClick={() => deleteTask(editingProject.id, task.id)}
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {(!editingProject.tasks || editingProject.tasks.length === 0) && <div className="text-center text-xs text-muted-foreground py-4">No active tasks</div>}
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}

                            {/* Member Management */}
                            {editingProject && (
                                <div className="space-y-4 pt-4 border-t border-border/50">
                                    <Label className="flex items-center gap-2"><Users className="w-4 h-4" /> Squad Roster</Label>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(editingProject.members) ? editingProject.members : []).map(member => (
                                            <Badge key={member} variant="secondary" className="pl-1 pr-2 py-1 gap-1">
                                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[8px] text-white font-bold">
                                                    {member[0]}
                                                </div>
                                                {member}
                                                {member === editingProject.owner && <Shield className="w-3 h-3 text-yellow-500 ml-1" />}
                                                {member !== editingProject.owner && (
                                                    <button onClick={() => removeProjectMember(editingProject.id, member)} className="ml-1 hover:text-red-500">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Select value={newMemberName} onValueChange={setNewMemberName}>
                                            <SelectTrigger className="bg-muted/50 h-8 text-xs"><SelectValue placeholder="Add agent..." /></SelectTrigger>
                                            <SelectContent>
                                                {teamMembers.map(tm => (
                                                    <SelectItem key={tm.id} value={tm.name}>{tm.name}</SelectItem>
                                                ))}
                                                <SelectItem value="External_User">External Contractor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button size="sm" variant="secondary" onClick={handleAddMember}>
                                            <UserPlus className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </SheetClose>
                            <Button onClick={handleSaveProject} className="bg-primary hover:bg-primary/90">
                                {editingProject ? 'Save Changes' : 'Issue Project'}
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Kanban Columns */}
            <div className="grid gap-6 md:grid-cols-3 h-full min-h-0">
                <KanbanColumn 
                    title="To Do" 
                    projects={projects.filter(p => p.status === 'todo')} 
                    type="todo" 
                    onMove={moveProject} 
                    onEdit={openEditSheet}
                    onTransfer={openTransferDialog}
                    onRemove={removeProject}
                />
                <KanbanColumn 
                    title="In Progress" 
                    projects={projects.filter(p => p.status === 'in-progress')} 
                    type="in-progress" 
                    onMove={moveProject} 
                    onEdit={openEditSheet}
                    onTransfer={openTransferDialog}
                    onRemove={removeProject}
                />
                <KanbanColumn 
                    title="Done" 
                    projects={projects.filter(p => p.status === 'done')} 
                    type="done" 
                    onMove={moveProject} 
                    onEdit={openEditSheet}
                    onTransfer={openTransferDialog}
                    onRemove={removeProject}
                />
            </div>

            {/* Transfer Ownership Dialog */}
            <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
                <DialogContent className="bg-black/90 border-indigo-500/20 text-white backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-indigo-400"><ArrowRightLeft className="w-5 h-5" /> Transfer Project Ownership</DialogTitle>
                        <DialogDescription>
                            Select a new lead for <span className="font-bold text-white">{transferTargetProject?.title}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>New Owner</Label>
                            <Select value={newOwner} onValueChange={setNewOwner}>
                                <SelectTrigger className="bg-black/50 border-white/10 text-white"><SelectValue placeholder="Select member..." /></SelectTrigger>
                                <SelectContent className="bg-black border-white/10 text-white">
                                    {transferTargetProject?.members.filter(m => m !== transferTargetProject.owner).map(member => (
                                        <SelectItem key={member} value={member}>{member}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">This grants full edit rights to the selected member.</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsTransferDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleTransferOwnership} className="bg-indigo-600 hover:bg-indigo-700">
                            Confirm Transfer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function KanbanColumn({ title, projects, type, onMove, onEdit, onTransfer, onRemove }: any) {
    const iconMap = {
        'todo': Circle,
        'in-progress': Circle,
        'done': CheckSquare
    }
    const Icon = iconMap[type as keyof typeof iconMap] || Circle
    const colorMap = {
        'todo': 'text-muted-foreground',
        'in-progress': 'text-blue-500 fill-blue-500',
        'done': 'text-green-500 fill-green-500'
    }

    return (
        <div className="flex flex-col gap-4 h-full bg-muted/20 p-4 rounded-xl border border-white/5">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Icon className={`h-3 w-3 ${colorMap[type as keyof typeof colorMap]}`} /> 
                    {title}
                </h3>
                <Badge variant="outline" className="bg-background">{projects.length}</Badge>
            </div>
            
            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="flex flex-col gap-3 pb-4">
                    {projects.map((project: Project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onMove={onMove} 
                            onEdit={onEdit} 
                            onTransfer={onTransfer}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

function ProjectCard({ project, onMove, onEdit, onTransfer, onRemove }: { project: Project, onMove: any, onEdit: any, onTransfer: any, onRemove: any }) {
    const priorityColor = {
        'low': 'text-green-400 border-green-400/20 bg-green-400/10',
        'medium': 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10',
        'high': 'text-red-400 border-red-400/20 bg-red-400/10'
    }

    const tasks = Array.isArray(project.tasks) ? project.tasks : []
    const members = Array.isArray(project.members) ? project.members : []

    const completedTasks = tasks.filter(t => t.completed).length
    const totalTasks = tasks.length
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

    return (
        <Card 
            className="group hover:border-primary/50 transition-all cursor-pointer bg-card/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5 active:scale-[0.99] border-white/5"
            onClick={() => onEdit(project)}
        >
            <CardHeader className="p-4 pb-3 space-y-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${priorityColor[project.priority] || priorityColor.medium}`}>
                                {project.priority}
                            </Badge>
                             {project.owner === 'Demo User' && <Badge variant="secondary" className="text-[9px] h-4 px-1 text-muted-foreground bg-white/5">You</Badge>}
                        </div>
                        <CardTitle className="text-sm font-semibold leading-tight text-white/90">{project.title}</CardTitle>
                    </div>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-muted-foreground hover:text-foreground hover:bg-white/10" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-black/90 border-white/10 backdrop-blur-xl">
                            <DropdownMenuLabel>Project Ops</DropdownMenuLabel>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(project) }} className="cursor-pointer">
                                <Edit className="w-4 h-4 mr-2" /> Manage / Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onTransfer(project) }} className="cursor-pointer">
                                <ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer Lead
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuLabel>Move To</DropdownMenuLabel>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onMove(project.id, 'todo') }} className="cursor-pointer">To Do</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onMove(project.id, 'in-progress') }} className="cursor-pointer">In Progress</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onMove(project.id, 'done') }} className="cursor-pointer">Done</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="text-red-500 focus:bg-red-950/20 cursor-pointer" onClick={(e) => { e.stopPropagation(); onRemove(project.id) }}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {project.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                )}
            </CardHeader>
            <CardFooter className="p-4 pt-0">
                <div className="w-full space-y-3">
                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1 bg-white/5" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
                        <div className="flex items-center gap-1.5" title="Tasks">
                            <ListTodo className="h-3.5 w-3.5" />
                            <span>{completedTasks}/{totalTasks}</span>
                        </div>
                        {project.dueDate && (
                            <div className="flex items-center gap-1.5" title="Due Date">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                            </div>
                        )}
                        <div className="flex -space-x-1.5">
                            {members.slice(0, 3).map((m: string, i: number) => (
                                <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-black flex items-center justify-center text-[8px] text-white font-bold" title={m}>
                                    {m[0]}
                                </div>
                            ))}
                            {members.length > 3 && (
                                <div className="w-5 h-5 rounded-full bg-neutral-800 border border-black flex items-center justify-center text-[8px] text-muted-foreground">
                                    +{members.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
