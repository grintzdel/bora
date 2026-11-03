import { Radius } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks/use-theme'

type SegmentedProgressProps = {
  readonly total: number
  readonly reached: number
}

export const SegmentedProgress = ({ total, reached }: SegmentedProgressProps) => {
  const { colors } = useTheme()

  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: reached }} style={styles.row}>
      {Array.from({ length: total }, (_, index) => (
        <View key={index} style={[styles.segment, { backgroundColor: index < reached ? colors.brand : colors.line }]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 6, borderRadius: Radius.pill },
})
