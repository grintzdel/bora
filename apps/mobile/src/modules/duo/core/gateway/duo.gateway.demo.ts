import type { SeedPerson } from '@bora/demo-data'
import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import { type DemoDatabase, findCurrentMember, findPerson } from '../../../shared/core/demo/demo-database'
import { type DemoGatewayOptions, simulateNetwork } from '../../../shared/core/demo/simulate-network'
import { findCommonGround } from '../domain/common-ground.domain-model'
import { ProposalKind } from '../domain/constants/proposal-kind.constant'
import { CurrentDuoSchema, DuoProposalSchema } from '../domain/duo.domain-model'
import { DuoProposalNotFoundError } from '../domain/errors/duo-proposal-not-found.error'
import type { DuoGateway } from './duo.gateway'

type DuoDemoGatewayOptions = DemoGatewayOptions & { readonly acceptanceDelayMs: number }

const toPartner = (person: SeedPerson) => ({
  id: person.id,
  firstName: person.firstName,
  displayName: person.displayName,
  gender: person.gender,
  level: person.profile.level,
  joinedDaysAgo: person.joinedDaysAgo,
})

export const makeDuoDemoGateway = (
  db: DemoDatabase,
  { latencyMs, acceptanceDelayMs }: DuoDemoGatewayOptions
): DuoGateway => {
  const commonGroundWith = (partner: SeedPerson) => {
    const member = findCurrentMember(db)
    return member ? findCommonGround(db.state.gym.name, member.profile, partner.profile) : []
  }

  const isCompatible = (partner: SeedPerson) => {
    const member = findCurrentMember(db)
    return !member?.profile.sameGenderDuo || member.gender === partner.gender
  }

  const proposalsOfKind = (kind: ProposalKind) =>
    db.state.duoProposals.flatMap((proposal) => {
      const partner = findPerson(db, proposal.partnerId)
      const program = db.state.programs.find((candidate) => candidate.id === proposal.firstSession.programId)
      if (proposal.kind !== kind || !partner || !program || !isCompatible(partner)) return []
      return [
        {
          id: proposal.id,
          kind: proposal.kind,
          partner: toPartner(partner),
          commonGround: commonGroundWith(partner),
          firstSession: { slot: proposal.firstSession.slot, programName: program.name },
        },
      ]
    })

  const accept = (proposalId: string) =>
    Effect.sync(() => {
      const proposal = db.state.duoProposals.find((candidate) => candidate.id === proposalId)
      if (!proposal) return false
      const upcoming = db.state.sessions.filter((session) => session.status !== 'done')
      if (proposal.kind === ProposalKind.TONIGHT) {
        const tonight = upcoming.find((session) => session.partnerAbsent)
        if (tonight)
          Object.assign(tonight, { partnerId: proposal.partnerId, partnerAbsent: false, status: 'confirmed' })
        return true
      }
      db.state.duoPartnerId = proposal.partnerId
      for (const session of upcoming) Object.assign(session, { partnerId: proposal.partnerId, partnerAbsent: false })
      return true
    })

  return {
    listProposals: (kind) =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() => Schema.decodeUnknown(Schema.Array(DuoProposalSchema))(proposalsOfKind(kind)))
      ),
    propose: (proposalId) =>
      simulateNetwork(acceptanceDelayMs).pipe(
        Effect.andThen(() => accept(proposalId)),
        Effect.andThen((accepted) =>
          accepted ? Effect.void : Effect.fail(new DuoProposalNotFoundError({ proposalId }))
        )
      ),
    getCurrent: () =>
      simulateNetwork(latencyMs).pipe(
        Effect.andThen(() => {
          const partner = findPerson(db, db.state.duoPartnerId)
          return partner
            ? Schema.decodeUnknown(CurrentDuoSchema)({
                partner: toPartner(partner),
                commonGround: commonGroundWith(partner),
              })
            : Effect.succeed(null)
        })
      ),
  }
}
