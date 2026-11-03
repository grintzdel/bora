import type { RootState } from '../../../app/store'

export const selectReport = (state: RootState) => state.safety.report
