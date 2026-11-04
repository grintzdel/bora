import { describe, expect, it } from 'vitest'

import { makeDemoDatabase } from './demo-database'
import { type DemoStorage, loadDemoState, saveDemoState } from './demo-storage'

const makeMemoryStorage = (initial: Record<string, string> = {}): DemoStorage & { items: Record<string, string> } => {
  const items = { ...initial }
  return {
    items,
    getItem: (key) => items[key] ?? null,
    setItem: (key, value) => {
      items[key] = value
    },
  }
}

const brokenStorage: DemoStorage = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('blocked')
  },
}

describe('demo storage', () => {
  it('gives back the state it saved', () => {
    const storage = makeMemoryStorage()
    const db = makeDemoDatabase()
    db.state.app.machines.pop()

    saveDemoState(storage, db.state)

    expect(loadDemoState(storage)).toEqual(db.state)
  })

  it('starts from the seed when nothing was saved', () => {
    expect(loadDemoState(makeMemoryStorage())).toBeNull()
  })

  it('ignores a save from another version of the demo', () => {
    const storage = makeMemoryStorage()
    saveDemoState(storage, makeDemoDatabase().state)
    const [key = ''] = Object.keys(storage.items)
    storage.items[key] = JSON.stringify({ version: -1, state: makeDemoDatabase().state })

    expect(loadDemoState(storage)).toBeNull()
  })

  it('ignores an unreadable save', () => {
    const storage = makeMemoryStorage()
    saveDemoState(storage, makeDemoDatabase().state)
    const [key = ''] = Object.keys(storage.items)
    storage.items[key] = '{oops'

    expect(loadDemoState(storage)).toBeNull()
  })

  it('keeps working when the browser blocks the storage', () => {
    expect(() => saveDemoState(brokenStorage, makeDemoDatabase().state)).not.toThrow()
    expect(loadDemoState(brokenStorage)).toBeNull()
  })

  it('keeps working without any storage', () => {
    expect(() => saveDemoState(null, makeDemoDatabase().state)).not.toThrow()
    expect(loadDemoState(null)).toBeNull()
  })

  it('starts a database from a saved state', () => {
    const saved = makeDemoDatabase().state
    saved.app.gym.name = 'Salle sauvegardée'

    const db = makeDemoDatabase(saved)
    db.reset()

    expect(db.state.app.gym.name).not.toBe('Salle sauvegardée')
  })
})
