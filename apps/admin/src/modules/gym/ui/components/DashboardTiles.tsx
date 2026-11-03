import { StatTile } from '../../../shared/ui/components/StatTile'

type DashboardTilesProps = {
  readonly tiles: ReadonlyArray<{ readonly label: string; readonly value: string; readonly caption?: string }>
}

export const DashboardTiles = ({ tiles }: DashboardTilesProps) => (
  <section aria-label="Indicateurs du mois" className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
    {tiles.map((tile) => (
      <StatTile key={tile.label} label={tile.label} value={tile.value} caption={tile.caption} />
    ))}
  </section>
)
