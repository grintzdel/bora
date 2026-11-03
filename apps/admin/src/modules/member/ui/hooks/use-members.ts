import { useDeferredValue, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { MemberFilter } from '../../core/domain/constants/member-filter.constant'
import { selectDuoSuggestion, selectMemberList, selectSentProposal } from '../../core/store/member.selectors'
import { proposalDismissed } from '../../core/store/member.slice'
import { fetchDuoSuggestionThunk, fetchMembersThunk, proposeDuoThunk } from '../../core/store/member.thunks'
import type { DuoProposalPanelView } from '../components/DuoProposalPanel'
import type { MemberFilterChip } from '../components/MemberFilters'
import { describeParty, describeSuggestion, formatMonth, toMemberRowView } from '../format/member-view'

const isMemberFilter = (value: string): value is MemberFilter => Object.values<string>(MemberFilter).includes(value)

export const useMembers = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<MemberFilter>(MemberFilter.ALL)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const deferredSearch = useDeferredValue(search)
  const list = useAppSelector(selectMemberList)
  const suggestion = useAppSelector(selectDuoSuggestion)
  const sent = useAppSelector(selectSentProposal)

  useEffect(() => {
    void dispatch(fetchMembersThunk({ search: deferredSearch, filter }))
  }, [dispatch, deferredSearch, filter])

  const members = list.data?.members ?? []
  const selected =
    members.find((member) => member.id === selectedId && member.status === 'waiting') ??
    members.find((member) => member.status === 'waiting') ??
    null
  const selectedMemberId = selected?.id ?? null

  useEffect(() => {
    if (selectedMemberId) void dispatch(fetchDuoSuggestionThunk(selectedMemberId))
  }, [dispatch, selectedMemberId])

  const counts = list.data?.counts
  const chips: ReadonlyArray<MemberFilterChip> = [
    { value: MemberFilter.ALL, label: `Tous · ${counts?.all ?? 0}` },
    { value: MemberFilter.WAITING, label: `Sans duo · ${counts?.waiting ?? 0}` },
    { value: MemberFilter.FRAGILE, label: `Duo fragile · ${counts?.fragile ?? 0}` },
  ].map((chip) => ({ ...chip, selected: chip.value === filter }))

  const currentSuggestion = suggestion.memberId === selectedMemberId ? suggestion : null
  const proposal = currentSuggestion?.data ?? null

  const panel: DuoProposalPanelView = {
    member: selected
      ? { name: selected.displayName, summary: `${selected.displayName} · ${describeParty(selected)}` }
      : null,
    suggestion: proposal
      ? {
          partnerName: proposal.partner.displayName,
          partnerDetails: describeParty(proposal.partner),
          reason: describeSuggestion(proposal),
        }
      : null,
    isLoadingSuggestion: currentSuggestion === null || currentSuggestion.isLoading,
    sent: sent.data
      ? {
          title: 'Proposition envoyée',
          body: `${sent.data.member.displayName} et ${sent.data.partner.displayName} la reçoivent dans l'app. Leur statut passe à « Proposition envoyée ».`,
        }
      : null,
    error: sent.error
      ? "La proposition n'est pas partie. Réessayez."
      : currentSuggestion?.error
        ? 'La suggestion ne se charge pas. Réessayez dans un instant.'
        : null,
    isSending: sent.isLoading,
  }

  return {
    subtitle: `Les nouveaux inscrits${list.data ? ` de ${formatMonth(list.data.month)}` : ' du mois'}. Vous voyez les créneaux, jamais de photo.`,
    search,
    chips,
    rows: members.map(toMemberRowView),
    selectedId: selectedMemberId,
    isLoading: list.isLoading,
    emptyMessage: search ? `Aucun membre ne correspond à « ${search} ».` : 'Aucun membre dans cette liste.',
    panel,
    changeSearch: setSearch,
    changeFilter: (value: string) => {
      if (isMemberFilter(value)) setFilter(value)
    },
    selectMember: (memberId: string) => {
      setSelectedId(memberId)
      dispatch(proposalDismissed())
    },
    sendProposal: () => {
      if (proposal) void dispatch(proposeDuoThunk(proposal))
    },
    showOthers: () => {
      setSearch('')
      setFilter(MemberFilter.WAITING)
    },
  }
}
