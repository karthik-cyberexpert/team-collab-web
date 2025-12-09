"use client"

import { useState } from "react"
import { useStore, Auction } from "@/lib/store"
import { toast } from "sonner"
import { Plus, Gavel, Timer, TrendingUp, Coins } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AuctionsPage() {
    const { auctions, addAuction, user, placeBid } = useStore()
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        startingBid: '100',
        durationDays: '3'
    })

    const handleCreateAuction = () => {
        if (!formData.title) {
            toast.error("Item name required")
            return
        }

        const endTime = new Date()
        endTime.setDate(endTime.getDate() + parseInt(formData.durationDays))

        const newAuction: Auction = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.title,
            seller: user.name,
            startingBid: parseInt(formData.startingBid),
            currentBid: parseInt(formData.startingBid),
            endTime: endTime.toISOString(),
            bids: 0
        }

        addAuction(newAuction)
        toast.success("Auction Created", { description: "Your item is now live on the marketplace." })
        setIsCreateOpen(false)
    }

    const handleBid = (auction: Auction) => {
        const minBid = auction.currentBid + 50
        if (user.coins < minBid) {
            toast.error("Insufficient Funds", { description: "You need more coins to place this bid." })
            return
        }
        // In a real app we would deduct coins here or hold them
        placeBid(auction.id, user.name, minBid)
        toast.success("Bid Placed", { description: `You are winning! New price: ${minBid}` })
    }

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                        Black Market Auctions
                    </h1>
                    <p className="text-muted-foreground">Bid on rare artifacts, schematics, and upgrades.</p>
                </div>
                
                <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-yellow-600 hover:bg-yellow-700 text-black font-bold">
                    <Plus className="h-4 w-4" /> Create Auction
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {auctions.map(auction => (
                    <AuctionCard key={auction.id} auction={auction} onBid={() => handleBid(auction)} />
                ))}
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="bg-neutral-900 border-yellow-500/20 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-yellow-500">
                            <Gavel className="w-5 h-5" /> List New Item
                        </DialogTitle>
                        <DialogDescription>
                            Set the opening price and duration for your auction.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Item Name</Label>
                            <Input 
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="e.g. Prototype Chipset"
                                className="bg-black/50 border-white/10"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Starting Bid (Coins)</Label>
                                <Input 
                                    type="number"
                                    value={formData.startingBid}
                                    onChange={(e) => setFormData({...formData, startingBid: e.target.value})}
                                    className="bg-black/50 border-white/10"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Duration (Days)</Label>
                                <Input 
                                    type="number"
                                    value={formData.durationDays}
                                    onChange={(e) => setFormData({...formData, durationDays: e.target.value})}
                                    className="bg-black/50 border-white/10"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateAuction} className="bg-yellow-600 hover:bg-yellow-700 text-black">
                            Start Auction
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function AuctionCard({ auction, onBid }: { auction: Auction, onBid: () => void }) {
    const timeLeft = new Date(auction.endTime).getTime() - new Date().getTime()
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
    const isEndingSoon = hoursLeft < 24

    return (
        <Card className="group border-white/5 bg-card/40 hover:bg-card hover:border-yellow-500/50 transition-all duration-300">
            <CardHeader className="p-4 space-y-2">
                <div className="aspect-video w-full rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center border border-white/5 group-hover:border-yellow-500/20">
                    <Coins className="w-12 h-12 text-yellow-600/50 group-hover:text-yellow-500 transition-colors" />
                </div>
                <div className="flex justify-between items-start pt-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-yellow-400 transition-colors">{auction.title}</CardTitle>
                    <Badge variant={isEndingSoon ? "destructive" : "secondary"} className="text-[10px]">
                        {hoursLeft > 0 ? `${hoursLeft}h left` : 'Ended'}
                    </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Seller: <span className="text-white">{auction.seller}</span></p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Current Bid</p>
                        <p className="text-xl font-bold text-yellow-500">{auction.currentBid.toLocaleString()} <span className="text-xs">c</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Bids</p>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            {auction.bids}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-white/5 hover:bg-yellow-500 hover:text-black border border-white/10" onClick={onBid}>
                    Place Bid ({auction.currentBid + 50}c)
                </Button>
            </CardFooter>
        </Card>
    )
}
