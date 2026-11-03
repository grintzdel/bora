import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'
import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { makeMachineDemoGateway } from './machine.gateway.demo'

const options = { latencyMs: 0, now: () => new Date('2026-11-03T10:00:00+01:00') }

const editDraft = {
  id: 'machine-07',
  name: 'Tirage vertical',
  number: '07',
  zone: 'zone guidée',
  steps: ['Règle le siège.', 'Tire la barre vers le menton.'],
  qrInstalled: true,
}

describe('makeMachineDemoGateway', () => {
  it('groups the machines of the mobile app by zone, sorted by number', async () => {
    const overview = await Effect.runPromise(makeMachineDemoGateway(makeDemoDatabase(), options).list())

    expect(overview.zones.map((zone) => [zone.name, zone.machines.length])).toEqual([
      ['zone cardio', 2],
      ['zone guidée', 7],
    ])
    expect(overview.zones[1]?.machines.map((machine) => machine.number)).toEqual([
      '04',
      '07',
      '09',
      '11',
      '12',
      '13',
      '15',
    ])
  })

  it('tells which machines still need a QR code or a tutorial', async () => {
    const overview = await Effect.runPromise(makeMachineDemoGateway(makeDemoDatabase(), options).list())
    const machines = overview.zones.flatMap((zone) => zone.machines)

    expect(machines.find((machine) => machine.id === 'machine-12')?.status).toBe('qr-missing')
    expect(machines.find((machine) => machine.id === 'machine-15')?.status).toBe('tutorial-missing')
    expect(machines.find((machine) => machine.id === 'machine-07')).toMatchObject({
      status: 'ready',
      scansThisMonth: 41,
      qrValue: 'bora://machine/machine-07',
    })
  })

  it('lists the beginner settings the programs use on each machine', async () => {
    const overview = await Effect.runPromise(makeMachineDemoGateway(makeDemoDatabase(), options).list())
    const pulldown = overview.zones.flatMap((zone) => zone.machines).find((machine) => machine.id === 'machine-07')

    expect(pulldown?.usages).toEqual([
      {
        programName: 'Haut du corps',
        exerciseName: 'Tirage vertical',
        settings: [
          { label: 'Siège', value: 'Cran 4' },
          { label: 'Pour commencer', value: '20 kg' },
        ],
      },
    ])
  })

  it('summarises the guided programs with their machines', async () => {
    const overview = await Effect.runPromise(makeMachineDemoGateway(makeDemoDatabase(), options).list())

    expect(overview.programs[0]).toMatchObject({ name: 'Haut du corps', level: 'beginner', durationMinutes: 45 })
    expect(overview.programs[0]?.exercises[0]).toEqual({ name: 'Rameur', machineNumber: '02' })
    expect(overview.programs[0]?.exercises[4]).toEqual({ name: 'Gainage', machineNumber: null })
  })

  it('updates the machine the mobile app shows after the scan', async () => {
    const db = makeDemoDatabase()
    const gateway = makeMachineDemoGateway(db, options)

    const saved = await Effect.runPromise(gateway.save({ ...editDraft, name: '  Tirage poitrine ' }))

    expect(saved.name).toBe('Tirage poitrine')
    expect(db.state.app.machines.find((machine) => machine.id === 'machine-07')).toMatchObject({
      name: 'Tirage poitrine',
      steps: ['Règle le siège.', 'Tire la barre vers le menton.'],
    })
  })

  it('records the QR code once it is on the machine', async () => {
    const db = makeDemoDatabase()
    const leg = db.state.app.machines.find((machine) => machine.id === 'machine-12')
    if (!leg) throw new Error('missing seed machine')

    const saved = await Effect.runPromise(
      makeMachineDemoGateway(db, options).save({ ...leg, steps: [...leg.steps], qrInstalled: true })
    )

    expect(saved.status).toBe('ready')
    expect(db.state.space.machineStatus['machine-12']?.qrInstalled).toBe(true)
  })

  it('creates a new machine with its own QR code', async () => {
    const db = makeDemoDatabase()

    const saved = await Effect.runPromise(
      makeMachineDemoGateway(db, options).save({ ...editDraft, id: null, name: 'Butterfly', number: '16' })
    )

    expect(saved).toMatchObject({ id: 'machine-16', qrValue: 'bora://machine/machine-16', status: 'ready' })
    expect(db.state.app.machines.some((machine) => machine.id === 'machine-16')).toBe(true)
  })

  it('refuses a number already taken by another machine', async () => {
    const exit = await Effect.runPromiseExit(
      makeMachineDemoGateway(makeDemoDatabase(), options).save({ ...editDraft, id: null, number: '07' })
    )

    expect(Exit.isFailure(exit)).toBe(true)
    expect(JSON.stringify(exit)).toContain('MachineNumberTakenError')
  })

  it('refuses an invalid machine', async () => {
    const exit = await Effect.runPromiseExit(
      makeMachineDemoGateway(makeDemoDatabase(), options).save({ ...editDraft, name: '' })
    )

    expect(Exit.isFailure(exit)).toBe(true)
  })

  it('builds the QR sheet for the selected machines only', async () => {
    const gateway = makeMachineDemoGateway(makeDemoDatabase(), options)

    const all = await Effect.runPromise(gateway.getQrSheet(null))
    const one = await Effect.runPromise(gateway.getQrSheet(['machine-12']))

    expect(all.gymName).toBe('Club Pilote')
    expect(all.cards).toHaveLength(9)
    expect(one.cards).toEqual([
      { id: 'machine-12', number: '12', name: 'Leg curl assis', qrValue: 'bora://machine/machine-12' },
    ])
  })
})
