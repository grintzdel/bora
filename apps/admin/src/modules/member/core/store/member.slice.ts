import { createSlice } from '@reduxjs/toolkit'

import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { DuoSuggestion, ListMembersQuery, MemberList } from '../domain/member.domain-model'
import { fetchDuoSuggestionThunk, fetchMembersThunk, proposeDuoThunk } from './member.thunks'

type MemberState = {
  readonly query: ListMembersQuery
  readonly list: AsyncState<MemberList>
  readonly suggestion: AsyncState<DuoSuggestion | null> & { readonly memberId: string | null }
  readonly sent: AsyncState<DuoSuggestion>
}

const initialState: MemberState = {
  query: { search: '', filter: 'all' },
  list: idle(),
  suggestion: { ...idle<DuoSuggestion | null>(), memberId: null },
  sent: idle(),
}

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    proposalDismissed: (state) => ({ ...state, sent: idle<DuoSuggestion>() }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersThunk.pending, (state, { meta }) => ({
        ...state,
        query: meta.arg,
        list: loading(state.list),
      }))
      .addCase(fetchMembersThunk.fulfilled, (state, { payload }) => ({ ...state, list: loaded(payload) }))
      .addCase(fetchMembersThunk.rejected, (state, { payload }) => ({ ...state, list: failed(state.list, payload) }))
      .addCase(fetchDuoSuggestionThunk.pending, (state, { meta }) => ({
        ...state,
        suggestion: { ...loading(idle<DuoSuggestion | null>()), memberId: meta.arg },
      }))
      .addCase(fetchDuoSuggestionThunk.fulfilled, (state, { payload, meta }) =>
        state.suggestion.memberId === meta.arg
          ? { ...state, suggestion: { ...loaded(payload), memberId: meta.arg } }
          : state
      )
      .addCase(fetchDuoSuggestionThunk.rejected, (state, { payload, meta }) =>
        state.suggestion.memberId === meta.arg
          ? { ...state, suggestion: { ...failed(state.suggestion, payload), memberId: meta.arg } }
          : state
      )
      .addCase(proposeDuoThunk.pending, (state) => ({ ...state, sent: loading(idle<DuoSuggestion>()) }))
      .addCase(proposeDuoThunk.fulfilled, (state, { meta }) => ({ ...state, sent: loaded(meta.arg) }))
      .addCase(proposeDuoThunk.rejected, (state, { payload }) => ({ ...state, sent: failed(state.sent, payload) }))
  },
})

export const { proposalDismissed } = memberSlice.actions
