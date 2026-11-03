import { Banner } from '../../../shared/ui/components/Banner'
import { SectionTitle } from '../../../shared/ui/components/SectionTitle'
import { Tag } from '../../../shared/ui/components/Tag'
import { ReportCard, type ReportView } from './ReportCard'

type ReportsPanelProps = {
  readonly reports: ReadonlyArray<ReportView>
  readonly toHandleCount: number
  readonly isLoading: boolean
  readonly loadError: string | null
  readonly feedback: string | null
  readonly actionError: string | null
  readonly isWorking: boolean
  readonly confirmingReportId: string | null
  readonly onResolve: (reportId: string) => void
  readonly onAskSuspension: (reportId: string) => void
  readonly onCancelSuspension: () => void
  readonly onConfirmSuspension: (memberId: string) => void
}

export const ReportsPanel = ({
  reports,
  toHandleCount,
  isLoading,
  loadError,
  feedback,
  actionError,
  isWorking,
  confirmingReportId,
  onResolve,
  onAskSuspension,
  onCancelSuspension,
  onConfirmSuspension,
}: ReportsPanelProps) => (
  <section aria-labelledby="signalements" className="flex flex-col gap-4">
    <div className="flex flex-wrap items-center gap-3">
      <SectionTitle id="signalements">Signalements</SectionTitle>
      {isLoading ? null : toHandleCount > 0 ? (
        <Tag tone="brand" icon="flag">
          {toHandleCount} à traiter
        </Tag>
      ) : (
        <Tag tone="success">Tout est traité</Tag>
      )}
    </div>
    <p className="text-body text-ink-muted m-0">
      Un membre signale un comportement gênant en un tap depuis sa séance. Bora est prévenu en même temps que vous et
      vous accompagne.
    </p>
    <div aria-live="polite" className="flex flex-col gap-3 empty:hidden">
      {feedback ? (
        <Banner tone="success" title="C'est fait.">
          {feedback}
        </Banner>
      ) : null}
      {actionError ? <Banner tone="danger" title={actionError} /> : null}
    </div>
    {isLoading ? <p className="text-body text-ink-muted m-0">Chargement des signalements…</p> : null}
    {loadError ? <Banner tone="danger" title={loadError} /> : null}
    {!isLoading && !loadError && reports.length === 0 ? (
      <p className="bg-surface-000 text-body text-ink-muted m-0 rounded-md p-5">Aucun signalement pour l'instant.</p>
    ) : null}
    {reports.length > 0 ? (
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {reports.map((report) => (
          <li key={report.id}>
            <ReportCard
              report={report}
              confirming={confirmingReportId === report.id}
              busy={isWorking}
              onResolve={() => onResolve(report.id)}
              onAskSuspension={() => onAskSuspension(report.id)}
              onCancelSuspension={onCancelSuspension}
              onConfirmSuspension={() => onConfirmSuspension(report.reportedId)}
            />
          </li>
        ))}
      </ul>
    ) : null}
  </section>
)
