import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import type { DemoDatabase } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { WelcomeKitSchema } from '../domain/invitation.domain-model'
import type { InvitationGateway } from './invitation.gateway'

export const makeInvitationDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): InvitationGateway => ({
  getKit: () =>
    simulateNetwork(latencyMs).pipe(
      Effect.andThen(() =>
        Schema.decodeUnknown(WelcomeKitSchema)({
          gymName: db.state.app.gym.name,
          inviteUrl: db.state.space.inviteUrl,
          openedThisMonth: db.state.space.invitations.openedThisMonth,
          activatedThisMonth: db.state.space.members.filter((member) => member.activated).length,
          newMembersThisMonth: db.state.app.gym.newMembersThisMonth,
        })
      )
    ),
})
