import type { Availability } from '../../core/domain/constants/availability.constant'
import type { Gender } from '../../core/domain/constants/gender.constant'
import type { Level } from '../../core/domain/constants/level.constant'

const LevelLabel: Record<Level, Record<Gender, string>> = {
  beginner: { female: 'Débutante', male: 'Débutant' },
  returning: { female: 'Je reprends', male: 'Je reprends' },
  regular: { female: 'Régulière', male: 'Régulier' },
}

export const formatLevel = (level: Level, gender: Gender) => LevelLabel[level][gender]

export const AvailabilityLabel: Record<Availability, string> = {
  lunch: 'Midi',
  'after-work': 'Après le travail',
  weekend: 'Week-end',
}

export const formatAvailability = (availability: ReadonlyArray<Availability>) =>
  availability.map((slot) => AvailabilityLabel[slot]).join(', ')
