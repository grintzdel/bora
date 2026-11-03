import { Container } from './container'

export function StatsSection() {
  return (
    <section className="bg-surface-100 py-20 md:py-28">
      <Container>
        <h2 className="font-display text-section text-ink max-w-3xl">Le plus dur, c&apos;est d&apos;y aller seul.</h2>
        <p className="text-body text-ink-muted mt-4 max-w-2xl">
          On arrive sans repères, on se sent observé, et personne ne remarque quand on ne revient pas. Ça a même un nom
          : <span className="text-body-strong text-ink">la gymtimidation</span>.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="bg-surface-000 min-h-[180px] rounded-md p-6 md:p-8">
            <p className="font-display text-number text-brand">63 %</p>
            <p className="text-body text-ink-muted mt-3">
              des nouveaux inscrits abandonnent avant leur troisième mois.
            </p>
          </article>
          <article className="bg-surface-000 min-h-[180px] rounded-md p-6 md:p-8">
            <p className="font-display text-number text-brand">65 %</p>
            <p className="text-body text-ink-muted mt-3">
              des femmes ressentent de l&apos;anxiété en salle, contre 35 % des hommes.
            </p>
          </article>
          <article className="bg-lime text-on-lime min-h-[180px] rounded-md p-6 md:p-8">
            <h3 className="font-display text-title-2">Le remède cité partout ?</h3>
            <p className="text-body mt-3">Venir avec quelqu&apos;un. Bora te trouve ce quelqu&apos;un.</p>
          </article>
        </div>
        <p className="text-caption text-ink-subtle mt-6">
          Sources : Sperandei et al., 2016 · The Everygirl · Cleveland Clinic
        </p>
      </Container>
    </section>
  )
}
