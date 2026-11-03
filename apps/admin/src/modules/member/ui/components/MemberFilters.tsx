import { ChoiceChip } from '../../../shared/ui/components/ChoiceChip'
import { Icon } from '../../../shared/ui/components/Icon'

export type MemberFilterChip = {
  readonly value: string
  readonly label: string
  readonly selected: boolean
}

type MemberFiltersProps = {
  readonly search: string
  readonly chips: ReadonlyArray<MemberFilterChip>
  readonly onSearchChange: (search: string) => void
  readonly onFilterChange: (value: string) => void
}

export const MemberFilters = ({ search, chips, onSearchChange, onFilterChange }: MemberFiltersProps) => (
  <div className="flex flex-wrap items-end gap-3">
    <label className="flex min-w-0 flex-1 basis-[260px] flex-col gap-1.5">
      <span className="text-label">Rechercher un membre</span>
      <span className="relative flex items-center">
        <Icon name="search" className="text-ink-muted pointer-events-none absolute left-4" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Prénom ou initiale"
          className="min-h-tap-min border-line-strong bg-surface-000 font-text text-ink placeholder:text-ink-subtle focus-visible:outline-focus w-full rounded-sm border-2 py-0 pr-4 pl-12 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-2"
        />
      </span>
    </label>
    <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
      <legend className="sr-only">Filtrer les membres</legend>
      {chips.map((chip) => (
        <ChoiceChip key={chip.value} selected={chip.selected} onToggle={() => onFilterChange(chip.value)}>
          {chip.label}
        </ChoiceChip>
      ))}
    </fieldset>
  </div>
)
