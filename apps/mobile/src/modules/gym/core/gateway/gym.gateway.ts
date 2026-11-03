import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { MachineNotFoundError } from '../domain/errors/machine-not-found.error'
import type { Gym, Machine } from '../domain/gym.domain-model'

export type GymGateway = {
  readonly getCurrent: () => Effect.Effect<Gym, ParseError>
  readonly getMachine: (machineId: string) => Effect.Effect<Machine, MachineNotFoundError | ParseError>
}
