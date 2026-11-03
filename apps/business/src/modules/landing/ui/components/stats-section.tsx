import { Container } from './container'

export function StatsSection() {
  return (
    <section className="bg-surface-100 py-20 md:py-28">
      <Container>
        <h2 className="font-display text-section text-ink max-w-3xl">Vos nouveaux partent en silence.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="bg-surface-000 min-h-[180px] rounded-md p-6 md:p-8">
            <p className="font-display text-number text-brand">63 %</p>
            <p className="text-body text-ink-muted mt-3">des nouveaux membres abandonnent avant leur troisième mois.</p>
            <p className="text-caption text-ink-subtle mt-4">Sperandei et al., 2016</p>
          </article>
          <article className="bg-surface-000 min-h-[180px] rounded-md p-6 md:p-8">
            <p className="font-display text-title-1 text-brand">Plus de 1 sur</p>
            <p className="font-display text-number text-brand">2</p>
            <p className="text-body text-ink-muted mt-3">
              arrête de venir sans résilier. Vous le voyez quand il est trop tard.
            </p>
            <p className="text-caption text-ink-subtle mt-4">Zenoti, enquête 2026 auprès des adhérents</p>
          </article>
          <article className="bg-lime text-on-lime min-h-[180px] rounded-md p-6 md:p-8">
            <h3 className="font-display text-title-2">Les grandes chaînes ont une app. Vous, pas encore.</h3>
            <p className="text-body mt-3">Bora accompagne vos débutants à votre place, sans coach en plus.</p>
          </article>
        </div>
      </Container>
    </section>
  )
}
