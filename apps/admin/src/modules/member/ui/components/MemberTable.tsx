import { Initials } from '../../../shared/ui/components/Initials'
import { Tag } from '../../../shared/ui/components/Tag'
import type { MemberRowView } from '../format/member-view'

type MemberTableProps = {
  readonly rows: ReadonlyArray<MemberRowView>
  readonly selectedId: string | null
  readonly isLoading: boolean
  readonly emptyMessage: string
  readonly onSelect: (memberId: string) => void
}

const Header = ({ children, edge = false }: { readonly children: string; readonly edge?: boolean }) => (
  <th scope="col" className={`text-label text-ink-muted py-4 ${edge ? 'px-5' : 'px-3'}`}>
    {children}
  </th>
)

const MemberName = ({
  row,
  selected,
  onSelect,
}: {
  readonly row: MemberRowView
  readonly selected: boolean
  readonly onSelect: (memberId: string) => void
}) => {
  if (!row.selectable) return <b>{row.displayName}</b>
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(row.id)}
      className="font-text text-ink decoration-line-strong hover:decoration-brand focus-visible:outline-focus cursor-pointer rounded-sm border-0 bg-transparent p-0 text-left text-[16px] font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {row.displayName}
      <span className="sr-only">, proposer un duo</span>
    </button>
  )
}

export const MemberTable = ({ rows, selectedId, isLoading, emptyMessage, onSelect }: MemberTableProps) => (
  <div className="bg-surface-000 min-w-0 flex-[3_1_560px] overflow-x-auto rounded-md" aria-busy={isLoading}>
    <table className="w-full min-w-[760px] border-collapse text-left text-[16px] leading-[22px]">
      <caption className="sr-only">Nouveaux inscrits du mois et leurs duos</caption>
      <thead>
        <tr>
          <Header edge>Membre</Header>
          <Header>Niveau</Header>
          <Header>Créneau</Header>
          <Header>Duo</Header>
          <Header>À deux</Header>
          <Header edge>Statut</Header>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr className="border-line border-t">
            <td colSpan={6} className="text-ink-muted px-5 py-6">
              {isLoading ? 'Chargement des membres…' : emptyMessage}
            </td>
          </tr>
        ) : (
          rows.map((row) => {
            const selected = row.id === selectedId
            return (
              <tr key={row.id} className={`border-line border-t ${selected ? 'bg-brand-soft' : ''}`}>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2.5">
                    <Initials name={row.displayName} onSoft={selected} />
                    <MemberName row={row} selected={selected} onSelect={onSelect} />
                  </span>
                </td>
                <td className="px-3 py-3.5">{row.level}</td>
                <td className="px-3 py-3.5">{row.availability}</td>
                <td className={`px-3 py-3.5 ${row.duo.muted ? 'text-ink-muted' : ''}`}>{row.duo.label}</td>
                <td className="px-3 py-3.5">{row.sessions}</td>
                <td className="px-5 py-3.5">
                  <Tag tone={row.status.tone}>{row.status.label}</Tag>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  </div>
)
