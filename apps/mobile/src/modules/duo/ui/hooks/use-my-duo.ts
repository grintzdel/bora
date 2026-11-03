import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUpcomingSessions } from '../../../session/core/store/session.selectors'
import { fetchSessionsThunk } from '../../../session/core/store/session.thunks'
import { formatSlot } from '../../../shared/ui/format/format-slot'
import { selectCurrentDuo } from '../../core/store/duo.selectors'
import { fetchCurrentDuoThunk } from '../../core/store/duo.thunks'
import { formatCommonGround, formatPartnerTag } from '../format/duo-labels'

export const useMyDuo = () => {
  const dispatch = useAppDispatch()
  const duo = useAppSelector(selectCurrentDuo)
  const upcoming = useAppSelector(selectUpcomingSessions)

  useEffect(() => {
    void dispatch(fetchCurrentDuoThunk())
    void dispatch(fetchSessionsThunk())
  }, [dispatch])

  const nextTogether = upcoming.find((session) => session.partner?.id === duo?.partner.id)

  return {
    duo: duo
      ? {
          partnerId: duo.partner.id,
          partnerName: duo.partner.displayName,
          partnerTag: formatPartnerTag(duo.partner),
          commonGround: duo.commonGround.map(formatCommonGround),
          nextTogether: nextTogether ? `${formatSlot(nextTogether.slot)} · ${nextTogether.program.name}` : null,
        }
      : null,
  }
}
