import { Size, Spacing } from '@bora/design-tokens'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { Icon, type IconName } from './Icon'

export type TabBarItem = { readonly name: string; readonly label: string; readonly icon: IconName }

type TabBarProps = {
  readonly items: ReadonlyArray<TabBarItem>
  readonly activeName: string
  readonly onSelect: (name: string) => void
}

export const TabBar = ({ items, activeName, onSelect }: TabBarProps) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.bar, { backgroundColor: colors.surface200, paddingBottom: Math.max(insets.bottom, Spacing[6]) }]}
    >
      {items.map((item) => {
        const active = item.name === activeName
        return (
          <Pressable
            key={item.name}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(item.name)}
            style={styles.tab}
          >
            <Icon name={item.icon} color={active ? colors.brand : colors.inkMuted} size={Size.iconMd} />
            <AppText variant="label" color={active ? 'brand' : 'inkMuted'}>
              {item.label}
            </AppText>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: Spacing[2], paddingHorizontal: Spacing[3] },
  tab: { minWidth: 64, minHeight: Size.tapMin, alignItems: 'center', gap: Spacing[1] },
})
