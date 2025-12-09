"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, MoreHorizontal, Shield, Mail } from "lucide-react"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TeamsPage() {
    const { teamMembers, addTeamMember, removeTeamMember } = useStore()
    const [inviteOpen, setInviteOpen] = useState(false)
    const [inviteEmail, setInviteEmail] = useState("")

    const handleInvite = () => {
        if (!inviteEmail) {
            toast.error("Please enter an email address")
            return
        }
        
        // Mock invite logic
        const newMember = {
            id: Math.random().toString(),
            name: inviteEmail.split('@')[0],
            role: 'Member' as const,
            status: 'offline' as const,
            avatar: `/avatars/0${Math.floor(Math.random() * 4) + 1}.png`
        }
        
        addTeamMember(newMember)
        setInviteOpen(false)
        setInviteEmail("")
        toast.success(`Invitation sent to ${inviteEmail}`)
    }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Roster</h1>
          <p className="text-muted-foreground">Manage your squad members and roles.</p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <UserPlus className="h-4 w-4" /> Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite to Squad</DialogTitle>
                    <DialogDescription>
                        Send an invitation link to a new team member.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="colleague@example.com" 
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>Member</option>
                            <option>Leader</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleInvite}>Send Invite</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {member.role === "Leader" ? <Badge variant="default" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Team Leader</Badge> : <Badge variant="secondary">Member</Badge>}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500" onClick={() => removeTeamMember(member.id)}>Remove Member</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4 py-4">
                         <Avatar className="h-20 w-20">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <div className="text-lg font-bold">{member.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2 mt-1">
                                <span className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : member.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </div>
                        </div>
                         <div className="flex gap-2 w-full mt-2">
                            <Button variant="outline" className="flex-1 gap-2" size="sm">
                                <Mail className="h-3 w-3" /> Message
                            </Button>
                            <Button variant="outline" className="flex-1 gap-2" size="sm">
                                <Shield className="h-3 w-3" /> Permissions
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
