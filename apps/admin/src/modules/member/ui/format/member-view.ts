import type { Availability } from '../../../shared/core/domain/constants/availability.constant'
import type { Gender } from '../../../shared/core/domain/constants/gender.constant'
import type { MemberStatus } from '../../../shared/core/domain/constants/member-status.constant'
import type { TagTone } from '../../../shared/ui/components/Tag'
import { formatAvailability, formatLevel } from '../../../shared/ui/format/profile-labels'
import type { DuoParty, DuoSuggestion, MemberRow } from '../../core/domain/member.domain-model'

export type MemberRowView = {
  readonly id: string
  readonly displayName: string
  readonly level: string
  readonly availability: string
  readonly duo: { readonly label: string; readonly muted: boolean }
  readonly sessions: number
  readonly status: { readonly label: string; readonly tone: TagTone }
  readonly selectable: boolean
}

const MonthLabel = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const

export const formatMonth = (month: number) => MonthLabel[month - 1] ?? ''

const agree = (gender: Gender, masculine: string, feminine: string) => (gender === 'female' ? feminine : masculine)

const statusView = (row: MemberRow): MemberRowView['status'] => {
  const Status: Record<MemberStatus, MemberRowView['status']> = {
    'in-duo': { label: 'En duo', tone: 'success' },
    'fragile-duo': { label: 'Duo fragile', tone: 'warning' },
    waiting: { label: `Sans duo · ${row.waitingDays ?? 0} j`, tone: 'warning' },
    'duo-proposed': { label: 'Proposition envoyée', tone: 'brand' },
    invited: {
      label: agree(row.gender, 'Invité, pas encore inscrit', 'Invitée, pas encore inscrite'),
      tone: 'neutral',
    },
    suspended: { label: agree(row.gender, 'Suspendu', 'Suspendue'), tone: 'danger' },
  }
  return Status[row.status]
}

const duoView = (row: MemberRow): MemberRowView['duo'] => {
  if (row.partnerName) return { label: row.partnerName, muted: false }
  if (row.proposedPartnerName) return { label: `Proposé : ${row.proposedPartnerName}`, muted: false }
  return { label: 'Aucun', muted: true }
}

export const toMemberRowView = (row: MemberRow): MemberRowView => ({
  id: row.id,
  displayName: row.displayName,
  level: formatLevel(row.level, row.gender),
  availability: formatAvailability(row.availability),
  duo: duoView(row),
  sessions: row.sessionsDone,
  status: statusView(row),
  selectable: row.status === 'waiting',
})

const AvailabilityPhrase: Record<Availability, string> = {
  lunch: 'le midi',
  'after-work': 'après le travail',
  weekend: 'le week-end',
}

export const describeParty = (party: Pick<DuoParty, 'level' | 'gender' | 'availability'>) =>
  `${formatLevel(party.level, party.gender)} · ${formatAvailability(party.availability)}`

export const describeSuggestion = (suggestion: DuoSuggestion) => {
  const slots = suggestion.sharedAvailability.map((slot) => AvailabilityPhrase[slot]).join(' et ')
  const level = suggestion.sameLevel ? ' et a le même niveau' : ''
  return `${suggestion.partner.displayName} vient aussi ${slots}${level}. Chaque membre reçoit la proposition dans l'app et confirme, ou non.`
}
