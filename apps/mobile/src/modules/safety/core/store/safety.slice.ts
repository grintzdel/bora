import { createSlice } from '@reduxjs/toolkit'

import { resetDemoThunk } from '../../../demo/core/store/demo.thunks'
import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { Report } from '../domain/safety.domain-model'
import { submitReportThunk } from './safety.thunks'

type SafetyState = { readonly report: AsyncState<Report> }

const initialState: SafetyState = { report: idle() }

export const safetySlice = createSlice({
  name: 'safety',
  initialState,
  reducers: {
    reportCleared: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReportThunk.pending, () => ({ report: loading(idle<Report>()) }))
      .addCase(submitReportThunk.fulfilled, (_, { payload }) => ({ report: loaded(payload) }))
      .addCase(submitReportThunk.rejected, (state, { payload }) => ({ report: failed(state.report, payload) }))
      .addCase(resetDemoThunk.fulfilled, () => initialState)
  },
})

export const { reportCleared } = safetySlice.actions
