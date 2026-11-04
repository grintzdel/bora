import {
  configureStore,
  createListenerMiddleware,
  isFulfilled,
  type ThunkDispatch,
  type TypedStartListening,
  type UnknownAction,
} from '@reduxjs/toolkit'

import { registerAuthListeners } from '../auth/core/store/auth.listeners'
import { registerMachineListeners } from '../machine/core/store/machine.listeners'
import { registerMemberListeners } from '../member/core/store/member.listeners'
import { registerSafetyListeners } from '../safety/core/store/safety.listeners'
import { type AppExtra, makeDemoExtra } from './app-extra'
import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, AppExtra, UnknownAction>
export type AppStartListening = TypedStartListening<RootState, AppDispatch, AppExtra>

type StoreOptions = {
  readonly persist?: () => void
}

export const makeStoreWithDeferredListeners = (extra: AppExtra = makeDemoExtra(), { persist }: StoreOptions = {}) => {
  const listenerMiddleware = createListenerMiddleware({ extra })
  const startListening = listenerMiddleware.startListening as AppStartListening

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extra } }).prepend(listenerMiddleware.middleware),
  })

  const startListeners = () => {
    registerAuthListeners(startListening)
    registerMemberListeners(startListening)
    registerMachineListeners(startListening)
    registerSafetyListeners(startListening)
    if (persist) startListening({ matcher: isFulfilled, effect: persist })
    return () => listenerMiddleware.clearListeners()
  }

  return { store, startListeners }
}

export const makeStore = (extra: AppExtra = makeDemoExtra(), options: StoreOptions = {}) => {
  const { store, startListeners } = makeStoreWithDeferredListeners(extra, options)
  startListeners()
  return store
}

export type AppStore = ReturnType<typeof makeStore>
