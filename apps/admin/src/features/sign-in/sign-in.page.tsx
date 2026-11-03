'use client'

import { SignInPanel } from '@/modules/auth/ui/components/SignInPanel'
import { useSignIn } from '@/modules/auth/ui/hooks/use-sign-in'

export const SignInPage = () => {
  const { gymName, managerName, isSigningIn, error, signIn } = useSignIn()

  return (
    <main className="bg-surface-100 text-ink flex min-h-dvh items-center justify-center px-4 py-10">
      <SignInPanel
        gymName={gymName}
        managerName={managerName}
        isSigningIn={isSigningIn}
        error={error}
        onSignIn={() => void signIn()}
      />
    </main>
  )
}
