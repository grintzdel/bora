import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { formatWeekday } from '../../../shared/ui/format/format-slot'
import { Feedback } from '../../core/domain/constants/feedback.constant'
import { SessionStatus } from '../../core/domain/constants/session-status.constant'
import { selectNextSession, selectSessionById } from '../../core/store/session.selectors'
import { confirmSessionThunk, fetchSessionsThunk, rateSessionThunk } from '../../core/store/session.thunks'
import { FeedbackLabel } from '../format/session-labels'
import { toSessionCardView } from './session-view'

export const useSessionDone = (sessionId: string) => {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => selectSessionById(state, sessionId))
  const next = useAppSelector(selectNextSession)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    void dispatch(fetchSessionsThunk())
  }, [dispatch])

  const needsConfirmation = next?.status === SessionStatus.PENDING
  const facts = session
    ? `${session.program.exercises.length} exercices, ${session.program.durationMinutes} minutes.`
    : ''

  return {
    summary: session
      ? session.partner
        ? `${session.program.name} fait à deux avec ${session.partner.firstName}. ${facts}`
        : `${session.program.name} fait. ${facts}`
      : '',
    feedbackOptions: (Object.values(Feedback) as Feedback[]).map((value) => ({ value, label: FeedbackLabel[value] })),
    feedback,
    selectFeedback: setFeedback,
    next: next ? toSessionCardView(next) : null,
    primaryLabel: next && needsConfirmation ? `Confirmer ${formatWeekday(next.slot.weekday)}` : "Retour à l'accueil",
    isSaving,
    finish: async () => {
      setIsSaving(true)
      await Promise.all([
        feedback ? dispatch(rateSessionThunk({ sessionId, feedback })) : null,
        next && needsConfirmation ? dispatch(confirmSessionThunk(next.id)) : null,
      ])
      setIsSaving(false)
    },
  }
}
