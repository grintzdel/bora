import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../../../app/store'
import { SessionStatus } from '../domain/constants/session-status.constant'
import { nextWorkoutStep } from '../domain/workout-progress.domain-model'

const isUpcoming = (status: SessionStatus) => status === SessionStatus.CONFIRMED || status === SessionStatus.PENDING

export const selectSessions = (state: RootState) => state.session.sessions

const selectSessionList = (state: RootState) => state.session.sessions.data

export const selectUpcomingSessions = createSelector([selectSessionList], (sessions) =>
  (sessions ?? []).filter((session) => isUpcoming(session.status))
)

export const selectDoneSessions = createSelector([selectSessionList], (sessions) =>
  (sessions ?? []).filter((session) => session.status === SessionStatus.DONE)
)

export const selectNextSession = (state: RootState) => selectUpcomingSessions(state)[0] ?? null

export const selectFollowingSession = (state: RootState) => selectUpcomingSessions(state)[1] ?? null

export const selectSessionById = (state: RootState, sessionId: string) =>
  state.session.sessions.data?.find((session) => session.id === sessionId) ?? null

export const selectStats = (state: RootState) => state.session.stats.data

export const selectPrograms = (state: RootState) => state.session.programs

export const selectCompletion = (state: RootState) => state.session.completion

export const selectWorkoutView = createSelector(
  [selectSessionById, (state: RootState) => state.session.workout],
  (session, progress) => {
    if (!session || progress?.sessionId !== session.id) return null
    const exercise = session.program.exercises[progress.exerciseIndex]
    if (!exercise) return null
    return {
      session,
      exercise,
      exerciseNumber: progress.exerciseIndex + 1,
      exerciseCount: session.program.exercises.length,
      setNumber: progress.setIndex + 1,
      setCount: exercise.sets,
      isLastStep: nextWorkoutStep(progress, session.program) === null,
    }
  }
)
