import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeMemberDemoGateway } from './member.gateway.demo'

const options = { latencyMs: 0, now: () => new Date('2026-11-03T10:00:00+01:00') }

const makeGateway = (db = makeDemoDatabase()) => makeMemberDemoGateway(db, options)

describe('makeMemberDemoGateway.list', () => {
  it('lists every newcomer of the month, longest wait first', async () => {
    const list = await Effect.runPromise(makeGateway().list({ search: '', filter: 'all' }))

    expect(list.month).toBe(11)
    expect(list.members).toHaveLength(14)
    expect(list.members[0]).toMatchObject({ id: 'nora', status: 'waiting', waitingDays: 12 })
    expect(list.counts).toEqual({ all: 14, waiting: 5, fragile: 2 })
  })

  it('filters on the server side', async () => {
    const list = await Effect.runPromise(makeGateway().list({ search: '', filter: 'fragile' }))

    expect(list.members.map((member) => member.id)).toEqual(['karim', 'hugo'])
  })

  it('searches names without caring about case or accents', async () => {
    const list = await Effect.runPromise(makeGateway().list({ search: 'LEA', filter: 'all' }))

    expect(list.members.map((member) => member.displayName)).toEqual(['Léa M.'])
  })

  it('shows the partner and the sessions done together', async () => {
    const list = await Effect.runPromise(makeGateway().list({ search: 'sarah', filter: 'all' }))

    expect(list.members[0]).toMatchObject({ partnerName: 'Léa M.', sessionsDone: 3, status: 'in-duo' })
  })
})

describe('makeMemberDemoGateway.suggestPartner', () => {
  it('suggests Clara to Nora, both waiting for a lunch duo', async () => {
    const suggestion = await Effect.runPromise(makeGateway().suggestPartner('nora'))

    expect(suggestion).toMatchObject({
      member: { id: 'nora' },
      partner: { id: 'clara', displayName: 'Clara P.' },
      sharedAvailability: ['lunch'],
      sameLevel: true,
    })
  })

  it('suggests nobody when no waiting member fits', async () => {
    expect(await Effect.runPromise(makeGateway().suggestPartner('julien'))).toBeNull()
  })

  it('fails on an unknown member', async () => {
    const exit = await Effect.runPromiseExit(makeGateway().suggestPartner('nobody'))

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('MemberNotFoundError')
  })
})

describe('makeMemberDemoGateway.proposeDuo', () => {
  it('sends the proposal to both members', async () => {
    const db = makeDemoDatabase()
    const gateway = makeGateway(db)

    await Effect.runPromise(gateway.proposeDuo({ memberId: 'nora', partnerId: 'clara' }))

    const list = await Effect.runPromise(gateway.list({ search: '', filter: 'all' }))
    const nora = list.members.find((member) => member.id === 'nora')
    expect(nora).toMatchObject({ status: 'duo-proposed', proposedPartnerName: 'Clara P.' })
    expect(list.counts.waiting).toBe(3)
  })

  it('refuses a member who already has a duo', async () => {
    const exit = await Effect.runPromiseExit(makeGateway().proposeDuo({ memberId: 'nora', partnerId: 'sarah' }))

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('MemberNotWaitingError')
  })

  it('rejects an invalid input', async () => {
    const exit = await Effect.runPromiseExit(makeGateway().proposeDuo({ memberId: '' }))

    expect(Exit.isFailure(exit)).toBe(true)
  })
})
