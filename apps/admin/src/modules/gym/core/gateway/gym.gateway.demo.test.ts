import * as Effect from 'effect/Effect'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeGymDemoGateway } from './gym.gateway.demo'

const options = { latencyMs: 0, now: () => new Date('2026-11-03T10:00:00+01:00') }

describe('makeGymDemoGateway', () => {
  it('returns the dashboard of the current month', async () => {
    const gateway = makeGymDemoGateway(makeDemoDatabase(), options)

    const dashboard = await Effect.runPromise(gateway.getDashboard())

    expect(dashboard.month).toBe(10)
    expect(dashboard.tiles.newMembers).toBe(14)
  })

  it('reads the latest state of the demo database', async () => {
    const db = makeDemoDatabase()
    const gateway = makeGymDemoGateway(db, options)
    const duo = db.state.space.duos[0]
    if (duo) duo.sessionsDone = 4

    const dashboard = await Effect.runPromise(gateway.getDashboard())

    expect(dashboard.tiles.duoSessions).toBe(9)
  })
})
