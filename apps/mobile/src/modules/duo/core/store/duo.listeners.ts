import type { AppStartListening } from '../../../app/store'
import { fetchSessionsThunk } from '../../../session/core/store/session.thunks'
import { fetchCurrentDuoThunk, proposeDuoThunk } from './duo.thunks'

export const registerDuoListeners = (startListening: AppStartListening) => {
  startListening({
    actionCreator: proposeDuoThunk.fulfilled,
    effect: async (_, { dispatch }) => {
      await Promise.all([dispatch(fetchSessionsThunk()), dispatch(fetchCurrentDuoThunk())])
    },
  })
}
