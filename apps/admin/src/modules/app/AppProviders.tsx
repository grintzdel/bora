'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { makeStoreWithDeferredListeners } from './store'

export const AppProviders = ({ children }: { readonly children: ReactNode }) => {
  const [{ store, startListeners }] = useState(() => makeStoreWithDeferredListeners())

  useEffect(() => startListeners(), [startListeners])

  return <Provider store={store}>{children}</Provider>
}
