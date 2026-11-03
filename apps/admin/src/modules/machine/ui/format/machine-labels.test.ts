import { describe, expect, it } from 'vitest'

import { describeMachinesToEquip, formatMachineCaption, formatZoneTitle } from './machine-labels'

const machine = {
  number: '07',
  name: 'Tirage vertical',
  scansThisMonth: 41,
  qrInstalled: true,
  status: 'ready' as const,
}

describe('formatMachineCaption', () => {
  it('shows how often a ready machine is scanned', () => {
    expect(formatMachineCaption(machine)).toBe('Machine 07 · scannée 41 fois ce mois')
  })

  it('says the tutorial is ready when only the QR code is missing', () => {
    expect(formatMachineCaption({ ...machine, status: 'qr-missing', qrInstalled: false })).toBe(
      'Machine 07 · tuto prêt'
    )
  })

  it('says where the QR code stands when the tutorial is missing', () => {
    expect(formatMachineCaption({ ...machine, status: 'tutorial-missing' })).toBe('Machine 07 · QR posé')
  })
})

describe('formatZoneTitle', () => {
  it('capitalises the zone and counts its machines', () => {
    expect(formatZoneTitle('zone guidée', 7)).toBe('Zone guidée · 7 machines')
    expect(formatZoneTitle('zone cardio', 1)).toBe('Zone cardio · 1 machine')
  })
})

describe('describeMachinesToEquip', () => {
  it('says nothing when every machine is ready', () => {
    expect(describeMachinesToEquip([machine])).toBeNull()
  })

  it('names what each machine is waiting for', () => {
    expect(
      describeMachinesToEquip([
        machine,
        { ...machine, name: 'Leg curl assis', status: 'qr-missing' },
        { ...machine, name: 'Poulie vis-à-vis', status: 'tutorial-missing' },
      ])
    ).toEqual({
      title: 'Il reste 2 machines à équiper.',
      details: "Leg curl assis n'a pas encore son QR code et Poulie vis-à-vis attend son tuto.",
    })
  })
})
