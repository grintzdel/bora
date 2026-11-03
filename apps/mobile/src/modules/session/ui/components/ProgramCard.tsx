import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type ProgramCardProps = {
  readonly name: string
  readonly summary: string
  readonly exercises: ReadonlyArray<string>
}

export const ProgramCard = ({ name, summary, exercises }: ProgramCardProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.surface000 }]}>
      <AppText variant="title2">{name}</AppText>
      <AppText variant="caption" color="inkMuted">
        {summary}
      </AppText>
      <View style={styles.list}>
        {exercises.map((exercise, index) => (
          <View key={exercise} style={styles.item}>
            <View style={[styles.number, { backgroundColor: colors.brandSoft }]}>
              <AppText variant="label">{index + 1}</AppText>
            </View>
            <AppText>{exercise}</AppText>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { gap: Spacing[2], padding: Spacing[5], borderRadius: Radius.md },
  list: { gap: Spacing[2], marginTop: Spacing[2] },
  item: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  number: { width: 28, height: 28, borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center' },
})
