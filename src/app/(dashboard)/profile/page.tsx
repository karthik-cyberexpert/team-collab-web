"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Zap, Trophy, Briefcase, Share2, Edit, MapPin, Link as LinkIcon, Github, Twitter, MoreHorizontal } from "lucide-react"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { toast } from "sonner"

export default function ProfilePage() {
    const { user } = useStore()
    const [editOpen, setEditOpen] = useState(false)
    const [profileData, setProfileData] = useState({
        name: user.name,
        bio: "Full Stack Developer | Cyberpunk Enthusiast | Building the future.",
        location: "Neo Tokyo, Sector 7",
        website: "https://example.com"
    })

    const handleSaveProfile = () => {
        // Here we would sync with Zustand or Backend
        // For now, we just update local state and show a toast
        setEditOpen(false)
        toast.success("Profile updated successfully")
    }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 border border-white/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" /> Share
            </Button>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                        <Edit className="h-4 w-4" /> Edit Profile
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your public profile here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name" 
                                value={profileData.name} 
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea 
                                id="bio" 
                                value={profileData.bio} 
                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input 
                                    id="location" 
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="website">Website</Label>
                                <Input 
                                    id="website" 
                                    value={profileData.website}
                                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveProfile}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr] -mt-20 relative px-4">
        {/* Sidebar Info */}
        <div className="flex flex-col gap-6">
            <Card className="text-center overflow-hidden">
                <CardHeader className="pt-0">
                    <div className="relative mx-auto -mt-16 mb-4">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                            <AvatarImage src="/avatars/01.png" width={100} height={100} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute bottom-1 right-1 pointer-events-none">{user.role}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-1">{profileData.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-1">
                        <MapPin className="h-3 w-3" /> {profileData.location}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                    
                    <div className="flex justify-center gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Github className="h-4 w-4" />
                        </Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Twitter className="h-4 w-4" />
                        </Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <LinkIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2 text-left bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Level {user.level}</span>
                            <span>{user.xp} / 5000 XP</span>
                        </div>
                        <Progress value={(user.xp / 5000) * 100} className="h-2" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" /> Recent Achievements
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border hover:border-primary transition-colors cursor-help group relative">
                             <span className="text-xl">🏆</span>
                             <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg whitespace-nowrap z-50">
                                 Achievement Unlocked!
                             </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-4 w-4 text-cyan-500" /> Skills
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "GraphQL"].map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Main Content Info */}
        <div className="flex flex-col gap-6 pt-16 md:pt-0">
             <Tabs defaultValue="projects" className="w-full">
                <TabsList>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="projects" className="mt-6 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map(i => (
                             <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <Badge variant="outline">Open Source</Badge>
                                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <h3 className="font-semibold text-lg mb-2">Project Pegasus</h3>
                                    <p className="text-sm text-muted-foreground mb-4">A futuristic dashboard for monitoring blockchain transactions in real-time.</p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> JavaScript</span>
                                             <span className="flex items-center gap-1">⭐ 128</span>
                                        </div>
                                        <span>Updated 2 days ago</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest contributions across the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Briefcase className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">Pushed 3 commits to <span className="text-primary hover:underline cursor-pointer">Project Pegasus</span></p>
                                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  )
}
