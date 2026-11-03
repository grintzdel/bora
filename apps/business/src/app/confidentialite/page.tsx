import type { Metadata } from 'next'

import { LegalPage } from '@/modules/landing/ui/components/legal-page'

export const metadata: Metadata = {
  title: 'Confidentialité',
}

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Confidentialité">
      <p>
        Bora collecte le minimum pour le pilote : votre prénom, le nom de votre salle, votre email et une estimation des
        nouveaux inscrits. Ces informations servent uniquement à vous recontacter.
      </p>
      <p>Elles ne sont jamais revendues. L’espace salle ne montre que des agrégats de rétention, pas de profils.</p>
      <h2 id="cookies" className="font-display text-title-2 text-ink scroll-mt-8">
        Cookies
      </h2>
      <p>
        Cette landing n&apos;utilise pas de cookies de mesure ou de publicité. Si un outil d&apos;analytics est ajouté
        plus tard, le choix vous sera proposé ici.
      </p>
    </LegalPage>
  )
}
