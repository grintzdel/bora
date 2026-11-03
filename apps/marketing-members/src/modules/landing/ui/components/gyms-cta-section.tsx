import { marketingConfig } from '@/modules/landing/core/domain/config'
import { retentionExample } from '@/modules/landing/core/domain/content'

import { buttonStyles } from './button-styles'
import { Container } from './container'
import { ArrowRightIcon } from './icons'

export function GymsCtaSection() {
  return (
    <section id="salles" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container>
        <div className="bg-surface-inverse text-ink-inverse rounded-lg px-6 py-10 md:px-10 md:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="rounded-pill bg-lime text-label text-on-lime mb-5 inline-flex px-3 py-1">
                Vous gérez une salle ?
              </p>
              <h2 className="font-display text-section text-ink-inverse">
                Plus de la moitié de vos adhérents arrêtent de venir sans résilier.
              </h2>
              <p className="text-body text-ink-inverse/75 mt-4 max-w-xl">
                Bora met vos nouveaux en duo dès l&apos;accueil et vous montre combien restent grâce à eux. Premier mois
                de pilote offert.
              </p>
              <a href={marketingConfig.businessSiteUrl} className={`${buttonStyles.limeLg} mt-8`}>
                Découvrir Bora pour les salles
                <ArrowRightIcon className="size-icon-sm" />
              </a>
              <p className="text-caption text-ink-inverse/50 mt-6">
                Source : Zenoti, enquête 2026 auprès des adhérents
              </p>
            </div>
            <div className="bg-ink-inverse/8 ring-ink-inverse/10 rounded-md p-5 ring-1">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-body-strong text-ink-inverse">Encore là après 90 jours</p>
                <span className="rounded-pill bg-ink-inverse/10 text-caption text-ink-inverse/70 px-2.5 py-1">
                  Exemple
                </span>
              </div>
              <RetentionBar label="En duo" percent={retentionExample.duoPercent} tone="lime" />
              <RetentionBar label="Seuls" percent={retentionExample.alonePercent} tone="brand" />
              <p className="text-caption text-ink-inverse/55 mt-4">Mesuré dans votre espace salle, chaque mois.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function RetentionBar({ label, percent, tone }: { label: string; percent: number; tone: 'lime' | 'brand' }) {
  return (
    <div className="mt-4">
      <div className="text-caption text-ink-inverse/80 mb-2 flex items-center justify-between gap-3">
        <span>{label}</span>
        <span>{percent} %</span>
      </div>
      <div className="rounded-pill bg-ink-inverse/12 h-3 overflow-hidden">
        <div
          className={`rounded-pill h-full ${tone === 'lime' ? 'bg-lime' : 'bg-brand-soft'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
