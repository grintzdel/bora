import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import type { Level } from '../../../shared/core/domain/constants/level.constant'
import type { Availability } from '../../core/domain/constants/availability.constant'
import type { Goal } from '../../core/domain/constants/goal.constant'
import type { Profile } from '../../core/domain/member.domain-model'
import { selectCurrentMember, selectProfileSave } from '../../core/store/member.selectors'
import { fetchCurrentMemberThunk, saveProfileThunk } from '../../core/store/member.thunks'

export const useEditProfile = () => {
  const dispatch = useAppDispatch()
  const member = useAppSelector(selectCurrentMember)
  const save = useAppSelector(selectProfileSave)
  const [draft, setDraft] = useState<Profile | null>(null)

  useEffect(() => {
    void dispatch(fetchCurrentMemberThunk())
  }, [dispatch])

  const profile = draft ?? member?.profile ?? null
  const edit = (change: Partial<Profile>) => {
    if (profile) setDraft({ ...profile, ...change })
  }

  return {
    profile,
    isSaving: save.isLoading,
    canSave: profile !== null && profile.availability.length > 0,
    missingSlotHint: profile && profile.availability.length === 0 ? "Choisis au moins un créneau d'abord" : null,
    selectLevel: (level: Level) => edit({ level }),
    selectGoal: (goal: Goal) => edit({ goal }),
    toggleAvailability: (availability: Availability) =>
      edit({
        availability: profile?.availability.includes(availability)
          ? profile.availability.filter((current) => current !== availability)
          : [...(profile?.availability ?? []), availability],
      }),
    toggleSameGenderDuo: () => edit({ sameGenderDuo: !profile?.sameGenderDuo }),
    save: async () => {
      if (!profile) return false
      const result = await dispatch(saveProfileThunk(profile))
      return saveProfileThunk.fulfilled.match(result)
    },
  }
}
