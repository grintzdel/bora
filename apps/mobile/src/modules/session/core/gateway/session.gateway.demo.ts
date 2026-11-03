import type { SeedSession } from '@bora/demo-data'
import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import { type DemoDatabase, findPerson } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { PartnerAbsenceChoice } from '../domain/constants/partner-absence-choice.constant'
import { SessionStatus } from '../domain/constants/session-status.constant'
import { SessionNotFoundError } from '../domain/errors/session-not-found.error'
import { DuoStatsSchema, ProgramSchema, SessionSchema } from '../domain/session.domain-model'
import type { SessionGateway } from './session.gateway'

export const makeSessionDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): SessionGateway => {
  const toReadModel = (session: SeedSession) => {
    const partner = findPerson(db, session.partnerId)
    return {
      ...session,
      program: db.state.programs.find((program) => program.id === session.programId),
      partner: partner ? { id: partner.id, firstName: partner.firstName, displayName: partner.displayName } : null,
    }
  }

  const update = (sessionId: string, change: (session: SeedSession) => void) =>
    simulateNetwork(latencyMs).pipe(
      Effect.andThen(() => {
        const session = db.state.sessions.find((candidate) => candidate.id === sessionId)
        if (!session) return Effect.fail(new SessionNotFoundError({ sessionId }))
        change(session)
        return Effect.void
      })
    )

  return {
    list: () =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() => Schema.decodeUnknown(Schema.Array(SessionSchema))(db.state.sessions.map(toReadModel)))
      ),
    listPrograms: () =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() => Schema.decodeUnknown(Schema.Array(ProgramSchema))(db.state.programs))
      ),
    getStats: () =>
      simulateNetwork(latencyMs).pipe(Effect.andThen(() => Schema.decodeUnknown(DuoStatsSchema)(db.state.stats))),
    complete: (sessionId) =>
      update(sessionId, (session) => {
        if (session.partnerId && !session.partnerAbsent) db.state.stats.duoSessionsDone += 1
        session.status = SessionStatus.DONE
      }),
    rate: (sessionId, feedback) =>
      update(sessionId, (session) => {
        session.feedback = feedback
      }),
    confirm: (sessionId) =>
      update(sessionId, (session) => {
        session.status = SessionStatus.CONFIRMED
      }),
    resolvePartnerAbsence: (sessionId, choice) =>
      update(sessionId, (session) => {
        session.partnerAbsent = false
        if (choice === PartnerAbsenceChoice.RESCHEDULE) session.status = SessionStatus.CANCELLED
        if (choice === PartnerAbsenceChoice.GO_SOLO) session.partnerId = null
      }),
  }
}
