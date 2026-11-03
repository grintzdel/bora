export const PartnerAbsenceChoice = {
  NEW_DUO: 'new-duo',
  RESCHEDULE: 'reschedule',
  GO_SOLO: 'go-solo',
} as const

export type PartnerAbsenceChoice = (typeof PartnerAbsenceChoice)[keyof typeof PartnerAbsenceChoice]
