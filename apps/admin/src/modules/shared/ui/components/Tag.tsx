import type { ReactNode } from 'react'

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

const ToneClass: Record<TagTone, string> = {
  neutral: 'bg-surface-200 text-ink-muted',
  brand: 'bg-brand-soft text-ink',
  lime: 'bg-lime text-on-lime',
  inverse: 'bg-surface-inverse text-ink-inverse',
  success: 'bg-success-surface text-success',
  warning: 'bg-warning-surface text-warning',
  danger: 'bg-danger-surface text-danger',
}

const ToneIcon: Partial<Record<TagTone, IconName>> = { success: 'check', warning: 'alert', danger: 'x' }

type TagProps = {
  readonly children: ReactNode
  readonly tone?: TagTone
  readonly icon?: IconName | null
}

export const Tag = ({ children, tone = 'neutral', icon }: TagProps) => {
  const iconName = icon === undefined ? ToneIcon[tone] : icon
  return (
    <span
      className={`rounded-pill text-label inline-flex items-center gap-1 px-3 py-1.5 whitespace-nowrap ${ToneClass[tone]}`}
    >
      {iconName ? <Icon name={iconName} size={16} /> : null}
      {children}
    </span>
  )
}
