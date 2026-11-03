import { type ColorName, Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { Icon, type IconName } from './Icon'

export const BannerTone = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const

export type BannerTone = (typeof BannerTone)[keyof typeof BannerTone]

const ToneStyle: Record<
  BannerTone,
  { readonly background: ColorName; readonly accent: ColorName; readonly icon: IconName }
> = {
  info: { background: 'brandSoft', accent: 'ink', icon: 'info' },
  success: { background: 'successSurface', accent: 'success', icon: 'check' },
  warning: { background: 'warningSurface', accent: 'warning', icon: 'alert' },
  danger: { background: 'dangerSurface', accent: 'danger', icon: 'x' },
}

type BannerProps = {
  readonly title: string
  readonly message?: string
  readonly tone?: BannerTone
}

export const Banner = ({ title, message, tone = 'info' }: BannerProps) => {
  const { colors } = useTheme()
  const style = ToneStyle[tone]

  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : undefined}
      accessibilityLiveRegion="polite"
      style={[styles.banner, { backgroundColor: colors[style.background] }]}
    >
      <View style={styles.icon}>
        <Icon name={style.icon} color={colors[style.accent]} />
      </View>
      <View style={styles.text}>
        <AppText variant="bodyStrong" color={style.accent}>
          {title}
        </AppText>
        {message ? <AppText>{message}</AppText> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[3],
    padding: Spacing[4],
    borderRadius: Radius.md,
  },
  icon: { marginTop: 2 },
  text: { flex: 1 },
})
