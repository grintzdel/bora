import { makeDemoControlGateway } from '../demo/core/gateway/demo-control.gateway.demo'
import { makeDuoDemoGateway } from '../duo/core/gateway/duo.gateway.demo'
import { makeGymDemoGateway } from '../gym/core/gateway/gym.gateway.demo'
import { makeMemberDemoGateway } from '../member/core/gateway/member.gateway.demo'
import { makeSafetyDemoGateway } from '../safety/core/gateway/safety.gateway.demo'
import { makeSessionDemoGateway } from '../session/core/gateway/session.gateway.demo'
import { type DemoDatabase, makeDemoDatabase } from '../shared/core/demo/demo-database'

type DemoExtraOptions = {
  readonly db?: DemoDatabase
  readonly latencyMs?: number
  readonly acceptanceDelayMs?: number
}

export const makeDemoExtra = ({
  db = makeDemoDatabase(),
  latencyMs = 300,
  acceptanceDelayMs = 2000,
}: DemoExtraOptions = {}) => ({
  gateways: {
    member: makeMemberDemoGateway(db, { latencyMs }),
    gym: makeGymDemoGateway(db, { latencyMs }),
    duo: makeDuoDemoGateway(db, { latencyMs, acceptanceDelayMs }),
    session: makeSessionDemoGateway(db, { latencyMs }),
    safety: makeSafetyDemoGateway(db, { latencyMs }),
    demo: makeDemoControlGateway(db),
  },
})

export type AppExtra = ReturnType<typeof makeDemoExtra>
