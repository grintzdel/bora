import { createEffectThunk } from '../../../app/create-effect-thunk'
import type { SubmitReport } from '../domain/safety.domain-model'

export const submitReportThunk = createEffectThunk('safety/submitReport', (report: SubmitReport, { gateways }) =>
  gateways.safety.submitReport(report)
)
