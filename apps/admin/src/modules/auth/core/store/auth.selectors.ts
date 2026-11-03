import type { RootState } from '../../../app/store'

export const selectDemoAccount = (state: RootState) => state.auth.demoAccount.data

export const selectSession = (state: RootState) => state.auth.session
