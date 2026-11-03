import { Button } from '../../../shared/ui/components/Button'
import { ButtonLink } from '../../../shared/ui/components/ButtonLink'
import { QrCode } from '../../../shared/ui/components/QrCode'
import { SectionTitle } from '../../../shared/ui/components/SectionTitle'
import { StatTile } from '../../../shared/ui/components/StatTile'

export type WelcomeKitView = {
  readonly gymName: string
  readonly inviteUrl: string
  readonly opened: string
  readonly openedCaption: string
  readonly activated: string
  readonly activatedCaption: string
}

type WelcomeKitPanelProps = {
  readonly kit: WelcomeKitView | null
  readonly posterHref: string
  readonly copyFeedback: string | null
  readonly onCopyLink: () => void
}

export const WelcomeKitPanel = ({ kit, posterHref, copyFeedback, onCopyLink }: WelcomeKitPanelProps) => (
  <section aria-labelledby="accueil" className="flex flex-col gap-4">
    <SectionTitle id="accueil">Accueil des nouveaux inscrits</SectionTitle>
    <p className="text-body text-ink-muted m-0">
      Votre accueil montre l'affiche, le nouvel inscrit scanne, Bora lui propose un duo de son niveau.
    </p>
    {kit ? (
      <div className="flex flex-wrap gap-4">
        <div className="bg-surface-000 flex min-w-0 flex-[3_1_420px] flex-wrap items-center gap-6 rounded-lg p-6">
          <QrCode value={kit.inviteUrl} label={`QR code d'invitation de ${kit.gymName}`} size={168} />
          <div className="flex min-w-0 flex-[1_1_240px] flex-col items-start gap-3">
            <h3 className="text-headline m-0">Le lien d'invitation de {kit.gymName}</h3>
            <p className="text-body text-ink-muted m-0">
              À glisser dans l'e-mail de bienvenue, ou à montrer à l'accueil avec l'affiche.
            </p>
            <code className="bg-surface-200 font-text text-body max-w-full rounded-sm px-3 py-2 break-all">
              {kit.inviteUrl}
            </code>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" iconStart="copy" onClick={onCopyLink}>
                Copier le lien
              </Button>
              <ButtonLink href={posterHref} iconStart="printer">
                Imprimer l'affiche
              </ButtonLink>
            </div>
            <p aria-live="polite" className="text-caption text-ink-muted m-0 min-h-[18px]">
              {copyFeedback}
            </p>
          </div>
        </div>
        <div className="flex flex-[1_1_240px] flex-col gap-4">
          <StatTile label="Invitations ouvertes ce mois" value={kit.opened} caption={kit.openedCaption} />
          <StatTile label="Comptes Bora activés" value={kit.activated} caption={kit.activatedCaption} />
        </div>
      </div>
    ) : (
      <p className="text-body text-ink-muted m-0">Chargement du kit d'accueil…</p>
    )}
  </section>
)
