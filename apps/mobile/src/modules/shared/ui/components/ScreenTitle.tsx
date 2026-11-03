import { Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from './AppText'

type ScreenTitleProps = {
  readonly title: string
  readonly overline?: string
  readonly subtitle?: string
  readonly size?: 'title1' | 'display'
}

export const ScreenTitle = ({ title, overline, subtitle, size = 'title1' }: ScreenTitleProps) => (
  <View style={styles.block}>
    {overline ? (
      <AppText variant="caption" color="inkMuted">
        {overline}
      </AppText>
    ) : null}
    <AppText variant={size} accessibilityRole="header">
      {title}
    </AppText>
    {subtitle ? <AppText color="inkMuted">{subtitle}</AppText> : null}
  </View>
)

const styles = StyleSheet.create({
  block: { gap: Spacing[2] },
})
