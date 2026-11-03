import * as Schema from 'effect/Schema'

import { literalOf } from '../../../shared/core/domain/literal-of'
import { ReportReason } from './constants/report-reason.constant'

export const ReportReasonSchema = literalOf(ReportReason)

export const SubmitReportSchema = Schema.Struct({
  sessionId: Schema.NullOr(Schema.NonEmptyString),
  partnerId: Schema.NullOr(Schema.NonEmptyString),
  reason: ReportReasonSchema,
})

export type SubmitReport = Schema.Schema.Type<typeof SubmitReportSchema>

export const ReportSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  reason: ReportReasonSchema,
})

export type Report = Schema.Schema.Type<typeof ReportSchema>
