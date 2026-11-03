import { businessConfig } from '@/modules/landing/core/domain/config'

import { Container } from './container'

export function SiteFooter() {
  return (
    <footer className="bg-surface-inverse text-ink-inverse overflow-hidden">
      <Container className="pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-title-1">Bora</p>
            <p className="text-body text-ink-inverse/70 mt-3 max-w-xs">
              Au Brésil, bora, c&apos;est « allez, on y va ».
            </p>
          </div>
          <FooterColumn
            title="Pour les débutants"
            links={[{ href: businessConfig.membersSiteUrl, label: 'Découvrir Bora' }]}
          />
          <FooterColumn
            title="Pour les salles"
            links={[
              { href: '/#calcul', label: 'Le calcul' },
              { href: '/#pilote', label: 'Devenir salle pilote' },
              { href: businessConfig.adminSiteUrl, label: 'Espace salle' },
            ]}
          />
          <div>
            <p className="text-caption text-ink-inverse/55 mb-3">Contact</p>
            <a
              href={`mailto:${businessConfig.contactEmail}`}
              className="text-body-strong text-ink-inverse decoration-ink-inverse/30 hover:decoration-ink-inverse underline underline-offset-4"
            >
              {businessConfig.contactEmail}
            </a>
          </div>
        </div>
        <div className="border-ink-inverse/12 text-caption text-ink-inverse/55 mt-10 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bora · Projet né au Startup Sprint de l&apos;EEMI</p>
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <a href="/mentions-legales" className="hover:text-ink-inverse">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/confidentialite" className="hover:text-ink-inverse">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="/confidentialite#cookies" className="hover:text-ink-inverse">
                  Gestion des cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
      <p
        className="font-display text-ink-inverse/12 pointer-events-none mt-4 text-[min(42vw,420px)] leading-[0.72] font-extrabold select-none"
        aria-hidden="true"
      >
        Bora
      </p>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-caption text-ink-inverse/55 mb-3">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-body text-ink-inverse/90 hover:text-ink-inverse">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
