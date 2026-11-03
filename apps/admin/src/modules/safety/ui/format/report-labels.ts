import type { ReportReason } from '../../core/domain/constants/report-reason.constant'

export const ReportReasonLabel: Record<ReportReason, { readonly title: string; readonly description: string }> = {
  'inappropriate-remarks': {
    title: 'Propos déplacés',
    description: 'Remarques sur le corps ou blagues gênantes pendant la séance.',
  },
  'insistent-behavior': {
    title: 'Comportement insistant',
    description: 'Messages ou demandes en dehors des séances.',
  },
  'felt-unsafe': {
    title: "Ne s'est pas senti·e en sécurité",
    description: 'Le membre a préféré ne pas donner de détail.',
  },
  other: {
    title: 'Autre chose',
    description: 'Le membre attend que vous le recontactiez.',
  },
}
