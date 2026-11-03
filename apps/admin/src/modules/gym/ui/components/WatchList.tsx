import { Banner } from '../../../shared/ui/components/Banner'
import { ButtonLink } from '../../../shared/ui/components/ButtonLink'
import { SectionTitle } from '../../../shared/ui/components/SectionTitle'
import { Tag } from '../../../shared/ui/components/Tag'

export type DashboardAlert = {
  readonly id: string
  readonly tag: string
  readonly tone: 'warning' | 'brand'
  readonly text: string
  readonly action: { readonly label: string; readonly href: string }
}

export const WatchList = ({ alerts }: { readonly alerts: ReadonlyArray<DashboardAlert> }) => (
  <section aria-labelledby="watch-title" className="flex flex-col gap-3">
    <SectionTitle id="watch-title">À regarder cette semaine</SectionTitle>
    {alerts.length === 0 ? (
      <Banner tone="success" title="Rien à signaler cette semaine.">
        Vos nouveaux ont tous un duo ou une proposition en cours.
      </Banner>
    ) : (
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="bg-surface-000 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md px-5 py-4"
          >
            <Tag tone={alert.tone} icon={alert.tone === 'brand' ? 'flag' : undefined}>
              {alert.tag}
            </Tag>
            <span className="text-body flex-[1_1_280px]">{alert.text}</span>
            <ButtonLink href={alert.action.href} variant="quiet" iconEnd="arrow">
              {alert.action.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    )}
  </section>
)
