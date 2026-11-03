import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectGym } from '../../../gym/core/store/gym.selectors'
import { fetchGymThunk } from '../../../gym/core/store/gym.thunks'
import { selectCurrentMember } from '../../../member/core/store/member.selectors'
import { fetchCurrentMemberThunk } from '../../../member/core/store/member.thunks'
import { formatSlotTitle } from '../../../shared/ui/format/format-slot'
import { selectFollowingSession, selectNextSession, selectStats } from '../../core/store/session.selectors'
import { fetchSessionsThunk, fetchStatsThunk } from '../../core/store/session.thunks'
import { formatStreak } from '../format/session-labels'
import { toSessionCardView } from './session-view'

export const useHome = () => {
  const dispatch = useAppDispatch()
  const member = useAppSelector(selectCurrentMember)
  const gym = useAppSelector(selectGym)
  const next = useAppSelector(selectNextSession)
  const following = useAppSelector(selectFollowingSession)
  const stats = useAppSelector(selectStats)

  useEffect(() => {
    void dispatch(fetchCurrentMemberThunk())
    void dispatch(fetchGymThunk())
    void dispatch(fetchSessionsThunk())
    void dispatch(fetchStatsThunk())
  }, [dispatch])

  return {
    gymName: gym?.name ?? '',
    greeting: member ? `Salut ${member.firstName}` : 'Salut',
    memberName: member?.displayName ?? '',
    next: next ? { ...toSessionCardView(next), partnerAbsent: next.partnerAbsent } : null,
    absence:
      next?.partnerAbsent && next.partner
        ? {
            title: `${next.partner.firstName} ne peut pas venir`,
            message: 'Ta séance reste prévue. On regarde ensemble ?',
          }
        : null,
    following: following
      ? {
          when: formatSlotTitle(following.slot),
          detail: following.partner
            ? `${following.program.name} · avec ${following.partner.firstName}`
            : following.program.name,
          status: following.status,
        }
      : null,
    stats: stats ? { count: stats.duoSessionsDone, cheer: formatStreak(stats.streakWeeks) } : null,
  }
}
