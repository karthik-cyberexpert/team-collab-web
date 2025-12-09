"use client"

import { MessageSquare, Ban, Check, Flag, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const REPORTS = [
  { id: 1, user: "ToxicGamer", content: "This game is trash and so are you.", reason: "Harassment", time: "10m ago" },
  { id: 2, user: "SpamBot_9000", content: "Buy cheap coins at freescam.com !!!", reason: "Spam", time: "22m ago" },
]

export default function FeedAdminPage() {
  return (
    <div className="max-w-4xl space-y-6">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <MessageSquare className="text-blue-400" /> COMMS_MODERATION
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Review user reports and sanitize public channels.</p>
        </div>

        <div className="space-y-4">
            {REPORTS.map((report) => (
                <div key={report.id} className="bg-black/60 border border-white/10 p-6 rounded-xl backdrop-blur-md">
                     <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-3">
                             <Avatar className="w-10 h-10 border border-white/10">
                                 <AvatarFallback className="bg-red-900 text-red-200">!</AvatarFallback>
                             </Avatar>
                             <div>
                                 <div className="font-bold text-white flex items-center gap-2">
                                     {report.user} 
                                     <span className="text-xs font-normal text-muted-foreground font-mono">({report.time})</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-xs text-red-400 font-bold uppercase mt-1">
                                     <Flag className="w-3 h-3" /> Reported for: {report.reason}
                                 </div>
                             </div>
                         </div>
                         <div className="flex gap-2">
                             <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-white"><Eye className="w-4 h-4" /></Button>
                         </div>
                     </div>

                     <div className="bg-white/5 p-4 rounded mb-4 text-sm text-gray-300 italic">
                         "{report.content}"
                     </div>

                     <div className="flex justify-end gap-3">
                         <Button variant="outline" className="border-white/10 hover:bg-white/10 text-xs">
                             <Check className="w-3 h-3 mr-2" /> Dismiss
                         </Button>
                         <Button variant="ghost" className="hover:bg-red-500/10 text-red-400 hover:text-red-500 text-xs">
                             <Trash2 className="w-3 h-3 mr-2" /> Delete Post
                         </Button>
                         <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-xs font-bold">
                             <Ban className="w-3 h-3 mr-2" /> Ban User
                         </Button>
                     </div>
                </div>
            ))}
            
            {REPORTS.length === 0 && (
                <div className="text-center py-20 text-muted-foreground font-mono">
                    ALL_CHANNELS_CLEAR // NO_ACTIVE_REPORTS
                </div>
            )}
        </div>
    </div>
  )
}
