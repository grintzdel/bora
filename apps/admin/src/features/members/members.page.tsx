'use client'

import { DuoProposalPanel } from '@/modules/member/ui/components/DuoProposalPanel'
import { MemberFilters } from '@/modules/member/ui/components/MemberFilters'
import { MemberTable } from '@/modules/member/ui/components/MemberTable'
import { useMembers } from '@/modules/member/ui/hooks/use-members'
import { AppRoute } from '@/modules/shared/ui/app-route.constant'
import { ButtonLink } from '@/modules/shared/ui/components/ButtonLink'
import { PageHeader } from '@/modules/shared/ui/components/PageHeader'

export const MembersPage = () => {
  const members = useMembers()

  return (
    <>
      <PageHeader
        title="Membres et duos"
        subtitle={members.subtitle}
        actions={
          <ButtonLink href={AppRoute.WELCOME_AND_REPORTS} iconEnd="arrow">
            Inviter un nouvel inscrit
          </ButtonLink>
        }
      />
      <MemberFilters
        search={members.search}
        chips={members.chips}
        onSearchChange={members.changeSearch}
        onFilterChange={members.changeFilter}
      />
      <div className="flex flex-wrap items-start gap-4">
        <MemberTable
          rows={members.rows}
          selectedId={members.selectedId}
          isLoading={members.isLoading}
          emptyMessage={members.emptyMessage}
          onSelect={members.selectMember}
        />
        <DuoProposalPanel {...members.panel} onSend={members.sendProposal} onShowOthers={members.showOthers} />
      </div>
    </>
  )
}
