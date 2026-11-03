import type { Level } from '../../../shared/core/domain/constants/level.constant'
import { countInWords } from '../../../shared/ui/format/count-in-words'
import { formatRest, formatSeconds } from '../../../shared/ui/format/format-duration'
import type { Feedback } from '../../core/domain/constants/feedback.constant'
import type { SessionStatus } from '../../core/domain/constants/session-status.constant'
import type { Effort } from '../../core/domain/session.domain-model'

const LevelLine: Record<Level, string> = {
  beginner: 'niveau débutant',
  returning: 'reprise',
  regular: 'niveau régulier',
}

export const SessionStatusLabel: Record<SessionStatus, string> = {
  confirmed: 'Duo confirmé',
  pending: 'En attente de ton duo',
  done: 'Séance validée',
  cancelled: 'Séance annulée',
}

export const FeedbackLabel: Record<Feedback, string> = {
  'too-easy': 'Trop facile',
  'just-right': 'Juste bien',
  hard: 'Difficile',
}

export const formatEffort = ({ effort, restSeconds }: { readonly effort: Effort; readonly restSeconds: number }) => {
  const work = effort.kind === 'reps' ? `${effort.reps} répétitions` : formatSeconds(effort.seconds)
  return `${work} · ${formatRest(restSeconds)}`
}

export const formatProgramLine = (program: {
  readonly name: string
  readonly level: Level
  readonly durationMinutes: number
}) => `${program.name} · ${LevelLine[program.level]} · ${program.durationMinutes} min`

export const formatStreak = (weeks: number) =>
  `${countInWords(weeks)} semaine${weeks > 1 ? 's' : ''} sans en rater une.`
