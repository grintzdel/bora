import { Spacing } from '@bora/design-tokens'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

import { useDemoMenu } from '@/modules/demo/ui/hooks/use-demo-menu'
import { DuoStatsTiles } from '@/modules/session/ui/components/DuoStatsTiles'
import { SessionCard } from '@/modules/session/ui/components/SessionCard'
import { UpcomingSessionRow } from '@/modules/session/ui/components/UpcomingSessionRow'
import { useHome } from '@/modules/session/ui/hooks/use-home'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { Button } from '@/modules/shared/ui/components/Button'
import { Card } from '@/modules/shared/ui/components/Card'
import { Initials } from '@/modules/shared/ui/components/Initials'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'

export const HomePage = () => {
  const router = useRouter()
  const home = useHome()
  const demoMenu = useDemoMenu({ onReset: () => router.replace('/') })
  const next = home.next

  const handleOpenSession = () => {
    if (!next) return
    router.push(
      next.partnerAbsent
        ? { pathname: '/session/[sessionId]/partner-absent', params: { sessionId: next.id } }
        : { pathname: '/session/[sessionId]', params: { sessionId: next.id } }
    )
  }

  return (
    <Screen>
      <View style={styles.header}>
        <ScreenTitle overline={home.gymName} title={home.greeting} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ton profil"
          onPress={() => router.push('/onboarding/profile')}
          onLongPress={demoMenu.open}
        >
          <Initials name={home.memberName || 'Bora'} size={48} />
        </Pressable>
      </View>
      {home.absence ? <Banner tone="warning" title={home.absence.title} message={home.absence.message} /> : null}
      {next ? (
        <SessionCard
          when={next.when}
          program={next.program}
          partnerName={next.partnerName}
          status={next.status}
          highlight
        >
          <Button
            label={next.partnerAbsent ? 'Voir les solutions' : 'Voir la séance'}
            block
            icon="arrow"
            onPress={handleOpenSession}
          />
        </SessionCard>
      ) : (
        <Card title="Pas de séance prévue" description="On te trouve un duo et un créneau ?" size="lg">
          <Button label="Trouver un duo" block icon="arrow" onPress={() => router.push('/onboarding/duo')} />
        </Card>
      )}
      {home.stats ? (
        <DuoStatsTiles
          count={home.stats.count}
          countLabel="séances faites à deux"
          cheerTitle="Bora !"
          cheerText={home.stats.cheer}
        />
      ) : null}
      {home.following ? (
        <View style={styles.section}>
          <AppText variant="title2">Ensuite</AppText>
          <UpcomingSessionRow
            when={home.following.when}
            detail={home.following.detail}
            status={home.following.status}
          />
        </View>
      ) : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  section: { gap: Spacing[3] },
})
