import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { selectDuoSuggestion, selectMemberList, selectSentProposal } from './member.selectors'
import { fetchDuoSuggestionThunk, fetchMembersThunk, proposeDuoThunk } from './member.thunks'

describe('member store', () => {
  it('loads the members for the requested filter', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchMembersThunk({ search: '', filter: 'waiting' }))

    expect(selectMemberList(store.getState()).data?.members).toHaveLength(5)
  })

  it('keeps the suggestion of the member it was asked for', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchDuoSuggestionThunk('nora'))

    expect(selectDuoSuggestion(store.getState())).toMatchObject({
      memberId: 'nora',
      data: { partner: { id: 'clara' } },
    })
  })

  it('refreshes the list with the same filter once a proposal is sent', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchMembersThunk({ search: '', filter: 'all' }))
    await store.dispatch(fetchDuoSuggestionThunk('nora'))
    const suggestion = selectDuoSuggestion(store.getState()).data
    if (!suggestion) throw new Error('missing suggestion')

    await store.dispatch(proposeDuoThunk(suggestion))

    expect(selectSentProposal(store.getState()).data?.partner.displayName).toBe('Clara P.')
    await expect
      .poll(() => selectMemberList(store.getState()).data?.members.find((member) => member.id === 'nora')?.status)
      .toBe('duo-proposed')
  })
})
