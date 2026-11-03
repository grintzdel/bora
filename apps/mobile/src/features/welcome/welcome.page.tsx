import { Spacing } from '@bora/design-tokens'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

import { useDemoMenu } from '@/modules/demo/ui/hooks/use-demo-menu'
import { useGym } from '@/modules/gym/ui/hooks/use-gym'
import { WelcomeHero } from '@/modules/member/ui/components/WelcomeHero'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { Button } from '@/modules/shared/ui/components/Button'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'
import { Tag } from '@/modules/shared/ui/components/Tag'

export const WelcomePage = () => {
  const router = useRouter()
  const { gymName } = useGym()
  const demoMenu = useDemoMenu({ onReset: () => router.replace('/') })

  return (
    <Screen gap={Spacing[6]} contentStyle={styles.content}>
      <Pressable accessible={false} onLongPress={demoMenu.open}>
        <AppText variant="title1">Bora</AppText>
      </Pressable>
      <WelcomeHero tags={['Mardi 18 h 30', 'À deux']} />
      <View style={styles.pitch}>
        {gymName ? <Tag label={`Offert par ${gymName}`} tone="brand" /> : null}
        <ScreenTitle
          size="display"
          title="Quelqu'un t'attend, alors tu y vas."
          subtitle="Un duo de ta salle et un programme guidé à faire ensemble. Gratuit pour toi, offert par ta salle."
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.actions}>
        <Button label="On y va" size="lg" block icon="arrow" onPress={() => router.push('/onboarding/profile')} />
        <Button label="J'ai déjà un compte" variant="quiet" onPress={() => router.replace('/home')} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing[6], paddingBottom: Spacing[8] },
  pitch: { gap: Spacing[3], alignItems: 'flex-start' },
  spacer: { flex: 1 },
  actions: { gap: Spacing[2] },
})
