'use client'

import { WelcomeKitPanel } from '@/modules/invitation/ui/components/WelcomeKitPanel'
import { useWelcomeKit } from '@/modules/invitation/ui/hooks/use-welcome-kit'
import { ReportsPanel } from '@/modules/safety/ui/components/ReportsPanel'
import { useReports } from '@/modules/safety/ui/hooks/use-reports'
import { AppRoute } from '@/modules/shared/ui/app-route.constant'
import { PageHeader } from '@/modules/shared/ui/components/PageHeader'

export const WelcomeAndReportsPage = () => {
  const reports = useReports()
  const welcome = useWelcomeKit()

  return (
    <>
      <PageHeader
        title="Accueil et signalements"
        subtitle="Invitez vos nouveaux inscrits dès l'accueil et suivez les signalements de leurs séances."
      />
      <ReportsPanel
        reports={reports.reports}
        toHandleCount={reports.toHandleCount}
        isLoading={reports.isLoading}
        loadError={reports.loadError}
        feedback={reports.feedback}
        actionError={reports.actionError}
        isWorking={reports.isWorking}
        confirmingReportId={reports.confirmingReportId}
        onResolve={reports.resolve}
        onAskSuspension={reports.askSuspension}
        onCancelSuspension={reports.cancelSuspension}
        onConfirmSuspension={(memberId) => void reports.confirmSuspension(memberId)}
      />
      <WelcomeKitPanel
        kit={welcome.kit}
        posterHref={AppRoute.WELCOME_POSTER}
        copyFeedback={welcome.copyFeedback}
        onCopyLink={() => void welcome.copyLink()}
      />
    </>
  )
}
