import { formatSlotTitle } from '../../../shared/ui/format/format-slot'
import type { Session } from '../../core/domain/session.domain-model'
import { formatProgramLine } from '../format/session-labels'

export const toSessionCardView = (session: Session) => ({
  id: session.id,
  when: formatSlotTitle(session.slot),
  program: formatProgramLine(session.program),
  partnerName: session.partner?.displayName ?? null,
  status: session.status,
})
