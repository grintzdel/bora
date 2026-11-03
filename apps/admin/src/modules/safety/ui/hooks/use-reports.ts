import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { formatSlot } from '../../../shared/ui/format/format-slot'
import { ReportStatus } from '../../core/domain/constants/report-status.constant'
import type { Report, SafetyAction } from '../../core/domain/safety.domain-model'
import { selectReports, selectSafetyAction } from '../../core/store/safety.selectors'
import { safetyActionCleared } from '../../core/store/safety.slice'
import { fetchReportsThunk, resolveReportThunk, suspendMemberThunk } from '../../core/store/safety.thunks'
import type { ReportView } from '../components/ReportCard'
import { formatReceivedDate } from '../format/format-received-date'
import { ReportReasonLabel } from '../format/report-labels'

const toView = (report: Report): ReportView => {
  const toHandle = report.status === ReportStatus.TO_HANDLE
  return {
    id: report.id,
    toHandle,
    receivedLabel: formatReceivedDate(report.receivedAt),
    sessionLabel: `Séance du ${formatSlot(report.slot).toLowerCase()}`,
    reasonTitle: ReportReasonLabel[report.reason].title,
    reasonDescription: ReportReasonLabel[report.reason].description,
    reporterName: report.reporter.displayName,
    reportedId: report.reported.id,
    reportedName: report.reported.displayName,
    reportedSuspended: report.reported.suspended,
    partnerName: report.reported.partnerName,
    canResolve: toHandle,
    canSuspend: toHandle && !report.reported.suspended,
  }
}

const feedbackOf = (action: SafetyAction | null) => {
  if (!action) return null
  if (action.kind === 'resolved') return 'Le signalement est marqué comme traité.'
  const partner = action.formerPartnerName
    ? ` ${action.formerPartnerName} repasse en « Sans duo » : proposez-lui un nouveau duo depuis Membres et duos.`
    : ''
  return `Le compte de ${action.displayName} est suspendu.${partner}`
}

export const useReports = () => {
  const dispatch = useAppDispatch()
  const reports = useAppSelector(selectReports)
  const action = useAppSelector(selectSafetyAction)
  const [confirmingReportId, setConfirmingReportId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(safetyActionCleared())
    void dispatch(fetchReportsThunk())
  }, [dispatch])

  const views = (reports.data ?? []).map(toView)

  return {
    isLoading: reports.isLoading && reports.data === null,
    loadError:
      reports.error && reports.data === null ? 'Les signalements ne sont pas arrivés. Rechargez la page.' : null,
    toHandleCount: views.filter((report) => report.toHandle).length,
    reports: views,
    feedback: feedbackOf(action.data),
    actionError: action.error ? "L'action n'a pas abouti. Réessayez." : null,
    isWorking: action.isLoading,
    confirmingReportId,
    resolve: (reportId: string) => {
      setConfirmingReportId(null)
      void dispatch(resolveReportThunk(reportId))
    },
    askSuspension: (reportId: string) => setConfirmingReportId(reportId),
    cancelSuspension: () => setConfirmingReportId(null),
    confirmSuspension: async (memberId: string) => {
      await dispatch(suspendMemberThunk(memberId))
      setConfirmingReportId(null)
    },
  }
}
