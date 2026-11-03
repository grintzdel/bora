import type { RootState } from '../../../app/store'

export const selectProposals = (state: RootState) => state.duo.proposals

export const selectCurrentProposal = (state: RootState) => state.duo.proposals.data?.[state.duo.proposalIndex] ?? null

export const selectProposalRequest = (state: RootState) => state.duo.proposal

export const selectCurrentDuo = (state: RootState) => state.duo.current.data
