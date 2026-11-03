import { StyleSheet, View } from 'react-native'

import { RadioCard } from '../../../shared/ui/components/RadioCard'
import type { ReportReason } from '../../core/domain/constants/report-reason.constant'
import { ReportReasonLabel } from '../format/report-labels'

type ReportReasonsProps = {
  readonly selected: ReportReason | null
  readonly onSelect: (reason: ReportReason) => void
}

export const ReportReasons = ({ selected, onSelect }: ReportReasonsProps) => (
  <View accessibilityRole="radiogroup" style={styles.list}>
    {(Object.keys(ReportReasonLabel) as ReportReason[]).map((reason) => (
      <RadioCard
        key={reason}
        title={ReportReasonLabel[reason].title}
        description={ReportReasonLabel[reason].description}
        selected={selected === reason}
        onPress={() => onSelect(reason)}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  list: { gap: 10 },
})
