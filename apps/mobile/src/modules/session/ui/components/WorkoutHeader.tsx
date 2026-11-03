import { Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Button } from '../../../shared/ui/components/Button'
import { IconButton } from '../../../shared/ui/components/IconButton'

type WorkoutHeaderProps = {
  readonly title: string
  readonly subtitle: string
  readonly onQuit: () => void
  readonly onReport: () => void
}

export const WorkoutHeader = ({ title, subtitle, onQuit, onReport }: WorkoutHeaderProps) => (
  <View style={styles.header}>
    <IconButton icon="close" accessibilityLabel="Quitter la séance" onPress={onQuit} />
    <View style={styles.text}>
      <AppText variant="headline">{title}</AppText>
      <AppText variant="caption" color="inkMuted">
        {subtitle}
      </AppText>
    </View>
    <Button label="Signaler" variant="secondary" icon="flag" onPress={onReport} />
  </View>
)

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  text: { flex: 1, gap: 2 },
})
