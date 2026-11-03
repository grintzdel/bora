import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { selectReports } from './safety.selectors'
import { fetchReportsThunk, resolveReportThunk, suspendMemberThunk } from './safety.thunks'

describe('safety store', () => {
  it('loads the reports', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchReportsThunk())

    expect(selectReports(store.getState()).data).toHaveLength(2)
  })

  it('refreshes the list once a report is handled', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchReportsThunk())

    await store.dispatch(resolveReportThunk('report-hugo'))

    await expect.poll(() => selectReports(store.getState()).data?.[0]?.status).toBe('handled')
    expect(store.getState().safety.lastAction.data).toEqual({ kind: 'resolved', reportId: 'report-hugo' })
  })

  it('refreshes the list once a member is suspended', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchReportsThunk())

    await store.dispatch(suspendMemberThunk('karim'))

    await expect.poll(() => selectReports(store.getState()).data?.[0]?.reported.suspended).toBe(true)
    expect(store.getState().safety.lastAction.data).toMatchObject({ kind: 'suspended', displayName: 'Karim B.' })
  })
})
