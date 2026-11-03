export const MemberFilter = {
  ALL: 'all',
  WAITING: 'waiting',
  FRAGILE: 'fragile',
} as const

export type MemberFilter = (typeof MemberFilter)[keyof typeof MemberFilter]
