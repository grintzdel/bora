export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  QUIET: 'quiet',
  DANGER: 'danger',
} as const

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]

const VariantClass: Record<ButtonVariant, string> = {
  primary: 'bg-lime text-on-lime',
  secondary: 'border-line-strong bg-transparent text-ink',
  quiet: 'bg-transparent px-3 text-brand',
  danger: 'bg-danger text-on-danger',
}

export type ButtonStyle = {
  readonly variant?: ButtonVariant
  readonly size?: 'md' | 'lg'
  readonly block?: boolean
}

export const buttonClassName = ({ variant = 'primary', size = 'md', block = false }: ButtonStyle) =>
  [
    'inline-flex items-center justify-center gap-2 rounded-pill border-2 border-transparent px-6 text-button',
    'cursor-pointer transition-[filter] duration-150 ease-out active:brightness-94',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
    'disabled:cursor-not-allowed disabled:opacity-40',
    size === 'lg' ? 'min-h-button-lg' : 'min-h-tap-min',
    block ? 'w-full' : '',
    VariantClass[variant],
  ].join(' ')
