import { describe, expect, it } from 'vitest'

import { formatEuros, formatPercent } from './format-number'

describe('formatPercent', () => {
  it('rounds to a whole percent', () => {
    expect(formatPercent(11 / 14)).toBe('79 %')
  })
})

describe('formatEuros', () => {
  it('writes cents as euros the French way', () => {
    expect(formatEuros(20930)).toBe('209,30 €')
  })

  it('drops the cents on round amounts', () => {
    expect(formatEuros(20900)).toBe('209 €')
  })
})
