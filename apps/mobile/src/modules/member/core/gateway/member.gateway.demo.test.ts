import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeMemberDemoGateway } from './member.gateway.demo'

describe('makeMemberDemoGateway', () => {
  it('returns Sarah with her profile', async () => {
    const gateway = makeMemberDemoGateway(makeDemoDatabase(), { latencyMs: 0 })

    const member = await Effect.runPromise(gateway.getCurrent())

    expect(member).toMatchObject({ firstName: 'Sarah', profile: { level: 'beginner' } })
  })

  it('saves a new profile', async () => {
    const gateway = makeMemberDemoGateway(makeDemoDatabase(), { latencyMs: 0 })

    const member = await Effect.runPromise(
      gateway.updateProfile({
        level: 'returning',
        goal: 'gain-strength',
        availability: ['weekend'],
        sameGenderDuo: false,
      })
    )

    expect(member.profile).toEqual({
      level: 'returning',
      goal: 'gain-strength',
      availability: ['weekend'],
      sameGenderDuo: false,
    })
  })

  it('refuses a profile without any slot', async () => {
    const gateway = makeMemberDemoGateway(makeDemoDatabase(), { latencyMs: 0 })

    const exit = await Effect.runPromiseExit(
      gateway.updateProfile({ level: 'beginner', goal: 'feel-fit', availability: [], sameGenderDuo: true })
    )

    expect(Exit.isFailure(exit)).toBe(true)
  })
})
