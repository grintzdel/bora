import { describe, expect, it } from 'vitest'

import { formatCommonGround, formatPartnerTag } from './duo-labels'

describe('formatPartnerTag', () => {
  it('describes a partner without a photo', () => {
    expect(formatPartnerTag({ gender: 'female', level: 'beginner', joinedDaysAgo: 10 })).toBe(
      'Débutante · inscrite il y a 10 jours'
    )
  })

  it('agrees with the partner gender', () => {
    expect(formatPartnerTag({ gender: 'male', level: 'regular', joinedDaysAgo: 1 })).toBe(
      'Régulier · inscrit il y a 1 jour'
    )
  })
})

describe('formatCommonGround', () => {
  it('turns each shared point into a sentence', () => {
    expect(
      [
        { kind: 'gym', gymName: 'Club Pilote' },
        { kind: 'level', level: 'beginner' },
        { kind: 'availability', availability: 'after-work' },
        { kind: 'goal', goal: 'feel-fit' },
      ].map((item) => formatCommonGround(item as Parameters<typeof formatCommonGround>[0]))
    ).toEqual(['Club Pilote', 'Niveau débutant', 'Après le travail, en semaine', 'Se sentir en forme'])
  })
})
