import { Typography, type TypographyName } from '@bora/design-tokens'
import type { TextStyle } from 'react-native'

export const FontFile = {
  display700: 'BricolageGrotesque_700Bold',
  display800: 'BricolageGrotesque_800ExtraBold',
  text400: 'Figtree_400Regular',
  text500: 'Figtree_500Medium',
  text600: 'Figtree_600SemiBold',
  text700: 'Figtree_700Bold',
} as const

type FontFileKey = keyof typeof FontFile

const toTextStyle = ({
  family,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
}: (typeof Typography)[TypographyName]) =>
  ({
    fontFamily: FontFile[`${family}${fontWeight}` as FontFileKey],
    fontSize,
    lineHeight,
    letterSpacing,
  }) satisfies TextStyle

export const TextStyles = Object.fromEntries(
  Object.entries(Typography).map(([name, style]) => [name, toTextStyle(style)])
) as Record<TypographyName, ReturnType<typeof toTextStyle>>
