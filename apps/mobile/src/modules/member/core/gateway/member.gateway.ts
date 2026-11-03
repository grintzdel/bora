import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { Member } from '../domain/member.domain-model'

export type MemberGateway = {
  readonly getCurrent: () => Effect.Effect<Member, ParseError>
  readonly updateProfile: (profile: unknown) => Effect.Effect<Member, ParseError>
}
