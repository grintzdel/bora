import { marketingConfig } from '@/modules/landing/core/domain/config'
import { memberNav } from '@/modules/landing/core/domain/content'

import { buttonStyles } from './button-styles'
import { Container } from './container'
import { MobileNav } from './mobile-nav'

export function SiteHeader() {
  return (
    <header className="relative">
      <Container className="flex items-center justify-between py-5">
        <a href="#top" className="font-display text-title-1 text-ink-inverse">
          Bora
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {memberNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-body-strong text-ink-inverse/90 hover:text-ink-inverse transition"
            >
              {item.label}
            </a>
          ))}
          <a href={marketingConfig.businessSiteUrl} className={buttonStyles.ghostOnDark}>
            Vous gérez une salle ?
          </a>
        </nav>
        <MobileNav />
      </Container>
    </header>
  )
}
