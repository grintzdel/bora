import { Spacing } from '@bora/design-tokens'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { SessionCard } from '@/modules/session/ui/components/SessionCard'
import { useSessionsList } from '@/modules/session/ui/hooks/use-sessions-list'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { Button } from '@/modules/shared/ui/components/Button'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'

export const SessionsPage = () => {
  const router = useRouter()
  const { upcoming, done } = useSessionsList()

  return (
    <Screen>
      <ScreenTitle title="Tes séances" subtitle="Toujours à la salle, toujours à deux." />
      {upcoming.length === 0 ? <AppText color="inkMuted">Aucune séance prévue pour l'instant.</AppText> : null}
      {upcoming.map((session, index) => (
        <SessionCard
          key={session.id}
          when={session.when}
          program={session.program}
          partnerName={session.partnerName}
          status={session.status}
          highlight={index === 0}
        >
          {index === 0 ? (
            <Button
              label="Voir la séance"
              block
              icon="arrow"
              onPress={() =>
                router.push(
                  session.partnerAbsent
                    ? { pathname: '/session/[sessionId]/partner-absent', params: { sessionId: session.id } }
                    : { pathname: '/session/[sessionId]', params: { sessionId: session.id } }
                )
              }
            />
          ) : null}
        </SessionCard>
      ))}
      {done.length > 0 ? (
        <View style={styles.section}>
          <AppText variant="title2">Déjà faites</AppText>
          {done.map((session) => (
            <SessionCard
              key={session.id}
              when={session.when}
              program={session.program}
              partnerName={session.partnerName}
              status={session.status}
            />
          ))}
        </View>
      ) : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  section: { gap: Spacing[4] },
})
