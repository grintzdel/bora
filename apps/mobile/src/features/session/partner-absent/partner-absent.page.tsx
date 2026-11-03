import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { PartnerAbsenceChoice } from '@/modules/session/core/domain/constants/partner-absence-choice.constant'
import { usePartnerAbsent } from '@/modules/session/ui/hooks/use-partner-absent'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { BottomBar } from '@/modules/shared/ui/components/BottomBar'
import { Button } from '@/modules/shared/ui/components/Button'
import { RadioCard } from '@/modules/shared/ui/components/RadioCard'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'
import { StepHeader } from '@/modules/shared/ui/components/StepHeader'

export const PartnerAbsentPage = () => {
  const router = useRouter()
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>()
  const absent = usePartnerAbsent(sessionId)

  const handleConfirm = async () => {
    const choice = await absent.confirm()
    if (choice === PartnerAbsenceChoice.NEW_DUO) {
      router.push({ pathname: '/onboarding/duo', params: { kind: 'tonight' } })
      return
    }
    if (choice === PartnerAbsenceChoice.GO_SOLO) {
      router.replace({ pathname: '/session/[sessionId]', params: { sessionId } })
      return
    }
    router.dismissTo('/home')
  }

  return (
    <Screen
      footer={
        <BottomBar>
          <Button
            label={absent.primaryLabel}
            size="lg"
            block
            icon="arrow"
            disabled={absent.isSaving}
            onPress={() => void handleConfirm()}
          />
        </BottomBar>
      }
    >
      <StepHeader onBack={() => router.back()} />
      <ScreenTitle overline={absent.context} title={absent.title} />
      <Banner tone="warning" title="Ça arrive." message="Ta séance reste prévue. On t'en propose un autre ?" />
      <View accessibilityRole="radiogroup" style={styles.choices}>
        <AppText variant="headline">Ce soir, tu préfères</AppText>
        {absent.options.map((option) => (
          <RadioCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={absent.choice === option.value}
            onPress={() => absent.selectChoice(option.value)}
          />
        ))}
      </View>
      <AppText variant="caption" color="inkMuted">
        {absent.footnote}
      </AppText>
    </Screen>
  )
}

const styles = StyleSheet.create({
  choices: { gap: 10 },
})
