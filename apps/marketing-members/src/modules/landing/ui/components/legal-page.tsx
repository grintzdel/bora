import type { ReactNode } from 'react'

import { Container } from './container'
import { SiteFooter } from './site-footer'

type LegalPageProps = {
  title: string
  children: ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <header className="bg-surface-inverse">
        <Container className="flex items-center justify-between py-5">
          <a href="/" className="font-display text-title-1 text-ink-inverse">
            Bora
          </a>
          <a href="/" className="text-body-strong text-ink-inverse/80 hover:text-ink-inverse">
            Retour à l&apos;accueil
          </a>
        </Container>
      </header>
      <main id="contenu" className="bg-surface-100 flex-1 py-16 md:py-24">
        <Container className="max-w-3xl">
          <h1 className="font-display text-section text-ink">{title}</h1>
          <div className="text-body text-ink-muted mt-8 flex flex-col gap-5">{children}</div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
