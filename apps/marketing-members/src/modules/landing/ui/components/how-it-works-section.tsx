import { howItWorksSteps } from '@/modules/landing/core/domain/content'

import { Container } from './container'

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container>
        <h2 className="font-display text-section text-ink max-w-3xl">Un duo et un programme, dans ta salle</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <li
              key={step.number}
              className={`rounded-md p-6 ${step.featured ? 'bg-surface-inverse text-ink-inverse' : 'bg-surface-000 text-ink'} ${
                step.wide ? 'sm:col-span-2 xl:col-span-4' : ''
              }`}
            >
              <span
                className={`text-label mb-4 flex size-8 items-center justify-center rounded-full ${
                  step.featured ? 'bg-lime text-on-lime' : 'bg-brand-soft text-brand'
                }`}
              >
                {step.number}
              </span>
              <h3 className="text-headline">{step.title}</h3>
              <p className={`text-body mt-2 max-w-2xl ${step.featured ? 'text-ink-inverse/75' : 'text-ink-muted'}`}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
