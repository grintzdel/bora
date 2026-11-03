import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectGym } from '../../../gym/core/store/gym.selectors'
import { fetchGymThunk } from '../../../gym/core/store/gym.thunks'
import { selectCurrentMember } from '../../../member/core/store/member.selectors'
import { fetchCurrentMemberThunk } from '../../../member/core/store/member.thunks'
import { countInWords } from '../../../shared/ui/format/count-in-words'
import { formatSlot } from '../../../shared/ui/format/format-slot'
import { genderize } from '../../../shared/ui/format/genderize'
import { type ProposalKind } from '../../core/domain/constants/proposal-kind.constant'
import { selectCurrentProposal, selectProposalRequest, selectProposals } from '../../core/store/duo.selectors'
import { nextProposalShown } from '../../core/store/duo.slice'
import { fetchDuoProposalsThunk, proposeDuoThunk } from '../../core/store/duo.thunks'
import { formatCommonGround, formatPartnerTag } from '../format/duo-labels'

export const useDuoProposals = (kind: ProposalKind) => {
  const dispatch = useAppDispatch()
  const proposals = useAppSelector(selectProposals)
  const proposal = useAppSelector(selectCurrentProposal)
  const request = useAppSelector(selectProposalRequest)
  const gym = useAppSelector(selectGym)
  const member = useAppSelector(selectCurrentMember)

  useEffect(() => {
    void dispatch(fetchDuoProposalsThunk(kind))
    void dispatch(fetchGymThunk())
    void dispatch(fetchCurrentMemberThunk())
  }, [dispatch, kind])

  const count = proposals.data?.length ?? 0
  const alone = member ? genderize(member.gender, { female: 'la seule', male: 'le seul' }) : 'seul'
  const tonightSlot = proposal ? formatSlot(proposal.firstSession.slot).split(' ').slice(1).join(' ') : ''

  return {
    isLoading: proposals.isLoading,
    intro:
      kind === 'tonight'
        ? `${countInWords(count)} débutant${count > 1 ? 's' : ''} de ta salle vien${count > 1 ? 'nent' : 't'} à ${tonightSlot}.`
        : gym
          ? `${gym.newMembersThisMonth} nouveaux ont rejoint ta salle ce mois-ci. Tu n'es pas ${alone} à débuter.`
          : '',
    proposal: proposal
      ? {
          id: proposal.id,
          partnerFirstName: proposal.partner.firstName,
          partnerName: proposal.partner.displayName,
          partnerTag: formatPartnerTag(proposal.partner),
          commonGround: proposal.commonGround.map(formatCommonGround),
          firstSession: `${formatSlot(proposal.firstSession.slot)} · ${proposal.firstSession.programName}`,
          consent: `Le duo se forme seulement si ${proposal.partner.firstName} dit oui, ${genderize(proposal.partner.gender, { female: 'elle', male: 'lui' })} aussi.`,
          waiting: `${proposal.partner.firstName} a reçu ta proposition. Ça prend quelques secondes.`,
        }
      : null,
    hasAlternatives: count > 1,
    isProposing: request.isLoading,
    error: request.error ? "La proposition n'est pas partie. Réessaie." : null,
    showNextProposal: () => dispatch(nextProposalShown()),
    propose: async () => {
      if (!proposal) return false
      const result = await dispatch(proposeDuoThunk(proposal.id))
      return proposeDuoThunk.fulfilled.match(result)
    },
  }
}
