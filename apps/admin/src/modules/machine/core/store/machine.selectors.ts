import type { RootState } from '../../../app/store'

export const selectMachinesOverview = (state: RootState) => state.machine.overview

export const selectMachineSave = (state: RootState) => state.machine.save

export const selectMachineDelete = (state: RootState) => state.machine.remove

export const selectQrSheet = (state: RootState) => state.machine.qrSheet

export const selectQrSheetSelection = (state: RootState) => state.machine.qrSheetSelection
