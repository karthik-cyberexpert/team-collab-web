"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Filter, MoreHorizontal, Shield, ShieldAlert, 
  Coins, Zap, UserX, MessageSquare, History, Trophy, Gavel, 
  CheckCircle, AlertTriangle, X, Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock User Data
const USERS = [
  { id: 1, name: "Neo_Anderson", email: "neo@matrix.com", role: "User", xp: 15420, coins: 500, status: "Online", streak: 12, violations: 0 },
  { id: 2, name: "Admin_Prime", email: "root@system.com", role: "Super Admin", xp: 99999, coins: 99999, status: "Online", streak: 999, violations: 0 },
  { id: 3, name: "Gamer_Kid", email: "kid@game.com", role: "User", xp: 3200, coins: 150, status: "Offline", streak: 3, violations: 1 },
  { id: 4, name: "Toxic_Avenger", email: "troll@bridge.com", role: "User", xp: 500, coins: 10, status: "Banned", streak: 0, violations: 5 },
  { id: 5, name: "Team_Lead_X", email: "lead@squad.com", role: "Team Leader", xp: 45000, coins: 2300, status: "In-Game", streak: 45, violations: 0 },
]

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null)
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Filter Logic
  const filteredUsers = USERS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBanUser = () => {
      // API Call to ban user would go here
      console.log("Banning user:", selectedUser?.name)
      setIsBanDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Users className="text-blue-400" /> USER_DATABASE
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Manage access, roles, and discipline.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search query..." 
                    className="pl-8 bg-black/50 border-white/10 font-mono text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <Button variant="outline" className="border-white/10 bg-black/50 hover:bg-white/10">
                <Filter className="h-4 w-4 mr-2" /> Filters
             </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-white/10 bg-black/60 backdrop-blur overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-white/5 font-mono text-muted-foreground uppercase text-xs">
                <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Stats</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                    <motion.tr 
                        key={user.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/5 transition-colors group"
                    >
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 font-bold text-xs">
                                    {user.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{user.name}</div>
                                    <div className="text-xs text-muted-foreground font-mono">{user.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <Badge variant="outline" className={`
                                ${user.role === 'Super Admin' ? 'border-red-500 text-red-400 bg-red-500/10' : 
                                  user.role === 'Team Leader' ? 'border-purple-500 text-purple-400 bg-purple-500/10' : 
                                  'border-blue-500 text-blue-400 bg-blue-500/10'} font-mono uppercase text-[10px] tracking-wider
                            `}>
                                {user.role}
                            </Badge>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex gap-4 font-mono text-xs">
                                <span className="flex items-center gap-1 text-yellow-400" title="Coins">
                                    <Coins className="w-3 h-3" /> {user.coins}
                                </span>
                                <span className="flex items-center gap-1 text-purple-400" title="XP">
                                    <Zap className="w-3 h-3" /> {user.xp}
                                </span>
                                {user.violations > 0 && (
                                    <span className="flex items-center gap-1 text-red-500 font-bold" title="Violations">
                                        <AlertTriangle className="w-3 h-3" /> {user.violations}
                                    </span>
                                )}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <div className={`w-2 h-2 rounded-full ${
                                    user.status === 'Online' ? 'bg-green-500 animate-pulse' : 
                                    user.status === 'In-Game' ? 'bg-purple-500 animate-pulse' :
                                    user.status === 'Banned' ? 'bg-red-500' : 'bg-gray-500'
                                }`} />
                                <span className={`
                                    ${user.status === 'Banned' ? 'text-red-500 font-bold line-through' : 'text-muted-foreground'}
                                `}>
                                    {user.status}
                                </span>
                            </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-black/90 border-white/10 backdrop-blur-xl">
                                    <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="text-blue-400 focus:bg-blue-500/20 focus:text-blue-300 cursor-pointer">
                                        <Shield className="w-4 h-4 mr-2" /> Promote Role
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-yellow-400 focus:bg-yellow-500/20 focus:text-yellow-300 cursor-pointer">
                                        <Coins className="w-4 h-4 mr-2" /> Adjust Balance
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <History className="w-4 h-4 mr-2" /> View Audit Logs
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem 
                                        className="text-red-500 focus:bg-red-500/20 focus:text-red-400 cursor-pointer"
                                        onClick={() => {
                                            setSelectedUser(user)
                                            setIsBanDialogOpen(true)
                                        }}
                                    >
                                        <Gavel className="w-4 h-4 mr-2" /> Ban / Suspend
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>
                        </td>
                    </motion.tr>
                ))}
            </tbody>
         </table>
      </div>

      {/* Ban Confirmation Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
          <DialogContent className="bg-black/90 border-red-500/20 backdrop-blur-xl sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle className="text-red-500 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> CONFIRM PUNISHMENT
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                        You are about to take disciplinary action against <span className="text-white font-bold">{selectedUser?.name}</span>. 
                        This action will be logged in the immutable audit ledger.
                  </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                  <div className="space-y-2">
                       <label className="text-xs font-mono text-muted-foreground uppercase">Reason for Ban</label>
                       <Input placeholder="e.g. Hate speech, cheating, botting..." className="bg-black/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                       <label className="text-xs font-mono text-muted-foreground uppercase">Duration</label>
                       <div className="flex gap-2">
                           {["1 Hour", "24 Hours", "7 Days", "Permanent"].map((dur) => (
                               <Badge key={dur} variant="outline" className="cursor-pointer hover:bg-red-500/20 hover:border-red-500/50 transition-colors">
                                   {dur}
                               </Badge>
                           ))}
                       </div>
                  </div>
              </div>
              <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsBanDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleBanUser}>
                      <Gavel className="w-4 h-4 mr-2" /> Execute Ban
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  )
}
