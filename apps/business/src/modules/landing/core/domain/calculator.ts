export const PRICE_MIN = 15
export const PRICE_MAX = 80
export const PRICE_DEFAULT = 30

export const MEMBERS_MIN = 1
export const MEMBERS_MAX = 15
export const MEMBERS_DEFAULT = 3

export function monthlyGain(price: number, membersKept: number) {
  return price * membersKept
}

export function yearlyGain(price: number, membersKept: number) {
  return monthlyGain(price, membersKept) * 12
}

export function formatEuros(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function sliderPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}
