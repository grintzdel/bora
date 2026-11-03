import * as Data from 'effect/Data'

export class MemberNotFoundError extends Data.TaggedError('MemberNotFoundError')<{
  readonly memberId: string
}> {}
