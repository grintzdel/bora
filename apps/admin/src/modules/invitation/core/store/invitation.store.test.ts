import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { selectWelcomeKit } from './invitation.selectors'
import { fetchWelcomeKitThunk } from './invitation.thunks'

describe('invitation store', () => {
  it('loads the welcome kit', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchWelcomeKitThunk())

    expect(selectWelcomeKit(store.getState()).data?.inviteUrl).toBe('https://bora.app/salle/club-pilote')
  })
})
