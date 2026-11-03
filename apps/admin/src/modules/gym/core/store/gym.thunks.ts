import { createEffectThunk } from '../../../app/create-effect-thunk'

export const fetchDashboardThunk = createEffectThunk('gym/fetchDashboard', (_: void, { gateways }) =>
  gateways.gym.getDashboard()
)
