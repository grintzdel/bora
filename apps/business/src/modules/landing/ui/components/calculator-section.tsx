'use client'

import { useId, useState } from 'react'

import {
  formatEuros,
  MEMBERS_DEFAULT,
  MEMBERS_MAX,
  MEMBERS_MIN,
  monthlyGain,
  PRICE_DEFAULT,
  PRICE_MAX,
  PRICE_MIN,
  sliderPercent,
  yearlyGain,
} from '@/modules/landing/core/domain/calculator'

import { Container } from './container'

export function CalculatorSection() {
  const priceId = useId()
  const membersId = useId()
  const [price, setPrice] = useState(PRICE_DEFAULT)
  const [members, setMembers] = useState(MEMBERS_DEFAULT)
  const monthly = monthlyGain(price, members)
  const yearly = yearlyGain(price, members)

  return (
    <section id="calcul" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-section text-ink">Faites le calcul</h2>
          <p className="text-body text-ink-muted mt-4 max-w-md">
            Chaque adhérent gardé un mois de plus, c&apos;est un mois d&apos;abonnement en plus. Réglez avec vos
            chiffres.
          </p>
        </div>
        <div className="bg-surface-000 rounded-lg p-5 md:p-6">
          <RangeField
            id={priceId}
            label="Prix de votre abonnement mensuel"
            valueLabel={`${price} €`}
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={price}
            onChange={setPrice}
          />
          <RangeField
            id={membersId}
            label="Adhérents gardés en plus chaque mois"
            valueLabel={String(members)}
            min={MEMBERS_MIN}
            max={MEMBERS_MAX}
            value={members}
            onChange={setMembers}
          />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-surface-inverse text-ink-inverse rounded-md p-5">
              <p className="text-caption">En plus chaque mois</p>
              <p className="font-display text-title-1 text-lime mt-2">{formatEuros(monthly)}</p>
            </div>
            <div className="bg-brand-soft rounded-md p-5">
              <p className="text-caption text-ink-muted">Sur un an</p>
              <p className="font-display text-title-1 text-ink mt-2">{formatEuros(yearly)}</p>
            </div>
          </div>
          <p className="text-caption text-ink-subtle mt-4">
            Calcul simple : adhérents gardés × prix de l&apos;abonnement. Le pilote vous donne votre vrai chiffre.
          </p>
        </div>
      </Container>
    </section>
  )
}

function RangeField({
  id,
  label,
  valueLabel,
  min,
  max,
  value,
  onChange,
}: {
  id: string
  label: string
  valueLabel: string
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}) {
  const percent = sliderPercent(value, min, max)

  return (
    <div className="mt-5 first:mt-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-headline text-ink">
          {label}
        </label>
        <span className="text-body-strong text-ink">{valueLabel}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="calc-range"
        style={{
          background: `linear-gradient(to right, var(--color-brand) ${percent}%, var(--color-line) ${percent}%)`,
        }}
      />
    </div>
  )
}
