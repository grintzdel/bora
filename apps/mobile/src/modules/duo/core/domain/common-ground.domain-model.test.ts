import { describe, expect, it } from 'vitest'

import type { Profile } from '../../../member/core/domain/member.domain-model'
import { findCommonGround } from './common-ground.domain-model'

const sarah: Profile = { level: 'beginner', goal: 'feel-fit', availability: ['after-work'], sameGenderDuo: true }

describe('findCommonGround', () => {
  it('always starts with the shared gym', () => {
    expect(findCommonGround('Club Pilote', sarah, { ...sarah, level: 'regular', goal: 'gain-strength' })).toEqual([
      { kind: 'gym', gymName: 'Club Pilote' },
      { kind: 'availability', availability: 'after-work' },
    ])
  })

  it('lists level, slots and goal when they match', () => {
    expect(findCommonGround('Club Pilote', sarah, sarah)).toEqual([
      { kind: 'gym', gymName: 'Club Pilote' },
      { kind: 'level', level: 'beginner' },
      { kind: 'availability', availability: 'after-work' },
      { kind: 'goal', goal: 'feel-fit' },
    ])
  })

  it('keeps only the slots both can make', () => {
    const items = findCommonGround(
      'Club Pilote',
      { ...sarah, availability: ['lunch', 'weekend'] },
      {
        ...sarah,
        availability: ['weekend', 'after-work'],
      }
    )

    expect(items.filter((item) => item.kind === 'availability')).toEqual([
      { kind: 'availability', availability: 'weekend' },
    ])
  })
})
