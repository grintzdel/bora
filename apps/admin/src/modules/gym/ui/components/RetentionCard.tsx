type RetentionRow = { readonly horizon: string; readonly duo: number; readonly solo: number }

type RetentionCardProps = {
  readonly subtitle: string
  readonly rows: ReadonlyArray<RetentionRow>
  readonly summary: string
}

const Series = {
  duo: { label: 'En duo', fill: 'bg-lime' },
  solo: { label: 'Seuls', fill: 'bg-[#b79cff]' },
} as const

const Bar = ({ series, value }: { readonly series: keyof typeof Series; readonly value: number }) => (
  <div className="grid grid-cols-[64px_minmax(0,1fr)_48px] items-center gap-3">
    <span className="text-caption">{Series[series].label}</span>
    <span aria-hidden="true" className="rounded-pill bg-ink-inverse/15 h-4">
      <span className={`rounded-pill block h-4 ${Series[series].fill}`} style={{ width: `${value}%` }} />
    </span>
    <span className="text-body-strong text-right">{value} %</span>
  </div>
)

export const RetentionCard = ({ subtitle, rows, summary }: RetentionCardProps) => (
  <section
    aria-labelledby="retention-title"
    className="bg-surface-inverse text-ink-inverse flex min-w-0 flex-[3_1_420px] flex-col gap-5 rounded-lg p-6 sm:p-7"
  >
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h2 id="retention-title" className="font-display text-title-2 m-0">
        Encore là après 30, 60 et 90 jours
      </h2>
      <span className="text-caption">{subtitle}</span>
    </div>
    <ul aria-label="Légende" className="text-caption m-0 flex list-none flex-wrap gap-4 p-0">
      {(Object.keys(Series) as ReadonlyArray<keyof typeof Series>).map((series) => (
        <li key={series} className="inline-flex items-center gap-2">
          <span aria-hidden="true" className={`rounded-pill size-3 ${Series[series].fill}`} />
          {Series[series].label}
        </li>
      ))}
    </ul>
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {rows.map((row) => (
        <li key={row.horizon} className="flex flex-col gap-1">
          <span className="text-label">{row.horizon}</span>
          <Bar series="duo" value={row.duo} />
          <Bar series="solo" value={row.solo} />
        </li>
      ))}
    </ul>
    <p className="text-body m-0">{summary}</p>
  </section>
)
