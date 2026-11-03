import { Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { Icon } from '../../../shared/ui/components/Icon'
import { Initials } from '../../../shared/ui/components/Initials'
import { Tag } from '../../../shared/ui/components/Tag'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type DuoProposalCardProps = {
  readonly partnerName: string
  readonly partnerTag: string
  readonly commonGround: ReadonlyArray<string>
}

export const DuoProposalCard = ({ partnerName, partnerTag, commonGround }: DuoProposalCardProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.surface000 }]}>
      <View style={styles.identity}>
        <Initials name={partnerName} size={64} />
        <View style={styles.name}>
          <AppText variant="title2">{partnerName}</AppText>
          <Tag label={partnerTag} tone="brand" />
        </View>
      </View>
      <View style={[styles.separator, { backgroundColor: colors.line }]} />
      <AppText variant="label" color="inkMuted">
        Ce que vous avez en commun
      </AppText>
      <View style={styles.list}>
        {commonGround.map((item) => (
          <View key={item} style={styles.item}>
            <Icon name="check" color={colors.brand} />
            <AppText>{item}</AppText>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { gap: Spacing[4], padding: Spacing[6], borderRadius: Radius.lg },
  identity: { flexDirection: 'row', alignItems: 'center', gap: Spacing[4] },
  name: { flex: 1, gap: 6 },
  separator: { height: 1 },
  list: { gap: 10 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10 },
})
