export const ProposalKind = {
  REGULAR: 'regular',
  TONIGHT: 'tonight',
} as const

export type ProposalKind = (typeof ProposalKind)[keyof typeof ProposalKind]
