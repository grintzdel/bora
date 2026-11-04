import { isAnyOf } from '@reduxjs/toolkit'

import type { AppStartListening } from '../../../app/store'
import { deleteMachineThunk, fetchMachinesThunk, saveMachineThunk } from './machine.thunks'

export const registerMachineListeners = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(saveMachineThunk.fulfilled, deleteMachineThunk.fulfilled),
    effect: async (_, { dispatch }) => {
      await dispatch(fetchMachinesThunk())
    },
  })
}
