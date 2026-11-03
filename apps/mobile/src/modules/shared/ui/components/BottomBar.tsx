import { Radius, Spacing } from '@bora/design-tokens'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '../hooks/use-theme'

export const BottomBar = ({ children }: { readonly children: ReactNode }) => {
  const { colors, shadow } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface000,
          boxShadow: shadow.float,
          paddingBottom: Math.max(insets.bottom, Spacing[6]),
        },
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    gap: Spacing[1],
    paddingTop: Spacing[4],
    paddingHorizontal: Spacing[5],
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
})
