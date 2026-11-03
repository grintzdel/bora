import type { Metadata } from 'next'

import { LegalPage } from '@/modules/landing/ui/components/legal-page'

export const metadata: Metadata = {
  title: 'Confidentialité',
}

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Confidentialité">
      <p>
        Bora collecte le minimum : le nom de ta salle, et ton email seulement si tu demandes à être prévenu. Ces
        informations servent à te relier à une salle pilote, pas à te profiler.
      </p>
      <p>
        Pas de photo, pas de swipe, pas de publicité ciblée. Les duos se forment sur le niveau, les créneaux et le
        double accord.
      </p>
      <h2 id="cookies" className="font-display text-title-2 text-ink scroll-mt-8">
        Cookies
      </h2>
      <p>
        Cette landing n&apos;utilise pas de cookies de mesure ou de publicité. Si un outil d&apos;analytics est ajouté
        plus tard, le choix te sera proposé ici.
      </p>
    </LegalPage>
  )
}
