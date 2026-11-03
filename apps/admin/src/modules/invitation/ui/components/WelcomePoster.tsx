import { Icon } from '../../../shared/ui/components/Icon'
import { QrCode } from '../../../shared/ui/components/QrCode'

type WelcomePosterProps = {
  readonly gymName: string
  readonly inviteUrl: string
}

const Promises = [
  'Un duo de ta salle et un programme guidé à faire ensemble.',
  'Gratuit pour toi, offert par ta salle.',
  "Pas de photo : tu retrouves ton duo ici, à l'accueil.",
] as const

export const WelcomePoster = ({ gymName, inviteUrl }: WelcomePosterProps) => (
  <article
    aria-label="Affiche Tu débutes ? Viens avec Bora"
    className="bg-surface-inverse text-ink-inverse @container mx-auto aspect-[210/297] w-full max-w-[210mm] overflow-hidden rounded-lg print:aspect-auto print:h-[273mm] print:w-[186mm] print:max-w-none print:rounded-none"
  >
    <div className="flex h-full flex-col justify-between gap-[3cqw] p-[7cqw]">
      <div className="flex items-baseline justify-between gap-[3cqw]">
        <span className="font-display text-[7cqw] leading-none font-extrabold tracking-[-0.03em]">Bora</span>
        <span className="text-[3cqw] font-semibold">{gymName}</span>
      </div>

      <div className="flex flex-col items-start gap-[3cqw]">
        <span className="rounded-pill bg-lime text-on-lime px-[3cqw] py-[1.2cqw] text-[3.2cqw] font-bold">
          Tu débutes ?
        </span>
        <h1 className="font-display m-0 text-[13cqw] leading-[0.95] font-extrabold tracking-[-0.03em]">
          Viens avec Bora
        </h1>
        <p className="m-0 text-[4.6cqw] leading-tight font-semibold">Quelqu'un t'attend, alors tu y vas.</p>
        <ul className="m-0 flex list-none flex-col gap-[1.6cqw] p-0">
          {Promises.map((promise) => (
            <li key={promise} className="flex items-start gap-[2cqw] text-[3.2cqw] leading-snug">
              <span className="rounded-pill bg-lime text-on-lime mt-[0.4cqw] inline-flex size-[4cqw] shrink-0 items-center justify-center [&>svg]:size-[2.8cqw]">
                <Icon name="check" />
              </span>
              {promise}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-lime text-on-lime flex items-center gap-[4cqw] rounded-[4cqw] p-[4cqw]">
        <div className="w-[30cqw] shrink-0 [&>svg]:h-auto [&>svg]:w-full">
          <QrCode value={inviteUrl} label={`QR code pour rejoindre Bora à ${gymName}`} />
        </div>
        <div className="flex min-w-0 flex-col gap-[1.6cqw]">
          <p className="font-display m-0 text-[5cqw] leading-tight font-extrabold">Scanne, on s'occupe du reste</p>
          <p className="m-0 text-[2.8cqw] leading-snug">
            Trois questions sur ton niveau et tes horaires, et Bora te propose un duo.
          </p>
          <p className="m-0 text-[2.4cqw] font-semibold break-all">{inviteUrl}</p>
        </div>
      </div>
    </div>
  </article>
)
