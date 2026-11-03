import { createSlice } from '@reduxjs/toolkit'

import { resetDemoThunk } from '../../../demo/core/store/demo.thunks'
import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { CurrentDuo, DuoProposal } from '../domain/duo.domain-model'
import { fetchCurrentDuoThunk, fetchDuoProposalsThunk, proposeDuoThunk } from './duo.thunks'

type DuoState = {
  readonly proposals: AsyncState<ReadonlyArray<DuoProposal>>
  readonly proposalIndex: number
  readonly proposal: AsyncState<string>
  readonly current: AsyncState<CurrentDuo | null>
}

const initialState: DuoState = { proposals: idle(), proposalIndex: 0, proposal: idle(), current: idle() }

export const duoSlice = createSlice({
  name: 'duo',
  initialState,
  reducers: {
    nextProposalShown: (state) => {
      const count = state.proposals.data?.length ?? 0
      state.proposalIndex = count === 0 ? 0 : (state.proposalIndex + 1) % count
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDuoProposalsThunk.pending, (state) => ({
        ...state,
        proposals: loading(idle<ReadonlyArray<DuoProposal>>()),
        proposalIndex: 0,
        proposal: idle<string>(),
      }))
      .addCase(fetchDuoProposalsThunk.fulfilled, (state, { payload }) => ({ ...state, proposals: loaded(payload) }))
      .addCase(fetchDuoProposalsThunk.rejected, (state, { payload }) => ({
        ...state,
        proposals: failed(state.proposals, payload),
      }))
      .addCase(proposeDuoThunk.pending, (state) => ({ ...state, proposal: loading(idle<string>()) }))
      .addCase(proposeDuoThunk.fulfilled, (state, { meta }) => ({ ...state, proposal: loaded(meta.arg) }))
      .addCase(proposeDuoThunk.rejected, (state, { payload }) => ({
        ...state,
        proposal: failed(state.proposal, payload),
      }))
      .addCase(fetchCurrentDuoThunk.pending, (state) => ({ ...state, current: loading(state.current) }))
      .addCase(fetchCurrentDuoThunk.fulfilled, (state, { payload }) => ({ ...state, current: loaded(payload) }))
      .addCase(fetchCurrentDuoThunk.rejected, (state, { payload }) => ({
        ...state,
        current: failed(state.current, payload),
      }))
      .addCase(resetDemoThunk.fulfilled, () => initialState)
  },
})

export const { nextProposalShown } = duoSlice.actions
