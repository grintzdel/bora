import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { ReportSchema, SubmitReportSchema } from '../domain/safety.domain-model'
import type { SafetyGateway } from './safety.gateway'

export const makeSafetyDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): SafetyGateway => ({
  submitReport: (input) =>
    Schema.decodeUnknown(SubmitReportSchema)(input).pipe(
      Effect.tap(() => simulateNetwork(latencyMs)),
      Effect.andThen((report) => {
        const stored = { id: `report-${db.state.reports.length + 1}`, ...report }
        db.state.reports.push(stored)
        return Schema.decodeUnknown(ReportSchema)(stored)
      })
    ),
})
