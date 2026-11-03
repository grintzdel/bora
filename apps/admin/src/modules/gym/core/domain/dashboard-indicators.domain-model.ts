import type { DemoState } from '../../../shared/core/demo/demo-database'
import type { MemberRecord } from '../../../shared/core/demo/gym-space-records'
import { Availability } from '../../../shared/core/domain/constants/availability.constant'
import { MemberStatus } from '../../../shared/core/domain/constants/member-status.constant'
import type { Weekday } from '../../../shared/core/domain/constants/weekday.constant'

export const QUICK_DUO_DAYS = 7
export const LONG_WAIT_DAYS = 7
const MONTHS_IN_YEAR = 12
const DAY_MS = 24 * 60 * 60 * 1000

const WeekdayByIndex: ReadonlyArray<Weekday> = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

type DashboardInput = {
  readonly records: ReadonlyArray<MemberRecord>
  readonly state: DemoState
  readonly now: Date
}

const isActivated = (record: MemberRecord) => record.status !== MemberStatus.INVITED

const isActive = (record: MemberRecord) =>
  record.status !== MemberStatus.INVITED && record.status !== MemberStatus.SUSPENDED

const hasLiveDuo = (record: MemberRecord) =>
  record.status === MemberStatus.IN_DUO || record.status === MemberStatus.FRAGILE_DUO

const uniqueDuos = (records: ReadonlyArray<MemberRecord>) => {
  const live = records.filter(hasLiveDuo)
  const liveIds = new Set(live.map((record) => record.person.id))
  const seen = new Set<string>()
  return live.flatMap((record) => {
    const duo = record.duo
    if (!duo || seen.has(duo.id) || !liveIds.has(duo.partner.id)) return []
    seen.add(duo.id)
    return [{ ...duo, member: record.person }]
  })
}

const computeQuickDuo = (records: ReadonlyArray<MemberRecord>) => {
  const eligible = records.filter((record) => isActivated(record) && record.person.joinedDaysAgo >= QUICK_DUO_DAYS)
  const found = eligible.filter(
    (record) => record.duo !== null && record.person.joinedDaysAgo - record.duo.formedDaysAgo < QUICK_DUO_DAYS
  )
  return { found: found.length, eligible: eligible.length }
}

const computeSlots = (records: ReadonlyArray<MemberRecord>) => {
  const wishes = records.filter(isActive).flatMap((record) => record.person.profile.availability)
  return Object.values(Availability)
    .map((availability) => ({
      availability,
      share: wishes.length === 0 ? 0 : wishes.filter((wish) => wish === availability).length / wishes.length,
    }))
    .toSorted((first, second) => second.share - first.share)
}

const computeWaiting = (records: ReadonlyArray<MemberRecord>) => {
  const longWaiting = records.filter(
    (record) => record.status === MemberStatus.WAITING && (record.waitingDays ?? 0) > LONG_WAIT_DAYS
  )
  const common = Object.values(Availability).filter((availability) =>
    longWaiting.every((record) => record.person.profile.availability.includes(availability))
  )
  return {
    count: longWaiting.length,
    commonAvailability: longWaiting.length > 0 && common.length === 1 ? (common[0] ?? null) : null,
  }
}

const computeReports = (state: DemoState, now: Date) => {
  const toHandle = state.space.reports.filter((report) => report.status === 'to-handle')
  const latest = toHandle.toSorted((first, second) => first.receivedDaysAgo - second.receivedDaysAgo)[0]
  return {
    count: toHandle.length,
    lastReceivedWeekday: latest
      ? (WeekdayByIndex[new Date(now.getTime() - latest.receivedDaysAgo * DAY_MS).getDay()] ?? null)
      : null,
  }
}

export const computeDashboard = ({ records, state, now }: DashboardInput) => {
  const { retention, monthlyFeeCents } = state.space
  const duos = uniqueDuos(records)
  const extraMembersKept = Math.round(
    (retention.duoMembersInCohort * (retention.duo.day90 - retention.solo.day90)) / 100
  )
  const month = now.getMonth()

  return {
    month,
    tiles: {
      newMembers: records.length,
      activated: records.filter(isActivated).length,
      quickDuo: computeQuickDuo(records),
      duoSessions: duos.reduce((total, duo) => total + duo.sessionsDone, 0),
    },
    retention: {
      cohortMonth: (month - retention.cohortMonthsAgo + MONTHS_IN_YEAR) % MONTHS_IN_YEAR,
      measuredMonth: month,
      duo: retention.duo,
      solo: retention.solo,
      extraMembersKept,
      monthlyRevenueCents: extraMembersKept * monthlyFeeCents,
    },
    slots: computeSlots(records),
    alerts: {
      waiting: computeWaiting(records),
      fragileDuos: duos
        .filter(
          (duo) => records.find((record) => record.person.id === duo.member.id)?.status === MemberStatus.FRAGILE_DUO
        )
        .map((duo) => ({
          names: [duo.member.displayName, duo.partner.displayName] as const,
          cancelledInARow: duo.cancelledInARow,
        })),
      reports: computeReports(state, now),
    },
    activeDuos: duos.map((duo) => ({
      id: duo.id,
      firstNames: [duo.member.firstName, duo.partner.firstName] as const,
      slot: duo.slot,
      sessionsDone: duo.sessionsDone,
    })),
  }
}
