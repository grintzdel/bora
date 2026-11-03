import * as Schema from 'effect/Schema'

import { literalOf } from '../../../shared/core/domain/literal-of'
import { GenderSchema, LevelSchema } from '../../../shared/core/domain/shared.domain-model'
import { Availability } from './constants/availability.constant'
import { Goal } from './constants/goal.constant'

export const GoalSchema = literalOf(Goal)
export const AvailabilitySchema = literalOf(Availability)

export const ProfileSchema = Schema.Struct({
  level: LevelSchema,
  goal: GoalSchema,
  availability: Schema.Array(AvailabilitySchema).pipe(
    Schema.minItems(1, { message: () => 'Choisis au moins un créneau' })
  ),
  sameGenderDuo: Schema.Boolean,
})

export type Profile = Schema.Schema.Type<typeof ProfileSchema>

export const MemberSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  firstName: Schema.NonEmptyString,
  displayName: Schema.NonEmptyString,
  gender: GenderSchema,
  profile: ProfileSchema,
})

export type Member = Schema.Schema.Type<typeof MemberSchema>
