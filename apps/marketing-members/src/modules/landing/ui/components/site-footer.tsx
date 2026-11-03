import { marketingConfig } from '@/modules/landing/core/domain/config'
import { footerNav } from '@/modules/landing/core/domain/content'

import { buttonStyles } from './button-styles'
import { Container } from './container'
import { ArrowRightIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from './icons'

const socials = [
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'TikTok', href: '#', icon: TikTokIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
] as const

export function SiteFooter() {
  const gymLinks = [
    { href: marketingConfig.businessSiteUrl, label: "L'offre" },
    { href: marketingConfig.businessSiteUrl, label: 'Devenir salle pilote' },
    { href: marketingConfig.adminSiteUrl, label: 'Espace salle' },
  ]

  return (
    <footer className="bg-surface-inverse text-ink-inverse overflow-hidden">
      <Container className="pt-10 pb-8 md:pt-14">
        <div className="bg-lime text-on-lime relative overflow-hidden rounded-lg px-6 py-8 md:px-10 md:py-10">
          <div className="bg-lime pointer-events-none absolute -top-16 -right-10 size-44 rounded-full brightness-95" />
          <div className="bg-lime pointer-events-none absolute -right-4 -bottom-20 size-52 rounded-full brightness-90" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-section">Ton duo t&apos;attend. On y va ?</h2>
              <p className="text-body mt-2">Vérifie si ta salle est sur Bora, ou fais-la entrer dans le pilote.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="/#trouver-salle" className={buttonStyles.inverse}>
                Trouver ma salle
                <ArrowRightIcon className="size-icon-sm" />
              </a>
              <a href={marketingConfig.businessSiteUrl} className={buttonStyles.ghostOnLime}>
                Je gère une salle
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-title-1">Bora</p>
            <p className="text-body text-ink-inverse/70 mt-3 max-w-xs">
              Un duo de ta salle et un programme guidé à faire ensemble. Au Brésil, bora, c&apos;est « allez, on y va ».
            </p>
            <ul className="mt-5 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="bg-ink-inverse/10 text-ink-inverse hover:bg-ink-inverse/16 flex size-10 items-center justify-center rounded-full transition"
                  >
                    <social.icon className="size-icon-sm" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <FooterColumn title="Pour toi" links={[...footerNav.forYou]} />
          <FooterColumn title="Pour les salles" links={gymLinks} />
          <div>
            <p className="text-caption text-ink-inverse/55 mb-3">Contact</p>
            <a
              href={`mailto:${marketingConfig.contactEmail}`}
              className="text-body-strong text-ink-inverse decoration-ink-inverse/30 hover:decoration-ink-inverse underline underline-offset-4"
            >
              {marketingConfig.contactEmail}
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
