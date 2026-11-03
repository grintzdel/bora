import { safetyPoints } from '@/modules/landing/core/domain/content'

import { Container } from './container'

export function SafetySection() {
  return (
    <section id="securite" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container>
        <h2 className="font-display text-section text-ink max-w-3xl">Une séance, pas un rendez-vous.</h2>
        <p className="text-body text-ink-muted mt-4 max-w-2xl">
          Bora n&apos;est pas une app de rencontre. Pas de photo, pas de swipe : tu rejoins une séance, dans ta salle.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {safetyPoints.map((point) => (
            <li
              key={point.title}
              className={`rounded-md p-6 ${
                point.featured ? 'bg-surface-inverse text-ink-inverse' : 'bg-surface-000 text-ink'
              }`}
            >
              <h3 className="text-headline">{point.title}</h3>
              <p className={`text-body mt-2 ${point.featured ? 'text-ink-inverse/75' : 'text-ink-muted'}`}>
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
