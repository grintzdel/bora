import { offerPoints } from '@/modules/landing/core/domain/content'

import { buttonStyles } from './button-styles'
import { Container } from './container'
import { ArrowRightIcon } from './icons'

export function OfferSection() {
  return (
    <section id="offre" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container>
        <h2 className="font-display text-section text-ink">Ce que vous avez avec Bora</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {offerPoints.map((point) => (
            <li key={point.title} className="bg-surface-000 rounded-md p-5">
              <h3 className="text-headline text-ink">{point.title}</h3>
              <p className="text-body text-ink-muted mt-2">{point.body}</p>
            </li>
          ))}
        </ul>
        <div className="bg-lime text-on-lime mt-4 flex flex-col items-start justify-between gap-6 rounded-lg px-6 py-8 md:flex-row md:items-center md:px-8">
          <div className="max-w-2xl">
            <h3 className="font-display text-title-1">Un mois de pilote, offert</h3>
            <p className="text-body mt-2">
              On pose les QR codes, on forme l&apos;accueil, et on compare vos duos aux inscrits seuls.
            </p>
          </div>
          <a href="#pilote" className={`${buttonStyles.inverse} shrink-0`}>
            Demander le pilote
            <ArrowRightIcon className="size-icon-sm" />
          </a>
        </div>
      </Container>
    </section>
  )
}
