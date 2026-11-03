import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AppRoute } from '../../../shared/ui/app-route.constant'
import type { Machine } from '../../core/domain/machine.domain-model'
import { selectMachineSave, selectMachinesOverview } from '../../core/store/machine.selectors'
import { qrSheetSelected, saveCleared } from '../../core/store/machine.slice'
import { fetchMachinesThunk } from '../../core/store/machine.thunks'
import {
  describeMachinesToEquip,
  formatMachineCaption,
  formatProgramLevel,
  formatProgramSummary,
  formatZoneTitle,
  MachineStatusTag,
} from '../format/machine-labels'

export const NEW_MACHINE = 'new'

export type MachineEditorTarget = { readonly key: string; readonly machine: Machine | null }

const actionOf = (machine: Machine) => {
  if (machine.status === 'tutorial-missing') return { kind: 'edit', label: 'Ajouter le tuto' } as const
  if (machine.status === 'qr-missing') return { kind: 'print', label: 'Imprimer le QR' } as const
  return { kind: 'edit', label: 'Modifier' } as const
}

export const useMachines = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data, error } = useAppSelector(selectMachinesOverview)
  const saved = useAppSelector(selectMachineSave).data
  const [editingKey, setEditingKey] = useState<string | null>(null)

  useEffect(() => {
    void dispatch(fetchMachinesThunk())
  }, [dispatch])

  const machines = data?.zones.flatMap((zone) => zone.machines) ?? []

  const openEditor = (key: string) => {
    dispatch(saveCleared())
    setEditingKey(key)
  }

  const printQr = (machineIds: ReadonlyArray<string> | null) => {
    dispatch(qrSheetSelected(machineIds))
    router.push(AppRoute.MACHINE_QR_SHEET)
  }

  const editing: MachineEditorTarget | null =
    editingKey === null
      ? null
      : {
          key: editingKey,
          machine: machines.find((machine) => machine.id === editingKey) ?? (saved?.id === editingKey ? saved : null),
        }

  return {
    isLoading: data === null && error === null,
    loadError: error && data === null ? "Les machines n'ont pas pu être chargées." : null,
    retry: () => void dispatch(fetchMachinesThunk()),
    toEquip: describeMachinesToEquip(machines),
    zoneNames: data?.zones.map((zone) => zone.name) ?? [],
    zones: (data?.zones ?? []).map((zone) => ({
      name: zone.name,
      title: formatZoneTitle(zone.name, zone.machines.length),
      machines: zone.machines.map((machine) => ({
        id: machine.id,
        name: machine.name,
        caption: formatMachineCaption(machine),
        tag: MachineStatusTag[machine.status],
        action: actionOf(machine),
        isEditing: machine.id === editingKey,
      })),
    })),
    programs: (data?.programs ?? []).map((program) => ({
      id: program.id,
      name: program.name,
      level: formatProgramLevel(program.level),
      summary: formatProgramSummary(program.exercises.length, program.durationMinutes),
      exercises: program.exercises.map((exercise) =>
        exercise.machineNumber ? `${exercise.machineNumber} · ${exercise.name}` : exercise.name
      ),
    })),
    editing,
    edit: openEditor,
    add: () => openEditor(NEW_MACHINE),
    showSaved: (machineId: string) => setEditingKey(machineId),
    closeEditor: () => setEditingKey(null),
    printOne: (machineId: string) => printQr([machineId]),
    printAll: () => printQr(null),
  }
}
