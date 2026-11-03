export const MachineStatus = {
  READY: 'ready',
  QR_MISSING: 'qr-missing',
  TUTORIAL_MISSING: 'tutorial-missing',
} as const

export type MachineStatus = (typeof MachineStatus)[keyof typeof MachineStatus]
