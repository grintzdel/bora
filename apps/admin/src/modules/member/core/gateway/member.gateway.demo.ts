import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { listMemberRecords, type MemberRecord } from '../../../shared/core/demo/gym-space-records'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { MemberStatus } from '../../../shared/core/domain/constants/member-status.constant'
import { MemberFilter } from '../domain/constants/member-filter.constant'
import { type DuoCandidate, sharedAvailability, suggestPartner } from '../domain/duo-suggestion.domain-model'
import { MemberNotFoundError } from '../domain/errors/member-not-found.error'
import { MemberNotWaitingError } from '../domain/errors/member-not-waiting.error'
import {
  DuoSuggestionSchema,
  ListMembersQuerySchema,
  MemberListSchema,
  ProposeDuoSchema,
} from '../domain/member.domain-model'
import type { MemberGateway } from './member.gateway'

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()

const FilterStatus: Record<MemberFilter, MemberStatus | null> = {
  all: null,
  waiting: MemberStatus.WAITING,
  fragile: MemberStatus.FRAGILE_DUO,
}

const toRow = (record: MemberRecord) => ({
  id: record.person.id,
  displayName: record.person.displayName,
  gender: record.person.gender,
  level: record.person.profile.level,
  availability: record.person.profile.availability,
  status: record.status,
  waitingDays: record.waitingDays,
  partnerName: record.duo?.partner.displayName ?? null,
  proposedPartnerName: record.proposedPartner?.displayName ?? null,
  sessionsDone: record.duo?.sessionsDone ?? 0,
})

const toCandidate = (record: MemberRecord): DuoCandidate => ({
  id: record.person.id,
  gender: record.person.gender,
  level: record.person.profile.level,
  availability: record.person.profile.availability,
  sameGenderDuo: record.person.profile.sameGenderDuo,
  waitingDays: record.waitingDays ?? 0,
})

const toParty = (record: MemberRecord) => ({
  id: record.person.id,
  displayName: record.person.displayName,
  gender: record.person.gender,
  level: record.person.profile.level,
  availability: record.person.profile.availability,
})

const countStatus = (records: ReadonlyArray<MemberRecord>, status: MemberStatus) =>
  records.filter((record) => record.status === status).length

export const makeMemberDemoGateway = (db: DemoDatabase, { latencyMs, now }: DemoGatewayOptions): MemberGateway => {
  const findRecord = (memberId: string) => listMemberRecords(db.state).find((record) => record.person.id === memberId)

  const isWaiting = (memberId: string) => findRecord(memberId)?.status === MemberStatus.WAITING

  return {
    list: (query) =>
      Schema.decodeUnknown(ListMembersQuerySchema)(query).pipe(
        Effect.tap(() => simulateNetwork(latencyMs)),
        Effect.andThen(({ search, filter }) => {
          const records = listMemberRecords(db.state)
          const status = FilterStatus[filter]
          const needle = normalize(search)
          const members = records
            .filter((record) => status === null || record.status === status)
            .filter((record) => normalize(record.person.displayName).includes(needle))
            .toSorted((first, second) => (second.waitingDays ?? -1) - (first.waitingDays ?? -1))
            .map(toRow)
          return Schema.decodeUnknown(MemberListSchema)({
            month: now().getMonth() + 1,
            members,
            counts: {
              all: records.length,
              waiting: countStatus(records, MemberStatus.WAITING),
              fragile: countStatus(records, MemberStatus.FRAGILE_DUO),
            },
          })
        })
      ),
    suggestPartner: (memberId) =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() => {
          const records = listMemberRecords(db.state)
          const member = records.find((record) => record.person.id === memberId)
          if (!member) return Effect.fail(new MemberNotFoundError({ memberId }))
          if (member.status !== MemberStatus.WAITING) return Effect.succeed(null)
          const waiting = records.filter((record) => record.status === MemberStatus.WAITING)
          const candidate = suggestPartner(toCandidate(member), waiting.map(toCandidate))
          const partner = waiting.find((record) => record.person.id === candidate?.id)
          if (!partner) return Effect.succeed(null)
          return Schema.decodeUnknown(DuoSuggestionSchema)({
            member: toParty(member),
            partner: toParty(partner),
            sharedAvailability: sharedAvailability(toCandidate(member), toCandidate(partner)),
            sameLevel: member.person.profile.level === partner.person.profile.level,
          })
        })
      ),
    proposeDuo: (input) =>
      Schema.decodeUnknown(ProposeDuoSchema)(input).pipe(
        Effect.tap(() => simulateNetwork(latencyMs)),
        Effect.andThen(({ memberId, partnerId }) => {
          const notWaiting = [memberId, partnerId].find((id) => !isWaiting(id))
          if (notWaiting || memberId === partnerId)
            return Effect.fail(new MemberNotWaitingError({ memberId: notWaiting ?? partnerId }))
          db.state.space.duoInvites.push({
            id: `invite-${memberId}-${partnerId}`,
            memberIds: [memberId, partnerId],
            sentDaysAgo: 0,
          })
          return Effect.void
        })
      ),
  }
}
