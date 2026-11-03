'use client'

import type { ReactNode } from 'react'

import { GymSpaceShell } from '@/modules/auth/ui/components/GymSpaceShell'
import { useGymSpaceShell } from '@/modules/auth/ui/hooks/use-gym-space-shell'

export const GymSpaceLayout = ({ children }: { readonly children: ReactNode }) => {
  const { gymName, managerName, items, menuOpen, toggleMenu, signOut } = useGymSpaceShell()

  return (
    <GymSpaceShell
      gymName={gymName}
      managerName={managerName}
      items={items}
      menuOpen={menuOpen}
      onToggleMenu={toggleMenu}
      onSignOut={signOut}
    >
      {children}
    </GymSpaceShell>
  )
}
