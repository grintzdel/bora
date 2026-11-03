import { createEffectThunk } from '../../../app/create-effect-thunk'

export const fetchReportsThunk = createEffectThunk('safety/fetchReports', (_: void, { gateways }) =>
  gateways.safety.list()
)

export const resolveReportThunk = createEffectThunk('safety/resolveReport', (reportId: string, { gateways }) =>
  gateways.safety.resolve(reportId)
)

export const suspendMemberThunk = createEffectThunk('safety/suspendMember', (memberId: string, { gateways }) =>
  gateways.safety.suspendMember(memberId)
)
