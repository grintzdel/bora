import { describe, expect, it } from 'vitest'

import { formatRest, formatSeconds } from './format-duration'

describe('formatSeconds', () => {
  it('keeps short efforts in seconds', () => {
    expect(formatSeconds(30)).toBe('30 secondes')
  })

  it('switches to minutes from one minute', () => {
    expect(formatSeconds(300)).toBe('5 minutes')
  })
})

describe('formatRest', () => {
  it('writes minutes and seconds', () => {
    expect(formatRest(90)).toBe('repos 1 min 30')
  })

  it('writes whole minutes', () => {
    expect(formatRest(60)).toBe('repos 1 min')
  })

  it('writes seconds only', () => {
    expect(formatRest(45)).toBe('repos 45 s')
  })
})
