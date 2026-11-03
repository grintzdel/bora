import { type ColorName, Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { AppText } from './AppText'
import { Icon, type IconName } from './Icon'

export const TagTone = {
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  LIME: 'lime',
  INVERSE: 'inverse',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const

export type TagTone = (typeof TagTone)[keyof typeof TagTone]

const ToneColors: Record<TagTone, { readonly background: ColorName; readonly text: ColorName }> = {
  neutral: { background: 'surface200', text: 'inkMuted' },
  brand: { background: 'brandSoft', text: 'ink' },
  lime: { background: 'lime', text: 'onLime' },
  inverse: { background: 'surfaceInverse', text: 'inkInverse' },
  success: { background: 'successSurface', text: 'success' },
  warning: { background: 'warningSurface', text: 'warning' },
  danger: { background: 'dangerSurface', text: 'danger' },
}

const ToneIcon: Partial<Record<TagTone, IconName>> = { success: 'check', warning: 'alert', danger: 'x' }

type TagProps = {
  readonly label: string
  readonly tone?: TagTone
  readonly icon?: IconName | null
}

export const Tag = ({ label, tone = 'neutral', icon }: TagProps) => {
  const { colors } = useTheme()
  const palette = ToneColors[tone]
  const iconName = icon === undefined ? ToneIcon[tone] : icon

  return (
    <View style={[styles.tag, { backgroundColor: colors[palette.background] }]}>
      {iconName ? <Icon name={iconName} color={colors[palette.text]} size={16} /> : null}
      <AppText variant="label" color={palette.text}>
        {label}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing[1],
    paddingVertical: 6,
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.pill,
  },
})
