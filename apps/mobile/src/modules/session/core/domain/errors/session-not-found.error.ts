import * as Data from 'effect/Data'

export class SessionNotFoundError extends Data.TaggedError('SessionNotFoundError')<{
  readonly sessionId: string
}> {}
