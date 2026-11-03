export const ReportStatus = {
  TO_HANDLE: 'to-handle',
  HANDLED: 'handled',
} as const

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]
