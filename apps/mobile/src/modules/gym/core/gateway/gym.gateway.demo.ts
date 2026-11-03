import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { MachineNotFoundError } from '../domain/errors/machine-not-found.error'
import { GymSchema, MachineSchema } from '../domain/gym.domain-model'
import type { GymGateway } from './gym.gateway'

export const makeGymDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): GymGateway => ({
  getCurrent: () =>
    simulateNetwork(latencyMs).pipe(Effect.andThen(() => Schema.decodeUnknown(GymSchema)(db.state.gym))),
  getMachine: (machineId) =>
    simulateNetwork(latencyMs).pipe(
      Effect.andThen(() => {
        const machine = db.state.machines.find((candidate) => candidate.id === machineId)
        return machine
          ? Schema.decodeUnknown(MachineSchema)(machine)
          : Effect.fail(new MachineNotFoundError({ machineId }))
      })
    ),
})
