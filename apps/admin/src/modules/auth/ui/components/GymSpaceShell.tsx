import Link from 'next/link'
import type { ReactNode } from 'react'

import { Icon, type IconName } from '../../../shared/ui/components/Icon'

export type ShellNavItem = {
  readonly href: string
  readonly label: string
  readonly icon: IconName
  readonly current: boolean
  readonly badge: number | null
  readonly badgeLabel: string | null
}

type GymSpaceShellProps = {
  readonly gymName: string | null
  readonly managerName: string | null
  readonly items: ReadonlyArray<ShellNavItem>
  readonly menuOpen: boolean
  readonly onToggleMenu: () => void
  readonly onSignOut: () => void
  readonly onResetDemo: () => void
  readonly children: ReactNode
}

const Badge = ({ count }: { readonly count: number }) => (
  <span
    aria-hidden="true"
    className="rounded-pill bg-brand text-label text-on-brand inline-flex h-6 min-w-6 items-center justify-center px-1.5"
  >
    {count}
  </span>
)

const NavLinks = ({ items }: { readonly items: ReadonlyArray<ShellNavItem> }) => (
  <ul className="m-0 flex list-none flex-col gap-1 p-0">
    {items.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={item.current ? 'page' : undefined}
          className={`min-h-tap-min focus-visible:outline-focus flex items-center gap-3 rounded-sm px-3 text-[16px] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            item.current ? 'bg-surface-000 text-ink font-bold' : 'text-ink-muted hover:text-ink font-semibold'
          }`}
        >
          <Icon name={item.icon} />
          <span className="grow">{item.label}</span>
          {item.badge ? <Badge count={item.badge} /> : null}
          {item.badgeLabel ? <span className="sr-only">, {item.badgeLabel}</span> : null}
        </Link>
      </li>
    ))}
  </ul>
)

const Brand = ({ gymName }: { readonly gymName: string | null }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-display lg:text-title-1 text-[24px] leading-7 font-extrabold tracking-[-0.5px]">Bora</span>
    <span className="text-caption text-ink-muted">{gymName ?? 'Espace salle'}</span>
  </div>
)

const SignOut = ({
  managerName,
  onSignOut,
  onResetDemo,
}: Pick<GymSpaceShellProps, 'managerName' | 'onSignOut' | 'onResetDemo'>) => (
  <div className="flex flex-col gap-1 px-3">
    {managerName ? <span className="text-caption text-ink-muted">Connectée : {managerName}</span> : null}
    <Link
      href="/"
      onClick={onSignOut}
      className="min-h-tap-min text-brand focus-visible:outline-focus inline-flex items-center gap-2 font-bold no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Icon name="logout" />
      Se déconnecter
    </Link>
    <button
      type="button"
      onClick={onResetDemo}
      className="min-h-tap-min text-caption text-ink-muted hover:text-ink focus-visible:outline-focus inline-flex cursor-pointer items-center border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Réinitialiser la démo
    </button>
  </div>
)

export const GymSpaceShell = ({
  gymName,
  managerName,
  items,
  menuOpen,
  onToggleMenu,
  onSignOut,
  onResetDemo,
  children,
}: GymSpaceShellProps) => {
  const reports = items.find((item) => item.badge)

  return (
    <div className="bg-surface-100 text-ink flex min-h-dvh flex-col lg:flex-row">
      <a
        href="#contenu"
        className="focus:bg-surface-000 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:rounded-sm focus:p-3"
      >
        Aller au contenu
      </a>

      <header className="bg-surface-200 sticky top-0 z-10 px-5 py-3 lg:hidden print:hidden">
        <div className="flex items-center justify-between gap-3">
          <Brand gymName={gymName} />
          <div className="flex gap-2">
            {reports ? (
              <Link
                href={reports.href}
                aria-label={`${reports.label}${reports.badgeLabel ? `, ${reports.badgeLabel}` : ''}`}
                className="rounded-pill bg-surface-000 text-ink relative inline-flex size-12 items-center justify-center"
              >
                <Icon name="flag" size={22} />
                <span
                  aria-hidden="true"
                  className="rounded-pill bg-brand text-on-brand absolute top-1 right-1 inline-flex h-[18px] min-w-[18px] items-center justify-center text-[11px] font-bold"
                >
                  {reports.badge}
                </span>
              </Link>
            ) : null}
            <button
              type="button"
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="rounded-pill bg-surface-000 text-ink focus-visible:outline-focus inline-flex size-12 cursor-pointer items-center justify-center border-0 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="menu-mobile" aria-label="Menu de l'espace salle" className="flex flex-col gap-4 pt-4 pb-2">
            <NavLinks items={items} />
            <SignOut managerName={managerName} onSignOut={onSignOut} onResetDemo={onResetDemo} />
          </nav>
        ) : null}
      </header>

      <nav
        aria-label="Menu de l'espace salle"
        className="bg-surface-200 sticky top-0 hidden h-dvh w-[272px] shrink-0 flex-col gap-6 px-5 py-7 lg:flex print:hidden"
      >
        <div className="px-3">
          <Brand gymName={gymName} />
        </div>
        <div className="grow">
          <NavLinks items={items} />
        </div>
        <SignOut managerName={managerName} onSignOut={onSignOut} onResetDemo={onResetDemo} />
      </nav>

      <main
        id="contenu"
        className="mx-auto flex w-full max-w-[1200px] min-w-0 flex-1 flex-col gap-8 px-4 pt-6 pb-12 sm:px-6 lg:px-10 lg:pt-8 print:p-0"
      >
        {children}
      </main>
    </div>
  )
}
