export type WorkoutProgress = {
  readonly sessionId: string
  readonly exerciseIndex: number
  readonly setIndex: number
}

type ProgramShape = { readonly exercises: ReadonlyArray<{ readonly sets: number }> }

export const startWorkout = (sessionId: string): WorkoutProgress => ({ sessionId, exerciseIndex: 0, setIndex: 0 })

export const nextWorkoutStep = (progress: WorkoutProgress, program: ProgramShape): WorkoutProgress | null => {
  const exercise = program.exercises[progress.exerciseIndex]
  if (!exercise) return null
  if (progress.setIndex + 1 < exercise.sets) return { ...progress, setIndex: progress.setIndex + 1 }
  if (progress.exerciseIndex + 1 < program.exercises.length) {
    return { ...progress, exerciseIndex: progress.exerciseIndex + 1, setIndex: 0 }
  }
  return null
}
