import { isAnyOf } from '@reduxjs/toolkit'

import type { AppStartListening } from '../../../app/store'
import { fetchReportsThunk, resolveReportThunk, suspendMemberThunk } from './safety.thunks'

export const registerSafetyListeners = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(resolveReportThunk.fulfilled, suspendMemberThunk.fulfilled),
    effect: async (_, { dispatch }) => {
      await dispatch(fetchReportsThunk())
    },
  })
}
