'use client'

import { useEffect, useId, useState } from 'react'

import { marketingConfig } from '@/modules/landing/core/domain/config'
import { memberNav } from '@/modules/landing/core/domain/content'

import { buttonStyles } from './button-styles'
import { CloseIcon, MenuIcon } from './icons'

type MobileNavProps = {
  businessSiteUrl?: string
}

export function MobileNav({ businessSiteUrl = marketingConfig.businessSiteUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="size-tap-min rounded-pill text-ink-inverse focus-visible:outline-focus flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon className="size-icon-md" /> : <MenuIcon className="size-icon-md" />}
        <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
      </button>
      {open ? (
        <nav
          id={panelId}
          className="bg-surface-000 absolute inset-x-5 top-[72px] z-30 rounded-md p-4 shadow-lg"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-1">
            {memberNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="h-tap-min text-headline text-ink hover:bg-surface-200 flex items-center rounded-sm px-3"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={businessSiteUrl} className={`${buttonStyles.lime} mt-3 w-full`} onClick={() => setOpen(false)}>
            Vous gérez une salle ?
          </a>
        </nav>
      ) : null}
    </div>
  )
}
