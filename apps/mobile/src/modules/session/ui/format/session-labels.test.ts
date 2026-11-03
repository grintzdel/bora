import { describe, expect, it } from 'vitest'

import { formatEffort, formatProgramLine, formatStreak } from './session-labels'

describe('formatEffort', () => {
  it('describes a set of repetitions', () => {
    expect(formatEffort({ effort: { kind: 'reps', reps: 12 }, restSeconds: 90 })).toBe(
      '12 répétitions · repos 1 min 30'
    )
  })

  it('describes a timed effort', () => {
    expect(formatEffort({ effort: { kind: 'duration', seconds: 30 }, restSeconds: 45 })).toBe(
      '30 secondes · repos 45 s'
    )
  })
})

describe('formatProgramLine', () => {
  it('summarises the program', () => {
    expect(formatProgramLine({ name: 'Haut du corps', level: 'beginner', durationMinutes: 45 })).toBe(
      'Haut du corps · niveau débutant · 45 min'
    )
  })
})

describe('formatStreak', () => {
  it('cheers the streak in words', () => {
    expect(formatStreak(2)).toBe('Deux semaines sans en rater une.')
  })

  it('cheers a first week', () => {
    expect(formatStreak(1)).toBe('Une semaine sans en rater une.')
  })
})
