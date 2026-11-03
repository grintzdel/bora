import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AppRoute } from '../../../shared/ui/app-route.constant'
import { selectDemoAccount, selectSession } from '../../core/store/auth.selectors'
import { fetchDemoAccountThunk, signInThunk } from '../../core/store/auth.thunks'

export const useSignIn = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const account = useAppSelector(selectDemoAccount)
  const session = useAppSelector(selectSession)

  useEffect(() => {
    void dispatch(fetchDemoAccountThunk())
  }, [dispatch])

  return {
    gymName: account?.gymName ?? null,
    managerName: account?.managerName ?? null,
    isSigningIn: session.isLoading,
    error: session.error ? 'La connexion a échoué. Réessayez.' : null,
    signIn: async () => {
      const result = await dispatch(signInThunk())
      if (signInThunk.fulfilled.match(result)) router.push(AppRoute.DASHBOARD)
    },
  }
}
