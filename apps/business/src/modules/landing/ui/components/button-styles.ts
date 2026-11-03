const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'

export const buttonStyles = {
  lime: `inline-flex h-tap-min items-center justify-center gap-2 rounded-pill bg-lime px-5 text-button text-on-lime transition hover:opacity-90 ${focus}`,
  limeLg: `inline-flex h-button-lg items-center justify-center gap-2 rounded-pill bg-lime px-6 text-button text-on-lime transition hover:opacity-90 ${focus}`,
  inverse: `inline-flex h-tap-min items-center justify-center gap-2 rounded-pill bg-surface-inverse px-5 text-button text-ink-inverse transition hover:opacity-90 ${focus}`,
  ghostOnDark: `inline-flex h-tap-min items-center justify-center gap-2 rounded-pill border border-ink-inverse/35 px-5 text-button text-ink-inverse transition hover:bg-ink-inverse/10 ${focus}`,
} as const
