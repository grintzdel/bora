import type { RootState } from '../../../app/store'

export const selectCurrentMember = (state: RootState) => state.member.current.data

export const selectProfileSave = (state: RootState) => state.member.save
