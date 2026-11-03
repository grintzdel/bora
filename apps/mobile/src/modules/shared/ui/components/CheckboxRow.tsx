import { Radius, Size, Spacing } from '@bora/design-tokens'
import { Pressable, StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { Icon } from './Icon'

type CheckboxRowProps = {
  readonly label: string
  readonly description?: string
  readonly checked: boolean
  readonly onToggle: () => void
}

export const CheckboxRow = ({ label, description, checked, onToggle }: CheckboxRowProps) => {
  const { colors } = useTheme()

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={[styles.row, { backgroundColor: colors.surface000 }]}
    >
      <View
        style={[
          styles.box,
          checked
            ? { backgroundColor: colors.brand, borderColor: colors.brand }
            : { backgroundColor: colors.surface000, borderColor: colors.lineStrong },
        ]}
      >
        {checked ? <Icon name="check" color={colors.onBrand} size={16} strokeWidth={3} /> : null}
      </View>
      <View style={styles.text}>
        <AppText variant="bodyStrong">{label}</AppText>
        {description ? (
          <AppText variant="caption" color="inkMuted">
            {description}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    minHeight: Size.tapMin,
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    borderRadius: Radius.md,
  },
  box: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1 },
})
