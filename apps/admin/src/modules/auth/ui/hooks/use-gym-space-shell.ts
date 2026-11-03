import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AppRoute } from '../../../shared/ui/app-route.constant'
import { selectSession } from '../../core/store/auth.selectors'
import { signedOut } from '../../core/store/auth.slice'
import { fetchSessionThunk } from '../../core/store/auth.thunks'
import type { ShellNavItem } from '../components/GymSpaceShell'

const NavEntries = [
  { href: AppRoute.DASHBOARD, label: 'Tableau de bord', icon: 'chart' },
  { href: AppRoute.MEMBERS, label: 'Membres et duos', icon: 'users' },
  { href: AppRoute.MACHINES, label: 'Machines et QR codes', icon: 'machines' },
  { href: AppRoute.WELCOME_AND_REPORTS, label: 'Accueil et signalements', icon: 'flag' },
] as const

export const useGymSpaceShell = () => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { data: session } = useAppSelector(selectSession)
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null)
  const menuOpen = menuOpenOn === pathname

  useEffect(() => {
    void dispatch(fetchSessionThunk())
  }, [dispatch])

  const reportsToHandle = session?.reportsToHandle ?? 0

  const items: ReadonlyArray<ShellNavItem> = NavEntries.map((entry) => {
    const withReports = entry.href === AppRoute.WELCOME_AND_REPORTS && reportsToHandle > 0
    return {
      ...entry,
      current: pathname === entry.href || pathname.startsWith(`${entry.href}/`),
      badge: withReports ? reportsToHandle : null,
      badgeLabel: withReports ? `${reportsToHandle} signalement${reportsToHandle > 1 ? 's' : ''} à traiter` : null,
    }
  })

  return {
    gymName: session?.gymName ?? null,
    managerName: session?.managerName ?? null,
    items,
    menuOpen,
    toggleMenu: () => setMenuOpenOn(menuOpen ? null : pathname),
    signOut: () => dispatch(signedOut()),
  }
}
