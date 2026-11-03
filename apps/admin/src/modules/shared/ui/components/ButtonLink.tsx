import Link from 'next/link'
import type { ReactNode } from 'react'

import { type ButtonStyle, buttonClassName } from './button-styles'
import { Icon, type IconName } from './Icon'

type ButtonLinkProps = ButtonStyle & {
  readonly href: string
  readonly children: ReactNode
  readonly iconStart?: IconName
  readonly iconEnd?: IconName
}

export const ButtonLink = ({ href, children, iconStart, iconEnd, ...style }: ButtonLinkProps) => (
  <Link href={href} className={buttonClassName(style)}>
    {iconStart ? <Icon name={iconStart} /> : null}
    {children}
    {iconEnd ? <Icon name={iconEnd} /> : null}
  </Link>
)
