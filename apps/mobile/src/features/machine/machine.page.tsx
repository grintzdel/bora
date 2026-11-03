import { Colors, Radius, Spacing } from '@bora/design-tokens'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { MachineGuide } from '@/modules/gym/ui/components/MachineGuide'
import { MachineScanHeader } from '@/modules/gym/ui/components/MachineScanHeader'
import { useMachine } from '@/modules/gym/ui/hooks/use-machine'
import { Button } from '@/modules/shared/ui/components/Button'
import { useTheme } from '@/modules/shared/ui/hooks/use-theme'

export const MachinePage = () => {
  const router = useRouter()
  const { machineId } = useLocalSearchParams<{ machineId: string }>()
  const machine = useMachine(machineId)
  const { colors, shadow } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']}>
        <MachineScanHeader status={machine.status} onClose={() => router.back()} />
      </SafeAreaView>
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.surface000,
            boxShadow: shadow.float,
            paddingBottom: Math.max(insets.bottom, Spacing[6]),
          },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.line }]} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {machine.guide ? (
            <MachineGuide
              tag={machine.guide.tag}
              name={machine.guide.name}
              videoLabel={machine.guide.videoLabel}
              steps={machine.guide.steps}
            />
          ) : null}
        </ScrollView>
        <Button label="C'est compris" size="lg" block onPress={() => router.back()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.dark.surface200 },
  sheet: {
    flex: 1,
    gap: Spacing[4],
    paddingTop: Spacing[3],
    paddingHorizontal: Spacing[5],
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
  handle: { alignSelf: 'center', width: 40, height: 5, borderRadius: Radius.pill },
  content: { flexGrow: 1 },
})
