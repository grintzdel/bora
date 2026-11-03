import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectMachine } from '../../core/store/gym.selectors'
import { fetchMachineThunk } from '../../core/store/gym.thunks'

export const useMachine = (machineId: string) => {
  const dispatch = useAppDispatch()
  const { data: machine, isLoading, error } = useAppSelector(selectMachine)

  useEffect(() => {
    void dispatch(fetchMachineThunk(machineId))
  }, [dispatch, machineId])

  const ready = machine !== null && machine.id === machineId

  return {
    status: error ? 'QR code inconnu' : ready ? 'QR code reconnu' : 'Lecture du QR code…',
    isLoading,
    guide: ready
      ? {
          tag: `Machine ${machine.number} · ${machine.zone}`,
          name: machine.name,
          videoLabel: `Vidéo du mouvement · ${machine.videoSeconds} s`,
          steps: machine.steps,
        }
      : null,
  }
}
