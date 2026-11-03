import { makeDemoDatabase } from '../../shared/core/demo/demo-database'
import { makeDemoExtra } from '../app-extra'
import { makeStore } from '../store'

export const makeTestStore = () => {
  const db = makeDemoDatabase()
  const store = makeStore(makeDemoExtra({ db, latencyMs: 0, acceptanceDelayMs: 0 }))
  return { store, db }
}
