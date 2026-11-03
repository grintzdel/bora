import type { ReactNode } from 'react'

import { Tag } from './Tag'

type PageHeaderProps = {
  readonly title: string
  readonly subtitle?: string
  readonly actions?: ReactNode
  readonly hero?: boolean
}

export const PageHeader = ({ title, subtitle, actions, hero = false }: PageHeaderProps) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div className="flex flex-col items-start gap-2">
      <Tag tone="neutral" icon="info">
        Données de démonstration
      </Tag>
      <h1 className={`font-display m-0 ${hero ? 'text-title-1 sm:text-display' : 'text-title-1'}`}>{title}</h1>
      {subtitle ? <p className="text-body text-ink-muted m-0">{subtitle}</p> : null}
    </div>
    {actions ? <div className="flex w-full flex-wrap gap-2 sm:w-auto">{actions}</div> : null}
  </div>
)
