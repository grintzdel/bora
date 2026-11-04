'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { makeDemoDatabase } from '../shared/core/demo/demo-database'
import { browserDemoStorage, loadDemoState, saveDemoState } from '../shared/core/demo/demo-storage'
import { makeDemoExtra } from './app-extra'
import { makeStoreWithDeferredListeners } from './store'

const makeBrowserStore = () => {
  const storage = browserDemoStorage()
  const db = makeDemoDatabase(loadDemoState(storage) ?? undefined)
  return makeStoreWithDeferredListeners(makeDemoExtra({ db }), { persist: () => saveDemoState(storage, db.state) })
}

export const AppProviders = ({ children }: { readonly children: ReactNode }) => {
  const [{ store, startListeners }] = useState(makeBrowserStore)

  useEffect(() => startListeners(), [startListeners])

  return <Provider store={store}>{children}</Provider>
}
