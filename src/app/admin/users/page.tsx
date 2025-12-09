"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Filter, MoreHorizontal, Shield, ShieldAlert, 
  Coins, Zap, UserX, MessageSquare, History, Trophy, Gavel, 
  CheckCircle, AlertTriangle, X, Users, Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"

// Mock User Data
const USERS = [
  { id: 1, name: "Neo_Anderson", email: "neo@matrix.com", role: "User", xp: 15420, coins: 500, status: "Online", streak: 12, violations: 0, team: "None" },
  { id: 2, name: "Admin_Prime", email: "root@system.com", role: "Super Admin", xp: 99999, coins: 99999, status: "Online", streak: 999, violations: 0, team: "System" },
  { id: 3, name: "Gamer_Kid", email: "kid@game.com", role: "User", xp: 3200, coins: 150, status: "Offline", streak: 3, violations: 1, team: "None" },
  { id: 4, name: "Toxic_Avenger", email: "troll@bridge.com", role: "User", xp: 500, coins: 10, status: "Banned", streak: 0, violations: 5, team: "None" },
  { id: 5, name: "Team_Lead_X", email: "lead@squad.com", role: "Team Leader", xp: 45000, coins: 2300, status: "In-Game", streak: 45, violations: 0, team: "Alpha Squad" },
]

// Mock Teams
const TEAMS = ["Alpha Squad", "Beta Protocol", "Gamma Ray", "Omega Ops"]

// Mock Audit Logs
const MOCK_LOGS = [
    { id: 1, action: "LOGIN", ip: "192.168.1.1", date: "2025-04-10 10:42 AM", details: "Successful login" },
    { id: 2, action: "PURCHASE", ip: "192.168.1.1", date: "2025-04-09 02:15 PM", details: "Bought 'Neon Blade' for 500 coins" },
    { id: 3, action: "MATCH_JOIN", ip: "192.168.1.1", date: "2025-04-08 08:30 PM", details: "Joined Ranked Match #4422" },
]

type ModalType = 'none' | 'promote' | 'balance' | 'audit' | 'ban'

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null)
  const [activeModal, setActiveModal] = useState<ModalType>('none')
  
  // Modal State
  const [targetRole, setTargetRole] = useState("")
  const [targetTeam, setTargetTeam] = useState("")
  const [balanceDetails, setBalanceDetails] = useState({ coins: 0, xp: 0, reason: "" })
  const [banDetails, setBanDetails] = useState({ type: "suspend", reason: "", date: "" })

  const filteredUsers = USERS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openModal = (type: ModalType, user: typeof USERS[0]) => {
      setSelectedUser(user)
      setActiveModal(type)
      
      // Reset States
      setTargetRole(user.role)
      setTargetTeam(user.team)
      setBalanceDetails({ coins: user.coins, xp: user.xp, reason: "" })
      setBanDetails({ type: "suspend", reason: "", date: "" })
  }

  const handlePromote = () => {
      if (!selectedUser) return
      // API call would go here
      toast.success("Role Updated", { 
          description: `${selectedUser.name} is now ${targetRole} ${targetTeam && targetTeam !== 'None' ? `of ${targetTeam}` : ''}` 
      })
      setActiveModal('none')
  }

  const handleBalanceAdjust = () => {
      if (!balanceDetails.reason) {
          toast.error("Reason is required", { description: "Please specify why you are adjusting balances." })
          return
      }
      toast.success("Balance Updated", { 
          description: `Adjusted stats for ${selectedUser?.name}. Logged: ${balanceDetails.reason}` 
      })
      setActiveModal('none')
  }

  const handleBan = () => {
      if (!banDetails.reason) {
         toast.error("Reason is required", { description: "A reason must be provided for disciplinary actions." })
         return
      }
      if (banDetails.type === 'suspend' && !banDetails.date) {
         toast.error("Date required", { description: "Please select a suspension end date." })
         return
      }
      
      const action = banDetails.type === 'ban' ? 'Permanently Banned' : `Suspended until ${banDetails.date}`
      toast.success("User Punished", { description: `${selectedUser?.name} has been ${action}.` })
      setActiveModal('none')
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
                            {user.team !== "None" && user.team !== "System" && (
                                <div className="text-[10px] text-muted-foreground mt-1 px-1">
                                    {user.team}
                                </div>
                            )}
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
                                    <DropdownMenuItem onClick={() => openModal('promote', user)} className="text-blue-400 focus:bg-blue-500/20 focus:text-blue-300 cursor-pointer">
                                        <Shield className="w-4 h-4 mr-2" /> Promote Role
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openModal('balance', user)} className="text-yellow-400 focus:bg-yellow-500/20 focus:text-yellow-300 cursor-pointer">
                                        <Coins className="w-4 h-4 mr-2" /> Adjust Balance
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openModal('audit', user)} className="focus:bg-white/10 cursor-pointer">
                                        <History className="w-4 h-4 mr-2" /> View Audit Logs
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem 
                                        className="text-red-500 focus:bg-red-500/20 focus:text-red-400 cursor-pointer"
                                        onClick={() => openModal('ban', user)}
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

      {/* 1. Promote Role Dialog */}
      <Dialog open={activeModal === 'promote'} onOpenChange={(val) => !val && setActiveModal('none')}>
        <DialogContent className="bg-black/90 border-blue-500/20 text-white backdrop-blur-xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-blue-400"><Shield className="w-5 h-5" /> Manage Roles</DialogTitle>
                <DialogDescription>Modify permissions for {selectedUser?.name}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label>Role</Label>
                    <Select value={targetRole} onValueChange={setTargetRole}>
                        <SelectTrigger className="bg-black/50 border-white/10 text-white"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black border-white/10 text-white">
                            <SelectItem value="Super Admin">Super Admin (God Mode)</SelectItem>
                            <SelectItem value="User">Standard User</SelectItem>
                            <SelectItem value="Team Leader">Team Leader</SelectItem>
                            <SelectItem value="Team Member">Team Member</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {(targetRole === "Team Leader" || targetRole === "Team Member") && (
                    <div className="grid gap-2">
                        <Label>Assign Team</Label>
                        <Select value={targetTeam} onValueChange={setTargetTeam}>
                            <SelectTrigger className="bg-black/50 border-white/10 text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-black border-white/10 text-white">
                                {TEAMS.map(team => (
                                    <SelectItem key={team} value={team}>{team}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setActiveModal('none')}>Cancel</Button>
                <Button onClick={handlePromote} className="bg-blue-600 hover:bg-blue-700">Update Role</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Adjust Balance Dialog */}
      <Dialog open={activeModal === 'balance'} onOpenChange={(val) => !val && setActiveModal('none')}>
        <DialogContent className="bg-black/90 border-yellow-500/20 text-white backdrop-blur-xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-yellow-400"><Coins className="w-5 h-5" /> Adjust Balance</DialogTitle>
                <DialogDescription>Manually edit assets for {selectedUser?.name}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Coins Balance</Label>
                        <div className="relative">
                            <Coins className="absolute left-2 top-2.5 h-4 w-4 text-yellow-500" />
                            <Input 
                                type="number" 
                                className="pl-8 bg-black/50 border-white/10" 
                                value={balanceDetails.coins} 
                                onChange={(e) => setBalanceDetails({...balanceDetails, coins: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>XP Points</Label>
                        <div className="relative">
                            <Zap className="absolute left-2 top-2.5 h-4 w-4 text-purple-500" />
                            <Input 
                                type="number" 
                                className="pl-8 bg-black/50 border-white/10" 
                                value={balanceDetails.xp} 
                                onChange={(e) => setBalanceDetails({...balanceDetails, xp: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-red-400">Reason (Required)</Label>
                    <Textarea 
                        placeholder="Why are you changing these values?" 
                        className="bg-black/50 border-white/10 min-h-[80px]" 
                        value={balanceDetails.reason}
                        onChange={(e) => setBalanceDetails({...balanceDetails, reason: e.target.value})}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setActiveModal('none')}>Cancel</Button>
                <Button onClick={handleBalanceAdjust} className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold">Save Changes</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Audit Logs Dialog */}
      <Dialog open={activeModal === 'audit'} onOpenChange={(val) => !val && setActiveModal('none')}>
        <DialogContent className="bg-black/90 border-white/10 text-white backdrop-blur-xl sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><History className="w-5 h-5" /> Audit Log: {selectedUser?.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
                <div className="bg-black/50 rounded-lg border border-white/10 overflow-hidden font-mono text-xs">
                    <table className="w-full">
                        <thead className="bg-white/5 text-muted-foreground border-b border-white/10">
                            <tr>
                                <th className="px-3 py-2 text-left">Action</th>
                                <th className="px-3 py-2 text-left">Date</th>
                                <th className="px-3 py-2 text-left">IP Address</th>
                                <th className="px-3 py-2 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_LOGS.map((log) => (
                                <tr key={log.id}>
                                    <td className="px-3 py-2 text-blue-400">{log.action}</td>
                                    <td className="px-3 py-2 text-muted-foreground">{log.date}</td>
                                    <td className="px-3 py-2 text-muted-foreground">{log.ip}</td>
                                    <td className="px-3 py-2">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DialogContent>
      </Dialog>

      {/* 4. Ban/Suspend Dialog */}
      <Dialog open={activeModal === 'ban'} onOpenChange={(val) => !val && setActiveModal('none')}>
          <DialogContent className="bg-black/90 border-red-500/20 backdrop-blur-xl sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle className="text-red-500 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> DISCIPLINARY ACTION
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                        Select action for <span className="text-white font-bold">{selectedUser?.name}</span>.
                  </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="suspend" className="w-full" onValueChange={(v) => setBanDetails({...banDetails, type: v})}>
                  <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-white/10">
                      <TabsTrigger value="suspend">Temporary Suspend</TabsTrigger>
                      <TabsTrigger value="ban" className="text-red-400 data-[state=active]:bg-red-500/20">Permanent Ban</TabsTrigger>
                  </TabsList>
                  
                  <div className="py-4 space-y-4">
                      {banDetails.type === 'suspend' && (
                          <div className="space-y-2">
                              <Label>Suspend Until</Label>
                              <div className="relative">
                                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input 
                                    type="date"
                                    className="pl-9 bg-black/50 border-white/10 text-white [color-scheme:dark]" 
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setBanDetails({...banDetails, date: e.target.value})}
                                  />
                              </div>
                          </div>
                      )}
                      
                      <div className="space-y-2">
                           <Label className="text-red-400">Reason (Required)</Label>
                           <Textarea 
                                placeholder="Explain violation (e.g. Harassment, Cheating, Botting)" 
                                className="bg-black/50 border-white/10 min-h-[80px]" 
                                onChange={(e) => setBanDetails({...banDetails, reason: e.target.value})}
                           />
                      </div>
                  </div>
              </Tabs>
              
              <DialogFooter>
                  <Button variant="ghost" onClick={() => setActiveModal('none')}>Cancel</Button>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleBan}>
                      <Gavel className="w-4 h-4 mr-2" /> Execute Judgment
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  )
}
