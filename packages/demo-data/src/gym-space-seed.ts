import type { SeedPerson, SeedSlot } from './demo-seed'

export type SeedGymMember = {
  personId: string
  activated: boolean
  suspended: boolean
  waitingSinceDaysAgo: number | null
}

export type SeedGymDuo = {
  id: string
  memberIds: [string, string]
  formedDaysAgo: number
  slot: SeedSlot
  sessionsDone: number
  cancelledInARow: number
}

export type SeedDuoInvite = {
  id: string
  memberIds: [string, string]
  sentDaysAgo: number
}

export type SeedRetentionCurve = { day30: number; day60: number; day90: number }

export type SeedGymReport = {
  id: string
  receivedDaysAgo: number
  slot: SeedSlot
  reason: 'inappropriate-remarks' | 'insistent-behavior' | 'felt-unsafe' | 'other'
  reporterId: string
  reportedId: string
  status: 'to-handle' | 'handled'
}

export type SeedMachineStatus = { qrInstalled: boolean; scansThisMonth: number }

export type GymSpaceSeed = {
  manager: { firstName: string; displayName: string }
  monthlyFeeCents: number
  inviteUrl: string
  machineQrBaseUrl: string
  newcomers: SeedPerson[]
  members: SeedGymMember[]
  duos: SeedGymDuo[]
  duoInvites: SeedDuoInvite[]
  retention: {
    cohortMonthsAgo: number
    duoMembersInCohort: number
    duo: SeedRetentionCurve
    solo: SeedRetentionCurve
  }
  invitations: { openedThisMonth: number }
  machineStatus: Record<string, SeedMachineStatus>
  reports: SeedGymReport[]
}

const newcomer = (
  id: string,
  displayName: string,
  gender: SeedPerson['gender'],
  joinedDaysAgo: number,
  level: SeedPerson['profile']['level'],
  availability: SeedPerson['profile']['availability']
): SeedPerson => ({
  id,
  firstName: displayName.split(' ')[0] ?? displayName,
  displayName,
  gender,
  joinedDaysAgo,
  profile: { level, goal: 'build-habit', availability, sameGenderDuo: gender === 'female' },
})

const member = (personId: string, activated = true): SeedGymMember => ({
  personId,
  activated,
  suspended: false,
  waitingSinceDaysAgo: null,
})

export const gymSpaceSeed: GymSpaceSeed = {
  manager: { firstName: 'Nadia', displayName: 'Nadia R.' },
  monthlyFeeCents: 2990,
  inviteUrl: 'https://bora.app/salle/club-pilote',
  machineQrBaseUrl: 'bora://machine/',
  newcomers: [
    newcomer('karim', 'Karim B.', 'male', 20, 'returning', ['after-work']),
    newcomer('hugo', 'Hugo T.', 'male', 18, 'beginner', ['after-work']),
    newcomer('thomas', 'Thomas R.', 'male', 25, 'beginner', ['weekend']),
    newcomer('yanis', 'Yanis K.', 'male', 22, 'beginner', ['weekend']),
    newcomer('clara', 'Clara P.', 'female', 9, 'beginner', ['lunch']),
    newcomer('nora', 'Nora B.', 'female', 12, 'beginner', ['lunch']),
    newcomer('julien', 'Julien F.', 'male', 8, 'returning', ['lunch']),
    newcomer('mehdi', 'Mehdi S.', 'male', 3, 'returning', ['lunch']),
    newcomer('emma', 'Emma L.', 'female', 2, 'beginner', ['after-work']),
    newcomer('lucas', 'Lucas G.', 'male', 1, 'beginner', ['weekend']),
  ],
  members: [
    member('sarah'),
    member('lea'),
    member('ines'),
    member('camille'),
    member('karim'),
    member('hugo'),
    member('thomas'),
    member('yanis'),
    member('clara'),
    member('nora'),
    member('julien'),
    member('mehdi', false),
    member('emma', false),
    member('lucas', false),
  ],
  duos: [
    {
      id: 'duo-sarah-lea',
      memberIds: ['sarah', 'lea'],
      formedDaysAgo: 8,
      slot: { weekday: 'tuesday', time: '18:30' },
      sessionsDone: 3,
      cancelledInARow: 0,
    },
    {
      id: 'duo-karim-hugo',
      memberIds: ['karim', 'hugo'],
      formedDaysAgo: 15,
      slot: { weekday: 'thursday', time: '19:00' },
      sessionsDone: 1,
      cancelledInARow: 2,
    },
    {
      id: 'duo-thomas-yanis',
      memberIds: ['thomas', 'yanis'],
      formedDaysAgo: 18,
      slot: { weekday: 'saturday', time: '10:00' },
      sessionsDone: 4,
      cancelledInARow: 0,
    },
  ],
  duoInvites: [],
  retention: {
    cohortMonthsAgo: 3,
    duoMembersInCohort: 18,
    duo: { day30: 91, day60: 86, day90: 82 },
    solo: { day30: 70, day60: 55, day90: 44 },
  },
  invitations: { openedThisMonth: 13 },
  machineStatus: {
    'machine-01': { qrInstalled: true, scansThisMonth: 12 },
    'machine-02': { qrInstalled: true, scansThisMonth: 22 },
    'machine-04': { qrInstalled: true, scansThisMonth: 29 },
    'machine-07': { qrInstalled: true, scansThisMonth: 41 },
    'machine-09': { qrInstalled: true, scansThisMonth: 26 },
    'machine-11': { qrInstalled: true, scansThisMonth: 38 },
    'machine-12': { qrInstalled: false, scansThisMonth: 0 },
    'machine-13': { qrInstalled: true, scansThisMonth: 17 },
    'machine-15': { qrInstalled: true, scansThisMonth: 3 },
  },
  reports: [
    {
      id: 'report-hugo',
      receivedDaysAgo: 5,
      slot: { weekday: 'thursday', time: '19:00' },
      reason: 'insistent-behavior',
      reporterId: 'hugo',
      reportedId: 'karim',
      status: 'to-handle',
    },
    {
      id: 'report-yanis',
      receivedDaysAgo: 17,
      slot: { weekday: 'saturday', time: '10:00' },
      reason: 'other',
      reporterId: 'yanis',
      reportedId: 'thomas',
      status: 'handled',
    },
  ],
}
