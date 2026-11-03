export const Level = {
  BEGINNER: 'beginner',
  RETURNING: 'returning',
  REGULAR: 'regular',
} as const

export type Level = (typeof Level)[keyof typeof Level]
