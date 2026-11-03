import { useRouter } from 'expo-router'

import { DuoProposalCard } from '@/modules/duo/ui/components/DuoProposalCard'
import { FirstSessionCard } from '@/modules/duo/ui/components/FirstSessionCard'
import { useMyDuo } from '@/modules/duo/ui/hooks/use-my-duo'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { Button } from '@/modules/shared/ui/components/Button'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'

export const MyDuoPage = () => {
  const router = useRouter()
  const { duo } = useMyDuo()

  return (
    <Screen>
      <ScreenTitle title="Ton duo" subtitle="Vous vous retrouvez à la salle, pas ailleurs." />
      {duo ? (
        <>
          <DuoProposalCard partnerName={duo.partnerName} partnerTag={duo.partnerTag} commonGround={duo.commonGround} />
          {duo.nextTogether ? (
            <FirstSessionCard
              label="Prochaine séance ensemble"
              title={duo.nextTogether}
              note="À la salle, avec l'équipe présente"
            />
          ) : null}
          <Button
            label="Signaler un comportement"
            variant="secondary"
            icon="flag"
            onPress={() => router.push({ pathname: '/report', params: { partnerId: duo.partnerId } })}
          />
          <AppText variant="caption" color="inkMuted">
            Ton signalement reste confidentiel.
          </AppText>
        </>
      ) : (
        <Button label="Trouver un duo" block icon="arrow" onPress={() => router.push('/onboarding/duo')} />
      )}
    </Screen>
  )
}
