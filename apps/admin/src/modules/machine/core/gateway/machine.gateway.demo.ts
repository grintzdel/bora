import type { SeedMachine } from '@bora/demo-data'
import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { MachineNotFoundError } from '../domain/errors/machine-not-found.error'
import { MachineNumberTakenError } from '../domain/errors/machine-number-taken.error'
import {
  MachineSchema,
  MachinesOverviewSchema,
  machineStatusOf,
  QrSheetSchema,
  type SaveMachine,
  SaveMachineSchema,
} from '../domain/machine.domain-model'
import type { MachineGateway } from './machine.gateway'

const DEFAULT_VIDEO_SECONDS = 20

const byNumber = (left: SeedMachine, right: SeedMachine) => left.number.localeCompare(right.number)

export const makeMachineDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): MachineGateway => {
  const statusOf = (machineId: string) =>
    db.state.space.machineStatus[machineId] ?? { qrInstalled: false, scansThisMonth: 0 }

  const qrValueOf = (machineId: string) => `${db.state.space.machineQrBaseUrl}${machineId}`

  const usagesOf = (machineId: string) =>
    db.state.app.programs.flatMap((program) =>
      program.exercises
        .filter((exercise) => exercise.machineId === machineId)
        .map((exercise) => ({ programName: program.name, exerciseName: exercise.name, settings: exercise.settings }))
    )

  const toMachine = (machine: SeedMachine) => {
    const { qrInstalled, scansThisMonth } = statusOf(machine.id)
    return {
      ...machine,
      qrInstalled,
      scansThisMonth,
      status: machineStatusOf({ steps: machine.steps, qrInstalled }),
      qrValue: qrValueOf(machine.id),
      usages: usagesOf(machine.id),
    }
  }

  const sortedMachines = () => db.state.app.machines.toSorted(byNumber)

  const overview = () => {
    const zoneNames = [...new Set(db.state.app.machines.map((machine) => machine.zone))]
    const machines = sortedMachines()
    return {
      zones: zoneNames.map((name) => ({
        name,
        machines: machines.filter((machine) => machine.zone === name).map(toMachine),
      })),
      programs: db.state.app.programs.map((program) => ({
        id: program.id,
        name: program.name,
        level: program.level,
        durationMinutes: program.durationMinutes,
        exercises: program.exercises.map((exercise) => ({
          name: exercise.name,
          machineNumber: db.state.app.machines.find((machine) => machine.id === exercise.machineId)?.number ?? null,
        })),
      })),
    }
  }

  const newIdFor = (number: string) => {
    const id = `machine-${number}`
    return db.state.app.machines.some((machine) => machine.id === id) ? `${id}-${db.state.app.machines.length + 1}` : id
  }

  const persist = (data: SaveMachine) =>
    Effect.suspend((): Effect.Effect<SeedMachine, MachineNumberTakenError | MachineNotFoundError> => {
      const taken = db.state.app.machines.find((machine) => machine.number === data.number && machine.id !== data.id)
      if (taken) return Effect.fail(new MachineNumberTakenError({ number: data.number, takenBy: taken.name }))

      const fields = { name: data.name, number: data.number, zone: data.zone, steps: [...data.steps] }
      if (data.id === null) {
        const created: SeedMachine = { id: newIdFor(data.number), videoSeconds: DEFAULT_VIDEO_SECONDS, ...fields }
        db.state.app.machines.push(created)
        db.state.space.machineStatus[created.id] = { qrInstalled: data.qrInstalled, scansThisMonth: 0 }
        return Effect.succeed(created)
      }

      const existing = db.state.app.machines.find((machine) => machine.id === data.id)
      if (!existing) return Effect.fail(new MachineNotFoundError({ machineId: data.id }))
      Object.assign(existing, fields)
      db.state.space.machineStatus[existing.id] = { ...statusOf(existing.id), qrInstalled: data.qrInstalled }
      return Effect.succeed(existing)
    })

  const remove = (machineId: string) =>
    Effect.suspend((): Effect.Effect<string, MachineNotFoundError> => {
      if (!db.state.app.machines.some((machine) => machine.id === machineId)) {
        return Effect.fail(new MachineNotFoundError({ machineId }))
      }
      db.state.app.machines = db.state.app.machines.filter((machine) => machine.id !== machineId)
      delete db.state.space.machineStatus[machineId]
      for (const exercise of db.state.app.programs.flatMap((program) => program.exercises)) {
        if (exercise.machineId === machineId) exercise.machineId = null
      }
      return Effect.succeed(machineId)
    })

  return {
    list: () =>
      simulateNetwork(latencyMs).pipe(Effect.andThen(() => Schema.decodeUnknown(MachinesOverviewSchema)(overview()))),
    save: (input) =>
      Schema.decodeUnknown(SaveMachineSchema)(input).pipe(
        Effect.tap(() => simulateNetwork(latencyMs)),
        Effect.andThen(persist),
        Effect.andThen((machine) => Schema.decodeUnknown(MachineSchema)(toMachine(machine)))
      ),
    delete: (machineId) => simulateNetwork(latencyMs).pipe(Effect.andThen(() => remove(machineId))),
    getQrSheet: (machineIds) =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() =>
          Schema.decodeUnknown(QrSheetSchema)({
            gymName: db.state.app.gym.name,
            cards: sortedMachines()
              .filter((machine) => machineIds === null || machineIds.includes(machine.id))
              .map((machine) => ({
                id: machine.id,
                number: machine.number,
                name: machine.name,
                qrValue: qrValueOf(machine.id),
              })),
          })
        )
      ),
  }
}
