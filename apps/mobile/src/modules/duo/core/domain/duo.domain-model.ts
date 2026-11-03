import * as Schema from 'effect/Schema'

import { AvailabilitySchema, GoalSchema } from '../../../member/core/domain/member.domain-model'
import { literalOf } from '../../../shared/core/domain/literal-of'
import { GenderSchema, LevelSchema, SlotSchema } from '../../../shared/core/domain/shared.domain-model'
import { ProposalKind } from './constants/proposal-kind.constant'

export const PartnerSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  firstName: Schema.NonEmptyString,
  displayName: Schema.NonEmptyString,
  gender: GenderSchema,
  level: LevelSchema,
  joinedDaysAgo: Schema.NonNegativeInt,
})

export type Partner = Schema.Schema.Type<typeof PartnerSchema>

export const CommonGroundItemSchema = Schema.Union(
  Schema.Struct({ kind: Schema.Literal('gym'), gymName: Schema.NonEmptyString }),
  Schema.Struct({ kind: Schema.Literal('level'), level: LevelSchema }),
  Schema.Struct({ kind: Schema.Literal('availability'), availability: AvailabilitySchema }),
  Schema.Struct({ kind: Schema.Literal('goal'), goal: GoalSchema })
)

export const DuoProposalSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: literalOf(ProposalKind),
  partner: PartnerSchema,
  commonGround: Schema.Array(CommonGroundItemSchema),
  firstSession: Schema.Struct({ slot: SlotSchema, programName: Schema.NonEmptyString }),
})

export type DuoProposal = Schema.Schema.Type<typeof DuoProposalSchema>

export const CurrentDuoSchema = Schema.Struct({
  partner: PartnerSchema,
  commonGround: Schema.Array(CommonGroundItemSchema),
})

export type CurrentDuo = Schema.Schema.Type<typeof CurrentDuoSchema>
