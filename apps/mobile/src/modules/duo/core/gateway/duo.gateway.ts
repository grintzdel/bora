import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { ProposalKind } from '../domain/constants/proposal-kind.constant'
import type { CurrentDuo, DuoProposal } from '../domain/duo.domain-model'
import type { DuoProposalNotFoundError } from '../domain/errors/duo-proposal-not-found.error'

export type DuoGateway = {
  readonly listProposals: (kind: ProposalKind) => Effect.Effect<ReadonlyArray<DuoProposal>, ParseError>
  readonly propose: (proposalId: string) => Effect.Effect<void, DuoProposalNotFoundError>
  readonly getCurrent: () => Effect.Effect<CurrentDuo | null, ParseError>
}
