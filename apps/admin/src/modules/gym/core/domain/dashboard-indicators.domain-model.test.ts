import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { listMemberRecords } from '../../../shared/core/demo/gym-space-records'
import { computeDashboard } from './dashboard-indicators.domain-model'

const NOW = new Date('2026-11-03T10:00:00+01:00')

const dashboardOf = (db = makeDemoDatabase()) =>
  computeDashboard({ records: listMemberRecords(db.state), state: db.state, now: NOW })

describe('computeDashboard', () => {
  it('counts the same 14 newcomers as the mobile app, 11 of whom activated Bora', () => {
    const { tiles } = dashboardOf()

    expect(tiles.newMembers).toBe(14)
    expect(tiles.activated).toBe(11)
  })

  it('measures who found a duo within a week among newcomers older than a week', () => {
    const { tiles } = dashboardOf()

    expect(tiles.quickDuo).toEqual({ found: 5, eligible: 10 })
  })

  it('adds up the sessions done together', () => {
    expect(dashboardOf().tiles.duoSessions).toBe(8)
  })

  it('turns the 90-day retention gap into members kept and monthly revenue', () => {
    const { retention } = dashboardOf()

    expect(retention.extraMembersKept).toBe(7)
    expect(retention.monthlyRevenueCents).toBe(20930)
    expect(retention.cohortMonth).toBe(7)
    expect(retention.measuredMonth).toBe(10)
  })

  it('ranks the slots asked for by activated members', () => {
    expect(dashboardOf().slots).toEqual([
      { availability: 'after-work', share: 0.5 },
      { availability: 'lunch', share: 0.25 },
      { availability: 'weekend', share: 0.25 },
    ])
  })

  it('flags newcomers waiting for a duo for more than a week, with the slot they share', () => {
    expect(dashboardOf().alerts.waiting).toEqual({ count: 3, commonAvailability: 'lunch' })
  })

  it('names the fragile duos', () => {
    expect(dashboardOf().alerts.fragileDuos).toEqual([{ names: ['Karim B.', 'Hugo T.'], cancelledInARow: 2 }])
  })

  it('tells when the last report to handle came in', () => {
    expect(dashboardOf().alerts.reports).toEqual({ count: 1, lastReceivedWeekday: 'thursday' })
  })

  it('stops counting reports once they are handled', () => {
    const db = makeDemoDatabase()
    for (const report of db.state.space.reports) report.status = 'handled'

    expect(dashboardOf(db).alerts.reports).toEqual({ count: 0, lastReceivedWeekday: null })
  })

  it('lists the active duos once each, by first name only', () => {
    expect(dashboardOf().activeDuos).toEqual([
      {
        id: 'duo-sarah-lea',
        firstNames: ['Sarah', 'Léa'],
        slot: { weekday: 'tuesday', time: '18:30' },
        sessionsDone: 3,
      },
      {
        id: 'duo-karim-hugo',
        firstNames: ['Karim', 'Hugo'],
        slot: { weekday: 'thursday', time: '19:00' },
        sessionsDone: 1,
      },
      {
        id: 'duo-thomas-yanis',
        firstNames: ['Thomas', 'Yanis'],
        slot: { weekday: 'saturday', time: '10:00' },
        sessionsDone: 4,
      },
    ])
  })

  it('drops a duo from the active list when one of its members is suspended', () => {
    const db = makeDemoDatabase()
    const karim = db.state.space.members.find((member) => member.personId === 'karim')
    if (karim) karim.suspended = true

    expect(dashboardOf(db).activeDuos.map((duo) => duo.id)).not.toContain('duo-karim-hugo')
  })
})
