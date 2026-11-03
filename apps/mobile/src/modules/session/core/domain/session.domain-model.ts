import * as Schema from 'effect/Schema'

import { literalOf } from '../../../shared/core/domain/literal-of'
import { LevelSchema, SlotSchema } from '../../../shared/core/domain/shared.domain-model'
import { Feedback } from './constants/feedback.constant'
import { SessionStatus } from './constants/session-status.constant'

export const SessionStatusSchema = literalOf(SessionStatus)
export const FeedbackSchema = literalOf(Feedback)

export const EffortSchema = Schema.Union(
  Schema.Struct({ kind: Schema.Literal('reps'), reps: Schema.Int.pipe(Schema.positive()) }),
  Schema.Struct({ kind: Schema.Literal('duration'), seconds: Schema.Int.pipe(Schema.positive()) })
)

export type Effort = Schema.Schema.Type<typeof EffortSchema>

export const ExerciseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  machineId: Schema.NullOr(Schema.NonEmptyString),
  sets: Schema.Int.pipe(Schema.positive()),
  effort: EffortSchema,
  restSeconds: Schema.NonNegativeInt,
  settings: Schema.Array(Schema.Struct({ label: Schema.NonEmptyString, value: Schema.NonEmptyString })),
  duoTip: Schema.NonEmptyString,
})

export type Exercise = Schema.Schema.Type<typeof ExerciseSchema>

export const ProgramSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  level: LevelSchema,
  durationMinutes: Schema.Int.pipe(Schema.positive()),
  exercises: Schema.NonEmptyArray(ExerciseSchema),
})

export type Program = Schema.Schema.Type<typeof ProgramSchema>

export const SessionSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  slot: SlotSchema,
  program: ProgramSchema,
  partner: Schema.NullOr(
    Schema.Struct({
      id: Schema.NonEmptyString,
      firstName: Schema.NonEmptyString,
      displayName: Schema.NonEmptyString,
    })
  ),
  status: SessionStatusSchema,
  partnerAbsent: Schema.Boolean,
  feedback: Schema.NullOr(FeedbackSchema),
})

export type Session = Schema.Schema.Type<typeof SessionSchema>

export const DuoStatsSchema = Schema.Struct({
  duoSessionsDone: Schema.NonNegativeInt,
  streakWeeks: Schema.NonNegativeInt,
})

export type DuoStats = Schema.Schema.Type<typeof DuoStatsSchema>
