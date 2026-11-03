import type { Level } from '../../../shared/core/domain/constants/level.constant'
import type { Availability } from '../../core/domain/constants/availability.constant'
import type { Goal } from '../../core/domain/constants/goal.constant'

export const LevelChoiceLabel: Record<Level, string> = {
  beginner: 'Débutant',
  returning: 'Je reprends',
  regular: 'Régulier',
}

export const GoalChoiceLabel: Record<Goal, string> = {
  'feel-fit': 'Me sentir en forme',
  'build-habit': 'Prendre une habitude',
  'gain-strength': 'Gagner en force',
}

export const AvailabilityChoiceLabel: Record<Availability, string> = {
  lunch: 'Midi',
  'after-work': 'Après le travail',
  weekend: 'Week-end',
}
