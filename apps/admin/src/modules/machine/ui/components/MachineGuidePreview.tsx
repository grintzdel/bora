import { Icon } from '../../../shared/ui/components/Icon'
import { Tag } from '../../../shared/ui/components/Tag'

type MachineGuidePreviewProps = {
  readonly tag: string
  readonly name: string
  readonly videoLabel: string
  readonly steps: ReadonlyArray<string>
}

export const MachineGuidePreview = ({ tag, name, videoLabel, steps }: MachineGuidePreviewProps) => (
  <section aria-labelledby="apercu-titre" className="flex flex-col gap-3">
    <h3 id="apercu-titre" className="text-headline m-0">
      Ce que voit le débutant après le scan
    </h3>
    <div className="bg-surface-100 flex flex-col gap-3 rounded-md p-5">
      <Tag tone="brand" icon={null}>
        {tag}
      </Tag>
      <span className="font-display text-title-2">{name}</span>
      <span className="bg-surface-inverse text-caption text-ink-inverse flex items-center gap-2 rounded-sm px-4 py-3">
        <Icon name="arrow" size={16} />
        {videoLabel}
      </span>
      {steps.length > 0 ? (
        <ol className="text-body m-0 flex flex-col gap-2 pl-5">
          {steps.map((step, index) => (
            <li key={`${index}-${step}`}>{step}</li>
          ))}
        </ol>
      ) : (
        <p className="text-body text-ink-muted m-0">Pas encore de tuto : le débutant ne verra que le nom.</p>
      )}
    </div>
  </section>
)
