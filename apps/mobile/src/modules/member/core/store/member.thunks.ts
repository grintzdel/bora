import { createEffectThunk } from '../../../app/create-effect-thunk'
import type { Profile } from '../domain/member.domain-model'

export const fetchCurrentMemberThunk = createEffectThunk('member/fetchCurrent', (_: void, { gateways }) =>
  gateways.member.getCurrent()
)

export const saveProfileThunk = createEffectThunk('member/saveProfile', (profile: Profile, { gateways }) =>
  gateways.member.updateProfile(profile)
)
