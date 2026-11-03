import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { DemoAccountSchema, ManagerSessionSchema } from '../domain/auth.domain-model'
import type { AuthGateway } from './auth.gateway'

export const makeAuthDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): AuthGateway => {
  const readSession = () =>
    simulateNetwork(latencyMs).pipe(
      Effect.andThen(() =>
        Schema.decodeUnknown(ManagerSessionSchema)({
          managerName: db.state.space.manager.displayName,
          gymName: db.state.app.gym.name,
          reportsToHandle: db.state.space.reports.filter((report) => report.status === 'to-handle').length,
        })
      )
    )

  return {
    getDemoAccount: () =>
      Schema.decodeUnknown(DemoAccountSchema)({
        gymName: db.state.app.gym.name,
        managerName: db.state.space.manager.displayName,
      }),
    signIn: readSession,
    getSession: readSession,
  }
}
