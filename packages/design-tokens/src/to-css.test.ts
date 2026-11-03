import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { toCss } from './to-css.ts'

describe('toCss', () => {
  it('matches the committed tokens.css', () => {
    const committed = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8')

    expect(committed).toBe(toCss())
  })

  it('exposes every color in both schemes', () => {
    const css = toCss()

    expect(css).toContain('--color-surface-000: #fbf8ff;')
    expect(css).toContain('--color-surface-000: #3a2c63;')
    expect(css).toContain('--color-on-lime: #2a1e4a;')
  })

  it('maps typography to Tailwind text utilities', () => {
    expect(toCss()).toContain('--text-title-1--line-height: 32px;')
  })
})
