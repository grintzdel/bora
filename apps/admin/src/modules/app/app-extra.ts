import { makeAuthDemoGateway } from '../auth/core/gateway/auth.gateway.demo'
import { makeDemoControlGateway } from '../demo/core/gateway/demo-control.gateway.demo'
import { makeGymDemoGateway } from '../gym/core/gateway/gym.gateway.demo'
import { makeInvitationDemoGateway } from '../invitation/core/gateway/invitation.gateway.demo'
import { makeMachineDemoGateway } from '../machine/core/gateway/machine.gateway.demo'
import { makeMemberDemoGateway } from '../member/core/gateway/member.gateway.demo'
import { makeSafetyDemoGateway } from '../safety/core/gateway/safety.gateway.demo'
import { type DemoDatabase, makeDemoDatabase } from '../shared/core/demo/demo-database'

type DemoExtraOptions = {
  readonly db?: DemoDatabase
  readonly latencyMs?: number
  readonly now?: () => Date
}

export const makeDemoExtra = ({
  db = makeDemoDatabase(),
  latencyMs = 300,
  now = () => new Date(),
}: DemoExtraOptions = {}) => {
  const options = { latencyMs, now }
  return {
    gateways: {
      auth: makeAuthDemoGateway(db, options),
      gym: makeGymDemoGateway(db, options),
      member: makeMemberDemoGateway(db, options),
      machine: makeMachineDemoGateway(db, options),
      safety: makeSafetyDemoGateway(db, options),
      invitation: makeInvitationDemoGateway(db, options),
      demo: makeDemoControlGateway(db),
    },
  }
}

export type AppExtra = ReturnType<typeof makeDemoExtra>
