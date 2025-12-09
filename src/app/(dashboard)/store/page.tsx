"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Zap, Star, Shield, Lock, Check } from "lucide-react"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

const ITEMS = [
    { id: 1, name: "Neon Frame", price: 500, type: "frame", image: "🌈", purchased: false },
    { id: 2, name: "Golden Aura", price: 1000, type: "effect", image: "✨", purchased: false },
    { id: 3, name: "Cyber Background", price: 750, type: "bg", image: "🌆", purchased: false },
    { id: 4, name: "Stealth Mode", price: 2000, type: "perk", image: "🥷", purchased: false },
    { id: 5, name: "XP Booster (1h)", price: 250, type: "consumable", image: "⚡", purchased: false },
    { id: 6, name: "Developer Badge", price: 5000, type: "badge", image: "🛠️", purchased: false },
]

export default function StorePage() {
    const { user, spendCoins } = useStore()

    const handlePurchase = (item: typeof ITEMS[0]) => {
        if (spendCoins(item.price)) {
            toast.success(`Successfully purchased ${item.name}!`)
        } else {
            toast.error("Not enough coins!")
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                    <p className="text-muted-foreground">Spend your hard-earned coins on cosmetics and perks.</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full border border-yellow-500/20">
                    <span className="font-bold text-lg">{user.coins}</span>
                    <span className="text-xs font-semibold uppercase">Coins</span>
                </div>
            </div>

            <Tabs defaultValue="featured" className="w-full">
                <TabsList>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="cosmetics">Cosmetics</TabsTrigger>
                    <TabsTrigger value="boosts">Boosts</TabsTrigger>
                </TabsList>
                <TabsContent value="featured" className="mt-6">
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {ITEMS.map(item => {
                            let rarityColor = "border-border"
                            let glowColor = "shadow-none"
                            let badgeColor = "bg-muted text-muted-foreground"
                            let rarityLabel = "Common"

                            if (item.price >= 2500) {
                                rarityColor = "border-yellow-500/50"
                                glowColor = "hover:shadow-[0_0_30px_-5px_var(--color-yellow-500)]"
                                badgeColor = "bg-yellow-500/20 text-yellow-500"
                                rarityLabel = "Legendary"
                            } else if (item.price >= 1000) {
                                rarityColor = "border-purple-500/50"
                                glowColor = "hover:shadow-[0_0_30px_-5px_var(--color-primary)]"
                                badgeColor = "bg-purple-500/20 text-purple-500"
                                rarityLabel = "Rare"
                            } else {
                                glowColor = "hover:shadow-[0_0_20px_-5px_var(--color-blue-500)]"
                                rarityColor = "hover:border-blue-500/50"
                                badgeColor = "bg-blue-500/20 text-blue-500"
                            }

                            return (
                                <Card key={item.id} className={`relative overflow-hidden group transition-all duration-300 ${rarityColor} ${glowColor}`}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className="capitalize">{item.type}</Badge>
                                            <Badge variant="secondary" className={badgeColor}>{rarityLabel}</Badge>
                                        </div>
                                        <div className="h-32 flex items-center justify-center text-6xl my-4 bg-muted/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                            {item.image}
                                        </div>
                                        <CardTitle className="text-xl">{item.name}</CardTitle>
                                        <CardDescription>A {rarityLabel.toLowerCase()} item for your collection.</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button className="w-full gap-2" onClick={() => handlePurchase(item)}>
                                            <ShoppingCart className="h-4 w-4" /> Buy for {item.price}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                     </div>
                </TabsContent>
                <TabsContent value="cosmetics">
                     <div className="text-center py-12 text-muted-foreground">More cosmetics coming soon...</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
