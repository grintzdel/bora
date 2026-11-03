import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { resetDemoThunk } from '../../../demo/core/store/demo.thunks'
import { type AsyncState, failed, idle, loaded, loading } from '../../../shared/store/async-state'
import type { DuoStats, Program, Session } from '../domain/session.domain-model'
import { nextWorkoutStep, startWorkout, type WorkoutProgress } from '../domain/workout-progress.domain-model'
import { completeSessionThunk, fetchProgramsThunk, fetchSessionsThunk, fetchStatsThunk } from './session.thunks'

type SessionState = {
  readonly sessions: AsyncState<ReadonlyArray<Session>>
  readonly programs: AsyncState<ReadonlyArray<Program>>
  readonly stats: AsyncState<DuoStats>
  readonly workout: WorkoutProgress | null
  readonly completion: AsyncState<string>
}

const initialState: SessionState = {
  sessions: idle(),
  programs: idle(),
  stats: idle(),
  workout: null,
  completion: idle(),
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    workoutStarted: (state, { payload: sessionId }: PayloadAction<string>) =>
      state.workout?.sessionId === sessionId ? state : { ...state, workout: startWorkout(sessionId) },
    workoutSetCompleted: (state) => {
      if (!state.workout) return state
      const { sessionId } = state.workout
      const session = state.sessions.data?.find((candidate) => candidate.id === sessionId)
      const next = session ? nextWorkoutStep(state.workout, session.program) : null
      return next ? { ...state, workout: next } : state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionsThunk.pending, (state) => ({ ...state, sessions: loading(state.sessions) }))
      .addCase(fetchSessionsThunk.fulfilled, (state, { payload }) => ({ ...state, sessions: loaded(payload) }))
      .addCase(fetchSessionsThunk.rejected, (state, { payload }) => ({
        ...state,
        sessions: failed(state.sessions, payload),
      }))
      .addCase(fetchProgramsThunk.pending, (state) => ({ ...state, programs: loading(state.programs) }))
      .addCase(fetchProgramsThunk.fulfilled, (state, { payload }) => ({ ...state, programs: loaded(payload) }))
      .addCase(fetchProgramsThunk.rejected, (state, { payload }) => ({
        ...state,
        programs: failed(state.programs, payload),
      }))
      .addCase(fetchStatsThunk.pending, (state) => ({ ...state, stats: loading(state.stats) }))
      .addCase(fetchStatsThunk.fulfilled, (state, { payload }) => ({ ...state, stats: loaded(payload) }))
      .addCase(fetchStatsThunk.rejected, (state, { payload }) => ({ ...state, stats: failed(state.stats, payload) }))
      .addCase(completeSessionThunk.pending, (state) => ({ ...state, completion: loading(idle<string>()) }))
      .addCase(completeSessionThunk.fulfilled, (state, { meta }) => ({
        ...state,
        workout: null,
        completion: loaded(meta.arg),
      }))
      .addCase(completeSessionThunk.rejected, (state, { payload }) => ({
        ...state,
        completion: failed(state.completion, payload),
      }))
      .addCase(resetDemoThunk.fulfilled, () => initialState)
  },
})

export const { workoutStarted, workoutSetCompleted } = sessionSlice.actions
