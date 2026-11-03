import { createSlice } from '@reduxjs/toolkit'

import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { Report, SafetyAction } from '../domain/safety.domain-model'
import { fetchReportsThunk, resolveReportThunk, suspendMemberThunk } from './safety.thunks'

type SafetyState = {
  readonly reports: AsyncState<ReadonlyArray<Report>>
  readonly lastAction: AsyncState<SafetyAction>
}

const initialState: SafetyState = { reports: idle(), lastAction: idle() }

export const safetySlice = createSlice({
  name: 'safety',
  initialState,
  reducers: {
    safetyActionCleared: (state) => ({ ...state, lastAction: idle<SafetyAction>() }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsThunk.pending, (state) => ({ ...state, reports: loading(state.reports) }))
      .addCase(fetchReportsThunk.fulfilled, (state, { payload }) => ({ ...state, reports: loaded(payload) }))
      .addCase(fetchReportsThunk.rejected, (state, { payload }) => ({
        ...state,
        reports: failed(state.reports, payload),
      }))
      .addCase(resolveReportThunk.pending, (state) => ({ ...state, lastAction: loading(idle<SafetyAction>()) }))
      .addCase(resolveReportThunk.fulfilled, (state, { payload }) => ({
        ...state,
        lastAction: loaded<SafetyAction>({ kind: 'resolved', ...payload }),
      }))
      .addCase(resolveReportThunk.rejected, (state, { payload }) => ({
        ...state,
        lastAction: failed(state.lastAction, payload),
      }))
      .addCase(suspendMemberThunk.pending, (state) => ({ ...state, lastAction: loading(idle<SafetyAction>()) }))
      .addCase(suspendMemberThunk.fulfilled, (state, { payload }) => ({
        ...state,
        lastAction: loaded<SafetyAction>({ kind: 'suspended', ...payload }),
      }))
      .addCase(suspendMemberThunk.rejected, (state, { payload }) => ({
        ...state,
        lastAction: failed(state.lastAction, payload),
      }))
  },
})

export const { safetyActionCleared } = safetySlice.actions
