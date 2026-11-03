import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { WelcomeKit } from '../domain/invitation.domain-model'

export type InvitationGateway = {
  readonly getKit: () => Effect.Effect<WelcomeKit, ParseError>
}
