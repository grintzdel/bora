export const Gender = {
  FEMALE: 'female',
  MALE: 'male',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]
