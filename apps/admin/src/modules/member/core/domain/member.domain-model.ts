import * as Schema from 'effect/Schema'

import { literalOf } from '../../../shared/core/domain/literal-of'
import {
  AvailabilitySchema,
  GenderSchema,
  LevelSchema,
  MemberStatusSchema,
} from '../../../shared/core/domain/shared.domain-model'
import { MemberFilter } from './constants/member-filter.constant'

export const ListMembersQuerySchema = Schema.Struct({
  search: Schema.String,
  filter: literalOf(MemberFilter),
})

export type ListMembersQuery = Schema.Schema.Type<typeof ListMembersQuerySchema>

export const MemberRowSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  displayName: Schema.NonEmptyString,
  gender: GenderSchema,
  level: LevelSchema,
  availability: Schema.Array(AvailabilitySchema),
  status: MemberStatusSchema,
  waitingDays: Schema.NullOr(Schema.NonNegativeInt),
  partnerName: Schema.NullOr(Schema.NonEmptyString),
  proposedPartnerName: Schema.NullOr(Schema.NonEmptyString),
  sessionsDone: Schema.NonNegativeInt,
})

export type MemberRow = Schema.Schema.Type<typeof MemberRowSchema>

export const MemberListSchema = Schema.Struct({
  month: Schema.Int.pipe(Schema.between(1, 12)),
  members: Schema.Array(MemberRowSchema),
  counts: Schema.Struct({
    all: Schema.NonNegativeInt,
    waiting: Schema.NonNegativeInt,
    fragile: Schema.NonNegativeInt,
  }),
})

export type MemberList = Schema.Schema.Type<typeof MemberListSchema>

export const DuoPartySchema = Schema.Struct({
  id: Schema.NonEmptyString,
  displayName: Schema.NonEmptyString,
  gender: GenderSchema,
  level: LevelSchema,
  availability: Schema.Array(AvailabilitySchema),
})

export type DuoParty = Schema.Schema.Type<typeof DuoPartySchema>

export const DuoSuggestionSchema = Schema.Struct({
  member: DuoPartySchema,
  partner: DuoPartySchema,
  sharedAvailability: Schema.Array(AvailabilitySchema),
  sameLevel: Schema.Boolean,
})

export type DuoSuggestion = Schema.Schema.Type<typeof DuoSuggestionSchema>

export const ProposeDuoSchema = Schema.Struct({
  memberId: Schema.NonEmptyString,
  partnerId: Schema.NonEmptyString,
})

export type ProposeDuo = Schema.Schema.Type<typeof ProposeDuoSchema>
