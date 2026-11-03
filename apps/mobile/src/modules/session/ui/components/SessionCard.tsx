import { Radius, Spacing } from '@bora/design-tokens'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import type { IconName } from '../../../shared/ui/components/Icon'
import { Initials } from '../../../shared/ui/components/Initials'
import { Tag, type TagTone } from '../../../shared/ui/components/Tag'
import { useTheme } from '../../../shared/ui/hooks/use-theme'
import type { SessionStatus } from '../../core/domain/constants/session-status.constant'
import { SessionStatusLabel } from '../format/session-labels'

const StatusTone: Record<SessionStatus, { readonly tone: TagTone; readonly icon?: IconName }> = {
  confirmed: { tone: 'success' },
  pending: { tone: 'warning' },
  done: { tone: 'lime', icon: 'check' },
  cancelled: { tone: 'danger' },
}

const HighlightIcon: Record<SessionStatus, IconName> = {
  confirmed: 'check',
  pending: 'alert',
  done: 'check',
  cancelled: 'x',
}

type SessionCardProps = {
  readonly when: string
  readonly program: string
  readonly partnerName: string | null
  readonly status: SessionStatus
  readonly highlight?: boolean
  readonly children?: ReactNode
}

export const SessionCard = ({ when, program, partnerName, status, highlight = false, children }: SessionCardProps) => {
  const { colors } = useTheme()
  const ink = highlight ? 'inkInverse' : 'ink'
  const tag = highlight ? { tone: 'lime' as const, icon: HighlightIcon[status] } : StatusTone[status]

  return (
    <View style={[styles.card, { backgroundColor: highlight ? colors.surfaceInverse : colors.surface000 }]}>
      <Tag label={SessionStatusLabel[status]} tone={tag.tone} icon={tag.icon} />
      <AppText variant="title1" color={ink}>
        {when}
      </AppText>
      <AppText color={ink}>{program}</AppText>
      {partnerName ? (
        <View style={styles.duo}>
          <Initials name={partnerName} tone={highlight ? 'lime' : 'brand'} />
          <View>
            <AppText variant="caption" color={ink}>
              Ton duo
            </AppText>
            <AppText variant="bodyStrong" color={ink} style={styles.name}>
              {partnerName}
            </AppText>
          </View>
        </View>
      ) : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: { gap: Spacing[3], padding: Spacing[6], borderRadius: Radius.lg },
  duo: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  name: { lineHeight: 22 },
})
