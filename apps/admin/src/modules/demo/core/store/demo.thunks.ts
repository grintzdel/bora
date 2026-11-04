import { createEffectThunk } from '../../../app/create-effect-thunk'

export const resetDemoThunk = createEffectThunk('demo/reset', (_: void, { gateways }) => gateways.demo.reset())
