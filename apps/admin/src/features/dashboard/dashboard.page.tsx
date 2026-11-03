'use client'

import { ActiveDuosList } from '@/modules/gym/ui/components/ActiveDuosList'
import { DashboardTiles } from '@/modules/gym/ui/components/DashboardTiles'
import { RetentionCard } from '@/modules/gym/ui/components/RetentionCard'
import { SlotDemandCard } from '@/modules/gym/ui/components/SlotDemandCard'
import { WatchList } from '@/modules/gym/ui/components/WatchList'
import { useDashboard } from '@/modules/gym/ui/hooks/use-dashboard'
import { AppRoute } from '@/modules/shared/ui/app-route.constant'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { Button } from '@/modules/shared/ui/components/Button'
import { ButtonLink } from '@/modules/shared/ui/components/ButtonLink'
import { PageHeader } from '@/modules/shared/ui/components/PageHeader'

const InviteAction = () => (
  <ButtonLink href={AppRoute.WELCOME_AND_REPORTS} iconEnd="arrow" block>
    Inviter les nouveaux inscrits
  </ButtonLink>
)

export const DashboardPage = () => {
  const { isLoading, error, retry, view } = useDashboard()

  if (!view) {
    return (
      <>
        <PageHeader title="Tableau de bord" subtitle="Suivi des nouveaux inscrits du mois et de leurs duos." />
        {error ? (
          <div className="flex flex-col items-start gap-3">
            <Banner tone="danger" title={error} />
            <Button variant="secondary" onClick={retry}>
              Réessayer
            </Button>
          </div>
        ) : (
          <output aria-busy={isLoading} className="text-body text-ink-muted m-0">
            Chargement du tableau de bord…
          </output>
        )}
      </>
    )
  }

  return (
    <>
      <PageHeader
        hero
        title={view.title}
        subtitle="Suivi des nouveaux inscrits du mois et de leurs duos."
        actions={<InviteAction />}
      />
      <DashboardTiles tiles={view.tiles} />
      <div className="flex flex-wrap gap-4">
        <RetentionCard subtitle={view.retention.subtitle} rows={view.retention.rows} summary={view.retention.summary} />
        <SlotDemandCard rows={view.slots.rows} hint={view.slots.hint} />
      </div>
      <WatchList alerts={view.alerts} />
      <ActiveDuosList duos={view.activeDuos} />
    </>
  )
}
