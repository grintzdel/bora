import { createEffectThunk } from '../../../app/create-effect-thunk'
import type { MachineDraft } from '../domain/machine.domain-model'

export const fetchMachinesThunk = createEffectThunk('machine/fetchAll', (_: void, { gateways }) =>
  gateways.machine.list()
)

export const saveMachineThunk = createEffectThunk('machine/save', (draft: MachineDraft, { gateways }) =>
  gateways.machine.save(draft)
)

export const deleteMachineThunk = createEffectThunk('machine/delete', (machineId: string, { gateways }) =>
  gateways.machine.delete(machineId)
)

export const fetchQrSheetThunk = createEffectThunk(
  'machine/fetchQrSheet',
  (machineIds: ReadonlyArray<string> | null, { gateways }) => gateways.machine.getQrSheet(machineIds)
)
