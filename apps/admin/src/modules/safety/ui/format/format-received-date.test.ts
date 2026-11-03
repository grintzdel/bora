import { describe, expect, it } from 'vitest'

import { formatReceivedDate } from './format-received-date'

describe('formatReceivedDate', () => {
  it('writes the reception day the French way', () => {
    expect(formatReceivedDate('2026-10-29T09:00:00.000Z')).toBe('Reçu jeudi 29 octobre')
  })
})
