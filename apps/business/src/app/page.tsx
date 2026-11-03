import { CalculatorSection } from '@/modules/landing/ui/components/calculator-section'
import { FaqSection } from '@/modules/landing/ui/components/faq-section'
import { HeroSection } from '@/modules/landing/ui/components/hero-section'
import { OfferSection } from '@/modules/landing/ui/components/offer-section'
import { PilotSection } from '@/modules/landing/ui/components/pilot-section'
import { SiteFooter } from '@/modules/landing/ui/components/site-footer'
import { StatsSection } from '@/modules/landing/ui/components/stats-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="contenu">
        <StatsSection />
        <CalculatorSection />
        <OfferSection />
        <FaqSection />
        <PilotSection />
      </main>
      <SiteFooter />
    </>
  )
}
