"use client"

import { Bell, Send, Radio, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NotificationsAdminPage() {
  return (
    <div className="max-w-2xl space-y-6">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Bell className="text-rose-400" /> GLOBAL_BROADCAST
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Push alerts to all connected clients.</p>
        </div>

        <div className="bg-black/60 border border-white/10 p-8 rounded-xl backdrop-blur-md space-y-6">
             <div className="space-y-2">
                 <label className="text-xs font-mono uppercase text-muted-foreground">Broadcast Type</label>
                 <Select>
                      <SelectTrigger className="bg-black/50 border-white/10">
                          <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                          <SelectItem value="system">System Maintenance</SelectItem>
                          <SelectItem value="event">Event Start</SelectItem>
                          <SelectItem value="security">Security Alert</SelectItem>
                      </SelectContent>
                 </Select>
             </div>

             <div className="space-y-2">
                 <label className="text-xs font-mono uppercase text-muted-foreground">Headline</label>
                 <Input placeholder="e.g. Server Restart in 5 Minutes" className="bg-black/50 border-white/10" />
             </div>

             <div className="space-y-2">
                 <label className="text-xs font-mono uppercase text-muted-foreground">Message Body</label>
                 <Textarea placeholder="Details..." className="bg-black/50 border-white/10 min-h-[100px]" />
             </div>

             <Button className="w-full bg-rose-600 hover:bg-rose-700 font-bold py-6">
                 <Radio className="w-5 h-5 mr-2 animate-pulse" /> TRANSMIT_SIGNAL
             </Button>
        </div>
    </div>
  )
}
