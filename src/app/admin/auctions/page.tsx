"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Gavel, Timer, ArrowUp, AlertCircle, Ban, History, 
  DollarSign, Trophy, Search, Filter 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Mock Auctions
const AUCTIONS = [
  { id: 1, item: "Golden Keyboard", seller: "CodeNinja", currentBid: 5400, bids: 12, endsIn: "05:30", status: "Live" },
  { id: 2, item: "DevRel Job Offer", seller: "TechCorp", currentBid: 12000, bids: 45, endsIn: "01:20", status: "Hot" },
  { id: 3, item: "Legacy Codebase", seller: "JuniorDev", currentBid: 50, bids: 2, endsIn: "12:00", status: "Stagnant" },
]

export default function AuctionsAdminPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                <Gavel className="text-amber-400" /> AUCTION_HOUSE_OPS
            </h1>
            <p className="text-sm text-muted-foreground font-mono">Monitor real-time bidding wars and resolve disputes.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 hover:bg-white/10">
                <History className="w-4 h-4 mr-2" /> Transaction Log
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                <Ban className="w-4 h-4 mr-2" /> Freeze Market
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Feed */}
          <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search items or sellers..." className="pl-9 bg-black/60 border-white/10" />
                  </div>
                  <Button size="icon" variant="outline" className="border-white/10"><Filter className="w-4 h-4" /></Button>
              </div>

              {AUCTIONS.map((auction) => (
                  <motion.div
                      key={auction.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01 }}
                      className={`
                          group relative p-4 rounded-xl border bg-black/60 backdrop-blur-md flex items-center justify-between
                          ${auction.status === 'Hot' ? 'border-red-500/50 shadow-[0_0_15px_-5px_theme(colors.red.500)]' : 'border-white/10'}
                      `}
                  >
                        {auction.status === 'Hot' && (
                            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border border-red-400">
                                HOT
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                                 <Trophy className="w-6 h-6 text-amber-500" />
                             </div>
                             <div>
                                 <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">{auction.item}</h3>
                                 <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                                     <span>Seller: <span className="text-white">{auction.seller}</span></span>
                                     <span className="w-1 h-1 bg-white/20 rounded-full" />
                                     <span className="flex items-center text-amber-400"><ArrowUp className="w-3 h-3 mr-1" /> {auction.bids} Bids</span>
                                 </div>
                             </div>
                        </div>

                        <div className="flex items-center gap-6">
                             <div className="text-right">
                                 <div className="text-2xl font-bold font-mono text-green-400 flex items-center justify-end">
                                     <DollarSign className="w-4 h-4" /> {auction.currentBid.toLocaleString()}
                                 </div>
                                 <div className="text-xs text-muted-foreground font-mono flex items-center justify-end gap-1">
                                     <Timer className="w-3 h-3" /> {auction.endsIn}
                                 </div>
                             </div>
                             <Button size="sm" variant="destructive" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                 Force Close
                             </Button>
                        </div>
                  </motion.div>
              ))}
          </div>

          {/* Market Stats */}
          <div className="space-y-6">
               <Card className="bg-black/60 border-white/10">
                   <CardHeader>
                       <CardTitle className="text-sm font-mono uppercase text-muted-foreground">Market Pulse</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                       <div className="flex items-center justify-between">
                           <span className="text-sm">Total Volume (24h)</span>
                           <span className="font-mono text-green-400 font-bold">1.2M 🪙</span>
                       </div>
                       <div className="flex items-center justify-between">
                           <span className="text-sm">Active Listings</span>
                           <span className="font-mono font-bold">142</span>
                       </div>
                       <div className="h-px bg-white/10" />
                       <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                           <div className="flex items-center gap-2 text-amber-500 mb-1">
                               <AlertCircle className="w-4 h-4" />
                               <span className="font-bold text-xs uppercase">Suspicious Bid</span>
                           </div>
                           <p className="text-xs text-muted-foreground">
                               User <span className="text-white">CryptoKing</span> bid 500k on a common item.
                           </p>
                           <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs border-amber-500/30 hover:bg-amber-500/20 text-amber-500">
                               Investigate
                           </Button>
                       </div>
                   </CardContent>
               </Card>
          </div>
      </div>
    </div>
  )
}
