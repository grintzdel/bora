import { type ColorName, Radius, Size, Spacing } from '@bora/design-tokens'
import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { Icon, type IconName } from './Icon'

export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  QUIET: 'quiet',
  DANGER: 'danger',
} as const

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]

const VariantColors: Record<
  ButtonVariant,
  { readonly background: ColorName | null; readonly text: ColorName; readonly border: ColorName | null }
> = {
  primary: { background: 'lime', text: 'onLime', border: null },
  secondary: { background: null, text: 'ink', border: 'lineStrong' },
  quiet: { background: null, text: 'brand', border: null },
  danger: { background: 'danger', text: 'onDanger', border: null },
}

type ButtonProps = {
  readonly label: string
  readonly onPress?: () => void
  readonly onLongPress?: () => void
  readonly variant?: ButtonVariant
  readonly size?: 'md' | 'lg'
  readonly block?: boolean
  readonly icon?: IconName
  readonly disabled?: boolean
  readonly accessibilityHint?: string
  readonly style?: StyleProp<ViewStyle>
}

export const Button = ({
  label,
  onPress,
  onLongPress,
  variant = 'primary',
  size = 'md',
  block = false,
  icon,
  disabled = false,
  accessibilityHint,
  style,
}: ButtonProps) => {
  const { colors } = useTheme()
  const palette = VariantColors[variant]

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: palette.background ? colors[palette.background] : 'transparent',
          borderColor: palette.border ? colors[palette.border] : 'transparent',
        },
        size === 'lg' && styles.large,
        block && styles.block,
        variant === 'quiet' && styles.quiet,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText variant="button" color={palette.text}>
        {label}
      </AppText>
      {icon ? <Icon name={icon} color={colors[palette.text]} size={Size.iconSm} /> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    minHeight: Size.tapMin,
    paddingHorizontal: Spacing[6],
    borderRadius: Radius.pill,
    borderWidth: 2,
  },
  large: { minHeight: Size.buttonLg },
  block: { alignSelf: 'stretch' },
  quiet: { paddingHorizontal: Spacing[3] },
  pressed: { opacity: 0.88 },
  disabled: { opacity: 0.4 },
})
