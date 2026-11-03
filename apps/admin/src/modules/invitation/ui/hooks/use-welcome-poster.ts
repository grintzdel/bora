import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectWelcomeKit } from '../../core/store/invitation.selectors'
import { fetchWelcomeKitThunk } from '../../core/store/invitation.thunks'

export const useWelcomePoster = () => {
  const dispatch = useAppDispatch()
  const { data: kit } = useAppSelector(selectWelcomeKit)

  useEffect(() => {
    void dispatch(fetchWelcomeKitThunk())
  }, [dispatch])

  return {
    poster: kit ? { gymName: kit.gymName, inviteUrl: kit.inviteUrl } : null,
    print: () => window.print(),
  }
}
