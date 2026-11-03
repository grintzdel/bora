import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectProposals } from '../../../duo/core/store/duo.selectors'
import { fetchDuoProposalsThunk } from '../../../duo/core/store/duo.thunks'
import { countInWords } from '../../../shared/ui/format/count-in-words'
import { formatSlot, formatSlotTitle, formatWeekday } from '../../../shared/ui/format/format-slot'
import { PartnerAbsenceChoice } from '../../core/domain/constants/partner-absence-choice.constant'
import { selectSessionById, selectUpcomingSessions } from '../../core/store/session.selectors'
import { fetchSessionsThunk, resolvePartnerAbsenceThunk } from '../../core/store/session.thunks'

export const usePartnerAbsent = (sessionId: string) => {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => selectSessionById(state, sessionId))
  const upcoming = useAppSelector(selectUpcomingSessions)
  const tonightProposals = useAppSelector(selectProposals)
  const [choice, setChoice] = useState<PartnerAbsenceChoice>(PartnerAbsenceChoice.NEW_DUO)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    void dispatch(fetchDuoProposalsThunk('tonight'))
    void dispatch(fetchSessionsThunk())
  }, [dispatch])

  const partnerName = session?.partner?.firstName ?? 'Ton duo'
  const later = upcoming.find(
    (candidate) => candidate.id !== sessionId && candidate.partner?.id === session?.partner?.id
  )
  const tonightCount = tonightProposals.data?.length ?? 0
  const time = session ? formatSlot(session.slot).split(' ').slice(1).join(' ') : ''

  const options = [
    {
      value: PartnerAbsenceChoice.NEW_DUO,
      title: 'Un autre duo pour ce soir',
      description: `${countInWords(tonightCount)} débutant${tonightCount > 1 ? 's' : ''} de ta salle vien${tonightCount > 1 ? 'nent' : 't'} à ${time}.`,
      primaryLabel: 'Voir les duos de ce soir',
    },
    ...(later
      ? [
          {
            value: PartnerAbsenceChoice.RESCHEDULE,
            title: `Décaler à ${formatWeekday(later.slot.weekday)} avec ${partnerName}`,
            description: `On lui propose ${formatSlot(later.slot).toLowerCase()}.`,
            primaryLabel: `Proposer ${formatWeekday(later.slot.weekday)} à ${partnerName}`,
          },
        ]
      : []),
    {
      value: PartnerAbsenceChoice.GO_SOLO,
      title: 'Y aller quand même',
      description: 'Le programme te guide machine par machine.',
      primaryLabel: 'Commencer la séance',
    },
  ]

  return {
    context: session ? `${formatSlotTitle(session.slot)} · ${session.program.name}` : '',
    title: `${partnerName} ne peut pas venir ce soir`,
    footnote: `${partnerName} reste ton duo pour les prochaines séances.`,
    options,
    choice,
    selectChoice: setChoice,
    primaryLabel: options.find((option) => option.value === choice)?.primaryLabel ?? '',
    isSaving,
    confirm: async () => {
      if (choice === PartnerAbsenceChoice.NEW_DUO) return choice
      setIsSaving(true)
      await dispatch(resolvePartnerAbsenceThunk({ sessionId, choice }))
      setIsSaving(false)
      return choice
    },
  }
}
