import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type FirstSessionCardProps = {
  readonly label: string
  readonly title: string
  readonly note: string
}

export const FirstSessionCard = ({ label, title, note }: FirstSessionCardProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.surface200 }]}>
      <AppText variant="caption" color="inkMuted">
        {label}
      </AppText>
      <AppText variant="headline">{title}</AppText>
      <AppText variant="caption" color="inkMuted">
        {note}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { gap: Spacing[1], paddingVertical: Spacing[4], paddingHorizontal: Spacing[5], borderRadius: Radius.md },
})
