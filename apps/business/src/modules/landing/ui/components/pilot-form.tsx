'use client'

import { type FormEvent, useId, useState } from 'react'

import { buttonStyles } from './button-styles'
import { ArrowRightIcon, CheckIcon } from './icons'

export function PilotForm() {
  const id = useId()
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <output className="bg-lime text-body text-on-lime flex items-start gap-3 rounded-md px-5 py-4">
        <CheckIcon className="size-icon-sm mt-0.5 shrink-0" />
        C&apos;est noté. On vous écrit sous 48 h pour caler la visite.
      </output>
    )
  }

  return (
    <form className="bg-surface-000 rounded-lg p-5 md:p-6" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-prenom`} name="prenom" label="Votre prénom" autoComplete="given-name" />
        <Field id={`${id}-salle`} name="salle" label="Nom de la salle" autoComplete="organization" />
        <Field id={`${id}-email`} name="email" type="email" label="Email" autoComplete="email" />
        <Field
          id={`${id}-inscrits`}
          name="inscrits"
          type="number"
          label="Nouveaux inscrits par mois"
          min={1}
          inputMode="numeric"
        />
      </div>
      <label className="text-caption text-ink-muted mt-5 flex cursor-pointer items-start gap-3">
        <input type="checkbox" name="consent" required className="accent-brand mt-0.5 size-4 shrink-0" />
        <span>
          J&apos;accepte que Bora utilise ces informations pour me recontacter au sujet du pilote. Elles ne sont jamais
          revendues.{' '}
          <a href="/confidentialite" className="text-brand underline underline-offset-2">
            Politique de confidentialité
          </a>
        </span>
      </label>
      <button type="submit" className={`${buttonStyles.limeLg} mt-5 w-full`}>
        Demander un pilote
        <ArrowRightIcon className="size-icon-sm" />
      </button>
      <p className="text-caption text-ink-subtle mt-3">Réponse sous 48 h. Aucun engagement.</p>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  min,
  inputMode,
}: {
  id: string
  name: string
  label: string
  type?: 'text' | 'email' | 'number'
  autoComplete?: string
  min?: number
  inputMode?: 'numeric'
}) {
  return (
    <div>
      <label htmlFor={id} className="text-caption text-ink-muted mb-2 block">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        min={min}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="h-tap-min bg-surface-100 text-body text-ink ring-line focus-visible:outline-focus w-full rounded-sm px-4 ring-1 focus-visible:outline-2 focus-visible:outline-offset-2"
      />
    </div>
  )
}
