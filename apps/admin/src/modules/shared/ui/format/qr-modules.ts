import QRCode from 'qrcode'

const QUIET_ZONE = 2

export const qrModules = (value: string) => {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: 'M' })
  const squares: string[] = []
  for (let row = 0; row < modules.size; row++) {
    for (let column = 0; column < modules.size; column++) {
      if (modules.get(row, column)) squares.push(`M${column + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`)
    }
  }
  return { size: modules.size + QUIET_ZONE * 2, path: squares.join('') }
}
