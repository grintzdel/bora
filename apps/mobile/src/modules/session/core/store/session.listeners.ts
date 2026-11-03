import { isAnyOf } from '@reduxjs/toolkit'

import type { AppStartListening } from '../../../app/store'
import { simulatePartnerAbsenceThunk } from '../../../demo/core/store/demo.thunks'
import {
  completeSessionThunk,
  confirmSessionThunk,
  fetchSessionsThunk,
  fetchStatsThunk,
  rateSessionThunk,
  resolvePartnerAbsenceThunk,
} from './session.thunks'

export const registerSessionListeners = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(
      completeSessionThunk.fulfilled,
      confirmSessionThunk.fulfilled,
      rateSessionThunk.fulfilled,
      resolvePartnerAbsenceThunk.fulfilled,
      simulatePartnerAbsenceThunk.fulfilled
    ),
    effect: async (_, { dispatch }) => {
      await dispatch(fetchSessionsThunk())
    },
  })

  startListening({
    actionCreator: completeSessionThunk.fulfilled,
    effect: async (_, { dispatch }) => {
      await dispatch(fetchStatsThunk())
    },
  })
}
