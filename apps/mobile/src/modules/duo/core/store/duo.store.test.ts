import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { fetchSessionsThunk } from '../../../session/core/store/session.thunks'
import { selectCurrentProposal } from './duo.selectors'
import { nextProposalShown } from './duo.slice'
import { fetchDuoProposalsThunk, proposeDuoThunk } from './duo.thunks'

describe('duo store', () => {
  it('cycles through the proposals', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchDuoProposalsThunk('regular'))

    store.dispatch(nextProposalShown())
    expect(selectCurrentProposal(store.getState())?.partner.firstName).toBe('Inès')

    store.dispatch(nextProposalShown())
    expect(selectCurrentProposal(store.getState())?.partner.firstName).toBe('Léa')
  })

  it('refreshes the sessions with the new partner once the duo is accepted', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchSessionsThunk())

    await store.dispatch(proposeDuoThunk('proposal-ines'))

    await expect.poll(() => store.getState().session.sessions.data?.[0]?.partner?.id).toBe('ines')
  })
})
