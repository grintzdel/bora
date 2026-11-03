import type { RootState } from '../../../app/store'

export const selectMemberList = (state: RootState) => state.member.list

export const selectDuoSuggestion = (state: RootState) => state.member.suggestion

export const selectSentProposal = (state: RootState) => state.member.sent
