import * as Data from 'effect/Data'

export class ReportNotFoundError extends Data.TaggedError('ReportNotFoundError')<{
  readonly reportId: string
}> {}
