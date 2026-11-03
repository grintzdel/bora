import { describe, expect, it } from 'vitest'

import { initials } from './initials'

describe('initials', () => {
  it('takes the first letter of the first two words', () => {
    expect(initials('Léa M.')).toBe('LM')
  })

  it('keeps a single initial for a single word', () => {
    expect(initials('Sarah')).toBe('S')
  })
})
