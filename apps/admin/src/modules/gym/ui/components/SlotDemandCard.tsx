import { SectionTitle } from '../../../shared/ui/components/SectionTitle'

type SlotDemandCardProps = {
  readonly rows: ReadonlyArray<{ readonly label: string; readonly percent: number; readonly display: string }>
  readonly hint: string | null
}

export const SlotDemandCard = ({ rows, hint }: SlotDemandCardProps) => (
  <section
    aria-labelledby="slots-title"
    className="bg-surface-000 flex min-w-0 flex-[2_1_300px] flex-col gap-4 rounded-lg p-6 sm:p-7"
  >
    <SectionTitle id="slots-title">Créneaux demandés</SectionTitle>
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {rows.map((row) => (
        <li key={row.label} className="flex flex-col gap-1.5">
          <span className="text-body flex justify-between">
            <span>{row.label}</span>
            <b>{row.display}</b>
          </span>
          <span aria-hidden="true" className="rounded-pill bg-surface-200 h-3">
            <span className="rounded-pill bg-brand block h-3" style={{ width: `${row.percent}%` }} />
          </span>
        </li>
      ))}
    </ul>
    {hint ? <p className="text-caption text-ink-muted m-0">{hint}</p> : null}
  </section>
)
