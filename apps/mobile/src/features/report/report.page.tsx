import { useLocalSearchParams, useRouter } from 'expo-router'

import { useGym } from '@/modules/gym/ui/hooks/use-gym'
import { ReportReasons } from '@/modules/safety/ui/components/ReportReasons'
import { useReport } from '@/modules/safety/ui/hooks/use-report'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { BottomBar } from '@/modules/shared/ui/components/BottomBar'
import { Button } from '@/modules/shared/ui/components/Button'
import { IconButton } from '@/modules/shared/ui/components/IconButton'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'

export const ReportPage = () => {
  const router = useRouter()
  const params = useLocalSearchParams<{ sessionId?: string; partnerId?: string }>()
  const { gymName } = useGym()
  const report = useReport({ sessionId: params.sessionId || null, partnerId: params.partnerId || null })

  return (
    <Screen
      footer={
        <BottomBar>
          {report.isSent ? (
            <Button label="Fermer" size="lg" block onPress={() => router.back()} />
          ) : (
            <>
              <Button
                label="Envoyer le signalement"
                size="lg"
                block
                disabled={!report.canSubmit}
                onPress={() => void report.submit()}
              />
              <Button label="Annuler" variant="quiet" onPress={() => router.back()} />
            </>
          )}
        </BottomBar>
      }
    >
      <IconButton icon="close" accessibilityLabel="Fermer" onPress={() => router.back()} />
      <ScreenTitle
        title="Signaler un comportement"
        subtitle={`C'est confidentiel. Ton signalement va à l'équipe Bora et à ${gymName ?? 'ta salle'}, pas à ton duo.`}
      />
      {report.isSent ? (
        <Banner
          tone="success"
          title="Signalement envoyé"
          message="Merci. Quelqu'un de ta salle te recontacte rapidement."
        />
      ) : (
        <ReportReasons selected={report.reason} onSelect={report.selectReason} />
      )}
      {report.error ? <Banner tone="danger" title="Oups" message={report.error} /> : null}
    </Screen>
  )
}
