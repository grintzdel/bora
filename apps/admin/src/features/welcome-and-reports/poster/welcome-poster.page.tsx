'use client'

import { PosterToolbar } from '@/modules/invitation/ui/components/PosterToolbar'
import { WelcomePoster } from '@/modules/invitation/ui/components/WelcomePoster'
import { useWelcomePoster } from '@/modules/invitation/ui/hooks/use-welcome-poster'
import { AppRoute } from '@/modules/shared/ui/app-route.constant'

export const WelcomePosterPage = () => {
  const { poster, print } = useWelcomePoster()

  return (
    <main className="bg-surface-100 text-ink flex min-h-dvh flex-col gap-6 px-4 py-6 sm:px-6 print:min-h-0 print:bg-transparent print:p-0">
      <PosterToolbar backHref={AppRoute.WELCOME_AND_REPORTS} canPrint={poster !== null} onPrint={print} />
      {poster ? (
        <WelcomePoster gymName={poster.gymName} inviteUrl={poster.inviteUrl} />
      ) : (
        <p className="text-body text-ink-muted m-0 text-center">Préparation de l'affiche…</p>
      )}
    </main>
  )
}
