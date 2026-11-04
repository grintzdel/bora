import { describe, expect, it } from 'vitest'

import { makeDemoExtra } from '../../../app/app-extra'
import { makeStore } from '../../../app/store'
import { deleteMachineThunk } from '../../../machine/core/store/machine.thunks'
import { makeDemoDatabase } from '../../../shared/core/demo/demo-database'
import { type DemoStorage, loadDemoState, saveDemoState } from '../../../shared/core/demo/demo-storage'
import { resetDemoThunk } from './demo.thunks'

const makeMemoryStorage = (): DemoStorage => {
  const items = new Map<string, string>()
  return { getItem: (key) => items.get(key) ?? null, setItem: (key, value) => void items.set(key, value) }
}

const makePersistentStore = (storage: DemoStorage) => {
  const db = makeDemoDatabase(loadDemoState(storage) ?? undefined)
  const store = makeStore(makeDemoExtra({ db, latencyMs: 0 }), { persist: () => saveDemoState(storage, db.state) })
  return { store, db }
}

const machineIdsOf = (storage: DemoStorage) => loadDemoState(storage)?.app.machines.map((machine) => machine.id)

describe('demo store', () => {
  it('saves the demo data after each change, so a reload keeps it', async () => {
    const storage = makeMemoryStorage()
    const before = makePersistentStore(storage)

    await before.store.dispatch(deleteMachineThunk('machine-15'))
    const after = makePersistentStore(storage)

    expect(machineIdsOf(storage)).not.toContain('machine-15')
    expect(after.db.state.app.machines.some((machine) => machine.id === 'machine-15')).toBe(false)
  })

  it('puts the demo back to its initial data, saved included', async () => {
    const storage = makeMemoryStorage()
    const { store, db } = makePersistentStore(storage)
    await store.dispatch(deleteMachineThunk('machine-15'))

    await store.dispatch(resetDemoThunk())

    expect(db.state.app.machines.some((machine) => machine.id === 'machine-15')).toBe(true)
    expect(machineIdsOf(storage)).toContain('machine-15')
  })
})
