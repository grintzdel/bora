import { businessConfig } from '@/modules/landing/core/domain/config'

import { buttonStyles } from './button-styles'
import { Container } from './container'
import { MobileNav } from './mobile-nav'

export function SiteHeader() {
  return (
    <header className="relative">
      <Container className="flex items-center justify-between py-5">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-title-1 text-ink-inverse">Bora</span>
          <span className="rounded-pill bg-lime text-label text-on-lime px-2 py-0.5">pour les salles</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          <a
            href={businessConfig.membersSiteUrl}
            className="text-body-strong text-ink-inverse/90 hover:text-ink-inverse transition"
          >
            Pour les débutants
          </a>
          <a href="#calcul" className="text-body-strong text-ink-inverse/90 hover:text-ink-inverse transition">
            Le calcul
          </a>
          <a
            href={businessConfig.adminSiteUrl}
            className="text-body-strong text-ink-inverse/90 hover:text-ink-inverse transition"
          >
            Espace salle
          </a>
          <a href="#pilote" className={buttonStyles.ghostOnDark}>
            Demander un pilote
          </a>
        </nav>
        <MobileNav />
      </Container>
    </header>
  )
}
