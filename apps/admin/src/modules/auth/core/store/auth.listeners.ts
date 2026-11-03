import { isAnyOf } from '@reduxjs/toolkit'

import type { AppStartListening } from '../../../app/store'
import { resolveReportThunk, suspendMemberThunk } from '../../../safety/core/store/safety.thunks'
import { fetchSessionThunk } from './auth.thunks'

export const registerAuthListeners = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(resolveReportThunk.fulfilled, suspendMemberThunk.fulfilled),
    effect: async (_, { dispatch }) => {
      await dispatch(fetchSessionThunk())
    },
  })
}
