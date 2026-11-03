import { describe, expect, it } from 'vitest'

import { makeTestStore } from '../../../app/__tests__/make-test-store'
import { selectMachinesOverview, selectQrSheet, selectQrSheetSelection } from './machine.selectors'
import { qrSheetSelected } from './machine.slice'
import { fetchMachinesThunk, fetchQrSheetThunk, saveMachineThunk } from './machine.thunks'

describe('machine store', () => {
  it('loads the machines overview', async () => {
    const { store } = makeTestStore()

    await store.dispatch(fetchMachinesThunk())

    expect(selectMachinesOverview(store.getState()).data?.zones).toHaveLength(2)
  })

  it('refreshes the overview once a machine is saved', async () => {
    const { store } = makeTestStore()
    await store.dispatch(fetchMachinesThunk())

    await store.dispatch(
      saveMachineThunk({
        id: 'machine-15',
        name: 'Poulie vis-à-vis',
        number: '15',
        zone: 'zone guidée',
        steps: ['Règle les poulies à hauteur d’épaule.'],
        qrInstalled: true,
      })
    )

    await expect
      .poll(
        () =>
          selectMachinesOverview(store.getState())
            .data?.zones.flatMap((zone) => zone.machines)
            .find((machine) => machine.id === 'machine-15')?.status
      )
      .toBe('ready')
  })

  it('keeps the rejected save error for the form', async () => {
    const { store } = makeTestStore()

    await store.dispatch(
      saveMachineThunk({
        id: null,
        name: 'Butterfly',
        number: '07',
        zone: 'zone guidée',
        steps: [],
        qrInstalled: false,
      })
    )

    expect(store.getState().machine.save.error?._tag).toBe('MachineNumberTakenError')
  })

  it('prints only the selected machines', async () => {
    const { store } = makeTestStore()

    store.dispatch(qrSheetSelected(['machine-12']))
    await store.dispatch(fetchQrSheetThunk(selectQrSheetSelection(store.getState())))

    expect(selectQrSheet(store.getState()).data?.cards.map((card) => card.id)).toEqual(['machine-12'])
  })
})
