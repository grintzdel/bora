import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeDuoDemoGateway } from './duo.gateway.demo'

const makeGateway = () => {
  const db = makeDemoDatabase()
  return { db, gateway: makeDuoDemoGateway(db, { latencyMs: 0, acceptanceDelayMs: 0 }) }
}

describe('makeDuoDemoGateway', () => {
  it('lists the regular proposals with what the duo has in common', async () => {
    const { gateway } = makeGateway()

    const proposals = await Effect.runPromise(gateway.listProposals('regular'))

    expect(proposals.map((proposal) => proposal.partner.displayName)).toEqual(['Léa M.', 'Inès K.'])
    expect(proposals[0]?.commonGround).toContainEqual({ kind: 'gym', gymName: 'Club Pilote' })
    expect(proposals[0]?.firstSession.programName).toBe('Haut du corps')
  })

  it('only proposes partners of the same gender when the member asks for it', async () => {
    const { db, gateway } = makeGateway()
    const ines = db.state.people.find((person) => person.id === 'ines')
    if (ines) ines.gender = 'male'

    const proposals = await Effect.runPromise(gateway.listProposals('regular'))

    expect(proposals.map((proposal) => proposal.partner.id)).toEqual(['lea'])
  })

  it('pairs every upcoming session with the accepted partner', async () => {
    const { db, gateway } = makeGateway()

    await Effect.runPromise(gateway.propose('proposal-ines'))

    expect(db.state.duoPartnerId).toBe('ines')
    expect(db.state.sessions.map((session) => session.partnerId)).toEqual(['ines', 'ines'])
  })

  it('replaces only the absent partner for tonight', async () => {
    const { db, gateway } = makeGateway()
    const tuesday = db.state.sessions[0]
    if (tuesday) tuesday.partnerAbsent = true

    await Effect.runPromise(gateway.propose('proposal-tonight-camille'))

    expect(db.state.duoPartnerId).toBe('lea')
    expect(db.state.sessions[0]).toMatchObject({ partnerId: 'camille', partnerAbsent: false, status: 'confirmed' })
    expect(db.state.sessions[1]?.partnerId).toBe('lea')
  })

  it('fails with DuoProposalNotFoundError on an unknown proposal', async () => {
    const { gateway } = makeGateway()

    const exit = await Effect.runPromiseExit(gateway.propose('nope'))

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('DuoProposalNotFoundError')
  })
})
