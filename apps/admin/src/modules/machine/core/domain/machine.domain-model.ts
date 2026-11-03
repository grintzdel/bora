import * as Either from 'effect/Either'
import * as ParseResult from 'effect/ParseResult'
import * as Schema from 'effect/Schema'

import { literalOf } from '../../../shared/core/domain/literal-of'
import { LevelSchema } from '../../../shared/core/domain/shared.domain-model'
import { MachineStatus } from './constants/machine-status.constant'

export const MachineStatusSchema = literalOf(MachineStatus)

export const MachineSettingSchema = Schema.Struct({
  label: Schema.NonEmptyString,
  value: Schema.NonEmptyString,
})

export const MachineUsageSchema = Schema.Struct({
  programName: Schema.NonEmptyString,
  exerciseName: Schema.NonEmptyString,
  settings: Schema.Array(MachineSettingSchema),
})

export type MachineUsage = Schema.Schema.Type<typeof MachineUsageSchema>

export const MachineSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  number: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  zone: Schema.NonEmptyString,
  videoSeconds: Schema.Int.pipe(Schema.positive()),
  steps: Schema.Array(Schema.NonEmptyString),
  qrInstalled: Schema.Boolean,
  scansThisMonth: Schema.NonNegativeInt,
  status: MachineStatusSchema,
  qrValue: Schema.NonEmptyString,
  usages: Schema.Array(MachineUsageSchema),
})

export type Machine = Schema.Schema.Type<typeof MachineSchema>

export const GuidedProgramSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  level: LevelSchema,
  durationMinutes: Schema.Int.pipe(Schema.positive()),
  exercises: Schema.Array(
    Schema.Struct({ name: Schema.NonEmptyString, machineNumber: Schema.NullOr(Schema.NonEmptyString) })
  ),
})

export type GuidedProgram = Schema.Schema.Type<typeof GuidedProgramSchema>

export const MachinesOverviewSchema = Schema.Struct({
  zones: Schema.Array(Schema.Struct({ name: Schema.NonEmptyString, machines: Schema.Array(MachineSchema) })),
  programs: Schema.Array(GuidedProgramSchema),
})

export type MachinesOverview = Schema.Schema.Type<typeof MachinesOverviewSchema>

export const QrSheetSchema = Schema.Struct({
  gymName: Schema.NonEmptyString,
  cards: Schema.Array(
    Schema.Struct({
      id: Schema.NonEmptyString,
      number: Schema.NonEmptyString,
      name: Schema.NonEmptyString,
      qrValue: Schema.NonEmptyString,
    })
  ),
})

export type QrSheet = Schema.Schema.Type<typeof QrSheetSchema>

const requiredText = (message: string) => Schema.Trim.pipe(Schema.nonEmptyString({ message: () => message }))

export const SaveMachineSchema = Schema.Struct({
  id: Schema.NullOr(Schema.NonEmptyString),
  name: requiredText('Donnez un nom à la machine.'),
  number: Schema.Trim.pipe(
    Schema.pattern(/^\d{2}$/, { message: () => 'Le numéro tient en deux chiffres, par exemple 07.' })
  ),
  zone: requiredText('Choisissez une zone.'),
  steps: Schema.Array(requiredText('Écrivez cette étape ou retirez-la.')),
  qrInstalled: Schema.Boolean,
})

export type SaveMachine = Schema.Schema.Type<typeof SaveMachineSchema>
export type MachineDraft = Schema.Schema.Encoded<typeof SaveMachineSchema>

export const machineStatusOf = ({
  steps,
  qrInstalled,
}: {
  readonly steps: ReadonlyArray<string>
  readonly qrInstalled: boolean
}): MachineStatus => {
  if (steps.length === 0) return MachineStatus.TUTORIAL_MISSING
  return qrInstalled ? MachineStatus.READY : MachineStatus.QR_MISSING
}

export const draftErrors = (draft: MachineDraft): Readonly<Record<string, string>> =>
  Either.match(Schema.decodeUnknownEither(SaveMachineSchema)(draft, { errors: 'all' }), {
    onRight: () => ({}),
    onLeft: (error) =>
      Object.fromEntries(
        ParseResult.ArrayFormatter.formatErrorSync(error)
          .toReversed()
          .map((issue) => [issue.path.join('.'), issue.message])
      ),
  })
