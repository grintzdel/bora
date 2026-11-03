import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { DemoAccount, ManagerSession } from '../domain/auth.domain-model'

export type AuthGateway = {
  readonly getDemoAccount: () => Effect.Effect<DemoAccount, ParseError>
  readonly signIn: () => Effect.Effect<ManagerSession, ParseError>
  readonly getSession: () => Effect.Effect<ManagerSession, ParseError>
}
