import { useLocalSearchParams, useRouter } from 'expo-router'

import { ProposalKind } from '@/modules/duo/core/domain/constants/proposal-kind.constant'
import { DuoProposalCard } from '@/modules/duo/ui/components/DuoProposalCard'
import { FirstSessionCard } from '@/modules/duo/ui/components/FirstSessionCard'
import { useDuoProposals } from '@/modules/duo/ui/hooks/use-duo-proposals'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { BottomBar } from '@/modules/shared/ui/components/BottomBar'
import { Button } from '@/modules/shared/ui/components/Button'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'
import { StepHeader } from '@/modules/shared/ui/components/StepHeader'

export const DuoProposalPage = () => {
  const router = useRouter()
  const params = useLocalSearchParams<{ kind?: string }>()
  const kind = params.kind === ProposalKind.TONIGHT ? ProposalKind.TONIGHT : ProposalKind.REGULAR
  const duo = useDuoProposals(kind)
  const proposal = duo.proposal

  const handlePropose = async () => {
    if (!(await duo.propose())) return
    if (kind === ProposalKind.TONIGHT) {
      router.dismissTo('/home')
      return
    }
    router.dismissAll()
    router.replace('/home')
  }

  return (
    <Screen
      footer={
        <BottomBar>
          <Button
            label={duo.isProposing && proposal ? `En attente de ${proposal.partnerFirstName}…` : 'Proposer ce duo'}
            size="lg"
            block
            disabled={!proposal || duo.isProposing}
            onPress={() => void handlePropose()}
          />
          {duo.hasAlternatives ? (
            <Button
              label="Voir une autre proposition"
              variant="quiet"
              disabled={duo.isProposing}
              onPress={duo.showNextProposal}
            />
          ) : null}
        </BottomBar>
      }
    >
      {kind === ProposalKind.TONIGHT ? (
        <StepHeader onBack={() => router.back()} />
      ) : (
        <StepHeader onBack={() => router.back()} progress={1} stepLabel="2 sur 2" />
      )}
      <ScreenTitle
        title={kind === ProposalKind.TONIGHT ? 'Un autre duo pour ce soir' : 'On a un duo pour toi'}
        subtitle={duo.intro}
      />
      {proposal ? (
        <>
          <DuoProposalCard
            partnerName={proposal.partnerName}
            partnerTag={proposal.partnerTag}
            commonGround={proposal.commonGround}
          />
          <FirstSessionCard
            label={kind === ProposalKind.TONIGHT ? 'Ce soir' : 'Première séance proposée'}
            title={proposal.firstSession}
            note="À la salle, avec l'équipe présente"
          />
          {duo.isProposing ? (
            <Banner title={`En attente de ${proposal.partnerFirstName}`} message={proposal.waiting} />
          ) : (
            <Banner title="Double accord" message={proposal.consent} />
          )}
        </>
      ) : null}
      {duo.error ? <Banner tone="danger" title="Oups" message={duo.error} /> : null}
    </Screen>
  )
}
