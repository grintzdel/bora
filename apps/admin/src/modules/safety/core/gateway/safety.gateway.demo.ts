import * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'
import * as Schema from 'effect/Schema'

import { type DemoDatabase, findPerson } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { MemberNotFoundError } from '../domain/errors/member-not-found.error'
import { ReportNotFoundError } from '../domain/errors/report-not-found.error'
import {
  IdentifierSchema,
  ReportSchema,
  type ResolvedReport,
  ResolvedReportSchema,
  type SuspendedMember,
  SuspendedMemberSchema,
} from '../domain/safety.domain-model'
import type { SafetyGateway } from './safety.gateway'

const DAY_MS = 24 * 60 * 60 * 1000

export const makeSafetyDemoGateway = (db: DemoDatabase, { latencyMs, now }: DemoGatewayOptions): SafetyGateway => {
  const partnerNameOf = (personId: string) => {
    const duo = db.state.space.duos.find((candidate) => candidate.memberIds.includes(personId))
    const partnerId = duo?.memberIds.find((memberId) => memberId !== personId)
    return partnerId ? (findPerson(db.state, partnerId)?.displayName ?? null) : null
  }

  const isSuspended = (personId: string) =>
    db.state.space.members.some((member) => member.personId === personId && member.suspended)

  const reports = () =>
    db.state.space.reports
      .toSorted(
        (first, second) =>
          Number(first.status === 'handled') - Number(second.status === 'handled') ||
          first.receivedDaysAgo - second.receivedDaysAgo
      )
      .map((report) => ({
        id: report.id,
        receivedAt: new Date(now().getTime() - report.receivedDaysAgo * DAY_MS).toISOString(),
        slot: report.slot,
        reason: report.reason,
        status: report.status,
        reporter: { id: report.reporterId, displayName: findPerson(db.state, report.reporterId)?.displayName },
        reported: {
          id: report.reportedId,
          displayName: findPerson(db.state, report.reportedId)?.displayName,
          suspended: isSuspended(report.reportedId),
          partnerName: partnerNameOf(report.reportedId),
        },
      }))

  const resolve = (reportId: string) =>
    Effect.suspend((): Effect.Effect<ResolvedReport, ReportNotFoundError | ParseError> => {
      const report = db.state.space.reports.find((candidate) => candidate.id === reportId)
      if (!report) return Effect.fail(new ReportNotFoundError({ reportId }))
      report.status = 'handled'
      return Schema.decodeUnknown(ResolvedReportSchema)({ reportId })
    })

  const suspend = (memberId: string) =>
    Effect.suspend((): Effect.Effect<SuspendedMember, MemberNotFoundError | ParseError> => {
      const member = db.state.space.members.find((candidate) => candidate.personId === memberId)
      const person = findPerson(db.state, memberId)
      if (!member || !person) return Effect.fail(new MemberNotFoundError({ memberId }))
      const duo = db.state.space.duos.find((candidate) => candidate.memberIds.includes(memberId))
      const partnerId = duo?.memberIds.find((candidate) => candidate !== memberId)
      member.suspended = true
      db.state.space.duos = db.state.space.duos.filter((candidate) => candidate !== duo)
      db.state.space.duoInvites = db.state.space.duoInvites.filter((invite) => !invite.memberIds.includes(memberId))
      const partner = db.state.space.members.find((candidate) => candidate.personId === partnerId)
      if (partner) partner.waitingSinceDaysAgo = 0
      return Schema.decodeUnknown(SuspendedMemberSchema)({
        memberId,
        displayName: person.displayName,
        formerPartnerName: partnerId ? (findPerson(db.state, partnerId)?.displayName ?? null) : null,
      })
    })

  return {
    list: () =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() => Schema.decodeUnknown(Schema.Array(ReportSchema))(reports()))
      ),
    resolve: (reportId) =>
      Schema.decodeUnknown(IdentifierSchema)(reportId).pipe(
        Effect.tap(() => simulateNetwork(latencyMs)),
        Effect.andThen(resolve)
      ),
    suspendMember: (memberId) =>
      Schema.decodeUnknown(IdentifierSchema)(memberId).pipe(
        Effect.tap(() => simulateNetwork(latencyMs)),
        Effect.andThen(suspend)
      ),
  }
}
