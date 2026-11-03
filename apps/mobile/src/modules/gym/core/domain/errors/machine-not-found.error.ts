import * as Data from 'effect/Data'

export class MachineNotFoundError extends Data.TaggedError('MachineNotFoundError')<{
  readonly machineId: string
}> {}
