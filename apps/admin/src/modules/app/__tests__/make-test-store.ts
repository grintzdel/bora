import { makeDemoDatabase } from '../../shared/core/demo/demo-database'
import { makeDemoExtra } from '../app-extra'
import { makeStore } from '../store'

export const TEST_NOW = new Date('2026-11-03T10:00:00+01:00')

export const makeTestStore = () => {
  const db = makeDemoDatabase()
  const store = makeStore(makeDemoExtra({ db, latencyMs: 0, now: () => TEST_NOW }))
  return { store, db }
}
