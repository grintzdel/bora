export const SessionStatus = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  DONE: 'done',
  CANCELLED: 'cancelled',
} as const

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]
