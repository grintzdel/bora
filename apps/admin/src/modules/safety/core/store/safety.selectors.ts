import type { RootState } from '../../../app/store'

export const selectReports = (state: RootState) => state.safety.reports

export const selectSafetyAction = (state: RootState) => state.safety.lastAction
