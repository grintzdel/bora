import { Container } from './container'
import { PilotForm } from './pilot-form'

export function PilotSection() {
  return (
    <section id="pilote" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-section text-ink">Devenez salle pilote</h2>
          <p className="text-body text-ink-muted mt-4 max-w-md">
            On passe vous voir, on installe tout, et vos nouveaux de ce mois commencent à deux.
          </p>
        </div>
        <PilotForm />
      </Container>
    </section>
  )
}
