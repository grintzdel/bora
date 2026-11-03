import Image from 'next/image'

import { Container } from './container'
import { GymCheckForm } from './gym-check-form'
import { CheckIcon } from './icons'
import { SiteHeader } from './site-header'

export function HeroSection() {
  return (
    <section id="top" className="bg-surface-inverse text-ink-inverse overflow-x-hidden">
      <SiteHeader />
      <Container className="grid items-center gap-12 py-10 pb-28 lg:grid-cols-2 lg:gap-16 lg:pt-8 lg:pb-32">
        <div>
          <p className="rounded-pill bg-lime text-label text-on-lime mb-5 inline-flex px-3 py-1">
            Pour les débutants en salle
          </p>
          <h1 className="font-display text-hero text-ink-inverse">Quelqu&apos;un t&apos;attend, alors tu y vas.</h1>
          <p className="text-body text-ink-inverse/80 mt-5 max-w-xl">
            Bora te trouve un duo dans ta salle, de ton niveau et à tes horaires, avec un programme guidé à faire
            ensemble.
          </p>
          <div className="mt-8">
            <GymCheckForm />
          </div>
          <p className="text-caption text-ink-inverse/65 mt-4">Gratuit pour toi, offert par ta salle.</p>
        </div>
        <HeroVisual />
      </Container>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
      <div className="bg-lime absolute -top-6 -right-4 size-36 rounded-full md:-top-10 md:-right-8 md:size-44" />
      <div className="relative aspect-5/4 overflow-hidden rounded-lg">
        <Image
          src="/image.png"
          alt="Deux sportifs qui sourient dans une salle, entre deux séries"
          fill
          priority
          sizes="(min-width: 1024px) 460px, 90vw"
          className="object-cover object-center"
        />
      </div>
      <div className="bg-surface-000 absolute -bottom-8 left-4 z-10 w-[min(100%,280px)] rounded-md p-4 shadow-lg sm:-bottom-6 sm:-left-6">
        <div className="flex items-start gap-3">
          <span className="bg-lime text-label text-on-lime flex size-10 shrink-0 items-center justify-center rounded-full">
            LM
          </span>
          <div>
            <p className="text-headline text-ink">Léa a confirmé</p>
            <p className="text-caption text-ink-muted">Mardi 18 h 30 · Haut du corps</p>
          </div>
        </div>
        <p className="bg-lime text-caption text-on-lime mt-3 flex items-center gap-2 rounded-sm px-3 py-2">
          <CheckIcon className="size-icon-sm" /> Duo confirmé
        </p>
      </div>
    </div>
  )
}
