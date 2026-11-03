import * as Effect from 'effect/Effect'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeInvitationDemoGateway } from './invitation.gateway.demo'

const options = { latencyMs: 0, now: () => new Date('2026-11-03T10:00:00+01:00') }

describe('makeInvitationDemoGateway', () => {
  it('returns the welcome kit of the gym from the mobile app', async () => {
    const gateway = makeInvitationDemoGateway(makeDemoDatabase(), options)

    const kit = await Effect.runPromise(gateway.getKit())

    expect(kit).toEqual({
      gymName: 'Club Pilote',
      inviteUrl: 'https://bora.app/salle/club-pilote',
      openedThisMonth: 13,
      activatedThisMonth: 11,
      newMembersThisMonth: 14,
    })
  })

  it('counts a suspended member as activated anyway', async () => {
    const db = makeDemoDatabase()
    const karim = db.state.space.members.find((member) => member.personId === 'karim')
    if (karim) karim.suspended = true

    const kit = await Effect.runPromise(makeInvitationDemoGateway(db, options).getKit())

    expect(kit.activatedThisMonth).toBe(11)
  })
})
