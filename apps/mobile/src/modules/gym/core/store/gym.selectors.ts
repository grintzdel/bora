import type { RootState } from '../../../app/store'

export const selectGym = (state: RootState) => state.gym.gym.data

export const selectMachine = (state: RootState) => state.gym.machine
