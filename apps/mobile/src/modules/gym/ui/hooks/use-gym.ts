import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectGym } from '../../core/store/gym.selectors'
import { fetchGymThunk } from '../../core/store/gym.thunks'

export const useGym = () => {
  const dispatch = useAppDispatch()
  const gym = useAppSelector(selectGym)

  useEffect(() => {
    void dispatch(fetchGymThunk())
  }, [dispatch])

  return { gymName: gym?.name ?? null }
}
