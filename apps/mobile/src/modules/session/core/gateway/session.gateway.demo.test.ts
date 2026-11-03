import * as Effect from 'effect/Effect'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeSessionDemoGateway } from './session.gateway.demo'

const makeGateway = () => {
  const db = makeDemoDatabase()
  return { db, gateway: makeSessionDemoGateway(db, { latencyMs: 0 }) }
}

describe('makeSessionDemoGateway', () => {
  it('lists sessions with their program and partner', async () => {
    const { gateway } = makeGateway()

    const sessions = await Effect.runPromise(gateway.list())

    expect(sessions[0]).toMatchObject({
      id: 'session-tuesday',
      partner: { id: 'lea', displayName: 'Léa M.' },
      program: { name: 'Haut du corps' },
    })
    expect(sessions[0]?.program.exercises).toHaveLength(5)
  })

  it('counts a completed session done together', async () => {
    const { db, gateway } = makeGateway()

    await Effect.runPromise(gateway.complete('session-tuesday'))

    expect(db.state.sessions[0]?.status).toBe('done')
    expect(db.state.stats.duoSessionsDone).toBe(4)
  })

  it('does not count a session done alone', async () => {
    const { db, gateway } = makeGateway()
    await Effect.runPromise(gateway.resolvePartnerAbsence('session-tuesday', 'go-solo'))

    await Effect.runPromise(gateway.complete('session-tuesday'))

    expect(db.state.stats.duoSessionsDone).toBe(3)
  })

  it('cancels tonight when the member reschedules', async () => {
    const { db, gateway } = makeGateway()

    await Effect.runPromise(gateway.resolvePartnerAbsence('session-tuesday', 'reschedule'))

    expect(db.state.sessions[0]?.status).toBe('cancelled')
  })
})
