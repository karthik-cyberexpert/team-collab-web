"use client"

import { Star, GitBranch, Plus, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const SKILLS = [
  { name: "Frontend Architecture", users: 120, tier: "Legendary" },
  { name: "System Design", users: 85, tier: "Epic" },
  { name: "React Hooks", users: 450, tier: "Rare" },
]

export default function SkillsAdminPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                    <Star className="text-violet-400" /> SKILL_MATRIX_DB
                </h1>
                <p className="text-sm text-muted-foreground font-mono">Manage skill taxonomy and endorsement weights.</p>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700 font-bold">
                <Plus className="h-4 w-4 mr-2" /> Add Skill Node
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {SKILLS.map((skill, i) => (
                 <div key={i} className="p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex flex-col justify-between h-40 relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 p-12 rounded-bl-full bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none`} />
                      
                      <div>
                          <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                          <div className="text-xs text-muted-foreground font-mono mt-1">{skill.users} Endorsements</div>
                      </div>

                      <div className="flex justify-between items-end">
                          <span className={`text-xs font-bold uppercase
                              ${skill.tier === 'Legendary' ? 'text-amber-400' : 
                                skill.tier === 'Epic' ? 'text-purple-400' : 'text-blue-400'}
                          `}>
                              {skill.tier} Tier
                          </span>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white/10"><GitBranch className="w-4 h-4" /></Button>
                      </div>
                 </div>
             ))}
        </div>
    </div>
  )
}
