import { describe, expect, it } from 'vitest'

import { draftErrors, machineStatusOf } from './machine.domain-model'

const validDraft = {
  id: null,
  name: 'Poulie vis-à-vis',
  number: '15',
  zone: 'zone guidée',
  steps: ['Règle les poulies à hauteur d’épaule.'],
  qrInstalled: true,
}

describe('machineStatusOf', () => {
  it('is ready when the tutorial is written and the QR code is on the machine', () => {
    expect(machineStatusOf({ steps: ['Règle le siège.'], qrInstalled: true })).toBe('ready')
  })

  it('asks for the QR code when only the tutorial is ready', () => {
    expect(machineStatusOf({ steps: ['Règle le siège.'], qrInstalled: false })).toBe('qr-missing')
  })

  it('asks for the tutorial first when it is missing', () => {
    expect(machineStatusOf({ steps: [], qrInstalled: true })).toBe('tutorial-missing')
    expect(machineStatusOf({ steps: [], qrInstalled: false })).toBe('tutorial-missing')
  })
})

describe('draftErrors', () => {
  it('accepts a complete machine', () => {
    expect(draftErrors(validDraft)).toEqual({})
  })

  it('accepts a machine without tutorial yet', () => {
    expect(draftErrors({ ...validDraft, steps: [] })).toEqual({})
  })

  it('explains each invalid field in French', () => {
    const errors = draftErrors({ ...validDraft, name: '  ', number: '7', zone: '', steps: ['Règle le siège.', ' '] })

    expect(errors).toEqual({
      name: 'Donnez un nom à la machine.',
      number: 'Le numéro tient en deux chiffres, par exemple 07.',
      zone: 'Choisissez une zone.',
      'steps.1': 'Écrivez cette étape ou retirez-la.',
    })
  })
})
