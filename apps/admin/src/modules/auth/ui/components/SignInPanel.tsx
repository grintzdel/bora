import { Button } from '../../../shared/ui/components/Button'

type SignInPanelProps = {
  readonly gymName: string | null
  readonly managerName: string | null
  readonly isSigningIn: boolean
  readonly error: string | null
  readonly onSignIn: () => void
}

export const SignInPanel = ({ gymName, managerName, isSigningIn, error, onSignIn }: SignInPanelProps) => (
  <div className="bg-surface-000 flex w-full max-w-[440px] flex-col gap-6 rounded-lg p-6 sm:p-8">
    <div className="flex flex-col gap-2">
      <span className="font-display text-title-1">Bora</span>
      <h1 className="font-display text-title-1 sm:text-display m-0">L'espace de votre salle</h1>
      <p className="text-body text-ink-muted m-0">
        Suivez vos nouveaux inscrits, leurs duos et ce qu'ils deviennent après 90 jours.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <Button size="lg" block onClick={onSignIn} disabled={isSigningIn || !gymName} iconEnd="arrow">
        {isSigningIn ? 'Connexion…' : `Se connecter en tant que ${gymName ?? 'votre salle'}`}
      </Button>
      {managerName ? (
        <p className="text-caption text-ink-muted m-0 text-center">Compte de démonstration de {managerName}, gérante</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-caption text-danger m-0 text-center">
          {error}
        </p>
      ) : null}
    </div>
  </div>
)
