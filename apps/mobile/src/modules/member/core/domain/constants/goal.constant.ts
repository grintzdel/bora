export const Goal = {
  FEEL_FIT: 'feel-fit',
  BUILD_HABIT: 'build-habit',
  GAIN_STRENGTH: 'gain-strength',
} as const

export type Goal = (typeof Goal)[keyof typeof Goal]
