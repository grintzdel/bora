import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { MemberNotFoundError } from '../domain/errors/member-not-found.error'
import type { ReportNotFoundError } from '../domain/errors/report-not-found.error'
import type { Report, ResolvedReport, SuspendedMember } from '../domain/safety.domain-model'

export type SafetyGateway = {
  readonly list: () => Effect.Effect<ReadonlyArray<Report>, ParseError>
  readonly resolve: (reportId: unknown) => Effect.Effect<ResolvedReport, ReportNotFoundError | ParseError>
  readonly suspendMember: (memberId: unknown) => Effect.Effect<SuspendedMember, MemberNotFoundError | ParseError>
}
