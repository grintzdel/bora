import * as Schema from 'effect/Schema'

import { AvailabilitySchema, SlotSchema, WeekdaySchema } from '../../../shared/core/domain/shared.domain-model'

const MonthSchema = Schema.Int.pipe(Schema.between(0, 11))
const PercentSchema = Schema.Number.pipe(Schema.between(0, 100))

const RetentionCurveSchema = Schema.Struct({
  day30: PercentSchema,
  day60: PercentSchema,
  day90: PercentSchema,
})

export type RetentionCurve = Schema.Schema.Type<typeof RetentionCurveSchema>

export const DashboardSchema = Schema.Struct({
  month: MonthSchema,
  tiles: Schema.Struct({
    newMembers: Schema.NonNegativeInt,
    activated: Schema.NonNegativeInt,
    quickDuo: Schema.Struct({ found: Schema.NonNegativeInt, eligible: Schema.NonNegativeInt }),
    duoSessions: Schema.NonNegativeInt,
  }),
  retention: Schema.Struct({
    cohortMonth: MonthSchema,
    measuredMonth: MonthSchema,
    duo: RetentionCurveSchema,
    solo: RetentionCurveSchema,
    extraMembersKept: Schema.NonNegativeInt,
    monthlyRevenueCents: Schema.NonNegativeInt,
  }),
  slots: Schema.Array(
    Schema.Struct({ availability: AvailabilitySchema, share: Schema.Number.pipe(Schema.between(0, 1)) })
  ),
  alerts: Schema.Struct({
    waiting: Schema.Struct({ count: Schema.NonNegativeInt, commonAvailability: Schema.NullOr(AvailabilitySchema) }),
    fragileDuos: Schema.Array(
      Schema.Struct({
        names: Schema.Tuple(Schema.NonEmptyString, Schema.NonEmptyString),
        cancelledInARow: Schema.NonNegativeInt,
      })
    ),
    reports: Schema.Struct({ count: Schema.NonNegativeInt, lastReceivedWeekday: Schema.NullOr(WeekdaySchema) }),
  }),
  activeDuos: Schema.Array(
    Schema.Struct({
      id: Schema.NonEmptyString,
      firstNames: Schema.Tuple(Schema.NonEmptyString, Schema.NonEmptyString),
      slot: SlotSchema,
      sessionsDone: Schema.NonNegativeInt,
    })
  ),
})

export type Dashboard = Schema.Schema.Type<typeof DashboardSchema>
