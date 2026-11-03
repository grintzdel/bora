import { Spacing } from '@bora/design-tokens'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { SessionCard } from '@/modules/session/ui/components/SessionCard'
import { SessionDoneHero } from '@/modules/session/ui/components/SessionDoneHero'
import { useSessionDone } from '@/modules/session/ui/hooks/use-session-done'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { BottomBar } from '@/modules/shared/ui/components/BottomBar'
import { Button } from '@/modules/shared/ui/components/Button'
import { ChoiceGroup } from '@/modules/shared/ui/components/ChoiceGroup'
import { Screen } from '@/modules/shared/ui/components/Screen'

export const SessionDonePage = () => {
  const router = useRouter()
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>()
  const done = useSessionDone(sessionId)

  const handleFinish = async () => {
    await done.finish()
    router.dismissTo('/home')
  }

  return (
    <Screen
      contentStyle={styles.content}
      footer={
        <BottomBar>
          <Button
            label={done.primaryLabel}
            size="lg"
            block
            disabled={done.isSaving}
            onPress={() => void handleFinish()}
          />
          <Button label="Choisir un autre créneau" variant="quiet" onPress={() => router.dismissTo('/sessions')} />
        </BottomBar>
      }
    >
      <SessionDoneHero title="Bora !" summary={done.summary} />
      <View style={styles.section}>
        <ChoiceGroup
          label="C'était comment ?"
          options={done.feedbackOptions}
          isSelected={(value) => done.feedback === value}
          onSelect={done.selectFeedback}
        />
        <AppText variant="caption" color="inkMuted">
          On ajuste le prochain programme pour vous deux.
        </AppText>
      </View>
      {done.next ? (
        <View style={styles.section}>
          <AppText variant="title2">On remet ça ?</AppText>
          <SessionCard
            when={done.next.when}
            program={done.next.program}
            partnerName={done.next.partnerName}
            status={done.next.status}
          />
        </View>
      ) : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing[6] },
  section: { gap: Spacing[3] },
})
