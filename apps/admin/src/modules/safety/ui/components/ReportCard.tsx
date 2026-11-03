import { Button } from '../../../shared/ui/components/Button'
import { Tag } from '../../../shared/ui/components/Tag'

export type ReportView = {
  readonly id: string
  readonly toHandle: boolean
  readonly receivedLabel: string
  readonly sessionLabel: string
  readonly reasonTitle: string
  readonly reasonDescription: string
  readonly reporterName: string
  readonly reportedId: string
  readonly reportedName: string
  readonly reportedSuspended: boolean
  readonly partnerName: string | null
  readonly canResolve: boolean
  readonly canSuspend: boolean
}

type ReportCardProps = {
  readonly report: ReportView
  readonly confirming: boolean
  readonly busy: boolean
  readonly onResolve: () => void
  readonly onAskSuspension: () => void
  readonly onCancelSuspension: () => void
  readonly onConfirmSuspension: () => void
}

export const ReportCard = ({
  report,
  confirming,
  busy,
  onResolve,
  onAskSuspension,
  onCancelSuspension,
  onConfirmSuspension,
}: ReportCardProps) => (
  <article className="bg-surface-000 flex flex-col gap-3 rounded-md p-5">
    <div className="flex flex-wrap items-center gap-2">
      {report.toHandle ? (
        <Tag tone="brand" icon="flag">
          À traiter
        </Tag>
      ) : (
        <Tag tone="success">Traité</Tag>
      )}
      {report.reportedSuspended ? (
        <Tag tone="neutral" icon="pause">
          Compte suspendu
        </Tag>
      ) : null}
      <span className="text-caption text-ink-muted">
        {report.receivedLabel} · {report.sessionLabel}
      </span>
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="text-headline m-0">{report.reasonTitle}</h3>
      <p className="text-body text-ink-muted m-0">{report.reasonDescription}</p>
    </div>
    <p className="text-body m-0">
      Signalé par <b>{report.reporterName}</b>, à propos de <b>{report.reportedName}</b>.
    </p>
    {confirming ? (
      <fieldset className="bg-danger-surface m-0 flex min-w-0 flex-col gap-3 rounded-sm border-0 p-4">
        <legend className="sr-only">Suspendre {report.reportedName}</legend>
        <p className="text-body text-ink m-0">
          {report.reportedName} ne pourra plus utiliser Bora dans votre salle.
          {report.partnerName
            ? ` Son duo avec ${report.partnerName} est dissous : ${report.partnerName} repasse en « Sans duo ».`
            : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="danger" onClick={onConfirmSuspension} disabled={busy}>
            {busy ? 'Suspension…' : 'Confirmer la suspension'}
          </Button>
          <Button variant="quiet" onClick={onCancelSuspension} disabled={busy}>
            Annuler
          </Button>
        </div>
      </fieldset>
    ) : report.canResolve || report.canSuspend ? (
      <div className="flex flex-wrap gap-2">
        {report.canResolve ? (
          <Button variant="secondary" iconStart="check" onClick={onResolve} disabled={busy}>
            Marquer comme traité
          </Button>
        ) : null}
        {report.canSuspend ? (
          <Button variant="danger" iconStart="pause" onClick={onAskSuspension} disabled={busy}>
            Suspendre {report.reportedName}
          </Button>
        ) : null}
      </div>
    ) : null}
  </article>
)
