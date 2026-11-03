export const Availability = {
  LUNCH: 'lunch',
  AFTER_WORK: 'after-work',
  WEEKEND: 'weekend',
} as const

export type Availability = (typeof Availability)[keyof typeof Availability]
