"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus, Check, X } from "lucide-react"

const requests = [
    { id: 1, name: "NewUser123", avatar: "/avatars/05.png", mutual: 0 },
    { id: 2, name: "DevGuru", avatar: "/avatars/06.png", mutual: 3 },
]

const friends = [
     { id: 1, name: "Alice Smith", avatar: "/avatars/02.png", status: "Online" },
     { id: 2, name: "Bob Jones", avatar: "/avatars/03.png", status: "In Game" },
     { id: 3, name: "Charlie Brown", avatar: "/avatars/04.png", status: "Offline" },
]

export default function FriendsPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Friends & Connections</h2>

        <div className="grid gap-6 md:grid-cols-2">
            {/* Find Friends */}
            <Card>
                <CardHeader>
                    <CardTitle>Find Friends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input placeholder="Search by username..." />
                        <Button size="icon"><Search className="h-4 w-4" /></Button>
                    </div>
                    <div className="pt-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-4">Friend Requests</h4>
                        <div className="space-y-3">
                            {requests.map(req => (
                                <div key={req.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={req.avatar} />
                                            <AvatarFallback>{req.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-sm">{req.name}</div>
                                            <div className="text-xs text-muted-foreground">{req.mutual} mutual friends</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"><X className="h-4 w-4"/></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-500/10"><Check className="h-4 w-4"/></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* My Friends */}
            <Card>
                <CardHeader>
                    <CardTitle>My Friends ({friends.length})</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="space-y-4">
                         {friends.map(friend => (
                             <div key={friend.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                 <div className="flex items-center gap-3">
                                     <div className="relative">
                                         <Avatar>
                                             <AvatarImage src={friend.avatar} />
                                             <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                         </Avatar>
                                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                                              friend.status === "Online" ? "bg-green-500" : 
                                              friend.status === "In Game" ? "bg-purple-500" : "bg-gray-500"
                                          }`}></span>
                                     </div>
                                     <div>
                                         <div className="font-medium text-sm">{friend.name}</div>
                                         <div className="text-xs text-muted-foreground">{friend.status}</div>
                                     </div>
                                 </div>
                                 <Button variant="outline" size="sm">Message</Button>
                             </div>
                         ))}
                     </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
