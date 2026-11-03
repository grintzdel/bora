import { describe, expect, it } from 'vitest'

import { findGym } from './gyms'

describe('findGym', () => {
  it('retrouve une salle par une partie du nom', () => {
    expect(findGym('basic fit')?.id).toBe('basic-fit-republique')
  })

  it('ignore les accents', () => {
    expect(findGym('neoness chatelet')?.name).toBe('Neoness Châtelet')
  })

  it('ignore une requête trop courte', () => {
    expect(findGym('b')).toBeUndefined()
  })

  it('retourne undefined si aucune salle ne correspond', () => {
    expect(findGym('salle inconnue du 20e')).toBeUndefined()
  })
})
