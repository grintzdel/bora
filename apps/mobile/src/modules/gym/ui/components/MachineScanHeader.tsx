import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Icon } from '../../../shared/ui/components/Icon'
import { IconButton } from '../../../shared/ui/components/IconButton'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type MachineScanHeaderProps = {
  readonly status: string
  readonly onClose: () => void
}

export const MachineScanHeader = ({ status, onClose }: MachineScanHeaderProps) => {
  const { colors } = useTheme()

  return (
    <View style={styles.area}>
      <View style={styles.close}>
        <IconButton icon="close" tone="translucent" accessibilityLabel="Fermer le scan" onPress={onClose} />
      </View>
      <View style={[styles.frame, { borderColor: colors.lime }]}>
        <Icon name="qr" color={colors.inkInverse} size={72} strokeWidth={1.6} />
      </View>
      <AppText variant="label" color="inkInverse" accessibilityLiveRegion="polite">
        {status}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  area: { height: 260, alignItems: 'center', justifyContent: 'center', gap: Spacing[4] },
  close: { position: 'absolute', left: Spacing[5], top: Spacing[2] },
  frame: {
    width: 150,
    height: 150,
    borderRadius: Radius.lg,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
