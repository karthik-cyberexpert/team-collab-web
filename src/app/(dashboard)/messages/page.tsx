"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, MoreVertical, Search, Paperclip } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    senderId: string
    text: string
    timestamp: Date
    isMe: boolean
}

interface ChatUser {
    id: string
    name: string
    avatar: string
    status: 'online' | 'offline'
    lastMessage?: string
}

const DEMO_USERS: ChatUser[] = [
    { id: '1', name: 'Cipher', avatar: '/avatars/01.png', status: 'online', lastMessage: 'Did you check the latest deployment?' },
    { id: '2', name: 'Glitch', avatar: '/avatars/02.png', status: 'offline', lastMessage: 'I will be afk for 1 hour.' },
    { id: '3', name: 'Pixel', avatar: '/avatars/03.png', status: 'online', lastMessage: 'The design assets are ready.' },
]

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', senderId: '1', text: 'Hey, how is the dashboard coming along?', timestamp: new Date(Date.now() - 1000 * 60 * 60), isMe: false },
        { id: '2', senderId: 'me', text: 'Almost done! Just finishing up the responsiveness.', timestamp: new Date(Date.now() - 1000 * 60 * 30), isMe: true },
        { id: '3', senderId: '1', text: 'Awesome! Let me know when you push.', timestamp: new Date(Date.now() - 1000 * 60 * 5), isMe: false },
    ])
    const [inputText, setInputText] = useState("")
    const [activeUser, setActiveUser] = useState<ChatUser>(DEMO_USERS[0])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = () => {
        if (!inputText.trim()) return

        const newMessage: Message = {
            id: Math.random().toString(),
            senderId: 'me',
            text: inputText,
            timestamp: new Date(),
            isMe: true
        }

        setMessages([...messages, newMessage])
        setInputText("")

        // Simulate reply
        setTimeout(() => {
            const reply: Message = {
                id: Math.random().toString(),
                senderId: activeUser.id,
                text: "Got it! Thanks for the update.",
                timestamp: new Date(),
                isMe: false
            }
            setMessages(prev => [...prev, reply])
        }, 2000)
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] rounded-xl overflow-hidden border bg-card">
            {/* Sidebar */}
            <div className="w-80 border-r flex flex-col bg-muted/10 hidden md:flex">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Messages</h2>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-9 bg-background/50" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {DEMO_USERS.map(user => (
                        <div 
                            key={user.id} 
                            className={cn(
                                "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border/40",
                                activeUser.id === user.id && "bg-muted/50 border-l-4 border-l-primary"
                            )}
                            onClick={() => setActiveUser(user)}
                        >
                            <div className="relative">
                                <Avatar>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className={cn(
                                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                                    user.status === 'online' ? "bg-green-500" : "bg-gray-500"
                                )}></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-medium truncate">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">12:30 PM</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{user.id === activeUser.id && messages.length > 0 ? messages[messages.length-1].text : user.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="border-b p-4 flex items-center justify-between bg-muted/5">
                    <div className="flex items-center gap-3">
                         <Avatar>
                            <AvatarImage src={activeUser.avatar} />
                            <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{activeUser.name}</h3>
                            <span className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                {activeUser.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                         <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                         <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.map(msg => (
                        <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[70%] rounded-2xl p-3 px-4 shadow-sm",
                                msg.isMe 
                                    ? "bg-primary text-primary-foreground rounded-br-none" 
                                    : "bg-muted rounded-bl-none"
                            )}>
                                <p className="text-sm">{msg.text}</p>
                                <span className="text-[10px] opacity-70 mt-1 block text-right">
                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t bg-background">
                    <form 
                        className="flex items-center gap-2"
                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                    >
                        <Button type="button" variant="ghost" size="icon" className="shrink-0">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..." 
                            className="flex-1"
                        />
                         <Button type="submit" size="icon" disabled={!inputText.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
