export const Feedback = {
  TOO_EASY: 'too-easy',
  JUST_RIGHT: 'just-right',
  HARD: 'hard',
} as const

export type Feedback = (typeof Feedback)[keyof typeof Feedback]
