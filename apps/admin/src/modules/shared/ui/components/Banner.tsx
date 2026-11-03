import type { ReactNode } from 'react'

import { Icon, type IconName } from './Icon'

export const BannerTone = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const

export type BannerTone = (typeof BannerTone)[keyof typeof BannerTone]

const ToneStyle: Record<BannerTone, { readonly className: string; readonly icon: IconName }> = {
  info: { className: 'bg-brand-soft text-ink', icon: 'info' },
  success: { className: 'bg-success-surface text-success', icon: 'check' },
  warning: { className: 'bg-warning-surface text-warning', icon: 'alert' },
  danger: { className: 'bg-danger-surface text-danger', icon: 'x' },
}

type BannerProps = {
  readonly title: string
  readonly children?: ReactNode
  readonly tone?: BannerTone
}

export const Banner = ({ title, children, tone = 'info' }: BannerProps) => {
  const style = ToneStyle[tone]
  return (
    <div className={`text-body flex items-start gap-3 rounded-md p-4 ${style.className}`}>
      <Icon name={style.icon} className="mt-0.5" />
      <p className="m-0">
        <span className="block font-bold">{title}</span>
        {children ? <span className="text-ink">{children}</span> : null}
      </p>
    </div>
  )
}
