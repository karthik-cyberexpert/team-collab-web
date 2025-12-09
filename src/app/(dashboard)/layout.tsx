import { Sidebar } from "@/components/layout/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

import { MobileSidebar } from "@/components/layout/mobile-sidebar"

import { CommandMenu } from "@/components/layout/command-menu"
import { UserNav } from "@/components/layout/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur px-6">
            <div className="flex items-center gap-4">
                <MobileSidebar />
                <h1 className="font-semibold text-lg hidden md:block">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <CommandMenu />
                <ThemeToggle />
                <UserNav />
            </div>
        </header>
        <main className="flex-1 p-6">
            {children}
        </main>
      </div>
    </div>
  )
}
