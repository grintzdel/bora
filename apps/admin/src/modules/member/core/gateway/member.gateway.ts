import type * as Effect from 'effect/Effect'
import type { ParseError } from 'effect/ParseResult'

import type { MemberNotFoundError } from '../domain/errors/member-not-found.error'
import type { MemberNotWaitingError } from '../domain/errors/member-not-waiting.error'
import type { DuoSuggestion, ListMembersQuery, MemberList } from '../domain/member.domain-model'

export type MemberGateway = {
  readonly list: (query: ListMembersQuery) => Effect.Effect<MemberList, ParseError>
  readonly suggestPartner: (memberId: string) => Effect.Effect<DuoSuggestion | null, MemberNotFoundError | ParseError>
  readonly proposeDuo: (input: unknown) => Effect.Effect<void, MemberNotWaitingError | ParseError>
}
