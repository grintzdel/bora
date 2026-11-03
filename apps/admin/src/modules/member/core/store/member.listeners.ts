import type { AppStartListening } from '../../../app/store'
import { fetchMembersThunk, proposeDuoThunk } from './member.thunks'

export const registerMemberListeners = (startListening: AppStartListening) => {
  startListening({
    actionCreator: proposeDuoThunk.fulfilled,
    effect: async (_, { dispatch, getState }) => {
      await dispatch(fetchMembersThunk(getState().member.query))
    },
  })
}
