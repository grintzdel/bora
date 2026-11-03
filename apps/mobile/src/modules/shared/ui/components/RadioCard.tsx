import { Radius, Spacing } from '@bora/design-tokens'
import { Pressable, StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { FontFile } from '../theme/text-styles'
import { AppText } from './AppText'

type RadioCardProps = {
  readonly title: string
  readonly description: string
  readonly selected: boolean
  readonly onPress: () => void
}

export const RadioCard = ({ title, description, selected, onPress }: RadioCardProps) => {
  const { colors } = useTheme()

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected ? colors.brandSoft : colors.surface000,
          borderColor: selected ? colors.brand : 'transparent',
        },
      ]}
    >
      <View style={[styles.radio, { borderColor: selected ? colors.brand : colors.lineStrong }]}>
        {selected ? <View style={[styles.dot, { backgroundColor: colors.brand }]} /> : null}
      </View>
      <View style={styles.text}>
        <AppText variant="bodyStrong" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="caption" color="inkMuted">
          {description}
        </AppText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[3],
    padding: Spacing[4],
    borderRadius: Radius.md,
    borderWidth: 2,
  },
  radio: {
    width: 22,
    height: 22,
    marginTop: 1,
    borderRadius: Radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 10, height: 10, borderRadius: Radius.pill },
  text: { flex: 1, gap: 2 },
  title: { fontFamily: FontFile.text700, lineHeight: 22 },
})
