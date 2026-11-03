import { Spacing } from '@bora/design-tokens'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '@/modules/shared/ui/hooks/use-theme'
import { TextStyles } from '@/modules/shared/ui/theme/text-styles'

export default function HomeScreen() {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.display, { color: colors.ink }]}>Bora</Text>
      <Text style={[TextStyles.body, { color: colors.inkMuted }]}>Quelqu&apos;un t&apos;attend, alors tu y vas.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[4],
    paddingHorizontal: Spacing[5],
  },
})
