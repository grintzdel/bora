import { Spacing } from '@bora/design-tokens'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { ExerciseCard } from '@/modules/session/ui/components/ExerciseCard'
import { PartnerPresence } from '@/modules/session/ui/components/PartnerPresence'
import { WorkoutHeader } from '@/modules/session/ui/components/WorkoutHeader'
import { useWorkout } from '@/modules/session/ui/hooks/use-workout'
import { Button } from '@/modules/shared/ui/components/Button'
import { Card } from '@/modules/shared/ui/components/Card'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { SegmentedProgress } from '@/modules/shared/ui/components/SegmentedProgress'

export const WorkoutPage = () => {
  const router = useRouter()
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>()
  const { workout, isCompleting, completeSet } = useWorkout(sessionId)

  if (!workout) return <Screen>{null}</Screen>

  const handleSetDone = async () => {
    if ((await completeSet()) === 'finished') {
      router.replace({ pathname: '/session/[sessionId]/done', params: { sessionId } })
    }
  }

  return (
    <Screen gap={18}>
      <WorkoutHeader
        title={workout.title}
        subtitle={workout.subtitle}
        onQuit={() => router.back()}
        onReport={() => router.push({ pathname: '/report', params: { sessionId, partnerId: workout.partnerId ?? '' } })}
      />
      <SegmentedProgress total={workout.exerciseCount} reached={workout.exerciseNumber} />
      {workout.presence ? (
        <PartnerPresence
          memberName={workout.presence.memberName}
          partnerName={workout.presence.partnerName}
          message={workout.presence.message}
        />
      ) : null}
      <ExerciseCard
        setLabel={workout.setLabel}
        name={workout.name}
        effortLabel={workout.effortLabel}
        settings={workout.settings}
      />
      {workout.duoTip ? <Card title="À deux" description={workout.duoTip} /> : null}
      <View style={styles.spacer} />
      <View style={styles.actions}>
        {workout.machineId ? (
          <Button
            label="Scanner"
            variant="secondary"
            size="lg"
            style={styles.scan}
            onPress={() =>
              router.push({ pathname: '/machine/[machineId]', params: { machineId: workout.machineId ?? '' } })
            }
          />
        ) : null}
        <Button
          label={workout.primaryLabel}
          size="lg"
          icon="check"
          disabled={isCompleting}
          style={styles.done}
          onPress={() => void handleSetDone()}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  spacer: { flex: 1 },
  actions: { flexDirection: 'row', gap: Spacing[2] },
  scan: { flex: 1 },
  done: { flex: 2 },
})
