import type { ReactNode } from 'react'

type ChoiceChipProps = {
  readonly children: ReactNode
  readonly selected: boolean
  readonly onToggle: () => void
}

export const ChoiceChip = ({ children, selected, onToggle }: ChoiceChipProps) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onToggle}
    className="min-h-tap-min rounded-pill border-line-strong bg-surface-000 text-ink focus-visible:outline-focus aria-pressed:border-brand aria-pressed:bg-brand-soft inline-flex cursor-pointer items-center gap-2 border-2 px-5 text-[16px] leading-5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    {children}
  </button>
)
