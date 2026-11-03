import * as Data from 'effect/Data'

export class MemberNotWaitingError extends Data.TaggedError('MemberNotWaitingError')<{
  readonly memberId: string
}> {}
