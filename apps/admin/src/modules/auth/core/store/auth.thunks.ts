import { createEffectThunk } from '../../../app/create-effect-thunk'

export const fetchDemoAccountThunk = createEffectThunk('auth/fetchDemoAccount', (_: void, { gateways }) =>
  gateways.auth.getDemoAccount()
)

export const signInThunk = createEffectThunk('auth/signIn', (_: void, { gateways }) => gateways.auth.signIn())

export const fetchSessionThunk = createEffectThunk('auth/fetchSession', (_: void, { gateways }) =>
  gateways.auth.getSession()
)
