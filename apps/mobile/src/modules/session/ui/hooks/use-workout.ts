import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectCurrentMember } from '../../../member/core/store/member.selectors'
import { fetchCurrentMemberThunk } from '../../../member/core/store/member.thunks'
import { selectCompletion, selectSessions, selectWorkoutView } from '../../core/store/session.selectors'
import { workoutSetCompleted, workoutStarted } from '../../core/store/session.slice'
import { completeSessionThunk, fetchSessionsThunk } from '../../core/store/session.thunks'
import { formatEffort } from '../format/session-labels'

export const useWorkout = (sessionId: string) => {
  const dispatch = useAppDispatch()
  const sessions = useAppSelector(selectSessions)
  const view = useAppSelector((state) => selectWorkoutView(state, sessionId))
  const completion = useAppSelector(selectCompletion)
  const member = useAppSelector(selectCurrentMember)
  const sessionsLoaded = sessions.data !== null

  useEffect(() => {
    if (!sessionsLoaded) void dispatch(fetchSessionsThunk())
    void dispatch(fetchCurrentMemberThunk())
  }, [dispatch, sessionsLoaded])

  useEffect(() => {
    if (sessionsLoaded) dispatch(workoutStarted(sessionId))
  }, [dispatch, sessionId, sessionsLoaded])

  if (!view) return { workout: null, isCompleting: false, completeSet: async () => 'next' as const }

  const { session, exercise } = view
  const partner = session.partner

  return {
    workout: {
      title: session.program.name,
      subtitle: `Exercice ${view.exerciseNumber} sur ${view.exerciseCount}`,
      exerciseCount: view.exerciseCount,
      exerciseNumber: view.exerciseNumber,
      setLabel: `Série ${view.setNumber} sur ${view.setCount}`,
      name: exercise.name,
      effortLabel: formatEffort(exercise),
      settings: exercise.settings,
      machineId: exercise.machineId,
      duoTip: partner ? exercise.duoTip : null,
      presence:
        partner && member
          ? {
              memberName: member.displayName,
              partnerName: partner.displayName,
              message: `${partner.firstName} est avec toi`,
            }
          : null,
      partnerId: partner?.id ?? null,
      primaryLabel: view.isLastStep ? 'Terminer la séance' : 'Série terminée',
    },
    isCompleting: completion.isLoading,
    completeSet: async () => {
      if (!view.isLastStep) {
        dispatch(workoutSetCompleted())
        return 'next' as const
      }
      const result = await dispatch(completeSessionThunk(sessionId))
      return completeSessionThunk.fulfilled.match(result) ? ('finished' as const) : ('next' as const)
    },
  }
}
