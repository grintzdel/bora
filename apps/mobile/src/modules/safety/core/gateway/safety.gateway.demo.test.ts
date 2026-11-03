import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeSafetyDemoGateway } from './safety.gateway.demo'

describe('makeSafetyDemoGateway', () => {
  it('stores the report for the gym', async () => {
    const db = makeDemoDatabase()
    const gateway = makeSafetyDemoGateway(db, { latencyMs: 0 })

    const report = await Effect.runPromise(
      gateway.submitReport({ sessionId: 'session-tuesday', partnerId: 'lea', reason: 'insistent-behavior' })
    )

    expect(report.reason).toBe('insistent-behavior')
    expect(db.state.reports).toHaveLength(1)
  })

  it('rejects an unknown reason', async () => {
    const gateway = makeSafetyDemoGateway(makeDemoDatabase(), { latencyMs: 0 })

    const exit = await Effect.runPromiseExit(gateway.submitReport({ sessionId: null, partnerId: null, reason: 'nope' }))

    expect(Exit.isFailure(exit)).toBe(true)
  })
})
