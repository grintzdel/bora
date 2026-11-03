import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Icon } from '../../../shared/ui/components/Icon'
import { useTheme } from '../../../shared/ui/hooks/use-theme'
import { withAlpha } from '../../../shared/ui/theme/with-alpha'

type SessionDoneHeroProps = {
  readonly title: string
  readonly summary: string
}

export const SessionDoneHero = ({ title, summary }: SessionDoneHeroProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.lime }]}>
      <View style={[styles.bigCircle, { backgroundColor: withAlpha(colors.onLime, 0.08) }]} />
      <View style={[styles.smallCircle, { backgroundColor: withAlpha(colors.onLime, 0.12) }]} />
      <View style={styles.status}>
        <Icon name="check" color={colors.onLime} />
        <AppText variant="label" color="onLime">
          Séance validée
        </AppText>
      </View>
      <AppText variant="number" color="onLime" accessibilityRole="header">
        {title}
      </AppText>
      <AppText color="onLime">{summary}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing[3],
    paddingVertical: 28,
    paddingHorizontal: Spacing[6],
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  bigCircle: { position: 'absolute', right: -24, top: -24, width: 120, height: 120, borderRadius: Radius.pill },
  smallCircle: { position: 'absolute', right: 44, top: 36, width: 64, height: 64, borderRadius: Radius.pill },
  status: { flexDirection: 'row', alignItems: 'center', gap: Spacing[1] },
})
