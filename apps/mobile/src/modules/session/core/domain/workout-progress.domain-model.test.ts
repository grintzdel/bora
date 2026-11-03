import { describe, expect, it } from 'vitest'

import { nextWorkoutStep, startWorkout } from './workout-progress.domain-model'

const program = { exercises: [{ sets: 1 }, { sets: 3 }] }

describe('nextWorkoutStep', () => {
  it('starts on the first set of the first exercise', () => {
    expect(startWorkout('s1')).toEqual({ sessionId: 's1', exerciseIndex: 0, setIndex: 0 })
  })

  it('moves to the next exercise after the last set', () => {
    expect(nextWorkoutStep({ sessionId: 's1', exerciseIndex: 0, setIndex: 0 }, program)).toEqual({
      sessionId: 's1',
      exerciseIndex: 1,
      setIndex: 0,
    })
  })

  it('moves to the next set within an exercise', () => {
    expect(nextWorkoutStep({ sessionId: 's1', exerciseIndex: 1, setIndex: 0 }, program)).toEqual({
      sessionId: 's1',
      exerciseIndex: 1,
      setIndex: 1,
    })
  })

  it('ends after the last set of the last exercise', () => {
    expect(nextWorkoutStep({ sessionId: 's1', exerciseIndex: 1, setIndex: 2 }, program)).toBeNull()
  })
})
