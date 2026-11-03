import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { completeSessionThunk, fetchSessionsThunk } from '../../../session/core/store/session.thunks'
import { resetDemoThunk, simulatePartnerAbsenceThunk } from './demo.thunks'

describe('demo store', () => {
  it('marks tonight partner as absent', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchSessionsThunk())

    await store.dispatch(simulatePartnerAbsenceThunk())

    await expect.poll(() => store.getState().session.sessions.data?.[0]?.partnerAbsent).toBe(true)
  })

  it('puts the demo back to its initial state', async () => {
    const { store, db } = makeTestStore()
    await store.dispatch(fetchSessionsThunk())
    await store.dispatch(completeSessionThunk('session-tuesday'))

    await store.dispatch(resetDemoThunk())

    expect(db.state.sessions[0]?.status).toBe('confirmed')
    expect(store.getState().session.sessions.data).toBeNull()
  })
})
