import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectDoneSessions, selectUpcomingSessions } from '../../core/store/session.selectors'
import { fetchSessionsThunk } from '../../core/store/session.thunks'
import { toSessionCardView } from './session-view'

export const useSessionsList = () => {
  const dispatch = useAppDispatch()
  const upcoming = useAppSelector(selectUpcomingSessions)
  const done = useAppSelector(selectDoneSessions)

  useEffect(() => {
    void dispatch(fetchSessionsThunk())
  }, [dispatch])

  return {
    upcoming: upcoming.map((session) => ({ ...toSessionCardView(session), partnerAbsent: session.partnerAbsent })),
    done: done.map(toSessionCardView),
  }
}
