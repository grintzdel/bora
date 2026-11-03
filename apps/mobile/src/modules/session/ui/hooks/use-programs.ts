import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectPrograms } from '../../core/store/session.selectors'
import { fetchProgramsThunk } from '../../core/store/session.thunks'
import { formatProgramLine } from '../format/session-labels'

export const usePrograms = () => {
  const dispatch = useAppDispatch()
  const programs = useAppSelector(selectPrograms)

  useEffect(() => {
    void dispatch(fetchProgramsThunk())
  }, [dispatch])

  return {
    programs: (programs.data ?? []).map((program) => ({
      id: program.id,
      name: program.name,
      summary: `${program.exercises.length} exercices · ${formatProgramLine(program).split(' · ').slice(1).join(' · ')}`,
      exercises: program.exercises.map((exercise) => exercise.name),
    })),
  }
}
