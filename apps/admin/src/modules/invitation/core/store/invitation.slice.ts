import { createSlice } from '@reduxjs/toolkit'

import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { WelcomeKit } from '../domain/invitation.domain-model'
import { fetchWelcomeKitThunk } from './invitation.thunks'

type InvitationState = { readonly kit: AsyncState<WelcomeKit> }

const initialState: InvitationState = { kit: idle() }

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWelcomeKitThunk.pending, (state) => ({ kit: loading(state.kit) }))
      .addCase(fetchWelcomeKitThunk.fulfilled, (_, { payload }) => ({ kit: loaded(payload) }))
      .addCase(fetchWelcomeKitThunk.rejected, (state, { payload }) => ({ kit: failed(state.kit, payload) }))
  },
})
