import { createAsyncThunk } from '@reduxjs/toolkit'
import * as Effect from 'effect/Effect'
import * as Exit from 'effect/Exit'

import { type SerializedError, serializeCause } from '../shared/store/async-state'
import type { AppExtra } from './app-extra'

export const createEffectThunk = <Returned, Arg = void>(
  type: string,
  program: (arg: Arg, extra: AppExtra) => Effect.Effect<Returned, unknown>
) =>
  createAsyncThunk<Returned, Arg, { extra: AppExtra; rejectValue: SerializedError }>(
    type,
    async (arg, { extra, rejectWithValue }) => {
      const exit = await Effect.runPromiseExit(program(arg, extra))
      return Exit.isSuccess(exit) ? exit.value : rejectWithValue(serializeCause(exit.cause))
    }
  )
