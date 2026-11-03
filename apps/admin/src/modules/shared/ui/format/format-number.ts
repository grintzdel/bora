export const formatPercent = (ratio: number) => `${Math.round(ratio * 100)} %`

const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const roundEuros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export const formatEuros = (cents: number) =>
  (cents % 100 === 0 ? roundEuros : euros).format(cents / 100).replace(/ | /g, ' ')
