import * as Schema from 'effect/Schema'

export const GymSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  newMembersThisMonth: Schema.NonNegativeInt,
})

export type Gym = Schema.Schema.Type<typeof GymSchema>

export const MachineSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  number: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  zone: Schema.NonEmptyString,
  videoSeconds: Schema.Int.pipe(Schema.positive()),
  steps: Schema.Array(Schema.NonEmptyString),
})

export type Machine = Schema.Schema.Type<typeof MachineSchema>
