"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"
import { Menu } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-background border-r w-72">
        <Sidebar mobile />
      </SheetContent>
    </Sheet>
  )
}
