import { describe, expect, it } from 'vitest'

import { cohortLabel, countInWords, monthName } from './dashboard-labels'

describe('dashboard labels', () => {
  it('names the month in French', () => {
    expect(monthName(10)).toBe('novembre')
  })

  it('elides "de" before a vowel in the cohort label', () => {
    expect(cohortLabel(7, 10)).toBe("Inscrits d'août, mesurés en novembre")
    expect(cohortLabel(8, 11)).toBe('Inscrits de septembre, mesurés en décembre')
  })

  it('writes small counts in words', () => {
    expect(countInWords(2)).toBe('deux')
    expect(countInWords(12)).toBe('12')
  })
})
