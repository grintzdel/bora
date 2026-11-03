import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { Feedback } from '../domain/constants/feedback.constant'
import type { PartnerAbsenceChoice } from '../domain/constants/partner-absence-choice.constant'
import type { SessionNotFoundError } from '../domain/errors/session-not-found.error'
import type { DuoStats, Program, Session } from '../domain/session.domain-model'

export type SessionGateway = {
  readonly list: () => Effect.Effect<ReadonlyArray<Session>, ParseError>
  readonly listPrograms: () => Effect.Effect<ReadonlyArray<Program>, ParseError>
  readonly getStats: () => Effect.Effect<DuoStats, ParseError>
  readonly complete: (sessionId: string) => Effect.Effect<void, SessionNotFoundError>
  readonly rate: (sessionId: string, feedback: Feedback) => Effect.Effect<void, SessionNotFoundError>
  readonly confirm: (sessionId: string) => Effect.Effect<void, SessionNotFoundError>
  readonly resolvePartnerAbsence: (
    sessionId: string,
    choice: Exclude<PartnerAbsenceChoice, 'new-duo'>
  ) => Effect.Effect<void, SessionNotFoundError>
}
