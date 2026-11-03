import { createEffectThunk } from '../../../app/create-effect-thunk'
import type { ProposalKind } from '../domain/constants/proposal-kind.constant'

export const fetchDuoProposalsThunk = createEffectThunk('duo/fetchProposals', (kind: ProposalKind, { gateways }) =>
  gateways.duo.listProposals(kind)
)

export const proposeDuoThunk = createEffectThunk('duo/propose', (proposalId: string, { gateways }) =>
  gateways.duo.propose(proposalId)
)

export const fetchCurrentDuoThunk = createEffectThunk('duo/fetchCurrent', (_: void, { gateways }) =>
  gateways.duo.getCurrent()
)
