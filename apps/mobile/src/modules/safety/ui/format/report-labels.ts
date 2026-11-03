import type { ReportReason } from '../../core/domain/constants/report-reason.constant'

export const ReportReasonLabel: Record<ReportReason, { readonly title: string; readonly description: string }> = {
  'inappropriate-remarks': { title: 'Propos déplacés', description: 'Remarques sur ton corps, blagues gênantes.' },
  'insistent-behavior': { title: 'Comportement insistant', description: 'Messages ou demandes hors des séances.' },
  'felt-unsafe': {
    title: 'Je ne me suis pas senti·e en sécurité',
    description: 'Quelque chose ne va pas, sans détail.',
  },
  other: { title: 'Autre chose', description: "L'équipe de ta salle te recontacte." },
}
