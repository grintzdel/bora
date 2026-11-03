import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from './demo-database'
import { listMemberRecords } from './gym-space-records'

const statusOf = (personId: string, db = makeDemoDatabase()) =>
  listMemberRecords(db.state).find((record) => record.person.id === personId)?.status

describe('listMemberRecords', () => {
  it('lists as many newcomers as the mobile app announces', () => {
    const db = makeDemoDatabase()

    expect(listMemberRecords(db.state)).toHaveLength(db.state.app.gym.newMembersThisMonth)
  })

  it('puts Sarah in a duo with Léa, as in the mobile app', () => {
    const sarah = listMemberRecords(makeDemoDatabase().state).find((record) => record.person.id === 'sarah')

    expect(sarah?.status).toBe('in-duo')
    expect(sarah?.duo?.partner.id).toBe('lea')
    expect(sarah?.duo?.sessionsDone).toBe(3)
  })

  it('flags a duo as fragile after two cancellations in a row', () => {
    expect(statusOf('karim')).toBe('fragile-duo')
    expect(statusOf('hugo')).toBe('fragile-duo')
  })

  it('counts waiting days from the sign-up when nobody was ever proposed', () => {
    const nora = listMemberRecords(makeDemoDatabase().state).find((record) => record.person.id === 'nora')

    expect(nora?.status).toBe('waiting')
    expect(nora?.waitingDays).toBe(12)
  })

  it('marks invited newcomers who have not activated Bora yet', () => {
    expect(statusOf('mehdi')).toBe('invited')
  })

  it('marks both members of a sent duo proposal', () => {
    const db = makeDemoDatabase()
    db.state.space.duoInvites.push({ id: 'invite-1', memberIds: ['clara', 'nora'], sentDaysAgo: 0 })

    expect(statusOf('clara', db)).toBe('duo-proposed')
    expect(statusOf('nora', db)).toBe('duo-proposed')
  })

  it('shows a suspended member as suspended, whatever their duo', () => {
    const db = makeDemoDatabase()
    const karim = db.state.space.members.find((member) => member.personId === 'karim')
    if (karim) karim.suspended = true

    expect(statusOf('karim', db)).toBe('suspended')
  })
})
