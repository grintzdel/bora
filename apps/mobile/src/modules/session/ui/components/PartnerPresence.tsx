import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Initials } from '../../../shared/ui/components/Initials'
import { Tag } from '../../../shared/ui/components/Tag'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type PartnerPresenceProps = {
  readonly memberName: string
  readonly partnerName: string
  readonly message: string
}

export const PartnerPresence = ({ memberName, partnerName, message }: PartnerPresenceProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.row, { backgroundColor: colors.surface000 }]}>
      <View style={styles.avatars}>
        <Initials name={memberName} outlined />
        <View style={styles.overlap}>
          <Initials name={partnerName} tone="lime" outlined />
        </View>
      </View>
      <AppText variant="bodyStrong" style={styles.message}>
        {message}
      </AppText>
      <Tag label="À la salle" tone="success" />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    borderRadius: Radius.md,
  },
  avatars: { flexDirection: 'row' },
  overlap: { marginLeft: -10 },
  message: { flex: 1, lineHeight: 22 },
})
