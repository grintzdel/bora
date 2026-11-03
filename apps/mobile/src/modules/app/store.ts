import {
  configureStore,
  createListenerMiddleware,
  type ThunkDispatch,
  type TypedStartListening,
  type UnknownAction,
} from '@reduxjs/toolkit'

import { registerDuoListeners } from '../duo/core/store/duo.listeners'
import { registerSessionListeners } from '../session/core/store/session.listeners'
import { type AppExtra, makeDemoExtra } from './app-extra'
import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, AppExtra, UnknownAction>
export type AppStartListening = TypedStartListening<RootState, AppDispatch, AppExtra>

export const makeStore = (extra: AppExtra = makeDemoExtra()) => {
  const listenerMiddleware = createListenerMiddleware({ extra })
  const startListening = listenerMiddleware.startListening as AppStartListening
  registerDuoListeners(startListening)
  registerSessionListeners(startListening)

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extra } }).prepend(listenerMiddleware.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
