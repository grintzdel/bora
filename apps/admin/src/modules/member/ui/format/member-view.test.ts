import { describe, expect, it } from 'vitest'

import type { MemberRow } from '../../core/domain/member.domain-model'
import { formatMonth, toMemberRowView } from './member-view'

const row = (overrides: Partial<MemberRow>): MemberRow => ({
  id: 'clara',
  displayName: 'Clara P.',
  gender: 'female',
  level: 'beginner',
  availability: ['lunch'],
  status: 'waiting',
  waitingDays: 9,
  partnerName: null,
  proposedPartnerName: null,
  sessionsDone: 0,
  ...overrides,
})

describe('toMemberRowView', () => {
  it('shows how long a member has been waiting for a duo', () => {
    const view = toMemberRowView(row({}))

    expect(view.status).toEqual({ label: 'Sans duo · 9 j', tone: 'warning' })
    expect(view.duo).toEqual({ label: 'Aucun', muted: true })
    expect(view.selectable).toBe(true)
  })

  it('names the proposed partner', () => {
    const view = toMemberRowView(row({ status: 'duo-proposed', waitingDays: null, proposedPartnerName: 'Nora B.' }))

    expect(view.duo).toEqual({ label: 'Proposé : Nora B.', muted: false })
    expect(view.status.tone).toBe('brand')
    expect(view.selectable).toBe(false)
  })

  it('agrees the invited status with the gender', () => {
    expect(toMemberRowView(row({ status: 'invited', waitingDays: null })).status.label).toBe(
      'Invitée, pas encore inscrite'
    )
    expect(toMemberRowView(row({ status: 'invited', gender: 'male', waitingDays: null })).status.label).toBe(
      'Invité, pas encore inscrit'
    )
  })

  it('writes the level and slots in French', () => {
    const view = toMemberRowView(row({ availability: ['after-work', 'weekend'] }))

    expect(view.level).toBe('Débutante')
    expect(view.availability).toBe('Après le travail, Week-end')
  })
})

describe('formatMonth', () => {
  it('names the month in French', () => {
    expect(formatMonth(11)).toBe('novembre')
  })
})
