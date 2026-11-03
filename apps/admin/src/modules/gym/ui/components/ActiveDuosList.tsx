import { Initials } from '../../../shared/ui/components/Initials'
import { SectionTitle } from '../../../shared/ui/components/SectionTitle'
import { Tag } from '../../../shared/ui/components/Tag'

type ActiveDuo = { readonly id: string; readonly names: string; readonly slot: string; readonly sessions: string }

export const ActiveDuosList = ({ duos }: { readonly duos: ReadonlyArray<ActiveDuo> }) => (
  <section aria-labelledby="duos-title" className="flex flex-col gap-3">
    <SectionTitle id="duos-title">Duos actifs</SectionTitle>
    {duos.length === 0 ? (
      <p className="text-body text-ink-muted m-0">Aucun duo actif pour le moment.</p>
    ) : (
      <ul className="bg-surface-000 m-0 flex list-none flex-col overflow-hidden rounded-md p-0">
        {duos.map((duo) => (
          <li
            key={duo.id}
            className="border-line flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-5 py-4 first:border-t-0"
          >
            <Initials name={duo.names.replace(' et ', ' ')} />
            <span className="flex flex-[1_1_200px] flex-col">
              <b className="text-headline">{duo.names}</b>
              <span className="text-caption text-ink-muted">{duo.slot}</span>
            </span>
            <Tag tone="brand" icon={null}>
              {duo.sessions}
            </Tag>
          </li>
        ))}
      </ul>
    )}
  </section>
)
