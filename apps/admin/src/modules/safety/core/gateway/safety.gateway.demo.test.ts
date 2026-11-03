import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { listMemberRecords } from '../../../shared/core/demo/gym-space-records'
import { makeSafetyDemoGateway } from './safety.gateway.demo'

const options = { latencyMs: 0, now: () => new Date('2026-11-03T10:00:00+01:00') }

const recordOf = (db: ReturnType<typeof makeDemoDatabase>, personId: string) =>
  listMemberRecords(db.state).find((record) => record.person.id === personId)

describe('makeSafetyDemoGateway', () => {
  it('lists the reports to handle first, with names and the reception date', async () => {
    const gateway = makeSafetyDemoGateway(makeDemoDatabase(), options)

    const reports = await Effect.runPromise(gateway.list())

    expect(reports.map((report) => report.id)).toEqual(['report-hugo', 'report-yanis'])
    expect(reports[0]).toMatchObject({
      status: 'to-handle',
      reason: 'insistent-behavior',
      slot: { weekday: 'thursday', time: '19:00' },
      reporter: { id: 'hugo', displayName: 'Hugo T.' },
      reported: { id: 'karim', displayName: 'Karim B.', suspended: false, partnerName: 'Hugo T.' },
    })
    expect(new Date(reports[0]?.receivedAt ?? '').toISOString().slice(0, 10)).toBe('2026-10-29')
  })

  it('marks a report as handled', async () => {
    const db = makeDemoDatabase()
    const gateway = makeSafetyDemoGateway(db, options)

    await Effect.runPromise(gateway.resolve('report-hugo'))

    expect(db.state.space.reports.find((report) => report.id === 'report-hugo')?.status).toBe('handled')
  })

  it('fails with ReportNotFoundError on an unknown report', async () => {
    const gateway = makeSafetyDemoGateway(makeDemoDatabase(), options)

    const exit = await Effect.runPromiseExit(gateway.resolve('report-unknown'))

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('ReportNotFoundError')
  })

  it('suspends a member, dissolves their duo and sends the partner back to waiting', async () => {
    const db = makeDemoDatabase()
    const gateway = makeSafetyDemoGateway(db, options)

    const result = await Effect.runPromise(gateway.suspendMember('karim'))

    expect(result).toEqual({ memberId: 'karim', displayName: 'Karim B.', formerPartnerName: 'Hugo T.' })
    expect(recordOf(db, 'karim')?.status).toBe('suspended')
    expect(recordOf(db, 'hugo')).toMatchObject({ status: 'waiting', waitingDays: 0 })
  })

  it('shows the suspension in the reports list', async () => {
    const gateway = makeSafetyDemoGateway(makeDemoDatabase(), options)

    await Effect.runPromise(gateway.suspendMember('karim'))
    const [report] = await Effect.runPromise(gateway.list())

    expect(report?.reported).toMatchObject({ suspended: true, partnerName: null })
  })

  it('fails with MemberNotFoundError on an unknown member', async () => {
    const gateway = makeSafetyDemoGateway(makeDemoDatabase(), options)

    const exit = await Effect.runPromiseExit(gateway.suspendMember('nobody'))

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('MemberNotFoundError')
  })

  it('rejects an empty identifier', async () => {
    const gateway = makeSafetyDemoGateway(makeDemoDatabase(), options)

    const exit = await Effect.runPromiseExit(gateway.resolve(''))

    expect(Exit.isFailure(exit)).toBe(true)
  })
})
