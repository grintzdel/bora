import { type ReactNode, useState } from 'react'
import { Provider } from 'react-redux'

import { makeStore } from './store'

export const AppProviders = ({ children }: { readonly children: ReactNode }) => {
  const [store] = useState(() => makeStore())

  return <Provider store={store}>{children}</Provider>
}
