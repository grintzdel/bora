import type { Availability } from '../../../member/core/domain/constants/availability.constant'
import type { Goal } from '../../../member/core/domain/constants/goal.constant'
import type { Profile } from '../../../member/core/domain/member.domain-model'
import type { Level } from '../../../shared/core/domain/constants/level.constant'

export type CommonGroundItem =
  | { readonly kind: 'gym'; readonly gymName: string }
  | { readonly kind: 'level'; readonly level: Level }
  | { readonly kind: 'availability'; readonly availability: Availability }
  | { readonly kind: 'goal'; readonly goal: Goal }

export const findCommonGround = (gymName: string, member: Profile, partner: Profile): CommonGroundItem[] => [
  { kind: 'gym', gymName },
  ...(member.level === partner.level ? [{ kind: 'level', level: member.level } as const] : []),
  ...member.availability
    .filter((availability) => partner.availability.includes(availability))
    .map((availability) => ({ kind: 'availability', availability }) as const),
  ...(member.goal === partner.goal ? [{ kind: 'goal', goal: member.goal } as const] : []),
]
