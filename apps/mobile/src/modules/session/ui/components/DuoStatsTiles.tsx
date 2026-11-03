import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type DuoStatsTilesProps = {
  readonly count: number
  readonly countLabel: string
  readonly cheerTitle: string
  readonly cheerText: string
}

export const DuoStatsTiles = ({ count, countLabel, cheerTitle, cheerText }: DuoStatsTilesProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.row}>
      <View style={[styles.tile, { backgroundColor: colors.surface000 }]}>
        <AppText variant="number">{count}</AppText>
        <AppText variant="caption" color="inkMuted">
          {countLabel}
        </AppText>
      </View>
      <View style={[styles.tile, styles.cheer, { backgroundColor: colors.lime }]}>
        <AppText variant="headline" color="onLime">
          {cheerTitle}
        </AppText>
        <AppText variant="caption" color="onLime">
          {cheerText}
        </AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing[3] },
  tile: { flex: 1, gap: 6, padding: Spacing[5], borderRadius: Radius.md },
  cheer: { justifyContent: 'space-between', gap: Spacing[2] },
})
