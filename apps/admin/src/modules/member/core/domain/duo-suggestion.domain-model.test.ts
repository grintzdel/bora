import { describe, expect, it } from 'vitest'

import { type DuoCandidate, sharedAvailability, suggestPartner } from './duo-suggestion.domain-model'

const candidate = (overrides: Partial<DuoCandidate> & Pick<DuoCandidate, 'id'>): DuoCandidate => ({
  gender: 'female',
  level: 'beginner',
  availability: ['lunch'],
  sameGenderDuo: false,
  waitingDays: 1,
  ...overrides,
})

describe('suggestPartner', () => {
  it('picks someone who shares a slot', () => {
    const nora = candidate({ id: 'nora' })
    const others = [candidate({ id: 'evening', availability: ['after-work'] }), candidate({ id: 'clara' })]

    expect(suggestPartner(nora, others)?.id).toBe('clara')
  })

  it('never suggests the member to themselves', () => {
    const nora = candidate({ id: 'nora' })

    expect(suggestPartner(nora, [nora])).toBeNull()
  })

  it('respects a same-gender preference on both sides', () => {
    const julien = candidate({ id: 'julien', gender: 'male' })
    const clara = candidate({ id: 'clara', sameGenderDuo: true })

    expect(suggestPartner(julien, [clara])).toBeNull()
    expect(suggestPartner({ ...clara, id: 'nora' }, [julien])).toBeNull()
  })

  it('prefers the same level, then the longest wait', () => {
    const nora = candidate({ id: 'nora' })
    const others = [
      candidate({ id: 'returning', level: 'returning', waitingDays: 30 }),
      candidate({ id: 'recent', waitingDays: 2 }),
      candidate({ id: 'patient', waitingDays: 10 }),
    ]

    expect(suggestPartner(nora, others)?.id).toBe('patient')
  })
})

describe('sharedAvailability', () => {
  it('keeps the slots both members chose', () => {
    expect(
      sharedAvailability(
        candidate({ id: 'a', availability: ['after-work', 'weekend'] }),
        candidate({ id: 'b', availability: ['weekend', 'lunch'] })
      )
    ).toEqual(['weekend'])
  })
})
