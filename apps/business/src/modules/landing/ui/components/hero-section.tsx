import { retentionExample } from '@/modules/landing/core/domain/content'

import { buttonStyles } from './button-styles'
import { Container } from './container'
import { ArrowRightIcon } from './icons'
import { SiteHeader } from './site-header'

export function HeroSection() {
  return (
    <section id="top" className="bg-surface-inverse text-ink-inverse overflow-x-hidden">
      <SiteHeader />
      <Container className="grid items-center gap-12 py-10 pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-8 lg:pb-24">
        <div>
          <p className="rounded-pill bg-lime text-label text-on-lime mb-5 inline-flex px-3 py-1">
            Pour les salles indépendantes
          </p>
          <h1 className="font-display text-hero text-ink-inverse">
            Vos nouveaux viennent à deux.
            <br />
            Et ils reviennent.
          </h1>
          <p className="text-body text-ink-inverse/80 mt-5 max-w-xl">
            Bora met chaque nouvel inscrit en duo avec un débutant de votre salle, leur donne un programme guidé, et
            vous montre combien restent grâce à eux.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#pilote" className={buttonStyles.limeLg}>
              Demander un pilote gratuit
              <ArrowRightIcon className="size-icon-sm" />
            </a>
            <a
              href="#calcul"
              className="text-button text-ink-inverse decoration-ink-inverse/40 hover:decoration-ink-inverse underline underline-offset-4"
            >
              Faire le calcul
            </a>
          </div>
          <p className="text-caption text-ink-inverse/55 mt-6">
            En test chez une salle indépendante — le nom du premier club pilote arrive ici.
          </p>
        </div>
        <DashboardPreview />
      </Container>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="bg-surface-000 text-ink rounded-lg p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-headline">Votre espace salle</p>
        <span className="rounded-pill bg-surface-200 text-caption text-ink-subtle px-2.5 py-1">Exemple</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Nouveaux ce mois" value={retentionExample.newMembers} />
        <MetricCard label="Duos formés" value={retentionExample.duosFormed} />
      </div>
      <div className="bg-surface-inverse text-ink-inverse mt-3 rounded-md p-4">
        <p className="text-body-strong mb-4">Encore là après 90 jours</p>
        <RetentionBar label="En duo" percent={retentionExample.duoPercent} tone="lime" />
        <RetentionBar label="Seuls" percent={retentionExample.alonePercent} tone="brand" />
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-surface-100 rounded-md px-4 py-4">
      <p className="text-caption text-ink-muted">{label}</p>
      <p className="font-display text-title-1 text-ink mt-2">{value}</p>
    </div>
  )
}

function RetentionBar({ label, percent, tone }: { label: string; percent: number; tone: 'lime' | 'brand' }) {
  return (
    <div className="mt-3">
      <div className="text-caption text-ink-inverse/80 mb-2 flex items-center justify-between gap-3">
        <span>{label}</span>
        <span>{percent} %</span>
      </div>
      <div className="rounded-pill bg-ink-inverse/12 h-2.5 overflow-hidden">
        <div
          className={`rounded-pill h-full ${tone === 'lime' ? 'bg-lime' : 'bg-brand-soft'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
