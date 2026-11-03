import * as Schema from 'effect/Schema'

export const WelcomeKitSchema = Schema.Struct({
  gymName: Schema.NonEmptyString,
  inviteUrl: Schema.NonEmptyString,
  openedThisMonth: Schema.NonNegativeInt,
  activatedThisMonth: Schema.NonNegativeInt,
  newMembersThisMonth: Schema.NonNegativeInt,
})

export type WelcomeKit = Schema.Schema.Type<typeof WelcomeKitSchema>
