import * as Data from 'effect/Data'

export class MachineNumberTakenError extends Data.TaggedError('MachineNumberTakenError')<{
  readonly number: string
  readonly takenBy: string
}> {}
