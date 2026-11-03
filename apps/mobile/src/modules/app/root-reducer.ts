import { combineReducers } from '@reduxjs/toolkit'

import { duoSlice } from '../duo/core/store/duo.slice'
import { gymSlice } from '../gym/core/store/gym.slice'
import { memberSlice } from '../member/core/store/member.slice'
import { safetySlice } from '../safety/core/store/safety.slice'
import { sessionSlice } from '../session/core/store/session.slice'

export const rootReducer = combineReducers({
  member: memberSlice.reducer,
  gym: gymSlice.reducer,
  duo: duoSlice.reducer,
  session: sessionSlice.reducer,
  safety: safetySlice.reducer,
})
