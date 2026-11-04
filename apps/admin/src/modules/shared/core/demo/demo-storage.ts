import type { DemoState } from './demo-database'

export type DemoStorage = Pick<Storage, 'getItem' | 'setItem'>

const STORAGE_KEY = 'bora-admin-demo'
const DEMO_STATE_VERSION = 1

type SavedDemo = { readonly version: number; readonly state: DemoState }

const isSavedDemo = (value: unknown): value is SavedDemo =>
  typeof value === 'object' && value !== null && 'version' in value && 'state' in value

export const browserDemoStorage = (): DemoStorage | null => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export const loadDemoState = (storage: DemoStorage | null): DemoState | null => {
  try {
    const raw = storage?.getItem(STORAGE_KEY)
    if (!raw) return null
    const saved: unknown = JSON.parse(raw)
    return isSavedDemo(saved) && saved.version === DEMO_STATE_VERSION ? saved.state : null
  } catch {
    return null
  }
}

export const saveDemoState = (storage: DemoStorage | null, state: DemoState) => {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify({ version: DEMO_STATE_VERSION, state } satisfies SavedDemo))
  } catch {
    return
  }
}
