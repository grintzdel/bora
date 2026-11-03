import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Tag } from '../../../shared/ui/components/Tag'
import { useTheme } from '../../../shared/ui/hooks/use-theme'
import { withAlpha } from '../../../shared/ui/theme/with-alpha'

type ExerciseCardProps = {
  readonly setLabel: string
  readonly name: string
  readonly effortLabel: string
  readonly settings: ReadonlyArray<{ readonly label: string; readonly value: string }>
}

export const ExerciseCard = ({ setLabel, name, effortLabel, settings }: ExerciseCardProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.surfaceInverse }]}>
      <Tag label={setLabel} tone="lime" icon={null} />
      <AppText variant="display" color="inkInverse" accessibilityRole="header">
        {name}
      </AppText>
      <AppText color="inkInverse">{effortLabel}</AppText>
      <View style={styles.settings}>
        {settings.map((setting) => (
          <View key={setting.label} style={[styles.setting, { backgroundColor: withAlpha(colors.inkInverse, 0.12) }]}>
            <AppText variant="caption" color="inkInverse">
              {setting.label}
            </AppText>
            <AppText variant="headline" color="inkInverse">
              {setting.value}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { gap: 14, padding: Spacing[6], borderRadius: Radius.lg },
  settings: { flexDirection: 'row', gap: Spacing[2] },
  setting: { flex: 1, gap: 2, padding: Spacing[3], borderRadius: Radius.sm },
})
