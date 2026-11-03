import { type DemoSeed, demoSeed, type SeedPerson } from '@bora/demo-data'
import { type GymSpaceSeed, gymSpaceSeed } from '@bora/demo-data/gym-space'

export type DemoState = {
  readonly app: DemoSeed
  readonly space: GymSpaceSeed
}

export type DemoDatabase = {
  state: DemoState
  readonly reset: () => void
}

const initialState = (): DemoState => structuredClone({ app: demoSeed, space: gymSpaceSeed })

export const makeDemoDatabase = (): DemoDatabase => {
  const db: DemoDatabase = {
    state: initialState(),
    reset: () => {
      db.state = initialState()
    },
  }
  return db
}

export const listPeople = (state: DemoState): ReadonlyArray<SeedPerson> => [
  ...state.app.people,
  ...state.space.newcomers,
]

export const findPerson = (state: DemoState, personId: string) =>
  listPeople(state).find((person) => person.id === personId)
