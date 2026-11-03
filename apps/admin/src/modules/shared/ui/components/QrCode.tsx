import { qrModules } from '../format/qr-modules'

type QrCodeProps = {
  readonly value: string
  readonly label: string
  readonly size?: number
}

const toSvgDataUri = (value: string) => {
  const { size, path } = qrModules(value)
  // Fixed colors: scanners expect dark modules on a light ground, whatever the theme.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff"/><path d="${path}" fill="#2a1e4a"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const QrCode = ({ value, label, size = 160 }: QrCodeProps) => (
  <img src={toSvgDataUri(value)} alt={label} width={size} height={size} className="shrink-0 rounded-sm" />
)
