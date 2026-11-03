import { createSlice } from '@reduxjs/toolkit'

import { resetDemoThunk } from '../../../demo/core/store/demo.thunks'
import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { Member } from '../domain/member.domain-model'
import { fetchCurrentMemberThunk, saveProfileThunk } from './member.thunks'

type MemberState = {
  readonly current: AsyncState<Member>
  readonly save: AsyncState<Member>
}

const initialState: MemberState = { current: idle(), save: idle() }

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentMemberThunk.pending, (state) => ({ ...state, current: loading(state.current) }))
      .addCase(fetchCurrentMemberThunk.fulfilled, (state, { payload }) => ({ ...state, current: loaded(payload) }))
      .addCase(fetchCurrentMemberThunk.rejected, (state, { payload }) => ({
        ...state,
        current: failed(state.current, payload),
      }))
      .addCase(saveProfileThunk.pending, (state) => ({ ...state, save: loading(state.save) }))
      .addCase(saveProfileThunk.fulfilled, (_, { payload }) => ({ current: loaded(payload), save: loaded(payload) }))
      .addCase(saveProfileThunk.rejected, (state, { payload }) => ({ ...state, save: failed(state.save, payload) }))
      .addCase(resetDemoThunk.fulfilled, () => initialState)
  },
})
