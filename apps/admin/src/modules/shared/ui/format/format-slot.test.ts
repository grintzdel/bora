import { describe, expect, it } from 'vitest'

import { formatSlot, formatSlotTitle, formatWeekday } from './format-slot'

describe('formatSlot', () => {
  it('writes the slot the French way', () => {
    expect(formatSlot({ weekday: 'tuesday', time: '18:30' })).toBe('Mardi 18 h 30')
  })

  it('drops the minutes on the hour', () => {
    expect(formatSlot({ weekday: 'thursday', time: '19:00' })).toBe('Jeudi 19 h')
  })

  it('adds a comma for titles', () => {
    expect(formatSlotTitle({ weekday: 'tuesday', time: '18:30' })).toBe('Mardi, 18 h 30')
  })

  it('lowercases the weekday inside a sentence', () => {
    expect(formatWeekday('thursday')).toBe('jeudi')
  })
})
