import { type DemoSeed, demoSeed } from '@bora/demo-data'

export type DemoDatabase = {
  state: DemoSeed
  readonly reset: () => void
}

const clone = (seed: DemoSeed) => JSON.parse(JSON.stringify(seed)) as DemoSeed

export const makeDemoDatabase = (): DemoDatabase => {
  const db: DemoDatabase = {
    state: clone(demoSeed),
    reset: () => {
      db.state = clone(demoSeed)
    },
  }
  return db
}

export const findPerson = (db: DemoDatabase, personId: string | null) =>
  db.state.people.find((person) => person.id === personId)

export const findCurrentMember = (db: DemoDatabase) => findPerson(db, db.state.memberId)
