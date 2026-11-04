import { useAppDispatch } from '../../../app/hooks'
import { resetDemoThunk } from '../../core/store/demo.thunks'

export const useResetDemo = () => {
  const dispatch = useAppDispatch()

  return {
    resetDemo: async () => {
      if (!window.confirm('Remettre toutes les données de la démo à leur état de départ ?')) return
      await dispatch(resetDemoThunk())
      window.location.reload()
    },
  }
}
