import { Colors, ColorScheme, Shadow } from '@bora/design-tokens'
import { useColorScheme } from 'react-native'

export const useTheme = () => {
  const scheme = useColorScheme() === ColorScheme.DARK ? ColorScheme.DARK : ColorScheme.LIGHT

  return { scheme, colors: Colors[scheme], shadow: Shadow[scheme] }
}
