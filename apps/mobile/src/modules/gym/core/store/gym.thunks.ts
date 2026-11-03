import { createEffectThunk } from '../../../app/create-effect-thunk'

export const fetchGymThunk = createEffectThunk('gym/fetchCurrent', (_: void, { gateways }) => gateways.gym.getCurrent())

export const fetchMachineThunk = createEffectThunk('gym/fetchMachine', (machineId: string, { gateways }) =>
  gateways.gym.getMachine(machineId)
)
