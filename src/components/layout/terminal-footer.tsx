"use client"

export function TerminalFooter() {
  return (
    <footer className="bg-black border-t border-primary/30 pt-16 pb-8 font-mono relative overflow-hidden">
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
        
        <div className="container px-4 md:px-6 relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h3 className="text-primary font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary" /> System
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Status</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Changelog</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Documentation</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-primary font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                         <span className="w-2 h-2 bg-primary" /> Nexus
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Leaderboard</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Hackathons</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Guilds</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-primary font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary" /> Protocol
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Manifesto</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Terms of Service</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-primary font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary" /> Uplink
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Twitter / X</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; GitHub</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">&gt; Discord</li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-xs text-primary/60">
                    © 2025 Antigravity Corp. All rights reserved. // <span className="animate-pulse">SYSTEM_ONLINE</span>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded border border-primary/20 text-xs text-primary font-bold">
                    v2.0.4 [STABLE]
                </div>
                <div className="w-full md:w-auto h-6 overflow-hidden relative border border-primary/10 bg-black max-w-xs">
                    <div className="absolute whitespace-nowrap animate-slide-left text-xs text-green-500/80 px-2 py-1">
                        "The only way to do great work is to love what you do." - Steve Jobs  +++  "Code is poetry."  +++  "Stay hungry, stay foolish."
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
