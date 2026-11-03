import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { Machine, MachinesOverview, QrSheet } from '../domain/machine.domain-model'
import { fetchMachinesThunk, fetchQrSheetThunk, saveMachineThunk } from './machine.thunks'

type MachineState = {
  readonly overview: AsyncState<MachinesOverview>
  readonly save: AsyncState<Machine>
  readonly qrSheet: AsyncState<QrSheet>
  readonly qrSheetSelection: ReadonlyArray<string> | null
}

const initialState: MachineState = { overview: idle(), save: idle(), qrSheet: idle(), qrSheetSelection: null }

export const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    qrSheetSelected: (state, { payload }: PayloadAction<ReadonlyArray<string> | null>) => ({
      ...state,
      qrSheetSelection: payload,
    }),
    saveCleared: (state) => ({ ...state, save: idle<Machine>() }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachinesThunk.pending, (state) => ({ ...state, overview: loading(state.overview) }))
      .addCase(fetchMachinesThunk.fulfilled, (state, { payload }) => ({ ...state, overview: loaded(payload) }))
      .addCase(fetchMachinesThunk.rejected, (state, { payload }) => ({
        ...state,
        overview: failed(state.overview, payload),
      }))
      .addCase(saveMachineThunk.pending, (state) => ({ ...state, save: loading(idle<Machine>()) }))
      .addCase(saveMachineThunk.fulfilled, (state, { payload }) => ({ ...state, save: loaded(payload) }))
      .addCase(saveMachineThunk.rejected, (state, { payload }) => ({ ...state, save: failed(state.save, payload) }))
      .addCase(fetchQrSheetThunk.pending, (state) => ({ ...state, qrSheet: loading(state.qrSheet) }))
      .addCase(fetchQrSheetThunk.fulfilled, (state, { payload }) => ({ ...state, qrSheet: loaded(payload) }))
      .addCase(fetchQrSheetThunk.rejected, (state, { payload }) => ({
        ...state,
        qrSheet: failed(state.qrSheet, payload),
      }))
  },
})

export const { qrSheetSelected, saveCleared } = machineSlice.actions
