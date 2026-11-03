import { createEffectThunk } from '../../../app/create-effect-thunk'
import type { DuoSuggestion, ListMembersQuery } from '../domain/member.domain-model'

export const fetchMembersThunk = createEffectThunk('member/fetchList', (query: ListMembersQuery, { gateways }) =>
  gateways.member.list(query)
)

export const fetchDuoSuggestionThunk = createEffectThunk(
  'member/fetchDuoSuggestion',
  (memberId: string, { gateways }) => gateways.member.suggestPartner(memberId)
)

export const proposeDuoThunk = createEffectThunk('member/proposeDuo', (suggestion: DuoSuggestion, { gateways }) =>
  gateways.member.proposeDuo({ memberId: suggestion.member.id, partnerId: suggestion.partner.id })
)
