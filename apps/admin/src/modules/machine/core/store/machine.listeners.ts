import type { AppStartListening } from '../../../app/store'
import { fetchMachinesThunk, saveMachineThunk } from './machine.thunks'

export const registerMachineListeners = (startListening: AppStartListening) => {
  startListening({
    actionCreator: saveMachineThunk.fulfilled,
    effect: async (_, { dispatch }) => {
      await dispatch(fetchMachinesThunk())
    },
  })
}
