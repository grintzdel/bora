import { Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from './AppText'
import { ChoiceChip } from './ChoiceChip'

type ChoiceGroupProps<Value extends string> = {
  readonly label: string
  readonly options: ReadonlyArray<{ readonly value: Value; readonly label: string }>
  readonly isSelected: (value: Value) => boolean
  readonly onSelect: (value: Value) => void
}

export const ChoiceGroup = <Value extends string>({
  label,
  options,
  isSelected,
  onSelect,
}: ChoiceGroupProps<Value>) => (
  <View style={styles.group}>
    <AppText variant="headline">{label}</AppText>
    <View style={styles.chips}>
      {options.map((option) => (
        <ChoiceChip
          key={option.value}
          label={option.label}
          selected={isSelected(option.value)}
          onPress={() => onSelect(option.value)}
        />
      ))}
    </View>
  </View>
)

const styles = StyleSheet.create({
  group: { gap: Spacing[3] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
})
