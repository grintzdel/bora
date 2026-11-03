import type { ReactNode } from 'react'

import { Container } from './container'
import { CheckIcon, WarningIcon } from './icons'

export function AppPreviewSection() {
  return (
    <section id="l-app" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-section text-ink">Dans l&apos;app, tu n&apos;es jamais perdu</h2>
          <p className="text-body text-ink-muted mt-3">
            De la proposition de duo à la séance suivante, chaque écran te dit ce qui va se passer.
          </p>
        </div>
        <div className="mt-12 grid items-start gap-10 md:grid-cols-3">
          <PhoneFrame caption="Un duo de ta salle">
            <h3 className="font-display text-title-2 text-ink">On a un duo pour toi</h3>
            <div className="bg-surface-000 ring-line mt-4 rounded-md p-4 ring-1">
              <div className="mb-3 flex items-center gap-3">
                <span className="bg-brand-soft text-label text-brand flex size-10 items-center justify-center rounded-full">
                  LM
                </span>
                <p className="text-headline text-ink">Léa M.</p>
              </div>
              <ul className="text-caption text-ink-muted flex flex-col gap-2">
                <CheckLine>Même salle</CheckLine>
                <CheckLine>Niveau débutant</CheckLine>
                <CheckLine>Après le travail</CheckLine>
              </ul>
            </div>
            <div className="bg-brand-soft mt-3 rounded-md p-4">
              <p className="text-headline text-ink flex items-center gap-2">
                <span className="bg-ink text-ink-inverse flex size-5 items-center justify-center rounded-full text-[10px]">
                  i
                </span>
                Double accord
              </p>
              <p className="text-caption text-ink-muted mt-1">Le duo se forme si vous dites oui tous les deux.</p>
            </div>
            <MockButton>Proposer ce duo</MockButton>
          </PhoneFrame>

          <PhoneFrame caption="Guidé machine par machine">
            <p className="text-caption text-ink-subtle">Haut du corps · exercice 2 sur 5</p>
            <div className="bg-surface-inverse text-ink-inverse mt-3 rounded-md p-4">
              <span className="rounded-pill bg-lime text-caption text-on-lime inline-flex px-2.5 py-1">
                Série 2 sur 3
              </span>
              <p className="font-display text-title-1 mt-3">Tirage vertical</p>
              <p className="text-caption text-ink-inverse/70 mt-1">12 répétitions · siège cran 4</p>
            </div>
            <div className="bg-surface-100 mt-3 rounded-md p-4">
              <p className="text-headline text-ink">À deux</p>
              <p className="text-caption text-ink-muted mt-1">
                L&apos;un fait la série, l&apos;autre compte et regarde le dos.
              </p>
            </div>
            <MockButton>
              Série terminée
              <CheckIcon className="size-icon-sm" />
            </MockButton>
          </PhoneFrame>

          <PhoneFrame caption="La suivante est déjà fixée">
            <div className="bg-lime text-on-lime rounded-md p-4">
              <p className="text-caption">Séance validée</p>
              <p className="font-display text-title-1">Bora !</p>
              <p className="text-caption">Faite à deux avec Léa.</p>
            </div>
            <div className="mt-4">
              <p className="text-caption text-warning flex items-center gap-2">
                <WarningIcon className="size-icon-sm" /> En attente de ton duo
              </p>
              <p className="font-display text-title-1 text-ink mt-2">Jeudi, 18 h 30</p>
              <p className="text-caption text-ink-muted">Bas du corps · débutant</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="bg-brand-soft text-label text-brand flex size-10 items-center justify-center rounded-full">
                  LM
                </span>
                <div>
                  <p className="text-caption text-ink-subtle">Ton duo</p>
                  <p className="text-headline text-ink">Léa M.</p>
                </div>
              </div>
            </div>
            <MockButton>Confirmer jeudi</MockButton>
          </PhoneFrame>
        </div>
      </Container>
    </section>
  )
}

function PhoneFrame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mx-auto flex w-full max-w-[300px] flex-col items-center">
      <div className="border-surface-inverse bg-surface-000 flex min-h-[540px] w-full flex-col rounded-lg border-[3px] p-4">
        {children}
      </div>
      <figcaption className="text-body-strong text-ink mt-4">{caption}</figcaption>
    </figure>
  )
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <CheckIcon className="size-icon-sm text-brand" />
      {children}
    </li>
  )
}

function MockButton({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto pt-4">
      <div className="h-tap-min rounded-pill bg-lime text-button text-on-lime flex items-center justify-center gap-2 px-5">
        {children}
      </div>
    </div>
  )
}
