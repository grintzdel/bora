import * as Effect from 'effect/Effect'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeAuthDemoGateway } from './auth.gateway.demo'

const options = { latencyMs: 0, now: () => new Date('2026-11-03T10:00:00+01:00') }

describe('makeAuthDemoGateway', () => {
  it('offers to sign in as the manager of the gym from the mobile app', async () => {
    const gateway = makeAuthDemoGateway(makeDemoDatabase(), options)

    const account = await Effect.runPromise(gateway.getDemoAccount())

    expect(account).toEqual({ gymName: 'Club Pilote', managerName: 'Nadia R.' })
  })

  it('counts the reports still to handle in the session', async () => {
    const db = makeDemoDatabase()
    const gateway = makeAuthDemoGateway(db, options)

    expect((await Effect.runPromise(gateway.signIn())).reportsToHandle).toBe(1)

    for (const report of db.state.space.reports) report.status = 'handled'
    expect((await Effect.runPromise(gateway.getSession())).reportsToHandle).toBe(0)
  })
})
