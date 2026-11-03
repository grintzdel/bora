import { AppPreviewSection } from '@/modules/landing/ui/components/app-preview-section'
import { FaqSection } from '@/modules/landing/ui/components/faq-section'
import { GymsCtaSection } from '@/modules/landing/ui/components/gyms-cta-section'
import { HeroSection } from '@/modules/landing/ui/components/hero-section'
import { HowItWorksSection } from '@/modules/landing/ui/components/how-it-works-section'
import { SafetySection } from '@/modules/landing/ui/components/safety-section'
import { SiteFooter } from '@/modules/landing/ui/components/site-footer'
import { StatsSection } from '@/modules/landing/ui/components/stats-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="contenu">
        <StatsSection />
        <HowItWorksSection />
        <AppPreviewSection />
        <SafetySection />
        <GymsCtaSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  )
}
