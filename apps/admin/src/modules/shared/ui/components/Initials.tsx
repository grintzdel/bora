import { initials } from '../format/initials'

type InitialsProps = {
  readonly name: string
  readonly size?: 'sm' | 'md'
  readonly onSoft?: boolean
}

export const Initials = ({ name, size = 'sm', onSoft = false }: InitialsProps) => (
  <span
    aria-hidden="true"
    className={`rounded-pill text-ink inline-flex shrink-0 items-center justify-center font-bold ${
      size === 'md' ? 'size-10 text-[15px]' : 'size-9 text-[13px]'
    } ${onSoft ? 'bg-surface-000' : 'bg-brand-soft'}`}
  >
    {initials(name)}
  </span>
)
