import type { Availability } from '../../../member/core/domain/constants/availability.constant'
import type { Goal } from '../../../member/core/domain/constants/goal.constant'
import type { Gender } from '../../../shared/core/domain/constants/gender.constant'
import type { Level } from '../../../shared/core/domain/constants/level.constant'
import { genderize } from '../../../shared/ui/format/genderize'
import type { CommonGroundItem } from '../../core/domain/common-ground.domain-model'

const LevelTag: Record<Level, { readonly female: string; readonly male: string }> = {
  beginner: { female: 'Débutante', male: 'Débutant' },
  returning: { female: 'Reprend le sport', male: 'Reprend le sport' },
  regular: { female: 'Régulière', male: 'Régulier' },
}

const LevelInCommon: Record<Level, string> = {
  beginner: 'Niveau débutant',
  returning: 'Reprise du sport',
  regular: 'Niveau régulier',
}

const AvailabilityInCommon: Record<Availability, string> = {
  lunch: 'Le midi',
  'after-work': 'Après le travail, en semaine',
  weekend: 'Le week-end',
}

const GoalInCommon: Record<Goal, string> = {
  'feel-fit': 'Se sentir en forme',
  'build-habit': 'Prendre une habitude',
  'gain-strength': 'Gagner en force',
}

export const formatPartnerTag = (partner: {
  readonly gender: Gender
  readonly level: Level
  readonly joinedDaysAgo: number
}) => {
  const joined = genderize(partner.gender, { female: 'inscrite', male: 'inscrit' })
  const days = partner.joinedDaysAgo === 1 ? '1 jour' : `${partner.joinedDaysAgo} jours`
  return `${genderize(partner.gender, LevelTag[partner.level])} · ${joined} il y a ${days}`
}

export const formatCommonGround = (item: CommonGroundItem) => {
  switch (item.kind) {
    case 'gym':
      return item.gymName
    case 'level':
      return LevelInCommon[item.level]
    case 'availability':
      return AvailabilityInCommon[item.availability]
    case 'goal':
      return GoalInCommon[item.goal]
  }
}
