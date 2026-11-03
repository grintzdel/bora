import { createEffectThunk } from '../../../app/create-effect-thunk'
import type { Feedback } from '../domain/constants/feedback.constant'
import type { PartnerAbsenceChoice } from '../domain/constants/partner-absence-choice.constant'

export const fetchSessionsThunk = createEffectThunk('session/fetchAll', (_: void, { gateways }) =>
  gateways.session.list()
)

export const fetchProgramsThunk = createEffectThunk('session/fetchPrograms', (_: void, { gateways }) =>
  gateways.session.listPrograms()
)

export const fetchStatsThunk = createEffectThunk('session/fetchStats', (_: void, { gateways }) =>
  gateways.session.getStats()
)

export const completeSessionThunk = createEffectThunk('session/complete', (sessionId: string, { gateways }) =>
  gateways.session.complete(sessionId)
)

export const rateSessionThunk = createEffectThunk(
  'session/rate',
  ({ sessionId, feedback }: { readonly sessionId: string; readonly feedback: Feedback }, { gateways }) =>
    gateways.session.rate(sessionId, feedback)
)

export const confirmSessionThunk = createEffectThunk('session/confirm', (sessionId: string, { gateways }) =>
  gateways.session.confirm(sessionId)
)

export const resolvePartnerAbsenceThunk = createEffectThunk(
  'session/resolvePartnerAbsence',
  (
    { sessionId, choice }: { readonly sessionId: string; readonly choice: Exclude<PartnerAbsenceChoice, 'new-duo'> },
    { gateways }
  ) => gateways.session.resolvePartnerAbsence(sessionId, choice)
)
