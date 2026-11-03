import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { IconButton } from './IconButton'

type StepHeaderProps = {
  readonly onBack: () => void
  readonly progress?: number
  readonly stepLabel?: string
}

export const StepHeader = ({ onBack, progress, stepLabel }: StepHeaderProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.header}>
      <IconButton icon="back" accessibilityLabel="Retour" onPress={onBack} />
      {progress === undefined ? null : (
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
          style={[styles.track, { backgroundColor: colors.surface200 }]}
        >
          <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: colors.brand }]} />
        </View>
      )}
      {stepLabel ? (
        <AppText variant="caption" color="inkSubtle">
          {stepLabel}
        </AppText>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  track: { flex: 1, height: 8, borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { height: 8, borderRadius: Radius.pill },
})
