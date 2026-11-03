import { Button } from '../../../shared/ui/components/Button'
import { Tag, type TagTone } from '../../../shared/ui/components/Tag'

type MachineCardProps = {
  readonly name: string
  readonly caption: string
  readonly tag: { readonly label: string; readonly tone: TagTone }
  readonly actionLabel: string
  readonly isEditing: boolean
  readonly onAction: () => void
}

export const MachineCard = ({ name, caption, tag, actionLabel, isEditing, onAction }: MachineCardProps) => (
  <li
    className={`bg-surface-000 flex flex-[1_1_240px] flex-col items-start gap-2.5 rounded-md p-5 ${
      isEditing ? 'outline-brand outline-2' : ''
    }`}
  >
    <Tag tone={tag.tone}>{tag.label}</Tag>
    <h3 className="text-headline m-0">{name}</h3>
    <span className="text-caption text-ink-muted">{caption}</span>
    <Button variant="quiet" iconEnd="arrow" onClick={onAction}>
      {actionLabel}
    </Button>
  </li>
)
