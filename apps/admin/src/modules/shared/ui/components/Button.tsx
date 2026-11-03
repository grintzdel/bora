import type { ReactNode } from 'react'

import { type ButtonStyle, buttonClassName } from './button-styles'
import { Icon, type IconName } from './Icon'

type ButtonProps = ButtonStyle & {
  readonly children: ReactNode
  readonly onClick?: () => void
  readonly type?: 'button' | 'submit'
  readonly disabled?: boolean
  readonly iconStart?: IconName
  readonly iconEnd?: IconName
  readonly ariaLabel?: string
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  disabled,
  iconStart,
  iconEnd,
  ariaLabel,
  ...style
}: ButtonProps) => (
  <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={buttonClassName(style)}>
    {iconStart ? <Icon name={iconStart} /> : null}
    {children}
    {iconEnd ? <Icon name={iconEnd} /> : null}
  </button>
)
