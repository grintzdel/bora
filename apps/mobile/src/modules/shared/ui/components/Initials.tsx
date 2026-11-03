import { Radius } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { initials } from '../format/initials'
import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'

type InitialsProps = {
  readonly name: string
  readonly size?: number
  readonly tone?: 'brand' | 'lime'
  readonly outlined?: boolean
}

export const Initials = ({ name, size = 40, tone = 'brand', outlined = false }: InitialsProps) => {
  const { colors } = useTheme()

  return (
    <View
      aria-hidden
      style={[
        styles.circle,
        { width: size, height: size, backgroundColor: tone === 'lime' ? colors.lime : colors.brandSoft },
        outlined && { borderWidth: 2, borderColor: colors.surface000 },
      ]}
    >
      <AppText
        variant="bodyStrong"
        color={tone === 'lime' ? 'onLime' : 'ink'}
        style={{ fontSize: size > 48 ? 22 : 15, lineHeight: size > 48 ? 28 : 20 }}
      >
        {initials(name)}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: { borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center' },
})
