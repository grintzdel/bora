import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { selectFollowingSession, selectNextSession, selectWorkoutView } from './session.selectors'
import { workoutSetCompleted, workoutStarted } from './session.slice'
import { completeSessionThunk, fetchSessionsThunk, fetchStatsThunk } from './session.thunks'

describe('session store', () => {
  it('exposes the next and following sessions', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchSessionsThunk())

    expect(selectNextSession(store.getState())?.id).toBe('session-tuesday')
    expect(selectFollowingSession(store.getState())?.id).toBe('session-thursday')
  })

  it('walks through the program set by set', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchSessionsThunk())

    store.dispatch(workoutStarted('session-tuesday'))
    store.dispatch(workoutSetCompleted())

    expect(selectWorkoutView(store.getState(), 'session-tuesday')).toMatchObject({
      exerciseNumber: 2,
      exerciseCount: 5,
      setNumber: 1,
      setCount: 3,
      exercise: { name: 'Tirage vertical' },
      isLastStep: false,
    })
  })

  it('refreshes sessions and stats once a session is completed', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchSessionsThunk())
    await store.dispatch(fetchStatsThunk())

    await store.dispatch(completeSessionThunk('session-tuesday'))

    await expect.poll(() => store.getState().session.stats.data?.duoSessionsDone).toBe(4)
    expect(selectNextSession(store.getState())?.id).toBe('session-thursday')
  })
})
