
import { HeroPortal } from "@/components/landing/hero-portal"
import { FeaturesSection } from "@/components/landing/features-section"
import { CinematicFeatures } from "@/components/landing/cinematic-features"
import { ExploreSection } from "@/components/landing/explore-section"
import { StatsStrip } from "@/components/landing/stats-strip"
import { GlobalFeed } from "@/components/landing/global-feed"
import { ProjectGrid } from "@/components/landing/project-grid"
import { LeaderboardPreview } from "@/components/landing/leaderboard-preview"
import { NeonTestimonials } from "@/components/landing/neon-testimonials"
import { TerminalFooter } from "@/components/layout/terminal-footer"

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
          <HeroPortal />
          <div className="relative z-20 -mt-20 space-y-0">
             <GlobalFeed />
             <StatsStrip />
          </div>
      </div>
      <CinematicFeatures />
      <LeaderboardPreview />
      <ProjectGrid />
      <NeonTestimonials />
      <TerminalFooter />
    </div>
  )
}
