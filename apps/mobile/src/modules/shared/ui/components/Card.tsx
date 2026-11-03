import { type ColorName, Radius, Spacing } from '@bora/design-tokens'
import type { ReactNode } from 'react'
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'

export const CardTone = {
  DEFAULT: 'default',
  RECESSED: 'recessed',
  INVERSE: 'inverse',
  LIME: 'lime',
} as const

export type CardTone = (typeof CardTone)[keyof typeof CardTone]

const ToneColors: Record<
  CardTone,
  { readonly background: ColorName; readonly text: ColorName; readonly muted: ColorName }
> = {
  default: { background: 'surface000', text: 'ink', muted: 'inkMuted' },
  recessed: { background: 'surface200', text: 'ink', muted: 'inkMuted' },
  inverse: { background: 'surfaceInverse', text: 'inkInverse', muted: 'inkInverse' },
  lime: { background: 'lime', text: 'onLime', muted: 'onLime' },
}

type CardProps = {
  readonly title?: string
  readonly description?: string
  readonly tone?: CardTone
  readonly size?: 'md' | 'lg'
  readonly children?: ReactNode
  readonly style?: StyleProp<ViewStyle>
}

export const Card = ({ title, description, tone = 'default', size = 'md', children, style }: CardProps) => {
  const { colors } = useTheme()
  const palette = ToneColors[tone]

  return (
    <View style={[styles.card, size === 'lg' && styles.large, { backgroundColor: colors[palette.background] }, style]}>
      {title ? (
        <AppText variant="headline" color={palette.text}>
          {title}
        </AppText>
      ) : null}
      {description ? <AppText color={palette.muted}>{description}</AppText> : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: { gap: Spacing[3], padding: Spacing[5], borderRadius: Radius.md },
  large: { padding: Spacing[6], borderRadius: Radius.lg },
})
