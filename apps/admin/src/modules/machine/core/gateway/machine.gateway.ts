import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { MachineNotFoundError } from '../domain/errors/machine-not-found.error'
import type { MachineNumberTakenError } from '../domain/errors/machine-number-taken.error'
import type { Machine, MachinesOverview, QrSheet } from '../domain/machine.domain-model'

export type MachineGateway = {
  readonly list: () => Effect.Effect<MachinesOverview, ParseError>
  readonly save: (input: unknown) => Effect.Effect<Machine, ParseError | MachineNumberTakenError | MachineNotFoundError>
  readonly getQrSheet: (machineIds: ReadonlyArray<string> | null) => Effect.Effect<QrSheet, ParseError>
}
