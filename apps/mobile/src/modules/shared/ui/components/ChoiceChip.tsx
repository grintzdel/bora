import { Radius, Size, Spacing } from '@bora/design-tokens'
import { Pressable, StyleSheet } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { Icon } from './Icon'

type ChoiceChipProps = {
  readonly label: string
  readonly selected: boolean
  readonly onPress: () => void
}

export const ChoiceChip = ({ label, selected, onPress }: ChoiceChipProps) => {
  const { colors } = useTheme()

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.brandSoft : colors.surface000,
          borderColor: selected ? colors.brand : colors.lineStrong,
        },
        pressed && styles.pressed,
      ]}
    >
      {selected ? <Icon name="check" color={colors.ink} size={Size.iconSm} /> : null}
      <AppText variant="bodyStrong" style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    minHeight: Size.tapMin,
    paddingHorizontal: Spacing[5],
    borderRadius: Radius.pill,
    borderWidth: 2,
  },
  label: { lineHeight: 20 },
  pressed: { opacity: 0.88 },
})
