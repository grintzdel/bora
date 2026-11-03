import * as Data from 'effect/Data'

export class DuoProposalNotFoundError extends Data.TaggedError('DuoProposalNotFoundError')<{
  readonly proposalId: string
}> {}
