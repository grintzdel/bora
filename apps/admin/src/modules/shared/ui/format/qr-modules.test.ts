import { describe, expect, it } from 'vitest'

import { qrModules } from './qr-modules'

describe('qrModules', () => {
  it('draws one square per dark module, inside a quiet zone', () => {
    const { size, path } = qrModules('bora://machine/machine-07')

    expect(size).toBeGreaterThan(21)
    expect(path).toMatch(/^M\d+ \d+h1v1h-1z/)
    expect(path).not.toContain('M0 ')
  })

  it('gives the same drawing for the same value', () => {
    expect(qrModules('https://bora.app/salle/club-pilote')).toEqual(qrModules('https://bora.app/salle/club-pilote'))
  })
})
