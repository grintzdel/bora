import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import { type DemoDatabase, findCurrentMember } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { MemberSchema, ProfileSchema } from '../domain/member.domain-model'
import type { MemberGateway } from './member.gateway'

export const makeMemberDemoGateway = (db: DemoDatabase, { latencyMs }: DemoGatewayOptions): MemberGateway => {
  const read = () => Schema.decodeUnknown(MemberSchema)(findCurrentMember(db))

  return {
    getCurrent: () => simulateNetwork(latencyMs).pipe(Effect.andThen(read)),
    updateProfile: (input) =>
      Schema.decodeUnknown(ProfileSchema)(input).pipe(
        Effect.tap(() => simulateNetwork(latencyMs)),
        Effect.tap((profile) =>
          Effect.sync(() => {
            const member = findCurrentMember(db)
            if (member) member.profile = { ...profile, availability: [...profile.availability] }
          })
        ),
        Effect.andThen(read)
      ),
  }
}
