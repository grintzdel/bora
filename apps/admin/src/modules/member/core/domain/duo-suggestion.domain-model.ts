import type { Availability } from '../../../shared/core/domain/constants/availability.constant'
import type { Gender } from '../../../shared/core/domain/constants/gender.constant'
import type { Level } from '../../../shared/core/domain/constants/level.constant'

export type DuoCandidate = {
  readonly id: string
  readonly gender: Gender
  readonly level: Level
  readonly availability: ReadonlyArray<Availability>
  readonly sameGenderDuo: boolean
  readonly waitingDays: number
}

export const sharedAvailability = (member: DuoCandidate, partner: DuoCandidate) =>
  member.availability.filter((slot) => partner.availability.includes(slot))

const accepts = (member: DuoCandidate, partner: DuoCandidate) =>
  !member.sameGenderDuo || member.gender === partner.gender

const isCompatible = (member: DuoCandidate, partner: DuoCandidate) =>
  partner.id !== member.id &&
  sharedAvailability(member, partner).length > 0 &&
  accepts(member, partner) &&
  accepts(partner, member)

const sameLevel = (member: DuoCandidate, partner: DuoCandidate) => (member.level === partner.level ? 1 : 0)

export const suggestPartner = (member: DuoCandidate, candidates: ReadonlyArray<DuoCandidate>) =>
  candidates
    .filter((partner) => isCompatible(member, partner))
    .toSorted(
      (first, second) => sameLevel(member, second) - sameLevel(member, first) || second.waitingDays - first.waitingDays
    )[0] ?? null
