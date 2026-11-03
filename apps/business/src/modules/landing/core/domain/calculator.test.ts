import { describe, expect, it } from 'vitest'

import { formatEuros, monthlyGain, sliderPercent, yearlyGain } from './calculator'

const compact = (value: string) => value.replace(/\s/g, '')

describe('calculator', () => {
  it('calcule le gain mensuel et annuel', () => {
    expect(monthlyGain(30, 3)).toBe(90)
    expect(yearlyGain(30, 3)).toBe(1080)
  })

  it('formate en euros français', () => {
    expect(compact(formatEuros(90))).toContain('90€')
    expect(compact(formatEuros(1080))).toContain('1080€')
  })

  it('place le curseur sur la piste', () => {
    expect(sliderPercent(15, 15, 80)).toBe(0)
    expect(sliderPercent(80, 15, 80)).toBe(100)
  })
})
