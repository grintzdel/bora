import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { Report } from '../domain/safety.domain-model'

export type SafetyGateway = {
  readonly submitReport: (input: unknown) => Effect.Effect<Report, ParseError>
}
