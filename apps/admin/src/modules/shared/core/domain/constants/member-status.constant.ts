export const MemberStatus = {
  IN_DUO: 'in-duo',
  FRAGILE_DUO: 'fragile-duo',
  WAITING: 'waiting',
  DUO_PROPOSED: 'duo-proposed',
  INVITED: 'invited',
  SUSPENDED: 'suspended',
} as const

export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus]
