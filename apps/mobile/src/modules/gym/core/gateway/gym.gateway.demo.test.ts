import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeGymDemoGateway } from './gym.gateway.demo'

describe('makeGymDemoGateway', () => {
  it('returns a machine with its guide', async () => {
    const gateway = makeGymDemoGateway(makeDemoDatabase(), { latencyMs: 0 })

    const machine = await Effect.runPromise(gateway.getMachine('machine-07'))

    expect(machine).toMatchObject({ number: '07', name: 'Tirage vertical' })
    expect(machine.steps).toHaveLength(3)
  })

  it('fails with MachineNotFoundError on an unknown QR code', async () => {
    const gateway = makeGymDemoGateway(makeDemoDatabase(), { latencyMs: 0 })

    const exit = await Effect.runPromiseExit(gateway.getMachine('machine-99'))

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('MachineNotFoundError')
  })
})
