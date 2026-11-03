import { Tag } from '../../../shared/ui/components/Tag'

type GuidedProgramCardProps = {
  readonly name: string
  readonly level: string
  readonly summary: string
  readonly exercises: ReadonlyArray<string>
}

export const GuidedProgramCard = ({ name, level, summary, exercises }: GuidedProgramCardProps) => (
  <li className="bg-surface-000 flex flex-[1_1_280px] flex-col items-start gap-2.5 rounded-lg p-6">
    <Tag tone="brand">{level}</Tag>
    <h3 className="font-display text-title-2 m-0">{name}</h3>
    <span className="text-body text-ink-muted">{summary}</span>
    <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
      {exercises.map((exercise) => (
        <li key={exercise} className="rounded-pill bg-surface-200 text-label text-ink-muted px-3 py-1.5">
          {exercise}
        </li>
      ))}
    </ol>
  </li>
)
