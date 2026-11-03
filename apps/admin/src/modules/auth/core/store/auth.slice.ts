import { createSlice } from '@reduxjs/toolkit'

import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { DemoAccount, ManagerSession } from '../domain/auth.domain-model'
import { fetchDemoAccountThunk, fetchSessionThunk, signInThunk } from './auth.thunks'

type AuthState = {
  readonly demoAccount: AsyncState<DemoAccount>
  readonly session: AsyncState<ManagerSession>
}

const initialState: AuthState = { demoAccount: idle(), session: idle() }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedOut: (state) => ({ ...state, session: idle<ManagerSession>() }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemoAccountThunk.fulfilled, (state, { payload }) => ({ ...state, demoAccount: loaded(payload) }))
      .addCase(signInThunk.pending, (state) => ({ ...state, session: loading(state.session) }))
      .addCase(signInThunk.fulfilled, (state, { payload }) => ({ ...state, session: loaded(payload) }))
      .addCase(signInThunk.rejected, (state, { payload }) => ({ ...state, session: failed(state.session, payload) }))
      .addCase(fetchSessionThunk.fulfilled, (state, { payload }) => ({ ...state, session: loaded(payload) }))
  },
})

export const { signedOut } = authSlice.actions
