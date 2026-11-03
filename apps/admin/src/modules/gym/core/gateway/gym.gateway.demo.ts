import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { listMemberRecords } from '../../../shared/core/demo/gym-space-records'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { computeDashboard } from '../domain/dashboard-indicators.domain-model'
import { DashboardSchema } from '../domain/dashboard.domain-model'
import type { GymGateway } from './gym.gateway'

export const makeGymDemoGateway = (db: DemoDatabase, { latencyMs, now }: DemoGatewayOptions): GymGateway => ({
  getDashboard: () =>
    simulateNetwork(latencyMs).pipe(
      Effect.andThen(() =>
        Schema.decodeUnknown(DashboardSchema)(
          computeDashboard({ records: listMemberRecords(db.state), state: db.state, now: now() })
        )
      )
    ),
})
