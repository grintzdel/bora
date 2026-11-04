import type { Level } from '../../../shared/core/domain/constants/level.constant'
import type { TagTone } from '../../../shared/ui/components/Tag'
import type { MachineStatus } from '../../core/domain/constants/machine-status.constant'

export const MachineStatusTag: Record<MachineStatus, { readonly label: string; readonly tone: TagTone }> = {
  ready: { label: 'QR posé', tone: 'success' },
  'qr-missing': { label: 'QR à poser', tone: 'warning' },
  'tutorial-missing': { label: 'Tuto manquant', tone: 'warning' },
}

type CaptionInput = {
  readonly number: string
  readonly scansThisMonth: number
  readonly qrInstalled: boolean
  readonly status: MachineStatus
}

const scansLabel = (scans: number) => {
  if (scans === 0) return 'pas encore scannée ce mois'
  return `scannée ${scans} fois ce mois`
}

export const formatMachineCaption = ({ number, scansThisMonth, qrInstalled, status }: CaptionInput) => {
  const detail = {
    ready: scansLabel(scansThisMonth),
    'qr-missing': 'tuto prêt',
    'tutorial-missing': qrInstalled ? 'QR posé' : 'QR à poser',
  }[status]
  return `Machine ${number} · ${detail}`
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const plural = (count: number, word: string) => `${count} ${word}${count > 1 ? 's' : ''}`

export const formatZoneTitle = (zone: string, count: number) => `${capitalize(zone)} · ${plural(count, 'machine')}`

const joinFrench = (parts: ReadonlyArray<string>) =>
  parts.length <= 1 ? (parts[0] ?? '') : `${parts.slice(0, -1).join(', ')} et ${parts.at(-1) ?? ''}`

export const describeMachinesToEquip = (
  machines: ReadonlyArray<{ readonly name: string; readonly status: MachineStatus }>
) => {
  const pending = machines.filter((machine) => machine.status !== 'ready')
  if (pending.length === 0) return null
  return {
    title: `Il reste ${plural(pending.length, 'machine')} à équiper.`,
    details: `${joinFrench(
      pending.map((machine) =>
        machine.status === 'qr-missing'
          ? `${machine.name} n'a pas encore son QR code`
          : `${machine.name} attend son tuto`
      )
    )}.`,
  }
}

export const describeMachineDeletion = (usages: ReadonlyArray<{ readonly programName: string }>) => {
  const programs = [...new Set(usages.map((usage) => usage.programName))]
  const qr = 'Son QR code ne mènera plus à aucun tuto.'
  if (programs.length === 0) return qr
  return `${qr} ${joinFrench(programs)} ${programs.length > 1 ? 'gardent' : 'garde'} l'exercice, sans machine.`
}

const LevelLabel: Record<Level, string> = {
  beginner: 'Niveau débutant',
  returning: 'Reprise en douceur',
  regular: 'Niveau régulier',
}

export const formatProgramLevel = (level: Level) => LevelLabel[level]

export const formatProgramSummary = (exerciseCount: number, durationMinutes: number) =>
  `${plural(exerciseCount, 'exercice')} · ${durationMinutes} min`

export const formatSaveError = (tag: string) =>
  tag === 'MachineNumberTakenError'
    ? { field: 'number', message: 'Ce numéro est déjà pris par une autre machine.' }
    : { field: null, message: "L'enregistrement n'a pas abouti. Réessayez." }
