import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import type { ReportReason } from '../../core/domain/constants/report-reason.constant'
import { selectReport } from '../../core/store/safety.selectors'
import { reportCleared } from '../../core/store/safety.slice'
import { submitReportThunk } from '../../core/store/safety.thunks'

export const useReport = ({
  sessionId,
  partnerId,
}: {
  readonly sessionId: string | null
  readonly partnerId: string | null
}) => {
  const dispatch = useAppDispatch()
  const report = useAppSelector(selectReport)
  const [reason, setReason] = useState<ReportReason | null>(null)

  useEffect(() => {
    dispatch(reportCleared())
  }, [dispatch])

  return {
    reason,
    selectReason: setReason,
    canSubmit: reason !== null && !report.isLoading,
    isSending: report.isLoading,
    isSent: report.data !== null,
    error: report.error ? "Le signalement n'est pas parti. Réessaie." : null,
    submit: async () => {
      if (reason) await dispatch(submitReportThunk({ sessionId, partnerId, reason }))
    },
  }
}
