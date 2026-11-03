import { Radius, Size } from '@bora/design-tokens'
import { Pressable, StyleSheet } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { withAlpha } from '../theme/with-alpha'
import { Icon, type IconName } from './Icon'

type IconButtonProps = {
  readonly icon: IconName
  readonly accessibilityLabel: string
  readonly onPress: () => void
  readonly tone?: 'default' | 'translucent'
}

export const IconButton = ({ icon, accessibilityLabel, onPress, tone = 'default' }: IconButtonProps) => {
  const { colors } = useTheme()
  const translucent = tone === 'translucent'

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: translucent ? withAlpha(colors.inkInverse, 0.16) : colors.surface200 },
        pressed && styles.pressed,
      ]}
    >
      <Icon name={icon} color={translucent ? colors.inkInverse : colors.ink} size={Size.iconMd} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: Size.tapMin,
    height: Size.tapMin,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.88 },
})
