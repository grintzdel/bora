import { Alert } from 'react-native'

import { useAppDispatch } from '../../../app/hooks'
import { resetDemoThunk, simulatePartnerAbsenceThunk } from '../../core/store/demo.thunks'

export const useDemoMenu = ({ onReset }: { readonly onReset: () => void }) => {
  const dispatch = useAppDispatch()

  return {
    open: () =>
      Alert.alert('Démo', 'Outils réservés à la présentation.', [
        {
          text: 'Simuler : le duo ne vient pas ce soir',
          onPress: () => void dispatch(simulatePartnerAbsenceThunk()),
        },
        {
          text: 'Réinitialiser la démo',
          style: 'destructive',
          onPress: () =>
            void dispatch(resetDemoThunk()).then(() => {
              onReset()
            }),
        },
        { text: 'Annuler', style: 'cancel' },
      ]),
  }
}
