import { type ColorName, Spacing } from '@bora/design-tokens'
import type { ReactNode } from 'react'
import { ScrollView, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '../hooks/use-theme'

type ScreenProps = {
  readonly children: ReactNode
  readonly footer?: ReactNode
  readonly background?: ColorName
  readonly gap?: number
  readonly contentStyle?: StyleProp<ViewStyle>
}

export const Screen = ({
  children,
  footer,
  background = 'surface100',
  gap = Spacing[5],
  contentStyle,
}: ScreenProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.root, { backgroundColor: colors[background] }]}>
      <SafeAreaView edges={['top']} style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.content, { gap }, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
      {footer}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: Spacing[5], paddingTop: Spacing[4], paddingBottom: Spacing[5] },
})
