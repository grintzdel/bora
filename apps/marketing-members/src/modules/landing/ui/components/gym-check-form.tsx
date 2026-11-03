'use client'

import { type FormEvent, useId, useState } from 'react'

import { findGym, type Gym } from '@/modules/landing/core/domain/gyms'

import { buttonStyles } from './button-styles'
import { ArrowRightIcon, CheckIcon } from './icons'

type Status = 'idle' | 'empty' | 'found' | 'missing' | 'sent'

export function GymCheckForm() {
  const id = useId()
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [gym, setGym] = useState<Gym | undefined>()
  const [status, setStatus] = useState<Status>('idle')

  function onCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const match = findGym(query)
    if (!query.trim()) {
      setStatus('empty')
      setGym(undefined)
      return
    }
    if (match) {
      setGym(match)
      setStatus('found')
      return
    }
    setGym(undefined)
    setStatus('missing')
  }

  function onNotify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) {
      return
    }
    setStatus('sent')
  }

  return (
    <div id="trouver-salle" className="bg-ink-inverse/8 ring-ink-inverse/12 scroll-mt-8 rounded-lg p-5 ring-1">
      <p className="text-headline text-ink-inverse mb-3">Ta salle est-elle sur Bora ?</p>
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onCheck}>
        <label className="sr-only" htmlFor={`${id}-gym`}>
          Nom de ta salle
        </label>
        <input
          id={`${id}-gym`}
          name="gym"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            if (status !== 'idle') {
              setStatus('idle')
            }
          }}
          placeholder="Nom de ta salle"
          autoComplete="off"
          className="h-tap-min rounded-pill bg-surface-000 text-body text-ink placeholder:text-ink-subtle focus-visible:outline-focus min-w-0 flex-1 px-5 focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <button type="submit" className={buttonStyles.lime}>
          Vérifier
          <ArrowRightIcon className="size-icon-sm" />
        </button>
      </form>

      {status === 'idle' ? (
        <p className="text-caption text-ink-inverse/70 mt-3">
          Pas encore dessus ? Laisse ton email, on la contacte pour toi.
        </p>
      ) : null}

      {status === 'empty' ? (
        <output className="text-caption text-ink-inverse/80 mt-3 block">Entre le nom de ta salle pour vérifier.</output>
      ) : null}

      {status === 'found' && gym ? (
        <output className="bg-lime text-caption text-on-lime mt-4 flex items-start gap-2 rounded-sm px-4 py-3">
          <CheckIcon className="size-icon-sm mt-0.5 shrink-0" />
          <span>
            <span className="font-semibold">{gym.name}</span> est sur Bora. Demande le QR à l&apos;accueil, et
            c&apos;est parti.
          </span>
        </output>
      ) : null}

      {status === 'missing' || status === 'sent' ? (
        <div className="mt-4">
          {status === 'missing' ? (
            <output className="text-caption text-ink-inverse/80 mb-3 block">
              Pas encore. Laisse ton email, on contacte ta salle.
            </output>
          ) : null}
          {status === 'sent' ? (
            <output className="bg-lime text-caption text-on-lime flex items-start gap-2 rounded-sm px-4 py-3">
              <CheckIcon className="size-icon-sm mt-0.5 shrink-0" />
              C&apos;est noté. On contacte ta salle et on t&apos;écrit dès qu&apos;elle est sur Bora.
            </output>
          ) : (
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onNotify}>
              <label className="sr-only" htmlFor={`${id}-email`}>
                Ton email
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Ton email"
                className="h-tap-min rounded-pill bg-surface-000 text-body text-ink placeholder:text-ink-subtle focus-visible:outline-focus min-w-0 flex-1 px-5 focus-visible:outline-2 focus-visible:outline-offset-2"
              />
              <button type="submit" className={buttonStyles.lime}>
                Préviens-moi
              </button>
            </form>
          )}
        </div>
      ) : null}
    </div>
  )
}
