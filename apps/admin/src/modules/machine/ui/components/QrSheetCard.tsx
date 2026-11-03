import { QrCode } from '../../../shared/ui/components/QrCode'

type QrSheetCardProps = {
  readonly numberLabel: string
  readonly name: string
  readonly gymName: string
  readonly qrValue: string
  readonly qrLabel: string
}

export const QrSheetCard = ({ numberLabel, name, gymName, qrValue, qrLabel }: QrSheetCardProps) => (
  <li className="border-line-strong flex break-inside-avoid flex-col items-center gap-3 rounded-md border-2 border-dashed p-5 text-center">
    <span className="rounded-pill bg-lime text-label text-on-lime px-3 py-1.5">{numberLabel}</span>
    <span className="font-display text-title-2">{name}</span>
    <QrCode value={qrValue} label={qrLabel} size={168} />
    <span className="text-body-strong">Scanne-moi : tuto et réglages pour débuter</span>
    <span className="text-caption text-ink-muted">Bora · {gymName}</span>
  </li>
)
