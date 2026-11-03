import { Button } from '../../../shared/ui/components/Button'
import { ButtonLink } from '../../../shared/ui/components/ButtonLink'

type PosterToolbarProps = {
  readonly backHref: string
  readonly canPrint: boolean
  readonly onPrint: () => void
}

export const PosterToolbar = ({ backHref, canPrint, onPrint }: PosterToolbarProps) => (
  <div className="mx-auto flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
    <ButtonLink href={backHref} variant="secondary">
      Retour
    </ButtonLink>
    <p className="text-caption text-ink-muted m-0">Format A4 portrait, à afficher à l'accueil.</p>
    <Button iconStart="printer" onClick={onPrint} disabled={!canPrint}>
      Imprimer
    </Button>
  </div>
)
