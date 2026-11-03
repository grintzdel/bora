import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { selectDashboard } from './gym.selectors'
import { fetchDashboardThunk } from './gym.thunks'

describe('gym store', () => {
  it('loads the dashboard', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchDashboardThunk())

    const dashboard = selectDashboard(store.getState())
    expect(dashboard.isLoading).toBe(false)
    expect(dashboard.data?.retention.extraMembersKept).toBe(7)
  })
})
