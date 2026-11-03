import { createSlice } from '@reduxjs/toolkit'

import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { Dashboard } from '../domain/dashboard.domain-model'
import { fetchDashboardThunk } from './gym.thunks'

type GymState = { readonly dashboard: AsyncState<Dashboard> }

const initialState: GymState = { dashboard: idle() }

export const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardThunk.pending, (state) => ({ ...state, dashboard: loading(state.dashboard) }))
      .addCase(fetchDashboardThunk.fulfilled, (state, { payload }) => ({ ...state, dashboard: loaded(payload) }))
      .addCase(fetchDashboardThunk.rejected, (state, { payload }) => ({
        ...state,
        dashboard: failed(state.dashboard, payload),
      }))
  },
})
