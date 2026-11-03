import { createSlice } from '@reduxjs/toolkit'

import { resetDemoThunk } from '../../../demo/core/store/demo.thunks'
import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { Gym, Machine } from '../domain/gym.domain-model'
import { fetchGymThunk, fetchMachineThunk } from './gym.thunks'

type GymState = {
  readonly gym: AsyncState<Gym>
  readonly machine: AsyncState<Machine>
}

const initialState: GymState = { gym: idle(), machine: idle() }

export const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymThunk.pending, (state) => ({ ...state, gym: loading(state.gym) }))
      .addCase(fetchGymThunk.fulfilled, (state, { payload }) => ({ ...state, gym: loaded(payload) }))
      .addCase(fetchGymThunk.rejected, (state, { payload }) => ({ ...state, gym: failed(state.gym, payload) }))
      .addCase(fetchMachineThunk.pending, (state) => ({ ...state, machine: loading(idle<Machine>()) }))
      .addCase(fetchMachineThunk.fulfilled, (state, { payload }) => ({ ...state, machine: loaded(payload) }))
      .addCase(fetchMachineThunk.rejected, (state, { payload }) => ({
        ...state,
        machine: failed(state.machine, payload),
      }))
      .addCase(resetDemoThunk.fulfilled, () => initialState)
  },
})
