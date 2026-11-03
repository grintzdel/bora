import * as Schema from 'effect/Schema'

import { literalOf } from '../../../shared/core/domain/literal-of'
import { SlotSchema } from '../../../shared/core/domain/shared.domain-model'
import { ReportReason } from './constants/report-reason.constant'
import { ReportStatus } from './constants/report-status.constant'

export const ReportReasonSchema = literalOf(ReportReason)
export const ReportStatusSchema = literalOf(ReportStatus)

export const IdentifierSchema = Schema.NonEmptyString

export const ReportSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  receivedAt: Schema.String,
  slot: SlotSchema,
  reason: ReportReasonSchema,
  status: ReportStatusSchema,
  reporter: Schema.Struct({ id: Schema.NonEmptyString, displayName: Schema.NonEmptyString }),
  reported: Schema.Struct({
    id: Schema.NonEmptyString,
    displayName: Schema.NonEmptyString,
    suspended: Schema.Boolean,
    partnerName: Schema.NullOr(Schema.NonEmptyString),
  }),
})

export type Report = Schema.Schema.Type<typeof ReportSchema>

export const ResolvedReportSchema = Schema.Struct({ reportId: Schema.NonEmptyString })

export type ResolvedReport = Schema.Schema.Type<typeof ResolvedReportSchema>

export const SuspendedMemberSchema = Schema.Struct({
  memberId: Schema.NonEmptyString,
  displayName: Schema.NonEmptyString,
  formerPartnerName: Schema.NullOr(Schema.NonEmptyString),
})

export type SuspendedMember = Schema.Schema.Type<typeof SuspendedMemberSchema>

export type SafetyAction =
  | ({ readonly kind: 'resolved' } & ResolvedReport)
  | ({ readonly kind: 'suspended' } & SuspendedMember)
