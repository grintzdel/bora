import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectQrSheet, selectQrSheetSelection } from '../../core/store/machine.selectors'
import { fetchQrSheetThunk } from '../../core/store/machine.thunks'

export const useMachineQrSheet = () => {
  const dispatch = useAppDispatch()
  const selection = useAppSelector(selectQrSheetSelection)
  const { data, error } = useAppSelector(selectQrSheet)

  useEffect(() => {
    void dispatch(fetchQrSheetThunk(selection))
  }, [dispatch, selection])

  const cards = data?.cards ?? []

  return {
    isLoading: data === null && error === null,
    error: error ? "La planche n'a pas pu être préparée. Revenez aux machines et réessayez." : null,
    title: selection === null ? 'Tous les QR codes' : cards.length === 1 ? 'QR code à imprimer' : 'QR codes à imprimer',
    subtitle: `${cards.length} QR code${cards.length > 1 ? 's' : ''} sur une planche A4. Découpez en suivant les pointillés.`,
    gymName: data?.gymName ?? '',
    cards: cards.map((card) => ({
      id: card.id,
      numberLabel: `Machine ${card.number}`,
      name: card.name,
      qrValue: card.qrValue,
      qrLabel: `QR code de la machine ${card.number}, ${card.name}`,
    })),
    print: () => window.print(),
  }
}
