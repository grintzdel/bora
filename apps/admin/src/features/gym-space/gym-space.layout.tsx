'use client'

import type { ReactNode } from 'react'

import { GymSpaceShell } from '@/modules/auth/ui/components/GymSpaceShell'
import { useGymSpaceShell } from '@/modules/auth/ui/hooks/use-gym-space-shell'
import { useResetDemo } from '@/modules/demo/ui/hooks/use-reset-demo'

export const GymSpaceLayout = ({ children }: { readonly children: ReactNode }) => {
  const { gymName, managerName, items, menuOpen, toggleMenu, signOut } = useGymSpaceShell()
  const { resetDemo } = useResetDemo()

  return (
    <GymSpaceShell
      gymName={gymName}
      managerName={managerName}
      items={items}
      menuOpen={menuOpen}
      onToggleMenu={toggleMenu}
      onSignOut={signOut}
      onResetDemo={() => void resetDemo()}
    >
      {children}
    </GymSpaceShell>
  )
}
