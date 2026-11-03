import { combineReducers } from '@reduxjs/toolkit'

import { authSlice } from '../auth/core/store/auth.slice'
import { gymSlice } from '../gym/core/store/gym.slice'
import { invitationSlice } from '../invitation/core/store/invitation.slice'
import { machineSlice } from '../machine/core/store/machine.slice'
import { memberSlice } from '../member/core/store/member.slice'
import { safetySlice } from '../safety/core/store/safety.slice'

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  gym: gymSlice.reducer,
  member: memberSlice.reducer,
  machine: machineSlice.reducer,
  safety: safetySlice.reducer,
  invitation: invitationSlice.reducer,
})
