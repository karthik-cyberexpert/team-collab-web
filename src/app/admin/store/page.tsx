"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShoppingBag, Plus, Sparkles, Box, Upload, Save, 
  RotateCcw, Eye, DollarSign, Tag, Archive, Clock, RefreshCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Mock Store Items
const ITEMS = [
  { id: 1, name: "Cyber Katana", type: "Weapon Skin", rarity: "Legendary", price: 2500, status: "Active" },
  { id: 2, name: "Neon Visor", type: "Avatar Frame", rarity: "Rare", price: 800, status: "Active" },
  { id: 3, name: "Void Aura", type: "Effect", rarity: "Epic", price: 1500, status: "Vaulted" },
  { id: 4, name: "Glitch Title", type: "Title", rarity: "Common", price: 200, status: "Active" },
]

export default function StoreAdminPage() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [selectedItem, setSelectedItem] = useState<typeof ITEMS[0] | null>(null)
  
  // New Item State (Mock)
  const [previewColor, setPreviewColor] = useState("#a855f7")
  const [previewRotation, setPreviewRotation] = useState(0)

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <ShoppingBag className="text-amber-400" /> ECONOMY_CONTROL
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Manage virtual assets, inflation, and black market deals.</p>
        </div>
        <div className="flex gap-2">
             <Button 
                onClick={() => setActiveTab("create")} 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
             >
                <Plus className="h-4 w-4 mr-2" /> New Item
             </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/50 border border-white/10 p-1">
              <TabsTrigger value="inventory" className="data-[state=active]:bg-white/10 data-[state=active]:text-amber-400 font-mono">Inventory</TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-white/10 data-[state=active]:text-green-400 font-mono">Item Editor</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10 data-[state=active]:text-blue-400 font-mono">Sales Data</TabsTrigger>
          </TabsList>

          {/* INVENTORY TAB */}
          <TabsContent value="inventory">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ITEMS.map((item) => (
                      <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`
                            border rounded-xl p-4 relative group overflow-hidden bg-black/60 backdrop-blur-sm
                            ${item.rarity === 'Legendary' ? 'border-amber-500/50' : 
                              item.rarity === 'Epic' ? 'border-purple-500/50' : 
                              item.rarity === 'Rare' ? 'border-blue-500/50' : 'border-white/10'}
                          `}
                      >
                           <div className="absolute top-2 right-2 flex gap-1">
                               <Badge variant="outline" className={`font-mono text-[10px] uppercase
                                    ${item.rarity === 'Legendary' ? 'text-amber-400 border-amber-500/50' : 
                                      item.rarity === 'Epic' ? 'text-purple-400 border-purple-500/50' : 
                                      item.rarity === 'Rare' ? 'text-blue-400 border-blue-500/50' : 'text-gray-400 border-gray-500/50'}
                               `}>
                                   {item.rarity}
                               </Badge>
                           </div>

                           <div className="h-32 mb-4 rounded bg-white/5 flex items-center justify-center relative">
                               <Box className={`w-12 h-12 opacity-50
                                    ${item.rarity === 'Legendary' ? 'text-amber-400' : 'text-white'}
                               `} />
                               {item.status === 'Vaulted' && (
                                   <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                                       <Archive className="w-8 h-8 text-muted-foreground" />
                                   </div>
                               )}
                           </div>

                           <h3 className="font-bold text-white">{item.name}</h3>
                           <p className="text-xs text-muted-foreground font-mono mb-3">{item.type}</p>

                           <div className="flex items-center justify-between text-sm">
                               <span className="text-yellow-400 font-mono font-bold flex items-center gap-1">
                                   <DollarSign className="w-3 h-3" /> {item.price}
                               </span>
                               <Button size="sm" variant="ghost" className="h-6 text-xs hover:bg-white/10">Edit</Button>
                           </div>
                      </motion.div>
                  ))}
              </div>
          </TabsContent>

          {/* CREATE TAB */}
          <TabsContent value="create" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Side */}
              <Card className="lg:col-span-2 bg-black/60 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                             <Upload className="w-5 h-5 text-green-400" /> Create New Asset
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                 <label className="text-xs text-muted-foreground font-mono uppercase">Asset Name</label>
                                 <Input placeholder="e.g. Quantum Sword" className="bg-black/50 border-white/10" />
                             </div>
                             <div className="space-y-2">
                                 <label className="text-xs text-muted-foreground font-mono uppercase">Category</label>
                                 <Select>
                                      <SelectTrigger className="bg-black/50 border-white/10">
                                          <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-black border-white/10">
                                          <SelectItem value="weapon">Weapon Skin</SelectItem>
                                          <SelectItem value="frame">Avatar Frame</SelectItem>
                                          <SelectItem value="badge">Badge</SelectItem>
                                          <SelectItem value="title">Title</SelectItem>
                                      </SelectContent>
                                 </Select>
                             </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-xs text-muted-foreground font-mono uppercase">Description</label>
                             <Textarea placeholder="Lore text or description..." className="bg-black/50 border-white/10 min-h-[100px]" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                 <label className="text-xs text-muted-foreground font-mono uppercase">Rarity Tier</label>
                                 <Select>
                                      <SelectTrigger className="bg-black/50 border-white/10">
                                          <SelectValue placeholder="Common" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-black border-white/10">
                                          <SelectItem value="common" className="text-gray-400">Common</SelectItem>
                                          <SelectItem value="rare" className="text-blue-400">Rare</SelectItem>
                                          <SelectItem value="epic" className="text-purple-400">Epic</SelectItem>
                                          <SelectItem value="legendary" className="text-amber-400">Legendary</SelectItem>
                                      </SelectContent>
                                 </Select>
                             </div>
                             <div className="space-y-2">
                                 <label className="text-xs text-muted-foreground font-mono uppercase">Price (Coins)</label>
                                 <div className="relative">
                                     <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-yellow-500" />
                                     <Input type="number" placeholder="500" className="pl-9 bg-black/50 border-white/10" />
                                 </div>
                             </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-white/5 rounded bg-white/5">
                             <div className="flex items-center gap-3">
                                  <Clock className="w-5 h-5 text-pink-400" />
                                  <div>
                                      <div className="font-bold text-sm">Limited Time Offer</div>
                                      <div className="text-xs text-muted-foreground">Item expires or vaults automatically</div>
                                  </div>
                             </div>
                             <Switch />
                        </div>

                        <div className="pt-4 flex gap-4">
                             <Button className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold">
                                 <Save className="w-4 h-4 mr-2" /> Publish to Store
                             </Button>
                             <Button variant="outline" className="border-white/10 hover:bg-white/10">
                                 Save Draft
                             </Button>
                        </div>
                    </CardContent>
              </Card>

              {/* Preview Side */}
              <div className="space-y-6">
                   <div className="border border-white/10 bg-black/60 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-[400px]">
                        <div className="absolute top-2 left-2 text-xs font-mono text-muted-foreground">PREVIEW_VIEWPORT_3D</div>
                        
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
                        
                        {/* Mock 3D Object */}
                        <motion.div 
                            className="w-32 h-32 relative preserve-3d"
                            style={{ 
                                rotateY: previewRotation, 
                                rotateX: 15 
                            }}
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute inset-0 border-2 border-white/30 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-sm" style={{ boxShadow: `0 0 30px ${previewColor}` }}>
                                <Box className="w-16 h-16 text-white" />
                            </div>
                        </motion.div>

                        <div className="absolute bottom-6 w-full px-6">
                            <label className="text-xs font-mono text-muted-foreground mb-2 block">Rotation Control</label>
                            <div className="flex gap-2 justify-center">
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10" onClick={() => setPreviewRotation(prev => prev - 45)}><RotateCcw className="w-3 h-3" /></Button>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10" onClick={() => setPreviewRotation(prev => prev + 45)}><RefreshCcw className="w-3 h-3" /></Button>
                            </div>
                        </div>
                   </div>

                   <Card className="bg-black/60 border-white/10">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Base Price</span>
                                <span className="font-mono">500</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Mkt. Tax</span>
                                <span className="font-mono text-red-400">12%</span>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex justify-between font-bold text-green-400">
                                <span>Est. Profit</span>
                                <span>440 / unit</span>
                            </div>
                        </CardContent>
                   </Card>
              </div>
          </TabsContent>
      </Tabs>
    </div>
  )
}
