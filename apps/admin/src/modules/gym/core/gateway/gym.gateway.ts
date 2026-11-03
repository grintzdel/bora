import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { Dashboard } from '../domain/dashboard.domain-model'

export type GymGateway = {
  readonly getDashboard: () => Effect.Effect<Dashboard, ParseError>
}
