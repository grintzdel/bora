import type { FormEvent } from 'react'

import { Banner } from '../../../shared/ui/components/Banner'
import { Button } from '../../../shared/ui/components/Button'
import { Icon } from '../../../shared/ui/components/Icon'
import { QrCode } from '../../../shared/ui/components/QrCode'
import type { MachineDraft, MachineUsage } from '../../core/domain/machine.domain-model'
import { MachineGuidePreview } from './MachineGuidePreview'

type MachineEditorProps = {
  readonly title: string
  readonly isNew: boolean
  readonly draft: MachineDraft
  readonly errors: Readonly<Record<string, string>>
  readonly formError: string | null
  readonly savedMessage: string | null
  readonly isSaving: boolean
  readonly zoneNames: ReadonlyArray<string>
  readonly usages: ReadonlyArray<MachineUsage>
  readonly qr: { readonly value: string; readonly label: string } | null
  readonly preview: {
    readonly tag: string
    readonly name: string
    readonly videoLabel: string
    readonly steps: ReadonlyArray<string>
  }
  readonly onNameChange: (value: string) => void
  readonly onNumberChange: (value: string) => void
  readonly onZoneChange: (value: string) => void
  readonly onStepChange: (index: number, value: string) => void
  readonly onAddStep: () => void
  readonly onRemoveStep: (index: number) => void
  readonly onQrInstalledChange: (value: boolean) => void
  readonly onSubmit: () => void
  readonly onPrintQr: () => void
  readonly onClose: () => void
}

const fieldClass = (hasError: boolean) =>
  `min-h-tap-min w-full rounded-sm border-2 bg-surface-000 px-4 font-text text-[16px] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
    hasError ? 'border-danger' : 'border-line-strong'
  }`

const FieldError = ({ id, message }: { readonly id: string; readonly message: string | undefined }) =>
  message ? (
    <span id={id} className="text-caption text-danger">
      {message}
    </span>
  ) : null

export const MachineEditor = (props: MachineEditorProps) => {
  const { draft, errors } = props
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    props.onSubmit()
  }

  return (
    <aside
      aria-labelledby="fiche-titre"
      className="bg-surface-000 order-first flex min-w-0 flex-[2_1_340px] flex-col gap-6 rounded-lg p-5 sm:p-6 lg:sticky lg:top-8 lg:order-last"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-caption text-ink-muted">{props.isNew ? 'Ajouter une machine' : 'Fiche machine'}</span>
          <h2
            id="fiche-titre"
            tabIndex={-1}
            ref={(node) => node?.focus()}
            className="font-display text-title-2 m-0 outline-none"
          >
            {props.title}
          </h2>
        </div>
        <Button variant="quiet" iconStart="x" onClick={props.onClose} ariaLabel="Fermer la fiche">
          Fermer
        </Button>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-label">Nom</span>
          <input
            value={draft.name}
            onChange={(event) => props.onNameChange(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'machine-nom-erreur' : undefined}
            className={fieldClass(Boolean(errors.name))}
          />
          <FieldError id="machine-nom-erreur" message={errors.name} />
        </label>

        <div className="flex flex-wrap gap-4">
          <label className="flex flex-[1_1_100px] flex-col gap-1.5">
            <span className="text-label">Numéro</span>
            <input
              value={draft.number}
              inputMode="numeric"
              maxLength={2}
              placeholder="07"
              onChange={(event) => props.onNumberChange(event.target.value)}
              aria-invalid={Boolean(errors.number)}
              aria-describedby={errors.number ? 'machine-numero-erreur' : undefined}
              className={fieldClass(Boolean(errors.number))}
            />
            <FieldError id="machine-numero-erreur" message={errors.number} />
          </label>
          <label className="flex flex-[2_1_180px] flex-col gap-1.5">
            <span className="text-label">Zone</span>
            <select
              value={draft.zone}
              onChange={(event) => props.onZoneChange(event.target.value)}
              aria-invalid={Boolean(errors.zone)}
              aria-describedby={errors.zone ? 'machine-zone-erreur' : undefined}
              className={fieldClass(Boolean(errors.zone))}
            >
              {props.zoneNames.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.charAt(0).toUpperCase() + zone.slice(1)}
                </option>
              ))}
            </select>
            <FieldError id="machine-zone-erreur" message={errors.zone} />
          </label>
        </div>

        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="text-label mb-1 p-0">Étapes du tuto</legend>
          {draft.steps.map((step, index) => {
            const error = errors[`steps.${index}`]
            const errorId = `machine-etape-${index}-erreur`
            return (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <label className="flex min-w-0 grow flex-col gap-1.5">
                    <span className="text-caption text-ink-muted">Étape {index + 1}</span>
                    <textarea
                      rows={2}
                      value={step}
                      onChange={(event) => props.onStepChange(index, event.target.value)}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? errorId : undefined}
                      className={`${fieldClass(Boolean(error))} py-3`}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => props.onRemoveStep(index)}
                    aria-label={`Retirer l'étape ${index + 1}`}
                    className="rounded-pill text-ink-muted hover:text-ink focus-visible:outline-focus mt-6 inline-flex size-12 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <Icon name="x" />
                  </button>
                </div>
                <FieldError id={errorId} message={error} />
              </div>
            )
          })}
          <div>
            <Button variant="quiet" iconStart="plus" onClick={props.onAddStep}>
              Ajouter une étape
            </Button>
          </div>
        </fieldset>

        <label className="min-h-tap-min flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={draft.qrInstalled}
            onChange={(event) => props.onQrInstalledChange(event.target.checked)}
            className="accent-brand size-5"
          />
          <span className="text-body">QR code posé sur la machine</span>
        </label>

        {props.formError ? <Banner tone="danger" title={props.formError} /> : null}
        {props.savedMessage ? <Banner tone="success" title={props.savedMessage} /> : null}

        <Button type="submit" block disabled={props.isSaving}>
          {props.isSaving ? 'Enregistrement…' : props.isNew ? 'Ajouter la machine' : 'Enregistrer'}
        </Button>
      </form>

      <MachineGuidePreview {...props.preview} />

      {props.usages.length > 0 ? (
        <section aria-labelledby="reglages-titre" className="flex flex-col gap-3">
          <h3 id="reglages-titre" className="text-headline m-0">
            Réglages conseillés
          </h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {props.usages.map((usage) => (
              <li key={`${usage.programName}-${usage.exerciseName}`} className="bg-surface-100 rounded-md p-4">
                <span className="text-caption text-ink-muted block">{usage.programName}</span>
                <span className="text-body block">
                  {usage.settings.map((setting) => `${setting.label} : ${setting.value}`).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="qr-titre" className="flex flex-col gap-3">
        <h3 id="qr-titre" className="text-headline m-0">
          QR code de la machine
        </h3>
        {props.qr ? (
          <div className="flex flex-wrap items-center gap-4">
            <QrCode value={props.qr.value} label={props.qr.label} size={128} />
            <Button variant="secondary" iconStart="printer" onClick={props.onPrintQr}>
              Imprimer ce QR
            </Button>
          </div>
        ) : (
          <p className="text-body text-ink-muted m-0">Le QR code apparaît une fois la machine ajoutée.</p>
        )}
      </section>
    </aside>
  )
}
