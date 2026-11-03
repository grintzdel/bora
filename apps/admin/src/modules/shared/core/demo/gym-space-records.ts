import type { SeedPerson, SeedSlot } from '@bora/demo-data'

import { MemberStatus } from '../domain/constants/member-status.constant'
import { type DemoState, findPerson } from './demo-database'

export const FRAGILE_AFTER_CANCELLATIONS = 2

export type MemberDuoRecord = {
  readonly id: string
  readonly partner: SeedPerson
  readonly slot: SeedSlot
  readonly formedDaysAgo: number
  readonly sessionsDone: number
  readonly cancelledInARow: number
}

export type MemberRecord = {
  readonly person: SeedPerson
  readonly status: MemberStatus
  readonly waitingDays: number | null
  readonly duo: MemberDuoRecord | null
  readonly proposedPartner: SeedPerson | null
}

const partnerIdOf = (memberIds: readonly [string, string], personId: string) =>
  memberIds[0] === personId ? memberIds[1] : memberIds[0]

const findDuoRecord = (state: DemoState, personId: string): MemberDuoRecord | null => {
  const duo = state.space.duos.find((candidate) => candidate.memberIds.includes(personId))
  const partner = duo ? findPerson(state, partnerIdOf(duo.memberIds, personId)) : undefined
  if (!duo || !partner) return null
  return {
    id: duo.id,
    partner,
    slot: duo.slot,
    formedDaysAgo: duo.formedDaysAgo,
    sessionsDone: duo.sessionsDone,
    cancelledInARow: duo.cancelledInARow,
  }
}

const findProposedPartner = (state: DemoState, personId: string) => {
  const invite = state.space.duoInvites.find((candidate) => candidate.memberIds.includes(personId))
  return invite ? (findPerson(state, partnerIdOf(invite.memberIds, personId)) ?? null) : null
}

const statusOf = (
  member: DemoState['space']['members'][number],
  duo: MemberDuoRecord | null,
  proposedPartner: SeedPerson | null
): MemberStatus => {
  if (member.suspended) return MemberStatus.SUSPENDED
  if (!member.activated) return MemberStatus.INVITED
  if (duo) return duo.cancelledInARow >= FRAGILE_AFTER_CANCELLATIONS ? MemberStatus.FRAGILE_DUO : MemberStatus.IN_DUO
  return proposedPartner ? MemberStatus.DUO_PROPOSED : MemberStatus.WAITING
}

export const listMemberRecords = (state: DemoState): ReadonlyArray<MemberRecord> =>
  state.space.members.flatMap((member) => {
    const person = findPerson(state, member.personId)
    if (!person) return []
    const duo = findDuoRecord(state, person.id)
    const proposedPartner = findProposedPartner(state, person.id)
    const status = statusOf(member, duo, proposedPartner)
    return [
      {
        person,
        status,
        waitingDays: status === MemberStatus.WAITING ? (member.waitingSinceDaysAgo ?? person.joinedDaysAgo) : null,
        duo,
        proposedPartner,
      },
    ]
  })
