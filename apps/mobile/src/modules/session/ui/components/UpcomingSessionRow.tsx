import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Tag } from '../../../shared/ui/components/Tag'
import { useTheme } from '../../../shared/ui/hooks/use-theme'
import { SessionStatus } from '../../core/domain/constants/session-status.constant'

type UpcomingSessionRowProps = {
  readonly when: string
  readonly detail: string
  readonly status: SessionStatus
}

export const UpcomingSessionRow = ({ when, detail, status }: UpcomingSessionRowProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.row, { backgroundColor: colors.surface000 }]}>
      <View style={styles.text}>
        <AppText variant="headline">{when}</AppText>
        <AppText variant="caption" color="inkMuted">
          {detail}
        </AppText>
      </View>
      {status === SessionStatus.PENDING ? <Tag label="À confirmer" tone="warning" /> : null}
      {status === SessionStatus.CONFIRMED ? <Tag label="Confirmée" tone="success" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[5],
    borderRadius: Radius.md,
  },
  text: { flex: 1, gap: 2 },
})
