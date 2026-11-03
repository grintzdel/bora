import * as Effect from 'effect/Effect'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import type { DemoControlGateway } from './demo-control.gateway'

export const makeDemoControlGateway = (db: DemoDatabase): DemoControlGateway => ({
  reset: () => Effect.sync(() => db.reset()),
  simulatePartnerAbsence: () =>
    Effect.sync(() => {
      const tonight = db.state.sessions.find((session) => session.status === 'confirmed' && session.partnerId !== null)
      if (tonight) tonight.partnerAbsent = true
    }),
})
