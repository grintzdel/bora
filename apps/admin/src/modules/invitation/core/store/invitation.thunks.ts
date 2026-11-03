import { createEffectThunk } from '../../../app/create-effect-thunk'

export const fetchWelcomeKitThunk = createEffectThunk('invitation/fetchWelcomeKit', (_: void, { gateways }) =>
  gateways.invitation.getKit()
)
