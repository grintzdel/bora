'use client'

import { QrSheetCard } from '@/modules/machine/ui/components/QrSheetCard'
import { useMachineQrSheet } from '@/modules/machine/ui/hooks/use-machine-qr-sheet'
import { AppRoute } from '@/modules/shared/ui/app-route.constant'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { Button } from '@/modules/shared/ui/components/Button'
import { ButtonLink } from '@/modules/shared/ui/components/ButtonLink'

export const MachineQrSheetPage = () => {
  const sheet = useMachineQrSheet()

  return (
    <main className="bg-surface-100 text-ink flex min-h-dvh flex-col items-center gap-6 px-4 py-8 print:block print:bg-transparent print:p-0">
      <div className="flex w-full max-w-[210mm] flex-wrap items-end justify-between gap-4 print:hidden">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-title-1 m-0">{sheet.title}</h1>
          <p className="text-body text-ink-muted m-0">{sheet.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href={AppRoute.MACHINES} variant="secondary">
            Retour aux machines
          </ButtonLink>
          <Button iconStart="printer" onClick={sheet.print} disabled={sheet.cards.length === 0}>
            Imprimer
          </Button>
        </div>
      </div>

      {sheet.isLoading ? <p className="text-body text-ink-muted m-0 print:hidden">Préparation de la planche…</p> : null}
      {sheet.error ? (
        <div className="w-full max-w-[210mm] print:hidden">
          <Banner tone="danger" title={sheet.error} />
        </div>
      ) : null}

      <ul className="bg-surface-000 m-0 grid w-full max-w-[210mm] list-none grid-cols-1 gap-4 rounded-lg p-6 sm:grid-cols-2 print:max-w-none print:grid-cols-2 print:rounded-none print:bg-transparent print:p-0">
        {sheet.cards.map((card) => (
          <QrSheetCard
            key={card.id}
            numberLabel={card.numberLabel}
            name={card.name}
            gymName={sheet.gymName}
            qrValue={card.qrValue}
            qrLabel={card.qrLabel}
          />
        ))}
      </ul>
    </main>
  )
}
