"use client"

import { Settings, Save, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Settings className="text-gray-400" /> SYSTEM_CONFIG
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Global platform settings and unauthorized access protocols.</p>
        </div>

        <div className="space-y-6 bg-black/60 border border-white/10 p-6 rounded-xl backdrop-blur-md">
            <h3 className="font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Emergency Controls
            </h3>
            <div className="flex items-center justify-between p-4 border border-red-500/20 bg-red-500/5 rounded-lg">
                <div>
                    <div className="font-bold text-red-400">Maintenance Mode</div>
                    <div className="text-xs text-muted-foreground">Force disconnect all non-admin users.</div>
                </div>
                <Switch />
            </div>
             <div className="flex items-center justify-between p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-lg">
                <div>
                    <div className="font-bold text-yellow-400">Halt Economy</div>
                    <div className="text-xs text-muted-foreground">Freeze all transactions and store purchases.</div>
                </div>
                <Switch />
            </div>
        </div>
        
        <div className="space-y-6 bg-black/60 border border-white/10 p-6 rounded-xl backdrop-blur-md">
             <h3 className="font-bold text-white">Platform Parameters</h3>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                     <label className="text-xs font-mono uppercase text-muted-foreground">Global XP Multiplier</label>
                     <Input placeholder="1.0" className="bg-black/50 border-white/10" />
                 </div>
                  <div className="space-y-2">
                     <label className="text-xs font-mono uppercase text-muted-foreground">Max Team Size</label>
                     <Input placeholder="5" className="bg-black/50 border-white/10" />
                 </div>
             </div>
             <Button className="w-full bg-white/10 hover:bg-white/20">
                 <Save className="w-4 h-4 mr-2" /> Save Configuration
             </Button>
        </div>
    </div>
  )
}
