import type { ColorName, TypographyName } from '@bora/design-tokens'
import type { ReactNode } from 'react'
import { type StyleProp, Text, type TextProps, type TextStyle } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { TextStyles } from '../theme/text-styles'

type AppTextProps = Omit<TextProps, 'style'> & {
  readonly variant?: TypographyName
  readonly color?: ColorName
  readonly style?: StyleProp<TextStyle>
  readonly children: ReactNode
}

export const AppText = ({ variant = 'body', color = 'ink', style, children, ...rest }: AppTextProps) => {
  const { colors } = useTheme()

  return (
    <Text {...rest} style={[TextStyles[variant], { color: colors[color] }, style]}>
      {children}
    </Text>
  )
}
