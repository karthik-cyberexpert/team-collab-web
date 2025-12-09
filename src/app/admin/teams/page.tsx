"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Shield, Users, Trophy, AlertTriangle, 
  Ban, Crown, RefreshCcw, Coins, Zap, Trash2, ArrowRightLeft
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

// Mock Team Data
const TEAMS = [
  { id: 1, name: "NullPointers", leader: "Neo_Anderson", members: 4, xp: 45000, coins: 1200, status: "Active", rank: 1 },
  { id: 2, name: "Cyber_Samurai", leader: "Ghost_Dog", members: 3, xp: 32000, coins: 800, status: "Active", rank: 2 },
  { id: 3, name: "Script_Kiddies", leader: "NoobMaster", members: 5, xp: 12000, coins: 150, status: "Flagged", rank: 5 },
  { id: 4, name: "Bot_Farm_99", leader: "AutoBot", members: 10, xp: 999999, coins: 50000, status: "Frozen", rank: 0 },
]

export default function TeamManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<typeof TEAMS[0] | null>(null)
  const [isDissolveDialogOpen, setIsDissolveDialogOpen] = useState(false)

  const filteredTeams = TEAMS.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.leader.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDissolveTeam = () => {
      console.log("Dissolving team:", selectedTeam?.name)
      setIsDissolveDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Shield className="text-indigo-400" /> TEAM_OPERATIONS
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Monitor factions, manage alliances, and enforce fair play.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search teams or leaders..." 
                    className="pl-8 bg-black/50 border-white/10 font-mono text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                className={`
                    relative group rounded-xl border bg-black/60 backdrop-blur-md overflow-hidden transition-colors
                    ${team.status === 'Frozen' ? 'border-blue-500/50 hover:border-blue-500' : 
                      team.status === 'Flagged' ? 'border-yellow-500/50 hover:border-yellow-500' : 'border-white/10 hover:border-indigo-500/50'}
                `}
              >
                  {/* Status Strip */}
                  {team.status !== 'Active' && (
                      <div className={`absolute top-0 right-0 px-3 py-10 origin-top-right rotate-45 translate-x-[30%] -translate-y-[40%] text-[10px] font-bold uppercase tracking-wider text-center text-white
                        ${team.status === 'Frozen' ? 'bg-blue-600 w-32' : 'bg-yellow-600 w-32'}
                      `}>
                          {team.status}
                      </div>
                  )}

                  <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                          <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                              <Shield className="w-6 h-6 text-indigo-400" />
                          </div>
                          <Badge variant="outline" className="font-mono text-xs border-white/10">
                              RANK #{team.rank > 0 ? team.rank : 'N/A'}
                          </Badge>
                      </div>

                      <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{team.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Crown className="w-3 h-3 text-yellow-500" />
                              <span className="text-white">{team.leader}</span>
                          </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/5">
                          <div className="text-center">
                              <div className="text-xs text-muted-foreground uppercase mb-1">Members</div>
                              <div className="font-mono text-lg font-bold flex items-center justify-center gap-1">
                                  <Users className="w-3 h-3 text-blue-400" /> {team.members}
                              </div>
                          </div>
                          <div className="text-center border-l border-white/5">
                              <div className="text-xs text-muted-foreground uppercase mb-1">XP</div>
                              <div className="font-mono text-lg font-bold flex items-center justify-center gap-1 text-purple-400">
                                  {team.xp}
                              </div>
                          </div>
                          <div className="text-center border-l border-white/5">
                              <div className="text-xs text-muted-foreground uppercase mb-1">Treasury</div>
                              <div className="font-mono text-lg font-bold flex items-center justify-center gap-1 text-yellow-400">
                                  {team.coins}
                              </div>
                          </div>
                      </div>

                      <div className="flex gap-2">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10" variant="outline">
                                        Manage Team
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-black/90 border-white/10 backdrop-blur-xl">
                                    <DropdownMenuLabel>Actions for {team.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                        <ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer Leadership
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-blue-400 focus:bg-blue-500/20 focus:text-blue-300 cursor-pointer">
                                        <RefreshCcw className="w-4 h-4 mr-2" /> Reset Stats
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem 
                                        className="text-red-500 focus:bg-red-500/20 focus:text-red-400 cursor-pointer"
                                        onClick={() => {
                                            setSelectedTeam(team)
                                            setIsDissolveDialogOpen(true)
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> Force Dissolve
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                           </DropdownMenu>
                      </div>
                  </div>
              </motion.div>
          ))}
      </div>

       {/* Dissolve Confirmation Dialog */}
       <Dialog open={isDissolveDialogOpen} onOpenChange={setIsDissolveDialogOpen}>
          <DialogContent className="bg-black/90 border-red-500/20 backdrop-blur-xl sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle className="text-red-500 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> DANGER ZONE: DISSOLVE TEAM
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                        You are about to permanently delete <span className="text-white font-bold">{selectedTeam?.name}</span>.
                        <br/><br/>
                        • All {selectedTeam?.members} members will be returned to 'Solo' status.
                        <br/>
                        • {selectedTeam?.coins} coins and {selectedTeam?.xp} XP in the team treasury will be <span className="text-red-400 font-bold">burned</span>.
                        <br/>
                        • This action cannot be undone.
                  </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                  <label className="text-xs font-mono text-muted-foreground uppercase">Authorization Code</label>
                  <Input placeholder="Type 'DELETE-FACTION' to confirm" className="mt-2 bg-black/50 border-red-500/30 text-red-400 placeholder:text-red-500/20" />
              </div>
              <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsDissolveDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleDissolveTeam}>
                      <Trash2 className="w-4 h-4 mr-2" /> Disband Faction
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  )
}
