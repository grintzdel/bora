export const ReportReason = {
  INAPPROPRIATE_REMARKS: 'inappropriate-remarks',
  INSISTENT_BEHAVIOR: 'insistent-behavior',
  FELT_UNSAFE: 'felt-unsafe',
  OTHER: 'other',
} as const

export type ReportReason = (typeof ReportReason)[keyof typeof ReportReason]
