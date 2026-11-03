import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Icon } from '../../../shared/ui/components/Icon'
import { Tag } from '../../../shared/ui/components/Tag'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type MachineGuideProps = {
  readonly tag: string
  readonly name: string
  readonly videoLabel: string
  readonly steps: ReadonlyArray<string>
}

export const MachineGuide = ({ tag, name, videoLabel, steps }: MachineGuideProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.guide}>
      <View style={styles.title}>
        <Tag label={tag} />
        <AppText variant="title1" accessibilityRole="header">
          {name}
        </AppText>
      </View>
      <View
        accessibilityRole="image"
        accessibilityLabel={videoLabel}
        style={[styles.video, { backgroundColor: colors.surface200 }]}
      >
        <Icon name="play" color={colors.inkMuted} size={24} />
        <AppText variant="label" color="inkMuted">
          {videoLabel}
        </AppText>
      </View>
      <View style={styles.steps}>
        {steps.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={[styles.number, { backgroundColor: colors.brandSoft }]}>
              <AppText variant="label">{index + 1}</AppText>
            </View>
            <AppText style={styles.stepText}>{step}</AppText>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  guide: { gap: 18 },
  title: { gap: 6 },
  video: {
    height: 132,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  steps: { gap: 10 },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing[3] },
  number: { width: 28, height: 28, borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center' },
  stepText: { flex: 1 },
})
