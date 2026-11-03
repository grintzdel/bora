import * as Schema from 'effect/Schema'

export const DemoAccountSchema = Schema.Struct({
  gymName: Schema.NonEmptyString,
  managerName: Schema.NonEmptyString,
})

export type DemoAccount = Schema.Schema.Type<typeof DemoAccountSchema>

export const ManagerSessionSchema = Schema.Struct({
  managerName: Schema.NonEmptyString,
  gymName: Schema.NonEmptyString,
  reportsToHandle: Schema.NonNegativeInt,
})

export type ManagerSession = Schema.Schema.Type<typeof ManagerSessionSchema>
