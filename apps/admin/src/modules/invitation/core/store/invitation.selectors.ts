import type { RootState } from '../../../app/store'

export const selectWelcomeKit = (state: RootState) => state.invitation.kit
