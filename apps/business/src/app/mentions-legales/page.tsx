import type { Metadata } from 'next'

import { businessConfig } from '@/modules/landing/core/domain/config'
import { LegalPage } from '@/modules/landing/ui/components/legal-page'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <p>
        Bora est un projet né au Startup Sprint de l&apos;EEMI. Cette page sera complétée avant toute mise en
        production.
      </p>
      <p>
        Éditeur : projet Bora, Paris. Contact :{' '}
        <a className="text-brand underline underline-offset-4" href={`mailto:${businessConfig.contactEmail}`}>
          {businessConfig.contactEmail}
        </a>
        .
      </p>
      <p>Hébergement et raison sociale seront indiqués ici dès le premier déploiement public.</p>
    </LegalPage>
  )
}
