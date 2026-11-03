import { Banner } from '../../../shared/ui/components/Banner'
import { Button } from '../../../shared/ui/components/Button'
import { Initials } from '../../../shared/ui/components/Initials'
import { SectionTitle } from '../../../shared/ui/components/SectionTitle'

export type DuoProposalPanelView = {
  readonly member: { readonly name: string; readonly summary: string } | null
  readonly suggestion: { readonly partnerName: string; readonly partnerDetails: string; readonly reason: string } | null
  readonly isLoadingSuggestion: boolean
  readonly sent: { readonly title: string; readonly body: string } | null
  readonly error: string | null
  readonly isSending: boolean
}

type DuoProposalPanelProps = DuoProposalPanelView & {
  readonly onSend: () => void
  readonly onShowOthers: () => void
}

export const DuoProposalPanel = ({
  member,
  suggestion,
  isLoadingSuggestion,
  sent,
  error,
  isSending,
  onSend,
  onShowOthers,
}: DuoProposalPanelProps) => (
  <aside
    aria-label={member ? `Proposer un duo à ${member.name}` : 'Proposer un duo'}
    className="bg-surface-000 flex min-w-0 flex-[1_1_280px] flex-col gap-4 rounded-lg p-6"
  >
    {sent ? (
      <Banner tone="success" title={sent.title}>
        {sent.body}
      </Banner>
    ) : null}
    <div className="flex flex-col gap-1">
      {member ? <span className="text-caption text-ink-muted">{member.summary}</span> : null}
      <SectionTitle>Proposer un duo</SectionTitle>
    </div>
    {member === null ? (
      <p className="text-body text-ink-muted m-0">
        Personne n'attend de duo dans cette liste. Sélectionnez un membre « Sans duo » pour lui proposer quelqu'un.
      </p>
    ) : isLoadingSuggestion ? (
      <output className="text-body text-ink-muted m-0 block">Bora cherche quelqu'un sur les mêmes créneaux…</output>
    ) : suggestion ? (
      <>
        <Banner tone="info" title="Suggestion">
          {suggestion.reason}
        </Banner>
        <div className="bg-surface-200 flex items-center gap-3 rounded-md px-4 py-3">
          <Initials name={suggestion.partnerName} size="md" />
          <span className="flex flex-col">
            <b className="text-[16px] leading-[22px]">{suggestion.partnerName}</b>
            <span className="text-caption text-ink-muted">{suggestion.partnerDetails}</span>
          </span>
        </div>
        <Button block onClick={onSend} disabled={isSending}>
          {isSending ? 'Envoi…' : 'Envoyer la proposition'}
        </Button>
      </>
    ) : (
      <p className="text-body text-ink-muted m-0">
        Personne en attente ne partage ses créneaux et ses préférences pour l'instant. Le prochain inscrit qui lui
        correspond pourra lui être proposé.
      </p>
    )}
    {error ? (
      <p role="alert" className="text-caption text-danger m-0">
        {error}
      </p>
    ) : null}
    <Button variant="quiet" onClick={onShowOthers}>
      Voir d'autres membres
    </Button>
  </aside>
)
