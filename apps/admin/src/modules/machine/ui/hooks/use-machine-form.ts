import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { draftErrors, type Machine, type MachineDraft } from '../../core/domain/machine.domain-model'
import { selectMachineSave } from '../../core/store/machine.selectors'
import { saveMachineThunk } from '../../core/store/machine.thunks'
import { formatSaveError } from '../format/machine-labels'
import type { MachineEditorTarget } from './use-machines'

const DEFAULT_VIDEO_SECONDS = 20

const toDraft = (machine: Machine | null, zoneNames: ReadonlyArray<string>): MachineDraft =>
  machine
    ? {
        id: machine.id,
        name: machine.name,
        number: machine.number,
        zone: machine.zone,
        steps: [...machine.steps],
        qrInstalled: machine.qrInstalled,
      }
    : { id: null, name: '', number: '', zone: zoneNames.at(-1) ?? '', steps: [''], qrInstalled: false }

type MachineFormOptions = {
  readonly target: MachineEditorTarget | null
  readonly zoneNames: ReadonlyArray<string>
  readonly onSaved: (machineId: string) => void
}

export const useMachineForm = ({ target, zoneNames, onSaved }: MachineFormOptions) => {
  const dispatch = useAppDispatch()
  const save = useAppSelector(selectMachineSave)
  const key = target?.key ?? null
  const machine = target?.machine ?? null
  const [draftKey, setDraftKey] = useState(key)
  const [draft, setDraft] = useState(() => toDraft(machine, zoneNames))
  const [submitted, setSubmitted] = useState(false)

  if (key !== draftKey) {
    setDraftKey(key)
    setDraft(toDraft(machine, zoneNames))
    setSubmitted(false)
  }

  const serverError = save.error ? formatSaveError(save.error._tag) : null
  const errors: Readonly<Record<string, string>> = {
    ...(submitted ? draftErrors(draft) : {}),
    ...(serverError?.field ? { [serverError.field]: serverError.message } : {}),
  }

  const update = (patch: Partial<MachineDraft>) => setDraft((current) => ({ ...current, ...patch }))
  const filledSteps = draft.steps.map((step) => step.trim()).filter(Boolean)

  return {
    isOpen: target !== null,
    isNew: machine === null,
    title: machine ? machine.name : 'Nouvelle machine',
    draft,
    errors,
    formError: serverError && !serverError.field ? serverError.message : null,
    isSaving: save.isLoading,
    savedMessage:
      machine && save.data?.id === machine.id
        ? 'Enregistré. Les débutants voient cette version dès leur prochain scan.'
        : null,
    zoneNames,
    qr: machine ? { id: machine.id, value: machine.qrValue, label: `QR code de la machine ${machine.number}` } : null,
    usages: machine?.usages ?? [],
    preview: {
      tag: `Machine ${draft.number.trim() || '··'} · ${draft.zone}`,
      name: draft.name.trim() || 'Nom de la machine',
      videoLabel: `Vidéo du mouvement · ${machine?.videoSeconds ?? DEFAULT_VIDEO_SECONDS} s`,
      steps: filledSteps,
    },
    setName: (name: string) => update({ name }),
    setNumber: (number: string) => update({ number }),
    setZone: (zone: string) => update({ zone }),
    setQrInstalled: (qrInstalled: boolean) => update({ qrInstalled }),
    setStep: (index: number, value: string) =>
      update({ steps: draft.steps.map((step, position) => (position === index ? value : step)) }),
    addStep: () => update({ steps: [...draft.steps, ''] }),
    removeStep: (index: number) => update({ steps: draft.steps.filter((_, position) => position !== index) }),
    submit: async () => {
      setSubmitted(true)
      if (Object.keys(draftErrors(draft)).length > 0) return
      const result = await dispatch(saveMachineThunk(draft))
      if (saveMachineThunk.fulfilled.match(result)) onSaved(result.payload.id)
    },
  }
}
